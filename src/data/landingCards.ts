import type { LandingCard } from "@/types/landing";

export const landingCards: LandingCard[] = [
  {
    id: "portfolio",
    label: "Portfolio",
    description: { ko: "작업물 & 프로젝트", en: "Works & Projects" },
    href: "/portfolio",
  },
  {
    id: "blog",
    label: "Blog",
    description: { ko: "기록 & 생각", en: "Thoughts & Notes" },
    href: "/blog",
  },
  {
    id: "gallery",
    label: "Gallery",
    description: { ko: "사진 & 비주얼", en: "Photos & Visuals" },
    href: "/gallery",
  },
  {
    id: "github",
    label: "GitHub",
    description: { ko: "오픈소스", en: "Open Source" },
    href: "https://github.com/wonvom",
    external: true,
  },
];
