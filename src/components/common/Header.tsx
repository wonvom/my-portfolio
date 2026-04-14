"use client";

import Link from "next/link";
import { navItems } from "@/data/navigation";
import { Container } from "./Container";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/[0.08] dark:border-white/10 bg-white/90 dark:bg-black/80 backdrop-blur-sm">
      <Container>
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="text-sm font-semibold tracking-tight text-neutral-900 dark:text-white">
            Wonjong Kim
          </Link>
          <nav className="flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-neutral-500 dark:text-neutral-400 transition-colors hover:text-neutral-900 dark:hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </Container>
    </header>
  );
}
