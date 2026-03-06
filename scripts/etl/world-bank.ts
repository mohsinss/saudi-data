/**
 * ETL: World Bank API -> MongoDB
 *
 * Fetches Saudi Arabia indicators from the World Bank API and stores them.
 * Run: npx tsx scripts/etl/world-bank.ts
 */

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI ?? "";
const BASE_URL = "https://api.worldbank.org/v2/country/SA/indicator";

interface WBDataPoint {
  date: string;
  value: number | null;
}

interface WBResponse {
  page: number;
  pages: number;
  per_page: number;
  total: number;
}

const WB_INDICATORS: Record<string, string> = {
  "NY.GDP.MKTP.CD": "gdp-nominal-usd",
  "NY.GDP.MKTP.KD.ZG": "gdp-growth-rate",
  "SP.POP.TOTL": "total-population-wb",
  "SL.UEM.TOTL.ZS": "unemployment-rate-wb",
  "SP.DYN.LE00.IN": "life-expectancy-wb",
  "FP.CPI.TOTL.ZG": "inflation-wb",
  "BX.KLT.DINV.CD.WD": "fdi-net-inflows-wb",
};

async function fetchIndicator(
  indicatorCode: string,
  startYear: number,
  endYear: number
): Promise<WBDataPoint[]> {
  const url = `${BASE_URL}/${indicatorCode}?format=json&date=${startYear}:${endYear}&per_page=100`;
  const response = await fetch(url);

  if (!response.ok) {
    console.error(`Failed to fetch ${indicatorCode}: ${response.status}`);
    return [];
  }

  const json = await response.json();
  if (!Array.isArray(json) || json.length < 2) return [];

  const [_meta, data] = json as [WBResponse, WBDataPoint[]];
  return (data ?? []).filter((d: WBDataPoint) => d.value !== null);
}

async function run() {
  if (!MONGODB_URI) {
    console.error("Set MONGODB_URI environment variable");
    process.exit(1);
  }

  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");

  const db = mongoose.connection.db;
  if (!db) throw new Error("Database connection not established");
  const collection = db.collection("datapoints");

  for (const [wbCode, slug] of Object.entries(WB_INDICATORS)) {
    console.log(`Fetching ${wbCode} -> ${slug}...`);
    const data = await fetchIndicator(wbCode, 2010, 2025);

    if (data.length === 0) {
      console.log(`  No data for ${wbCode}`);
      continue;
    }

    const docs = data.map((d: WBDataPoint) => ({
      indicatorSlug: slug,
      year: parseInt(d.date, 10),
      date: new Date(parseInt(d.date, 10), 0, 1),
      value: d.value as number,
    }));

    await collection.deleteMany({ indicatorSlug: slug });
    await collection.insertMany(docs);
    console.log(`  Inserted ${docs.length} data points for ${slug}`);
  }

  await mongoose.disconnect();
  console.log("ETL complete");
}

run().catch(console.error);
