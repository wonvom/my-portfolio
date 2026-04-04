import Link from "next/link";
import type { Project } from "@/types/project";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="flex flex-col rounded-lg border border-white/10 bg-white/5 p-6 gap-3">
      <h3 className="font-semibold text-white">{project.title}</h3>
      <p className="flex-1 text-sm text-neutral-400 leading-relaxed">
        {project.problem}
      </p>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-neutral-300"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex gap-4 pt-1">
        {project.href && (
          <Link
            href={project.href}
            className="text-xs text-neutral-400 hover:text-white transition-colors"
          >
            Live →
          </Link>
        )}
        {project.githubHref && (
          <Link
            href={project.githubHref}
            className="text-xs text-neutral-400 hover:text-white transition-colors"
          >
            GitHub →
          </Link>
        )}
      </div>
    </div>
  );
}
