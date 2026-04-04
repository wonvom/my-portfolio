import type { Metadata } from "next";
import { Container } from "@/components/common/Container";
import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { TechStack } from "@/components/home/TechStack";
import { CTA } from "@/components/home/CTA";

export const metadata: Metadata = {
  title: "Portfolio — Wonjong Kim",
  description: "Frontend developer portfolio of Wonjong Kim.",
};

export default function PortfolioPage() {
  return (
    <Container>
      <Hero />
      <Intro />
      <FeaturedProjects />
      <TechStack />
      <CTA />
    </Container>
  );
}
