"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { SectionDots } from "@/components/ui/SectionDots";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ContactSection } from "@/components/sections/ContactSection";

const SECTION_IDS = ["hero", "projects", "skills", "contact"];

export default function PortfolioPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);

  const navigateTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleDotClick = useCallback(
    (index: number) => navigateTo(SECTION_IDS[index]),
    [navigateTo]
  );

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTION_IDS.forEach((id, i) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setCurrentSection(i); },
        { threshold: 0.5 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <>
      <Navbar onNavigate={navigateTo} />
      <SectionDots
        total={SECTION_IDS.length}
        current={currentSection}
        onDotClick={handleDotClick}
      />
      <main ref={containerRef} className="snap-container pt-12">
        <HeroSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>
    </>
  );
}
