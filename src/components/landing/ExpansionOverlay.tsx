"use client";

import { motion } from "motion/react";

type ExpansionOverlayProps = {
  rect: DOMRect;
  onComplete: () => void;
};

export function ExpansionOverlay({ rect, onComplete }: ExpansionOverlayProps) {
  const top = rect.top;
  const right = window.innerWidth - rect.right;
  const bottom = window.innerHeight - rect.bottom;
  const left = rect.left;

  return (
    <motion.div
      className="fixed inset-0 z-[500] bg-[#f5f5f7] dark:bg-[#07070f]"
      initial={{
        clipPath: `inset(${top}px ${right}px ${bottom}px ${left}px round 30%)`,
      }}
      animate={{
        clipPath: `inset(-2px -2px -2px -2px round 0%)`,
      }}
      transition={{
        duration: 0.65,
        ease: [0.55, 0.05, 0.1, 0.95],
      }}
      onAnimationComplete={onComplete}
    />
  );
}
