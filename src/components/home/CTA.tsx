"use client";

import { motion } from "motion/react";

const actions = [
  { label: "Download Resume", href: "/resume.pdf", external: true, primary: true },
  { label: "GitHub", href: "https://github.com/wonvom", external: true, primary: false },
  { label: "Send Email", href: "mailto:knowjo94@gmail.com", external: false, primary: false },
];

export function CTA() {
  return (
    <section className="py-20 border-t border-white/[0.06]">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="
          relative rounded-2xl px-8 py-10 text-center space-y-6
          bg-white/[0.04] backdrop-blur-xl
          border border-white/[0.08]
          overflow-hidden
        "
      >
        {/* Subtle glow */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute inset-x-1/4 bottom-0 h-20 bg-blue-500/5 blur-3xl rounded-full pointer-events-none" />

        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-white">Let&apos;s work together.</h2>
          <p className="text-neutral-500 text-sm max-w-sm mx-auto leading-relaxed">
            Open to full-time roles and selected freelance projects.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          {actions.map(({ label, href, external, primary }) => (
            <a
              key={label}
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className={
                primary
                  ? "px-5 py-2.5 rounded-xl text-sm font-medium bg-white text-black hover:bg-neutral-200 transition-colors"
                  : "px-5 py-2.5 rounded-xl text-sm font-medium bg-white/[0.06] text-white border border-white/[0.1] hover:bg-white/[0.1] transition-colors"
              }
            >
              {label}
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
