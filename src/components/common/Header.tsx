"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/providers/ThemeProvider";
import { navItems } from "@/data/navigation";

export function Header() {
  const { toggle } = useTheme();
  const pathname = usePathname();

  return (
    <header
      className="fixed top-0 left-0 right-0 z-[100] h-12 px-6 flex items-center justify-between border-b"
      style={{
        background: "color-mix(in srgb, var(--bg) 85%, transparent)",
        borderColor: "var(--border)",
        backdropFilter: "blur(8px)",
      }}
    >
      <Link
        href="/"
        className="text-sm font-black tracking-[-0.5px]"
        style={{ color: "var(--fg)" }}
      >
        KIM WONJONG
      </Link>

      <nav className="flex items-center gap-6">
        {navItems.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs tracking-[1px] uppercase transition-colors duration-200"
              style={{ color: active ? "var(--fg)" : "var(--sub)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--fg)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = active ? "var(--fg)" : "var(--sub)")}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

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
    </header>
  );
}
