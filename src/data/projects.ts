import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "project-alpha",
    title: "Project Alpha",
    description:
      "A full-stack web application for managing tasks and collaborating with teams in real time.",
    tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    href: "#",
    githubHref: "#",
    featured: true,
  },
  {
    id: "project-beta",
    title: "Project Beta",
    description:
      "An e-commerce storefront built with performance and accessibility in mind.",
    tags: ["React", "Tailwind CSS", "Stripe", "Vercel"],
    href: "#",
    githubHref: "#",
    featured: true,
  },
  {
    id: "project-gamma",
    title: "Project Gamma",
    description:
      "A CLI tool that automates repetitive dev workflows and generates boilerplate code.",
    tags: ["Node.js", "TypeScript", "Inquirer"],
    githubHref: "#",
    featured: true,
  },
  {
    id: "project-delta",
    title: "Project Delta",
    description:
      "A dashboard for visualizing real-time analytics data with customizable chart widgets.",
    tags: ["React", "Recharts", "REST API"],
    href: "#",
    githubHref: "#",
    featured: false,
  },
  {
    id: "project-epsilon",
    title: "Project Epsilon",
    description:
      "A Markdown-based note-taking app with tag filtering and local storage persistence.",
    tags: ["TypeScript", "Vite", "Tailwind CSS"],
    githubHref: "#",
    featured: false,
  },
];
