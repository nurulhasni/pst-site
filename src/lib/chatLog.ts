import { appendFile, mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import { getAccessToken } from "@/lib/sheets";

// Every chat message and every contact left in the chat becomes one row.
// With Google configured the rows go to the "Chat Log" tab of the site's Sheet,
// so PST can read and filter them there too. Without it (local dev, the Render
// demo) they go to a file in .data/, which is enough for a demo but is wiped
// whenever the host redeploys.

export const chatTab = "Chat Log";
const columns = ["time", "session", "type", "message", "name", "contact", "company", "lang", "page"] as const;

export type ChatRowType = "visitor" | "assistant" | "lead";

export type ChatRow = {
  time: string;
  session: string;
  type: ChatRowType;
  message: string;
  name: string;
  contact: string;
  company: string;
  lang: string;
  page: string;
};

export type ChatSession = {
  id: string;
  started: string;
  lastActivity: string;
  lang: string;
  page: string;
  messages: { time: string; from: "visitor" | "assistant"; text: string }[];
  lead: { time: string; name: string; contact: string; company: string } | null;
};

const sheetsConfigured = () =>
  Boolean(process.env.GOOGLE_SHEET_ID && process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_PRIVATE_KEY);

const localFile = () => path.join(/*turbopackIgnore: true*/ process.cwd(), ".data", "chat-log.jsonl");

// --- Google Sheets -----------------------------------------------------------

const sheetsUrl = (suffix: string) =>
  `https://sheets.googleapis.com/v4/spreadsheets/${process.env.GOOGLE_SHEET_ID}${suffix}`;

async function sheetsFetch(suffix: string, init: RequestInit = {}): Promise<Response> {
  const token = await getAccessToken();
  return fetch(sheetsUrl(suffix), {
    ...init,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", ...init.headers },
    cache: "no-store",
  });
}

async function createChatTab(): Promise<void> {
  const res = await sheetsFetch(":batchUpdate", {
    method: "POST",
    body: JSON.stringify({ requests: [{ addSheet: { properties: { title: chatTab } } }] }),
  });
  // Another request may have just created it; that's fine
  if (!res.ok && !(await res.text()).includes("already exists")) throw new Error("Could not create the Chat Log tab");
  await appendToSheet([[...columns]]);
}

async function appendToSheet(values: string[][]): Promise<Response> {
  return sheetsFetch(`/values/${encodeURIComponent(chatTab)}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`, {
    method: "POST",
    body: JSON.stringify({ values }),
  });
}

async function readSheet(): Promise<ChatRow[]> {
  const res = await sheetsFetch(`/values/${encodeURIComponent(chatTab)}`);
  if (res.status === 400) return []; // the tab doesn't exist yet: no chats so far
  if (!res.ok) throw new Error("Could not read the Chat Log tab");
  const { values = [] } = (await res.json()) as { values?: string[][] };
  const [header = [], ...rows] = values;
  const keys = header.map((h) => h.trim().toLowerCase());
  return rows.map((row) => Object.fromEntries(keys.map((k, i) => [k, row[i] ?? ""])) as ChatRow);
}

// --- Public API --------------------------------------------------------------

export async function saveChatRows(rows: ChatRow[]): Promise<void> {
  if (!rows.length) return;

  if (sheetsConfigured()) {
    const values = rows.map((r) => columns.map((c) => r[c]));
    let res = await appendToSheet(values);
    if (res.status === 400) {
      await createChatTab();
      res = await appendToSheet(values);
    }
    if (!res.ok) throw new Error("Could not save the chat to Google Sheets");
    return;
  }

  await mkdir(path.dirname(localFile()), { recursive: true });
  await appendFile(localFile(), rows.map((r) => JSON.stringify(r)).join("\n") + "\n", "utf8");
}

async function readChatRows(): Promise<ChatRow[]> {
  if (sheetsConfigured()) return readSheet();
  try {
    const text = await readFile(localFile(), "utf8");
    return text
      .split("\n")
      .filter(Boolean)
      .flatMap((line) => {
        try {
          return [JSON.parse(line) as ChatRow];
        } catch {
          return [];
        }
      });
  } catch {
    return [];
  }
}

// Groups the rows into conversations, newest activity first
export async function getChatSessions(): Promise<ChatSession[]> {
  const rows = await readChatRows();
  const sessions = new Map<string, ChatSession>();

  for (const row of rows) {
    if (!row.session) continue;
    let s = sessions.get(row.session);
    if (!s) {
      s = { id: row.session, started: row.time, lastActivity: row.time, lang: row.lang, page: row.page, messages: [], lead: null };
      sessions.set(row.session, s);
    }
    if (row.time > s.lastActivity) s.lastActivity = row.time;
    if (row.time < s.started) s.started = row.time;
    if (row.type === "lead") {
      s.lead = { time: row.time, name: row.name, contact: row.contact, company: row.company };
    } else if (row.type === "visitor" || row.type === "assistant") {
      s.messages.push({ time: row.time, from: row.type, text: row.message });
    }
  }

  return [...sessions.values()].sort((a, b) => b.lastActivity.localeCompare(a.lastActivity));
}

export function countActiveSince(sessions: ChatSession[], days: number): number {
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
  return sessions.filter((s) => s.lastActivity >= since).length;
}

export function chatStorageLabel(): string {
  return sheetsConfigured() ? `Google Sheet, tab “${chatTab}”` : "Local file on the server (.data/chat-log.jsonl) — cleared on every redeploy";
}
