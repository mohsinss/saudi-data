import { NextResponse } from "next/server";
import connectMongo from "@/lib/db/mongoose";
import Region from "@/models/Region";

export async function GET() {
  try {
    await connectMongo();
    const regions = await Region.find({}).sort({ nameEn: 1 }).lean();
    return NextResponse.json({ success: true, data: regions });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch regions";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
