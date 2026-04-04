import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "project-alpha",
    title: "Project Alpha",
    problem: "Teams struggled to track tasks across distributed workflows in real time.",
    result: "Reduced handoff time by 40% with live collaboration features.",
    tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    href: "#",
    githubHref: "#",
    featured: true,
    imageUrl: undefined, // replace with: "/images/projects/alpha.png"
    imageAlt: "Project Alpha dashboard screenshot",
    codeSnippet: {
      language: "typescript",
      filename: "api/tasks/route.ts",
      code: `export async function GET(req: Request) {
  const session = await getServerSession();
  const tasks = await prisma.task.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    take: 10,
  });
  return Response.json({ tasks });
}`,
    },
  },
  {
    id: "project-beta",
    title: "Project Beta",
    problem: "Merchants needed a storefront that converts on mobile without sacrificing performance.",
    result: "Achieved 95+ Lighthouse score with sub-2s load time.",
    tags: ["React", "Tailwind CSS", "Stripe", "Vercel"],
    href: "#",
    githubHref: "#",
    featured: true,
    imageUrl: undefined,
    imageAlt: "Project Beta storefront screenshot",
    codeSnippet: {
      language: "typescript",
      filename: "checkout/page.tsx",
      code: `const session = await stripe.checkout.sessions.create({
  line_items: cart.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: { name: item.name },
      unit_amount: item.price,
    },
    quantity: item.qty,
  })),
  mode: "payment",
});`,
    },
  },
  {
    id: "project-gamma",
    title: "Project Gamma",
    problem: "Repetitive CLI setup was eating hours of developer onboarding time.",
    result: "Cut project bootstrap from 30 min to under 2 min.",
    tags: ["Node.js", "TypeScript", "Inquirer"],
    githubHref: "#",
    featured: true,
    imageUrl: undefined,
    imageAlt: "Project Gamma CLI interface",
    codeSnippet: {
      language: "typescript",
      filename: "src/generate.ts",
      code: `const answers = await inquirer.prompt([
  { type: "input",   name: "name",      message: "Project name:" },
  { type: "list",    name: "template",  choices: TEMPLATES },
  { type: "confirm", name: "git",       message: "Init git?" },
]);
await scaffold(answers);
console.log(\`✓ Created \${answers.name}\`);`,
    },
  },
  {
    id: "project-delta",
    title: "Project Delta",
    problem: "Analytics data was scattered across services with no unified view.",
    result: "Consolidated 5 data sources into a single real-time dashboard.",
    tags: ["React", "Recharts", "REST API"],
    href: "#",
    githubHref: "#",
    featured: false,
    imageUrl: undefined,
    imageAlt: "Project Delta analytics dashboard",
  },
  {
    id: "project-epsilon",
    title: "Project Epsilon",
    problem: "Local note-taking apps lacked tag-based filtering and fast search.",
    result: "Built offline-first with instant search across 1000+ notes.",
    tags: ["TypeScript", "Vite", "Tailwind CSS"],
    githubHref: "#",
    featured: false,
    imageUrl: undefined,
    imageAlt: "Project Epsilon note editor",
  },
];
