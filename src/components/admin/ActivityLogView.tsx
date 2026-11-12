"use client";

import { useState } from "react";
import { Activity, Database, Download, FileDown, FileText, Mail, MessageCircle, Search, Send } from "lucide-react";
import { activityLabels, activityTypes, clickTypes, type ActivityRow, type ActivityType } from "@/lib/activityModel";

const font = "font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif]";
const card = "box-border bg-[#FFFFFF] [outline:1px_solid_#D5DADD] [outline-offset:-0.5px] rounded-[12px]";

type Filter = "all" | "forms" | "clicks" | ActivityType;

const when = (iso: string) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return `${new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Jakarta" }).format(d)} WIB`;
};

const isClick = (type: ActivityType) => clickTypes.includes(type);

const badgeColors: Record<ActivityType, string> = {
  profile_download: "bg-[#EAF3F5] text-[#1F5A6B]",
  contact_form: "bg-[#E8F5EC] text-[#1E6B3A]",
  article_unlock: "bg-[#F1EDFB] text-[#4B3A8C]",
  chat_lead: "bg-[#FFF4E5] text-[#8A4B00]",
  job_application: "bg-[#FDECEC] text-[#9B1C1C]",
  whatsapp_click: "bg-[#F5F6F7] text-[#354A5F]",
  apply_click: "bg-[#F5F6F7] text-[#354A5F]",
  email_click: "bg-[#F5F6F7] text-[#354A5F]",
  phone_click: "bg-[#F5F6F7] text-[#354A5F]",
  certificate_download: "bg-[#E6F0FA] text-[#1D4F91]",
};

function Stat({ label, value, Icon }: { label: string; value: number; Icon: typeof Activity }) {
  return (
    <div className={`${card} [flex:1_1_180px] min-w-0 p-[16px_20px] flex flex-col gap-[6px]`}>
      <div className={`flex flex-row gap-[8px] items-center text-[13px]/[17px] text-[#475E75] ${font}`}>
        <Icon size={15} className="text-[#2F6E80] shrink-0" />
        {label}
      </div>
      <div className={`text-[28px]/[34px] text-[#000000] ${font} font-medium`}>{value}</div>
    </div>
  );
}

// Spreadsheet-friendly copy of the rows shown, with a BOM so Excel reads the Indonesian text correctly
function downloadCsv(rows: ActivityRow[]) {
  const header = ["Time (WIB)", "Activity", "Name", "Email", "Company / university", "Phone", "Details", "CV", "Page", "Language"];
  const cell = (value: string) => `"${value.replace(/"/g, '""')}"`;
  const lines = rows.map((r) => [when(r.time), activityLabels[r.type], r.name, r.email, r.company, r.phone, r.detail, r.file ? `${location.origin}/admin/applications/cv/${r.file}` : "", r.page, r.lang].map(cell).join(","));
  const blob = new Blob(["﻿" + [header.map(cell).join(","), ...lines].join("\r\n")], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `pst-activity-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// `weekAgo` comes from the server (ISO time seven days before the page was loaded)
export function ActivityLogView({ rows, storage, weekAgo }: { rows: ActivityRow[]; storage: string; weekAgo: string }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  const thisWeek = rows.filter((r) => r.time >= weekAgo);
  const count = (type: ActivityType) => rows.filter((r) => r.type === type).length;

  const q = query.trim().toLowerCase();
  const visible = rows.filter((r) => {
    if (filter === "forms" && isClick(r.type)) return false;
    if (filter === "clicks" && !isClick(r.type)) return false;
    if (filter !== "all" && filter !== "forms" && filter !== "clicks" && r.type !== filter) return false;
    if (!q) return true;
    return [r.name, r.email, r.company, r.phone, r.detail, r.page].join(" ").toLowerCase().includes(q);
  });

  const chips: { key: Filter; label: string; n: number }[] = [
    { key: "all", label: "All", n: rows.length },
    { key: "forms", label: "Forms", n: rows.filter((r) => !isClick(r.type)).length },
    { key: "clicks", label: "Clicks", n: rows.filter((r) => isClick(r.type)).length },
    ...activityTypes.map((type) => ({ key: type as Filter, label: activityLabels[type], n: count(type) })).filter((c) => c.n > 0),
  ];

  return (
    <div className="box-border w-full flex flex-col gap-[24px] p-[32px] max-lg:p-[20px]">
      <div className="box-border w-full flex flex-row flex-wrap gap-[16px]">
        <Stat label="Activity in the last 7 days" value={thisWeek.length} Icon={Activity} />
        <Stat label="Profile & certificate downloads (7 days)" value={thisWeek.filter((r) => r.type === "profile_download" || r.type === "certificate_download").length} Icon={FileDown} />
        <Stat label="Forms sent (7 days)" value={thisWeek.filter((r) => !isClick(r.type)).length} Icon={Send} />
        <Stat label="Job applications (7 days)" value={thisWeek.filter((r) => r.type === "job_application").length} Icon={FileText} />
        <Stat label="WhatsApp, email & phone clicks (7 days)" value={thisWeek.filter((r) => isClick(r.type) && r.type !== "apply_click").length} Icon={MessageCircle} />
      </div>

      <div className={`flex flex-row gap-[8px] items-center text-[12px]/[16px] text-[#475E75] ${font}`}>
        <Database size={14} className="shrink-0" />
        <span>Stored in: {storage}</span>
      </div>

      {rows.length === 0 ? (
        <div className={`${card} w-full p-[48px_24px] flex flex-col gap-[10px] items-center text-center`}>
          <Activity size={32} className="text-[#A6CBD3]" />
          <div className={`text-[16px]/[22px] text-[#000000] ${font} font-medium`}>No visitor activity yet</div>
          <div className={`text-[14px]/[20px] text-[#475E75] max-w-[460px] ${font}`}>
            Profile downloads, contact forms, job applications, unlocked articles, chat contacts and clicks on WhatsApp, email, phone and Apply will appear here.
          </div>
        </div>
      ) : (
        <div className={`${card} w-full flex flex-col overflow-hidden`}>
          <div className="box-border w-full flex flex-col gap-[12px] p-[16px] [border-bottom:1px_solid_#E5E8EB]">
            <div className="w-full flex flex-row flex-wrap gap-[12px] items-center">
              <label className="box-border [flex:1_1_260px] min-w-0 h-[40px] flex flex-row gap-[8px] px-[12px] items-center bg-[#F5F6F7] rounded-[8px] focus-within:[outline:2px_solid_#2F6E80]">
                <Search size={16} className="text-[#475E75] shrink-0" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search names, emails, companies, messages"
                  className={`[flex:1_1_0] min-w-0 bg-transparent outline-none text-[14px] text-[#223548] ${font} placeholder:text-[#8396A8]`}
                />
              </label>
              <button
                type="button"
                onClick={() => downloadCsv(visible)}
                disabled={!visible.length}
                className={`h-[40px] shrink-0 flex flex-row gap-[8px] items-center px-[14px] rounded-[8px] bg-[#000354] hover:bg-[#0B1470] disabled:opacity-50 text-[14px] text-[#FFFFFF] ${font} font-medium`}
              >
                <Download size={16} />
                Export CSV ({visible.length})
              </button>
            </div>
            <div className="flex flex-row flex-wrap gap-[6px]">
              {chips.map((c) => (
                <button
                  key={c.key}
                  type="button"
                  onClick={() => setFilter(c.key)}
                  className={`h-[32px] px-[12px] rounded-[999px] text-[13px] ${font} font-medium ${
                    filter === c.key ? "bg-[#000354] text-[#FFFFFF]" : "bg-[#F5F6F7] text-[#354A5F] hover:bg-[#EAF3F5]"
                  }`}
                >
                  {c.label} ({c.n})
                </button>
              ))}
            </div>
          </div>

          <div className={`w-full grid grid-cols-[170px_200px_minmax(0,1fr)_minmax(0,1.2fr)] gap-[16px] p-[10px_16px] bg-[#F5F6F7] text-[12px]/[16px] text-[#475E75] ${font} font-medium tracking-[0.6px] max-xl:hidden`}>
            <span>TIME</span>
            <span>ACTIVITY</span>
            <span>VISITOR</span>
            <span>DETAILS</span>
          </div>

          <ul className="box-border w-full max-h-[720px] overflow-y-auto">
            {visible.length === 0 && <li className={`p-[20px] text-[14px] text-[#475E75] ${font}`}>No activity matches.</li>}
            {visible.map((r, index) => {
              const contact = [r.email, r.phone].filter(Boolean);
              return (
                <li
                  key={`${r.time}-${index}`}
                  className="box-border w-full grid grid-cols-[170px_200px_minmax(0,1fr)_minmax(0,1.2fr)] gap-[16px] p-[14px_16px] items-start [border-bottom:1px_solid_#EEF0F2] max-xl:grid-cols-1 max-xl:gap-[8px]"
                >
                  <span className={`text-[13px]/[18px] text-[#475E75] ${font}`}>{when(r.time)}</span>
                  <span>
                    <span className={`inline-block p-[3px_10px] rounded-[999px] text-[12px]/[16px] ${font} font-medium ${badgeColors[r.type]}`}>{activityLabels[r.type]}</span>
                  </span>
                  <span className={`min-w-0 flex flex-col gap-[2px] text-[13px]/[18px] ${font}`}>
                    {r.name || contact.length || r.company ? (
                      <>
                        {r.name && <span className="text-[#000000] font-medium break-words">{r.name}</span>}
                        {contact.map((c) => (
                          <a key={c} href={c.includes("@") ? `mailto:${c}` : `tel:${c.replace(/\s/g, "")}`} className="text-[#2F6E80] hover:underline break-all flex flex-row gap-[4px] items-center">
                            {c.includes("@") && <Mail size={12} className="shrink-0" />}
                            {c}
                          </a>
                        ))}
                        {r.company && <span className="text-[#354A5F] break-words">{r.company}</span>}
                      </>
                    ) : (
                      <span className="text-[#8396A8]">Anonymous visitor</span>
                    )}
                  </span>
                  <span className={`min-w-0 flex flex-col gap-[2px] text-[13px]/[18px] ${font}`}>
                    {r.detail && <span className="text-[#223548] whitespace-pre-line break-words line-clamp-4">{r.detail}</span>}
                    {r.file && (
                      <a href={`/admin/applications/cv/${encodeURIComponent(r.file)}`} className="w-fit flex flex-row gap-[6px] items-center text-[#2F6E80] hover:underline font-medium">
                        <FileText size={14} className="shrink-0" />
                        Download CV
                      </a>
                    )}
                    <span className="text-[#8396A8]">
                      {r.page || "/"}
                      {r.lang ? ` · ${r.lang === "id" ? "Indonesian" : "English"}` : ""}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
