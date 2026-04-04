export type TechItem = {
  name: string;
  level?: "primary" | "secondary";
};

export type TechCategory = {
  id: string;
  label: string;
  items: TechItem[];
};

export const techStack: TechCategory[] = [
  {
    id: "languages",
    label: "언어",
    items: [
      { name: "Python", level: "primary" },
      { name: "Java", level: "primary" },
      { name: "SQL", level: "primary" },
      { name: "Swift", level: "secondary" },
    ],
  },
  {
    id: "web-backend",
    label: "웹 / 백엔드",
    items: [
      { name: "Spring", level: "primary" },
      { name: "REST API", level: "primary" },
      { name: "JSP", level: "secondary" },
      { name: "HTML/CSS", level: "secondary" },
      { name: "JavaScript", level: "secondary" },
    ],
  },
  {
    id: "mobile",
    label: "모바일 / 앱",
    items: [
      { name: "Android", level: "primary" },
      { name: "iOS", level: "secondary" },
      { name: "Android Studio", level: "secondary" },
      { name: "Unity", level: "secondary" },
    ],
  },
  {
    id: "data-cloud",
    label: "데이터 / 클라우드",
    items: [
      { name: "BigQuery", level: "primary" },
      { name: "AWS", level: "secondary" },
      { name: "데이터 크롤링", level: "primary" },
      { name: "데이터 전처리", level: "primary" },
      { name: "데이터 시각화", level: "primary" },
      { name: "pandas", level: "secondary" },
      { name: "matplotlib", level: "secondary" },
    ],
  },
  {
    id: "ai-ml",
    label: "AI / ML",
    items: [
      { name: "PyTorch", level: "primary" },
      { name: "DCGAN", level: "secondary" },
    ],
  },
  {
    id: "db",
    label: "DB",
    items: [
      { name: "Oracle", level: "primary" },
      { name: "MySQL", level: "primary" },
      { name: "MSSQL", level: "secondary" },
    ],
  },
  {
    id: "tools",
    label: "협업 / 기타",
    items: [
      { name: "Git", level: "primary" },
      { name: "Jira", level: "secondary" },
      { name: "Slack", level: "secondary" },
    ],
  },
];
