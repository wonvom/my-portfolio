"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { CodePreview } from "@/components/ui/CodePreview";
import type { Project } from "@/types/project";

type ProjectShowcaseCardProps = {
  project: Project;
};

function PreviewBanner({ text }: { text?: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-neutral-50 dark:bg-neutral-900/80">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.08) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {text ? (
        <p className="relative text-xl font-bold text-neutral-800 dark:text-neutral-100 tracking-tight text-center px-6 leading-snug">
          {text}
        </p>
      ) : (
        <span className="relative text-xs text-neutral-400 dark:text-neutral-600 font-mono tracking-widest uppercase">
          [ Preview ]
        </span>
      )}
    </div>
  );
}

export function ProjectShowcaseCard({ project }: ProjectShowcaseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="
        flex flex-col rounded-2xl overflow-hidden
        bg-white/70 dark:bg-white/[0.05] backdrop-blur-xl
        border border-black/[0.09] dark:border-white/[0.09]
        shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.4)]
        hover:border-black/[0.14] dark:hover:border-white/[0.14] transition-colors duration-300
      "
    >
      {/* Preview banner */}
      <div className="relative h-36 w-full overflow-hidden shrink-0">
        <PreviewBanner text={project.preview} />
        <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white/90 dark:from-[#0d0e18] to-transparent" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-4">
        {/* Title + links */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-semibold text-neutral-900 dark:text-white text-sm leading-tight">
              {project.title}
            </h3>
            {project.period && (
              <p className="text-[10px] text-neutral-400 dark:text-neutral-600 font-mono mt-0.5">{project.period}</p>
            )}
          </div>
          <div className="flex gap-2 shrink-0">
            {project.githubHref && (
              <a
                href={project.githubHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors px-2 py-0.5 rounded border border-black/[0.07] dark:border-white/[0.07] hover:border-black/20 dark:hover:border-white/20"
              >
                GH
              </a>
            )}
            <Link
              href={`/projects/${project.id}`}
              className="text-xs text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors px-2.5 py-0.5 rounded border border-black/[0.1] dark:border-white/[0.12] hover:border-black/25 dark:hover:border-white/25"
            >
              Detail →
            </Link>
          </div>
        </div>

        {/* Problem / result */}
        <div className="space-y-1">
          <p className="text-xs text-neutral-500 leading-relaxed">{project.problem}</p>
          <p className="text-xs text-emerald-600 dark:text-emerald-400/80 font-medium">{project.result}</p>
        </div>

        {/* Code snippet */}
        {project.codeSnippet && (
          <CodePreview
            code={project.codeSnippet.code}
            language={project.codeSnippet.language}
            filename={project.codeSnippet.filename}
          />
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-full text-[10px] text-neutral-500 dark:text-neutral-400 bg-black/[0.04] dark:bg-white/[0.05] border border-black/[0.06] dark:border-white/[0.07]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
