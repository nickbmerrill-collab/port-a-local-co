#!/usr/bin/env python3
"""
Polymarket Position Redeemer
============================
Finds all resolved positions on Polymarket and redeems them for USDC.

Usage:
    export POLYMARKET_PRIVATE_KEY="4570ffcb6e52..."
    pip install web3 py-clob-client requests
    python3 polymarket_redeem.py --dry-run      # preview first
    python3 polymarket_redeem.py                 # execute redemptions
    python3 polymarket_redeem.py --scan-all      # also scan all resolved markets on-chain
"""

import argparse
import json
import os
import sys
import time
from decimal import Decimal

import requests
from eth_account import Account
from web3 import Web3
from web3.middleware import ExtraDataToPOAMiddleware

# ─── Polygon Mainnet Config ──────────────────────────────────────────────────
POLYGON_RPCS = [
    "https://polygon-rpc.com",
    "https://rpc.ankr.com/polygon",
    "https://polygon.llamarpc.com",
    "https://polygon-mainnet.public.blastapi.io",
    "https://1rpc.io/matic",
    "https://rpc-mainnet.matic.quiknode.pro",
]

# ─── Polymarket Contract Addresses (Polygon) ─────────────────────────────────
CONDITIONAL_TOKENS = Web3.to_checksum_address("0x4D97DCd97eC945f40cF65F87097ACe5EA0476045")
NEG_RISK_ADAPTER = Web3.to_checksum_address("0xd91E80cF2E7be2e162c6513ceD06f1dD0dA35296")
NEG_RISK_CTF_EXCHANGE = Web3.to_checksum_address("0xC5d563A36AE78145C45a50134d48A1215220f80a")
CTF_EXCHANGE = Web3.to_checksum_address("0x4bFb41d5B3570DeFd03C39a9A4D8dE6Bd8B8982E")
USDC_POLYGON = Web3.to_checksum_address("0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174")

# ─── Polymarket API Endpoints ─────────────────────────────────────────────────
GAMMA_API = "https://gamma-api.polymarket.com"
CLOB_API = "https://clob.polymarket.com"
DATA_API = "https://data-api.polymarket.com"

# ─── Minimal ABIs ─────────────────────────────────────────────────────────────
CONDITIONAL_TOKENS_ABI = json.loads("""[
    {
        "inputs": [{"name": "owner", "type": "address"}, {"name": "id", "type": "uint256"}],
        "name": "balanceOf",
        "outputs": [{"name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {"name": "collateralToken", "type": "address"},
            {"name": "parentCollectionId", "type": "bytes32"},
            {"name": "conditionId", "type": "bytes32"},
            {"name": "indexSets", "type": "uint256[]"}
        ],
        "name": "redeemPositions",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{"name": "conditionId", "type": "bytes32"}],
        "name": "payoutDenominator",
        "outputs": [{"name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{"name": "conditionId", "type": "bytes32"}, {"name": "outcomeIndex", "type": "uint256"}],
        "name": "payoutNumerators",
        "outputs": [{"name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{"name": "conditionId", "type": "bytes32"}],
        "name": "getOutcomeSlotCount",
        "outputs": [{"name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    }
]""")

NEG_RISK_ADAPTER_ABI = json.loads("""[
    {
        "inputs": [
            {"name": "conditionId", "type": "bytes32"},
            {"name": "amounts", "type": "uint256[]"}
        ],
        "name": "redeemPositions",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]""")

ERC20_ABI = json.loads("""[
    {
        "inputs": [{"name": "account", "type": "address"}],
        "name": "balanceOf",
        "outputs": [{"name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "decimals",
        "outputs": [{"name": "", "type": "uint8"}],
        "stateMutability": "view",
        "type": "function"
    }
]""")


def connect_polygon(custom_rpc=None):
    """Connect to Polygon via public RPCs with fallback."""
    rpcs = [custom_rpc] if custom_rpc else POLYGON_RPCS
    for rpc in rpcs:
        try:
            w3 = Web3(Web3.HTTPProvider(rpc, request_kwargs={"timeout": 15}))
            w3.middleware_onion.inject(ExtraDataToPOAMiddleware, layer=0)
            if w3.is_connected():
                block = w3.eth.block_number
                print(f"  Connected to Polygon via {rpc} (block {block})")
                return w3
        except Exception as e:
            print(f"  Failed {rpc}: {e}")
            continue
    print("ERROR: Could not connect to any Polygon RPC")
    print("  Try setting POLYGON_RPC env var to your own RPC endpoint")
    print("  (e.g. from Alchemy, Infura, or QuickNode)")
    sys.exit(1)


def get_wallet_info(w3, address):
    """Get MATIC and USDC balances."""
    matic_wei = w3.eth.get_balance(address)
    matic = Decimal(str(w3.from_wei(matic_wei, "ether")))

    usdc_contract = w3.eth.contract(address=USDC_POLYGON, abi=ERC20_ABI)
    usdc_raw = usdc_contract.functions.balanceOf(address).call()
    usdc = Decimal(str(usdc_raw)) / Decimal("1000000")  # USDC has 6 decimals

    return matic, usdc


def fetch_clob_positions(private_key, address):
    """Fetch positions via Polymarket's CLOB client (authenticated)."""
    print("\n--- Fetching positions via CLOB Client (authenticated) ---")
    try:
        from py_clob_client.client import ClobClient

        client = ClobClient(
            host=CLOB_API,
            key=private_key,
            chain_id=137,
        )

        # Derive API credentials from the private key
        creds = client.derive_api_key()
        client.set_api_creds(client.create_or_derive_api_creds())

        print(f"  CLOB auth successful for {address}")

        # Fetch all positions
        positions = []
        try:
            # The CLOB client may use different method names across versions
            for method_name in ["get_positions", "get_all_positions"]:
                method = getattr(client, method_name, None)
                if method:
                    result = method()
                    if result:
                        positions = result if isinstance(result, list) else [result]
                        print(f"  Found {len(positions)} positions via CLOB client")
                        break
        except Exception as e:
            print(f"  CLOB positions fetch: {e}")

        if not positions:
            # Try markets endpoint to discover what we've traded
            try:
                markets = client.get_markets()
                if markets:
                    print(f"  Found {len(markets)} markets via CLOB client")
            except Exception:
                pass

        return positions
    except ImportError:
        print("  py-clob-client not available, skipping CLOB auth")
        return []
    except Exception as e:
        print(f"  CLOB client error: {e}")
        return []


def fetch_polymarket_positions(address):
    """Fetch positions from Polymarket's public REST APIs."""
    positions = []

    # Method 1: Data API
    print("\n--- Fetching positions from Polymarket Data API ---")
    for endpoint in [
        f"{DATA_API}/positions?user={address.lower()}",
        f"{DATA_API}/positions?address={address.lower()}",
    ]:
        try:
            resp = requests.get(endpoint, timeout=15)
            if resp.status_code == 200:
                data = resp.json()
                if data:
                    print(f"  Found {len(data)} positions via Data API")
                    positions.extend(data)
                    break
                else:
                    print(f"  No positions at {endpoint}")
            else:
                print(f"  {endpoint} returned {resp.status_code}")
        except Exception as e:
            print(f"  Data API error: {e}")

    # Method 2: Gamma API
    print("\n--- Fetching positions from Gamma API ---")
    for endpoint in [
        f"{GAMMA_API}/positions?user={address.lower()}",
        f"{GAMMA_API}/activity?user={address.lower()}&limit=100",
    ]:
        try:
            resp = requests.get(endpoint, timeout=15)
            if resp.status_code == 200:
                data = resp.json()
                if data:
                    new = [p for p in data if p not in positions]
                    print(f"  Found {len(new)} new positions via Gamma API")
                    positions.extend(new)
                    break
                else:
                    print(f"  No data at {endpoint}")
            else:
                print(f"  {endpoint} returned {resp.status_code}")
        except Exception as e:
            print(f"  Gamma API error: {e}")

    # Method 3: Polymarket profile API (used by frontend)
    print("\n--- Fetching from Polymarket Profile API ---")
    try:
        resp = requests.get(
            f"https://polymarket.com/api/profile/{address.lower()}/positions",
            headers={"Accept": "application/json"},
            timeout=15,
        )
        if resp.status_code == 200:
            data = resp.json()
            if data:
                new = [p for p in data if p not in positions]
                print(f"  Found {len(new)} new positions via Profile API")
                positions.extend(new)
            else:
                print("  No positions via Profile API")
        else:
            print(f"  Profile API returned {resp.status_code}")
    except Exception as e:
        print(f"  Profile API error: {e}")

    return positions


def fetch_resolved_markets():
    """Fetch recently resolved markets from Polymarket Gamma API."""
    all_markets = []
    print("\n--- Fetching resolved markets from Gamma API ---")
    try:
        offset = 0
        while True:
            resp = requests.get(
                f"{GAMMA_API}/markets",
                params={"closed": "true", "limit": 100, "offset": offset},
                timeout=15,
            )
            if resp.status_code != 200:
                print(f"  Gamma API returned {resp.status_code}")
                break
            batch = resp.json()
            if not batch:
                break
            all_markets.extend(batch)
            offset += 100
            # Fetch up to 5000 resolved markets
            if offset >= 5000:
                break
            # Be polite to the API
            time.sleep(0.2)
        print(f"  Fetched {len(all_markets)} resolved markets")
    except Exception as e:
        print(f"  Error fetching resolved markets: {e}")
    return all_markets


def is_condition_resolved(w3, condition_id_hex):
    """Check if a condition has been resolved on-chain."""
    ct = w3.eth.contract(address=CONDITIONAL_TOKENS, abi=CONDITIONAL_TOKENS_ABI)
    try:
        cid = bytes.fromhex(condition_id_hex.replace("0x", ""))
        denom = ct.functions.payoutDenominator(cid).call()
        return denom > 0
    except Exception:
        return False


def get_payout_info(w3, condition_id_hex):
    """Get payout numerators and denominator for a resolved condition."""
    ct = w3.eth.contract(address=CONDITIONAL_TOKENS, abi=CONDITIONAL_TOKENS_ABI)
    cid = bytes.fromhex(condition_id_hex.replace("0x", ""))
    try:
        denom = ct.functions.payoutDenominator(cid).call()
        if denom == 0:
            return None
        slot_count = ct.functions.getOutcomeSlotCount(cid).call()
        numerators = []
        for i in range(slot_count):
            n = ct.functions.payoutNumerators(cid, i).call()
            numerators.append(n)
        return {"denominator": denom, "numerators": numerators}
    except Exception:
        return None


def redeem_standard_position(w3, account, condition_id_hex, index_sets=None):
    """Redeem a standard (non-NegRisk) position via ConditionalTokens."""
    ct = w3.eth.contract(address=CONDITIONAL_TOKENS, abi=CONDITIONAL_TOKENS_ABI)
    cid = bytes.fromhex(condition_id_hex.replace("0x", ""))
    parent = b"\x00" * 32

    if index_sets is None:
        index_sets = [1, 2]  # Binary market: both outcomes

    tx = ct.functions.redeemPositions(
        USDC_POLYGON, parent, cid, index_sets,
    ).build_transaction({
        "from": account.address,
        "nonce": w3.eth.get_transaction_count(account.address),
        "gas": 300000,
        "gasPrice": w3.eth.gas_price,
        "chainId": 137,
    })

    signed = account.sign_transaction(tx)
    tx_hash = w3.eth.send_raw_transaction(signed.raw_transaction)
    print(f"    TX: https://polygonscan.com/tx/{tx_hash.hex()}")
    receipt = w3.eth.wait_for_transaction_receipt(tx_hash, timeout=120)
    return receipt


def redeem_neg_risk_position(w3, account, condition_id_hex, amounts):
    """Redeem a NegRisk position via NegRiskAdapter."""
    adapter = w3.eth.contract(address=NEG_RISK_ADAPTER, abi=NEG_RISK_ADAPTER_ABI)
    cid = bytes.fromhex(condition_id_hex.replace("0x", ""))

    tx = adapter.functions.redeemPositions(
        cid, amounts,
    ).build_transaction({
        "from": account.address,
        "nonce": w3.eth.get_transaction_count(account.address),
        "gas": 500000,
        "gasPrice": w3.eth.gas_price,
        "chainId": 137,
    })

    signed = account.sign_transaction(tx)
    tx_hash = w3.eth.send_raw_transaction(signed.raw_transaction)
    print(f"    TX: https://polygonscan.com/tx/{tx_hash.hex()}")
    receipt = w3.eth.wait_for_transaction_receipt(tx_hash, timeout=120)
    return receipt


def process_positions_from_api(w3, account, positions, dry_run=False):
    """Process positions returned by Polymarket APIs."""
    redeemed = 0
    failed = 0

    for pos in positions:
        condition_id = pos.get("conditionId") or pos.get("condition_id")
        market_slug = pos.get("slug") or pos.get("market_slug") or pos.get("title") or pos.get("question", "unknown")
        size = pos.get("size") or pos.get("amount") or pos.get("balance", "0")
        outcome = pos.get("outcome") or pos.get("outcomeName") or "?"
        is_neg_risk = pos.get("neg_risk", False) or pos.get("negRisk", False)

        if not condition_id:
            continue

        resolved = is_condition_resolved(w3, condition_id)
        if not resolved:
            continue

        payout = get_payout_info(w3, condition_id)
        payout_str = f"  Payout: {payout}" if payout else ""

        print(f"\n  REDEEMABLE: {market_slug}")
        print(f"    Outcome: {outcome}, Size: {size}")
        print(f"    Condition: {condition_id}")
        print(f"    NegRisk: {is_neg_risk}{payout_str}")

        if dry_run:
            print("    [DRY RUN] Would redeem this position")
            redeemed += 1
            continue

        try:
            if is_neg_risk:
                receipt = redeem_neg_risk_position(
                    w3, account, condition_id,
                    [int(float(size) * 1e6)]
                )
            else:
                receipt = redeem_standard_position(w3, account, condition_id)

            if receipt["status"] == 1:
                print(f"    SUCCESS (gas: {receipt['gasUsed']})")
                redeemed += 1
            else:
                print(f"    FAILED (reverted)")
                failed += 1
        except Exception as e:
            print(f"    ERROR: {e}")
            failed += 1
        time.sleep(1)

    return redeemed, failed


def scan_on_chain_positions(w3, account, markets, dry_run=False):
    """
    For each resolved market from the API, check if the wallet holds
    any CTF tokens on-chain and redeem them.
    """
    ct = w3.eth.contract(address=CONDITIONAL_TOKENS, abi=CONDITIONAL_TOKENS_ABI)
    address = account.address
    redeemed = 0
    failed = 0
    checked = 0

    for market in markets:
        condition_id = market.get("conditionId") or market.get("condition_id")
        if not condition_id:
            continue

        # Extract token IDs from market data
        tokens = []
        for key in ["clobTokenIds", "clob_token_ids", "tokenIds", "token_ids"]:
            val = market.get(key)
            if val:
                if isinstance(val, str):
                    try:
                        val = json.loads(val)
                    except Exception:
                        pass
                if isinstance(val, list):
                    tokens = val
                    break

        if not tokens:
            continue

        # Check if we hold any of these tokens
        has_balance = False
        for tid in tokens:
            try:
                bal = ct.functions.balanceOf(address, int(tid)).call()
                if bal > 0:
                    has_balance = True
                    break
            except Exception:
                continue

        if not has_balance:
            checked += 1
            if checked % 100 == 0:
                print(f"  Scanned {checked} markets (no balance)...")
            continue

        # Check if resolved
        resolved = is_condition_resolved(w3, condition_id)
        if not resolved:
            checked += 1
            continue

        question = market.get("question") or market.get("title") or market.get("slug", "unknown")
        is_neg_risk = market.get("neg_risk", False) or market.get("negRisk", False)

        # Get exact balances
        balances = {}
        for tid in tokens:
            try:
                bal = ct.functions.balanceOf(address, int(tid)).call()
                if bal > 0:
                    balances[tid] = bal
            except Exception:
                continue

        total_usdc = sum(balances.values()) / 1e6
        print(f"\n  FOUND REDEEMABLE: {question}")
        print(f"    Condition: {condition_id}")
        print(f"    Token balances: {balances} (~${total_usdc:.2f})")
        print(f"    NegRisk: {is_neg_risk}")

        if dry_run:
            print(f"    [DRY RUN] Would redeem ~${total_usdc:.2f} USDC")
            redeemed += 1
            checked += 1
            continue

        try:
            if is_neg_risk:
                amounts = [balances.get(tid, 0) for tid in tokens]
                receipt = redeem_neg_risk_position(w3, account, condition_id, amounts)
            else:
                receipt = redeem_standard_position(w3, account, condition_id)

            if receipt["status"] == 1:
                print(f"    SUCCESS (gas: {receipt['gasUsed']})")
                redeemed += 1
            else:
                print(f"    FAILED (reverted)")
                failed += 1
        except Exception as e:
            err = str(e)
            if "execution reverted" in err:
                print(f"    Reverted (may already be redeemed)")
            else:
                print(f"    ERROR: {e}")
            failed += 1

        time.sleep(1)
        checked += 1

    print(f"\n  Scanned {checked} markets total")
    return redeemed, failed


def main():
    parser = argparse.ArgumentParser(
        description="Redeem resolved Polymarket positions for USDC",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  %(prog)s --dry-run              Preview redeemable positions
  %(prog)s                        Redeem all resolved positions
  %(prog)s --scan-all             Also scan 5000 resolved markets on-chain
  %(prog)s --rpc https://...      Use a custom Polygon RPC endpoint
        """,
    )
    parser.add_argument("--dry-run", action="store_true",
                        help="Show what would be redeemed without sending transactions")
    parser.add_argument("--scan-all", action="store_true",
                        help="Scan all resolved markets on-chain (slower, more thorough)")
    parser.add_argument("--rpc", type=str, default=None,
                        help="Custom Polygon RPC URL (or set POLYGON_RPC env var)")
    args = parser.parse_args()

    # ─── Load private key ─────────────────────────────────────────────────
    private_key = os.environ.get("POLYMARKET_PRIVATE_KEY", "").strip()
    if not private_key:
        print("ERROR: Set POLYMARKET_PRIVATE_KEY environment variable")
        print("  export POLYMARKET_PRIVATE_KEY='your_64char_hex_key'")
        sys.exit(1)

    if not private_key.startswith("0x"):
        private_key = "0x" + private_key

    account = Account.from_key(private_key)
    address = account.address

    print(f"\n{'='*60}")
    print(f"  Polymarket Position Redeemer")
    print(f"{'='*60}")
    print(f"  Wallet:   {address}")
    print(f"  Mode:     {'DRY RUN' if args.dry_run else 'LIVE'}")

    # ─── Connect to Polygon ───────────────────────────────────────────────
    print(f"\n--- Connecting to Polygon ---")
    custom_rpc = args.rpc or os.environ.get("POLYGON_RPC")
    w3 = connect_polygon(custom_rpc)

    # ─── Check balances ───────────────────────────────────────────────────
    print(f"\n--- Wallet Balances ---")
    matic, usdc = get_wallet_info(w3, address)
    print(f"  POL (MATIC): {matic:.4f}")
    print(f"  USDC:        ${usdc:.2f}")

    if matic < Decimal("0.01") and not args.dry_run:
        print("\n  WARNING: Low POL/MATIC balance — you need it for gas fees.")
        print("  Send at least 0.1 POL to this wallet to cover redemption gas.")
        resp = input("  Continue anyway? (y/N): ").strip().lower()
        if resp != "y":
            sys.exit(0)

    total_redeemed = 0
    total_failed = 0

    # ─── Phase 1: CLOB Client (authenticated) ────────────────────────────
    print(f"\n{'='*60}")
    print(f"  Phase 1: CLOB Client Position Discovery")
    print(f"{'='*60}")
    clob_positions = fetch_clob_positions(private_key, address)
    if clob_positions:
        print(f"\n--- Processing {len(clob_positions)} CLOB positions ---")
        r, f = process_positions_from_api(w3, account, clob_positions, dry_run=args.dry_run)
        total_redeemed += r
        total_failed += f

    # ─── Phase 2: Public API position discovery ──────────────────────────
    print(f"\n{'='*60}")
    print(f"  Phase 2: Public API Position Discovery")
    print(f"{'='*60}")
    api_positions = fetch_polymarket_positions(address)
    if api_positions:
        print(f"\n--- Processing {len(api_positions)} API positions ---")
        r, f = process_positions_from_api(w3, account, api_positions, dry_run=args.dry_run)
        total_redeemed += r
        total_failed += f

    # ─── Phase 3: On-chain scan (if requested or no API data) ────────────
    if args.scan_all or (not clob_positions and not api_positions):
        print(f"\n{'='*60}")
        print(f"  Phase 3: On-chain Market Scan")
        print(f"{'='*60}")
        if not clob_positions and not api_positions:
            print("  No positions found via APIs — scanning resolved markets on-chain...")
        markets = fetch_resolved_markets()
        if markets:
            r, f = scan_on_chain_positions(w3, account, markets, dry_run=args.dry_run)
            total_redeemed += r
            total_failed += f
        else:
            print("  No resolved markets data available")

    # ─── Final report ─────────────────────────────────────────────────────
    print(f"\n{'='*60}")
    print(f"  Final Report")
    print(f"{'='*60}")
    _, usdc_after = get_wallet_info(w3, address)
    print(f"  USDC before: ${usdc:.2f}")
    print(f"  USDC after:  ${usdc_after:.2f}")
    gained = usdc_after - usdc
    if gained > 0:
        print(f"  Gained:      +${gained:.2f}")
    print(f"  Positions redeemed: {total_redeemed}")
    if total_failed:
        print(f"  Failures: {total_failed}")
    print(f"\n  Polygonscan: https://polygonscan.com/address/{address}")
    print(f"  Polymarket:  https://polymarket.com/profile/{address}")
    print()


if __name__ == "__main__":
    main()
