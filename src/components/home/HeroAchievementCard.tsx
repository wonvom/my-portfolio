"use client";

import { motion } from "motion/react";

const stats = [
  { value: "7+", label: "Projects" },
  { value: "2yr+", label: "Industry Exp." },
];

const stack = ["Python", "BigQuery", "Spring", "PyTorch", "SQL"];

export function HeroAchievementCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      className="
        relative rounded-2xl overflow-hidden
        bg-white/[0.055] backdrop-blur-2xl
        border border-white/[0.1]
        shadow-[0_8px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)]
        p-6 space-y-5
      "
    >
      {/* Top edge gleam */}
      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Status badge */}
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span className="text-xs text-emerald-400 tracking-wide font-medium">
          Open to Full-time
        </span>
      </div>

      {/* Headline stat */}
      <div className="space-y-1">
        <p className="text-[10px] text-neutral-600 tracking-widest uppercase">
          핵심 성과
        </p>
        <p className="text-sm text-white font-medium leading-snug">
          수작업 데이터 분석 리드타임{" "}
          <span className="text-emerald-400">수일 → 30분</span>으로 단축
        </p>
        <p className="text-xs text-neutral-500">배터리 전극 두께 데이터 자동화 @Ultium Cells</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-3">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-xl bg-white/[0.04] border border-white/[0.07] px-4 py-3"
          >
            <p className="text-2xl font-bold text-white tracking-tight">{s.value}</p>
            <p className="text-xs text-neutral-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="h-px bg-white/[0.06]" />

      {/* Stack tags */}
      <div>
        <p className="text-[10px] text-neutral-600 tracking-widest uppercase mb-2.5">
          Core Stack
        </p>
        <div className="flex flex-wrap gap-1.5">
          {stack.map((item) => (
            <span
              key={item}
              className="px-2.5 py-1 rounded-full text-xs text-neutral-300 bg-white/[0.06] border border-white/[0.08]"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Subtle inner glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-16 bg-blue-500/5 blur-2xl rounded-full pointer-events-none" />
    </motion.div>
  );
}
