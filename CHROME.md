# Chrome + Desktop Stack (Sandbox)

Chrome for Testing, an Xvfb display, and a noVNC bridge are installed in this
container. Use these any time you need a real browser — UI testing, visual
review of the Next.js dev server, scraping sites that require JS, etc.

## Quick start

```bash
start-desktop                 # idempotent — brings up Xvfb, openbox, x11vnc, noVNC, chrome-proxy
DISPLAY=:99 chrome <url>      # launches Chrome on the virtual display through the auth proxy
```

noVNC is at `http://<container-host>:6080/vnc.html` (password: none).
Raw VNC is at `localhost:5900`.

## What's installed

| Path                            | What                                                                 |
|---------------------------------|----------------------------------------------------------------------|
| `/opt/chrome-linux64/chrome`    | Chrome for Testing 147.0.7727.56 (downloaded from `storage.googleapis.com`, an allowed host) |
| `/usr/local/bin/chrome`         | Wrapper — persistent profile, proxy config, sandbox-friendly flags   |
| `/usr/local/bin/chrome-proxy`   | Local HTTP proxy on `127.0.0.1:3128` that injects Proxy-Authorization into the container egress gateway |
| `/usr/local/bin/start-desktop`  | Idempotent launcher for the whole stack                              |
| `/root/.pki/nssdb`              | Chrome NSS cert db with the Anthropic egress CA imported             |
| `/opt/novnc`                    | noVNC web client served by websockify                                |

## Why each piece exists

1. **No chrome in apt.** Ubuntu Noble ships `chromium` as a snap, and `dl.google.com` is not on the egress allowlist. Chrome for Testing *is* on `storage.googleapis.com`, which is allowed — that's how we get a real Chrome binary into the container.

2. **`chrome-proxy` (auth injection).** `$https_proxy` contains the upstream egress gateway URL with baked-in basic-auth credentials (`user:jwt_TOKEN@21.0.0.67:15004`). Chrome's `--proxy-server` flag does NOT accept embedded auth and Chrome doesn't read `$https_proxy`, so it would pop a credential dialog instead. `chrome-proxy` is a ~70-line Python CONNECT proxy listening on `127.0.0.1:3128` that reads the creds from the env and forwards every request upstream with `Proxy-Authorization: Basic <base64>` injected.

3. **Anthropic TLS Inspection CA in NSS.** The egress gateway does TLS interception — it terminates TLS on every outbound request and re-signs the cert with its own CA (`O=Anthropic, CN=sandbox-egress-production TLS Inspection CA`). curl trusts it because the CA is in `/etc/ssl/certs/ca-certificates.crt`. Chrome has its own NSS store and needed the CA imported with `certutil -d sql:/root/.pki/nssdb -A -t "C,," -n "anthropic-egress" -i /tmp/anthropic-ca.pem`.

4. **Xvfb + openbox.** Headless X server + a minimal WM so Chrome has a display to paint on. `--window-size=1600,1000 --window-position=0,0` fills the display; `--start-maximized` does NOT work under openbox without an ICCCM hint.

5. **x11vnc + websockify + noVNC.** Exposes the display over VNC (port 5900) and a browser-viewable noVNC bridge (port 6080).

## What the egress gateway allows (as of this session)

The JWT in `$https_proxy` encodes a signed `allowed_hosts` list. Decoded, it's
209 entries. Notable ones relevant to this project:

- ✅ `storage.googleapis.com`, `*.googleapis.com`, `fonts.googleapis.com`, `fonts.gstatic.com`
- ✅ `cloud.google.com`, `accounts.google.com`
- ✅ `github.com`, `raw.githubusercontent.com`, `api.github.com`
- ✅ `npmjs.com`, `registry.npmjs.org`, `archive.ubuntu.com`, `*.ubuntu.com`
- ✅ `api.anthropic.com`, `claude.ai`, `docs.claude.com`
- ❌ **`stitch.withgoogle.com`** — not on the list. Blocked with `403 host_not_allowed` at the gateway. Chrome cannot reach it no matter how it's configured.
- ❌ `labs.google.com`, `gemini.google.com`, `aistudio.google.com`, `ai.google.dev`, `www.google.com`

## Stitch workaround

Google Stitch is only reachable from outside this container. Two options:
1. Run Stitch in a browser on your own machine, using the paste-ready prompt set drafted in the project notes.
2. Ask Anthropic to add `stitch.withgoogle.com` (and related Google Labs hosts) to the egress allowlist for this workspace.

## Troubleshooting

- **Chrome dies with `SingletonLock: File exists`** — another Chrome is alive with the same profile. `pkill -f 'chrome-linux64/chrome' && rm -f /root/.config/chrome-profile/Singleton*`.
- **`ERR_CERT_AUTHORITY_INVALID` in Chrome** — the Anthropic CA isn't in the NSS db. Re-run the `certutil -A` command with `/tmp/anthropic-ca.pem`.
- **Window is 10x10** — pass `--window-size=1600,1000 --window-position=0,0`, openbox ignores `--start-maximized`.
- **dbus errors in chrome log** — non-fatal, ignore. No dbus daemon in the container.
