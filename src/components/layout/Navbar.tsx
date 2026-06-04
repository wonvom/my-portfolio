"use client";

import { useState } from "react";
import { useTheme } from "@/providers/ThemeProvider";
import { MobileMenu } from "./MobileMenu";

const NAV_SECTIONS = [
  { label: "Featured", id: "featured" },
  { label: "Projects", id: "projects" },
  { label: "Story", id: "story" },
  { label: "Skills", id: "skills" },
];

type Props = {
  onNavigate: (id: string) => void;
};

export function Navbar({ onNavigate }: Props) {
  const { toggle } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-[100] h-12 px-6 flex items-center justify-between border-b"
        style={{
          background: "color-mix(in srgb, var(--bg) 80%, transparent)",
          borderColor: "var(--border)",
          backdropFilter: "blur(8px)",
        }}
      >
        {/* Logo */}
        <button
          onClick={() => onNavigate("hero")}
          className="text-sm font-black tracking-[-0.5px]"
          style={{ color: "var(--fg)" }}
        >
          KIM WONJONG
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-6">
          {NAV_SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => onNavigate(s.id)}
              className="text-xs tracking-[1px] uppercase transition-colors duration-200"
              style={{ color: "var(--sub)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--fg)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--sub)")}
            >
              {s.label}
            </button>
          ))}
        </nav>

        {/* Right: Resume + Contact + Theme */}
        <div className="hidden md:flex gap-4 items-center">
          <a
            href="/resume.pdf"
            download
            className="text-xs tracking-[1px] uppercase transition-colors duration-200"
            style={{ color: "var(--sub)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--fg)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--sub)")}
          >
            Resume
          </a>
          <button
            onClick={() => onNavigate("contact")}
            className="text-xs tracking-[1px] uppercase transition-colors duration-200"
            style={{ color: "var(--sub)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--fg)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--sub)")}
          >
            Contact
          </button>
          <button
            onClick={toggle}
            className="text-xs tracking-[1px] uppercase transition-colors duration-200"
            style={{ color: "var(--muted)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--sub)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
            aria-label="테마 전환"
          >
            ◐
          </button>
        </div>

        {/* Mobile: hamburger */}
        <button
          className="md:hidden text-xs tracking-[2px] uppercase"
          style={{ color: "var(--sub)" }}
          onClick={() => setMenuOpen(true)}
        >
          Menu
        </button>
      </header>

      <MobileMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        sections={[...NAV_SECTIONS, { label: "Contact", id: "contact" }]}
        onNavigate={onNavigate}
      />
    </>
  );
}
