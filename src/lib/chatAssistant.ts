// Answers for the website chat. When CHAT_AI_URL points at an OpenAI-compatible
// server (vLLM, Ollama, LM Studio… — PST plans to run Qwen on its own server),
// questions go there. Until then, or if that server is down, the visitor gets
// a polite note and the chat offers its contact form.
//
// .env:
//   CHAT_AI_URL=http://ai-server:8000/v1   base URL, without /chat/completions
//   CHAT_AI_MODEL=qwen2.5-7b-instruct
//   CHAT_AI_KEY=                           only if the server asks for one

export type Lang = "en" | "id";
export type ChatTurn = { from: "visitor" | "assistant"; text: string };
export type ChatReply = { text: string; offerLead: boolean; fromAi: boolean };

const systemPrompt = `You are PST Assistant, the website assistant of PT Prima Sistem Terpadu (PST), an SAP consulting and implementation partner in Indonesia.
- Answer questions about PST, its SAP services (implementation, RISE with SAP, S/4HANA migration, support), careers at PST and how to contact PST.
- Keep answers short: two to four sentences, plain text, no markdown tables.
- Reply in the visitor's language (Indonesian or English).
- Never quote prices, timelines or contract terms. For quotes, demos or project details, say a PST consultant will follow up and invite the visitor to leave their contact details in the chat.
- If you don't know something about PST, say so and suggest contacting the team. Don't make up facts, client names or numbers.
- Politely decline questions unrelated to PST, SAP or ERP.
Contact: marketing@pst.co.id · WhatsApp +62 818-653-218 · Office hours Monday–Friday 08.00–17.00 WIB.`;

// Questions that suggest the visitor is ready to talk to someone
const leadSignals =
  /\b(harga|biaya|tarif|price|pricing|cost|quote|quotation|penawaran|proposal|demo|meeting|rapat|konsultasi|consult|hubungi|contact|telepon|call me|implement\w*|proyek|project)\b/i;

const fallback: Record<Lang, string> = {
  en: "Thanks for your question! Our AI assistant is still being set up, so a PST consultant will answer you personally. Leave your contact details below and our team will get back to you.",
  id: "Terima kasih atas pertanyaannya! Asisten AI kami masih dalam tahap persiapan, jadi konsultan PST akan menjawab Anda secara langsung. Silakan tinggalkan kontak Anda di bawah, tim kami akan segera menghubungi Anda.",
};

export async function getChatReply(history: ChatTurn[], lang: Lang): Promise<ChatReply> {
  const url = process.env.CHAT_AI_URL?.replace(/\/+$/, "");
  const lastQuestion = history.at(-1)?.text ?? "";
  if (!url) return { text: fallback[lang], offerLead: true, fromAi: false };

  try {
    const res = await fetch(`${url}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.CHAT_AI_KEY ? { Authorization: `Bearer ${process.env.CHAT_AI_KEY}` } : {}),
      },
      body: JSON.stringify({
        model: process.env.CHAT_AI_MODEL || "qwen",
        temperature: 0.3,
        max_tokens: 400,
        messages: [
          { role: "system", content: systemPrompt },
          ...history.map((t) => ({ role: t.from === "visitor" ? "user" : "assistant", content: t.text })),
        ],
      }),
      signal: AbortSignal.timeout(30_000),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`AI server answered ${res.status}`);
    const data = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    const text = data.choices?.[0]?.message?.content?.trim();
    if (!text) throw new Error("AI server sent an empty answer");
    return { text, offerLead: leadSignals.test(lastQuestion), fromAi: true };
  } catch (error) {
    console.error("[chat] AI request failed:", error);
    return { text: fallback[lang], offerLead: true, fromAi: false };
  }
}
