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
