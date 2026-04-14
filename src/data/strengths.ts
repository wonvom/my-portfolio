export type Strength = {
  id: string;
  symbol: string;
  title: string;
  description: string;
  linkedProjects: string[];
};

export const strengths: Strength[] = [
  {
    id: "problem-solving",
    symbol: "◈",
    title: "문제 정의 및 해결",
    description:
      "수작업 로그 추출 비효율을 Python 자동화로, 분산 항공 데이터를 BigQuery 통합 구조로 해결. 문제를 구조적으로 정의하고 실행 가능한 솔루션으로 연결함.",
    linkedProjects: ["battery-automation", "aviation-bigquery", "hash-decryption"],
  },
  {
    id: "data-decision",
    symbol: "◎",
    title: "데이터 기반 의사결정",
    description:
      "수천 개 두께 로그를 전처리/분석/시각화해 현장 의사결정 속도를 높이고, ADS-B/FAA/항로 데이터를 통합해 운영 효율 분석 기반을 구축함.",
    linkedProjects: ["battery-automation", "aviation-bigquery"],
  },
  {
    id: "collaboration",
    symbol: "◇",
    title: "협업 및 커뮤니케이션",
    description:
      "체코 브르노 공과대 팀원과 국제 공동 프로젝트 수행, 동아리 회장으로 멘토링 프로그램 운영, 미국 현장 다국적 엔지니어팀과 실무 협업.",
    linkedProjects: ["dcgan-generation"],
  },
  {
    id: "execution",
    symbol: "◆",
    title: "실행 및 검증",
    description:
      "자동화 프로그램을 구현하고 작업 시간을 수일 → 30분으로 단축해 성과를 검증. epoch 변화에 따른 생성 결과를 비교하며 모델 성능을 조정.",
    linkedProjects: ["battery-automation", "dcgan-generation"],
  },
  {
    id: "user-centric",
    symbol: "◉",
    title: "고객 중심 사고",
    description:
      "웹/Android/iOS 3채널의 일관된 사용자 흐름을 설계하고, 캠퍼스 사용자의 위치 파악 불편을 AR 기반 길찾기 기능으로 해결함.",
    linkedProjects: ["homeshopping-fullstack", "ar-campus-navigation"],
  },
];
