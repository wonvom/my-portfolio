export type Strength = {
  id: string;
  symbol: string;
  title: string;
  description: string;
};

export const strengths: Strength[] = [
  {
    id: "frontend",
    symbol: "◈",
    title: "UI Engineering",
    description:
      "Building pixel-precise, accessible interfaces with React and Next.js. Performance and UX are non-negotiable.",
  },
  {
    id: "fullstack",
    symbol: "◎",
    title: "Full-Stack Thinking",
    description:
      "From API design to database schema, I own features end-to-end — reducing handoff friction and shipping faster.",
  },
  {
    id: "systems",
    symbol: "◇",
    title: "Developer Experience",
    description:
      "Automation, tooling, and clean architecture. I optimise the systems around the product, not just the product itself.",
  },
];
