"use client";

import { useEffect, useState } from "react";
import { geoNaturalEarth1, geoPath } from "d3-geo";
import * as topojson from "topojson-client";
import { motion } from "motion/react";
import { CityCard } from "./CityCard";
import type { GalleryCountry, GalleryCity } from "@/types/gallery";
import type { Topology, GeometryCollection } from "topojson-specification";
import type { Feature, FeatureCollection, Geometry } from "geojson";

const ATLAS_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface Props {
  country: GalleryCountry;
  onBack: () => void;
  onSelectCity: (city: GalleryCity) => void;
}

export function CountryDetailView({ country, onBack, onSelectCity }: Props) {
  const [countryPath, setCountryPath] = useState("");

  useEffect(() => {
    fetch(ATLAS_URL)
      .then((r) => r.json())
      .then((topo: Topology) => {
        const fc = topojson.feature(
          topo,
          topo.objects.countries as GeometryCollection
        ) as FeatureCollection<Geometry>;

        const feat = fc.features.find(
          (f: Feature<Geometry>) =>
            String((f as { id?: string | number }).id ?? "") === country.isoNumeric
        ) as Feature<Geometry> | undefined;

        if (feat) {
          const w = typeof window !== "undefined" ? window.innerWidth : 1280;
          const h = typeof window !== "undefined" ? window.innerHeight : 800;
          const proj = geoNaturalEarth1().fitSize([w * 0.7, h * 0.7], feat);
          const path = geoPath(proj);
          setCountryPath(path(feat) ?? "");
        }
      })
      .catch(console.error);
  }, [country.isoNumeric]);

  const isDark = typeof document !== "undefined" && document.documentElement.classList.contains("dark");
  const landFill = isDark ? "#1e2d40" : "#c8d8e8";
  const landStroke = isDark ? "#3a5070" : "#8090a0";

  return (
    <motion.div
      className="relative w-full h-full flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {/* Back button */}
      <motion.button
        className="absolute top-6 left-6 z-20 flex items-center gap-2 rounded-xl px-4 py-2
          bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md
          border border-neutral-200 dark:border-neutral-700/60
          text-sm text-neutral-600 dark:text-neutral-400
          hover:text-neutral-900 dark:hover:text-white transition-colors duration-200
          shadow-sm"
        onClick={onBack}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
      >
        <span className="text-base leading-none">←</span>
        <span>World Map</span>
      </motion.button>

      {/* Country name */}
      <motion.h1
        className="absolute top-6 left-1/2 -translate-x-1/2 z-20 text-lg font-semibold tracking-wide
          text-neutral-700 dark:text-neutral-300"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {country.name}
      </motion.h1>

      {/* Country SVG outline */}
      <div className="flex-1 flex items-center justify-center">
        {countryPath && (
          <motion.svg
            width="70vw"
            height="70vh"
            viewBox={`0 0 ${typeof window !== "undefined" ? window.innerWidth * 0.7 : 900} ${typeof window !== "undefined" ? window.innerHeight * 0.7 : 560}`}
            className="drop-shadow-2xl"
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            <path
              d={countryPath}
              fill={landFill}
              stroke={landStroke}
              strokeWidth={1.5}
              strokeLinejoin="round"
            />
          </motion.svg>
        )}
      </div>

      {/* City cards */}
      <motion.div
        className="absolute bottom-8 left-0 right-0 px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <div className="flex gap-3 flex-wrap justify-center max-w-5xl mx-auto">
          {country.cities.map((city, i) => (
            <CityCard key={city.name} city={city} index={i} onSelect={onSelectCity} />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
