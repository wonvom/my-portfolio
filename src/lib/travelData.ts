import fs from "fs";
import path from "path";
import { COUNTRY_META } from "./countryMeta";
import type { GalleryCountry, GalleryPhoto, GalleryCity } from "@/types/gallery";

const TRAVEL_ROOT = path.join(process.cwd(), "image", "travel");
const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".heic", ".heif", ".png", ".webp"]);

function isImage(filename: string): boolean {
  return IMAGE_EXTS.has(path.extname(filename).toLowerCase());
}

function getYear(filePath: string): number {
  try {
    return fs.statSync(filePath).mtime.getFullYear();
  } catch {
    return new Date().getFullYear();
  }
}

function scanLeafFolders(
  dir: string,
  cityMap: Map<string, { countryName: string; cities: GalleryCity[] }>
): void {
  let entries: fs.Dirent[];
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }

  const imageFiles = entries.filter((e) => e.isFile() && isImage(e.name));

  if (imageFiles.length > 0) {
    const cityName = path.basename(dir);
    const countryName = path.basename(path.dirname(dir));

    const photos: GalleryPhoto[] = imageFiles.map((e) => {
      const fullPath = path.join(dir, e.name);
      const relativePath = path.relative(TRAVEL_ROOT, fullPath);
      return { filename: e.name, path: relativePath, year: getYear(fullPath) };
    });

    if (!cityMap.has(countryName)) {
      cityMap.set(countryName, { countryName, cities: [] });
    }
    cityMap.get(countryName)!.cities.push({ name: cityName, photos });
  } else {
    for (const entry of entries) {
      if (entry.isDirectory() && !entry.name.startsWith(".")) {
        scanLeafFolders(path.join(dir, entry.name), cityMap);
      }
    }
  }
}

export function getTravelData(): GalleryCountry[] {
  const cityMap = new Map<string, { countryName: string; cities: GalleryCity[] }>();
  scanLeafFolders(TRAVEL_ROOT, cityMap);

  const countries: GalleryCountry[] = [];
  cityMap.forEach(({ countryName, cities }) => {
    const meta = COUNTRY_META[countryName];
    countries.push({
      name: countryName,
      isoNumeric: meta?.isoNumeric ?? "",
      cities,
      totalPhotos: cities.reduce((s, c) => s + c.photos.length, 0),
    });
  });

  // Sort west to east (longitude)
  return countries.sort(
    (a, b) =>
      (COUNTRY_META[a.name]?.lon ?? 0) - (COUNTRY_META[b.name]?.lon ?? 0)
  );
}
