import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import path from "path";
import fs from "fs";

const TRAVEL_ROOT = path.join(process.cwd(), "image", "travel");

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const relativePath = searchParams.get("path");

  if (!relativePath) {
    return NextResponse.json({ error: "Missing path" }, { status: 400 });
  }

  // Prevent path traversal
  const fullPath = path.resolve(TRAVEL_ROOT, relativePath);
  if (!fullPath.startsWith(TRAVEL_ROOT)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  if (!fs.existsSync(fullPath)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const isThumbnail = searchParams.get("thumbnail") === "true";

  try {
    let pipeline = sharp(fullPath, { failOn: "none" });

    if (isThumbnail) {
      pipeline = pipeline.resize(480, 360, { fit: "cover", position: "centre" });
    } else {
      pipeline = pipeline.resize(1920, 1920, { fit: "inside", withoutEnlargement: true });
    }

    const buffer = await pipeline.jpeg({ quality: isThumbnail ? 80 : 90 }).toBuffer();

    return new Response(buffer as unknown as BodyInit, {
      headers: {
        "Content-Type": "image/jpeg",
        "Cache-Control": "public, max-age=86400, immutable",
      },
    });
  } catch (err) {
    console.error("Image error:", err);
    return NextResponse.json({ error: "Image processing failed" }, { status: 500 });
  }
}
