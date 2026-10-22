"use client";

import { ChevronDown } from "lucide-react";

const font = "font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif]";

type StoryItemProps = {
  title: string;
  meta: string;
  url: string;
  body?: string;
  quote?: string;
  quoteAuthor?: string;
  open: boolean;
  onToggle: () => void;
};

export function StoryItem({ title, meta, url, body, quote, quoteAuthor, open, onToggle }: StoryItemProps) {
  if (!body) {
    return (
      <a href={url} className="group box-border w-full h-fit shrink-0 flex flex-col gap-[6px] p-[20px_0px_20px_28px] justify-start items-start [border-width:0px_0px_0px_3px] [border-style:solid] [border-color:#FFFFFF] [margin:0px_0px_0px_-1.5px]">
        <div className={`text-[22px]/[26px] box-border w-full text-[#FFFFFF] group-hover:text-[#A6CBD3] transition-colors ${font} font-medium text-left`}>{title}</div>
        <div className={`text-[13px]/[17px] box-border text-[#FFFFFF99] ${font} font-normal text-left [white-space:nowrap]`}>{meta}</div>
      </a>
    );
  }

  return (
    <div className={`group box-border w-full h-fit shrink-0 flex flex-col gap-[10px] p-[20px_0px_20px_28px] justify-start items-start [border-width:0px_0px_0px_3px] [border-style:solid] ${open ? "[border-color:#A6CBD3]" : "[border-color:#FFFFFF]"} [margin:0px_0px_0px_-1.5px]`}>
      <button
        type="button"
        aria-expanded={open}
        onClick={onToggle}
        className={`box-border w-full flex flex-row gap-[16px] justify-between items-start text-left transition-colors cursor-pointer ${
          open ? "text-[26px]/[31px] text-[#A6CBD3] hover:text-[#FFFFFF]" : "text-[22px]/[26px] text-[#FFFFFF] hover:text-[#A6CBD3]"
        } ${font} font-medium`}
      >
        <span>{title}</span>
        <ChevronDown size={20} className={`shrink-0 mt-[4px] transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {!open && <div className={`text-[13px]/[17px] box-border text-[#FFFFFF99] ${font} font-normal text-left`}>{meta}</div>}
      {open && (
        <>
          <div className={`text-[16px]/[26px] box-border w-full text-[#FFFFFFCC] ${font} font-normal text-left`}>{body}</div>
          {quote && (
            <div className="box-border w-full h-fit shrink-0 flex flex-col gap-[10px] p-[16px_20px] justify-start items-start bg-[#FFFFFF14] rounded-[8px]">
              <div className={`text-[16px]/[24px] box-border w-full text-[#FFFFFF] ${font} font-medium text-left`}>{quote}</div>
              {quoteAuthor && <div className={`text-[13px]/[17px] box-border text-[#FFFFFFA6] ${font} font-normal text-left`}>{quoteAuthor}</div>}
            </div>
          )}
        </>
      )}
    </div>
  );
}
