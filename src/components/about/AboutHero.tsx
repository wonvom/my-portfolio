"use client";

import { motion } from "motion/react";
import { profile } from "@/data/profile";

export function AboutHero() {
  return (
    <section className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="space-y-6 max-w-2xl"
      >
        <p className="text-[10px] text-neutral-600 tracking-widest uppercase">About</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
          {profile.tagline}
        </h1>
        <p className="text-neutral-400 leading-relaxed text-sm">
          {profile.positioning}
        </p>

        {/* Career goals */}
        <div className="flex flex-wrap gap-2 pt-2">
          {profile.careerGoals.map((g) => (
            <span
              key={g.plan}
              className="px-3 py-1 rounded-full text-xs text-neutral-300 bg-white/[0.06] border border-white/[0.09]"
            >
              Plan {g.plan}: {g.label}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
