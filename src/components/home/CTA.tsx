"use client";

import Link from "next/link";
import { motion } from "motion/react";

export function CTA() {
  return (
    <section className="py-16 border-t border-white/10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="space-y-4"
      >
        <h2 className="text-2xl font-semibold text-white">
          Let&apos;s work together.
        </h2>
        <p className="max-w-md text-neutral-400 leading-relaxed">
          I&apos;m currently open to full-time roles and freelance projects.
          Feel free to reach out — I&apos;d love to chat.
        </p>
        <div className="flex gap-4 pt-2">
          <a
            href="mailto:knowjo94@gmail.com"
            className="rounded-md bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-neutral-200"
          >
            Email Me
          </a>
          <Link
            href="/projects"
            className="rounded-md border border-white/20 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            View Projects
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
