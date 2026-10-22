"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronLeft, ChevronRight, GripVertical, Pencil, Search, Trash2 } from "lucide-react";

const font = "font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] ";

const HE = "Heavy Equipment & Manufacturing";
const MT = "Maritime & Transportation";
const MN = "Mining, Energy & Construction";
const FN = "Finance, Technology & Education";
const CG = "Consumer Goods";
const OT = "Other Industries";

type Client = { name: string; logo: string; industry: string; homepage: boolean };

const clients: Client[] = [
  { name: "PT United Tractors Pandu Engineering", logo: "utpe", industry: HE, homepage: true },
  { name: "PT Komatsu Undercarriage Indonesia", logo: "komatsu-undercarriage", industry: HE, homepage: true },
  { name: "PT Komatsu Reman Indonesia", logo: "reman", industry: HE, homepage: true },
  { name: "PT Dharma Polimetal Tbk", logo: "dharma-polimetal", industry: HE, homepage: false },
  { name: "PT Triatra Sinergia Pratama", logo: "triatra", industry: HE, homepage: true },
  { name: "PT Patria Maritime Lines", logo: "pml", industry: MT, homepage: true },
  { name: "PT Patria Maritim Perkasa", logo: "pmp", industry: MT, homepage: false },
  { name: "PT Kereta Cepat Indonesia China", logo: "kcic", industry: MT, homepage: true },
  { name: "Ithaca Resources", logo: "ithaca", industry: MN, homepage: true },
  { name: "NusaCipta Construction", logo: "nusacipta", industry: MN, homepage: false },
];

const filters: { label: string; count: number; industry: string | null }[] = [
  { label: "All", count: 18, industry: null },
  { label: "Heavy Equipment", count: 5, industry: HE },
  { label: "Maritime", count: 3, industry: MT },
  { label: "Mining", count: 2, industry: MN },
  { label: "Finance", count: 3, industry: FN },
  { label: "Consumer", count: 1, industry: CG },
  { label: "Other", count: 4, industry: OT },
];

const iconButton = "box-border w-[32px] shrink-0 h-[32px] flex flex-row gap-0 justify-center items-center rounded-[8px] hover:bg-[#EAF3F5] cursor-pointer transition-colors";

export function ClientsView() {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [homepage, setHomepage] = useState(clients.map((client) => client.homepage));

  const active = filters.find((item) => item.label === filter) ?? filters[0];
  const needle = query.trim().toLowerCase();
  const visible = clients
    .map((client, index) => ({ client, index }))
    .filter(({ client }) => (active.industry === null || client.industry === active.industry) && client.name.toLowerCase().includes(needle));

  return (
    <div className="box-border w-full h-fit shrink-0 flex flex-col gap-[24px] p-[32px] justify-start items-start max-lg:p-[20px]">
      <div className="box-border w-full h-fit shrink-0 flex flex-row flex-wrap gap-[16px] justify-between items-center">
        <div role="tablist" className="box-border w-fit shrink-0 h-fit flex flex-row flex-wrap gap-[8px] justify-start items-start">
          {filters.map((item) => {
            const isActive = filter === item.label;
            return (
              <button
                key={item.label}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setFilter(item.label)}
                className={`box-border w-fit shrink-0 h-fit flex flex-row gap-[8px] p-[8px_12px] justify-start items-center rounded-[999px] cursor-pointer transition-colors ${
                  isActive ? "bg-[#000354] [outline:1px_solid_#000354] [outline-offset:-0.5px]" : "bg-[#FFFFFF] hover:bg-[#EAF3F5] [outline:1px_solid_#D5DADD] [outline-offset:-0.5px]"
                }`}
              >
                <span className={`text-[13px]/[17px] box-border ${isActive ? "text-[#FFFFFF]" : "text-[#223548]"} ${font}text-left [white-space:nowrap]`}>{item.label}</span>
                <span className={`text-[12px]/[16px] box-border ${isActive ? "text-[#A6CBD3]" : "text-[#475E75]"} ${font}text-left [white-space:nowrap]`}>{item.count}</span>
              </button>
            );
          })}
        </div>
        <Link href="/admin/clients/edit" className={`box-border w-fit shrink-0 h-[44px] flex flex-row gap-[8px] p-[0px_24px] justify-center items-center bg-[#000354] hover:bg-[#0B1470] rounded-[8px] text-[15px]/[19px] text-[#FFFFFF] ${font}font-medium transition-colors`}>
          + Add client
        </Link>
      </div>

      <div className="box-border w-full h-fit shrink-0 flex flex-col gap-0 justify-start items-start bg-[#FFFFFF] [outline:1px_solid_#D5DADD] [outline-offset:-0.5px] rounded-[12px] overflow-hidden">
        <div className="w-full h-fit shrink-0 flex flex-row flex-wrap gap-[12px] p-[16px_20px] justify-between items-center [border-width:0px_0px_1px_0px] [border-style:solid] [border-color:#D5DADD]">
          <label className="box-border w-[320px] max-w-full h-[40px] shrink-0 flex flex-row gap-[10px] p-[0px_16px] justify-start items-center bg-[#F5F6F7] [outline:1px_solid_#D5DADD] [outline-offset:-0.5px] rounded-[8px]">
            <Search size={20} className="text-[#475E75] shrink-0" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search clients"
              className={`box-border w-full min-w-0 bg-transparent text-[14px]/[18px] text-[#223548] ${font}font-normal outline-none placeholder:text-[#475E75]`}
            />
          </label>
          <span className={`text-[13px]/[17px] box-border text-[#475E75] ${font}font-normal text-left [white-space:nowrap]`}>Drag rows to change the order on the website</span>
        </div>

        <div className="w-full h-fit shrink-0 flex flex-row gap-[16px] p-[12px_20px] justify-start items-start bg-[#F5F6F7] [border-width:0px_0px_1px_0px] [border-style:solid] [border-color:#D5DADD]">
          <div className="box-border w-[16px] shrink-0 h-[16px]" />
          <div className={`text-[12px]/[16px] box-border [flex:1_1_0] text-[#475E75] ${font}font-medium tracking-[1px] text-left`}>CLIENT</div>
          <div className={`text-[12px]/[16px] box-border w-[230px] shrink-0 text-[#475E75] ${font}font-medium tracking-[1px] text-left`}>INDUSTRY</div>
          <div className={`text-[12px]/[16px] box-border w-[130px] shrink-0 text-[#475E75] ${font}font-medium tracking-[1px] text-left`}>HOMEPAGE STRIP</div>
          <div className={`text-[12px]/[16px] box-border w-[100px] shrink-0 text-[#475E75] ${font}font-medium tracking-[1px] text-left`}>STATUS</div>
          <div className="box-border w-[80px] shrink-0 h-[16px]" />
        </div>

        {visible.map(({ client, index }) => (
          <div key={client.name} className="w-full h-fit shrink-0 flex flex-row gap-[16px] p-[12px_20px] justify-start items-center [border-width:0px_0px_1px_0px] [border-style:solid] [border-color:#EAECEE]">
            <GripVertical size={16} className="text-[#A9B4BE] shrink-0" />
            <div className="box-border [flex:1_1_0] min-w-0 h-fit flex flex-row gap-[14px] justify-start items-center">
              <div className="box-border w-[72px] shrink-0 h-[48px] flex flex-row gap-0 p-[6px_8px] justify-start items-start [outline:1px_solid_#D5DADD] [outline-offset:-0.5px] rounded-[8px]">
                <div className="box-border [flex:1_1_0] h-full bg-no-repeat bg-contain bg-center" style={{ backgroundImage: `url(/images/pst/clients/${client.logo}.png)` }} />
              </div>
              <div className="box-border [flex:1_1_0] min-w-0 h-fit flex flex-col gap-[2px] justify-start items-start">
                <div className={`text-[15px]/[20px] box-border w-full text-[#000000] ${font}font-medium text-left`}>{client.name}</div>
                <div className={`text-[12px]/[16px] box-border text-[#A9B4BE] ${font}font-normal text-left [white-space:nowrap]`}>No website added</div>
              </div>
            </div>
            <div className={`text-[14px]/[18px] box-border w-[230px] shrink-0 text-[#354A5F] ${font}font-normal text-left`}>{client.industry}</div>
            <div className="box-border w-[130px] shrink-0 h-fit flex flex-row gap-0 justify-start items-start">
              <button
                type="button"
                role="switch"
                aria-checked={homepage[index]}
                aria-label={`Show ${client.name} on homepage strip`}
                onClick={() => setHomepage(homepage.map((value, position) => (position === index ? !value : value)))}
                className={`box-border w-[36px] shrink-0 h-[20px] flex flex-row gap-0 p-[2px] items-center rounded-[999px] cursor-pointer transition-colors ${homepage[index] ? "justify-end bg-[#2F6E80]" : "justify-start bg-[#CAD0D5]"}`}
              >
                <span className="box-border w-[16px] shrink-0 h-[16px] bg-[#FFFFFF] rounded-[50%]" />
              </button>
            </div>
            <div className="box-border w-[100px] shrink-0 h-fit flex flex-row gap-0 justify-start items-start">
              <div className="box-border w-fit shrink-0 h-fit flex flex-row gap-[6px] p-[4px_10px] justify-start items-center bg-[#F5FAE5] rounded-[999px]">
                <div className="box-border w-[6px] shrink-0 h-[6px] bg-[#188918] rounded-[50%]" />
                <span className={`text-[12px]/[16px] box-border text-[#188918] ${font}font-medium text-left [white-space:nowrap]`}>Active</span>
              </div>
            </div>
            <div className="box-border w-[80px] shrink-0 h-fit flex flex-row gap-[4px] justify-end items-start">
              <Link href="/admin/clients/edit" aria-label={`Edit ${client.name}`} className={iconButton}>
                <Pencil size={16} className="text-[#354A5F]" />
              </Link>
              <button type="button" aria-label={`Delete ${client.name}`} className={iconButton}>
                <Trash2 size={16} className="text-[#D20A0A]" />
              </button>
            </div>
          </div>
        ))}

        <div className="w-full h-fit shrink-0 flex flex-row gap-0 p-[14px_20px] justify-between items-center [border-width:1px_0px_0px_0px] [border-style:solid] [border-color:#D5DADD]">
          <span className={`text-[13px]/[17px] box-border text-[#475E75] ${font}font-normal text-left [white-space:nowrap]`}>Showing 1–10 of 18 clients</span>
          <div className="box-border w-fit shrink-0 h-fit flex flex-row gap-[6px] justify-start items-start">
            <span aria-label="Previous page" className={`box-border w-[32px] shrink-0 h-[32px] flex flex-row gap-0 justify-center items-center bg-[#FFFFFF] [outline:1px_solid_#D5DADD] [outline-offset:-0.5px] rounded-[8px]`}>
              <ChevronLeft size={16} className="text-[#354A5F]" />
            </span>
            <span className={`box-border w-[32px] shrink-0 h-[32px] flex flex-row gap-0 justify-center items-center bg-[#000354] [outline:1px_solid_#000354] [outline-offset:-0.5px] rounded-[8px] text-[13px]/[17px] text-[#FFFFFF] ${font}font-medium`}>1</span>
            <span className={`box-border w-[32px] shrink-0 h-[32px] flex flex-row gap-0 justify-center items-center bg-[#FFFFFF] [outline:1px_solid_#D5DADD] [outline-offset:-0.5px] rounded-[8px] text-[13px]/[17px] text-[#223548] ${font}font-medium`}>2</span>
            <span aria-label="Next page" className={`box-border w-[32px] shrink-0 h-[32px] flex flex-row gap-0 justify-center items-center bg-[#FFFFFF] [outline:1px_solid_#D5DADD] [outline-offset:-0.5px] rounded-[8px]`}>
              <ChevronRight size={16} className="text-[#354A5F]" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
