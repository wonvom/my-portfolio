"use client";

import { useEffect, useState } from "react";
import { geoMercator, geoPath, geoCentroid } from "d3-geo";
import * as topojson from "topojson-client";
import { motion } from "motion/react";
import { useTheme } from "@/providers/ThemeProvider";
import type { GalleryCountry } from "@/types/gallery";
import type { Topology, GeometryCollection } from "topojson-specification";
import type { FeatureCollection, Geometry } from "geojson";

const ATLAS_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
const VW = 960;
const VH = 500;
const ANTARCTICA_ID = "010";
const PIN_R = 1.4;  // sphere radius (SVG units)
const LW = 84;      // label width
const LH = 22;      // label height

const WORLD_CLIP: GeoJSON.Feature = {
  type: "Feature",
  geometry: {
    type: "Polygon",
    coordinates: [[[-179.9, -62], [179.9, -62], [179.9, 82], [-179.9, 82], [-179.9, -62]]],
  },
  properties: {},
};

/**
 * Per-country diagonal offset from centroid to label center [dx, dy] in SVG units.
 *   Japan  → upper-right (Pacific Ocean)
 *   Korea  → high upper-left (Yellow Sea, above China label)
 *   China  → upper-left
 *   USA    → upper-left
 *   Canada → upper-left
 */
const OFFSETS: Record<string, [number, number]> = {
  "392": [55, -45],    // Japan
  "410": [-55, -85],   // South Korea
  "156": [-65, -45],   // China
  "840": [-50, -55],   // United States
  "124": [-40, -55],   // Canada
};
const DEFAULT_OFFSET: [number, number] = [-45, -50];

const DISPLAY_NAME: Record<string, string> = { "840": "United States" };

/** Corner of the label box closest to the centroid — line connects here. */
function innerCorner(lx: number, ly: number, dx: number, dy: number): [number, number] {
  return [dx > 0 ? lx - LW / 2 : lx + LW / 2, dy > 0 ? ly - LH / 2 : ly + LH / 2];
}

interface Pin { country: GalleryCountry; cx: number; cy: number }

interface Props {
  countries: GalleryCountry[];
  onSelectCountry: (c: GalleryCountry) => void;
  interactive: boolean;
}

export function WorldMapView({ countries, onSelectCountry, interactive }: Props) {
  const { theme } = useTheme();
  const dark = theme === "dark";
  const [worldPaths, setWorldPaths] = useState<{ id: string; d: string }[]>([]);
  const [pins, setPins] = useState<Pin[]>([]);
  const [showPins, setShowPins] = useState(false);
  const countrySet = new Set(countries.map((c) => c.isoNumeric));

  useEffect(() => {
    fetch(ATLAS_URL)
      .then((r) => r.json())
      .then((topo: Topology) => {
        const proj = geoMercator()
          .fitExtent([[0, 14], [VW, VH - 4]], WORLD_CLIP as GeoJSON.Feature)
          .precision(0.1);
        const pathGen = geoPath(proj);
        const fc = topojson.feature(
          topo,
          topo.objects.countries as GeometryCollection
        ) as FeatureCollection<Geometry>;

        setWorldPaths(
          fc.features
            .filter((f) => {
              const id = String((f as { id?: string | number }).id ?? "");
              return id !== ANTARCTICA_ID && id !== "";
            })
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
        newPins.sort((a, b) => a.cx - b.cx);
        setPins(newPins);
        setTimeout(() => setShowPins(true), 480);
      })
      .catch(console.error);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const col = {
    ocean:    dark ? "#0b0f14" : "#d6e8f5",
    land:     dark ? "#1c2535" : "#cdd4da",
    hiLand:   dark ? "#233248" : "#94acc2",
    border:   dark ? "#252f3d" : "#aab8c4",
    nameText: dark ? "#eef0f4" : "#111111",
    subText:  dark ? "#8a8f9a" : "#666666",
    line:     dark ? "rgba(200,205,215,0.70)" : "rgba(30,30,30,0.65)",
    // liquid glass (pure SVG, no backdrop-filter)
    glassFill:    dark ? "rgba(32,46,68,0.82)"  : "rgba(255,255,255,0.84)",
    glassBorder:  dark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.10)",
    glassShimmer: dark ? "rgba(255,255,255,0.20)" : "rgba(255,255,255,0.90)",
  };

  return (
    <svg
      viewBox={`0 0 ${VW} ${VH}`}
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      style={{ display: "block", backgroundColor: col.ocean }}
    >
      <defs>
        {/* 3-D red sphere */}
        <radialGradient id="pinSphere" cx="36%" cy="30%" r="70%">
          <stop offset="0%"   stopColor="#ff8080" />
          <stop offset="48%"  stopColor="#e52222" />
          <stop offset="100%" stopColor="#6a0000" />
        </radialGradient>
        <filter id="pinGlow" x="-120%" y="-120%" width="340%" height="340%">
          <feDropShadow dx="0" dy="0.5" stdDeviation="1.5" floodColor="rgba(150,0,0,0.5)" />
        </filter>
        {/* Label drop-shadow */}
        <filter id="labelShadow" x="-15%" y="-25%" width="130%" height="175%">
          <feDropShadow dx="0" dy="2" stdDeviation="2.5"
            floodColor={dark ? "rgba(0,0,0,0.55)" : "rgba(0,0,0,0.18)"} />
        </filter>
      </defs>

      {/* Ocean background */}
      <rect width={VW} height={VH} fill={col.ocean} />

      {/* Country shapes */}
      <g>
        {worldPaths.map(({ id, d }) => (
          <path key={id} d={d}
            fill={countrySet.has(id) ? col.hiLand : col.land}
            stroke={col.border} strokeWidth={0.5} />
        ))}
      </g>

      {/* Pins + leader lines + labels */}
      {showPins && pins.map(({ country, cx, cy }, i) => {
        const [dx, dy] = OFFSETS[country.isoNumeric] ?? DEFAULT_OFFSET;
        const lx = cx + dx;
        const ly = cy + dy;
        const [ex, ey] = innerCorner(lx, ly, dx, dy);
        const name = DISPLAY_NAME[country.isoNumeric] ?? country.name;

        // Line endpoint: stop exactly at sphere surface
        const vx = cx - ex, vy = cy - ey;
        const len = Math.hypot(vx, vy) || 1;
        const x2 = cx - (vx / len) * PIN_R;
        const y2 = cy - (vy / len) * PIN_R;

        return (
          <motion.g
            key={country.isoNumeric}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.13, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            onClick={() => interactive && onSelectCountry(country)}
            style={{ cursor: interactive ? "pointer" : "default" }}
          >
            {/* Static: leader line */}
            <line x1={ex} y1={ey} x2={x2} y2={y2}
              stroke={col.line} strokeWidth={0.6} />

            {/* Static: red 3-D sphere */}
            <circle cx={cx} cy={cy} r={PIN_R}
              fill="url(#pinSphere)" filter="url(#pinGlow)" />

            {/* Label — liquid glass, scales on hover */}
            <motion.g
              whileHover={{ scale: 1.10 }}
              transition={{ type: "spring", stiffness: 380, damping: 22 }}
              style={{ transformOrigin: `${lx}px ${ly}px` }}
            >
              {/* Shadow layer */}
              <rect
                x={lx - LW / 2} y={ly - LH / 2} width={LW} height={LH} rx={5}
                fill="transparent"
                filter="url(#labelShadow)"
              />
              {/* Glass body */}
              <rect
                x={lx - LW / 2} y={ly - LH / 2} width={LW} height={LH} rx={5}
                fill={col.glassFill}
                stroke={col.glassBorder} strokeWidth={0.5}
              />
              {/* Top specular shimmer line */}
              <line
                x1={lx - LW / 2 + 7} y1={ly - LH / 2 + 1}
                x2={lx + LW / 2 - 7} y2={ly - LH / 2 + 1}
                stroke={col.glassShimmer} strokeWidth={0.7}
                strokeLinecap="round"
              />
              {/* Country name */}
              <text x={lx} y={ly - 2.5}
                textAnchor="middle" dominantBaseline="middle"
                fontSize={8} fontWeight={600} fill={col.nameText}
                fontFamily="var(--font-geist-sans)" letterSpacing="0.2">
                {name}
              </text>
              {/* Photo count */}
              <text x={lx} y={ly + 6.5}
                textAnchor="middle" dominantBaseline="middle"
                fontSize={5.5} fill={col.subText}
                fontFamily="var(--font-geist-sans)">
                {country.totalPhotos} photo{country.totalPhotos !== 1 ? "s" : ""}
              </text>
            </motion.g>
          </motion.g>
        );
      })}
    </svg>
  );
}
