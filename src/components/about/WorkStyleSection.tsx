"use client";

import { motion } from "motion/react";
import { profile } from "@/data/profile";

export function WorkStyleSection() {
  return (
    <section className="py-12 border-t border-black/[0.06] dark:border-white/[0.06]">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="space-y-8"
      >
        <div className="space-y-1">
          <p className="text-[10px] text-neutral-400 dark:text-neutral-600 tracking-widest uppercase">Work Style</p>
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">일하는 방식</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Preferred */}
          <div className="rounded-2xl p-5 bg-white/60 dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.08] space-y-3">
            <p className="text-[10px] text-emerald-600 dark:text-emerald-500/80 tracking-widest uppercase font-medium">
              선호하는 환경
            </p>
            <ul className="space-y-2">
              {profile.workStyle.preferred.map((item) => (
                <li key={item} className="flex items-start gap-2 text-xs text-neutral-600 dark:text-neutral-400">
                  <span className="text-emerald-500/60 mt-0.5 shrink-0">+</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Avoided */}
          <div className="rounded-2xl p-5 bg-white/60 dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.08] space-y-3">
            <p className="text-[10px] text-neutral-400 dark:text-neutral-500 tracking-widest uppercase font-medium">
              피하고 싶은 환경
            </p>
            <ul className="space-y-2">
              {profile.workStyle.avoided.map((item) => (
                <li key={item} className="flex items-start gap-2 text-xs text-neutral-500">
                  <span className="text-neutral-400 dark:text-neutral-600 mt-0.5 shrink-0">−</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Summary */}
        <div className="rounded-2xl p-5 bg-black/[0.03] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.06]">
          <p className="text-[10px] text-neutral-400 dark:text-neutral-600 tracking-widest uppercase mb-2">종합 요약</p>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {profile.positioningEn}
          </p>
        </div>
      </motion.div>
    </section>
  );
}
