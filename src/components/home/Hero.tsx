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
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium text-neutral-400 bg-white/[0.05] border border-white/[0.08]">
            Frontend Developer
          </span>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-[1.12]">
            I build web<br />
            <span className="text-neutral-400">experiences</span><br />
            that ship.
          </h1>

          {/* Sub */}
          <p className="text-neutral-400 leading-relaxed max-w-sm">
            Clean architecture, accessible interfaces, and performance that
            users actually feel.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 pt-1">
            <Link
              href="#projects"
              className="
                px-5 py-2.5 rounded-xl text-sm font-medium
                bg-white text-black
                hover:bg-neutral-200 transition-colors
              "
            >
              Explore Work
            </Link>
            <a
              href="mailto:knowjo94@gmail.com"
              className="
                px-5 py-2.5 rounded-xl text-sm font-medium
                bg-white/[0.06] text-white border border-white/[0.1]
                hover:bg-white/[0.1] transition-colors
              "
            >
              Get in Touch
            </a>
          </div>
        </motion.div>

        {/* Right — achievement card */}
        <HeroAchievementCard />
      </div>
    </section>
  );
}
