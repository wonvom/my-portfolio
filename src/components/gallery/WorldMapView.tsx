"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { geoNaturalEarth1, geoPath, geoCentroid } from "d3-geo";
import * as topojson from "topojson-client";
import { AnimatePresence, motion } from "motion/react";
import { CountryCard } from "./CountryCard";
import type { GalleryCountry } from "@/types/gallery";
import type { Topology, GeometryCollection } from "topojson-specification";
import type { Feature, FeatureCollection, Geometry } from "geojson";

const ATLAS_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
const VW = 960;
const VH = 500;

interface Transform { x: number; y: number; k: number }

interface CountryPin { country: GalleryCountry; svgX: number; svgY: number }

interface Props {
  countries: GalleryCountry[];
  onSelectCountry: (c: GalleryCountry) => void;
}

export function WorldMapView({ countries, onSelectCountry }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [worldPaths, setWorldPaths] = useState<{ id: string; d: string }[]>([]);
  const [pins, setPins] = useState<CountryPin[]>([]);
  const [showPins, setShowPins] = useState(false);
  const [tf, setTf] = useState<Transform>({ x: 0, y: 0, k: 1 });
  const dragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const zoomTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const countrySet = new Set(countries.map((c) => c.isoNumeric));

  useEffect(() => {
    fetch(ATLAS_URL)
      .then((r) => r.json())
      .then((topo: Topology) => {
        const proj = geoNaturalEarth1().scale(153).translate([VW / 2, VH / 2]);
        const path = geoPath(proj);
        const fc = topojson.feature(
          topo,
          topo.objects.countries as GeometryCollection
        ) as FeatureCollection<Geometry, { name?: string }>;

        const paths = fc.features.map((f: Feature<Geometry>) => ({
          id: String((f as { id?: string | number }).id ?? ""),
          d: path(f) ?? "",
        }));
        setWorldPaths(paths);

        // Calculate pin positions
        const newPins: CountryPin[] = [];
        for (const country of countries) {
          const feat = fc.features.find(
            (f: Feature<Geometry>) => String((f as { id?: string | number }).id ?? "") === country.isoNumeric
          );
          if (feat) {
            const centroid = proj(geoCentroid(feat) as [number, number]);
            if (centroid) {
              newPins.push({ country, svgX: centroid[0], svgY: centroid[1] });
            }
          }
        }
        // Sort by svgX for left-to-right wave
        newPins.sort((a, b) => a.svgX - b.svgX);
        setPins(newPins);

        setTimeout(() => setShowPins(true), 400);
      })
      .catch(console.error);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Convert SVG coords → screen coords considering current transform
  const svgToScreen = useCallback((svgX: number, svgY: number): [number, number] => {
    const el = containerRef.current;
    if (!el) return [0, 0];
    const { width: W, height: H } = el.getBoundingClientRect();
    const scale = Math.min(W / VW, H / VH);
    const ox = (W - VW * scale) / 2;
    const oy = (H - VH * scale) / 2;
    const tx = (svgX * tf.k + tf.x) * scale + ox;
    const ty = (svgY * tf.k + tf.y) * scale + oy;
    return [tx, ty];
  }, [tf]);

  // Wheel zoom toward cursor
  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const el = containerRef.current;
    if (!el) return;
    const { width: W, height: H, left, top } = el.getBoundingClientRect();
    const scale = Math.min(W / VW, H / VH);
    const ox = (W - VW * scale) / 2;
    const oy = (H - VH * scale) / 2;

    // Mouse in SVG viewBox coords
    const mx = (e.clientX - left - ox) / scale;
    const my = (e.clientY - top - oy) / scale;

    // Mouse in group (pre-transform) coords
    const gx = (mx - tf.x) / tf.k;
    const gy = (my - tf.y) / tf.k;

    const factor = e.deltaY < 0 ? 1.15 : 1 / 1.15;
    const newK = Math.max(0.6, Math.min(12, tf.k * factor));
    const newX = mx - gx * newK;
    const newY = my - gy * newK;

    setTf({ x: newX, y: newY, k: newK });

    setShowPins(false);
    if (zoomTimer.current) clearTimeout(zoomTimer.current);
    zoomTimer.current = setTimeout(() => setShowPins(true), 500);
  }, [tf]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [handleWheel]);

  function onMouseDown(e: React.MouseEvent) {
    dragging.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY, tx: tf.x, ty: tf.y };
  }
  function onMouseMove(e: React.MouseEvent) {
    if (!dragging.current) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    const el = containerRef.current;
    if (!el) return;
    const { width: W, height: H } = el.getBoundingClientRect();
    const scale = Math.min(W / VW, H / VH);
    setTf((prev) => ({ ...prev, x: dragStart.current.tx + dx / scale, y: dragStart.current.ty + dy / scale }));
  }
  function onMouseUp() { dragging.current = false; }

  const isDark = typeof document !== "undefined" && document.documentElement.classList.contains("dark");
  const ocean = isDark ? "#0d1117" : "#e8f0fe";
  const land = isDark ? "#1e2430" : "#d4d8dd";
  const highlight = isDark ? "#2e3d52" : "#a8b8cc";
  const border = isDark ? "#2a3040" : "#b8bec8";

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full select-none"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      style={{ cursor: dragging.current ? "grabbing" : "grab" }}
    >
      <svg
        ref={svgRef}
        viewBox={`0 0 ${VW} ${VH}`}
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        style={{ display: "block" }}
      >
        <rect width={VW} height={VH} fill={ocean} />
        <g transform={`translate(${tf.x},${tf.y}) scale(${tf.k})`}>
          {worldPaths.map(({ id, d }) => (
            <path
              key={id}
              d={d}
              fill={countrySet.has(id) ? highlight : land}
              stroke={border}
              strokeWidth={0.5 / tf.k}
            />
          ))}
        </g>
      </svg>

      {/* Country pins overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <AnimatePresence>
          {showPins &&
            pins.map(({ country, svgX, svgY }, i) => {
              const [sx, sy] = svgToScreen(svgX, svgY);
              return (
                <CountryCard
                  key={country.isoNumeric}
                  country={country}
                  index={i}
                  x={sx}
                  y={sy}
                  onSelect={onSelectCountry}
                />
              );
            })}
        </AnimatePresence>
      </div>
    </div>
  );
}
