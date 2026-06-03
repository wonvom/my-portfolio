# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 기존 포트폴리오를 풀스크린 섹션 스크롤 방식의 에디토리얼 디자인으로 전면 재작성한다.

**Architecture:** `src/app/page.tsx`를 풀스크린 섹션 컨테이너로 교체하고, `src/components/sections/`에 6개 섹션 컴포넌트를 새로 작성한다. 기존 `src/data/`, `src/types/`, `/projects/[id]` 라우트는 그대로 유지한다.

**Tech Stack:** Next.js 15 App Router, TypeScript, Tailwind CSS v4, Framer Motion (`motion/react`)

---

## File Map

### 생성
- `src/components/layout/Navbar.tsx` — 고정 상단 네비바 (데스크탑)
- `src/components/layout/MobileMenu.tsx` — 모바일 햄버거 오버레이 메뉴
- `src/components/ui/SectionDots.tsx` — 우측 사이드 도트 인디케이터
- `src/components/ui/AnimatedButton.tsx` — Fill hover 버튼
- `src/components/ui/CountUp.tsx` — 숫자 카운트업 컴포넌트
- `src/components/sections/HeroSection.tsx`
- `src/components/sections/FeaturedSection.tsx`
- `src/components/sections/ProjectsSection.tsx`
- `src/components/sections/StorySection.tsx`
- `src/components/sections/SkillsSection.tsx`
- `src/components/sections/ContactSection.tsx`

### 수정
- `src/app/page.tsx` — 기존 LandingPage 전체 교체
- `src/app/layout.tsx` — Geist → Inter 폰트 교체, ThemeToggle 제거 (Navbar로 이동)
- `src/app/globals.css` — 새 CSS 변수 추가 (배경색, 테두리색)

### 유지 (변경 없음)
- `src/data/projects.ts`, `src/data/profile.ts`, `src/data/techStack.ts`
- `src/types/` 전체
- `src/providers/ThemeProvider.tsx`
- `src/app/(site)/projects/[id]/page.tsx` 및 하위 라우트 전체
- `src/components/ui/ThemeToggle.tsx` (Navbar 내부에서 재사용)

---

## Task 1: 글로벌 스타일 — Inter 폰트 및 CSS 변수

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1: layout.tsx에서 Geist를 Inter로 교체**

```tsx
// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Wonjong Kim",
  description: "Developer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${inter.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <head />
      <body className="min-h-full bg-[var(--bg)] text-[var(--fg)] transition-colors duration-300">
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme')||'dark';document.documentElement.classList.toggle('dark',t==='dark');})();`,
          }}
        />
        <ThemeProvider>
          <CustomCursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 2: globals.css에 새 CSS 변수 추가**

```css
/* src/app/globals.css — 기존 내용 위에 추가 */
@import "tailwindcss";

@custom-variant dark (&:is(.dark, .dark *));

:root {
  --bg: #f5f5f0;
  --fg: #111111;
  --sub: #999999;
  --muted: #cccccc;
  --border: #e5e5e0;
  --card-bg: #ededea;
  --font-sans: var(--font-inter);
}

.dark {
  --bg: #080808;
  --fg: #ffffff;
  --sub: #555555;
  --muted: #333333;
  --border: #141414;
  --card-bg: #0e0e0e;
}

body {
  font-family: var(--font-inter), -apple-system, sans-serif;
}

/* scroll-snap 컨테이너 */
.snap-container {
  height: 100dvh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
}

.snap-section {
  scroll-snap-align: start;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
}

/* 기존 syntax highlighting, cursor 스타일 유지 */
```

- [ ] **Step 3: 빌드 검증**

```bash
cd /Users/wonjongkim/Desktop/Ethan/Dev/WonvoM/my-portfolio && npm run build
```

Expected: 빌드 성공 (폰트 변경 외 기능 변화 없음)

- [ ] **Step 4: 커밋**

```bash
git add src/app/layout.tsx src/app/globals.css
git commit -m "feat: replace Geist with Inter, add editorial CSS variables"
```

---

## Task 2: SectionDots — 우측 사이드 도트 인디케이터

**Files:**
- Create: `src/components/ui/SectionDots.tsx`

- [ ] **Step 1: SectionDots 컴포넌트 작성**

```tsx
// src/components/ui/SectionDots.tsx
"use client";

type Props = {
  total: number;
  current: number;
  onDotClick: (index: number) => void;
};

export function SectionDots({ total, current, onDotClick }: Props) {
  return (
    <div className="fixed right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-[6px] items-center hidden md:flex">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onDotClick(i)}
          aria-label={`섹션 ${i + 1}로 이동`}
          className="transition-all duration-300"
          style={{
            width: i === current ? 6 : 4,
            height: i === current ? 6 : 4,
            borderRadius: "50%",
            background: i === current ? "var(--fg)" : "var(--muted)",
          }}
        />
      ))}
    </div>
  );
}
```

- [ ] **Step 2: 빌드 검증**

```bash
npm run build
```

Expected: 빌드 성공

- [ ] **Step 3: 커밋**

```bash
git add src/components/ui/SectionDots.tsx
git commit -m "feat: add SectionDots side indicator"
```

---

## Task 3: AnimatedButton — Fill hover 버튼

**Files:**
- Create: `src/components/ui/AnimatedButton.tsx`

- [ ] **Step 1: AnimatedButton 작성**

```tsx
// src/components/ui/AnimatedButton.tsx
"use client";

import { motion } from "motion/react";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "fill" | "ghost";
  className?: string;
};

export function AnimatedButton({ children, onClick, href, variant = "fill", className = "" }: Props) {
  const base =
    "relative inline-flex items-center gap-2 px-8 py-4 text-[10px] tracking-[2px] uppercase overflow-hidden border transition-colors duration-200 rounded-[2px] cursor-pointer";

  const fillStyle = "border-[var(--border)] text-[var(--fg)]";
  const ghostStyle = "border-[var(--border)] text-[var(--sub)] hover:text-[var(--fg)] hover:border-[var(--muted)]";

  const inner = (
    <motion.span
      className={`${base} ${variant === "fill" ? fillStyle : ghostStyle} ${className}`}
      onClick={onClick}
      whileHover={variant === "fill" ? "hover" : undefined}
    >
      {variant === "fill" && (
        <motion.span
          className="absolute inset-0 bg-[var(--fg)] z-0"
          variants={{
            hover: { scaleX: 1, originX: 0 },
          }}
          initial={{ scaleX: 0, originX: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
      )}
      <span className="relative z-10 mix-blend-difference">{children}</span>
    </motion.span>
  );

  if (href) {
    return <a href={href}>{inner}</a>;
  }
  return inner;
}
```

- [ ] **Step 2: 빌드 검증**

```bash
npm run build
```

Expected: 빌드 성공

- [ ] **Step 3: 커밋**

```bash
git add src/components/ui/AnimatedButton.tsx
git commit -m "feat: add AnimatedButton with fill hover effect"
```

---

## Task 4: CountUp — 숫자 카운트업 컴포넌트

**Files:**
- Create: `src/components/ui/CountUp.tsx`

- [ ] **Step 1: CountUp 작성**

```tsx
// src/components/ui/CountUp.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

type Props = {
  target: number;
  suffix?: string;
  duration?: number; // ms
};

export function CountUp({ target, suffix = "", duration = 1200 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const steps = 40;
    const stepDuration = duration / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += 1;
      setCount(Math.round((target / steps) * current));
      if (current >= steps) {
        setCount(target);
        clearInterval(timer);
      }
    }, stepDuration);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}
```

- [ ] **Step 2: 빌드 검증**

```bash
npm run build
```

Expected: 빌드 성공

- [ ] **Step 3: 커밋**

```bash
git add src/components/ui/CountUp.tsx
git commit -m "feat: add CountUp component with IntersectionObserver trigger"
```

---

## Task 5: Navbar — 고정 상단 네비바

**Files:**
- Create: `src/components/layout/Navbar.tsx`
- Create: `src/components/layout/MobileMenu.tsx`

- [ ] **Step 1: MobileMenu 작성**

```tsx
// src/components/layout/MobileMenu.tsx
"use client";

import { motion, AnimatePresence } from "motion/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  sections: { label: string; id: string }[];
  onNavigate: (id: string) => void;
};

export function MobileMenu({ isOpen, onClose, sections, onNavigate }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col justify-center px-8"
          style={{ background: "var(--bg)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-6 text-[10px] tracking-[3px] uppercase"
            style={{ color: "var(--sub)" }}
          >
            Close
          </button>
          <nav className="flex flex-col gap-2">
            {sections.map((s, i) => (
              <motion.button
                key={s.id}
                onClick={() => { onNavigate(s.id); onClose(); }}
                className="text-left text-4xl font-black tracking-[-2px] py-2"
                style={{ color: "var(--fg)" }}
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                {s.label}
              </motion.button>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: Navbar 작성**

```tsx
// src/components/layout/Navbar.tsx
"use client";

import { useState } from "react";
import { useTheme } from "@/providers/ThemeProvider";
import { MobileMenu } from "./MobileMenu";

const NAV_SECTIONS = [
  { label: "Featured", id: "featured" },
  { label: "Projects", id: "projects" },
  { label: "Story", id: "story" },
  { label: "Skills", id: "skills" },
];

type Props = {
  onNavigate: (id: string) => void;
};

export function Navbar({ onNavigate }: Props) {
  const { toggle } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-[100] h-12 px-6 flex items-center justify-between border-b"
        style={{
          background: "color-mix(in srgb, var(--bg) 80%, transparent)",
          borderColor: "var(--border)",
          backdropFilter: "blur(8px)",
        }}
      >
        {/* Logo */}
        <button
          onClick={() => onNavigate("hero")}
          className="text-[11px] font-black tracking-[-0.5px]"
          style={{ color: "var(--fg)" }}
        >
          KIM WONJONG
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-6">
          {NAV_SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => onNavigate(s.id)}
              className="text-[10px] tracking-[1px] uppercase transition-colors duration-200"
              style={{ color: "var(--sub)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--fg)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--sub)")}
            >
              {s.label}
            </button>
          ))}
        </nav>

        {/* Right: Resume + Contact + Theme */}
        <div className="hidden md:flex gap-4 items-center">
          <a
            href="/resume.pdf"
            download
            className="text-[10px] tracking-[1px] uppercase transition-colors duration-200"
            style={{ color: "var(--sub)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--fg)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--sub)")}
          >
            Resume
          </a>
          <button
            onClick={() => onNavigate("contact")}
            className="text-[10px] tracking-[1px] uppercase transition-colors duration-200"
            style={{ color: "var(--sub)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--fg)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--sub)")}
          >
            Contact
          </button>
          <button
            onClick={toggle}
            className="text-[10px] tracking-[1px] uppercase transition-colors duration-200"
            style={{ color: "var(--muted)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--sub)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
            aria-label="테마 전환"
          >
            ◐
          </button>
        </div>

        {/* Mobile: hamburger */}
        <button
          className="md:hidden text-[10px] tracking-[2px] uppercase"
          style={{ color: "var(--sub)" }}
          onClick={() => setMenuOpen(true)}
        >
          Menu
        </button>
      </header>

      <MobileMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        sections={[...NAV_SECTIONS, { label: "Contact", id: "contact" }]}
        onNavigate={onNavigate}
      />
    </>
  );
}
```

- [ ] **Step 3: 빌드 검증**

```bash
npm run build
```

Expected: 빌드 성공

- [ ] **Step 4: 커밋**

```bash
git add src/components/layout/Navbar.tsx src/components/layout/MobileMenu.tsx
git commit -m "feat: add Navbar and MobileMenu components"
```

---

## Task 6: HeroSection

**Files:**
- Create: `src/components/sections/HeroSection.tsx`

- [ ] **Step 1: HeroSection 작성**

```tsx
// src/components/sections/HeroSection.tsx
"use client";

import { motion } from "motion/react";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="snap-section relative flex flex-col items-center justify-center text-center px-6"
    >
      {/* Eyebrow */}
      <motion.p
        className="text-[9px] tracking-[4px] uppercase mb-4"
        style={{ color: "var(--muted)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Software Engineer · Seoul
      </motion.p>

      {/* Name */}
      <motion.h1
        className="font-black leading-[0.88] tracking-[-4px]"
        style={{
          fontSize: "clamp(64px, 10vw, 120px)",
          color: "var(--fg)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        WONJONG
        <br />
        KIM
      </motion.h1>

      {/* Divider */}
      <motion.div
        className="w-8 h-px my-6"
        style={{ background: "var(--border)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      />

      {/* Tagline */}
      <motion.p
        className="text-[11px] tracking-[2px] uppercase"
        style={{ color: "var(--sub)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.0 }}
      >
        Building things that feel right
      </motion.p>

      {/* Bottom: section number + scroll hint */}
      <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end pointer-events-none">
        <span className="text-[10px] tracking-[2px]" style={{ color: "var(--muted)" }}>
          01 / 06
        </span>
        <motion.span
          className="text-[10px] tracking-[2px]"
          style={{ color: "var(--muted)" }}
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          ↓ SCROLL
        </motion.span>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: 빌드 검증**

```bash
npm run build
```

Expected: 빌드 성공

- [ ] **Step 3: 커밋**

```bash
git add src/components/sections/HeroSection.tsx
git commit -m "feat: add HeroSection with fade-in animation"
```

---

## Task 7: FeaturedSection

**Files:**
- Create: `src/components/sections/FeaturedSection.tsx`

- [ ] **Step 1: FeaturedSection 작성**

```tsx
// src/components/sections/FeaturedSection.tsx
"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { projects } from "@/data/projects";

const featured = projects.filter((p) => p.featured);

export function FeaturedSection() {
  return (
    <section
      id="featured"
      className="snap-section flex flex-col justify-between px-8 md:px-14 py-16"
    >
      {/* Header */}
      <div className="flex justify-between items-baseline mb-8">
        <span className="text-[9px] tracking-[4px] uppercase" style={{ color: "var(--muted)" }}>
          Selected Work
        </span>
        <Link
          href="#projects"
          className="text-[9px] tracking-[1px] transition-colors duration-200"
          style={{ color: "var(--sub)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--fg)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--sub)")}
        >
          View All Projects →
        </Link>
      </div>

      {/* Project list */}
      <div className="flex flex-col flex-1 justify-center">
        {featured.map((project, i) => (
          <motion.div
            key={project.id}
            className="group relative"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Left accent bar */}
            <motion.div
              className="absolute left-0 top-0 bottom-0 w-[2px]"
              style={{ background: "var(--fg)", originY: 0 }}
              initial={{ scaleY: 0 }}
              whileHover={{ scaleY: 1 }}
              transition={{ duration: 0.25 }}
            />

            <Link
              href={`/projects/${project.id}`}
              className="grid gap-4 py-5 border-b pl-4"
              style={{
                gridTemplateColumns: "1fr 120px",
                borderColor: "var(--border)",
              }}
            >
              {/* Left col */}
              <div>
                <div className="flex items-baseline gap-3 mb-2">
                  <span
                    className="text-[10px] font-bold tracking-[1px] shrink-0"
                    style={{ color: "var(--muted)" }}
                  >
                    0{i + 1}
                  </span>
                  <h3
                    className="text-[15px] font-extrabold tracking-[-0.5px] leading-[1.15] transition-colors duration-200 group-hover:text-[var(--fg)]"
                    style={{ color: "var(--fg)", opacity: 0.88 }}
                  >
                    {project.title}
                  </h3>
                </div>
                {project.preview && (
                  <p className="text-[10px] italic mb-3" style={{ color: "var(--sub)" }}>
                    "{project.preview}"
                  </p>
                )}
                <div className="flex flex-wrap gap-1">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="text-[8px] px-[6px] py-[2px] rounded-[2px] border"
                      style={{
                        color: "var(--sub)",
                        borderColor: "var(--border)",
                        background: "var(--card-bg)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right col */}
              <div className="flex flex-col items-end justify-between">
                <span
                  className="text-[9px] text-right leading-relaxed"
                  style={{ color: "var(--muted)" }}
                >
                  {project.period.replace(" — ", "\n")}
                </span>
                <motion.span
                  className="text-lg"
                  style={{ color: "var(--fg)" }}
                  initial={{ opacity: 0, x: -8 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  ↗
                </motion.span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div
        className="flex justify-between pt-5 border-t"
        style={{ borderColor: "var(--border)" }}
      >
        <span className="text-[10px] tracking-[2px]" style={{ color: "var(--muted)" }}>
          02 / 06
        </span>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: 빌드 검증**

```bash
npm run build
```

Expected: 빌드 성공

- [ ] **Step 3: 커밋**

```bash
git add src/components/sections/FeaturedSection.tsx
git commit -m "feat: add FeaturedSection with stagger animation and accent bar"
```

---

## Task 8: ProjectsSection

**Files:**
- Create: `src/components/sections/ProjectsSection.tsx`

- [ ] **Step 1: ProjectsSection 작성**

```tsx
// src/components/sections/ProjectsSection.tsx
"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { projects } from "@/data/projects";

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="snap-section flex flex-col px-8 md:px-14 py-16 overflow-y-auto"
    >
      {/* Header */}
      <div className="mb-10">
        <span className="text-[9px] tracking-[4px] uppercase" style={{ color: "var(--muted)" }}>
          All Work
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px flex-1"
        style={{ background: "var(--border)" }}
      >
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            style={{ background: "var(--bg)" }}
          >
            <Link
              href={`/projects/${project.id}`}
              className="group flex flex-col h-full p-6 transition-colors duration-200"
              style={{ background: "var(--bg)" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--card-bg)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "var(--bg)")}
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-bold tracking-[1px]" style={{ color: "var(--muted)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ color: "var(--fg)" }}
                >
                  ↗
                </span>
              </div>
              <h3
                className="text-[13px] font-extrabold tracking-[-0.4px] leading-[1.2] mb-2 flex-1"
                style={{ color: "var(--fg)" }}
              >
                {project.title}
              </h3>
              {project.preview && (
                <p className="text-[10px] italic mb-4" style={{ color: "var(--sub)" }}>
                  "{project.preview}"
                </p>
              )}
              <div className="flex flex-wrap gap-1 mt-auto">
                {project.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-[8px] px-[6px] py-[2px] border rounded-[2px]"
                    style={{ color: "var(--sub)", borderColor: "var(--border)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-[9px] mt-3" style={{ color: "var(--muted)" }}>
                {project.period}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex justify-between pt-5 mt-4 border-t" style={{ borderColor: "var(--border)" }}>
        <span className="text-[10px] tracking-[2px]" style={{ color: "var(--muted)" }}>03 / 06</span>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: 빌드 검증**

```bash
npm run build
```

Expected: 빌드 성공

- [ ] **Step 3: 커밋**

```bash
git add src/components/sections/ProjectsSection.tsx
git commit -m "feat: add ProjectsSection with stagger fade-up grid"
```

---

## Task 9: StorySection

**Files:**
- Create: `src/components/sections/StorySection.tsx`

- [ ] **Step 1: StorySection 작성**

```tsx
// src/components/sections/StorySection.tsx
"use client";

import { motion } from "motion/react";
import { CountUp } from "@/components/ui/CountUp";

const STORY_BLOCKS = [
  {
    side: "left" as const,
    meta: "Education · 2019 — 2024",
    title: "컴퓨터공학을\n전공으로 선택한 이유",
    body: "중앙대학교 컴퓨터공학부를 졸업하고, 현재 미국 컴퓨터공학 석사 과정을 진행 중. 데이터를 다루는 일이 단순한 분석이 아니라 작동하는 시스템을 만드는 것임을 배움.",
    chips: ["중앙대학교 컴공", "B.S. CS", "M.S. 진행 중"],
    imagePlaceholder: "학교 사진",
  },
  {
    side: "right" as const,
    meta: "Experience · 2024 — 2025",
    title: "현장에서 직접\n발견한 문제",
    body: "배터리 전극 공정 현장에서 수작업으로 수일이 걸리던 데이터 분석을 30분으로 단축. 문제를 직접 발견하고 자동화 시스템으로 구조적으로 해결한 경험.",
    chips: ["Python", "데이터 자동화", "이진 탐색"],
    imagePlaceholder: "현장/작업 사진",
  },
];

const STATS = [
  { label: "Projects", target: 7, suffix: "" },
  { label: "Experience", target: 2, suffix: "yr" },
  { label: "Tech Stack", target: 20, suffix: "+" },
];

export function StorySection() {
  return (
    <section
      id="story"
      className="snap-section flex flex-col px-8 md:px-14 py-16 overflow-y-auto"
    >
      {/* Header */}
      <div className="flex justify-between items-baseline mb-10">
        <span className="text-[9px] tracking-[4px] uppercase" style={{ color: "var(--muted)" }}>
          Story
        </span>
        <span className="text-[9px] tracking-[2px]" style={{ color: "var(--muted)" }}>04 / 06</span>
      </div>

      {/* Tagline */}
      <motion.h2
        className="text-2xl md:text-4xl font-black tracking-[-1.5px] leading-[1.1] mb-12"
        style={{ color: "var(--fg)" }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Turning raw data into{" "}
        <span style={{ color: "var(--sub)" }}>systems that work.</span>
      </motion.h2>

      {/* Story blocks */}
      {STORY_BLOCKS.map((block, i) => (
        <motion.div
          key={i}
          className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12`}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Image */}
          <div
            className={`${block.side === "right" ? "md:order-2" : ""} aspect-[4/3] rounded-[2px] flex flex-col items-center justify-center gap-2 border`}
            style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}
          >
            <span style={{ fontSize: 32, opacity: 0.15 }}>📷</span>
            <span className="text-[9px] tracking-[2px] uppercase text-center px-4" style={{ color: "var(--muted)" }}>
              {block.imagePlaceholder}
            </span>
          </div>

          {/* Text */}
          <div className={block.side === "right" ? "md:order-1" : ""}>
            <p className="text-[8px] tracking-[3px] uppercase mb-3" style={{ color: "var(--muted)" }}>
              {block.meta}
            </p>
            <h3
              className="text-[16px] font-extrabold tracking-[-0.5px] leading-[1.2] mb-3 whitespace-pre-line"
              style={{ color: "var(--fg)" }}
            >
              {block.title}
            </h3>
            <p className="text-[11px] leading-[1.8] mb-4" style={{ color: "var(--sub)" }}>
              {block.body}
            </p>
            <div className="flex flex-wrap gap-1">
              {block.chips.map((chip) => (
                <span
                  key={chip}
                  className="text-[9px] px-2 py-1 border rounded-[2px]"
                  style={{ color: "var(--sub)", borderColor: "var(--border)" }}
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}

      {/* Stats */}
      <motion.div
        className="grid grid-cols-3 gap-8 pt-8 border-t mt-4"
        style={{ borderColor: "var(--border)" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {STATS.map((stat) => (
          <div key={stat.label}>
            <div
              className="font-black tracking-[-3px] leading-none"
              style={{ fontSize: "clamp(32px, 4vw, 52px)", color: "var(--fg)" }}
            >
              <CountUp target={stat.target} suffix={stat.suffix} />
            </div>
            <div className="text-[9px] tracking-[2px] uppercase mt-2" style={{ color: "var(--muted)" }}>
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: 빌드 검증**

```bash
npm run build
```

Expected: 빌드 성공

- [ ] **Step 3: 커밋**

```bash
git add src/components/sections/StorySection.tsx
git commit -m "feat: add StorySection with image blocks, fade-up, and CountUp stats"
```

---

## Task 10: SkillsSection

**Files:**
- Create: `src/components/sections/SkillsSection.tsx`

- [ ] **Step 1: SkillsSection 작성**

```tsx
// src/components/sections/SkillsSection.tsx
"use client";

import { motion } from "motion/react";
import { techStack } from "@/data/techStack";

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="snap-section flex flex-col px-8 md:px-14 py-16"
    >
      <div className="flex justify-between items-baseline mb-10">
        <span className="text-[9px] tracking-[4px] uppercase" style={{ color: "var(--muted)" }}>
          Skills
        </span>
        <span className="text-[9px] tracking-[2px]" style={{ color: "var(--muted)" }}>05 / 06</span>
      </div>

      <div className="flex flex-col gap-6 flex-1 justify-center">
        {techStack.map((category, ci) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: ci * 0.07 }}
          >
            <p className="text-[8px] tracking-[3px] uppercase mb-2" style={{ color: "var(--muted)" }}>
              {category.label}
            </p>
            <div className="flex flex-wrap gap-[6px]">
              {category.items.map((item) => (
                <span
                  key={item.name}
                  className="text-[10px] px-3 py-[5px] rounded-[2px] border font-medium transition-colors duration-150"
                  style={{
                    color: item.level === "primary" ? "var(--fg)" : "var(--sub)",
                    borderColor: item.level === "primary" ? "var(--muted)" : "var(--border)",
                    background: item.level === "primary" ? "var(--card-bg)" : "transparent",
                    opacity: item.level === "primary" ? 1 : 0.7,
                  }}
                >
                  {item.name}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: 빌드 검증**

```bash
npm run build
```

Expected: 빌드 성공

- [ ] **Step 3: 커밋**

```bash
git add src/components/sections/SkillsSection.tsx
git commit -m "feat: add SkillsSection with primary/secondary chip distinction"
```

---

## Task 11: ContactSection

**Files:**
- Create: `src/components/sections/ContactSection.tsx`

- [ ] **Step 1: ContactSection 작성**

```tsx
// src/components/sections/ContactSection.tsx
"use client";

import { motion } from "motion/react";
import { profile } from "@/data/profile";

const LINKS = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, arrow: "↗" },
  { label: "GitHub", value: "github.com/wonvom", href: profile.githubHref, arrow: "↗" },
  { label: "Resume", value: "Download PDF", href: profile.resumeHref, arrow: "↓" },
];

export function ContactSection() {
  return (
    <section
      id="contact"
      className="snap-section flex flex-col justify-between px-8 md:px-14 py-16"
    >
      <div className="flex justify-between items-baseline mb-16">
        <span className="text-[9px] tracking-[4px] uppercase" style={{ color: "var(--muted)" }}>
          Contact
        </span>
        <span className="text-[9px] tracking-[2px]" style={{ color: "var(--muted)" }}>06 / 06</span>
      </div>

      {/* Statement */}
      <motion.h2
        className="font-black tracking-[-1.5px] leading-[1.1] mb-16"
        style={{ fontSize: "clamp(28px, 4vw, 52px)", color: "var(--fg)" }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Let&apos;s build
        <br />
        something together.
      </motion.h2>

      {/* Links */}
      <div className="flex flex-col flex-1 justify-center">
        {LINKS.map((link, i) => (
          <motion.a
            key={link.label}
            href={link.href}
            target={link.label !== "Resume" ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="group flex justify-between items-center py-4 border-b transition-opacity duration-200 hover:opacity-60"
            style={{ borderColor: "var(--border)" }}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <span className="text-[9px] tracking-[2px] uppercase" style={{ color: "var(--muted)" }}>
              {link.label}
            </span>
            <span className="text-[11px] font-semibold" style={{ color: "var(--sub)" }}>
              {link.value}
            </span>
            <span className="text-sm" style={{ color: "var(--muted)" }}>
              {link.arrow}
            </span>
          </motion.a>
        ))}
      </div>

      {/* Footer */}
      <div className="pt-10 mt-auto">
        <p className="text-[9px] tracking-[2px]" style={{ color: "var(--muted)" }}>
          © 2025 Wonjong Kim. All rights reserved.
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: 빌드 검증**

```bash
npm run build
```

Expected: 빌드 성공

- [ ] **Step 3: 커밋**

```bash
git add src/components/sections/ContactSection.tsx
git commit -m "feat: add ContactSection with animated link rows"
```

---

## Task 12: page.tsx — 전체 조립 및 SectionDots 연결

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: page.tsx 전체 교체**

```tsx
// src/app/page.tsx
"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { SectionDots } from "@/components/ui/SectionDots";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturedSection } from "@/components/sections/FeaturedSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { StorySection } from "@/components/sections/StorySection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ContactSection } from "@/components/sections/ContactSection";

const SECTION_IDS = ["hero", "featured", "projects", "story", "skills", "contact"];

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);

  // Scroll to section by id
  const navigateTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Scroll to section by index (SectionDots)
  const handleDotClick = useCallback(
    (index: number) => navigateTo(SECTION_IDS[index]),
    [navigateTo]
  );

  // IntersectionObserver: track current section
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
        <FeaturedSection />
        <ProjectsSection />
        <StorySection />
        <SkillsSection />
        <ContactSection />
      </main>
    </>
  );
}
```

- [ ] **Step 2: 빌드 검증**

```bash
npm run build
```

Expected: 빌드 성공, 에러 없음

- [ ] **Step 3: 개발 서버에서 전체 확인**

```bash
npm run dev
```

확인 사항:
- `http://localhost:3000` 접속 시 Hero 섹션 표시
- 스크롤 시 섹션 snap 동작
- Navbar 섹션 클릭 시 해당 섹션으로 이동
- 사이드 도트 현재 섹션 표시
- 라이트/다크 토글 동작
- 모바일 뷰 (`< 768px`) 에서 햄버거 메뉴 표시

- [ ] **Step 4: lint 검증**

```bash
npm run lint
```

Expected: 에러 없음

- [ ] **Step 5: 최종 커밋 및 push**

```bash
git add src/app/page.tsx
git commit -m "feat: assemble full-page redesign with scroll-snap sections"
git push origin main
```

---

## 완료 후 체크리스트

- [ ] 실제 학교/현장 사진을 `public/` 에 추가하고 StorySection 이미지 플레이스홀더 교체
- [ ] `public/resume.pdf` 파일 존재 여부 확인
- [ ] `/projects/[id]` 상세 페이지 진입/복귀 동작 확인
- [ ] Vercel 배포 후 실제 환경 확인
