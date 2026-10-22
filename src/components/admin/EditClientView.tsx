"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Info, RefreshCw, Trash2 } from "lucide-react";
import { AdminCard, AdminCheckbox, AdminField, AdminToggle } from "@/components/admin/AdminUi";

const font = "font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] ";

const fieldBox = "box-border w-full h-[48px] shrink-0 flex flex-row gap-0 p-[0px_16px] justify-between items-center bg-[#FFFFFF] [outline:1px_solid_#475E75] [outline-offset:-0.5px] rounded-[8px] focus-within:[outline:2px_solid_#2F6E80] focus-within:[outline-offset:-1px]";
const labelClass = `text-[14px]/[18px] box-border text-[#223548] ${font}font-medium text-left [white-space:nowrap]`;
const selectClass = `box-border w-full min-w-0 bg-transparent text-[16px]/[21px] text-[#223548] ${font}font-normal outline-none appearance-none cursor-pointer`;

const industries = ["Heavy Equipment & Manufacturing", "Maritime & Transportation", "Mining, Energy & Construction", "Finance, Technology & Education", "Consumer Goods", "Other Industries"];

const DESCRIPTION_MAX = 160;

export function EditClientView() {
  const [description, setDescription] = useState("");
  const [active, setActive] = useState(true);
  const [inStrip, setInStrip] = useState(true);
  const [onServices, setOnServices] = useState(true);

  return (
    <form onSubmit={(event) => event.preventDefault()} className="box-border w-full h-fit shrink-0 flex flex-row gap-[24px] p-[32px] justify-start items-start max-lg:flex-col max-lg:p-[20px]">
      <div className="box-border [flex:1_1_0] min-w-0 h-fit flex flex-col gap-[24px] justify-start items-start">
        <AdminCard title="Company information">
          <AdminField label="Company name *" value="PT United Tractors Pandu Engineering" name="companyName" />
          <div className="box-border w-full h-fit shrink-0 flex flex-row gap-[16px] justify-start items-start max-sm:flex-col">
            <label className="box-border [flex:1_1_0] min-w-0 h-fit flex flex-col gap-[8px] justify-start items-start">
              <span className={labelClass}>Industry *</span>
              <div className={fieldBox}>
                <select defaultValue={industries[0]} className={selectClass}>
                  {industries.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
                <ChevronDown size={18} className="text-[#475E75] shrink-0 pointer-events-none" />
              </div>
            </label>
            <AdminField label="Website" placeholder="https://" name="website" className="[flex:1_1_0]" />
          </div>
          <label className="box-border w-full h-fit shrink-0 flex flex-col gap-[8px] justify-start items-start">
            <div className="box-border w-full h-fit shrink-0 flex flex-row gap-0 justify-between items-start">
              <span className={labelClass}>Short description</span>
              <span className={`text-[12px]/[16px] box-border text-[#475E75] ${font}font-normal text-left [white-space:nowrap]`}>
                {description.length} / {DESCRIPTION_MAX}
              </span>
            </div>
            <div className="box-border w-full h-[96px] shrink-0 flex flex-row gap-0 p-[16px] justify-start items-start bg-[#FFFFFF] [outline:1px_solid_#475E75] [outline-offset:-0.5px] rounded-[8px] focus-within:[outline:2px_solid_#2F6E80] focus-within:[outline-offset:-1px]">
              <textarea
                value={description}
                maxLength={DESCRIPTION_MAX}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Optional · used in client stories and tooltips"
                className={`box-border [flex:1_1_0] w-full h-full bg-transparent text-[16px]/[24px] text-[#223548] ${font}font-normal outline-none resize-none placeholder:text-[#8396A8]`}
              />
            </div>
          </label>
        </AdminCard>

        <AdminCard title="Logo" sub="Shown in the client strip and on the Services page">
          <div className="box-border w-full h-fit shrink-0 flex flex-row gap-[20px] p-[16px] justify-start items-center [outline:1px_solid_#D5DADD] [outline-offset:-0.5px] rounded-[8px] max-sm:flex-col max-sm:items-start">
            <div className="box-border w-[160px] shrink-0 h-[104px] flex flex-row gap-0 p-[18px_24px] justify-start items-start bg-[#FFFFFF] [outline:1px_solid_#D5DADD] [outline-offset:-0.5px] rounded-[8px]">
              <div className="box-border [flex:1_1_0] h-full bg-no-repeat bg-contain bg-center" style={{ backgroundImage: "url(/images/pst/clients/utpe.png)" }} />
            </div>
            <div className="box-border [flex:1_1_0] min-w-0 h-fit flex flex-col gap-[4px] justify-start items-start">
              <div className={`text-[15px]/[20px] box-border text-[#000000] ${font}font-medium text-left [white-space:nowrap]`}>utpe.png</div>
              <div className={`text-[13px]/[17px] box-border text-[#475E75] ${font}font-normal text-left [white-space:nowrap]`}>965 × 717 px · PNG · transparent</div>
              <div className="box-border w-fit h-fit shrink-0 flex flex-row gap-[12px] p-[8px_0px_0px_0px] justify-start items-start">
                <button type="button" className={`box-border w-fit shrink-0 h-fit flex flex-row gap-[6px] justify-start items-center text-[14px]/[18px] text-[#2F6E80] hover:text-[#000354] ${font}font-medium cursor-pointer transition-colors`}>
                  <RefreshCw size={15} className="text-[#2F6E80]" />
                  Replace
                </button>
                <button type="button" className={`box-border w-fit shrink-0 h-fit flex flex-row gap-[6px] justify-start items-center text-[14px]/[18px] text-[#D20A0A] ${font}font-medium cursor-pointer`}>
                  <Trash2 size={15} className="text-[#D20A0A]" />
                  Remove
                </button>
              </div>
            </div>
          </div>
          <div className="box-border w-full h-fit shrink-0 flex flex-row gap-[10px] p-[12px_14px] justify-start items-start bg-[#EBF8FF] rounded-[8px]">
            <Info size={16} className="text-[#0070F2] shrink-0 mt-[1px]" />
            <div className={`text-[13px]/[20px] box-border [flex:1_1_0] text-[#354A5F] ${font}font-normal text-left`}>
              Use a PNG or SVG with a transparent background. Logos are trimmed and centered automatically.
            </div>
          </div>
        </AdminCard>
      </div>

      <div className="box-border w-[360px] max-lg:w-full shrink-0 h-fit flex flex-col gap-[24px] justify-start items-start">
        <AdminCard title="Display">
          <div className="box-border w-full h-fit shrink-0 flex flex-row gap-[16px] justify-between items-center">
            <div className="box-border [flex:1_1_0] h-fit flex flex-col gap-[2px] justify-start items-start">
              <div className={`text-[14px]/[18px] box-border text-[#000000] ${font}font-medium text-left [white-space:nowrap]`}>Active</div>
              <div className={`text-[13px]/[17px] box-border w-full text-[#475E75] ${font}font-normal text-left`}>Visible on the website</div>
            </div>
            <AdminToggle checked={active} onChange={setActive} label="Active" />
          </div>
          <AdminCheckbox checked={inStrip} onChange={setInStrip} label="Show in homepage logo strip" />
          <AdminCheckbox checked={onServices} onChange={setOnServices} label="Show on Services page (by industry)" />
          <AdminField label="Display order" value="1" name="order" hint="Lower numbers appear first." />
        </AdminCard>

        <AdminCard title="Internal contact" sub="Optional · never shown on the website">
          <AdminField label="Contact name" placeholder="Full name" name="contactName" />
          <AdminField label="Email" placeholder="name@company.com" name="contactEmail" type="email" />
          <AdminField label="Phone" placeholder="+62 ..." name="contactPhone" type="tel" />
        </AdminCard>

        <AdminCard title="Actions">
          <button type="submit" className={`box-border w-full h-[48px] shrink-0 flex flex-row gap-[8px] p-[0px_24px] justify-center items-center bg-[#000354] hover:bg-[#0B1470] rounded-[8px] text-[16px]/[20px] text-[#FFFFFF] ${font}font-medium cursor-pointer transition-colors`}>
            Save client
          </button>
          <Link href="/admin/clients" className={`box-border w-full text-[14px]/[18px] text-[#475E75] hover:text-[#000354] transition-colors ${font}font-medium text-center`}>
            Cancel
          </Link>
        </AdminCard>
      </div>
    </form>
  );
}
