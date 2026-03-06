import { NextResponse } from "next/server";
import connectMongo from "@/lib/db/mongoose";
import Country from "@/models/Country";

export async function GET() {
  try {
    await connectMongo();
    const countries = await Country.find({}).sort({ nameEn: 1 }).lean();
    return NextResponse.json({ success: true, data: countries });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch countries";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
