import type { Metadata } from "next";
import { Container } from "@/components/common/Container";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects — Wonjong Kim",
  description: "김원종의 프로젝트 — 데이터 자동화, 클라우드 통합, 풀스택 개발",
};

export default function ProjectsPage() {
  return (
    <Container>
      <section className="py-24 sm:py-28 space-y-12">
        <div className="space-y-3">
          <p className="text-xs text-neutral-500 dark:text-neutral-400 tracking-widest uppercase">All Work</p>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">Projects</h1>
          <p className="text-neutral-600 dark:text-neutral-300 max-w-xl leading-relaxed text-sm">
            데이터 파이프라인, 클라우드 통합, 풀스택 서비스, AI 모델 구현까지 — 현장의 문제를
            코드로 해결한 기록입니다.
          </p>
        </div>
        <ProjectGrid projects={projects} />
      </section>
    </Container>
  );
}
