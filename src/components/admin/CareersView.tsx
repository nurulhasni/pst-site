"use client";

import Link from "next/link";
import { useState, useTransition, type FormEvent } from "react";
import { BriefcaseBusiness, Code, Eye, Pencil, Server, Trash2, type LucideIcon } from "lucide-react";
import { AdminField, AdminNotice, AdminToggle } from "@/components/admin/AdminUi";
import { deleteFaq, deletePosition, importCareers, saveFaq } from "@/app/admin/careers/actions";
import type { FormState } from "@/lib/adminForms";
import { isListed, jakartaToday, type CareerFaq, type CareerPosition } from "@/lib/careerModel";

const font = "font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] ";

const tabs = ["All positions", "Open", "Closed"] as const;
type Tab = (typeof tabs)[number];

const iconButton = "box-border w-[32px] shrink-0 h-[32px] flex flex-row gap-0 justify-center items-center rounded-[8px] hover:bg-[#EAF3F5] cursor-pointer transition-colors disabled:opacity-40 disabled:cursor-not-allowed";
const secondaryButton = `box-border w-fit shrink-0 h-[40px] flex flex-row gap-[8px] p-[0px_20px] justify-center items-center bg-[#FFFFFF] [outline:1px_solid_#475E75] [outline-offset:-0.5px] rounded-[8px] text-[14px]/[18px] text-[#223548] ${font}font-medium cursor-pointer hover:bg-[#EAF3F5] transition-colors`;
const primaryButton = `box-border w-fit shrink-0 h-[40px] flex flex-row gap-[8px] p-[0px_20px] justify-center items-center bg-[#000354] hover:bg-[#0B1470] disabled:opacity-60 disabled:cursor-wait rounded-[8px] text-[14px]/[18px] text-[#FFFFFF] ${font}font-medium cursor-pointer transition-colors`;

const categoryIcons: Record<string, LucideIcon> = { functional: BriefcaseBusiness, technical: Server, abaper: Code };
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return value || "—";
  return `${months[month - 1]} ${day}, ${year}`;
}

type Status = "Open" | "Closed" | "Expired";

const statusStyle: Record<Status, { bg: string; dot: string; text: string }> = {
  Open: { bg: "bg-[#F5FAE5]", dot: "bg-[#188918]", text: "text-[#188918]" },
  Closed: { bg: "bg-[#F5F6F7]", dot: "bg-[#8396A8]", text: "text-[#475E75]" },
  Expired: { bg: "bg-[#FFF3E8]", dot: "bg-[#E76500]", text: "text-[#AA5808]" },
};

function StatusChip({ status }: { status: Status }) {
  const style = statusStyle[status];
  return (
    <div className={`box-border w-fit shrink-0 h-fit flex flex-row gap-[6px] p-[4px_10px] justify-start items-center ${style.bg} rounded-[999px]`}>
      <div className={`box-border w-[6px] shrink-0 h-[6px] ${style.dot} rounded-[50%]`} />
      <span className={`text-[12px]/[16px] box-border ${style.text} ${font}font-medium text-left [white-space:nowrap]`}>{status}</span>
    </div>
  );
}

function FaqForm({ faq, nextOrder, onDone }: { faq?: CareerFaq; nextOrder: number; onDone: () => void }) {
  const [published, setPublished] = useState(faq?.published ?? true);
  const [result, setResult] = useState<FormState>({ message: "" });
  const [pending, startTransition] = useTransition();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(async () => {
      const next = await saveFaq({ message: "" }, formData);
      setResult(next);
      if (next.ok) onDone();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="w-full h-fit shrink-0 flex flex-col gap-[16px] p-[20px] bg-[#F5F6F7] [border-width:0px_0px_1px_0px] [border-style:solid] [border-color:#EAECEE]">
      <input type="hidden" name="id" value={faq?.id ?? ""} />
      {published && <input type="hidden" name="published" value="on" />}
      {result.message && <AdminNotice>{result.message}</AdminNotice>}
      <AdminField label="Question *" name="question" value={faq?.question} />
      <AdminField label="Answer" name="answer" value={faq?.answer} multiline rows={4} hint="Each line break shows as a new line on the site." />
      <div className="box-border w-full h-fit shrink-0 flex flex-row gap-[16px] justify-start items-start max-md:flex-col">
        <AdminField label="Question (ID)" name="questionId" value={faq?.questionId} className="[flex:1_1_0] min-w-0" />
        <AdminField label="Order" name="order" type="number" value={String(faq?.order ?? nextOrder)} className="w-[120px] max-md:w-full" />
      </div>
      <AdminField label="Answer (ID)" name="answerId" value={faq?.answerId} multiline rows={3} hint="Optional · empty shows the English answer on the Indonesian site." />
      <div className="box-border w-full h-fit shrink-0 flex flex-row flex-wrap gap-[16px] justify-between items-center">
        <div className="box-border w-fit h-fit flex flex-row gap-[10px] items-center">
          <AdminToggle checked={published} onChange={setPublished} label="Published" />
          <span className={`text-[14px]/[18px] text-[#223548] ${font}font-medium`}>Published</span>
        </div>
        <div className="box-border w-fit h-fit flex flex-row gap-[12px]">
          <button type="button" onClick={onDone} className={secondaryButton}>
            Cancel
          </button>
          <button type="submit" disabled={pending} className={primaryButton}>
            {pending ? "Saving…" : faq ? "Save question" : "Add question"}
          </button>
        </div>
      </div>
    </form>
  );
}

export function CareersView({ positions, faqs, imported }: { positions: CareerPosition[]; faqs: CareerFaq[]; imported: boolean }) {
  const [tab, setTab] = useState<Tab>("All positions");
  const [editingFaq, setEditingFaq] = useState<string | null>(null);
  const [confirming, setConfirming] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [pending, startTransition] = useTransition();

  const today = jakartaToday();
  const statusOf = (p: CareerPosition): Status => (!p.open ? "Closed" : isListed(p, today) ? "Open" : "Expired");

  const visible = positions.filter((p) => tab === "All positions" || (tab === "Open" ? statusOf(p) === "Open" : statusOf(p) !== "Open"));
  const counts: Record<Tab, number> = {
    "All positions": positions.length,
    Open: positions.filter((p) => statusOf(p) === "Open").length,
    Closed: positions.filter((p) => statusOf(p) !== "Open").length,
  };
  const nextFaqOrder = faqs.reduce((max, f) => Math.max(max, f.order < 999 ? f.order : 0), 0) + 1;

  function run(task: () => Promise<FormState>) {
    setMessage("");
    startTransition(async () => {
      const result = await task();
      if (result.message) setMessage(result.message);
      setConfirming(null);
    });
  }

  // Deleting asks for a second click instead of a browser dialog
  function confirmThen(key: string, task: () => Promise<FormState>) {
    if (confirming !== key) {
      setConfirming(key);
      return;
    }
    run(task);
  }

  return (
    <div className="box-border w-full h-fit shrink-0 flex flex-col gap-[24px] p-[32px] justify-start items-start max-lg:p-[20px]">
      {!imported && (
        <div className="box-border w-full h-fit shrink-0 flex flex-row flex-wrap gap-[16px] p-[20px] justify-between items-center bg-[#EAF3F5] rounded-[12px]">
          <div className="box-border [flex:1_1_320px] min-w-0 h-fit flex flex-col gap-[4px]">
            <div className={`text-[15px]/[20px] text-[#000354] ${font}font-medium`}>Careers isn’t in the Google Sheet yet</div>
            <div className={`text-[14px]/[20px] text-[#354A5F] ${font}font-normal`}>
              Below is what the Career page shows today. Import it to create the “Careers” and “Career FAQ” tabs, then edit it here or in the Sheet.
            </div>
          </div>
          <button type="button" disabled={pending} onClick={() => run(importCareers)} className={primaryButton}>
            {pending ? "Importing…" : "Import to Google Sheet"}
          </button>
        </div>
      )}
      {message && <AdminNotice>{message}</AdminNotice>}

      <div className="box-border w-full h-fit shrink-0 flex flex-row flex-wrap gap-[16px] justify-between items-center">
        <div role="tablist" className="box-border w-fit shrink-0 h-fit flex flex-row flex-wrap gap-[12px] justify-start items-start">
          {tabs.map((item) => {
            const isActive = tab === item;
            return (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setTab(item)}
                className={`box-border w-fit shrink-0 h-fit flex flex-row gap-[8px] p-[8px_14px] justify-start items-center rounded-[999px] cursor-pointer transition-colors ${
                  isActive ? "bg-[#000354] [outline:1px_solid_#000354] [outline-offset:-0.5px]" : "bg-[#FFFFFF] hover:bg-[#EAF3F5] [outline:1px_solid_#D5DADD] [outline-offset:-0.5px]"
                }`}
              >
                <span className={`text-[14px]/[18px] box-border ${isActive ? "text-[#FFFFFF]" : "text-[#223548]"} ${font}text-left [white-space:nowrap]`}>{item}</span>
                <span className={`text-[12px]/[16px] box-border ${isActive ? "text-[#A6CBD3]" : "text-[#475E75]"} ${font}text-left [white-space:nowrap]`}>{counts[item]}</span>
              </button>
            );
          })}
        </div>
        {imported && (
          <Link href="/admin/careers/edit" className={`box-border w-fit shrink-0 h-[44px] flex flex-row gap-[8px] p-[0px_24px] justify-center items-center bg-[#000354] hover:bg-[#0B1470] rounded-[8px] text-[15px]/[19px] text-[#FFFFFF] ${font}font-medium transition-colors`}>
            + New position
          </Link>
        )}
      </div>

      <div className="box-border w-full h-fit shrink-0 flex flex-col gap-0 justify-start items-start bg-[#FFFFFF] [outline:1px_solid_#D5DADD] [outline-offset:-0.5px] rounded-[12px] overflow-x-auto">
        <div className="w-full min-w-[840px] h-fit shrink-0 flex flex-row gap-[16px] p-[12px_20px] justify-start items-start bg-[#F5F6F7] [border-width:0px_0px_1px_0px] [border-style:solid] [border-color:#D5DADD]">
          <div className={`text-[12px]/[16px] box-border [flex:1_1_0] min-w-[240px] text-[#475E75] ${font}font-medium tracking-[1px] text-left`}>POSITION</div>
          <div className={`text-[12px]/[16px] box-border w-[150px] shrink-0 text-[#475E75] ${font}font-medium tracking-[1px] text-left`}>TYPE</div>
          <div className={`text-[12px]/[16px] box-border w-[220px] shrink-0 max-2xl:hidden text-[#475E75] ${font}font-medium tracking-[1px] text-left`}>LOCATION</div>
          <div className={`text-[12px]/[16px] box-border w-[110px] shrink-0 text-[#475E75] ${font}font-medium tracking-[1px] text-left`}>STATUS</div>
          <div className={`text-[12px]/[16px] box-border w-[120px] shrink-0 text-[#475E75] ${font}font-medium tracking-[1px] text-left`}>UPDATED</div>
          <div className="box-border w-[112px] shrink-0 h-[16px]" />
        </div>
        {visible.length === 0 && (
          <div className={`w-full min-w-[840px] p-[24px_20px] text-[14px]/[20px] text-[#475E75] ${font}font-normal`}>
            {positions.length === 0 ? "No positions yet. Add one with “+ New position”." : "No positions in this tab."}
          </div>
        )}
        {visible.map((position) => {
          const Icon = categoryIcons[position.category.toLowerCase()] ?? BriefcaseBusiness;
          const status = statusOf(position);
          const deleteKey = `position-${position.id}`;
          return (
            <div key={position.id} className="w-full min-w-[840px] h-fit shrink-0 flex flex-row gap-[16px] p-[16px_20px] justify-start items-center [border-width:0px_0px_1px_0px] [border-style:solid] [border-color:#EAECEE]">
              <div className="box-border [flex:1_1_0] min-w-[240px] h-fit flex flex-row gap-[14px] justify-start items-center">
                <div className="box-border w-[40px] shrink-0 h-[40px] flex flex-row gap-0 justify-center items-center bg-[#EAF3F5] rounded-[8px]">
                  <Icon size={20} className="text-[#2F6E80]" />
                </div>
                <div className="box-border [flex:1_1_0] min-w-0 h-fit flex flex-col gap-[2px] justify-start items-start">
                  <div className={`text-[11px]/[14px] box-border text-[#2F6E80] ${font}font-medium tracking-[1px] text-left [white-space:nowrap]`}>{position.category.toUpperCase()}</div>
                  <div className={`text-[15px]/[20px] box-border w-full text-[#000000] ${font}font-medium text-left break-words`}>{position.title || "(untitled)"}</div>
                </div>
              </div>
              <div className={`text-[14px]/[18px] box-border w-[150px] shrink-0 text-[#354A5F] ${font}font-normal text-left`}>{position.type}</div>
              <div className={`text-[14px]/[18px] box-border w-[220px] shrink-0 max-2xl:hidden text-[#354A5F] ${font}font-normal text-left`}>{position.location}</div>
              <div className="box-border w-[110px] shrink-0 h-fit flex flex-row gap-0 justify-start items-start">
                <StatusChip status={status} />
              </div>
              <div className={`text-[14px]/[18px] box-border w-[120px] shrink-0 text-[#354A5F] ${font}font-normal text-left`}>{formatDate(position.updatedAt)}</div>
              <div className="box-border w-[112px] shrink-0 h-fit flex flex-row gap-[4px] justify-end items-center">
                {confirming === deleteKey ? (
                  <>
                    <button type="button" disabled={pending} onClick={() => confirmThen(deleteKey, () => deletePosition(position.id, false))} className={`h-[32px] px-[10px] rounded-[8px] bg-[#D20A0A] hover:bg-[#AA0808] text-[12px]/[16px] text-[#FFFFFF] ${font}font-medium cursor-pointer disabled:opacity-60`}>
                      {pending ? "…" : "Delete"}
                    </button>
                    <button type="button" onClick={() => setConfirming(null)} className={`h-[32px] px-[8px] rounded-[8px] hover:bg-[#EAF3F5] text-[12px]/[16px] text-[#354A5F] ${font}font-medium cursor-pointer`}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    {status === "Open" ? (
                      <Link href={`/career#job-${position.id}`} target="_blank" aria-label="Preview position" className={iconButton}>
                        <Eye size={16} className="text-[#354A5F]" />
                      </Link>
                    ) : (
                      <span aria-hidden className="box-border w-[32px] shrink-0 h-[32px]" />
                    )}
                    {imported && (
                      <>
                        <Link href={`/admin/careers/edit?id=${encodeURIComponent(position.id)}`} aria-label="Edit position" className={iconButton}>
                          <Pencil size={16} className="text-[#354A5F]" />
                        </Link>
                        <button type="button" aria-label="Delete position" onClick={() => confirmThen(deleteKey, () => deletePosition(position.id, false))} className={iconButton}>
                          <Trash2 size={16} className="text-[#D20A0A]" />
                        </button>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="box-border w-full h-fit shrink-0 flex flex-col gap-0 justify-start items-start bg-[#FFFFFF] [outline:1px_solid_#D5DADD] [outline-offset:-0.5px] rounded-[12px] overflow-hidden">
        <div className="w-full h-fit shrink-0 flex flex-row flex-wrap gap-[12px] p-[18px_20px] justify-between items-center [border-width:0px_0px_1px_0px] [border-style:solid] [border-color:#D5DADD]">
          <div className="box-border w-fit max-w-full shrink-0 h-fit flex flex-col gap-[2px] justify-start items-start">
            <div className={`text-[17px]/[22px] box-border text-[#000000] ${font}font-medium text-left [white-space:nowrap]`}>Career FAQ</div>
            <div className={`text-[13px]/[17px] box-border text-[#475E75] ${font}font-normal text-left`}>Shown at the bottom of the Career page · sorted by order</div>
          </div>
          {imported && editingFaq !== "new" && (
            <button type="button" onClick={() => setEditingFaq("new")} className={secondaryButton}>
              + Add question
            </button>
          )}
        </div>
        {editingFaq === "new" && <FaqForm nextOrder={nextFaqOrder} onDone={() => setEditingFaq(null)} />}
        {faqs.length === 0 && editingFaq !== "new" && (
          <div className={`w-full p-[20px] text-[14px]/[20px] text-[#475E75] ${font}font-normal`}>No questions yet.</div>
        )}
        {faqs.map((faq, index) =>
          editingFaq === faq.id ? (
            <FaqForm key={faq.id} faq={faq} nextOrder={nextFaqOrder} onDone={() => setEditingFaq(null)} />
          ) : (
            <div key={faq.id} className={`w-full h-fit shrink-0 flex flex-row gap-[14px] p-[14px_20px] justify-start items-center ${index < faqs.length - 1 ? "[border-width:0px_0px_1px_0px] [border-style:solid] [border-color:#EAECEE]" : ""}`}>
              <div className={`text-[13px]/[17px] box-border w-[20px] shrink-0 text-[#475E75] ${font}font-medium text-left`}>{index + 1}</div>
              <div className={`text-[15px]/[20px] box-border [flex:1_1_0] min-w-0 text-[#000000] ${font}font-medium text-left`}>{faq.question}</div>
              <div className="box-border w-fit shrink-0 h-fit flex flex-row gap-0 justify-start items-start">
                <div className={`box-border w-fit shrink-0 h-fit flex flex-row gap-[6px] p-[4px_10px] justify-start items-center ${faq.published ? "bg-[#F5FAE5]" : "bg-[#F5F6F7]"} rounded-[999px]`}>
                  <div className={`box-border w-[6px] shrink-0 h-[6px] ${faq.published ? "bg-[#188918]" : "bg-[#8396A8]"} rounded-[50%]`} />
                  <span className={`text-[12px]/[16px] box-border ${faq.published ? "text-[#188918]" : "text-[#475E75]"} ${font}font-medium text-left [white-space:nowrap]`}>{faq.published ? "Published" : "Hidden"}</span>
                </div>
              </div>
              {imported && (
                <div className="box-border w-fit shrink-0 h-fit flex flex-row gap-[4px] justify-start items-center">
                  {confirming === `faq-${faq.id}` ? (
                    <>
                      <button type="button" disabled={pending} onClick={() => confirmThen(`faq-${faq.id}`, () => deleteFaq(faq.id))} className={`h-[32px] px-[10px] rounded-[8px] bg-[#D20A0A] hover:bg-[#AA0808] text-[12px]/[16px] text-[#FFFFFF] ${font}font-medium cursor-pointer disabled:opacity-60`}>
                        {pending ? "…" : "Delete"}
                      </button>
                      <button type="button" onClick={() => setConfirming(null)} className={`h-[32px] px-[8px] rounded-[8px] hover:bg-[#EAF3F5] text-[12px]/[16px] text-[#354A5F] ${font}font-medium cursor-pointer`}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button type="button" aria-label={`Edit question ${index + 1}`} onClick={() => setEditingFaq(faq.id)} className={iconButton}>
                        <Pencil size={16} className="text-[#354A5F]" />
                      </button>
                      <button type="button" aria-label={`Delete question ${index + 1}`} onClick={() => confirmThen(`faq-${faq.id}`, () => deleteFaq(faq.id))} className={iconButton}>
                        <Trash2 size={16} className="text-[#D20A0A]" />
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          ),
        )}
      </div>
    </div>
  );
}
