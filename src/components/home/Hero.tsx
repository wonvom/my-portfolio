"use client";

import { motion } from "motion/react";

export function Hero() {
  return (
    <section className="py-24 sm:py-32">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="space-y-4"
      >
        <p className="text-sm font-medium tracking-widest text-neutral-500 uppercase">
          Frontend Developer
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Hi, I&apos;m Wonjong Kim.
        </h1>
        <p className="max-w-xl text-lg leading-relaxed text-neutral-400">
          I build clean, accessible, and performant web experiences. Currently
          looking for my next opportunity.
        </p>
      </motion.div>
    </section>
  );
}
