export interface GalleryPhoto {
  filename: string;
  path: string; // relative to travel root (URL-safe)
  year: number;
}

export interface GalleryCity {
  name: string;
  photos: GalleryPhoto[];
}

export interface GalleryCountry {
  name: string;
  isoNumeric: string; // ISO 3166-1 numeric code for world-atlas
  cities: GalleryCity[];
  totalPhotos: number;
}

export interface TravelData {
  countries: GalleryCountry[];
}

export type GalleryView = "world" | "country";
