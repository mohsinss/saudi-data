import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/lib/db/mongoose";
import Indicator from "@/models/Indicator";
import DataPoint from "@/models/DataPoint";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, context: RouteContext) {
  try {
    await connectMongo();

    const { id } = await context.params;
    const { searchParams } = req.nextUrl;
    const yearFrom = searchParams.get("yearFrom");
    const yearTo = searchParams.get("yearTo");
    const region = searchParams.get("region");
    const frequency = searchParams.get("frequency");

    const indicator = await Indicator.findOne({ slug: id }).lean();
    if (!indicator) {
      return NextResponse.json(
        { success: false, error: "Indicator not found" },
        { status: 404 }
      );
    }

    const filter: Record<string, unknown> = { indicatorSlug: id };

    if (yearFrom || yearTo) {
      filter.year = {};
      if (yearFrom) (filter.year as Record<string, number>).$gte = parseInt(yearFrom, 10);
      if (yearTo) (filter.year as Record<string, number>).$lte = parseInt(yearTo, 10);
    }

    if (region) filter.region = region;

    if (frequency === "quarterly") {
      filter.quarter = { $exists: true, $ne: null };
      filter.month = { $exists: false };
    } else if (frequency === "monthly") {
      filter.month = { $exists: true, $ne: null };
    } else if (frequency === "annual") {
      filter.quarter = { $exists: false };
      filter.month = { $exists: false };
    }

    const dataPoints = await DataPoint.find(filter)
      .sort({ date: 1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: {
        indicator,
        dataPoints,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch data";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
