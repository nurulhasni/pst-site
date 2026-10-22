"use client";

import Link from "next/link";
import { useState } from "react";
import { House, LayoutGrid, List, Plus, Check } from "lucide-react";

const font = "font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif]";

type Status = "Published" | "Draft";

type Tile = {
  title: string;
  category: "Team" | "Projects" | "Events" | "Office";
  status: Status;
  photo: string;
  homepage?: boolean;
};

const tiles: Tile[] = [
  { title: "Team at the PST office", category: "Team", status: "Published", photo: "PSt.jpg", homepage: true },
  { title: "Project review meeting", category: "Projects", status: "Published", photo: "Gallery-2.png" },
  { title: "PST team gathering", category: "Team", status: "Published", photo: "Gallery-3.png", homepage: true },
  { title: "Client workshop session", category: "Projects", status: "Published", photo: "Gallery-4.png" },
  { title: "Business process mapping", category: "Projects", status: "Published", photo: "Gallery-5.png" },
  { title: "Consultant training", category: "Events", status: "Draft", photo: "Gallery-7.png" },
  { title: "Implementation kickoff", category: "Projects", status: "Published", photo: "Gallery-8.png" },
  { title: "Weekly project sync", category: "Events", status: "Published", photo: "Gallery-9.png" },
  { title: "Online meeting with client", category: "Events", status: "Draft", photo: "Gallery-10.jpg" },
  { title: "Words of team member", category: "Office", status: "Published", photo: "LN0A5205_2.jpg" },
];

const categories = ["All", "Events", "Projects", "Team", "Office"] as const;

const statusStyle: Record<Status, { bg: string; text: string; dot: string }> = {
  Published: { bg: "#F5FAE5", text: "#188918", dot: "#188918" },
  Draft: { bg: "#EAECEE", text: "#354A5F", dot: "#354A5F" },
};

export function GalleryView() {
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const visible = tiles.map((tile, index) => ({ tile, index })).filter(({ tile }) => category === "All" || tile.category === category);

  function toggle(index: number) {
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  return (
    <div className="box-border w-full h-fit shrink-0 flex flex-col gap-[24px] p-[32px] justify-start items-start max-lg:p-[20px]">
      <div className="box-border w-full h-fit shrink-0 flex flex-row flex-wrap gap-[16px] justify-between items-center">
        <div role="tablist" className="box-border w-fit shrink-0 h-fit flex flex-row flex-wrap gap-[8px] justify-start items-start">
          {categories.map((item) => {
            const count = item === "All" ? tiles.length : tiles.filter((tile) => tile.category === item).length;
            const isActive = category === item;
            return (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setCategory(item)}
                className={`box-border w-fit shrink-0 h-fit flex flex-row gap-[8px] p-[8px_14px] justify-start items-center rounded-[999px] cursor-pointer transition-colors ${
                  isActive ? "bg-[#000354] [outline:1px_solid_#000354] [outline-offset:-0.5px]" : "bg-[#FFFFFF] hover:bg-[#EAF3F5] [outline:1px_solid_#D5DADD] [outline-offset:-0.5px]"
                }`}
              >
                <span className={`text-[14px]/[18px] box-border ${isActive ? "text-[#FFFFFF]" : "text-[#223548]"} ${font} font-medium text-left [white-space:nowrap]`}>{item}</span>
                <span className={`text-[12px]/[16px] box-border ${isActive ? "text-[#A6CBD3]" : "text-[#475E75]"} ${font} font-medium text-left [white-space:nowrap]`}>{count}</span>
              </button>
            );
          })}
        </div>
        <div className="box-border w-fit shrink-0 h-fit flex flex-row gap-[12px] justify-start items-center">
          <div role="group" aria-label="View" className="box-border w-fit shrink-0 h-fit flex flex-row gap-[4px] p-[4px] justify-start items-start bg-[#FFFFFF] [outline:1px_solid_#D5DADD] [outline-offset:-0.5px] rounded-[8px]">
            <button type="button" aria-label="Grid view" aria-pressed={view === "grid"} onClick={() => setView("grid")} className={`box-border w-[32px] shrink-0 h-[32px] flex flex-row gap-0 justify-center items-center rounded-[4px] cursor-pointer ${view === "grid" ? "bg-[#EAF3F5]" : "bg-[#FFFFFF00] hover:bg-[#EAF3F5]"}`}>
              <LayoutGrid size={16} className={view === "grid" ? "text-[#2F6E80]" : "text-[#475E75]"} />
            </button>
            <button type="button" aria-label="List view" aria-pressed={view === "list"} onClick={() => setView("list")} className={`box-border w-[32px] shrink-0 h-[32px] flex flex-row gap-0 justify-center items-center rounded-[4px] cursor-pointer ${view === "list" ? "bg-[#EAF3F5]" : "bg-[#FFFFFF00] hover:bg-[#EAF3F5]"}`}>
              <List size={16} className={view === "list" ? "text-[#2F6E80]" : "text-[#475E75]"} />
            </button>
          </div>
          <Link href="/admin/gallery/upload" className={`box-border w-fit shrink-0 h-[44px] flex flex-row gap-[8px] p-[0px_24px] justify-center items-center bg-[#000354] hover:bg-[#0B1470] rounded-[8px] text-[15px]/[19px] text-[#FFFFFF] ${font} font-medium transition-colors`}>
            + Upload images
          </Link>
        </div>
      </div>

      <div className={`box-border w-full h-fit shrink-0 flex flex-row flex-wrap gap-[20px] justify-start items-start ${view === "list" ? "flex-col" : ""}`}>
        {visible.map(({ tile, index }) => {
          const style = statusStyle[tile.status];
          const isSelected = selected.has(index);
          return (
            <article
              key={tile.title}
              className={`box-border [flex:1_1_220px] min-w-[220px] h-fit flex ${view === "list" ? "flex-row" : "flex-col"} gap-0 justify-start items-start bg-[#FFFFFF] [outline:1px_solid_#D5DADD] [outline-offset:-0.5px] rounded-[12px] overflow-hidden`}
            >
              <div className={`box-border relative shrink-0 bg-no-repeat bg-cover bg-center ${view === "list" ? "w-[220px] h-[130px]" : "w-full h-[170px]"}`} style={{ backgroundImage: `url(/images/pst/gallery/${tile.photo})` }}>
                <div className="box-border w-[236px] h-fit absolute left-[12px] top-[12px] flex flex-row gap-0 justify-between items-start">
                  <button
                    type="button"
                    role="checkbox"
                    aria-checked={isSelected}
                    aria-label={`Select ${tile.title}`}
                    onClick={() => toggle(index)}
                    className={`box-border w-[22px] shrink-0 h-[22px] flex flex-row gap-0 justify-center items-center rounded-[4px] cursor-pointer ${isSelected ? "bg-[#2F6E80]" : "bg-[#FFFFFFE6] [outline:1px_solid_#475E75] [outline-offset:-0.5px]"}`}
                  >
                    {isSelected && <Check size={14} className="text-[#FFFFFF]" />}
                  </button>
                  {tile.homepage && (
                    <div className="box-border w-fit shrink-0 h-fit flex flex-row gap-[4px] p-[3px_8px] justify-start items-center bg-[#000354] rounded-[999px]">
                      <House size={12} className="text-[#A6CBD3] shrink-0" />
                      <span className={`text-[11px]/[14px] box-border text-[#FFFFFF] ${font} font-medium text-left [white-space:nowrap]`}>Homepage</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="box-border [flex:1_1_0] min-w-0 h-fit flex flex-col gap-[8px] p-[14px_16px] justify-start items-start">
                <div className={`text-[15px]/[20px] box-border w-full text-[#000000] ${font} font-medium text-left`}>{tile.title}</div>
                <div className="box-border w-full h-fit shrink-0 flex flex-row gap-0 justify-between items-center">
                  <span className={`text-[13px]/[17px] box-border text-[#475E75] ${font} font-normal text-left [white-space:nowrap]`}>{tile.category}</span>
                  <div className="box-border w-fit shrink-0 h-fit flex flex-row gap-[6px] p-[4px_10px] justify-start items-center rounded-[999px]" style={{ backgroundColor: style.bg }}>
                    <div className="box-border w-[6px] shrink-0 h-[6px] rounded-[50%]" style={{ backgroundColor: style.dot }} />
                    <span className={`text-[12px]/[16px] box-border ${font} font-medium text-left [white-space:nowrap]`} style={{ color: style.text }}>
                      {tile.status}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          );
        })}

        <Link
          href="/admin/gallery/upload"
          className="box-border [flex:1_1_220px] min-w-[220px] h-[250px] flex flex-col gap-[10px] justify-center items-center bg-[#FFFFFF] [outline:1.5px_solid_#A9B4BE] [outline-offset:-0.75px] rounded-[12px] hover:bg-[#EAF3F5] transition-colors"
        >
          <div className="box-border w-[48px] h-[48px] shrink-0 flex flex-row gap-0 justify-center items-center bg-[#EAF3F5] rounded-[999px]">
            <Plus size={22} className="text-[#2F6E80]" />
          </div>
          <span className={`text-[15px]/[20px] box-border text-[#2F6E80] ${font} font-medium text-left [white-space:nowrap]`}>Upload images</span>
        </Link>
      </div>
    </div>
  );
}
