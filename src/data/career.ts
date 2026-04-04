export type CareerItem = {
  id: string;
  period: string;
  role: string;
  org: string;
  description: string;
};

export const careerItems: CareerItem[] = [
  {
    id: "current",
    period: "2024 — Present",
    role: "Frontend Developer",
    org: "Company Name",
    description: "Building production-grade web applications with Next.js and TypeScript.",
  },
  {
    id: "prev",
    period: "2023 — 2024",
    role: "Junior Developer",
    org: "Company Name",
    description: "Developed internal tools and automated key business workflows.",
  },
  {
    id: "edu",
    period: "2019 — 2023",
    role: "B.S. Computer Science",
    org: "University Name",
    description: "Focused on software engineering, algorithms, and web systems.",
  },
];
