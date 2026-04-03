"use client";

import { motion } from "motion/react";

export function Intro() {
  return (
    <section className="py-16 border-t border-white/10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-2xl space-y-4"
      >
        <h2 className="text-2xl font-semibold text-white">About Me</h2>
        <p className="text-neutral-400 leading-relaxed">
          I&apos;m a frontend developer with a passion for building products
          that are both functional and delightful to use. I care deeply about
          code quality, user experience, and shipping things that matter.
        </p>
        <p className="text-neutral-400 leading-relaxed">
          When I&apos;m not coding, I enjoy reading about system design,
          contributing to open source, and exploring new tools in the JavaScript
          ecosystem.
        </p>
      </motion.div>
    </section>
  );
}
