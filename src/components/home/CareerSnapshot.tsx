"use client";

import { motion } from "motion/react";
import { careerItems } from "@/data/career";

export function CareerSnapshot() {
  return (
    <section className="py-16 border-t border-white/[0.06]">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="space-y-8"
      >
        <div className="space-y-1">
          <p className="text-[10px] text-neutral-600 tracking-widest uppercase">
            Background
          </p>
          <h2 className="text-2xl font-semibold text-white">Career Snapshot</h2>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-white/[0.07]" />

          <div className="space-y-6 pl-7">
            {careerItems.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
                className="relative"
              >
                {/* Dot */}
                <div className="absolute -left-7 top-1.5 w-3.5 h-3.5 rounded-full border border-white/[0.15] bg-[#07070f] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-neutral-500" />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-4">
                  <span className="text-[10px] text-neutral-600 font-mono shrink-0">
                    {item.period}
                  </span>
                  <div>
                    <span className="text-sm font-medium text-white">{item.role}</span>
                    <span className="text-neutral-600 text-sm"> @ </span>
                    <span className="text-sm text-neutral-400">{item.org}</span>
                    <p className="text-xs text-neutral-600 mt-0.5 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
