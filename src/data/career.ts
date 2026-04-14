export type CareerItem = {
  id: string;
  period: string;
  role: string;
  org: string;
  description: string;
};

export const careerItems: CareerItem[] = [
  {
    id: "ultium",
    period: "2024 — 2026",
    role: "Data Automation Intern",
    org: "Ultium Cells LLC",
    description:
      "배터리 전극 두께 로그 데이터 자동화 파이프라인 개발. 수작업 분석을 30분 내로 단축.",
  },
  {
    id: "research",
    period: "2019 — 2020",
    role: "Research Assistant",
    org: "Data Science Lab / Saltlux",
    description:
      "산업 데이터 크롤링/시각화/가공 업무 수행. Saltlux 빅데이터 산학협력 프로젝트 참여.",
  },
  {
    id: "education",
    period: "2019 — 2024",
    role: "B.S. Computer Science",
    org: "Chung-Ang University",
    description:
      "컴퓨터공학 전공. AR 앱/DCGAN/홈쇼핑 풀스택 등 다양한 프로젝트 수행.",
  },
];
