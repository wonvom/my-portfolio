#!/bin/bash
# scripts/log.sh
# 오늘 로그 파일에 항목을 추가합니다.
# 사용법: ./scripts/log.sh "## 섹션 제목" "- 작업 내용 1" "- 작업 내용 2"

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
TODAY=$(date '+%Y-%m-%d')
LOG_FILE="$PROJECT_DIR/logs/${TODAY}.md"

# 파일이 없으면 헤더 생성
if [ ! -f "$LOG_FILE" ]; then
  echo "# ${TODAY}" > "$LOG_FILE"
  echo "" >> "$LOG_FILE"
fi

# 인자로 받은 줄들을 순서대로 추가
for line in "$@"; do
  echo "$line" >> "$LOG_FILE"
done
echo "" >> "$LOG_FILE"

echo "✅ 로그 추가됨: $LOG_FILE"
