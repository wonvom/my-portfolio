// src/components/sections/SkillsSection.tsx
"use client";

import { motion } from "motion/react";
import { techStack } from "@/data/techStack";

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="snap-section flex flex-col px-8 md:px-14 py-16"
    >
      <div className="flex justify-between items-baseline mb-10">
        <span className="text-[9px] tracking-[4px] uppercase" style={{ color: "var(--muted)" }}>
          Skills
        </span>
        <span className="text-[9px] tracking-[2px]" style={{ color: "var(--muted)" }}>05 / 06</span>
      </div>

      <div className="flex flex-col gap-6 flex-1 justify-center">
        {techStack.map((category, ci) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: ci * 0.07 }}
          >
            <p className="text-[8px] tracking-[3px] uppercase mb-2" style={{ color: "var(--muted)" }}>
              {category.label}
            </p>
            <div className="flex flex-wrap gap-[6px]">
              {category.items.map((item) => (
                <span
                  key={item.name}
                  className="text-[10px] px-3 py-[5px] rounded-[2px] border font-medium transition-colors duration-150"
                  style={{
                    color: item.level === "primary" ? "var(--fg)" : "var(--sub)",
                    borderColor: item.level === "primary" ? "var(--muted)" : "var(--border)",
                    background: item.level === "primary" ? "var(--card-bg)" : "transparent",
                    opacity: item.level === "primary" ? 1 : 0.7,
                  }}
                >
                  {item.name}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
