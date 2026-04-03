export type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  href?: string;
  githubHref?: string;
  featured: boolean;
};
