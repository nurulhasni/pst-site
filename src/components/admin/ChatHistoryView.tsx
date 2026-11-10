"use client";

import { useMemo, useState } from "react";
import { Building2, Contact, Database, Globe, MessagesSquare, Search, UserRound } from "lucide-react";
import type { ChatSession } from "@/lib/chatLog";

const font = "font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif]";
const card = "box-border bg-[#FFFFFF] [outline:1px_solid_#D5DADD] [outline-offset:-0.5px] rounded-[12px]";

type Filter = "all" | "leads";

const when = (iso: string, withDate = true) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const opts: Intl.DateTimeFormatOptions = withDate
    ? { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Jakarta" }
    : { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Jakarta" };
  return `${new Intl.DateTimeFormat("en-GB", opts).format(d)} WIB`;
};

const firstQuestion = (s: ChatSession) => s.messages.find((m) => m.from === "visitor")?.text ?? "(no message)";

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className={`${card} [flex:1_1_0] min-w-[140px] p-[16px_20px] flex flex-col gap-[4px]`}>
      <div className={`text-[13px]/[17px] text-[#475E75] ${font}`}>{label}</div>
      <div className={`text-[28px]/[34px] text-[#000000] ${font} font-medium`}>{value}</div>
    </div>
  );
}

export function ChatHistoryView({ sessions, activeThisWeek, storage }: { sessions: ChatSession[]; activeThisWeek: number; storage: string }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(sessions[0]?.id ?? "");

  const leads = sessions.filter((s) => s.lead).length;

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sessions.filter((s) => {
      if (filter === "leads" && !s.lead) return false;
      if (!q) return true;
      const haystack = [...s.messages.map((m) => m.text), s.lead?.name, s.lead?.contact, s.lead?.company].join(" ").toLowerCase();
      return haystack.includes(q);
    });
  }, [sessions, filter, query]);

  const selected = visible.find((s) => s.id === selectedId) ?? visible[0];

  return (
    <div className="box-border w-full flex flex-col gap-[24px] p-[32px] max-lg:p-[20px]">
      <div className="box-border w-full flex flex-row flex-wrap gap-[16px]">
        <Stat label="Conversations" value={sessions.length} />
        <Stat label="Leads (left contact details)" value={leads} />
        <Stat label="Active in the last 7 days" value={activeThisWeek} />
      </div>

      <div className={`flex flex-row gap-[8px] items-center text-[12px]/[16px] text-[#475E75] ${font}`}>
        <Database size={14} className="shrink-0" />
        <span>Stored in: {storage}</span>
      </div>

      {sessions.length === 0 ? (
        <div className={`${card} w-full p-[48px_24px] flex flex-col gap-[10px] items-center text-center`}>
          <MessagesSquare size={32} className="text-[#A6CBD3]" />
          <div className={`text-[16px]/[22px] text-[#000000] ${font} font-medium`}>No chats yet</div>
          <div className={`text-[14px]/[20px] text-[#475E75] max-w-[420px] ${font}`}>
            Conversations from the PST Assistant on the website will appear here as soon as a visitor sends a message.
          </div>
        </div>
      ) : (
        <div className="box-border w-full flex flex-row gap-[20px] items-start max-lg:flex-col">
          <div className={`${card} w-[380px] shrink-0 max-lg:w-full flex flex-col overflow-hidden`}>
            <div className="box-border w-full flex flex-col gap-[12px] p-[16px] [border-bottom:1px_solid_#E5E8EB]">
              <label className="box-border w-full h-[40px] flex flex-row gap-[8px] px-[12px] items-center bg-[#F5F6F7] rounded-[8px] focus-within:[outline:2px_solid_#2F6E80]">
                <Search size={16} className="text-[#475E75] shrink-0" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search messages, names, companies"
                  className={`[flex:1_1_0] min-w-0 bg-transparent outline-none text-[14px] text-[#223548] ${font} placeholder:text-[#8396A8]`}
                />
              </label>
              <div className="flex flex-row gap-[6px]">
                {(["all", "leads"] as const).map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFilter(f)}
                    className={`h-[32px] px-[12px] rounded-[999px] text-[13px] ${font} font-medium ${
                      filter === f ? "bg-[#000354] text-[#FFFFFF]" : "bg-[#F5F6F7] text-[#354A5F] hover:bg-[#EAF3F5]"
                    }`}
                  >
                    {f === "all" ? `All (${sessions.length})` : `Leads (${leads})`}
                  </button>
                ))}
              </div>
            </div>

            <ul className="box-border w-full max-h-[640px] overflow-y-auto">
              {visible.length === 0 && <li className={`p-[20px] text-[14px] text-[#475E75] ${font}`}>No conversations match.</li>}
              {visible.map((s) => {
                const active = s.id === selected?.id;
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedId(s.id)}
                      aria-current={active ? "true" : undefined}
                      className={`box-border w-full flex flex-col gap-[6px] p-[14px_16px] text-left [border-bottom:1px_solid_#EEF0F2] ${active ? "bg-[#EAF3F5]" : "hover:bg-[#F5F6F7]"}`}
                    >
                      <div className="w-full flex flex-row gap-[8px] items-center">
                        <span className={`[flex:1_1_0] min-w-0 truncate text-[14px]/[19px] text-[#000000] ${font} font-medium`}>
                          {s.lead?.name || "Anonymous visitor"}
                        </span>
                        {s.lead && <span className={`shrink-0 p-[2px_8px] rounded-[999px] bg-[#E8F5EC] text-[#1E6B3A] text-[11px]/[14px] ${font} font-medium`}>Lead</span>}
                      </div>
                      <div className={`w-full text-[13px]/[18px] text-[#354A5F] ${font} line-clamp-2`}>{firstQuestion(s)}</div>
                      <div className={`text-[12px]/[16px] text-[#8396A8] ${font}`}>
                        {when(s.lastActivity)} · {(() => { const n = s.messages.filter((m) => m.from === "visitor").length; return `${n} ${n === 1 ? "question" : "questions"}`; })()}
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {selected && (
            <div className={`${card} [flex:1_1_0] min-w-0 max-lg:w-full flex flex-col overflow-hidden`}>
              <div className="box-border w-full flex flex-col gap-[10px] p-[20px] [border-bottom:1px_solid_#E5E8EB]">
                <div className={`text-[17px]/[22px] text-[#000000] ${font} font-medium`}>{selected.lead?.name || "Anonymous visitor"}</div>
                <div className={`flex flex-row flex-wrap gap-x-[16px] gap-y-[6px] text-[13px]/[18px] text-[#475E75] ${font}`}>
                  <span>Started {when(selected.started)}</span>
                  <span className="flex flex-row gap-[4px] items-center">
                    <Globe size={13} /> {selected.lang === "id" ? "Indonesian" : "English"} · {selected.page || "/"}
                  </span>
                </div>
                {selected.lead && (
                  <div className="box-border w-full flex flex-row flex-wrap gap-[16px] p-[12px_14px] bg-[#E8F5EC] rounded-[8px]">
                    <span className={`flex flex-row gap-[6px] items-center text-[13px] text-[#1E6B3A] ${font} font-medium`}>
                      <UserRound size={14} /> {selected.lead.name}
                    </span>
                    <span className={`flex flex-row gap-[6px] items-center text-[13px] text-[#1E6B3A] ${font} font-medium`}>
                      <Contact size={14} /> {selected.lead.contact}
                    </span>
                    {selected.lead.company && (
                      <span className={`flex flex-row gap-[6px] items-center text-[13px] text-[#1E6B3A] ${font} font-medium`}>
                        <Building2 size={14} /> {selected.lead.company}
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="box-border w-full max-h-[640px] overflow-y-auto flex flex-col gap-[12px] p-[20px] bg-[#F5F6F7]">
                {selected.messages.map((m, i) => (
                  <div key={i} className={`w-full flex flex-col gap-[4px] ${m.from === "visitor" ? "items-end" : "items-start"}`}>
                    <div
                      className={`max-w-[80%] p-[10px_14px] rounded-[14px] text-[14px]/[21px] ${font} [white-space:pre-wrap] [overflow-wrap:anywhere] ${
                        m.from === "visitor" ? "bg-[#000354] text-[#FFFFFF] rounded-br-[4px]" : "bg-[#FFFFFF] text-[#223548] rounded-bl-[4px] [outline:1px_solid_#E5E8EB]"
                      }`}
                    >
                      {m.text}
                    </div>
                    <span className={`text-[11px]/[14px] text-[#8396A8] ${font}`}>
                      {m.from === "visitor" ? "Visitor" : "Assistant"} · {when(m.time, false)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
