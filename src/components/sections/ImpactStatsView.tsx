"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { localize } from "@/lib/sheetI18n";
import type { ImpactStat } from "@/lib/sheets";

export function ImpactStatsView({ stats }: { stats: ImpactStat[] }) {
  const { t, lang } = useLanguage();

  return (
    <div className="box-border w-full h-fit shrink-0 flex flex-col gap-[56px] p-[96px] justify-start items-start bg-[#EAF3F5] relative [z-index:4] max-lg:p-[48px_20px_48px_20px] max-lg:gap-[32px]">
      <div className="box-border w-full h-fit shrink-0 flex flex-row gap-[48px] justify-start items-end max-lg:flex-col max-lg:items-stretch max-lg:gap-[32px]">
        <div className="box-border [flex:1_1_0] h-fit flex flex-col gap-[16px] justify-start items-start min-w-0">
          <div className="box-border w-fit h-fit shrink-0 flex flex-row gap-0 justify-start items-start">
            <div className="text-[12px]/[15px] box-border text-[#2F6E80] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-medium tracking-[1.2px] text-left [white-space:nowrap]">
              {t("impact.eyebrow")}
            </div>
          </div>
          <div className="text-[48px]/[53px] box-border text-[#000000] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-medium text-left [white-space:nowrap] max-lg:text-[32px]/[35px] max-lg:whitespace-normal">
            {t("impact.title")}
          </div>
        </div>
        <div className="text-[18px]/[27px] box-border w-[460px] shrink-0 text-[#354A5F] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-normal text-left max-lg:w-full">
          {t("impact.desc")}
        </div>
      </div>
      <div className="box-border w-full h-fit shrink-0 flex flex-row gap-0 justify-start items-start max-md:flex-col max-md:gap-[24px]">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={
              index === 0
                ? "box-border [flex:1_1_0] h-fit flex flex-col gap-[12px] p-[8px_32px_8px_0px] justify-start items-start min-w-0"
                : "[box-sizing:content-box] max-lg:box-border [flex:1_1_0] h-[153px] flex flex-col gap-[12px] p-[8px_32px] justify-start items-start [border-width:0px_0px_0px_1px] [border-style:solid] [border-color:#A6CBD3] [margin:0px_0px_0px_-0.5px] w-[415.5px] max-md:w-full max-md:flex-none max-md:h-auto max-md:p-[8px_0px_8px_20px] min-w-0"
            }
          >
            <div className="text-[72px]/[72px] box-border text-[#000354] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-medium text-left [white-space:nowrap] max-lg:text-[42px]/[42px] max-lg:whitespace-normal">
              {stat.value}
            </div>
            <div className="text-[18px]/[23px] box-border text-[#000000] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-medium text-left [white-space:nowrap]">
              {localize(stat.label, lang)}
            </div>
            <div className="text-[14px]/[18px] box-border text-[#475E75] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-normal text-left [white-space:nowrap]">
              {localize(stat.note, lang)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
