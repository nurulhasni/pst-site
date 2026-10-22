"use client";

import Link from "next/link";
import { Eye, Factory, GripVertical, Image as ImageIcon, Pencil, Plus, ShoppingBag, Star, Trash2, TriangleAlert, Zap, type LucideIcon } from "lucide-react";

const font = "font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] ";

type Story = {
  title: string;
  industry: string;
  IndustryIcon: LucideIcon;
  author: string;
  photo?: string;
  featured?: boolean;
};

const stories: Story[] = [
  {
    title: "Transforming a manufacturer's supply chain with SAP S/4HANA",
    industry: "Manufacturing Corp",
    IndustryIcon: Factory,
    author: "Andi Wijaya · CIO · SAP Solution",
    photo: "https://images.unsplash.com/photo-1653290523116-662a6e8c4b88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3OTI2Mzg0MDF8&ixlib=rb-4.1.0&q=80&w=1080",
    featured: true,
  },
  {
    title: "Turning an implementation into a strategic partnership",
    industry: "Retail Group",
    IndustryIcon: ShoppingBag,
    author: "Siti Rahayu · Finance Director · SAP Solution",
  },
  {
    title: "Keeping energy operations running smoothly for years",
    industry: "Energy Sector client",
    IndustryIcon: Zap,
    author: "Budi Santoso · IT Manager · SAP Support & Outsourcing",
  },
];

const iconButton = "box-border w-[32px] shrink-0 h-[32px] flex flex-row gap-0 justify-center items-center rounded-[8px] hover:bg-[#EAF3F5] cursor-pointer transition-colors";

export function TestimonialsView() {
  return (
    <div className="box-border w-full h-fit shrink-0 flex flex-col gap-[24px] p-[32px] justify-start items-start max-lg:p-[20px]">
      <div className="box-border w-full h-fit shrink-0 flex flex-row flex-wrap gap-[16px] justify-between items-center">
        <div className="box-border w-fit shrink-0 h-fit flex flex-col gap-[2px] justify-start items-start">
          <div className={`text-[15px]/[20px] box-border text-[#000000] ${font}font-medium text-left [white-space:nowrap]`}>3 stories · 3 published</div>
          <div className={`text-[13px]/[17px] box-border text-[#475E75] ${font}font-normal text-left [white-space:nowrap]`}>The featured story opens first in the Customer Stories section on the homepage.</div>
        </div>
        <Link href="/admin/customer-stories/edit" className={`box-border w-fit shrink-0 h-[44px] flex flex-row gap-[8px] p-[0px_24px] justify-center items-center bg-[#000354] hover:bg-[#0B1470] rounded-[8px] text-[15px]/[19px] text-[#FFFFFF] ${font}font-medium transition-colors`}>
          <Plus size={16} className="text-[#FFFFFF]" />
          New story
        </Link>
      </div>

      <div className="box-border w-full h-fit shrink-0 flex flex-col gap-[16px] justify-start items-start">
        {stories.map((story) => (
          <article
            key={story.title}
            className={`box-border w-full h-fit shrink-0 flex flex-row flex-wrap gap-[20px] p-[16px] justify-start items-center bg-[#FFFFFF] rounded-[12px] ${
              story.featured ? "[outline:1.5px_solid_#2F6E80] [outline-offset:-0.75px]" : "[outline:1px_solid_#D5DADD] [outline-offset:-0.5px]"
            }`}
          >
            <GripVertical size={16} className="text-[#A9B4BE] shrink-0" />
            <div
              className={`box-border w-[140px] shrink-0 h-[96px] flex flex-row gap-0 justify-center items-center rounded-[8px] overflow-hidden bg-cover bg-center ${story.photo ? "" : "bg-[#EAF3F5]"}`}
              style={story.photo ? { backgroundImage: `url(${story.photo})` } : undefined}
            >
              {!story.photo && <ImageIcon size={24} className="text-[#2F6E80]" />}
            </div>
            <div className="box-border [flex:1_1_0] min-w-[240px] h-fit flex flex-col gap-[8px] justify-start items-start">
              <div className="box-border w-fit h-fit shrink-0 flex flex-row gap-[8px] justify-start items-center">
                <div className="box-border w-fit shrink-0 h-fit flex flex-row gap-[6px] p-[3px_8px] justify-start items-center bg-[#EAF3F5] rounded-[999px]">
                  <story.IndustryIcon size={12} className="text-[#2F6E80]" />
                  <span className={`text-[12px]/[16px] box-border text-[#2F6E80] ${font}font-medium text-left [white-space:nowrap]`}>{story.industry}</span>
                </div>
                {story.featured && (
                  <div className="box-border w-fit shrink-0 h-fit flex flex-row gap-[4px] p-[3px_8px] justify-start items-center bg-[#000354] rounded-[999px]">
                    <Star size={12} className="text-[#A6CBD3]" />
                    <span className={`text-[12px]/[16px] box-border text-[#FFFFFF] ${font}font-medium text-left [white-space:nowrap]`}>Featured</span>
                  </div>
                )}
              </div>
              <div className={`text-[17px]/[22px] box-border w-full text-[#000000] ${font}font-medium text-left`}>{story.title}</div>
              <div className={`text-[13px]/[17px] box-border text-[#475E75] ${font}font-normal text-left [white-space:nowrap]`}>{story.author}</div>
              {!story.photo && (
                <div className="box-border w-fit h-fit shrink-0 flex flex-row gap-[6px] justify-start items-center">
                  <TriangleAlert size={14} className="text-[#E76500]" />
                  <span className={`text-[12px]/[16px] box-border text-[#E76500] ${font}font-medium text-left [white-space:nowrap]`}>No story photo yet</span>
                </div>
              )}
            </div>
            <div className="box-border w-[110px] shrink-0 h-fit flex flex-row gap-0 justify-start items-start">
              <div className="box-border w-fit shrink-0 h-fit flex flex-row gap-[6px] p-[4px_10px] justify-start items-center bg-[#F5FAE5] rounded-[999px]">
                <div className="box-border w-[6px] shrink-0 h-[6px] bg-[#188918] rounded-[50%]" />
                <span className={`text-[12px]/[16px] box-border text-[#188918] ${font}font-medium text-left [white-space:nowrap]`}>Published</span>
              </div>
            </div>
            <div className="box-border w-fit shrink-0 h-fit flex flex-row gap-[4px] justify-start items-start">
              <button type="button" aria-label="Preview story" className={iconButton}>
                <Eye size={16} className="text-[#354A5F]" />
              </button>
              <Link href="/admin/customer-stories/edit" aria-label="Edit story" className={iconButton}>
                <Pencil size={16} className="text-[#354A5F]" />
              </Link>
              <button type="button" aria-label="Delete story" className={iconButton}>
                <Trash2 size={16} className="text-[#D20A0A]" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
