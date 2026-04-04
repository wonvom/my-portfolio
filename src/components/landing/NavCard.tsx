"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "motion/react";
import type { LandingCard, Language } from "@/types/landing";

export const cardVariants = {
  hidden: { opacity: 0, scale: 0.88, y: 20 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

type NavCardProps = {
  card: LandingCard;
  lang: Language;
  onExpand: (rect: DOMRect, href: string) => void;
};

export function NavCard({ card, lang, onExpand }: NavCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const highlightX = useMotionValue(50);
  const highlightY = useMotionValue(50);

  const springRotateX = useSpring(rotateX, { stiffness: 280, damping: 28 });
  const springRotateY = useSpring(rotateY, { stiffness: 280, damping: 28 });

  const highlightBg = useMotionTemplate`radial-gradient(circle at ${highlightX}% ${highlightY}%, rgba(255,255,255,0.13) 0%, transparent 65%)`;

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    rotateX.set(-dy * 7);
    rotateY.set(dx * 7);
    highlightX.set(50 + dx * 30);
    highlightY.set(50 + dy * 30);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
    highlightX.set(50);
    highlightY.set(50);
  }

  function handleInternalClick() {
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) onExpand(rect, card.href);
  }

  const cardContent = (
    <div
      className="
        w-full h-full rounded-[30%] relative overflow-hidden
        bg-white/[0.08] dark:bg-white/[0.055] backdrop-blur-2xl
        border border-black/[0.1] dark:border-white/[0.11]
        shadow-[0_8px_32px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.8)]
        dark:shadow-[0_8px_32px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.11)]
        flex flex-col items-center justify-center gap-1.5 p-6
      "
    >
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: highlightBg }}
      />
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-black/[0.06] dark:via-white/20 to-transparent" />
      <span className="relative text-neutral-900 dark:text-white font-medium text-lg sm:text-xl tracking-wide select-none">
        {card.label}
      </span>
      <span className="relative text-neutral-500 text-xs tracking-wide select-none">
        {card.description[lang]}
      </span>
    </div>
  );

  return (
    <motion.div
      ref={cardRef}
      className="aspect-square w-full"
      variants={cardVariants}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformPerspective: 700,
      }}
      whileHover={{ scale: 1.04, y: -6 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {card.external ? (
        <a
          href={card.href}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full h-full"
          aria-label={card.label}
        >
          {cardContent}
        </a>
      ) : (
        <button
          onClick={handleInternalClick}
          className="block w-full h-full bg-transparent border-none p-0"
          aria-label={card.label}
        >
          {cardContent}
        </button>
      )}
    </motion.div>
  );
}
