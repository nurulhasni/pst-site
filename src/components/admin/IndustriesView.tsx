"use client";

import Link from "next/link";
import { useState, useTransition, type FormEvent } from "react";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { AdminField, AdminNotice } from "@/components/admin/AdminUi";
import { IndustryIcon, industryIconParts } from "@/components/IndustryIcon";
import { deleteIndustry, importIndustries, saveIndustry } from "@/app/admin/clients/industries/actions";
import type { FormState } from "@/lib/adminForms";
import { industryIconKeys, type Industry, type IndustryIcon as IconKey } from "@/lib/clientModel";
import { useHydrated } from "@/lib/useHydrated";

const font = "font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] ";

const iconButton = "box-border w-[32px] shrink-0 h-[32px] flex flex-row gap-0 justify-center items-center rounded-[8px] hover:bg-[#EAF3F5] cursor-pointer transition-colors disabled:opacity-40 disabled:cursor-not-allowed";
const secondaryButton = `box-border w-fit shrink-0 h-[40px] flex flex-row gap-[8px] p-[0px_20px] justify-center items-center bg-[#FFFFFF] [outline:1px_solid_#475E75] [outline-offset:-0.5px] rounded-[8px] text-[14px]/[18px] text-[#223548] ${font}font-medium cursor-pointer hover:bg-[#EAF3F5] transition-colors`;
const primaryButton = `box-border w-fit shrink-0 h-[40px] flex flex-row gap-[8px] p-[0px_20px] justify-center items-center bg-[#000354] hover:bg-[#0B1470] disabled:opacity-60 disabled:cursor-wait rounded-[8px] text-[14px]/[18px] text-[#FFFFFF] ${font}font-medium cursor-pointer transition-colors`;

function IconPicker({ value, onChange }: { value: IconKey; onChange: (next: IconKey) => void }) {
  return (
    <div className="box-border w-full h-fit flex flex-col gap-[8px]">
      <span className={`text-[14px]/[18px] text-[#223548] ${font}font-medium`}>Icon *</span>
      <div role="radiogroup" aria-label="Icon" className="box-border w-full h-fit flex flex-row flex-wrap gap-[8px]">
        {industryIconKeys.map((key) => {
          const selected = key === value;
          return (
            <button
              key={key}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={industryIconParts[key].label}
              title={industryIconParts[key].label}
              onClick={() => onChange(key)}
              className={`box-border w-[44px] h-[44px] flex items-center justify-center rounded-[8px] cursor-pointer transition-colors ${
                selected ? "bg-[#000354] text-[#FFFFFF]" : "bg-[#FFFFFF] text-[#2F6E80] hover:bg-[#EAF3F5] [outline:1px_solid_#D5DADD] [outline-offset:-0.5px]"
              }`}
            >
              <IndustryIcon icon={key} size={20} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

function IndustryForm({ industry, nextOrder, usedBy, onDone }: { industry?: Industry; nextOrder: number; usedBy: number; onDone: () => void }) {
  const ready = useHydrated();
  const [icon, setIcon] = useState<IconKey>(industry?.icon ?? "grid");
  const [result, setResult] = useState<FormState>({ message: "" });
  const [pending, startTransition] = useTransition();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(async () => {
      const next = await saveIndustry({ message: "" }, formData);
      setResult(next);
      if (next.ok) onDone();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="w-full h-fit shrink-0 flex flex-col gap-[16px] p-[20px] bg-[#F5F6F7] [border-width:0px_0px_1px_0px] [border-style:solid] [border-color:#EAECEE]">
      <input type="hidden" name="id" value={industry?.id ?? ""} />
      <input type="hidden" name="icon" value={icon} />
      {result.message && <AdminNotice>{result.message}</AdminNotice>}
      <div className="box-border w-full h-fit shrink-0 flex flex-row gap-[16px] justify-start items-start max-md:flex-col">
        <AdminField label="Name (English) *" name="name" value={industry?.name} placeholder="e.g. Healthcare & Pharmaceuticals" className="[flex:1_1_0] min-w-0" />
        <AdminField label="Name (Indonesian)" name="nameId" value={industry?.nameId} placeholder="e.g. Kesehatan & Farmasi" className="[flex:1_1_0] min-w-0" />
      </div>
      <div className="box-border w-full h-fit shrink-0 flex flex-row gap-[16px] justify-start items-start max-md:flex-col">
        <AdminField label="Filter label (English)" name="short" value={industry?.short} placeholder="e.g. Healthcare" hint="Short name on the filter buttons. Empty uses the full name." className="[flex:1_1_0] min-w-0" />
        <AdminField label="Filter label (Indonesian)" name="shortId" value={industry?.shortId} placeholder="e.g. Kesehatan" className="[flex:1_1_0] min-w-0" />
        <AdminField label="Order" name="order" type="number" value={String(industry?.order ?? nextOrder)} className="w-[120px] max-md:w-full" />
      </div>
      <IconPicker value={icon} onChange={setIcon} />
      {industry && usedBy > 0 && (
        <AdminNotice tone="info">
          {usedBy} {usedBy === 1 ? "client uses" : "clients use"} this industry. Changing the English name updates {usedBy === 1 ? "it" : "them"} in the Clients sheet too.
        </AdminNotice>
      )}
      <div className="box-border w-full h-fit shrink-0 flex flex-row flex-wrap gap-[12px] justify-end items-center">
        <button type="button" onClick={onDone} className={secondaryButton}>
          Cancel
        </button>
        <button type="submit" disabled={!ready || pending} className={primaryButton}>
          {pending ? "Saving…" : industry ? "Save industry" : "Add industry"}
        </button>
      </div>
    </form>
  );
}

export function IndustriesView({ industries, imported, clientIndustries }: { industries: Industry[]; imported: boolean; clientIndustries: string[] }) {
  const [editing, setEditing] = useState<string | null>(null);
  const [confirming, setConfirming] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [pending, startTransition] = useTransition();

  const usedBy = (name: string) => clientIndustries.filter((c) => c.trim().toLowerCase() === name.trim().toLowerCase()).length;
  const nextOrder = industries.reduce((max, i) => Math.max(max, i.order < 999 ? i.order : 0), 0) + 1;
  // Names typed straight into the Clients sheet that aren't in this list
  const unknown = [...new Set(clientIndustries.filter((name) => name && !industries.some((i) => i.name.toLowerCase() === name.trim().toLowerCase())))];

  function run(task: () => Promise<FormState>) {
    setMessage("");
    startTransition(async () => {
      const result = await task();
      if (result.message) setMessage(result.message);
      setConfirming(null);
    });
  }

  return (
    <div className="box-border w-full h-fit shrink-0 flex flex-col gap-[24px] p-[32px] justify-start items-start max-lg:p-[20px]">
      <Link href="/admin/clients" className={`box-border w-fit flex flex-row gap-[6px] items-center text-[14px]/[18px] text-[#2F6E80] hover:text-[#000354] ${font}font-medium transition-colors`}>
        <ArrowLeft size={16} />
        Back to clients
      </Link>

      {!imported && (
        <div className="box-border w-full h-fit shrink-0 flex flex-row flex-wrap gap-[16px] p-[20px] justify-between items-center bg-[#EAF3F5] rounded-[12px]">
          <div className="box-border [flex:1_1_320px] min-w-0 h-fit flex flex-col gap-[4px]">
            <div className={`text-[15px]/[20px] text-[#000354] ${font}font-medium`}>Industries aren’t in the Google Sheet yet</div>
            <div className={`text-[14px]/[20px] text-[#354A5F] ${font}font-normal`}>
              Below are the six industries the website uses today. Import them to an “Industries” tab in the Clients file, then add or rename industries here.
            </div>
          </div>
          <button type="button" disabled={pending} onClick={() => run(importIndustries)} className={primaryButton}>
            {pending ? "Importing…" : "Import to Google Sheet"}
          </button>
        </div>
      )}
      {message && <AdminNotice>{message}</AdminNotice>}
      {unknown.length > 0 && (
        <AdminNotice tone="info">
          Some clients use an industry that isn’t in this list: {unknown.map((name) => `“${name}”`).join(", ")}. Add it here with exactly that English name to give it an icon and an Indonesian name, or move those clients to another industry.
        </AdminNotice>
      )}

      <div className="box-border w-full h-fit shrink-0 flex flex-col gap-0 justify-start items-start bg-[#FFFFFF] [outline:1px_solid_#D5DADD] [outline-offset:-0.5px] rounded-[12px] overflow-hidden">
        <div className="w-full h-fit shrink-0 flex flex-row flex-wrap gap-[12px] p-[16px_20px] justify-between items-center [border-width:0px_0px_1px_0px] [border-style:solid] [border-color:#D5DADD]">
          <div className="box-border flex flex-col gap-[2px]">
            <div className={`text-[17px]/[22px] text-[#000000] ${font}font-medium`}>Industries</div>
            <div className={`text-[13px]/[17px] text-[#475E75] ${font}font-normal`}>Groups on the Services page, in this order. Industries without clients are hidden there.</div>
          </div>
          {imported && editing !== "new" && (
            <button type="button" onClick={() => setEditing("new")} className={primaryButton}>
              + Add industry
            </button>
          )}
        </div>

        {editing === "new" && <IndustryForm nextOrder={nextOrder} usedBy={0} onDone={() => setEditing(null)} />}

        {industries.map((industry) => {
          const count = usedBy(industry.name);
          if (editing === industry.id) {
            return <IndustryForm key={industry.id} industry={industry} nextOrder={nextOrder} usedBy={count} onDone={() => setEditing(null)} />;
          }
          return (
            <div key={industry.id} className="w-full h-fit shrink-0 flex flex-row gap-[16px] p-[14px_20px] justify-start items-center [border-width:0px_0px_1px_0px] [border-style:solid] [border-color:#EAECEE] max-md:flex-wrap">
              <div className="box-border w-[44px] h-[44px] shrink-0 flex items-center justify-center bg-[#EAF3F5] rounded-[8px]">
                <IndustryIcon icon={industry.icon} size={20} className="text-[#2F6E80]" />
              </div>
              <div className="box-border [flex:1_1_0] min-w-[200px] flex flex-col gap-[2px]">
                <div className={`text-[15px]/[20px] text-[#000000] ${font}font-medium`}>{industry.name}</div>
                <div className={`text-[13px]/[17px] ${industry.nameId ? "text-[#475E75]" : "text-[#AA5808]"} ${font}font-normal`}>
                  {industry.nameId || "No Indonesian name · English shows on the Indonesian site"}
                </div>
              </div>
              <div className={`w-[110px] shrink-0 text-[13px]/[17px] text-[#354A5F] ${font}font-normal`}>
                {count} {count === 1 ? "client" : "clients"}
              </div>
              <div className={`w-[70px] shrink-0 text-[13px]/[17px] text-[#475E75] ${font}font-normal`}>Order {industry.order}</div>
              <div className="box-border w-[80px] shrink-0 h-fit flex flex-row gap-[4px] justify-end items-center">
                {imported &&
                  (confirming === industry.id ? (
                    <>
                      <button type="button" disabled={pending} onClick={() => run(() => deleteIndustry(industry.id))} className={`h-[32px] px-[8px] rounded-[8px] bg-[#D20A0A] hover:bg-[#AA0808] text-[12px]/[16px] text-[#FFFFFF] ${font}font-medium cursor-pointer disabled:opacity-60`}>
                        {pending ? "…" : "Delete"}
                      </button>
                      <button type="button" aria-label="Cancel delete" onClick={() => setConfirming(null)} className={`h-[32px] px-[6px] rounded-[8px] hover:bg-[#EAF3F5] text-[12px]/[16px] text-[#354A5F] ${font}font-medium cursor-pointer`}>
                        ✕
                      </button>
                    </>
                  ) : (
                    <>
                      <button type="button" aria-label={`Edit ${industry.name}`} onClick={() => setEditing(industry.id)} className={iconButton}>
                        <Pencil size={16} className="text-[#354A5F]" />
                      </button>
                      <button
                        type="button"
                        aria-label={`Delete ${industry.name}`}
                        title={count ? "Move its clients to another industry first" : undefined}
                        disabled={count > 0}
                        onClick={() => setConfirming(industry.id)}
                        className={iconButton}
                      >
                        <Trash2 size={16} className="text-[#D20A0A]" />
                      </button>
                    </>
                  ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
