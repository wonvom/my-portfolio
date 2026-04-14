import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/common/Container";
import { ProjectDetailLayout } from "@/components/projects/detail/ProjectDetailLayout";
import { projects } from "@/data/projects";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} — Wonjong Kim`,
    description: project.problem,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) notFound();

  return (
    <Container>
      <ProjectDetailLayout project={project} />
    </Container>
  );
}
