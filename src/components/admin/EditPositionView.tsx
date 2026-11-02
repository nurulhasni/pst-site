"use client";

import Link from "next/link";
import { startTransition, useActionState, useState, type FormEvent } from "react";
import { ChevronDown, Plus, Trash2, X } from "lucide-react";
import { AdminCard, AdminField, AdminNotice, AdminToggle } from "@/components/admin/AdminUi";
import { deletePosition, savePosition } from "@/app/admin/careers/actions";
import type { FormState } from "@/lib/adminForms";
import { defaultApplyEmail, employmentTypes, positionCategories, type CareerPosition } from "@/lib/careerModel";

const font = "font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif]";

const fieldBox = "box-border w-full h-[48px] shrink-0 flex flex-row gap-0 p-[0px_16px] justify-between items-center bg-[#FFFFFF] [outline:1px_solid_#475E75] [outline-offset:-0.5px] rounded-[8px] focus-within:[outline:2px_solid_#2F6E80] focus-within:[outline-offset:-1px]";
const labelClass = `text-[14px]/[18px] box-border text-[#223548] ${font} font-medium text-left [white-space:nowrap]`;
const selectClass = `box-border w-full min-w-0 bg-transparent text-[16px]/[21px] text-[#223548] ${font} font-normal outline-none appearance-none cursor-pointer`;

// Keeps a value typed straight into the Sheet selectable even if it isn't one of the presets
const withCurrent = (options: string[], current: string) => (current && !options.includes(current) ? [current, ...options] : options);

function EditableList({ label, sub, name, items, onChange }: { label: string; sub: string; name: string; items: string[]; onChange: (next: string[]) => void }) {
  return (
    <AdminCard title={label} sub={sub}>
      <div className="box-border w-full h-fit shrink-0 flex flex-col gap-[8px] justify-start items-start">
        {items.map((item, index) => (
          <div key={index} className="box-border w-full h-[44px] shrink-0 flex flex-row gap-[10px] p-[0px_8px_0px_12px] justify-start items-center [outline:1px_solid_#D5DADD] [outline-offset:-0.5px] rounded-[8px]">
            <input
              name={name}
              value={item}
              onChange={(event) => onChange(items.map((value, position) => (position === index ? event.target.value : value)))}
              aria-label={`${label} item ${index + 1}`}
              className={`box-border [flex:1_1_0] min-w-0 h-full bg-transparent text-[14px]/[18px] text-[#223548] ${font} font-normal outline-none`}
            />
            <button type="button" aria-label={`Remove item ${index + 1}`} onClick={() => onChange(items.filter((_, position) => position !== index))} className="box-border w-[28px] shrink-0 h-[28px] flex flex-row gap-0 justify-center items-center rounded-[4px] hover:bg-[#EAF3F5] cursor-pointer transition-colors">
              <X size={14} className="text-[#475E75]" />
            </button>
          </div>
        ))}
      </div>
      <button type="button" onClick={() => onChange([...items, ""])} className={`box-border w-fit h-fit shrink-0 flex flex-row gap-[6px] justify-start items-center text-[14px]/[18px] text-[#2F6E80] hover:text-[#000354] ${font} font-medium cursor-pointer transition-colors`}>
        <Plus size={16} className="text-[#2F6E80]" />
        Add item
      </button>
    </AdminCard>
  );
}

function Select({ label, name, options, value }: { label: string; name: string; options: string[]; value: string }) {
  return (
    <label className="box-border [flex:1_1_0] min-w-0 h-fit flex flex-col gap-[8px] justify-start items-start">
      <span className={labelClass}>{label}</span>
      <div className={fieldBox}>
        <select name={name} defaultValue={value} className={selectClass}>
          {withCurrent(options, value).map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <ChevronDown size={18} className="text-[#475E75] shrink-0 pointer-events-none" />
      </div>
    </label>
  );
}

export function EditPositionView({ position }: { position?: CareerPosition }) {
  const [responsibilities, setResponsibilities] = useState(position?.responsibilities ?? [""]);
  const [qualifications, setQualifications] = useState(position?.qualifications ?? [""]);
  const [responsibilitiesId, setResponsibilitiesId] = useState(position?.responsibilitiesId ?? []);
  const [qualificationsId, setQualificationsId] = useState(position?.qualificationsId ?? []);
  const [open, setOpen] = useState(position?.open ?? true);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [state, action, saving] = useActionState<FormState, FormData>(savePosition, { message: "" });
  const [deleteState, setDeleteState] = useState<FormState>({ message: "" });
  const [deleting, setDeleting] = useState(false);

  // Submitting through a transition keeps what was typed if the save fails;
  // a plain form action would reset every field.
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => action(formData));
  }

  function handleDelete() {
    if (!position) return;
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    setDeleting(true);
    startTransition(async () => {
      const result = await deletePosition(position.id, true);
      setDeleteState(result);
      setDeleting(false);
    });
  }

  const message = state.message || deleteState.message;

  return (
    <form onSubmit={handleSubmit} className="box-border w-full h-fit shrink-0 flex flex-row gap-[24px] p-[32px] justify-start items-start max-lg:flex-col max-lg:p-[20px]">
      <input type="hidden" name="id" value={position?.id ?? ""} />
      {open && <input type="hidden" name="open" value="on" />}

      <div className="box-border [flex:1_1_0] min-w-0 max-lg:w-full h-fit flex flex-col gap-[24px] justify-start items-start">
        {message && <AdminNotice>{message}</AdminNotice>}

        <AdminCard title="Position details">
          <AdminField label="Position title *" value={position?.title} name="title" placeholder="e.g. Business Analyst (SAP S/4HANA) Consultant – Trainee" />
          <div className="box-border w-full h-fit shrink-0 flex flex-row gap-[16px] justify-start items-start max-sm:flex-col">
            <Select label="Category" name="category" options={positionCategories} value={position?.category ?? positionCategories[0]} />
            <Select label="Employment type" name="type" options={employmentTypes} value={position?.type ?? employmentTypes[0]} />
          </div>
          <AdminField label="Location" value={position?.location ?? "Kemayoran HQ · client sites"} name="location" />
        </AdminCard>

        <EditableList label="Responsibilities" sub="One point per row" name="responsibilities" items={responsibilities} onChange={setResponsibilities} />
        <EditableList label="Qualifications" sub="One point per row" name="qualifications" items={qualifications} onChange={setQualifications} />

        <AdminCard title="Note for applicants" sub="Optional · shown under “Before your interview, reflect on:”">
          <AdminField label="Note" multiline rows={4} value={position?.note} name="note" />
        </AdminCard>

        <AdminCard title="Indonesian version" sub="Optional · empty fields show the English text on the Indonesian site">
          <AdminField label="Position title (ID)" value={position?.titleId} name="titleId" />
          <AdminField label="Note (ID)" multiline rows={3} value={position?.noteId} name="noteId" />
        </AdminCard>
        <EditableList label="Responsibilities (ID)" sub="Tanggung jawab · one point per row" name="responsibilitiesId" items={responsibilitiesId} onChange={setResponsibilitiesId} />
        <EditableList label="Qualifications (ID)" sub="Kualifikasi · one point per row" name="qualificationsId" items={qualificationsId} onChange={setQualificationsId} />
      </div>

      <div className="box-border w-[360px] max-lg:w-full shrink-0 h-fit flex flex-col gap-[24px] justify-start items-start">
        <AdminCard title="Publishing">
          <div className="box-border w-full h-fit shrink-0 flex flex-row gap-[16px] justify-between items-center">
            <div className="box-border [flex:1_1_0] h-fit flex flex-col gap-[2px] justify-start items-start">
              <div className={`text-[14px]/[18px] box-border text-[#000000] ${font} font-medium text-left [white-space:nowrap]`}>Open for applications</div>
              <div className={`text-[13px]/[17px] box-border w-full text-[#475E75] ${font} font-normal text-left`}>Shown on the Career page</div>
            </div>
            <AdminToggle checked={open} onChange={setOpen} label="Open for applications" />
          </div>
          <label className="box-border w-full h-fit shrink-0 flex flex-col gap-[8px] justify-start items-start">
            <span className={labelClass}>Closing date</span>
            <div className={fieldBox}>
              <input type="date" name="closingDate" defaultValue={position?.closingDate} aria-label="Closing date" className={`box-border w-full min-w-0 bg-transparent text-[16px]/[20px] text-[#223548] ${font} font-normal outline-none [color-scheme:light]`} />
            </div>
            <span className={`text-[12px]/[15px] box-border text-[#475E75] ${font} font-normal text-left`}>Hidden from the site after this date. Leave empty to keep it open.</span>
          </label>
          <AdminField label="Apply via email" value={position?.applyEmail || defaultApplyEmail} name="applyEmail" type="email" />
          <AdminField label="Display order" value={position ? String(position.order) : ""} name="order" type="number" hint="Lower numbers appear first." />
        </AdminCard>

        <AdminCard title="Actions">
          <button type="submit" disabled={saving || deleting} className={`box-border w-full h-[48px] shrink-0 flex flex-row gap-[8px] p-[0px_24px] justify-center items-center bg-[#000354] hover:bg-[#0B1470] disabled:opacity-60 disabled:cursor-wait rounded-[8px] text-[16px]/[20px] text-[#FFFFFF] ${font} font-medium cursor-pointer transition-colors`}>
            {saving ? "Saving…" : position ? "Save changes" : "Create position"}
          </button>
          {position ? (
            <Link href={`/career#job-${position.id}`} target="_blank" className={`box-border w-full h-[48px] shrink-0 flex flex-row gap-[8px] p-[0px_24px] justify-center items-center bg-[#FFFFFF] [outline:1px_solid_#2F6E80] [outline-offset:-0.5px] rounded-[8px] text-[16px]/[20px] text-[#2F6E80] ${font} font-medium hover:bg-[#EAF3F5] transition-colors`}>
              Preview on site
            </Link>
          ) : (
            <Link href="/admin/careers" className={`box-border w-full h-[48px] shrink-0 flex flex-row gap-[8px] p-[0px_24px] justify-center items-center bg-[#FFFFFF] [outline:1px_solid_#2F6E80] [outline-offset:-0.5px] rounded-[8px] text-[16px]/[20px] text-[#2F6E80] ${font} font-medium hover:bg-[#EAF3F5] transition-colors`}>
              Cancel
            </Link>
          )}
          {position && (
            <button type="button" onClick={handleDelete} disabled={saving || deleting} className={`box-border w-full h-fit shrink-0 flex flex-row gap-[6px] justify-center items-center text-[14px]/[18px] text-[#D20A0A] ${font} font-medium cursor-pointer disabled:opacity-60`}>
              <Trash2 size={16} className="text-[#D20A0A]" />
              {deleting ? "Deleting…" : confirmDelete ? "Click again to delete permanently" : "Delete position"}
            </button>
          )}
        </AdminCard>
      </div>
    </form>
  );
}
