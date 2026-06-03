# Portfolio Redesign — Design Spec

**Date:** 2026-06-03
**Status:** Approved

---

## 1. 콘셉트

에디토리얼 포트폴리오. 영화 오프닝 크레딧처럼 여백과 타이포로 승부하는 감각 있는 개발자 사이트.
채용담당자가 30초 안에 "어떤 사람인가"를 납득할 수 있도록 설계.

---

## 2. 디자인 방향

### 테마
- 라이트/다크 양쪽 모두 지원 (토글 전환)
- 두 모드 모두 에디토리얼 느낌 유지
- 다크: `#080808` 배경 / 라이트: `#f5f5f0` 배경

### 서체
- **Inter** (그로테스크 산세리프)
- 헤딩: `font-weight: 900`, `letter-spacing: -2~4px` (극단적 대비)
- 레이블: `font-size: 9px`, `letter-spacing: 4px`, `text-transform: uppercase`
- 본문: `font-size: 11~12px`, `line-height: 1.8`

### 레이아웃
- 풀스크린 섹션 스크롤 (`scroll-snap-type: y mandatory`)
- 각 섹션이 `100vh`를 채움
- 모바일 반응형 필수 (섹션 내부는 1열로 전환)

---

## 3. 페이지 구조

```
① HERO       — 이름 풀스크린, 중앙 정렬
② FEATURED   — 최근 프로젝트 매거진 리스트
③ PROJECTS   — 전체 프로젝트 그리드
④ STORY      — About (이미지 + 텍스트 교차 블록)
⑤ SKILLS     — 기술 스택 칩
⑥ CONTACT    — 링크 + 이메일 (Footer 겸)
```

---

## 4. 네비게이션

### Desktop (고정 상단 바)
```
[KIM WONJONG]   [Featured] [Projects] [Story] [Skills]   [Resume] [Contact]
```
- 좌: 로고 (`KIM WONJONG`), 클릭 시 Hero로 이동
- 중: 섹션 링크 (`font-size: 10px`, `letter-spacing: 1px`, uppercase)
- 우: `Resume` (PDF 다운로드), `Contact` (Contact 섹션 이동)
- 배경: `backdrop-filter: blur(8px)` + 반투명

### Mobile
- 우상단 햄버거 버튼
- 클릭 시 풀스크린 오버레이 메뉴

---

## 5. 섹션별 상세

### ① HERO
- 이름 `WONJONG KIM` 정중앙 (`font-size: clamp(64px, 8vw, 96px)`, `font-weight: 900`)
- 상단 eyebrow: `SOFTWARE ENGINEER · SEOUL` (작게)
- 하단 divider 선 + tagline: `Building things that feel right`
- 좌하단: 섹션 번호 `01 / 06`
- 우측: 사이드 도트 인디케이터 (현재 섹션 표시)
- 하단 중앙: `↓ SCROLL`

### ② FEATURED
- 섹션 제목: `Selected Work` (eyebrow) + `View All Projects →` (우측)
- 프로젝트 3개 (featured: true 데이터 사용)
- 레이아웃: 비대칭 2열 (`1fr 120px`)
  - 좌: `번호 + 제목 인라인` + preview 텍스트 + 태그 칩
  - 우: 기간 (두 줄) + `↗` 화살표
- hover: 좌측 세로 액센트 바 (`scaleY 0→1`), `↗` 슬라이드 인

### ③ PROJECTS
- 전체 프로젝트 그리드 (featured 포함 전체 7개)
- Desktop 3열 / Tablet 2열 / Mobile 1열
- 각 카드: 번호, 제목, 한 줄 preview, 태그, 기간
- hover: 카드 테두리 강조 + `↗` 노출
- 클릭 시 기존 `/projects/[id]` 상세 페이지로 이동 (기존 라우트 유지)

### ④ STORY
- 이미지 + 텍스트 교차 블록 (좌우 번갈아)
- 블록 1: 학교 사진 + 학력 소개
- 블록 2: 현장/작업 사진 + 경험 소개
- 하단: Education Timeline (기간 | 학교명 | 학위)
- Count Up 통계: Projects 7 / Experience 2yr / Tech 20+

### ⑤ SKILLS
- 카테고리별 그룹 (언어 / 데이터 / 웹 / 모바일 / AI / DB)
- `primary` 칩: 진하게 / `secondary` 칩: 흐리게 구분

### ⑥ CONTACT
- 대제목: `Let's build something together.`
- 링크 3개: Email / GitHub / Resume (각 행 구분선)
- Footer 겸 마지막 섹션

---

## 6. 애니메이션

| 섹션 | 애니메이션 | 방식 |
|---|---|---|
| Hero 이름 | Fade-in | `opacity 0→1`, `duration: 0.8s` |
| Featured 리스트 | Stagger | 아이템마다 `80ms` 딜레이, `translateX(-20px)→0` |
| Projects 카드 | Stagger Fade-up | 스크롤 진입 시 카드마다 `60ms` 딜레이 |
| Story 블록 | Fade-up | 스크롤 진입 시 `translateY(32px)→0` |
| Story 통계 | Count Up | 0에서 목표값까지 카운팅 |
| 모든 버튼 | Fill | hover 시 배경 왼→오 채워짐 (`scaleX 0→1`) |

- Framer Motion 사용 (`motion` 이미 설치됨)
- Smooth scroll: Lenis 도입 검토
- `scroll-snap` + Framer Motion `whileInView` 조합

---

## 7. 구현 전략

- **전면 재작성** (기존 컴포넌트 구조 참고하되 페이지/섹션 레이아웃 처음부터)
- 기존 `src/data/` 데이터 그대로 재활용 (`projects.ts`, `profile.ts`, `techStack.ts`)
- 기존 타입 정의 (`src/types/`) 유지
- `src/app/page.tsx` → 풀스크린 섹션 컨테이너로 교체

---

## 8. 파일 구조 변경

```
src/
  app/
    page.tsx                    # 풀스크린 섹션 컨테이너
    layout.tsx                  # 유지 (ThemeProvider 등)
  components/
    layout/
      Navbar.tsx                # 새로운 고정 네비바
      MobileMenu.tsx            # 모바일 햄버거 메뉴
    sections/
      HeroSection.tsx
      FeaturedSection.tsx
      ProjectsSection.tsx
      StorySection.tsx
      SkillsSection.tsx
      ContactSection.tsx
    ui/
      SectionDots.tsx           # 우측 사이드 도트
      AnimatedButton.tsx        # Fill 버튼
      CountUp.tsx               # 카운트업 컴포넌트
```

---

## 9. 미결 사항

- Story 섹션에 넣을 실제 이미지 (학교 사진, 현장 사진) 준비 필요
- Resume PDF 경로 확인 (`/resume.pdf`)
- Lenis smooth scroll 도입 여부 최종 결정
