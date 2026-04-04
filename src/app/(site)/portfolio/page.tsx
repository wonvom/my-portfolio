import type { Metadata } from "next";
import { Container } from "@/components/common/Container";
import { Hero } from "@/components/home/Hero";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { CoreStrengths } from "@/components/home/CoreStrengths";
import { CareerSnapshot } from "@/components/home/CareerSnapshot";
import { CTA } from "@/components/home/CTA";

export const metadata: Metadata = {
  title: "Portfolio — Wonjong Kim",
  description: "Frontend developer portfolio of Wonjong Kim.",
};

export default function PortfolioPage() {
  return (
    <Container>
      <Hero />
      <FeaturedProjects />
      <CoreStrengths />
      <CareerSnapshot />
      <CTA />
    </Container>
  );
}
