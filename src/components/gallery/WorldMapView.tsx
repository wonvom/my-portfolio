"use client";

import { useEffect, useState } from "react";
import { geoMercator, geoPath, geoCentroid } from "d3-geo";
import * as topojson from "topojson-client";
import { motion } from "motion/react";
import type { GalleryCountry } from "@/types/gallery";
import type { Topology, GeometryCollection } from "topojson-specification";
import type { FeatureCollection, Geometry } from "geojson";

const ATLAS_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
const VW = 960;
const VH = 500;
const ANTARCTICA_ID = "010";
const PIN_R = 1.8;   // smaller sphere radius in SVG units
const OFFSET = 50;   // centroid → label center distance (SVG units)
const LW = 82;       // label width
const LH = 22;       // label height

const WORLD_CLIP: GeoJSON.Feature = {
  type: "Feature",
  geometry: {
    type: "Polygon",
    coordinates: [[[-179.9, -62], [179.9, -62], [179.9, 82], [-179.9, 82], [-179.9, -62]]],
  },
  properties: {},
};

type Dir = "up" | "down" | "left" | "right";

// Directional float: place label in the ocean / open space beside the country
const LABEL_DIR: Record<string, Dir> = {
  "392": "right", // Japan  → Pacific Ocean (right)
  "410": "left",  // South Korea → Yellow Sea (left)
  "156": "up",    // China
  "840": "up",    // United States
  "124": "up",    // Canada
};

const DISPLAY_NAME: Record<string, string> = {
  "840": "United States",
};

function labelCenter(cx: number, cy: number, dir: Dir): [number, number] {
  if (dir === "right") return [cx + OFFSET, cy];
  if (dir === "left")  return [cx - OFFSET, cy];
  if (dir === "up")    return [cx, cy - OFFSET];
  return [cx, cy + OFFSET];
}

/** Point on the label box edge facing the centroid. */
function boxEdge(lx: number, ly: number, dir: Dir): [number, number] {
  if (dir === "right") return [lx - LW / 2, ly];
  if (dir === "left")  return [lx + LW / 2, ly];
  if (dir === "up")    return [lx, ly + LH / 2];
  return [lx, ly - LH / 2];
}

interface Pin { country: GalleryCountry; cx: number; cy: number }

interface Props {
  countries: GalleryCountry[];
  onSelectCountry: (c: GalleryCountry) => void;
  interactive: boolean;
}

export function WorldMapView({ countries, onSelectCountry, interactive }: Props) {
  const [worldPaths, setWorldPaths] = useState<{ id: string; d: string }[]>([]);
  const [pins, setPins] = useState<Pin[]>([]);
  const [showPins, setShowPins] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const countrySet = new Set(countries.map((c) => c.isoNumeric));

  useEffect(() => {
    fetch(ATLAS_URL)
      .then((r) => r.json())
      .then((topo: Topology) => {
        const proj = geoMercator().fitSize([VW, VH], WORLD_CLIP as GeoJSON.Feature).precision(0.1);
        const pathGen = geoPath(proj);
        const fc = topojson.feature(
          topo,
          topo.objects.countries as GeometryCollection
        ) as FeatureCollection<Geometry>;

        setWorldPaths(
          fc.features
            .filter((f) => String((f as { id?: string | number }).id ?? "") !== ANTARCTICA_ID)
            .map((f) => ({
              id: String((f as { id?: string | number }).id ?? ""),
              d: pathGen(f) ?? "",
            }))
        );

        const newPins: Pin[] = [];
        for (const country of countries) {
          const feat = fc.features.find(
            (f) => String((f as { id?: string | number }).id ?? "") === country.isoNumeric
          );
          if (feat) {
            const c = proj(geoCentroid(feat) as [number, number]);
            if (c) newPins.push({ country, cx: c[0], cy: c[1] });
          }
        }
        newPins.sort((a, b) => a.cx - b.cx); // west → east for wave stagger
        setPins(newPins);
        setTimeout(() => setShowPins(true), 480);
      })
      .catch(console.error);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dark =
    typeof document !== "undefined" && document.documentElement.classList.contains("dark");
  const c = {
    ocean:       dark ? "#0b0f14" : "#d6e8f5",
    land:        dark ? "#1c2535" : "#cdd4da",
    hiLand:      dark ? "#233248" : "#94acc2",
    border:      dark ? "#252f3d" : "#aab8c4",
    labelBg:     dark ? "rgba(14,19,30,0.92)"  : "rgba(255,255,255,0.92)",
    labelBgHov:  dark ? "rgba(28,40,60,0.97)"  : "rgba(230,240,255,0.97)",
    labelStroke: dark ? "rgba(255,255,255,0.13)" : "rgba(0,0,0,0.12)",
    nameText:    dark ? "#f0f0f0" : "#111111",
    subText:     dark ? "#666666" : "#888888",
    line:        "#c81818",
  };

  return (
    <svg
      viewBox={`0 0 ${VW} ${VH}`}
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      style={{ display: "block" }}
    >
      <defs>
        <radialGradient id="pinSphere" cx="36%" cy="30%" r="70%">
          <stop offset="0%"   stopColor="#ff8080" />
          <stop offset="48%"  stopColor="#e52222" />
          <stop offset="100%" stopColor="#6a0000" />
        </radialGradient>
        <filter id="pinGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feDropShadow dx="0" dy="0.6" stdDeviation="1.8" floodColor="rgba(160,0,0,0.55)" />
        </filter>
        {/* Arrow marker — tip points toward country */}
        <marker id="arrow" viewBox="0 0 8 6" refX="7.5" refY="3"
          markerWidth="4" markerHeight="3.5" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill={c.line} opacity="0.75" />
        </marker>
      </defs>

      {/* Ocean */}
      <rect width={VW} height={VH} fill={c.ocean} />

      {/* Country shapes */}
      <g>
        {worldPaths.map(({ id, d }) => (
          <path key={id} d={d}
            fill={countrySet.has(id) ? c.hiLand : c.land}
            stroke={c.border} strokeWidth={0.5} />
        ))}
      </g>

      {/* Country labels + pins (pure SVG, no DOM overlay) */}
      {showPins && pins.map(({ country, cx, cy }, i) => {
        const dir = LABEL_DIR[country.isoNumeric] ?? "up";
        const [lx, ly]  = labelCenter(cx, cy, dir);
        const [ex, ey]  = boxEdge(lx, ly, dir);
        const name = DISPLAY_NAME[country.isoNumeric] ?? country.name;
        const hov  = hoveredId === country.isoNumeric;

        // Shorten line so arrowhead stops just before sphere
        const dx = cx - ex, dy = cy - ey;
        const len = Math.hypot(dx, dy) || 1;
        const x2 = cx - (dx / len) * (PIN_R + 2.5);
        const y2 = cy - (dy / len) * (PIN_R + 2.5);

        return (
          <motion.g
            key={country.isoNumeric}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.13, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            onClick={() => interactive && onSelectCountry(country)}
            onMouseEnter={() => setHoveredId(country.isoNumeric)}
            onMouseLeave={() => setHoveredId(null)}
            style={{ cursor: interactive ? "pointer" : "default" }}
          >
            {/* Leader line + arrowhead toward centroid */}
            <line x1={ex} y1={ey} x2={x2} y2={y2}
              stroke={c.line} strokeWidth={0.65} opacity={0.6}
              markerEnd="url(#arrow)" />

            {/* Label background */}
            <rect
              x={lx - LW / 2} y={ly - LH / 2} width={LW} height={LH} rx={4}
              fill={hov ? c.labelBgHov : c.labelBg}
              stroke={c.labelStroke} strokeWidth={0.5}
            />

            {/* Country name */}
            <text x={lx} y={ly - 2.5}
              textAnchor="middle" dominantBaseline="middle"
              fontSize={8} fontWeight={600} fill={c.nameText}
              fontFamily="var(--font-geist-sans)">
              {name}
            </text>

            {/* Photo count */}
            <text x={lx} y={ly + 6.5}
              textAnchor="middle" dominantBaseline="middle"
              fontSize={5.5} fill={c.subText}
              fontFamily="var(--font-geist-sans)">
              {country.totalPhotos} photo{country.totalPhotos !== 1 ? "s" : ""}
            </text>

            {/* Red 3D sphere pin — sits exactly at the centroid */}
            <circle cx={cx} cy={cy} r={PIN_R}
              fill="url(#pinSphere)" filter="url(#pinGlow)" />
          </motion.g>
        );
      })}
    </svg>
  );
}
