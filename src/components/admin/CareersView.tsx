"use client";

import Link from "next/link";
import { useState } from "react";
import { BriefcaseBusiness, Code, Eye, GripVertical, Pencil, Server, Trash2, type LucideIcon } from "lucide-react";

const font = "font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] ";

type Position = { title: string; category: string; Icon: LucideIcon; type: string; location: string; status: "Open" | "Closed"; updated: string };

const positions: Position[] = [
  { title: "Business Analyst (SAP S/4HANA) Consultant – Trainee", category: "FUNCTIONAL", Icon: BriefcaseBusiness, type: "Trainee", location: "Kemayoran HQ · client sites", status: "Open", updated: "Oct 20, 2026" },
  { title: "System Engineer / Database Administrator", category: "TECHNICAL", Icon: Server, type: "Full-time · Fresh grad", location: "Kemayoran HQ · client sites", status: "Open", updated: "Oct 20, 2026" },
  { title: "Application Developer / Programmer", category: "ABAPER", Icon: Code, type: "Full-time · Fresh grad", location: "Kemayoran HQ · client sites", status: "Open", updated: "Oct 20, 2026" },
];

const faqs = [
  "What does an SAP consultant do?",
  "How is the work environment?",
  "How does the work system work?",
  "What are PST's advantages among competitors?",
  "What is the career path of an SAP consultant?",
];

const tabs = ["All positions", "Open", "Closed"] as const;
type Tab = (typeof tabs)[number];

const iconButton = "box-border w-[32px] shrink-0 h-[32px] flex flex-row gap-0 justify-center items-center rounded-[8px] hover:bg-[#EAF3F5] cursor-pointer transition-colors";

export function CareersView() {
  const [tab, setTab] = useState<Tab>("All positions");
  const [questions, setQuestions] = useState(faqs);

  const visible = positions.filter((position) => tab === "All positions" || position.status === tab);
  const counts: Record<Tab, number> = {
    "All positions": positions.length,
    Open: positions.filter((position) => position.status === "Open").length,
    Closed: positions.filter((position) => position.status === "Closed").length,
  };

  return (
    <div className="box-border w-full h-fit shrink-0 flex flex-col gap-[24px] p-[32px] justify-start items-start max-lg:p-[20px]">
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
        <Link href="/admin/careers/edit" className={`box-border w-fit shrink-0 h-[44px] flex flex-row gap-[8px] p-[0px_24px] justify-center items-center bg-[#000354] hover:bg-[#0B1470] rounded-[8px] text-[15px]/[19px] text-[#FFFFFF] ${font}font-medium transition-colors`}>
          + New position
        </Link>
      </div>

      <div className="box-border w-full h-fit shrink-0 flex flex-col gap-0 justify-start items-start bg-[#FFFFFF] [outline:1px_solid_#D5DADD] [outline-offset:-0.5px] rounded-[12px] overflow-hidden">
        <div className="w-full h-fit shrink-0 flex flex-row gap-[16px] p-[12px_20px] justify-start items-start bg-[#F5F6F7] [border-width:0px_0px_1px_0px] [border-style:solid] [border-color:#D5DADD]">
          <div className={`text-[12px]/[16px] box-border [flex:1_1_0] text-[#475E75] ${font}font-medium tracking-[1px] text-left`}>POSITION</div>
          <div className={`text-[12px]/[16px] box-border w-[150px] shrink-0 text-[#475E75] ${font}font-medium tracking-[1px] text-left`}>TYPE</div>
          <div className={`text-[12px]/[16px] box-border w-[220px] shrink-0 text-[#475E75] ${font}font-medium tracking-[1px] text-left`}>LOCATION</div>
          <div className={`text-[12px]/[16px] box-border w-[110px] shrink-0 text-[#475E75] ${font}font-medium tracking-[1px] text-left`}>STATUS</div>
          <div className={`text-[12px]/[16px] box-border w-[120px] shrink-0 text-[#475E75] ${font}font-medium tracking-[1px] text-left`}>UPDATED</div>
          <div className="box-border w-[112px] shrink-0 h-[16px]" />
        </div>
        {visible.map((position) => (
          <div key={position.title} className="w-full h-fit shrink-0 flex flex-row gap-[16px] p-[16px_20px] justify-start items-center [border-width:0px_0px_1px_0px] [border-style:solid] [border-color:#EAECEE]">
            <div className="box-border [flex:1_1_0] min-w-0 h-fit flex flex-row gap-[14px] justify-start items-center">
              <div className="box-border w-[40px] shrink-0 h-[40px] flex flex-row gap-0 justify-center items-center bg-[#EAF3F5] rounded-[8px]">
                <position.Icon size={20} className="text-[#2F6E80]" />
              </div>
              <div className="box-border [flex:1_1_0] min-w-0 h-fit flex flex-col gap-[2px] justify-start items-start">
                <div className={`text-[11px]/[14px] box-border text-[#2F6E80] ${font}font-medium tracking-[1px] text-left [white-space:nowrap]`}>{position.category}</div>
                <div className={`text-[15px]/[20px] box-border w-full text-[#000000] ${font}font-medium text-left`}>{position.title}</div>
              </div>
            </div>
            <div className={`text-[14px]/[18px] box-border w-[150px] shrink-0 text-[#354A5F] ${font}font-normal text-left`}>{position.type}</div>
            <div className={`text-[14px]/[18px] box-border w-[220px] shrink-0 text-[#354A5F] ${font}font-normal text-left`}>{position.location}</div>
            <div className="box-border w-[110px] shrink-0 h-fit flex flex-row gap-0 justify-start items-start">
              <div className="box-border w-fit shrink-0 h-fit flex flex-row gap-[6px] p-[4px_10px] justify-start items-center bg-[#F5FAE5] rounded-[999px]">
                <div className="box-border w-[6px] shrink-0 h-[6px] bg-[#188918] rounded-[50%]" />
                <span className={`text-[12px]/[16px] box-border text-[#188918] ${font}font-medium text-left [white-space:nowrap]`}>{position.status}</span>
              </div>
            </div>
            <div className={`text-[14px]/[18px] box-border w-[120px] shrink-0 text-[#354A5F] ${font}font-normal text-left`}>{position.updated}</div>
            <div className="box-border w-[112px] shrink-0 h-fit flex flex-row gap-[4px] justify-end items-start">
              <button type="button" aria-label="Preview position" className={iconButton}>
                <Eye size={16} className="text-[#354A5F]" />
              </button>
              <Link href="/admin/careers/edit" aria-label="Edit position" className={iconButton}>
                <Pencil size={16} className="text-[#354A5F]" />
              </Link>
              <button type="button" aria-label="Delete position" className={iconButton}>
                <Trash2 size={16} className="text-[#D20A0A]" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="box-border w-full h-fit shrink-0 flex flex-col gap-0 justify-start items-start bg-[#FFFFFF] [outline:1px_solid_#D5DADD] [outline-offset:-0.5px] rounded-[12px] overflow-hidden">
        <div className="w-full h-fit shrink-0 flex flex-row gap-0 p-[18px_20px] justify-between items-center [border-width:0px_0px_1px_0px] [border-style:solid] [border-color:#D5DADD]">
          <div className="box-border w-fit shrink-0 h-fit flex flex-col gap-[2px] justify-start items-start">
            <div className={`text-[17px]/[22px] box-border text-[#000000] ${font}font-medium text-left [white-space:nowrap]`}>Career FAQ</div>
            <div className={`text-[13px]/[17px] box-border text-[#475E75] ${font}font-normal text-left [white-space:nowrap]`}>Shown at the bottom of the Career page · drag to reorder</div>
          </div>
          <button type="button" className={`box-border w-fit shrink-0 h-[40px] flex flex-row gap-[8px] p-[0px_24px] justify-center items-center bg-[#FFFFFF] [outline:1px_solid_#475E75] [outline-offset:-0.5px] rounded-[8px] text-[14px]/[18px] text-[#223548] ${font}font-medium cursor-pointer hover:bg-[#EAF3F5] transition-colors`}>
            + Add question
          </button>
        </div>
        {questions.map((question, index) => (
          <div key={question} className={`w-full h-fit shrink-0 flex flex-row gap-[14px] p-[14px_20px] justify-start items-center ${index < questions.length - 1 ? "[border-width:0px_0px_1px_0px] [border-style:solid] [border-color:#EAECEE]" : ""}`}>
            <GripVertical size={16} className="text-[#A9B4BE] shrink-0" />
            <div className={`text-[13px]/[17px] box-border w-[20px] shrink-0 text-[#475E75] ${font}font-medium text-left`}>{index + 1}</div>
            <div className={`text-[15px]/[20px] box-border [flex:1_1_0] min-w-0 text-[#000000] ${font}font-medium text-left`}>{question}</div>
            <div className="box-border w-fit shrink-0 h-fit flex flex-row gap-0 justify-start items-start">
              <div className="box-border w-fit shrink-0 h-fit flex flex-row gap-[6px] p-[4px_10px] justify-start items-center bg-[#F5FAE5] rounded-[999px]">
                <div className="box-border w-[6px] shrink-0 h-[6px] bg-[#188918] rounded-[50%]" />
                <span className={`text-[12px]/[16px] box-border text-[#188918] ${font}font-medium text-left [white-space:nowrap]`}>Published</span>
              </div>
            </div>
            <div className="box-border w-fit shrink-0 h-fit flex flex-row gap-[4px] justify-start items-start">
              <button type="button" aria-label={`Edit question ${index + 1}`} className={iconButton}>
                <Pencil size={16} className="text-[#354A5F]" />
              </button>
              <button type="button" aria-label={`Delete question ${index + 1}`} onClick={() => setQuestions(questions.filter((item) => item !== question))} className={iconButton}>
                <Trash2 size={16} className="text-[#D20A0A]" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
