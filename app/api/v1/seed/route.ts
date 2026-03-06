import { NextResponse } from "next/server";
import connectMongo from "@/lib/db/mongoose";
import Indicator from "@/models/Indicator";
import DataPoint from "@/models/DataPoint";
import Region from "@/models/Region";
import Country from "@/models/Country";
import { INDICATOR_CATALOG } from "@/lib/data/indicators";
import { SAUDI_REGIONS } from "@/lib/data/regions";
import { TRADE_PARTNERS } from "@/lib/data/countries";
import { SEED_DATA } from "@/lib/data/seed-data";

function buildDate(year: number, month?: number, quarter?: number): Date {
  if (month) return new Date(year, month - 1, 1);
  if (quarter) return new Date(year, (quarter - 1) * 3, 1);
  return new Date(year, 0, 1);
}

export async function POST() {
  try {
    await connectMongo();

    await Promise.all([
      Indicator.deleteMany({}),
      DataPoint.deleteMany({}),
      Region.deleteMany({}),
      Country.deleteMany({}),
    ]);

    await Indicator.insertMany(
      INDICATOR_CATALOG.map((ind) => ({
        ...ind,
        descriptionEn: "",
        descriptionAr: "",
        lastUpdated: new Date(),
        isActive: true,
      }))
    );

    await Region.insertMany(
      SAUDI_REGIONS.map((r) => ({
        ...r,
        population: 0,
        populationYear: 2024,
      }))
    );

    await Country.insertMany(TRADE_PARTNERS);

    const dataPoints = SEED_DATA.map((dp) => ({
      ...dp,
      date: buildDate(dp.year, dp.month, dp.quarter),
    }));

    const BATCH_SIZE = 500;
    for (let i = 0; i < dataPoints.length; i += BATCH_SIZE) {
      await DataPoint.insertMany(dataPoints.slice(i, i + BATCH_SIZE));
    }

    return NextResponse.json({
      success: true,
      data: {
        indicators: INDICATOR_CATALOG.length,
        dataPoints: dataPoints.length,
        regions: SAUDI_REGIONS.length,
        countries: TRADE_PARTNERS.length,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Seed failed";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
