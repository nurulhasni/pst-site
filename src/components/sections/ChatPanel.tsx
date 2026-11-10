"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Minus, RotateCcw, Send, X } from "lucide-react";
import { Icon } from "@/components/Icon";
import { useLanguage } from "@/components/LanguageProvider";
import { saveChatLead, sendChatMessage } from "@/app/chatActions";

const font = "font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif]";

const suggestionKeys = ["chat.q1", "chat.q2", "chat.q3", "chat.q4"];
const storageKey = "pst-chat";

type Message = { from: "visitor" | "assistant"; text: string };
// hidden: not offered yet · offered: form shown · dismissed: "Not now" · sent: details saved
type LeadStatus = "hidden" | "offered" | "dismissed" | "sent";
type Saved = { session: string; messages: Message[]; lead: LeadStatus; leadName: string };

const newSession = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;

const emptyChat = (): Saved => ({ session: newSession(), messages: [], lead: "hidden", leadName: "" });

// The conversation stays in this browser so it survives page changes and
// reloads. Storage can be blocked (private mode), so every access is guarded.
function loadChat(): Saved {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) ?? "null") as Saved | null;
    if (saved?.session && Array.isArray(saved.messages)) return saved;
  } catch {}
  return emptyChat();
}

type ChatPanelProps = {
  onClose: () => void;
};

export function ChatPanel({ onClose }: ChatPanelProps) {
  const { t, lang } = useLanguage();
  const [chat, setChat] = useState<Saved>(loadChat);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState("");
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(chat));
    } catch {}
  }, [chat]);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [chat.messages.length, chat.lead, sending]);

  async function send(text: string) {
    const message = text.trim();
    if (!message || sending) return;
    const history = chat.messages;
    setInput("");
    setNotice("");
    setSending(true);
    setChat((c) => ({ ...c, messages: [...c.messages, { from: "visitor", text: message }] }));

    try {
      const result = await sendChatMessage({ session: chat.session, message, history, lang, page: window.location.pathname });
      if (result.ok) {
        setChat((c) => ({
          ...c,
          messages: [...c.messages, { from: "assistant", text: result.reply }],
          lead: result.offerLead && c.lead === "hidden" ? "offered" : c.lead,
        }));
      } else {
        setNotice(t(result.error === "limit" ? "chat.limit" : "chat.error"));
      }
    } catch {
      setNotice(t("chat.error"));
    } finally {
      setSending(false);
    }
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    send(input);
  }

  function startOver() {
    setChat(emptyChat());
    setInput("");
    setNotice("");
  }

  const hasMessages = chat.messages.length > 0;

  return (
    <div
      role="dialog"
      aria-label={t("float.assistant")}
      className="fixed right-[32px] bottom-[104px] z-[50] w-[400px] max-w-[calc(100vw-32px)] h-[640px] max-h-[calc(100vh-136px)] flex flex-col overflow-hidden bg-[#FFFFFF] rounded-[16px] [box-shadow:0px_10px_30px_#00035433] max-sm:left-[16px] max-sm:right-[16px] max-sm:w-auto"
    >
      <div className="box-border w-full h-[72px] shrink-0 flex flex-row gap-[12px] p-[16px_16px_16px_20px] items-center [background-image:linear-gradient(90deg,_#08174A_0%,_#2B1C8F_100%)]">
        <div className="box-border w-[40px] h-[40px] shrink-0 flex items-center justify-center bg-[#A6CBD3] rounded-[999px]">
          <Icon id="sparkles-35d57f" className="box-border w-[20px] h-[20px]" />
        </div>
        <div className="box-border [flex:1_1_0] min-w-0 flex flex-col gap-[2px]">
          <div className={`text-[16px]/[22px] text-[#FFFFFF] ${font} font-medium`}>{t("float.assistant")}</div>
          <div className={`text-[12px]/[16px] text-[#FFFFFFB3] ${font}`}>{t("chat.online")}</div>
        </div>
        {hasMessages && (
          <button
            type="button"
            aria-label={t("chat.newChat")}
            title={t("chat.newChat")}
            onClick={startOver}
            disabled={sending}
            className="box-border w-[32px] h-[32px] shrink-0 flex items-center justify-center bg-[#FFFFFF14] hover:bg-[#FFFFFF26] rounded-[8px] disabled:opacity-50"
          >
            <RotateCcw size={15} className="text-[#FFFFFF]" />
          </button>
        )}
        <button
          type="button"
          aria-label={t("chat.minimize")}
          onClick={onClose}
          className="box-border w-[32px] h-[32px] shrink-0 flex items-center justify-center bg-[#FFFFFF14] hover:bg-[#FFFFFF26] rounded-[8px]"
        >
          <Minus size={16} className="text-[#FFFFFF]" />
        </button>
        <button
          type="button"
          aria-label={t("chat.close")}
          onClick={onClose}
          className="box-border w-[32px] h-[32px] shrink-0 flex items-center justify-center bg-[#FFFFFF14] hover:bg-[#FFFFFF26] rounded-[8px]"
        >
          <X size={16} className="text-[#FFFFFF]" />
        </button>
      </div>

      <div ref={scroller} className="box-border w-full [flex:1_1_0] min-h-0 flex flex-col gap-[12px] p-[16px] overflow-y-auto bg-[#F5F6F7]">
        <div className="box-border w-full flex flex-col gap-[10px] p-[4px_8px] items-center">
          <div
            role="img"
            aria-label={t("chat.logo")}
            className="box-border w-[48px] h-[48px] bg-[url('/images/pst/pst-logo.png')] bg-no-repeat bg-contain bg-center rounded-[999px] bg-[#FFFFFF]"
          />
          <div className={`text-[20px]/[27px] text-[#000000] text-center ${font} font-medium`}>{t("chat.hi")}</div>
          <div className={`text-[14px]/[21px] text-[#354A5F] text-center max-w-[300px] ${font}`}>{t("chat.desc")}</div>
          <div className={`text-[11px]/[15px] text-[#8396A8] text-center max-w-[300px] ${font}`}>{t("chat.privacy")}</div>
        </div>

        {!hasMessages && (
          <>
            <div className={`text-[11px]/[15px] text-[#8396A8] ${font} font-medium`}>{t("chat.suggested")}</div>
            <div className="box-border w-full flex flex-col gap-[8px]">
              {suggestionKeys.map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => send(t(key))}
                  className={`box-border w-full p-[10px_12px] flex items-center bg-[#FFFFFF] hover:bg-[#EAF3F5] rounded-[8px] text-left text-[14px]/[19px] text-[#223548] ${font} font-medium`}
                >
                  {t(key)}
                </button>
              ))}
            </div>
          </>
        )}

        {chat.messages.map((m, i) => (
          <div key={i} className={`box-border w-full flex ${m.from === "visitor" ? "justify-end" : "justify-start"}`}>
            <div
              className={`box-border max-w-[85%] p-[10px_14px] rounded-[14px] text-[14px]/[21px] ${font} [white-space:pre-wrap] [overflow-wrap:anywhere] ${
                m.from === "visitor" ? "bg-[#000354] text-[#FFFFFF] rounded-br-[4px]" : "bg-[#FFFFFF] text-[#223548] rounded-bl-[4px] [outline:1px_solid_#E5E8EB]"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}

        {sending && (
          <div className={`box-border w-fit p-[10px_14px] bg-[#FFFFFF] rounded-[14px] rounded-bl-[4px] text-[13px]/[18px] text-[#8396A8] ${font}`} aria-live="polite">
            {t("chat.typing")}
          </div>
        )}

        {chat.lead === "offered" && !sending && (
          <LeadForm
            session={chat.session}
            onSent={(name) => setChat((c) => ({ ...c, lead: "sent", leadName: name }))}
            onDismiss={() => setChat((c) => ({ ...c, lead: "dismissed" }))}
          />
        )}

        {chat.lead === "sent" && (
          <div className={`box-border w-full p-[10px_14px] bg-[#E8F5EC] text-[#1E6B3A] rounded-[10px] text-[13px]/[19px] ${font}`}>
            {t("chat.leadThanks").replace("{name}", chat.leadName.split(" ")[0])}
          </div>
        )}

        {notice && (
          <div role="alert" className={`box-border w-full p-[10px_14px] bg-[#FDECEC] text-[#9B1C1C] rounded-[10px] text-[13px]/[19px] ${font}`}>
            {notice}
          </div>
        )}

        <div className="box-border w-full flex flex-row flex-wrap gap-[6px] pt-[6px] items-center justify-center">
          <span className={`text-[13px]/[18px] text-[#8396A8] ${font}`}>{t("chat.prefer")}</span>
          <a
            href="https://wa.me/62818653218"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex flex-row gap-[6px] items-center text-[13px]/[18px] text-[#2F6E80] hover:text-[#000354] ${font} font-medium`}
          >
            <Icon id="whatsapp-logo-7d2550" fill="#1DA851" className="box-border w-[16px] h-[16px] shrink-0" />
            {t("chat.whatsapp")}
          </a>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="box-border w-full shrink-0 flex flex-col gap-[8px] p-[12px_16px] bg-[#FFFFFF]">
        <div className="box-border w-full flex flex-row gap-[8px] items-center">
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={t("chat.placeholder")}
            maxLength={1000}
            aria-label={t("chat.placeholder")}
            className={`box-border [flex:1_1_0] min-w-0 h-[44px] px-[14px] bg-[#F5F6F7] [outline:1px_solid_#D5DADD] [outline-offset:-0.5px] rounded-[999px] text-[14px] text-[#000000] ${font} placeholder:text-[#A9B4BE] outline-none focus:[outline:2px_solid_#2F6E80] focus:[outline-offset:-1px]`}
          />
          <button
            type="submit"
            aria-label={t("chat.send")}
            disabled={sending || !input.trim()}
            className="box-border w-[44px] h-[44px] shrink-0 flex items-center justify-center bg-[#000354] hover:bg-[#0B1470] rounded-[999px] disabled:opacity-40 disabled:hover:bg-[#000354]"
          >
            <Send size={18} className="text-[#FFFFFF]" />
          </button>
        </div>
        <p className={`text-[11px]/[15px] text-[#8396A8] ${font}`}>{t("chat.disclaimer")}</p>
      </form>
    </div>
  );
}

const leadField = `box-border w-full h-[40px] px-[12px] bg-[#FFFFFF] [outline:1px_solid_#D5DADD] [outline-offset:-0.5px] rounded-[8px] text-[14px] text-[#000000] ${font} placeholder:text-[#A9B4BE] outline-none focus:[outline:2px_solid_#2F6E80] focus:[outline-offset:-1px]`;

function LeadForm({ session, onSent, onDismiss }: { session: string; onSent: (name: string) => void; onDismiss: () => void }) {
  const { t, lang } = useLanguage();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const contact = String(form.get("contact") ?? "").trim();
    if (!name || !contact) return setError(t("chat.leadMissing"));

    setSaving(true);
    setError("");
    try {
      const result = await saveChatLead({
        session,
        name,
        contact,
        company: String(form.get("company") ?? ""),
        lang,
        page: window.location.pathname,
      });
      if (result.ok) onSent(name);
      else setError(t(result.error === "contact" ? "chat.leadInvalid" : result.error === "missing" ? "chat.leadMissing" : "chat.error"));
    } catch {
      setError(t("chat.error"));
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="box-border w-full flex flex-col gap-[8px] p-[14px] bg-[#FFFFFF] rounded-[12px] [outline:1px_solid_#A6CBD3] [outline-offset:-0.5px]">
      <div className={`text-[14px]/[19px] text-[#000354] ${font} font-medium`}>{t("chat.leadTitle")}</div>
      <div className={`text-[12px]/[17px] text-[#475E75] ${font}`}>{t("chat.leadDesc")}</div>
      <input name="name" autoComplete="name" placeholder={t("chat.leadName")} aria-label={t("chat.leadName")} maxLength={120} className={leadField} />
      <input name="contact" autoComplete="email" placeholder={t("chat.leadContact")} aria-label={t("chat.leadContact")} maxLength={160} className={leadField} />
      <input name="company" autoComplete="organization" placeholder={t("chat.leadCompany")} aria-label={t("chat.leadCompany")} maxLength={160} className={leadField} />
      {error && <div role="alert" className={`text-[12px]/[17px] text-[#9B1C1C] ${font}`}>{error}</div>}
      <div className="box-border w-full flex flex-row gap-[8px] items-center justify-end pt-[2px]">
        <button type="button" onClick={onDismiss} className={`h-[36px] px-[12px] rounded-[8px] text-[13px] text-[#475E75] hover:bg-[#F5F6F7] ${font} font-medium`}>
          {t("chat.leadLater")}
        </button>
        <button
          type="submit"
          disabled={saving}
          className={`h-[36px] px-[14px] rounded-[8px] bg-[#000354] hover:bg-[#0B1470] text-[13px] text-[#FFFFFF] ${font} font-medium disabled:opacity-60`}
        >
          {saving ? t("chat.leadSending") : t("chat.leadSend")}
        </button>
      </div>
    </form>
  );
}
