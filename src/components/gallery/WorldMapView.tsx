"use client";

import { useEffect, useRef, useState } from "react";
import { geoNaturalEarth1, geoPath, geoCentroid } from "d3-geo";
import * as topojson from "topojson-client";
import { AnimatePresence } from "motion/react";
import { CountryCard } from "./CountryCard";
import type { GalleryCountry } from "@/types/gallery";
import type { Topology, GeometryCollection } from "topojson-specification";
import type { Feature, FeatureCollection, Geometry } from "geojson";

const ATLAS_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
const VW = 960;
const VH = 500;
const MIN_K = 0.6;
const MAX_K = 12;

interface TF { x: number; y: number; k: number }
interface Pin { country: GalleryCountry; svgX: number; svgY: number }

interface Props {
  countries: GalleryCountry[];
  onSelectCountry: (c: GalleryCountry) => void;
}

export function WorldMapView({ countries, onSelectCountry }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const tfRef = useRef<TF>({ x: 0, y: 0, k: 1 });
  const [tf, setTf] = useState<TF>({ x: 0, y: 0, k: 1 });
  const [worldPaths, setWorldPaths] = useState<{ id: string; d: string }[]>([]);
  const [pins, setPins] = useState<Pin[]>([]);
  const [showPins, setShowPins] = useState(false);
  const [grabbing, setGrabbing] = useState(false);
  const dragRef = useRef<{ startX: number; startY: number; startTx: number; startTy: number } | null>(null);
  const zoomTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const countrySet = new Set(countries.map((c) => c.isoNumeric));

  // Helper: SVG viewBox coords → container-relative px
  function svgToContainer(svgX: number, svgY: number, cur: TF): [number, number] {
    const el = containerRef.current;
    if (!el) return [0, 0];
    const { width: W, height: H } = el.getBoundingClientRect();
    const s = Math.min(W / VW, H / VH);
    const ox = (W - VW * s) / 2;
    const oy = (H - VH * s) / 2;
    return [(svgX * cur.k + cur.x) * s + ox, (svgY * cur.k + cur.y) * s + oy];
  }

  // Load world atlas + compute pins
  useEffect(() => {
    fetch(ATLAS_URL)
      .then((r) => r.json())
      .then((topo: Topology) => {
        const proj = geoNaturalEarth1().scale(153).translate([VW / 2, VH / 2]);
        const pathGen = geoPath(proj);
        const fc = topojson.feature(
          topo,
          topo.objects.countries as GeometryCollection
        ) as FeatureCollection<Geometry>;

        setWorldPaths(
          fc.features.map((f) => ({
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

  // Wheel zoom (registered as non-passive to allow preventDefault)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    function onWheel(e: WheelEvent) {
      e.preventDefault();
      const { width: W, height: H, left, top } = el!.getBoundingClientRect();
      const s = Math.min(W / VW, H / VH);
      const ox = (W - VW * s) / 2;
      const oy = (H - VH * s) / 2;
      const cur = tfRef.current;

      // Cursor in SVG viewBox space
      const mx = (e.clientX - left - ox) / s;
      const my = (e.clientY - top - oy) / s;
      // Cursor in group-local space (pre-transform)
      const gx = (mx - cur.x) / cur.k;
      const gy = (my - cur.y) / cur.k;

      const factor = e.deltaY < 0 ? 1.18 : 1 / 1.18;
      const newK = Math.max(MIN_K, Math.min(MAX_K, cur.k * factor));
      const newTf: TF = { x: mx - gx * newK, y: my - gy * newK, k: newK };

      tfRef.current = newTf;
      setTf({ ...newTf });
      setShowPins(false);
      if (zoomTimer.current) clearTimeout(zoomTimer.current);
      zoomTimer.current = setTimeout(() => setShowPins(true), 520);
    }

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      if (zoomTimer.current) clearTimeout(zoomTimer.current);
    };
  }, []);

  // Mouse drag — attach to window so releasing outside still clears state
  useEffect(() => {
    function onMove(e: MouseEvent) {
      if (!dragRef.current) return;
      const el = containerRef.current;
      if (!el) return;
      const { width: W, height: H } = el.getBoundingClientRect();
      const s = Math.min(W / VW, H / VH);
      const dx = (e.clientX - dragRef.current.startX) / s;
      const dy = (e.clientY - dragRef.current.startY) / s;
      const newTf: TF = {
        ...tfRef.current,
        x: dragRef.current.startTx + dx,
        y: dragRef.current.startTy + dy,
      };
      tfRef.current = newTf;
      setTf({ ...newTf });
    }
    function onUp() {
      dragRef.current = null;
      setGrabbing(false);
    }
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  function onMouseDown(e: React.MouseEvent) {
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startTx: tfRef.current.x,
      startTy: tfRef.current.y,
    };
    setGrabbing(true);
  }

  // Theme-aware colors
  const dark = typeof document !== "undefined" && document.documentElement.classList.contains("dark");
  const ocean  = dark ? "#0b0f14" : "#dde8f5";
  const land   = dark ? "#1a2130" : "#cdd4da";
  const hiLand = dark ? "#243550" : "#96adc0";
  const border = dark ? "#252f3d" : "#b0bbc5";

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full select-none"
      onMouseDown={onMouseDown}
      style={{ cursor: grabbing ? "grabbing" : "grab" }}
    >
      <svg
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
              fill={countrySet.has(id) ? hiLand : land}
              stroke={border}
              strokeWidth={0.5 / tf.k}
            />
          ))}
        </g>
      </svg>

      {/* Country pin cards */}
      <div className="absolute inset-0 pointer-events-none">
        <AnimatePresence>
          {showPins &&
            pins.map(({ country, svgX, svgY }, i) => {
              const [sx, sy] = svgToContainer(svgX, svgY, tf);
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
