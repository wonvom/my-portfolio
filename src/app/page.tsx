"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { LanguageSelect } from "@/components/landing/LanguageSelect";
import { LandingGrid } from "@/components/landing/LandingGrid";
import { ExpansionOverlay } from "@/components/landing/ExpansionOverlay";
import type { Language } from "@/types/landing";

type Step = "language" | "cards";

type Expanding = {
  rect: DOMRect;
  href: string;
};

const subtitle: Record<Language, string> = {
  ko: "섹션을 선택하세요",
  en: "Select a destination",
};

const LANG_KEY = "portfolio_lang";

export default function LandingPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("language");
  const [lang, setLang] = useState<Language>("en");
  const [expanding, setExpanding] = useState<Expanding | null>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem(LANG_KEY) as Language | null;
    if (saved === "ko" || saved === "en") {
      setLang(saved);
      setStep("cards");
    }
  }, []);

  function handleLanguageSelect(selected: Language) {
    sessionStorage.setItem(LANG_KEY, selected);
    setLang(selected);
    setStep("cards");
  }

  function handleExpand(rect: DOMRect, href: string) {
    setExpanding({ rect, href });
  }

  function handleExpansionComplete() {
    if (expanding) {
      router.push(expanding.href);
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7] dark:bg-[#07070f] flex flex-col items-center justify-center relative overflow-hidden px-4 py-16 transition-colors duration-300">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_55%_at_50%_50%,rgba(80,90,200,0.05),transparent_70%)]" />

      <AnimatePresence mode="wait">
        {step === "language" ? (
          <motion.div
            key="language"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            <LanguageSelect onSelect={handleLanguageSelect} />
          </motion.div>
        ) : (
          <motion.div
            key="cards"
            className="flex flex-col items-center gap-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <div className="text-center space-y-1.5">
              <p className="text-neutral-400 dark:text-neutral-600 text-xs tracking-[0.3em] uppercase">
                Wonjong Kim
              </p>
              <p className="text-neutral-500 dark:text-neutral-600 text-sm tracking-wide">
                {subtitle[lang]}
              </p>
            </div>
            <LandingGrid lang={lang} onExpand={handleExpand} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expansion overlay */}
      {expanding && (
        <ExpansionOverlay
          rect={expanding.rect}
          onComplete={handleExpansionComplete}
        />
      )}
    </div>
  );
}
