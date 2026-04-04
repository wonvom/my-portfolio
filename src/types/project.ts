export type CodeSnippet = {
  language: string;
  filename?: string;
  code: string;
};

export type Project = {
  id: string;
  title: string;
  problem: string;
  result: string;
  tags: string[];
  href?: string;
  githubHref?: string;
  featured: boolean;
  imageUrl?: string;
  imageAlt?: string;
  codeSnippet?: CodeSnippet;
};
