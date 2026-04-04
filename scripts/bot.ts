import { Bot } from "grammy";
import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_DIR = dirname(__dirname);

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const ALLOWED_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

if (!BOT_TOKEN) throw new Error("TELEGRAM_BOT_TOKEN이 설정되지 않았습니다.");

const bot = new Bot(BOT_TOKEN);

function getLogPath(date: string): string {
  return join(PROJECT_DIR, "logs", `${date}.md`);
}

function formatDate(offset = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toISOString().slice(0, 10);
}

function readLog(date: string): string {
  const path = getLogPath(date);
  if (!existsSync(path)) return `📭 ${date} 로그가 없습니다.`;
  const content = readFileSync(path, "utf-8").trim();
  return content || `📭 ${date} 로그가 비어 있습니다.`;
}

// 허용된 채팅만 처리
bot.use(async (ctx, next) => {
  if (ALLOWED_CHAT_ID && String(ctx.chat?.id) !== ALLOWED_CHAT_ID) return;
  await next();
});

bot.command("start", (ctx) =>
  ctx.reply(
    "안녕하세요! 포트폴리오 로그 봇입니다.\n\n" +
    "사용 가능한 명령어:\n" +
    "• 오늘 로그\n" +
    "• 어제 로그\n" +
    "• /help"
  )
);

bot.command("help", (ctx) =>
  ctx.reply(
    "📋 *사용 가능한 명령어*\n\n" +
    "• `오늘 로그` — 오늘 작업 내역\n" +
    "• `어제 로그` — 어제 작업 내역\n" +
    "• `YYYY-MM-DD 로그` — 특정 날짜 로그",
    { parse_mode: "Markdown" }
  )
);

// 텍스트 메시지 처리
bot.on("message:text", async (ctx) => {
  const text = ctx.message.text.trim();

  if (text === "오늘 로그" || text === "오늘로그") {
    const date = formatDate(0);
    await ctx.reply(readLog(date), { parse_mode: "Markdown" });
    return;
  }

  if (text === "어제 로그" || text === "어제로그") {
    const date = formatDate(-1);
    await ctx.reply(readLog(date), { parse_mode: "Markdown" });
    return;
  }

  // "YYYY-MM-DD 로그" 형식
  const match = text.match(/^(\d{4}-\d{2}-\d{2})\s*로그$/);
  if (match) {
    await ctx.reply(readLog(match[1]), { parse_mode: "Markdown" });
    return;
  }
});

bot.start();
console.log("🤖 텔레그램 봇 실행 중...");
