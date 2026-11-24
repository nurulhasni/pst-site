"use server";

import { headers } from "next/headers";
import { getChatReply, type ChatTurn, type Lang } from "@/lib/chatAssistant";
import { recordActivity } from "@/lib/activityLog";
import { saveChatRows, type ChatRow } from "@/lib/chatLog";

const sessionPattern = /^[A-Za-z0-9-]{8,64}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^\+?[0-9][0-9\s-]{7,18}$/;
const maxMessage = 1000;
const maxHistory = 20;

// A small in-memory limit so one visitor or script can't flood the log or the
// AI server. It resets when the server restarts, which is fine at this traffic.
const hits = new Map<string, number[]>();
function overLimit(key: string, max: number, windowMs = 60 * 60 * 1000): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > max;
}

async function clientIp(): Promise<string> {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0].trim() || h.get("x-real-ip") || "unknown";
}

const clean = (value: unknown, max: number) => String(value ?? "").trim().slice(0, max);
const toLang = (value: unknown): Lang => (value === "id" ? "id" : "en");

function row(base: Pick<ChatRow, "session" | "lang" | "page">, fields: Partial<ChatRow> & Pick<ChatRow, "type">): ChatRow {
  return { time: new Date().toISOString(), message: "", name: "", contact: "", company: "", ...base, ...fields };
}

export type SendResult = { ok: true; reply: string; offerLead: boolean } | { ok: false; error: "invalid" | "limit" };

export async function sendChatMessage(input: {
  session: string;
  message: string;
  history: ChatTurn[];
  lang: string;
  page: string;
}): Promise<SendResult> {
  const session = clean(input.session, 64);
  const message = clean(input.message, maxMessage);
  if (!sessionPattern.test(session) || !message) return { ok: false, error: "invalid" };
  if (overLimit(`s:${session}`, 40) || overLimit(`ip:${await clientIp()}`, 80)) return { ok: false, error: "limit" };

  const lang = toLang(input.lang);
  const base = { session, lang, page: clean(input.page, 200) };
  const history: ChatTurn[] = (Array.isArray(input.history) ? input.history : [])
    .slice(-maxHistory)
    .filter((t) => t && (t.from === "visitor" || t.from === "assistant"))
    .map((t) => ({ from: t.from, text: clean(t.text, 2000) }));

  const reply = await getChatReply([...history, { from: "visitor", text: message }], lang);

  try {
    await saveChatRows([row(base, { type: "visitor", message }), row(base, { type: "assistant", message: reply.text })]);
  } catch (error) {
    // The visitor still gets an answer if the log is unavailable
    console.error("[chat] could not save messages:", error);
  }
  return { ok: true, reply: reply.text, offerLead: reply.offerLead };
}

export type LeadResult = { ok: true } | { ok: false; error: "missing" | "contact" | "limit" | "server" };

export async function saveChatLead(input: {
  session: string;
  name: string;
  contact: string;
  company: string;
  lang: string;
  page: string;
}): Promise<LeadResult> {
  const session = clean(input.session, 64);
  const name = clean(input.name, 120);
  const contact = clean(input.contact, 160);
  const company = clean(input.company, 160);
  if (!sessionPattern.test(session) || !name || !contact) return { ok: false, error: "missing" };
  if (!emailPattern.test(contact) && !phonePattern.test(contact)) return { ok: false, error: "contact" };
  if (overLimit(`lead:${session}`, 5)) return { ok: false, error: "limit" };

  try {
    await saveChatRows([row({ session, lang: toLang(input.lang), page: clean(input.page, 200) }, { type: "lead", name, contact, company })]);
    await recordActivity({
      type: "chat_lead",
      page: clean(input.page, 200),
      lang: toLang(input.lang),
      name,
      email: emailPattern.test(contact) ? contact : "",
      phone: emailPattern.test(contact) ? "" : contact,
      company,
      detail: "PST Assistant",
    });
    return { ok: true };
  } catch (error) {
    console.error("[chat] could not save lead:", error);
    return { ok: false, error: "server" };
  }
}
