import type { Metadata } from "next";
import { Container } from "@/components/common/Container";
import { AboutHero } from "@/components/about/AboutHero";
import { EducationSection } from "@/components/about/EducationSection";
import { CareerDirectionSection } from "@/components/about/CareerDirectionSection";
import { WorkStyleSection } from "@/components/about/WorkStyleSection";

export const metadata: Metadata = {
  title: "About — Wonjong Kim",
  description: "김원종 — 데이터를 기록이 아니라 작동하는 시스템으로 바꾸는 사람",
};

export default function AboutPage() {
  return (
    <Container>
      <AboutHero />
      <EducationSection />
      <CareerDirectionSection />
      <WorkStyleSection />
    </Container>
  );
}
