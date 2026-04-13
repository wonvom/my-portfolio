"use client";

import { motion } from "motion/react";
import type { GalleryCountry } from "@/types/gallery";

interface CountryCardProps {
  country: GalleryCountry;
  index: number; // for wave stagger
  x: number; // screen x (px)
  y: number; // screen y (px)
  onSelect: (country: GalleryCountry) => void;
}

export function CountryCard({ country, index, x, y, onSelect }: CountryCardProps) {
  return (
    <motion.button
      className="absolute -translate-x-1/2 -translate-y-full pointer-events-auto
        flex flex-col items-center gap-0.5 group"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, y: 10, scale: 0.85 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.85 }}
      transition={{
        delay: index * 0.12,
        duration: 0.45,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{ scale: 1.08, y: -3 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onSelect(country)}
      aria-label={`${country.name} — ${country.totalPhotos} photos`}
    >
      {/* Card */}
      <div className="rounded-xl px-3 py-1.5 backdrop-blur-md shadow-lg
        bg-white/85 dark:bg-neutral-900/85
        border border-neutral-200/80 dark:border-neutral-700/60
        group-hover:bg-white dark:group-hover:bg-neutral-800
        transition-colors duration-200">
        <p className="text-xs font-semibold text-neutral-800 dark:text-neutral-100 whitespace-nowrap">
          {country.name}
        </p>
        <p className="text-[10px] text-neutral-400 dark:text-neutral-500 text-center tabular-nums">
          {country.totalPhotos}
        </p>
      </div>
      {/* Stem */}
      <div className="w-px h-3 bg-red-400/70" />
      {/* Red sphere pin */}
      <div
        className="w-3 h-3 rounded-full flex-shrink-0 transition-transform duration-200 group-hover:scale-125"
        style={{
          background: "radial-gradient(circle at 36% 30%, #ff9090 0%, #e52222 48%, #7a0000 100%)",
          boxShadow: "0 1px 6px rgba(180,0,0,0.55), inset 0 -1px 3px rgba(0,0,0,0.35)",
        }}
      />
    </motion.button>
  );
}
