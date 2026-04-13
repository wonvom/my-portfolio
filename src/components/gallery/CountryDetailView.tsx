"use client";

import { useEffect, useRef, useState } from "react";
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

interface CountrySvg { d: string; vw: number; vh: number }

export function CountryDetailView({ country, onBack, onSelectCity }: Props) {
  const [svg, setSvg] = useState<CountrySvg | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    const vw = el ? el.clientWidth * 0.72 : 900;
    const vh = el ? el.clientHeight * 0.55 : 480;

    fetch(ATLAS_URL)
      .then((r) => r.json())
      .then((topo: Topology) => {
        const fc = topojson.feature(
          topo,
          topo.objects.countries as GeometryCollection
        ) as FeatureCollection<Geometry>;

        const feat = fc.features.find(
          (f) => String((f as { id?: string | number }).id ?? "") === country.isoNumeric
        ) as Feature<Geometry> | undefined;

        if (!feat) return;
        const proj = geoNaturalEarth1().fitSize([vw, vh], feat);
        setSvg({ d: geoPath(proj)(feat) ?? "", vw, vh });
      })
      .catch(console.error);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country.isoNumeric]);

  const dark = typeof document !== "undefined" && document.documentElement.classList.contains("dark");
  const fill   = dark ? "#1b2d45" : "#b8cfe0";
  const stroke = dark ? "#2e5070" : "#7090a8";

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full h-full flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
    >
      {/* Back button */}
      <motion.button
        className="absolute top-6 left-6 z-20 flex items-center gap-2 rounded-xl px-4 py-2
          bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md
          border border-neutral-200 dark:border-neutral-700/60
          text-sm text-neutral-600 dark:text-neutral-400
          hover:text-neutral-900 dark:hover:text-white transition-colors shadow-sm"
        onClick={onBack}
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.55, duration: 0.35 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
      >
        <span>←</span>
        <span>World Map</span>
      </motion.button>

      {/* Country name */}
      <motion.h1
        className="absolute top-6 left-1/2 -translate-x-1/2 z-20 text-base font-semibold
          tracking-widest uppercase text-neutral-500 dark:text-neutral-400"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {country.name}
      </motion.h1>

      {/* Country outline */}
      <div className="flex-1 flex items-center justify-center pt-16 pb-2 w-full">
        {svg && (
          <motion.svg
            width={svg.vw}
            height={svg.vh}
            viewBox={`0 0 ${svg.vw} ${svg.vh}`}
            className="drop-shadow-2xl max-w-full max-h-full"
            initial={{ scale: 0.25, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <path d={svg.d} fill={fill} stroke={stroke} strokeWidth={1.5} strokeLinejoin="round" />
          </motion.svg>
        )}
      </div>

      {/* City cards — scrollable row */}
      <motion.div
        className="w-full px-6 pb-8"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.5 }}
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
