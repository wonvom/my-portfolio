# Project: Developer Portfolio

Next.js App Router 기반 취업용 개발자 포트폴리오.
추후 개발 블로그·코딩테스트 아카이브·사진 갤러리로 확장 예정.

## Tech Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Motion (framer-motion)
- Vercel 배포

## Commands

- `npm run dev`: 개발 서버 (port 3000)
- `npm run build`: 프로덕션 빌드
- `npm run lint`: ESLint 검사

빌드 에러 발생 시 스스로 수정을 시도할 것. 3회 실패하면 보고.

## Architecture

src/app — App Router 페이지 & 레이아웃
src/components/common — Header, Footer, Container, Button
src/components/home — Hero, Intro, FeaturedProjects, TechStack, CTA
src/components/projects — ProjectCard, ProjectGrid
src/data — 정적 데이터 (navigation.ts, projects.ts)
src/content — MDX 콘텐츠 (추후 블로그용, 아직 미구현)
src/lib — 유틸리티 함수
src/types — 타입 정의

## Code Rules

- 컴포넌트는 역할별 분리. 한 파일 200줄 이하.
- 타입은 src/types/에 분리. any 금지.
- 더미 데이터는 src/data/로 분리. 컴포넌트 내 하드코딩 금지.
- named export 사용. default export는 page.tsx에만.

## Design

- 다크 테마 기반, 텍스트 가독성 최우선.
- 채용 담당자가 보기 편한 깔끔한 톤.
- Motion 애니메이션은 은은하게만. 과한 gradient/파티클 금지.
- 모바일 반응형 필수. GSAP 사용 금지.

## Workflow

1. 코드 작성 전 변경/생성 파일 목록 먼저 제시.
2. 요청 범위에 대해서만 작업.
3. 작업 후 npm run build로 검증.
4. 에러 발생 시 스스로 디버깅. 3회 시도 후 실패하면 보고.
5. 기존 파일 수정 시 기존 구조 유지.
6. 작업 완료 후 반드시 git commit 및 git push를 수행할 것.
7. 응답 마지막에 아래 형식으로 커밋 로그를 요약해서 표시할 것:

```
[Git] <commit hash> <commit message>
pushed to <branch>
```

## Do Not Touch

blog, coding-test, gallery 영역은 폴더 구조만 고려. 아직 구현하지 말 것.
