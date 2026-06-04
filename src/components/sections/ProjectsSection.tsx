"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { projects } from "@/data/projects";

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="snap-section flex flex-col px-8 md:px-14 py-16 overflow-y-auto"
    >
      {/* Header */}
      <div className="flex justify-between items-baseline mb-10">
        <span className="text-xs tracking-[4px] uppercase" style={{ color: "var(--muted)" }}>
          Projects
        </span>
        <span className="text-xs tracking-[2px]" style={{ color: "var(--muted)" }}>02 / 04</span>
      </div>

      {/* Grid */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px flex-1"
        style={{ background: "var(--border)" }}
      >
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href={`/projects/${project.id}`}
              className="group flex flex-col h-full p-6 transition-colors duration-200 hover:bg-[var(--card-bg)]"
              style={{ background: "var(--bg)" }}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold tracking-[1px]" style={{ color: "var(--muted)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {project.featured && (
                    <span
                      className="text-[10px] px-1.5 py-0.5 rounded-sm font-medium tracking-wide"
                      style={{
                        color: "var(--bg)",
                        background: "var(--fg)",
                      }}
                    >
                      PICK
                    </span>
                  )}
                </div>
                <span
                  className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ color: "var(--fg)" }}
                  aria-hidden="true"
                >
                  ↗
                </span>
              </div>

              <h3
                className="text-sm font-extrabold tracking-[-0.4px] leading-[1.2] mb-2 flex-1"
                style={{ color: "var(--fg)" }}
              >
                {project.title}
              </h3>

              {project.preview && (
                <p className="text-xs italic mb-4" style={{ color: "var(--sub)" }}>
                  &ldquo;{project.preview}&rdquo;
                </p>
              )}

              <div className="flex flex-wrap gap-1 mt-auto">
                {project.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] px-[6px] py-[2px] border rounded-[2px]"
                    style={{ color: "var(--sub)", borderColor: "var(--border)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {project.period && (
                <p className="text-xs mt-3" style={{ color: "var(--sub)" }}>
                  {project.period}
                </p>
              )}
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex justify-between pt-5 mt-4 border-t" style={{ borderColor: "var(--border)" }}>
        <span className="text-xs tracking-[2px]" style={{ color: "var(--muted)" }}>02 / 04</span>
      </div>
    </section>
  );
}
