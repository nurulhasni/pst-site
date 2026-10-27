"use client";

import Link from "next/link";
import { useState, type FormEvent, type ReactNode } from "react";
import { Bell, Check, ChevronDown, CloudUpload, ExternalLink, Factory, Search } from "lucide-react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

const font = "font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif]";

const labelClass = `text-[14px]/[18px] box-border text-[#223548] ${font} font-medium text-left [white-space:nowrap]`;
const cardClass = "box-border w-full h-fit shrink-0 flex flex-col gap-[20px] p-[24px] justify-start items-start bg-[#FFFFFF] [outline:1px_solid_#D5DADD] [outline-offset:-0.5px] rounded-[12px]";
const fieldClass = `box-border w-full h-[48px] shrink-0 flex flex-row gap-0 p-[0px_16px] justify-start items-center bg-[#FFFFFF] [outline:1px_solid_#475E75] [outline-offset:-0.5px] rounded-[8px] focus-within:[outline:2px_solid_#2F6E80] focus-within:[outline-offset:-1px]`;
const inputClass = `box-border [flex:1_1_0] min-w-0 h-full bg-transparent text-[16px]/[20px] text-[#223548] ${font} font-normal outline-none`;
const selectClass = `box-border [flex:1_1_0] min-w-0 h-full bg-transparent text-[16px]/[21px] text-[#223548] ${font} font-normal outline-none appearance-none cursor-pointer`;
const cardTitleClass = `text-[17px]/[22px] box-border text-[#000000] ${font} font-medium text-left [white-space:nowrap]`;
const dropZoneClass = `box-border w-full h-fit shrink-0 flex flex-col gap-[10px] p-[32px_24px] justify-start items-center bg-[#F5F6F7] [outline:1.5px_solid_#A9B4BE] [outline-offset:-0.75px] rounded-[12px] cursor-pointer hover:bg-[#EAF3F5] transition-colors`;

const industries = ["Manufacturing", "Maritime & Transportation", "Mining & Construction", "Finance & Technology", "Consumer Goods"];
const services = ["SAP Solution", "SAP Support & Outsourcing", "Business Process Reengineering", "Strategic Information Planning"];

const NARRATIVE_MAX = 400;
const QUOTE_MAX = 200;
const storyPhoto = "https://images.unsplash.com/photo-1653290523116-662a6e8c4b88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3OTI2Mzg0MDF8&ixlib=rb-4.1.0&q=80&w=1080";

const initialNarrative =
  "A manufacturing company partnered with PST to move its entire supply chain onto SAP S/4HANA. Deep SAP expertise and a shared commitment to the outcome carried the team through every stage of its digital transformation.";
const initialQuote = "Their team's deep expertise and commitment to our success made all the difference.";

function DropZone({ title, hint, id }: { title: string; hint: string; id: string }) {
  return (
    <label htmlFor={id} className={dropZoneClass}>
      <div className="box-border w-[52px] h-[52px] shrink-0 flex flex-row gap-0 justify-center items-center bg-[#EAF3F5] rounded-[999px]">
        <CloudUpload size={24} className="text-[#2F6E80]" />
      </div>
      <div className="box-border w-fit h-fit shrink-0 flex flex-row gap-[4px] justify-start items-start">
        <span className={`text-[15px]/[20px] box-border text-[#2F6E80] ${font} font-medium text-left [white-space:nowrap]`}>Click to upload</span>
        <span className={`text-[15px]/[20px] box-border text-[#354A5F] ${font} font-normal text-left [white-space:nowrap]`}>or drag and drop</span>
      </div>
      <div className={`text-[13px]/[17px] box-border text-[#475E75] ${font} font-normal text-left [white-space:nowrap]`}>{hint}</div>
      <input id={id} type="file" accept="image/*" className="sr-only" aria-label={title} />
    </label>
  );
}

function ChevronField({ children }: { children: ReactNode }) {
  return (
    <div className={`${fieldClass} justify-between`}>
      {children}
      <ChevronDown size={18} className="text-[#475E75] shrink-0 pointer-events-none" />
    </div>
  );
}

export function EditCustomerStoryView() {
  const [title, setTitle] = useState("Transforming a manufacturer's supply chain with SAP S/4HANA");
  const [industry, setIndustry] = useState(industries[0]);
  const [service, setService] = useState(services[0]);
  const [narrative, setNarrative] = useState(initialNarrative);
  const [quote, setQuote] = useState(initialQuote);
  const [clientName, setClientName] = useState("Andi Wijaya");
  const [position, setPosition] = useState("CIO");
  const [company, setCompany] = useState("Manufacturing Corp");
  const [published, setPublished] = useState(true);
  const [featured, setFeatured] = useState(true);
  const [order, setOrder] = useState("1");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <div className="box-border w-full min-h-screen flex flex-row gap-0 justify-start items-start bg-[#F5F6F7] max-lg:flex-col">
      <AdminSidebar activeKey="testimonials" />

      <div className="box-border [flex:1_1_0] min-w-0 flex flex-col gap-0 justify-start items-start">
        <header className="box-border w-full h-[76px] shrink-0 flex flex-row gap-[24px] p-[0px_32px] justify-start items-center bg-[#FFFFFF] [border-width:0px_0px_1px_0px] [border-style:solid] [border-color:#D5DADD] max-lg:p-[0px_20px]">
          <div className="box-border [flex:1_1_0] min-w-0 h-fit flex flex-col gap-[2px] justify-start items-start">
            <div className={`text-[12px]/[16px] box-border text-[#475E75] ${font} font-normal text-left [white-space:nowrap]`}>Content / Testimonials / Edit</div>
            <h1 className={`text-[22px]/[29px] box-border text-[#000000] ${font} font-medium text-left [white-space:nowrap]`}>Edit Customer Story</h1>
          </div>
          <div className="box-border w-fit shrink-0 h-fit flex flex-row gap-[8px] justify-start items-center">
            <Link href="/" className="box-border w-fit shrink-0 h-fit flex flex-row gap-[6px] p-[8px_12px] justify-start items-center rounded-[8px] hover:bg-[#EAF3F5] transition-colors">
              <ExternalLink size={16} className="text-[#2F6E80]" />
              <span className={`text-[14px]/[18px] box-border text-[#2F6E80] ${font} font-medium text-left [white-space:nowrap]`}>View website</span>
            </Link>
            <button type="button" aria-label="Search" className="box-border w-[40px] shrink-0 h-[40px] flex flex-row gap-0 justify-center items-center rounded-[8px] hover:bg-[#EAF3F5] cursor-pointer transition-colors">
              <Search size={20} className="text-[#475E75]" />
            </button>
            <button type="button" aria-label="Notifications" className="box-border w-[40px] shrink-0 h-[40px] flex flex-row gap-0 justify-center items-center rounded-[8px] hover:bg-[#EAF3F5] cursor-pointer transition-colors">
              <Bell size={20} className="text-[#475E75]" />
            </button>
            <div className="box-border w-[36px] shrink-0 h-[36px] flex flex-row gap-0 justify-center items-center bg-[#A6CBD3] rounded-[999px]">
              <div className={`text-[13px]/[17px] box-border text-[#000354] ${font} font-medium text-left [white-space:nowrap]`}>AD</div>
            </div>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="box-border w-full h-fit flex flex-col gap-[24px] p-[32px] justify-start items-start max-lg:p-[20px]">
          <div className="box-border w-full h-fit flex flex-row gap-[24px] justify-start items-start max-lg:flex-col">
            <div className="box-border [flex:1_1_0] min-w-0 h-fit flex flex-col gap-[24px] justify-start items-start">
              <section className={cardClass}>
                <div className={cardTitleClass}>Story</div>
                <label className="box-border w-full h-fit shrink-0 flex flex-col gap-[8px] justify-start items-start">
                  <span className={labelClass}>Story title *</span>
                  <div className={fieldClass}>
                    <input value={title} onChange={(event) => setTitle(event.target.value)} className={inputClass} />
                  </div>
                </label>
                <div className="box-border w-full h-fit shrink-0 flex flex-row gap-[16px] justify-start items-start max-sm:flex-col">
                  <label className="box-border [flex:1_1_0] min-w-0 h-fit flex flex-col gap-[8px] justify-start items-start">
                    <span className={labelClass}>Industry</span>
                    <ChevronField>
                      <select value={industry} onChange={(event) => setIndustry(event.target.value)} className={selectClass}>
                        {industries.map((item) => (
                          <option key={item} value={item}>{item}</option>
                        ))}
                      </select>
                    </ChevronField>
                  </label>
                  <label className="box-border [flex:1_1_0] min-w-0 h-fit flex flex-col gap-[8px] justify-start items-start">
                    <span className={labelClass}>Service</span>
                    <ChevronField>
                      <select value={service} onChange={(event) => setService(event.target.value)} className={selectClass}>
                        {services.map((item) => (
                          <option key={item} value={item}>{item}</option>
                        ))}
                      </select>
                    </ChevronField>
                  </label>
                </div>
                <label className="box-border w-full h-fit shrink-0 flex flex-col gap-[8px] justify-start items-start">
                  <span className="box-border w-full h-fit shrink-0 flex flex-row gap-0 justify-between items-start">
                    <span className={labelClass}>Narrative *</span>
                    <span className={`text-[12px]/[16px] box-border text-[#475E75] ${font} font-normal text-left [white-space:nowrap]`}>
                      {narrative.length} / {NARRATIVE_MAX}
                    </span>
                  </span>
                  <div className="box-border w-full h-[120px] shrink-0 flex flex-row gap-0 p-[16px] justify-start items-start bg-[#FFFFFF] [outline:1px_solid_#475E75] [outline-offset:-0.5px] rounded-[8px] focus-within:[outline:2px_solid_#2F6E80] focus-within:[outline-offset:-1px]">
                    <textarea
                      value={narrative}
                      maxLength={NARRATIVE_MAX}
                      onChange={(event) => setNarrative(event.target.value)}
                      className={`box-border w-full h-full bg-transparent text-[16px]/[24px] text-[#223548] ${font} font-normal outline-none resize-none`}
                    />
                  </div>
                </label>
              </section>

              <section className={cardClass}>
                <div className={cardTitleClass}>Quote &amp; client</div>
                <label className="box-border w-full h-fit shrink-0 flex flex-col gap-[8px] justify-start items-start">
                  <span className="box-border w-full h-fit shrink-0 flex flex-row gap-0 justify-between items-start">
                    <span className={labelClass}>Quote *</span>
                    <span className={`text-[12px]/[16px] box-border text-[#475E75] ${font} font-normal text-left [white-space:nowrap]`}>
                      {quote.length} / {QUOTE_MAX}
                    </span>
                  </span>
                  <div className="box-border w-full h-[88px] shrink-0 flex flex-row gap-0 p-[16px] justify-start items-start bg-[#FFFFFF] [outline:1px_solid_#475E75] [outline-offset:-0.5px] rounded-[8px] focus-within:[outline:2px_solid_#2F6E80] focus-within:[outline-offset:-1px]">
                    <textarea
                      value={quote}
                      maxLength={QUOTE_MAX}
                      onChange={(event) => setQuote(event.target.value)}
                      className={`box-border w-full h-full bg-transparent text-[16px]/[24px] text-[#223548] ${font} font-normal outline-none resize-none`}
                    />
                  </div>
                </label>
                <div className="box-border w-full h-fit shrink-0 flex flex-row gap-[16px] justify-start items-start max-sm:flex-col">
                  <label className="box-border [flex:1_1_0] min-w-0 h-fit flex flex-col gap-[8px] justify-start items-start">
                    <span className={labelClass}>Client name *</span>
                    <div className={fieldClass}>
                      <input value={clientName} onChange={(event) => setClientName(event.target.value)} className={inputClass} />
                    </div>
                  </label>
                  <label className="box-border [flex:1_1_0] min-w-0 h-fit flex flex-col gap-[8px] justify-start items-start">
                    <span className={labelClass}>Position</span>
                    <div className={fieldClass}>
                      <input value={position} onChange={(event) => setPosition(event.target.value)} className={inputClass} />
                    </div>
                  </label>
                </div>
                <label className="box-border w-full h-fit shrink-0 flex flex-col gap-[8px] justify-start items-start">
                  <span className={labelClass}>Company name</span>
                  <div className={fieldClass}>
                    <input value={company} onChange={(event) => setCompany(event.target.value)} className={inputClass} />
                  </div>
                  <span className={`text-[12px]/[15px] box-border text-[#475E75] ${font} font-normal text-left [white-space:nowrap]`}>
                    Shown on the client card over the photo.
                  </span>
                </label>
              </section>

              <section className={cardClass}>
                <div className={cardTitleClass}>Media</div>
                <div className="box-border w-full h-fit shrink-0 flex flex-row gap-[16px] justify-start items-start max-sm:flex-col">
                  <div className="box-border [flex:1_1_0] min-w-0 h-fit flex flex-col gap-[8px] justify-start items-start">
                    <span className={labelClass}>Story photo *</span>
                    <DropZone id="story-photo" title="Story photo" hint="Landscape, at least 1200 × 1000 px" />
                  </div>
                  <div className="box-border [flex:1_1_0] min-w-0 h-fit flex flex-col gap-[8px] justify-start items-start">
                    <span className={labelClass}>Company logo (optional)</span>
                    <DropZone id="company-logo" title="Company logo" hint="PNG or SVG with transparent background" />
                  </div>
                </div>
              </section>
            </div>

            <div className="box-border w-[360px] max-lg:w-full shrink-0 h-fit flex flex-col gap-[24px] justify-start items-start">
              <section className={cardClass}>
                <div className={cardTitleClass}>Live preview</div>
                <div className="box-border w-full h-[200px] shrink-0 bg-cover bg-center rounded-[8px] overflow-hidden relative" style={{ backgroundImage: `url(${storyPhoto})` }}>
                  <div className="box-border w-fit h-fit absolute left-[12px] top-[132px] flex flex-row gap-[10px] p-[10px_12px] justify-start items-center bg-[#FFFFFF] rounded-[8px]">
                    <div className="box-border w-[32px] shrink-0 h-[32px] flex flex-row gap-0 justify-center items-center bg-[#EAF3F5] rounded-[4px]">
                      <Factory size={16} className="text-[#2F6E80]" />
                    </div>
                    <div className="box-border w-fit shrink-0 h-fit flex flex-col gap-[1px] justify-start items-start">
                      <div className={`text-[12px]/[16px] box-border text-[#000354] ${font} font-medium text-left [white-space:nowrap]`}>{company}</div>
                      <div className={`text-[11px]/[14px] box-border text-[#354A5F] ${font} font-normal text-left [white-space:nowrap]`}>{service}</div>
                    </div>
                  </div>
                </div>
                <div className="w-full h-fit flex flex-col gap-[8px] pl-[14px] [border-width:0px_0px_0px_3px] [border-style:solid] [border-color:#2F6E80] [margin:0px_0px_0px_-1.5px]">
                  <div className={`text-[15px]/[19px] box-border w-full text-[#2F6E80] ${font} font-medium text-left`}>{title}</div>
                  <div className={`text-[13px]/[20px] box-border w-full text-[#354A5F] ${font} font-normal text-left`}>“{quote}”</div>
                  <div className={`text-[12px]/[16px] box-border text-[#475E75] ${font} font-medium text-left [white-space:nowrap]`}>
                    {clientName} · {position}, {company}
                  </div>
                </div>
              </section>

              <section className={cardClass}>
                <div className={cardTitleClass}>Settings</div>
                <div className="box-border w-full h-fit shrink-0 flex flex-row gap-[16px] justify-between items-center">
                  <div className="box-border [flex:1_1_0] h-fit flex flex-col gap-[2px] justify-start items-start">
                    <div className={`text-[14px]/[18px] box-border text-[#000000] ${font} font-medium text-left [white-space:nowrap]`}>Published</div>
                    <div className={`text-[13px]/[17px] box-border w-full text-[#475E75] ${font} font-normal text-left`}>Shown in Customer Stories</div>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={published}
                    aria-label="Published"
                    onClick={() => setPublished(!published)}
                    className={`box-border w-[44px] shrink-0 h-[24px] flex flex-row gap-0 p-[2px] items-center rounded-[999px] cursor-pointer transition-colors ${
                      published ? "justify-end bg-[#2F6E80]" : "justify-start bg-[#D5DADD]"
                    }`}
                  >
                    <span className="box-border w-[20px] shrink-0 h-[20px] bg-[#FFFFFF] rounded-[50%]" />
                  </button>
                </div>
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={featured}
                  onClick={() => setFeatured(!featured)}
                  className="box-border w-full h-fit shrink-0 flex flex-row gap-[10px] justify-start items-center cursor-pointer text-left"
                >
                  <span
                    className={`box-border w-[20px] shrink-0 h-[20px] flex flex-row gap-0 justify-center items-center rounded-[4px] transition-colors ${
                      featured ? "bg-[#2F6E80]" : "bg-[#FFFFFF] [outline:1px_solid_#475E75] [outline-offset:-0.5px]"
                    }`}
                  >
                    {featured && <Check size={14} className="text-[#FFFFFF]" />}
                  </span>
                  <span className={`text-[14px]/[18px] box-border text-[#223548] ${font} font-normal text-left [white-space:nowrap]`}>
                    Featured: open first on homepage
                  </span>
                </button>
                <label className="box-border w-full h-fit shrink-0 flex flex-col gap-[8px] justify-start items-start">
                  <span className={labelClass}>Display order</span>
                  <div className={fieldClass}>
                    <input value={order} onChange={(event) => setOrder(event.target.value)} inputMode="numeric" className={inputClass} />
                  </div>
                </label>
              </section>

              <section className={cardClass}>
                <div className={cardTitleClass}>Actions</div>
                <button
                  type="submit"
                  className={`box-border w-full h-[48px] shrink-0 flex flex-row gap-[8px] p-[0px_24px] justify-center items-center bg-[#000354] hover:bg-[#0B1470] rounded-[8px] text-[16px]/[20px] text-[#FFFFFF] ${font} font-medium cursor-pointer transition-colors`}
                >
                  Save story
                </button>
                <Link href="/admin/customer-stories/edit" className={`box-border w-full text-[14px]/[18px] text-[#475E75] hover:text-[#000354] transition-colors ${font} font-medium text-center`}>
                  Cancel
                </Link>
              </section>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
