/**
 * Port Aransas Business Scraper
 *
 * Scrapes the Port Aransas Chamber of Commerce directory (portaransas.org)
 * and other public sources to discover and catalog all local businesses
 * physically located on the island.
 *
 * Usage:
 *   npx tsx scripts/scrape-port-a-businesses.ts
 *
 * Output:
 *   scripts/output/port-a-businesses.json
 */

import https from "https";
import http from "http";
import fs from "fs";
import path from "path";

interface ScrapedBusiness {
  name: string;
  category: string;
  address: string;
  phone: string;
  website: string;
  description: string;
  source: string;
  scrapedAt: string;
}

const CATEGORIES = [
  { name: "Restaurants", path: "/restaurants/" },
  { name: "Lodging", path: "/lodging/" },
  { name: "Shopping", path: "/things-to-do/shopping/" },
  { name: "Fishing", path: "/things-to-do/fishing/" },
  { name: "Beach Cart Rentals", path: "/things-to-do/beach-cart-rentals/" },
  { name: "Boat Tours", path: "/things-to-do/water-sports/" },
  { name: "Services", path: "/services/" },
];

const BASE_URL = "https://www.portaransas.org";

function fetch(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const client = url.startsWith("https") ? https : http;
    client
      .get(url, { headers: { "User-Agent": "PortALocal-Scraper/1.0" } }, (res) => {
        if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return fetch(res.headers.location).then(resolve).catch(reject);
        }
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => resolve(data));
        res.on("error", reject);
      })
      .on("error", reject);
  });
}

function extractListings(html: string, category: string): ScrapedBusiness[] {
  const businesses: ScrapedBusiness[] = [];

  // Match listing cards — Port Aransas org uses a common card pattern
  // with business name, address, phone, and link
  const listingPattern =
    /<div[^>]*class="[^"]*listing[^"]*"[^>]*>[\s\S]*?<\/div>\s*<\/div>/gi;
  const listings = html.match(listingPattern) || [];

  // Also try a simpler pattern for h2/h3 links within listing containers
  const linkPattern =
    /<a[^>]*href="(\/listing\/[^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;
  let match;
  while ((match = linkPattern.exec(html)) !== null) {
    const url = match[1];
    const nameHtml = match[2];
    const name = nameHtml.replace(/<[^>]+>/g, "").trim();

    if (name && !businesses.some((b) => b.name === name)) {
      businesses.push({
        name,
        category,
        address: "",
        phone: "",
        website: `${BASE_URL}${url}`,
        description: "",
        source: "portaransas.org",
        scrapedAt: new Date().toISOString(),
      });
    }
  }

  return businesses;
}

function extractDetailInfo(
  html: string,
  business: ScrapedBusiness
): ScrapedBusiness {
  // Extract address
  const addressMatch = html.match(
    /(?:address|location)[^<]*<[^>]*>([^<]*Port Aransas[^<]*)/i
  );
  if (addressMatch) {
    business.address = addressMatch[1].trim();
  }

  // Try another address pattern
  if (!business.address) {
    const addrMatch = html.match(
      /(\d+[^<,]*,\s*Port Aransas,?\s*TX\s*\d{5})/i
    );
    if (addrMatch) {
      business.address = addrMatch[1].trim();
    }
  }

  // Extract phone
  const phoneMatch = html.match(
    /(?:phone|tel)[^<]*<[^>]*>\s*\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/i
  );
  if (phoneMatch) {
    const digits = phoneMatch[0].match(/\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
    if (digits) business.phone = digits[0];
  }

  if (!business.phone) {
    const phoneSimple = html.match(/\(361\)\s*\d{3}[-.]?\d{4}/);
    if (phoneSimple) business.phone = phoneSimple[0];
  }

  // Extract description from meta or first paragraph
  const metaDesc = html.match(
    /<meta[^>]*name="description"[^>]*content="([^"]*)"/i
  );
  if (metaDesc) {
    business.description = metaDesc[1].trim();
  }

  // Extract external website
  const websiteMatch = html.match(
    /(?:website|visit)[^<]*<a[^>]*href="(https?:\/\/(?!www\.portaransas\.org)[^"]+)"/i
  );
  if (websiteMatch) {
    business.website = websiteMatch[1];
  }

  return business;
}

function isOnIsland(address: string): boolean {
  const lower = address.toLowerCase();
  // Must be Port Aransas — not Aransas Pass, not Flour Bluff, not Corpus Christi
  if (
    lower.includes("aransas pass") ||
    lower.includes("flour bluff") ||
    lower.includes("corpus christi") ||
    lower.includes("rockport") ||
    lower.includes("ingleside")
  ) {
    return false;
  }
  return lower.includes("port aransas") || lower.includes("port a");
}

async function scrapeCategory(
  categoryName: string,
  categoryPath: string
): Promise<ScrapedBusiness[]> {
  console.log(`Scraping ${categoryName}...`);
  try {
    const html = await fetch(`${BASE_URL}${categoryPath}`);
    const businesses = extractListings(html, categoryName);
    console.log(`  Found ${businesses.length} listings in ${categoryName}`);

    // Fetch detail pages for each listing (with rate limiting)
    for (let i = 0; i < businesses.length; i++) {
      try {
        await new Promise((r) => setTimeout(r, 500)); // Rate limit
        const detailHtml = await fetch(businesses[i].website);
        extractDetailInfo(detailHtml, businesses[i]);
      } catch {
        console.log(`  Warning: Could not fetch details for ${businesses[i].name}`);
      }
    }

    return businesses;
  } catch (err) {
    console.error(`  Error scraping ${categoryName}:`, err);
    return [];
  }
}

async function main() {
  console.log("Port Aransas Business Scraper");
  console.log("=============================\n");

  const allBusinesses: ScrapedBusiness[] = [];

  for (const cat of CATEGORIES) {
    const businesses = await scrapeCategory(cat.name, cat.path);
    allBusinesses.push(...businesses);
  }

  // Filter to only on-island businesses
  const islandBusinesses = allBusinesses.filter((b) => {
    if (!b.address) return true; // Keep if we couldn't determine address
    return isOnIsland(b.address);
  });

  // Deduplicate by name
  const seen = new Set<string>();
  const unique = islandBusinesses.filter((b) => {
    const key = b.name.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  console.log(`\nTotal unique on-island businesses found: ${unique.length}`);

  // Write output
  const outputDir = path.join(__dirname, "output");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, "port-a-businesses.json");
  fs.writeFileSync(outputPath, JSON.stringify(unique, null, 2));
  console.log(`Results written to ${outputPath}`);

  // Print summary
  const byCat: Record<string, number> = {};
  for (const b of unique) {
    byCat[b.category] = (byCat[b.category] || 0) + 1;
  }
  console.log("\nBy category:");
  for (const [cat, count] of Object.entries(byCat)) {
    console.log(`  ${cat}: ${count}`);
  }
}

main().catch(console.error);
