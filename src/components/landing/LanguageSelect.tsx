"use client";

import { motion } from "motion/react";
import type { Language } from "@/types/landing";

type LanguageSelectProps = {
  onSelect: (lang: Language) => void;
};

const options: { lang: Language; label: string }[] = [
  { lang: "ko", label: "한국어" },
  { lang: "en", label: "English" },
];

export function LanguageSelect({ onSelect }: LanguageSelectProps) {
  return (
    <div className="flex flex-col items-center gap-10">
      <motion.div
        className="text-center space-y-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <p className="text-neutral-600 text-xs tracking-[0.3em] uppercase">
          Wonjong Kim
        </p>
        <p className="text-white text-lg font-light tracking-wide">
          언어를 선택해주세요
        </p>
        <p className="text-neutral-600 text-sm tracking-wide">
          Choose your language
        </p>
      </motion.div>

      <motion.div
        className="flex gap-4"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
      >
        {options.map(({ lang, label }) => (
          <motion.button
            key={lang}
            onClick={() => onSelect(lang)}
            className="
              w-36 h-14 rounded-2xl
              bg-white/[0.06] backdrop-blur-xl
              border border-white/[0.11]
              text-white font-medium tracking-wide text-sm
              shadow-[0_4px_20px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]
              relative overflow-hidden
            "
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {/* Top edge gleam */}
            <span className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <span className="relative">{label}</span>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}
