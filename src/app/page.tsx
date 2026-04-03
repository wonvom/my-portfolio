import { Container } from "@/components/common/Container";
import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { TechStack } from "@/components/home/TechStack";
import { CTA } from "@/components/home/CTA";

export default function Home() {
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
