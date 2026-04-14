export type CodeSnippet = {
  language: string;
  filename?: string;
  code: string;
};

export type Project = {
  id: string;
  title: string;
  period?: string;
  role?: string;
  problem: string;
  solution?: string;
  result: string;
  outcome?: string;
  learned?: string;
  tags: string[];
  relatedRoles?: string[];
  href?: string;
  githubHref?: string;
  featured: boolean;
  imageUrl?: string;
  imageAlt?: string;
  imageGallery?: string[];
  codeSnippet?: CodeSnippet;
  codeSnippets?: CodeSnippet[];
  diagram?: string;
  preview?: string;
};
