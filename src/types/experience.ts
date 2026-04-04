export type ExperienceItem = {
  id: string;
  period: string;
  role: string;
  org: string;
  type: "work" | "research" | "club" | "activity" | "volunteer";
  summary: string;
  keywords: string[];
};
