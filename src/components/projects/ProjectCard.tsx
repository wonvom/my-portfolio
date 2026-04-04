import Link from "next/link";
import type { Project } from "@/types/project";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="flex flex-col rounded-lg border border-white/10 bg-white/5 p-6 gap-3 hover:border-white/[0.15] transition-colors">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-semibold text-white text-sm">{project.title}</h3>
          {project.period && (
            <p className="text-[10px] text-neutral-600 font-mono mt-0.5">{project.period}</p>
          )}
        </div>
        {project.featured && (
          <span className="px-2 py-0.5 rounded-full text-[10px] text-amber-400 bg-amber-500/10 border border-amber-500/20 shrink-0">
            Featured
          </span>
        )}
      </div>

      <p className="flex-1 text-xs text-neutral-400 leading-relaxed">{project.problem}</p>
      <p className="text-xs text-emerald-400/80 font-medium">{project.result}</p>

      <div className="flex flex-wrap gap-1.5">
        {project.tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-neutral-300"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex gap-3 pt-1">
        <Link
          href={`/projects/${project.id}`}
          className="text-xs text-neutral-400 hover:text-white transition-colors"
        >
          Detail →
        </Link>
        {project.href && (
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-neutral-400 hover:text-white transition-colors"
          >
            Live →
          </a>
        )}
        {project.githubHref && (
          <a
            href={project.githubHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-neutral-400 hover:text-white transition-colors"
          >
            GitHub →
          </a>
        )}
      </div>
    </div>
  );
}
