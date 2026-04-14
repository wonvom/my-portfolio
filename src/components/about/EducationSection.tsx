"use client";

import { motion } from "motion/react";
import { profile } from "@/data/profile";

export function EducationSection() {
  return (
    <section className="py-12 border-t border-black/[0.06] dark:border-white/[0.06]">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="space-y-6"
      >
        <div className="space-y-1">
          <p className="text-[10px] text-neutral-400 dark:text-neutral-600 tracking-widest uppercase">Education</p>
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">학력</h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {profile.education.map((edu) => (
            <div
              key={edu.school}
              className="rounded-2xl p-5 bg-white/60 dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.08] space-y-1"
            >
              <p className="text-sm font-medium text-neutral-900 dark:text-white">{edu.degree}</p>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">{edu.schoolKo}</p>
              <p className="text-[10px] text-neutral-400 dark:text-neutral-600 font-mono">{edu.period}</p>
            </div>
          ))}
        </div>

        {/* Industries */}
        <div className="space-y-3">
          <p className="text-[10px] text-neutral-400 dark:text-neutral-600 tracking-widest uppercase">주요 산업군</p>
          <div className="flex flex-wrap gap-2">
            {profile.industries.map((ind) => (
              <span
                key={ind}
                className="px-2.5 py-1 rounded-full text-xs text-neutral-500 dark:text-neutral-400 bg-black/[0.04] dark:bg-white/[0.04] border border-black/[0.07] dark:border-white/[0.07]"
              >
                {ind}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
