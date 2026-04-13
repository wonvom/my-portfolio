import type { Metadata } from "next";
import { getTravelData } from "@/lib/travelData";
import { GalleryEntry } from "@/components/gallery/GalleryEntry";

export const metadata: Metadata = {
  title: "Gallery — Wonjong Kim",
  description: "Travel photography gallery",
};

export default function GalleryPage() {
  const countries = getTravelData();
  return <GalleryEntry countries={countries} />;
}
