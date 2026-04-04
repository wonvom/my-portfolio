import type { Metadata } from "next";
import { Container } from "@/components/common/Container";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects — Wonjong Kim",
  description: "A collection of projects I've built.",
};

export default function ProjectsPage() {
  return (
    <Container>
      <section className="py-24 sm:py-32 space-y-12">
        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tight text-white">
            Projects
          </h1>
          <p className="text-neutral-400 max-w-xl leading-relaxed">
            A collection of things I&apos;ve built — side projects, experiments,
            and work I&apos;m proud of.
          </p>
        </div>
        <ProjectGrid projects={projects} />
      </section>
    </Container>
  );
}
