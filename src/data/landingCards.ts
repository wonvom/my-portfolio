import type { LandingCard } from "@/types/landing";

export const landingCards: LandingCard[] = [
  {
    id: "portfolio",
    label: "Portfolio",
    description: "Works & Projects",
    href: "/portfolio",
  },
  {
    id: "blog",
    label: "Blog",
    description: "Thoughts & Notes",
    href: "/blog",
  },
  {
    id: "gallery",
    label: "Gallery",
    description: "Photos & Visuals",
    href: "/gallery",
  },
  {
    id: "github",
    label: "GitHub",
    description: "Open Source",
    href: "https://github.com/wonvom",
    external: true,
  },
];
