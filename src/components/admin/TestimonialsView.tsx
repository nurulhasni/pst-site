"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { Building2, Eye, Factory, Image as ImageIcon, Pencil, Plus, ShoppingBag, Star, Trash2, TriangleAlert, Zap, type LucideIcon } from "lucide-react";
import { AdminNotice } from "@/components/admin/AdminUi";
import { deleteStory, importStories } from "@/app/admin/testimonials/actions";
import type { FormState } from "@/lib/adminForms";
import { attribution, type Story } from "@/lib/storyModel";

const font = "font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] ";

const iconButton = "box-border w-[32px] shrink-0 h-[32px] flex flex-row gap-0 justify-center items-center rounded-[8px] hover:bg-[#EAF3F5] cursor-pointer transition-colors";
const primaryButton = `box-border w-fit shrink-0 h-[40px] flex flex-row gap-[8px] p-[0px_20px] justify-center items-center bg-[#000354] hover:bg-[#0B1470] disabled:opacity-60 disabled:cursor-wait rounded-[8px] text-[14px]/[18px] text-[#FFFFFF] ${font}font-medium cursor-pointer transition-colors`;

function industryIcon(industry: string): LucideIcon {
  if (/manufactur/i.test(industry)) return Factory;
  if (/retail|consumer/i.test(industry)) return ShoppingBag;
  if (/energy/i.test(industry)) return Zap;
  return Building2;
}

// `stories` arrive in homepage order: the first published one is the one that opens first
export function TestimonialsView({ stories, imported }: { stories: Story[]; imported: boolean }) {
  const [confirming, setConfirming] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [pending, startTransition] = useTransition();

  const published = stories.filter((s) => s.published);
  const openingId = published[0]?.id;

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
      {!imported && (
        <div className="box-border w-full h-fit shrink-0 flex flex-row flex-wrap gap-[16px] p-[20px] justify-between items-center bg-[#EAF3F5] rounded-[12px]">
          <div className="box-border [flex:1_1_320px] min-w-0 h-fit flex flex-col gap-[4px]">
            <div className={`text-[15px]/[20px] text-[#000354] ${font}font-medium`}>Customer stories aren’t in the Google Sheet yet</div>
            <div className={`text-[14px]/[20px] text-[#354A5F] ${font}font-normal`}>
              Below are the stories the homepage shows today. Import them to the “Customer Stories” tab, then replace the placeholder text in the second one.
            </div>
          </div>
          <button type="button" disabled={pending} onClick={() => run(importStories)} className={primaryButton}>
            {pending ? "Importing…" : "Import to Google Sheet"}
          </button>
        </div>
      )}
      {message && <AdminNotice>{message}</AdminNotice>}

      <div className="box-border w-full h-fit shrink-0 flex flex-row flex-wrap gap-[16px] justify-between items-center">
        <div className="box-border w-fit max-w-full shrink-0 h-fit flex flex-col gap-[2px] justify-start items-start">
          <div className={`text-[15px]/[20px] box-border text-[#000000] ${font}font-medium text-left [white-space:nowrap]`}>
            {stories.length} {stories.length === 1 ? "story" : "stories"} · {published.length} published
          </div>
          <div className={`text-[13px]/[17px] box-border text-[#475E75] ${font}font-normal text-left`}>The featured story opens first in the Customer Stories section on the homepage.</div>
        </div>
        {imported && (
          <Link href="/admin/customer-stories/edit" className={`box-border w-fit shrink-0 h-[44px] flex flex-row gap-[8px] p-[0px_24px] justify-center items-center bg-[#000354] hover:bg-[#0B1470] rounded-[8px] text-[15px]/[19px] text-[#FFFFFF] ${font}font-medium transition-colors`}>
            <Plus size={16} className="text-[#FFFFFF]" />
            New story
          </Link>
        )}
      </div>

      {stories.length === 0 && (
        <div className={`box-border w-full p-[24px] bg-[#FFFFFF] [outline:1px_solid_#D5DADD] [outline-offset:-0.5px] rounded-[12px] text-[14px]/[20px] text-[#475E75] ${font}font-normal`}>
          No stories yet. The homepage keeps its built-in stories until one is published.
        </div>
      )}

      <div className="box-border w-full h-fit shrink-0 flex flex-col gap-[16px] justify-start items-start">
        {stories.map((story) => {
          const opensFirst = story.id === openingId;
          const IndustryIcon = industryIcon(story.industry);
          const byline = [attribution(story), story.service].filter(Boolean).join(" · ");
          return (
            <article
              key={story.id}
              className={`box-border w-full h-fit shrink-0 flex flex-row flex-wrap gap-[20px] p-[16px] justify-start items-center bg-[#FFFFFF] rounded-[12px] ${
                opensFirst ? "[outline:1.5px_solid_#2F6E80] [outline-offset:-0.75px]" : "[outline:1px_solid_#D5DADD] [outline-offset:-0.5px]"
              }`}
            >
              <div
                className={`box-border w-[140px] shrink-0 h-[96px] flex flex-row gap-0 justify-center items-center rounded-[8px] overflow-hidden bg-cover bg-center ${story.image ? "" : "bg-[#EAF3F5]"}`}
                style={story.image ? { backgroundImage: `url(${story.image})` } : undefined}
              >
                {!story.image && <ImageIcon size={24} className="text-[#2F6E80]" />}
              </div>
              <div className="box-border [flex:1_1_0] min-w-[240px] h-fit flex flex-col gap-[8px] justify-start items-start">
                <div className="box-border w-fit max-w-full h-fit shrink-0 flex flex-row flex-wrap gap-[8px] justify-start items-center">
                  {(story.company || story.industry) && (
                    <div className="box-border w-fit shrink-0 h-fit flex flex-row gap-[6px] p-[3px_8px] justify-start items-center bg-[#EAF3F5] rounded-[999px]">
                      <IndustryIcon size={12} className="text-[#2F6E80]" />
                      <span className={`text-[12px]/[16px] box-border text-[#2F6E80] ${font}font-medium text-left [white-space:nowrap]`}>{story.company || story.industry}</span>
                    </div>
                  )}
                  {opensFirst && (
                    <div className="box-border w-fit shrink-0 h-fit flex flex-row gap-[4px] p-[3px_8px] justify-start items-center bg-[#000354] rounded-[999px]">
                      <Star size={12} className="text-[#A6CBD3]" />
                      <span className={`text-[12px]/[16px] box-border text-[#FFFFFF] ${font}font-medium text-left [white-space:nowrap]`}>Featured</span>
                    </div>
                  )}
                </div>
                <div className={`text-[17px]/[22px] box-border w-full text-[#000000] ${font}font-medium text-left`}>{story.title}</div>
                {byline && <div className={`text-[13px]/[17px] box-border text-[#475E75] ${font}font-normal text-left`}>{byline}</div>}
                {!story.image && (
                  <div className="box-border w-fit h-fit shrink-0 flex flex-row gap-[6px] justify-start items-center">
                    <TriangleAlert size={14} className="text-[#E76500]" />
                    <span className={`text-[12px]/[16px] box-border text-[#E76500] ${font}font-medium text-left [white-space:nowrap]`}>No story photo yet · a stock photo is shown</span>
                  </div>
                )}
              </div>
              <div className="box-border w-[110px] shrink-0 h-fit flex flex-row gap-0 justify-start items-start">
                <div className={`box-border w-fit shrink-0 h-fit flex flex-row gap-[6px] p-[4px_10px] justify-start items-center ${story.published ? "bg-[#F5FAE5]" : "bg-[#F5F6F7]"} rounded-[999px]`}>
                  <div className={`box-border w-[6px] shrink-0 h-[6px] ${story.published ? "bg-[#188918]" : "bg-[#8396A8]"} rounded-[50%]`} />
                  <span className={`text-[12px]/[16px] box-border ${story.published ? "text-[#188918]" : "text-[#475E75]"} ${font}font-medium text-left [white-space:nowrap]`}>{story.published ? "Published" : "Hidden"}</span>
                </div>
              </div>
              <div className="box-border w-fit shrink-0 h-fit flex flex-row gap-[4px] justify-start items-center">
                {confirming === story.id ? (
                  <>
                    <button type="button" disabled={pending} onClick={() => run(() => deleteStory(story.id, false))} className={`h-[32px] px-[10px] rounded-[8px] bg-[#D20A0A] hover:bg-[#AA0808] text-[12px]/[16px] text-[#FFFFFF] ${font}font-medium cursor-pointer disabled:opacity-60`}>
                      {pending ? "…" : "Delete"}
                    </button>
                    <button type="button" onClick={() => setConfirming(null)} className={`h-[32px] px-[8px] rounded-[8px] hover:bg-[#EAF3F5] text-[12px]/[16px] text-[#354A5F] ${font}font-medium cursor-pointer`}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    {story.published && (
                      <Link href="/#customer-stories" target="_blank" aria-label="Preview story" className={iconButton}>
                        <Eye size={16} className="text-[#354A5F]" />
                      </Link>
                    )}
                    {imported && (
                      <>
                        <Link href={`/admin/customer-stories/edit?id=${encodeURIComponent(story.id)}`} aria-label="Edit story" className={iconButton}>
                          <Pencil size={16} className="text-[#354A5F]" />
                        </Link>
                        <button type="button" aria-label="Delete story" onClick={() => setConfirming(story.id)} className={iconButton}>
                          <Trash2 size={16} className="text-[#D20A0A]" />
                        </button>
                      </>
                    )}
                  </>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
