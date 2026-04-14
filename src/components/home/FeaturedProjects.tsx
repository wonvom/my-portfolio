"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { projects } from "@/data/projects";
import { ProjectShowcaseCard } from "./ProjectShowcaseCard";

export function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured);

  return (
    <section id="projects" className="py-16 border-t border-black/[0.06] dark:border-white/[0.06]">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="space-y-8"
      >
        {/* Section header */}
        <div className="flex items-end justify-between">
          <div className="space-y-1">
            <p className="text-[10px] text-neutral-400 dark:text-neutral-600 tracking-widest uppercase">
              Selected Work
            </p>
            <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white">
              Featured Projects
            </h2>
          </div>
          <Link
            href="/projects"
            className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            All projects →
          </Link>
        </div>

        {/* Grid */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => (
            <ProjectShowcaseCard key={project.id} project={project} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
