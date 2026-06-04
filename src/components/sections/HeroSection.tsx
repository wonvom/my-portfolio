"use client";

import { motion } from "motion/react";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="snap-section relative flex flex-col items-center justify-center text-center px-6"
    >
      {/* Eyebrow */}
      <motion.p
        className="text-xs tracking-[4px] uppercase mb-4"
        style={{ color: "var(--muted)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Software Engineer / Seoul
      </motion.p>

      {/* Name */}
      <motion.h1
        className="font-black leading-[0.88] tracking-[-4px]"
        style={{
          fontSize: "clamp(64px, 10vw, 120px)",
          color: "var(--fg)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        WONJONG
        <br />
        KIM
      </motion.h1>

      {/* Divider */}
      <motion.div
        className="w-8 h-px my-6"
        style={{ background: "var(--border)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      />

      {/* Tagline */}
      <motion.p
        className="text-sm tracking-[2px] uppercase"
        style={{ color: "var(--sub)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.0 }}
      >
        Building things that feel right
      </motion.p>

      {/* Bottom: section number + scroll hint */}
      <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end pointer-events-none">
        <span className="text-xs tracking-[2px]" style={{ color: "var(--muted)" }}>
          01 / 06
        </span>
        <motion.span
          className="text-xs tracking-[2px]"
          style={{ color: "var(--muted)" }}
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        >
          ↓ SCROLL
        </motion.span>
      </div>
    </section>
  );
}
