"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import dynamic from "next/dynamic";
import { playDingDong } from "@/lib/audioUtils";
import type { GalleryCountry, GalleryCity, GalleryView } from "@/types/gallery";

const WorldMapView = dynamic(
  () => import("./WorldMapView").then((m) => ({ default: m.WorldMapView })),
  { ssr: false, loading: () => <MapPlaceholder /> }
);

const CountryDetailView = dynamic(
  () => import("./CountryDetailView").then((m) => ({ default: m.CountryDetailView })),
  { ssr: false }
);

function MapPlaceholder() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <motion.p
        className="text-neutral-400 dark:text-neutral-600 text-sm tracking-widest uppercase"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        Loading Map…
      </motion.p>
    </div>
  );
}

interface Props {
  countries: GalleryCountry[];
}

export function GalleryEntry({ countries }: Props) {
  const [view, setView] = useState<GalleryView>("world");
  const [selected, setSelected] = useState<GalleryCountry | null>(null);
  // Disable map interaction until the entry zoom-in finishes
  const [interactive, setInteractive] = useState(false);

  function handleSelectCountry(country: GalleryCountry) {
    playDingDong();
    setSelected(country);
    setView("country");
  }

  function handleBack() {
    setSelected(null);
    setView("world");
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function handleSelectCity(_city: GalleryCity) {
    // TODO: open city photo grid
  }

  return (
    <div className="w-full h-full relative overflow-hidden">
      <motion.div
        className="w-full h-full"
        initial={{ scale: 0.55, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        onAnimationComplete={() => setInteractive(true)}
      >
        <AnimatePresence mode="wait">
          {view === "world" && (
            <motion.div
              key="world"
              className="w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5 }}
            >
              <WorldMapView
                countries={countries}
                onSelectCountry={handleSelectCountry}
                interactive={interactive}
              />
            </motion.div>
          )}

          {view === "country" && selected && (
            <motion.div
              key={`country-${selected.isoNumeric}`}
              className="w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <CountryDetailView
                country={selected}
                onBack={handleBack}
                onSelectCity={handleSelectCity}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
