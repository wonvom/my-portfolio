"use client";

import { motion } from "motion/react";
import { landingCards } from "@/data/landingCards";
import { NavCard } from "./NavCard";
import type { Language } from "@/types/landing";

type LandingGridProps = {
  lang: Language;
  onExpand: (rect: DOMRect, href: string) => void;
};

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.1 },
  },
};

export function LandingGrid({ lang, onExpand }: LandingGridProps) {
  return (
    <motion.div
      className="grid grid-cols-2 gap-3 sm:gap-4 w-[min(520px,90vw)]"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {landingCards.map((card) => (
        <NavCard key={card.id} card={card} lang={lang} onExpand={onExpand} />
      ))}
    </motion.div>
  );
}
