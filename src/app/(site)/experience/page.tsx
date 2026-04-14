import type { Metadata } from "next";
import { Container } from "@/components/common/Container";
import { ExperienceTimeline } from "@/components/experience/ExperienceTimeline";

export const metadata: Metadata = {
  title: "Experience — Wonjong Kim",
  description: "김원종의 경력, 연구, 활동 이력",
};

export default function ExperiencePage() {
  return (
    <Container>
      <ExperienceTimeline />
    </Container>
  );
}
