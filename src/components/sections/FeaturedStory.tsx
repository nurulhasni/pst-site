"use client";

import { ChevronDown } from "lucide-react";
import { Icon } from "@/components/Icon";
import { useLanguage } from "@/components/LanguageProvider";

const font = "font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif]";

type FeaturedStoryProps = {
  title: string;
  body: string;
  quote: string;
  quoteAuthor: string;
  url: string;
  open: boolean;
  onToggle: () => void;
};

export function FeaturedStory({ title, body, quote, quoteAuthor, url, open, onToggle }: FeaturedStoryProps) {
  const { t } = useLanguage();

  return (
    <div className={`group box-border w-full shrink-0 flex flex-col gap-[16px] p-[4px_0px_28px_28px] justify-start items-start [border-width:0px_0px_0px_3px] [border-style:solid] ${open ? "[border-color:#A6CBD3]" : "[border-color:#FFFFFF]"} [margin:0px_0px_0px_-1.5px] max-lg:w-full max-lg:h-auto`}>
      <button
        type="button"
        aria-expanded={open}
        onClick={onToggle}
        className={`box-border w-full flex flex-row gap-[16px] justify-between items-start text-left transition-colors cursor-pointer ${
          open ? "text-[26px]/[31px] text-[#A6CBD3] hover:text-[#FFFFFF]" : "text-[22px]/[26px] text-[#FFFFFF] hover:text-[#A6CBD3]"
        } ${font} font-medium`}
      >
        <span>{title}</span>
        <ChevronDown size={20} className={`shrink-0 transition-transform duration-200 ${open ? "mt-[6px] rotate-180" : "mt-[3px]"}`} />
      </button>
      {open && (
        <>
          <div className={`text-[16px]/[26px] box-border w-full text-[#FFFFFFCC] ${font} font-normal text-left`}>{body}</div>
          <div className="box-border w-full h-fit shrink-0 flex flex-col gap-[10px] p-[16px_20px] justify-start items-start bg-[#FFFFFF14] rounded-[8px]">
            <div className={`text-[16px]/[24px] box-border w-full text-[#FFFFFF] ${font} font-medium text-left`}>{quote}</div>
            <div className={`text-[13px]/[17px] box-border text-[#FFFFFFA6] ${font} font-normal text-left [white-space:nowrap]`}>{quoteAuthor}</div>
          </div>
          <a href={url} className="box-border w-fit h-fit shrink-0 flex flex-row gap-[4px] justify-start items-center">
            <div className={`text-[16px]/[20px] box-border text-[#A6CBD3] hover:text-[#FFFFFF] transition-colors ${font} font-medium text-left [white-space:nowrap]`}>
              {t("story.read")}
            </div>
            <Icon id="chevron-right-170b10" className="box-border w-[16px] shrink-0 h-[16px]" />
          </a>
        </>
      )}
    </div>
  );
}
