"use client";

import { motion } from "motion/react";
import { contactLinks } from "@/data/contact";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="snap-section flex flex-col justify-between px-8 md:px-14 py-16"
    >
      <div className="flex justify-between items-baseline mb-16">
        <span className="text-xs tracking-[4px] uppercase" style={{ color: "var(--muted)" }}>
          Contact
        </span>
        <span className="text-xs tracking-[2px]" style={{ color: "var(--muted)" }}>04 / 04</span>
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
        {contactLinks.map((link, i) => (
          <motion.a
            key={link.label}
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
            className="group flex justify-between items-center py-4 border-b transition-opacity duration-200 hover:opacity-60"
            style={{ borderColor: "var(--border)" }}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <span className="text-xs tracking-[2px] uppercase" style={{ color: "var(--muted)" }}>
              {link.label}
            </span>
            <span className="text-sm font-semibold" style={{ color: "var(--sub)" }}>
              {link.value}
            </span>
            <span className="text-sm" aria-hidden="true" style={{ color: "var(--muted)" }}>
              {link.arrow}
            </span>
          </motion.a>
        ))}
      </div>

      {/* Footer */}
      <div className="pt-10 mt-auto">
        <p className="text-xs tracking-[2px]" style={{ color: "var(--muted)" }}>
          © {new Date().getFullYear()} Wonjong Kim. All rights reserved.
        </p>
      </div>
    </section>
  );
}
