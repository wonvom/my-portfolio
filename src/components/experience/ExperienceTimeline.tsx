"use client";

import { motion } from "motion/react";
import { experienceItems } from "@/data/experience";
import type { ExperienceItem } from "@/types/experience";

const typeLabel: Record<ExperienceItem["type"], string> = {
  work: "실무",
  research: "연구",
  club: "동아리",
  activity: "대외활동",
  volunteer: "봉사",
};

const typeColor: Record<ExperienceItem["type"], string> = {
  work: "bg-blue-500",
  research: "bg-violet-500",
  club: "bg-amber-500",
  activity: "bg-emerald-500",
  volunteer: "bg-rose-400",
};

export function ExperienceTimeline() {
  return (
    <section className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="space-y-8"
      >
        <div className="space-y-1">
          <p className="text-xs text-neutral-500 dark:text-neutral-400 tracking-widest uppercase">Background</p>
          <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white">Experience</h1>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-black/[0.07] dark:bg-white/[0.07]" />

          <div className="space-y-6 pl-7">
            {experienceItems.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07, ease: "easeOut" }}
                className="relative"
              >
                {/* Dot */}
                <div className="absolute -left-7 top-1.5 w-3.5 h-3.5 rounded-full border border-black/[0.12] dark:border-white/[0.15] bg-[#f5f5f7] dark:bg-[#07070f] flex items-center justify-center">
                  <div className={`w-1.5 h-1.5 rounded-full ${typeColor[item.type]}`} />
                </div>

                {/* Card */}
                <div className="rounded-2xl p-5 bg-white/60 dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.08] space-y-3 hover:border-black/[0.12] dark:hover:border-white/[0.12] transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-medium text-neutral-900 dark:text-white">{item.role}</span>
                        <span className="text-xs text-neutral-500 dark:text-neutral-400 px-2 py-0.5 rounded-full bg-black/[0.04] dark:bg-white/[0.04] border border-black/[0.07] dark:border-white/[0.07]">
                          {typeLabel[item.type]}
                        </span>
                      </div>
                      <span className="text-sm text-neutral-600 dark:text-neutral-300">{item.org}</span>
                    </div>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 font-mono shrink-0">
                      {item.period}
                    </span>
                  </div>

                  <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">{item.summary}</p>

                  <div className="flex flex-wrap gap-1.5">
                    {item.keywords.map((kw) => (
                      <span
                        key={kw}
                        className="px-2 py-0.5 rounded-full text-xs text-neutral-600 dark:text-neutral-300 bg-black/[0.04] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.07]"
                      >
                        {kw}
                      </span>
                    ))}
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
