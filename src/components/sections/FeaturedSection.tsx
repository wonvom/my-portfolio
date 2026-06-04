// src/components/sections/FeaturedSection.tsx
"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { projects } from "@/data/projects";

const featured = projects.filter((p) => p.featured);

export function FeaturedSection() {
  return (
    <section
      id="featured"
      className="snap-section flex flex-col justify-between px-8 md:px-14 py-16"
    >
      {/* Header */}
      <div className="flex justify-between items-baseline mb-8">
        <span className="text-xs tracking-[4px] uppercase" style={{ color: "var(--muted)" }}>
          Selected Work
        </span>
        <Link
          href="#projects"
          className="text-xs tracking-[1px] transition-colors duration-200 hover:text-[var(--fg)]"
          style={{ color: "var(--sub)" }}
        >
          View All Projects →
        </Link>
      </div>

      {/* Project list */}
      <div className="flex flex-col flex-1 justify-center">
        {featured.map((project, i) => (
          <motion.div
            key={project.id}
            className="group relative"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover="hovered"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Left accent bar */}
            <motion.div
              className="absolute left-0 top-0 bottom-0 w-[2px]"
              style={{ background: "var(--fg)", originY: 0 }}
              initial={{ scaleY: 0 }}
              variants={{ hovered: { scaleY: 1 } }}
              transition={{ duration: 0.25 }}
            />

            <Link
              href={`/projects/${project.id}`}
              className="grid gap-4 py-5 border-b pl-4"
              style={{
                gridTemplateColumns: "1fr 120px",
                borderColor: "var(--border)",
              }}
            >
              {/* Left col */}
              <div>
                <div className="flex items-baseline gap-3 mb-2">
                  <span
                    className="text-sm font-bold tracking-[1px] shrink-0"
                    style={{ color: "var(--fg)", opacity: 0.35 }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3
                    className="text-lg font-extrabold tracking-[-0.5px] leading-[1.15] transition-colors duration-200"
                    style={{ color: "var(--fg)" }}
                  >
                    {project.title}
                  </h3>
                </div>
                {project.preview && (
                  <p className="text-sm italic mb-3" style={{ color: "var(--sub)" }}>
                    &ldquo;{project.preview}&rdquo;
                  </p>
                )}
                <div className="flex flex-wrap gap-1">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-[6px] py-[2px] rounded-[2px] border"
                      style={{
                        color: "var(--sub)",
                        borderColor: "var(--border)",
                        background: "var(--card-bg)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right col */}
              <div className="flex flex-col items-end justify-between">
                <span
                  className="text-sm text-right leading-relaxed whitespace-pre-wrap font-medium"
                  style={{ color: "var(--sub)" }}
                >
                  {project.period?.replace(" — ", "\n")}
                </span>
                <motion.span
                  className="text-lg"
                  aria-hidden="true"
                  style={{ color: "var(--fg)" }}
                  initial={{ opacity: 0, x: -8 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  ↗
                </motion.span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div
        className="flex justify-between pt-5 border-t"
        style={{ borderColor: "var(--border)" }}
      >
        <span className="text-xs tracking-[2px]" style={{ color: "var(--muted)" }}>
          02 / 06
        </span>
      </div>
    </section>
  );
}
