"use client";

import { motion } from "motion/react";
import { strengths } from "@/data/strengths";

export function CoreStrengths() {
  return (
    <section className="py-16 border-t border-black/[0.06] dark:border-white/[0.06]">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="space-y-8"
      >
        <div className="space-y-1">
          <p className="text-[10px] text-neutral-400 dark:text-neutral-600 tracking-widest uppercase">
            What I Bring
          </p>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white">Core Strengths</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {strengths.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
              className="
                relative rounded-2xl p-5 space-y-3
                bg-white/60 dark:bg-white/[0.04] backdrop-blur-xl
                border border-black/[0.08] dark:border-white/[0.08]
                shadow-[0_2px_16px_rgba(0,0,0,0.06)] dark:shadow-[0_2px_16px_rgba(0,0,0,0.3)]
                overflow-hidden
              "
            >
              <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-black/[0.05] dark:via-white/10 to-transparent" />
              <span className="text-xl text-neutral-400 dark:text-neutral-500">{s.symbol}</span>
              <h3 className="font-semibold text-neutral-900 dark:text-white text-sm">{s.title}</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                {s.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
