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
      <div className="mb-10">
        <span className="text-[9px] tracking-[4px] uppercase" style={{ color: "var(--muted)" }}>
          All Work
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px flex-1"
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
                <span className="text-[10px] font-bold tracking-[1px]" style={{ color: "var(--muted)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ color: "var(--fg)" }}
                  aria-hidden="true"
                >
                  ↗
                </span>
              </div>
              <h3
                className="text-[13px] font-extrabold tracking-[-0.4px] leading-[1.2] mb-2 flex-1"
                style={{ color: "var(--fg)" }}
              >
                {project.title}
              </h3>
              {project.preview && (
                <p className="text-[10px] italic mb-4" style={{ color: "var(--sub)" }}>
                  &ldquo;{project.preview}&rdquo;
                </p>
              )}
              <div className="flex flex-wrap gap-1 mt-auto">
                {project.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-[8px] px-[6px] py-[2px] border rounded-[2px]"
                    style={{ color: "var(--sub)", borderColor: "var(--border)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {project.period && (
                <p className="text-[9px] mt-3" style={{ color: "var(--muted)" }}>
                  {project.period}
                </p>
              )}
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex justify-between pt-5 mt-4 border-t" style={{ borderColor: "var(--border)" }}>
        <span className="text-[10px] tracking-[2px]" style={{ color: "var(--muted)" }}>03 / 06</span>
      </div>
    </section>
  );
}
