"use client";

import { motion } from "motion/react";
import { landingCards } from "@/data/landingCards";
import { NavCard } from "./NavCard";

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.25 },
  },
};

export function LandingGrid() {
  return (
    <motion.div
      className="grid grid-cols-2 gap-3 sm:gap-4 w-[min(520px,90vw)]"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {landingCards.map((card) => (
        <NavCard key={card.id} card={card} />
      ))}
    </motion.div>
  );
}
