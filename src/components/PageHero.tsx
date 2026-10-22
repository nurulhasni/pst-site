"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

const font = "font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif]";

type PageHeroProps = {
  current: string;
  title: string;
  description?: string;
  aside?: ReactNode;
  children?: ReactNode;
};

export function PageHero({ current, title, description, aside, children }: PageHeroProps) {
  const { t } = useLanguage();

  return (
    <div className="box-border w-full h-fit flex flex-row gap-[64px] p-[64px_96px_88px_96px] justify-start items-start bg-[#08174A] [background-image:linear-gradient(90deg,_#08174A_0%,_#2B1C8F_100%)] max-lg:flex-col max-lg:items-stretch max-lg:p-[40px_20px_48px_20px] max-lg:gap-[32px]">
      <div className="box-border [flex:1_1_0] h-fit flex flex-col gap-[24px] justify-start items-start min-w-0">
        <div className={`box-border w-fit h-fit flex flex-row gap-[8px] items-center text-[14px]/[18px] ${font}`}>
          <Link href="/" className="text-[#FFFFFFA6] hover:text-[#FFFFFF]">
            {t("nav.home")}
          </Link>
          <ChevronRight size={14} className="text-[#FFFFFF66]" />
          <span className="text-[#A6CBD3] font-medium">{current}</span>
        </div>
        <div className={`text-[64px]/[67px] box-border w-full text-[#FFFFFF] ${font} font-bold text-left max-lg:text-[40px]/[44px]`}>
          {title.split("\n").map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </div>
        {description && (
          <div className={`text-[20px]/[30px] box-border w-[600px] max-w-full text-[#FFFFFFCC] ${font} font-normal text-left`}>
            {description}
          </div>
        )}
        {children}
      </div>
      {aside && <div className="box-border w-fit shrink-0 h-fit max-lg:w-full">{aside}</div>}
    </div>
  );
}
