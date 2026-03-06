/**
 * ETL: GASTAT Data -> MongoDB
 *
 * GASTAT publishes Excel files. This script provides utilities to parse
 * downloaded Excel files and insert them into MongoDB.
 *
 * Usage:
 *   1. Download Excel files from https://stats.gov.sa/en/recent-releases
 *   2. Place them in scripts/etl/data/
 *   3. Run: npx tsx scripts/etl/fetch-gastat.ts
 *
 * For automated usage, the script also includes helpers to structure
 * manually collected data.
 */

import mongoose from "mongoose";
import * as XLSX from "xlsx";
import * as fs from "fs";
import * as path from "path";

const MONGODB_URI = process.env.MONGODB_URI ?? "";

interface ParsedRow {
  indicatorSlug: string;
  year: number;
  month?: number;
  quarter?: number;
  value: number;
  region?: string;
  breakdown?: string;
  breakdownValue?: string;
}

export function parseExcelFile(
  filePath: string,
  config: {
    indicatorSlug: string;
    sheetName?: string;
    yearColumn: string;
    valueColumn: string;
    monthColumn?: string;
    quarterColumn?: string;
    regionColumn?: string;
  }
): ParsedRow[] {
  const workbook = XLSX.readFile(filePath);
  const sheetName = config.sheetName ?? workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet);

  return rows
    .map((row) => {
      const year = Number(row[config.yearColumn]);
      const value = Number(row[config.valueColumn]);
      if (isNaN(year) || isNaN(value)) return null;

      const result: ParsedRow = {
        indicatorSlug: config.indicatorSlug,
        year,
        value,
      };

      if (config.monthColumn && row[config.monthColumn]) {
        result.month = Number(row[config.monthColumn]);
      }
      if (config.quarterColumn && row[config.quarterColumn]) {
        result.quarter = Number(row[config.quarterColumn]);
      }
      if (config.regionColumn && row[config.regionColumn]) {
        result.region = String(row[config.regionColumn]);
      }

      return result;
    })
    .filter((r): r is ParsedRow => r !== null);
}

function buildDate(year: number, month?: number, quarter?: number): Date {
  if (month) return new Date(year, month - 1, 1);
  if (quarter) return new Date(year, (quarter - 1) * 3, 1);
  return new Date(year, 0, 1);
}

async function insertParsedData(data: ParsedRow[]) {
  const db = mongoose.connection.db;
  if (!db) throw new Error("Database connection not established");
  const collection = db.collection("datapoints");

  const docs = data.map((d) => ({
    ...d,
    date: buildDate(d.year, d.month, d.quarter),
  }));

  if (docs.length > 0) {
    const slug = docs[0].indicatorSlug;
    await collection.deleteMany({ indicatorSlug: slug });
    await collection.insertMany(docs);
    console.log(`Inserted ${docs.length} rows for ${slug}`);
  }
}

async function processDataDirectory() {
  const dataDir = path.join(__dirname, "data");
  if (!fs.existsSync(dataDir)) {
    console.log("No data/ directory found. Create scripts/etl/data/ and place Excel files there.");
    console.log("Example: scripts/etl/data/gdp.xlsx");
    return;
  }

  const files = fs.readdirSync(dataDir).filter((f) => f.endsWith(".xlsx") || f.endsWith(".xls"));
  console.log(`Found ${files.length} Excel files in data/`);

  for (const file of files) {
    const filePath = path.join(dataDir, file);
    console.log(`Processing ${file}...`);
    try {
      const parsed = parseExcelFile(filePath, {
        indicatorSlug: path.basename(file, path.extname(file)),
        yearColumn: "Year",
        valueColumn: "Value",
      });
      await insertParsedData(parsed);
    } catch (err) {
      console.error(`Error processing ${file}:`, err);
    }
  }
}

async function run() {
  if (!MONGODB_URI) {
    console.error("Set MONGODB_URI environment variable");
    process.exit(1);
  }

  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");

  await processDataDirectory();

  await mongoose.disconnect();
  console.log("GASTAT ETL complete");
}

run().catch(console.error);
