"use client";

import { motion } from "motion/react";
import { strengths } from "@/data/strengths";
import { techStack } from "@/data/techStack";
import { TechBadge } from "@/components/ui/TechBadge";

export function CareerDirectionSection() {
  return (
    <section className="py-12 border-t border-white/[0.06] space-y-12">
      {/* Core Competencies */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="space-y-6"
      >
        <div className="space-y-1">
          <p className="text-[10px] text-neutral-600 tracking-widest uppercase">
            Core Competencies
          </p>
          <h2 className="text-xl font-semibold text-white">핵심 역량</h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {strengths.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06, ease: "easeOut" }}
              className="rounded-2xl p-4 bg-white/[0.04] border border-white/[0.08] space-y-2"
            >
              <div className="flex items-center gap-2">
                <span className="text-base text-neutral-500">{s.symbol}</span>
                <h3 className="text-sm font-medium text-white">{s.title}</h3>
              </div>
              <p className="text-xs text-neutral-500 leading-relaxed">{s.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Tech Stack */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="space-y-6"
      >
        <div className="space-y-1">
          <p className="text-[10px] text-neutral-600 tracking-widest uppercase">Tech Stack</p>
          <h2 className="text-xl font-semibold text-white">기술 스택</h2>
        </div>

        <div className="space-y-4">
          {techStack.map((category) => (
            <div key={category.id} className="flex flex-col sm:flex-row sm:gap-6 gap-2">
              <p className="text-[10px] text-neutral-600 tracking-wider uppercase shrink-0 w-24 pt-1">
                {category.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <TechBadge key={item.name} name={item.name} level={item.level} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
