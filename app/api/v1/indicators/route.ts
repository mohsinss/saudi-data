import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/lib/db/mongoose";
import Indicator from "@/models/Indicator";

export async function GET(req: NextRequest) {
  try {
    await connectMongo();

    const { searchParams } = req.nextUrl;
    const category = searchParams.get("category");
    const subcategory = searchParams.get("subcategory");

    const filter: Record<string, unknown> = { isActive: true };
    if (category) filter.category = category;
    if (subcategory) filter.subcategory = subcategory;

    const indicators = await Indicator.find(filter)
      .sort({ sortOrder: 1 })
      .lean();

    return NextResponse.json({ success: true, data: indicators });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch indicators";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
