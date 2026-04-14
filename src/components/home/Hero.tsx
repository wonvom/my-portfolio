"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { HeroAchievementCard } from "./HeroAchievementCard";

export function Hero() {
  return (
    <section className="py-24 sm:py-28">
      <div className="grid lg:grid-cols-2 gap-14 lg:gap-10 items-center">
        {/* Left — text */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          {/* Badge */}
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium text-neutral-500 dark:text-neutral-400 bg-black/[0.04] dark:bg-white/[0.05] border border-black/[0.08] dark:border-white/[0.08]">
            Data Engineer / SW Developer
          </span>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white leading-[1.12]">
            데이터를 기록이<br />
            아니라{" "}
            <span className="text-neutral-500 dark:text-neutral-400">작동하는</span>
            <br />
            시스템으로.
          </h1>

          {/* Sub */}
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-sm">
            제조 현장 데이터 자동화부터 클라우드 기반 데이터 통합까지 —
            현장의 병목을 파이프라인으로 해결합니다.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 pt-1">
            <Link
              href="#projects"
              className="
                px-5 py-2.5 rounded-xl text-sm font-medium
                bg-neutral-900 dark:bg-white text-white dark:text-black
                hover:bg-neutral-700 dark:hover:bg-neutral-200 transition-colors
              "
            >
              프로젝트 보기
            </Link>
            <a
              href="mailto:knowjo94@gmail.com"
              className="
                px-5 py-2.5 rounded-xl text-sm font-medium
                bg-black/[0.05] dark:bg-white/[0.06] text-neutral-900 dark:text-white
                border border-black/[0.1] dark:border-white/[0.1]
                hover:bg-black/[0.09] dark:hover:bg-white/[0.1] transition-colors
              "
            >
              연락하기
            </a>
          </div>
        </motion.div>

        {/* Right — achievement card */}
        <HeroAchievementCard />
      </div>
    </section>
  );
}
