"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { FlipBoard } from "./FlipBoard";
import type { GalleryCity } from "@/types/gallery";

interface CityCardProps {
  city: GalleryCity;
  index: number;
  onSelect: (city: GalleryCity) => void;
}

export function CityCard({ city, index, onSelect }: CityCardProps) {
  const [hovered, setHovered] = useState(false);
  const years = [...new Set(city.photos.map((p) => p.year))].sort();
  const yearStr = years.length > 0 ? String(years[years.length - 1]) : "----";
  const thumb =
    city.photos.length > 0
      ? `/api/travel/image?path=${encodeURIComponent(city.photos[0].path)}&thumbnail=true`
      : null;

  return (
    <motion.button
      className="group relative flex flex-col overflow-hidden rounded-2xl border text-left cursor-pointer
        bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md
        border-neutral-200 dark:border-neutral-700/60
        shadow-[0_4px_24px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.4)]
        w-[160px] sm:w-[180px] flex-shrink-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ scale: 1.04, y: -4 }}
      whileTap={{ scale: 0.97 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => onSelect(city)}
      aria-label={`${city.name} — ${city.photos.length} photos`}
    >
      {/* Thumbnail */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-neutral-100 dark:bg-neutral-800">
        {thumb && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={thumb}
            alt={city.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        )}
        {/* Photo count badge */}
        <span className="absolute bottom-2 right-2 rounded-full px-2 py-0.5 text-[10px] font-medium
          bg-black/50 text-white backdrop-blur-sm">
          {city.photos.length} photo{city.photos.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Info */}
      <div
        className="p-3 transition-colors duration-200"
        style={hovered ? { backgroundColor: "var(--city-card-hover)" } : undefined}
      >
        <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-100 truncate">
          {city.name}
        </p>
        <p className={`text-xs mt-0.5 font-mono transition-colors duration-150 ${
          hovered
            ? "text-neutral-900 dark:text-white font-bold"
            : "text-neutral-400 dark:text-neutral-500"
        }`}>
          <FlipBoard value={yearStr} />
        </p>
      </div>

      {/* Hover invert overlay */}
      {hovered && (
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            background:
              "linear-gradient(135deg, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.02) 100%)",
          }}
        />
      )}
    </motion.button>
  );
}
