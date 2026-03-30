/**
 * Port Aransas Airbnb Superhost Collector
 *
 * Collects publicly available Airbnb superhost listing data for Port Aransas, TX.
 * This data will be cross-referenced with local tax records to identify property
 * owners for marketing outreach.
 *
 * Data collected (all publicly available):
 *   - Listing name & URL
 *   - Host name & superhost status
 *   - Property type & location (neighborhood)
 *   - Number of reviews & rating
 *   - Estimated nightly rate
 *
 * Usage:
 *   npx tsx scripts/collect-superhosts.ts
 *
 * Output:
 *   scripts/output/superhosts.json
 *   scripts/output/superhosts.csv
 *
 * Note: Airbnb aggressively blocks automated scraping. This script is designed
 * to work with manual data exports or publicly available listing data. For
 * production use, consider using the Airbnb API (if available) or a third-party
 * data provider like AirDNA, Mashvisor, or AllTheRooms.
 */

import fs from "fs";
import path from "path";

interface SuperhostListing {
  listingName: string;
  listingUrl: string;
  hostName: string;
  isSuperhost: boolean;
  propertyType: string;
  neighborhood: string;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  nightlyRate: string;
  rating: number;
  reviewCount: number;
  scrapedAt: string;
  // For cross-referencing with tax records
  addressHint: string; // neighborhood or area description
  propertyDescription: string;
}

interface TaxRecordMatch {
  superhostListing: SuperhostListing;
  ownerName?: string;
  propertyAddress?: string;
  taxAccountNumber?: string;
  matchConfidence: "high" | "medium" | "low";
  matchMethod: string;
}

const PORT_ARANSAS_BOUNDS = {
  lat: { min: 27.8, max: 27.88 },
  lng: { min: -97.1, max: -97.04 },
};

/**
 * Airbnb blocks direct scraping, so this module supports multiple data sources:
 *
 * 1. Manual CSV import (exported from Airbnb search results)
 * 2. AirDNA API integration (requires subscription)
 * 3. Public listing page parsing (rate-limited, may break)
 */

function parseManualCsvExport(csvPath: string): SuperhostListing[] {
  if (!fs.existsSync(csvPath)) {
    console.log(`No CSV file found at ${csvPath}. Skipping manual import.`);
    return [];
  }

  const content = fs.readFileSync(csvPath, "utf-8");
  const lines = content.split("\n").filter((l) => l.trim());
  if (lines.length < 2) return [];

  const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());
  const listings: SuperhostListing[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",").map((v) => v.trim().replace(/^"|"$/g, ""));
    const row: Record<string, string> = {};
    headers.forEach((h, idx) => (row[h] = values[idx] || ""));

    listings.push({
      listingName: row["name"] || row["listing_name"] || "",
      listingUrl: row["url"] || row["listing_url"] || "",
      hostName: row["host"] || row["host_name"] || "",
      isSuperhost: (row["superhost"] || "").toLowerCase() === "true" || (row["superhost"] || "").toLowerCase() === "yes",
      propertyType: row["property_type"] || row["type"] || "",
      neighborhood: row["neighborhood"] || row["area"] || "",
      bedrooms: parseInt(row["bedrooms"] || "0", 10),
      bathrooms: parseInt(row["bathrooms"] || "0", 10),
      maxGuests: parseInt(row["max_guests"] || row["guests"] || "0", 10),
      nightlyRate: row["price"] || row["nightly_rate"] || "",
      rating: parseFloat(row["rating"] || "0"),
      reviewCount: parseInt(row["reviews"] || row["review_count"] || "0", 10),
      scrapedAt: new Date().toISOString(),
      addressHint: row["neighborhood"] || row["area"] || "Port Aransas",
      propertyDescription: row["description"] || "",
    });
  }

  return listings.filter((l) => l.isSuperhost);
}

/**
 * Generate a CSV template for manual data collection.
 * Users can fill this in by browsing Airbnb search results for Port Aransas.
 */
function generateCsvTemplate(outputPath: string): void {
  const headers = [
    "name",
    "url",
    "host_name",
    "superhost",
    "property_type",
    "neighborhood",
    "bedrooms",
    "bathrooms",
    "max_guests",
    "price",
    "rating",
    "reviews",
    "description",
  ];

  const exampleRow = [
    "Beachfront Condo with Pool",
    "https://airbnb.com/rooms/12345",
    "Jane D.",
    "true",
    "Entire condo",
    "Cinnamon Shore",
    "3",
    "2",
    "8",
    "$250",
    "4.95",
    "127",
    "Beautiful 3BR condo steps from the beach",
  ];

  const content = headers.join(",") + "\n" + exampleRow.join(",") + "\n";
  fs.writeFileSync(outputPath, content);
}

/**
 * Nueces County Appraisal District (NCAD) provides public property records.
 * This generates search URLs for cross-referencing.
 *
 * Tax records are publicly available at:
 * https://www.nuecescad.com/property-search
 */
function generateTaxRecordSearchUrl(listing: SuperhostListing): string {
  // NCAD property search base URL
  const base = "https://www.nuecescad.com/property-search";
  // Can search by owner name, address, or account number
  return `${base}?search=${encodeURIComponent(listing.hostName)}&city=Port+Aransas`;
}

function exportToCsv(listings: SuperhostListing[], outputPath: string): void {
  const headers = [
    "Listing Name",
    "Host Name",
    "Superhost",
    "Property Type",
    "Neighborhood",
    "Bedrooms",
    "Nightly Rate",
    "Rating",
    "Reviews",
    "Listing URL",
    "Tax Record Search URL",
  ];

  const rows = listings.map((l) => [
    `"${l.listingName.replace(/"/g, '""')}"`,
    `"${l.hostName.replace(/"/g, '""')}"`,
    l.isSuperhost ? "Yes" : "No",
    l.propertyType,
    l.neighborhood,
    l.bedrooms,
    l.nightlyRate,
    l.rating,
    l.reviewCount,
    l.listingUrl,
    generateTaxRecordSearchUrl(l),
  ]);

  const csv =
    headers.join(",") + "\n" + rows.map((r) => r.join(",")).join("\n") + "\n";
  fs.writeFileSync(outputPath, csv);
}

async function main() {
  console.log("Port Aransas Airbnb Superhost Collector");
  console.log("=======================================\n");

  const outputDir = path.join(__dirname, "output");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Generate CSV template for manual data collection
  const templatePath = path.join(outputDir, "superhost-template.csv");
  generateCsvTemplate(templatePath);
  console.log(`CSV template generated: ${templatePath}`);
  console.log(
    "  Fill this in with superhost listings from Airbnb search results.\n"
  );

  // Try to import manual CSV data
  const importPath = path.join(outputDir, "superhost-import.csv");
  const listings = parseManualCsvExport(importPath);

  if (listings.length > 0) {
    console.log(`Imported ${listings.length} superhost listings from CSV.\n`);

    // Export enriched data
    const jsonPath = path.join(outputDir, "superhosts.json");
    fs.writeFileSync(jsonPath, JSON.stringify(listings, null, 2));
    console.log(`JSON output: ${jsonPath}`);

    const csvPath = path.join(outputDir, "superhosts.csv");
    exportToCsv(listings, csvPath);
    console.log(`CSV output with tax record links: ${csvPath}`);

    // Summary
    const byNeighborhood: Record<string, number> = {};
    for (const l of listings) {
      const key = l.neighborhood || "Unknown";
      byNeighborhood[key] = (byNeighborhood[key] || 0) + 1;
    }

    console.log("\nSuperhost listings by neighborhood:");
    for (const [area, count] of Object.entries(byNeighborhood).sort(
      (a, b) => b[1] - a[1]
    )) {
      console.log(`  ${area}: ${count}`);
    }

    const avgRate =
      listings.reduce((sum, l) => {
        const rate = parseFloat(l.nightlyRate.replace(/[^0-9.]/g, ""));
        return sum + (isNaN(rate) ? 0 : rate);
      }, 0) / listings.length;

    console.log(`\nAverage nightly rate: $${avgRate.toFixed(0)}`);
    console.log(`Total superhosts: ${listings.length}`);
  } else {
    console.log("No superhost data imported yet.\n");
    console.log("To get started:");
    console.log("  1. Go to airbnb.com and search for Port Aransas, TX");
    console.log("  2. Filter for Superhost listings");
    console.log("  3. Record listing data in the template CSV");
    console.log(`     Template: ${templatePath}`);
    console.log(`     Save as:  ${importPath}`);
    console.log("  4. Run this script again to process and enrich the data\n");
    console.log("Alternative data sources:");
    console.log("  - AirDNA (airdna.co) — market analytics with host data");
    console.log("  - Mashvisor — investment analytics with rental data");
    console.log("  - AllTheRooms — vacation rental data aggregator\n");
    console.log("For tax record cross-referencing:");
    console.log("  - Nueces County Appraisal District: nuecescad.com");
    console.log("  - Search by owner name or property address");
    console.log("  - Public records include owner name, mailing address, & property details");
  }
}

main().catch(console.error);
