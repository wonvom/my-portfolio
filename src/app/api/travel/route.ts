import { NextResponse } from "next/server";
import { getTravelData } from "@/lib/travelData";

export async function GET() {
  try {
    const countries = getTravelData();
    return NextResponse.json({ countries });
  } catch (err) {
    console.error("Travel data error:", err);
    return NextResponse.json({ error: "Failed to load travel data" }, { status: 500 });
  }
}
