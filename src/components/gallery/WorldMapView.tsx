"use client";

import { useEffect, useRef, useState } from "react";
import { geoMercator, geoPath, geoCentroid } from "d3-geo";
import * as topojson from "topojson-client";
import { AnimatePresence } from "motion/react";
import { CountryCard } from "./CountryCard";
import type { GalleryCountry } from "@/types/gallery";
import type { Topology, GeometryCollection } from "topojson-specification";
import type { Feature, FeatureCollection, Geometry } from "geojson";

const ATLAS_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
const VW = 960;
const VH = 500;
const ANTARCTICA_ID = "010";

const WORLD_CLIP: GeoJSON.Feature = {
  type: "Feature",
  geometry: {
    type: "Polygon",
    coordinates: [[[-179.9, -62], [179.9, -62], [179.9, 82], [-179.9, 82], [-179.9, -62]]],
  },
  properties: {},
};

// Approximate card bounding box for overlap detection
const CARD_W = 94;  // px
const CARD_H = 56;  // px (label + stem + dot)
const CARD_GAP = 8; // minimum gap between cards

interface Pin { country: GalleryCountry; svgX: number; svgY: number }
interface ResolvedPin extends Pin { sx: number; sy: number }

interface Props {
  countries: GalleryCountry[];
  onSelectCountry: (c: GalleryCountry) => void;
  interactive: boolean;
}

/** Push overlapping card positions apart (vertical separation, western card goes up). */
function resolveOverlaps(items: ResolvedPin[]): ResolvedPin[] {
  const out = items.map((p) => ({ ...p }));
  const minDist = CARD_H + CARD_GAP;

  for (let pass = 0; pass < 10; pass++) {
    let changed = false;
    for (let i = 0; i < out.length; i++) {
      for (let j = i + 1; j < out.length; j++) {
        if (Math.abs(out[i].sx - out[j].sx) >= CARD_W) continue;
        const overlap = minDist - Math.abs(out[i].sy - out[j].sy);
        if (overlap <= 0) continue;
        const shift = overlap / 2 + 1;
        // western card (smaller sx) moves up; eastern moves down
        if (out[i].sx <= out[j].sx) {
          out[i].sy -= shift;
          out[j].sy += shift;
        } else {
          out[i].sy += shift;
          out[j].sy -= shift;
        }
        changed = true;
      }
    }
    if (!changed) break;
  }
  return out;
}

export function WorldMapView({ countries, onSelectCountry, interactive }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [worldPaths, setWorldPaths] = useState<{ id: string; d: string }[]>([]);
  const [pins, setPins] = useState<Pin[]>([]);
  const [showPins, setShowPins] = useState(false);
  // Resize counter — forces re-render so card positions recalculate
  const [, setTick] = useState(0);
  const countrySet = new Set(countries.map((c) => c.isoNumeric));

  /** SVG viewBox coords → container-relative screen px (no user transform). */
  function svgToScreen(svgX: number, svgY: number): [number, number] {
    const el = containerRef.current;
    if (!el) return [0, 0];
    const { width: W, height: H } = el.getBoundingClientRect();
    const s = Math.min(W / VW, H / VH);
    const ox = (W - VW * s) / 2;
    const oy = (H - VH * s) / 2;
    return [svgX * s + ox, svgY * s + oy];
  }

  // Load atlas once
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
          ) as Feature<Geometry> | undefined;
          if (feat) {
            const c = proj(geoCentroid(feat) as [number, number]);
            if (c) newPins.push({ country, svgX: c[0], svgY: c[1] });
          }
        }
        newPins.sort((a, b) => a.svgX - b.svgX);
        setPins(newPins);
        setTimeout(() => setShowPins(true), 450);
      })
      .catch(console.error);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Watch container resize → recalculate card positions
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setTick((n) => n + 1));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Compute screen positions and resolve overlaps every render
  const resolvedPins: ResolvedPin[] = resolveOverlaps(
    pins.map((p) => {
      const [sx, sy] = svgToScreen(p.svgX, p.svgY);
      return { ...p, sx, sy };
    })
  );

  const dark = typeof document !== "undefined" && document.documentElement.classList.contains("dark");
  const ocean  = dark ? "#0b0f14" : "#d6e8f5";
  const land   = dark ? "#1c2535" : "#cdd4da";
  const hiLand = dark ? "#233248" : "#94acc2";
  const border = dark ? "#252f3d" : "#aab8c4";

  return (
    <div ref={containerRef} className="relative w-full h-full select-none">
      {/* Static SVG — scales with container via preserveAspectRatio */}
      <svg
        viewBox={`0 0 ${VW} ${VH}`}
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        style={{ display: "block" }}
      >
        <rect width={VW} height={VH} fill={ocean} />
        <g>
          {worldPaths.map(({ id, d }) => (
            <path
              key={id}
              d={d}
              fill={countrySet.has(id) ? hiLand : land}
              stroke={border}
              strokeWidth={0.5}
            />
          ))}
        </g>
      </svg>

      {/* Country pin cards overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <AnimatePresence>
          {showPins &&
            resolvedPins.map(({ country, sx, sy }, i) => (
              <CountryCard
                key={country.isoNumeric}
                country={country}
                index={i}
                x={sx}
                y={sy}
                onSelect={interactive ? onSelectCountry : () => {}}
              />
            ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
