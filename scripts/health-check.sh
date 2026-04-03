#!/bin/bash
# scripts/health-check.sh
# 프로젝트 빌드 & 린트 검사 후 텔레그램 알림

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
cd "$PROJECT_DIR"

TIMESTAMP=$(date '+%Y-%m-%d %H:%M')
ERRORS=""

# 1. TypeScript 빌드 체크
echo "🔍 빌드 체크 중..."
BUILD_OUTPUT=$(npm run build 2>&1)
BUILD_EXIT=$?

if [ $BUILD_EXIT -ne 0 ]; then
  ERRORS="${ERRORS}❌ 빌드 실패\n"
fi

# 2. 린트 체크
echo "🔍 린트 체크 중..."
LINT_OUTPUT=$(npm run lint 2>&1)
LINT_EXIT=$?

if [ $LINT_EXIT -ne 0 ]; then
  ERRORS="${ERRORS}❌ 린트 에러 발견\n"
fi

# 3. 결과 전송
if [ -z "$ERRORS" ]; then
  ./scripts/notify-telegram.sh "✅ [$TIMESTAMP] 포트폴리오 상태 정상
- 빌드: 통과
- 린트: 통과"
else
  ./scripts/notify-telegram.sh "🚨 [$TIMESTAMP] 포트폴리오 이슈 발견
${ERRORS}
상세 로그는 터미널에서 확인하세요."
fi
