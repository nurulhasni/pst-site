"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, GripVertical, Plus, Trash2, X } from "lucide-react";
import { AdminCard, AdminField, AdminToggle } from "@/components/admin/AdminUi";

const font = "font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif]";

const fieldBox = "box-border w-full h-[48px] shrink-0 flex flex-row gap-0 p-[0px_16px] justify-between items-center bg-[#FFFFFF] [outline:1px_solid_#475E75] [outline-offset:-0.5px] rounded-[8px] focus-within:[outline:2px_solid_#2F6E80] focus-within:[outline-offset:-1px]";
const labelClass = `text-[14px]/[18px] box-border text-[#223548] ${font} font-medium text-left [white-space:nowrap]`;
const selectClass = `box-border w-full min-w-0 bg-transparent text-[16px]/[21px] text-[#223548] ${font} font-normal outline-none appearance-none cursor-pointer`;

const categories = ["Functional", "Technical", "ABAPER"];
const employmentTypes = ["Trainee", "Full-time", "Full-time · Fresh grad", "Contract"];

const initialResponsibilities = ["Business process mapping", "Realize and deploy it into the SAP system", "Deliver user training and support to clients"];
const initialQualifications = [
  "Age under 28 years old",
  "D3, D4, S1 or higher with GPA > 3.0",
  "Strong motivation, initiative, discipline and commitment",
  "Good command of Indonesian and English (reading is a must)",
  "Willing to be assigned to any project location",
];

function EditableList({ label, sub, items, onChange }: { label: string; sub: string; items: string[]; onChange: (next: string[]) => void }) {
  return (
    <AdminCard title={label} sub={sub}>
      <div className="box-border w-full h-fit shrink-0 flex flex-col gap-[8px] justify-start items-start">
        {items.map((item, index) => (
          <div key={`${index}-${item}`} className="box-border w-full h-[44px] shrink-0 flex flex-row gap-[10px] p-[0px_8px_0px_10px] justify-start items-center [outline:1px_solid_#D5DADD] [outline-offset:-0.5px] rounded-[8px]">
            <GripVertical size={16} className="text-[#A9B4BE] shrink-0" />
            <input
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

export function EditPositionView() {
  const [responsibilities, setResponsibilities] = useState(initialResponsibilities);
  const [qualifications, setQualifications] = useState(initialQualifications);
  const [open, setOpen] = useState(true);

  return (
    <form onSubmit={(event) => event.preventDefault()} className="box-border w-full h-fit shrink-0 flex flex-row gap-[24px] p-[32px] justify-start items-start max-lg:flex-col max-lg:p-[20px]">
      <div className="box-border [flex:1_1_0] min-w-0 h-fit flex flex-col gap-[24px] justify-start items-start">
        <AdminCard title="Position details">
          <AdminField label="Position title *" value="Business Analyst (SAP S/4HANA) Consultant – Trainee" name="title" />
          <div className="box-border w-full h-fit shrink-0 flex flex-row gap-[16px] justify-start items-start max-sm:flex-col">
            <label className="box-border [flex:1_1_0] min-w-0 h-fit flex flex-col gap-[8px] justify-start items-start">
              <span className={labelClass}>Category</span>
              <div className={fieldBox}>
                <select defaultValue="Functional" className={selectClass}>
                  {categories.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
                <ChevronDown size={18} className="text-[#475E75] shrink-0 pointer-events-none" />
              </div>
            </label>
            <label className="box-border [flex:1_1_0] min-w-0 h-fit flex flex-col gap-[8px] justify-start items-start">
              <span className={labelClass}>Employment type</span>
              <div className={fieldBox}>
                <select defaultValue="Trainee" className={selectClass}>
                  {employmentTypes.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
                <ChevronDown size={18} className="text-[#475E75] shrink-0 pointer-events-none" />
              </div>
            </label>
          </div>
          <AdminField label="Location" value="Kemayoran, Central Jakarta · client sites across Indonesia" name="location" />
        </AdminCard>

        <EditableList label="Responsibilities" sub="One item per line · drag to reorder" items={responsibilities} onChange={setResponsibilities} />
        <EditableList label="Qualifications" sub="One item per line · drag to reorder" items={qualifications} onChange={setQualifications} />

        <AdminCard title="Note for applicants" sub="Optional · shown as a highlighted box on the job card">
          <AdminField
            label="Note"
            multiline
            rows={4}
            value="Before your interview, reflect on: What is this profession? How will it impact my future? Would it be a good investment for me?"
            name="note"
          />
        </AdminCard>
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
              <input type="date" aria-label="Closing date" className={`box-border w-full min-w-0 bg-transparent text-[16px]/[20px] text-[#223548] ${font} font-normal outline-none [color-scheme:light]`} />
            </div>
            <span className={`text-[12px]/[15px] box-border text-[#475E75] ${font} font-normal text-left [white-space:nowrap]`}>Leave empty to keep it open.</span>
          </label>
          <AdminField label="Apply via email" value="recruitment@pst.co.id" name="applyEmail" />
          <AdminField label="Display order" value="1" name="order" />
        </AdminCard>

        <AdminCard title="Actions">
          <button type="submit" className={`box-border w-full h-[48px] shrink-0 flex flex-row gap-[8px] p-[0px_24px] justify-center items-center bg-[#000354] hover:bg-[#0B1470] rounded-[8px] text-[16px]/[20px] text-[#FFFFFF] ${font} font-medium cursor-pointer transition-colors`}>
            Save changes
          </button>
          <Link href="/admin/careers" className={`box-border w-full h-[48px] shrink-0 flex flex-row gap-[8px] p-[0px_24px] justify-center items-center bg-[#FFFFFF] [outline:1px_solid_#2F6E80] [outline-offset:-0.5px] rounded-[8px] text-[16px]/[20px] text-[#2F6E80] ${font} font-medium hover:bg-[#EAF3F5] transition-colors`}>
            Preview on site
          </Link>
          <button type="button" className={`box-border w-full h-fit shrink-0 flex flex-row gap-[6px] justify-center items-center text-[14px]/[18px] text-[#D20A0A] ${font} font-medium cursor-pointer`}>
            <Trash2 size={16} className="text-[#D20A0A]" />
            Delete position
          </button>
        </AdminCard>
      </div>
    </form>
  );
}
