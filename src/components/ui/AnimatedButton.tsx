"use client";

import { motion } from "motion/react";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "fill" | "ghost";
  className?: string;
};

export function AnimatedButton({ children, onClick, href, variant = "fill", className = "" }: Props) {
  const base =
    "relative inline-flex items-center gap-2 px-8 py-4 text-[10px] tracking-[2px] uppercase overflow-hidden border transition-colors duration-200 rounded-[2px] cursor-pointer";

  const fillStyle = "border-[var(--border)] text-[var(--fg)]";
  const ghostStyle = "border-[var(--border)] text-[var(--sub)] hover:text-[var(--fg)] hover:border-[var(--muted)]";

  const inner = (
    <motion.span
      className={`${base} ${variant === "fill" ? fillStyle : ghostStyle} ${className}`}
      onClick={onClick}
      whileHover={variant === "fill" ? "hover" : undefined}
    >
      {variant === "fill" && (
        <motion.span
          className="absolute inset-0 bg-[var(--fg)] z-0"
          style={{ originX: 0 }}
          variants={{
            hover: { scaleX: 1 },
          }}
          initial={{ scaleX: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
      )}
      <span className="relative z-10 mix-blend-difference">{children}</span>
    </motion.span>
  );

  if (href) {
    return <a href={href}>{inner}</a>;
  }
  return inner;
}
