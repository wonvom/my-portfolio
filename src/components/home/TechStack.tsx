"use client";

import { motion } from "motion/react";

type TechItem = {
  category: string;
  items: string[];
};

const techStack: TechItem[] = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "PostgreSQL", "Prisma"],
  },
  {
    category: "Tools",
    items: ["Git", "Vercel", "Figma", "VS Code"],
  },
];

export function TechStack() {
  return (
    <section className="py-16 border-t border-white/10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="space-y-8"
      >
        <h2 className="text-2xl font-semibold text-white">Tech Stack</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {techStack.map((group) => (
            <div key={group.category} className="space-y-3">
              <h3 className="text-xs font-medium tracking-widest text-neutral-500 uppercase">
                {group.category}
              </h3>
              <ul className="space-y-1.5">
                {group.items.map((item) => (
                  <li key={item} className="text-sm text-neutral-300">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
