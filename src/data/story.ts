export type StoryBlock = {
  side: "left" | "right";
  meta: string;
  title: string;
  body: string;
  chips: string[];
  imagePlaceholder: string;
};

export type Stat = {
  label: string;
  target: number;
  suffix: string;
};

export const storyBlocks: StoryBlock[] = [
  {
    side: "left",
    meta: "Education / 2019 — 2024",
    title: "컴퓨터공학을\n전공으로 선택한 이유",
    body: "중앙대학교 컴퓨터공학부를 졸업하고, 현재 미국 컴퓨터공학 석사 과정을 진행 중. 데이터를 다루는 일이 단순한 분석이 아니라 작동하는 시스템을 만드는 것임을 배움.",
    chips: ["중앙대학교 컴공", "B.S. CS", "M.S. 진행 중"],
    imagePlaceholder: "학교 사진",
  },
  {
    side: "right",
    meta: "Experience / 2024 — 2025",
    title: "현장에서 직접\n발견한 문제",
    body: "배터리 전극 공정 현장에서 수작업으로 수일이 걸리던 데이터 분석을 30분으로 단축. 문제를 직접 발견하고 자동화 시스템으로 구조적으로 해결한 경험.",
    chips: ["Python", "데이터 자동화", "이진 탐색"],
    imagePlaceholder: "현장/작업 사진",
  },
];

export const stats: Stat[] = [
  { label: "Projects", target: 7, suffix: "" },
  { label: "Experience", target: 2, suffix: "yr" },
  { label: "Tech Stack", target: 20, suffix: "+" },
];
