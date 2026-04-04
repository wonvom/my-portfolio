"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { CodePreview } from "@/components/ui/CodePreview";
import { TechBadge } from "@/components/ui/TechBadge";
import type { Project } from "@/types/project";

type ProjectDetailLayoutProps = {
  project: Project;
};

function ImageGalleryPlaceholder({ alt }: { alt: string }) {
  return (
    <div className="relative h-52 w-full rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-black/[0.07] dark:border-white/[0.07]">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
        <span className="text-xs text-neutral-400 dark:text-neutral-600 font-mono tracking-widest uppercase">
          [ Image Placeholder ]
        </span>
        <span className="text-[10px] text-neutral-400 dark:text-neutral-700">{alt}</span>
      </div>
    </div>
  );
}

export function ProjectDetailLayout({ project }: ProjectDetailLayoutProps) {
  return (
    <article className="py-16 max-w-2xl mx-auto space-y-12">
      {/* Back */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
      >
        ← Projects
      </Link>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="space-y-4"
      >
        <div className="space-y-1">
          {project.period && (
            <p className="text-[10px] text-neutral-400 dark:text-neutral-600 font-mono tracking-wider">{project.period}</p>
          )}
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white leading-tight">
            {project.title}
          </h1>
          {project.role && (
            <p className="text-sm text-neutral-600 dark:text-neutral-400">{project.role}</p>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <TechBadge key={tag} name={tag} level="secondary" />
          ))}
        </div>

        {/* Related roles */}
        {project.relatedRoles && project.relatedRoles.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.relatedRoles.map((r) => (
              <span
                key={r}
                className="px-2.5 py-0.5 rounded-full text-[10px] text-blue-600 dark:text-blue-400 bg-blue-500/10 border border-blue-500/20"
              >
                {r}
              </span>
            ))}
          </div>
        )}
      </motion.div>

      {/* Sections */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        className="space-y-10"
      >
        <Section title="Problem" label="문제">
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{project.problem}</p>
        </Section>

        {project.solution && (
          <Section title="Solution" label="해결 방법">
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{project.solution}</p>
          </Section>
        )}

        <Section title="Outcome" label="결과">
          <div className="rounded-xl p-4 bg-emerald-500/[0.06] border border-emerald-500/[0.15]">
            <p className="text-sm text-emerald-700 dark:text-emerald-400 leading-relaxed font-medium">
              {project.outcome ?? project.result}
            </p>
          </div>
        </Section>

        <Section title="Image Gallery" label="스크린샷 / 다이어그램">
          {project.imageGallery && project.imageGallery.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {project.imageGallery.map((src, i) => (
                <div key={i} className="relative h-48 w-full rounded-xl overflow-hidden border border-black/[0.07] dark:border-white/[0.07]">
                  <Image src={src} alt={`${project.title} image ${i + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          ) : (
            <ImageGalleryPlaceholder alt={project.imageAlt ?? project.title} />
          )}
        </Section>

        <Section title="Code" label="코드 스니펫">
          {project.codeSnippets && project.codeSnippets.length > 0 ? (
            <div className="space-y-4">
              {project.codeSnippets.map((snippet, i) => (
                <CodePreview key={i} code={snippet.code} language={snippet.language} filename={snippet.filename} />
              ))}
            </div>
          ) : project.codeSnippet ? (
            <CodePreview code={project.codeSnippet.code} language={project.codeSnippet.language} filename={project.codeSnippet.filename} />
          ) : (
            <div className="rounded-xl p-4 bg-neutral-900 border border-white/[0.07] text-center">
              <span className="text-xs text-neutral-600 font-mono tracking-widest uppercase">[ Code Placeholder ]</span>
            </div>
          )}
        </Section>

        {project.learned && (
          <Section title="What I Learned" label="배운 점">
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{project.learned}</p>
          </Section>
        )}

        {(project.href || project.githubHref) && (
          <div className="flex gap-3 pt-2">
            {project.githubHref && (
              <a href={project.githubHref} target="_blank" rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl text-sm text-neutral-700 dark:text-neutral-300 bg-black/[0.05] dark:bg-white/[0.05] border border-black/[0.09] dark:border-white/[0.09] hover:bg-black/[0.09] dark:hover:bg-white/[0.08] transition-colors">
                GitHub →
              </a>
            )}
            {project.href && (
              <a href={project.href} target="_blank" rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl text-sm font-medium text-white bg-neutral-900 dark:bg-white dark:text-black hover:bg-neutral-700 dark:hover:bg-neutral-200 transition-colors">
                Live →
              </a>
            )}
          </div>
        )}
      </motion.div>
    </article>
  );
}

function Section({ title, label, children }: { title: string; label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <div className="space-y-0.5">
        <p className="text-[10px] text-neutral-400 dark:text-neutral-600 tracking-widest uppercase">{title}</p>
        <h2 className="text-base font-semibold text-neutral-900 dark:text-white">{label}</h2>
      </div>
      {children}
    </div>
  );
}
