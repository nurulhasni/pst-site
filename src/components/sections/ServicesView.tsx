"use client";

import Link from "next/link";
import { Icon } from "@/components/Icon";
import { useLanguage } from "@/components/LanguageProvider";
import { localize } from "@/lib/sheetI18n";
import type { Service } from "@/lib/sheets";

const iconIds: Record<string, string> = {
  layers: "layers-ed4780",
  headset: "headset-c29359",
  workflow: "workflow-cbeff6",
  compass: "compass-07d60a",
};

export function ServicesView({ services }: { services: Service[] }) {
  const { t, lang } = useLanguage();
  const rows = [];
  for (let i = 0; i < services.length; i += 2) {
    rows.push(services.slice(i, i + 2));
  }

  return (
    <div
      id="services"
      className="box-border w-full h-fit shrink-0 flex flex-row gap-[80px] p-[120px_96px] justify-start items-start relative [z-index:5] max-lg:p-[60px_20px_60px_20px] max-lg:flex-col max-lg:items-stretch max-lg:gap-[32px]"
    >
      <div className="box-border w-[380px] shrink-0 h-fit flex flex-col gap-[24px] justify-start items-start max-lg:w-full">
        <div className="box-border w-fit h-fit shrink-0 flex flex-row gap-0 justify-start items-start">
          <div className="text-[12px]/[15px] box-border text-[#2F6E80] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-medium tracking-[1.2px] text-left [white-space:nowrap]">
            {t("services.eyebrow")}
          </div>
        </div>
        <div className="text-[48px]/[53px] box-border w-full text-[#000000] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-medium text-left max-lg:text-[32px]/[35px]">
          {t("services.title")}
        </div>
        <div className="text-[18px]/[27px] box-border w-full text-[#354A5F] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-normal text-left">
          {t("services.desc")}
        </div>
        <div className="box-border w-fit h-fit shrink-0 flex flex-row gap-0 p-[8px_0px_0px_0px] justify-start items-start">
          <Link
            href="/services"
            className="box-border w-fit shrink-0 h-[48px] flex flex-row gap-[8px] p-[0px_24px] justify-center items-center bg-[#000354] hover:bg-[#0B1470] rounded-[8px]"
          >
            <div className="text-[16px]/[20px] box-border text-[#FFFFFF] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-medium text-left [white-space:nowrap]">
              {t("services.explore")}
            </div>
          </Link>
        </div>
        <div className="box-border w-fit h-fit shrink-0 flex flex-row gap-[10px] p-[10px_16px_10px_12px] justify-start items-center bg-[#EAF3F5] [outline:1px_solid_#A6CBD3] [outline-offset:-0.5px] rounded-[8px]">
          <Icon
            id="award-2e8fb7"
            className="box-border w-[22px] shrink-0 h-[22px]"
          />
          <div className="box-border w-fit shrink-0 h-fit flex flex-col gap-[1px] justify-start items-start">
            <div className="text-[14px]/[18px] box-border text-[#000354] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-medium text-left [white-space:nowrap]">
              {t("services.badgeTitle")}
            </div>
            <div className="text-[12px]/[16px] box-border text-[#354A5F] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-normal text-left [white-space:nowrap]">
              {t("services.badgeDesc")}
            </div>
          </div>
        </div>
      </div>
      <div className="box-border [flex:1_1_0] h-fit flex flex-col gap-0 justify-start items-start min-w-0">
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={`[box-sizing:content-box] max-lg:box-border w-[788px] shrink-0 flex flex-row gap-0 justify-start items-start max-lg:w-full max-lg:h-auto max-md:flex-col ${
              rowIndex === 0
                ? "[border-width:1px_0px_0px_0px] [border-style:solid] [border-color:#D5DADD] [margin:-0.5px_0px_0px_0px]"
                : "[border-width:1px_0px_1px_0px] [border-style:solid] [border-color:#D5DADD] [margin:-0.5px_0px_-0.5px_0px]"
            }`}
          >
            {row.map((service, colIndex) => (
              <div
                key={service.title}
                className={
                  colIndex === 0
                    ? "box-border [flex:1_1_0] h-fit flex flex-col gap-[16px] p-[40px_40px_40px_0px] justify-start items-start max-lg:p-[24px_20px_24px_0px] max-md:flex-none max-md:w-full max-md:p-[24px_0px] min-w-0"
                    : "[box-sizing:content-box] max-lg:box-border [flex:1_1_0] h-fit flex flex-col gap-[16px] p-[40px_0px_40px_40px] justify-start items-start [border-width:0px_0px_0px_1px] [border-style:solid] [border-color:#D5DADD] [margin:0px_0px_0px_-0.5px] w-[393.5px] max-lg:p-[24px_0px_24px_20px] max-md:flex-none max-md:w-full max-md:p-[24px_0px] max-md:[border-width:1px_0px_0px_0px] min-w-0"
                }
              >
                <div className="box-border w-[48px] h-[48px] shrink-0 flex flex-row gap-0 justify-center items-center bg-[#EAF3F5] rounded-[8px]">
                  <Icon
                    id={iconIds[service.icon] ?? iconIds.layers}
                    className="box-border w-[24px] shrink-0 h-[24px]"
                  />
                </div>
                <div className="text-[24px]/[28px] box-border text-[#000000] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-medium text-left max-lg:whitespace-normal">
                  {localize(service.title, lang)}
                </div>
                <div className="text-[16px]/[25px] box-border w-full text-[#354A5F] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-normal text-left">
                  {localize(service.description, lang)}
                </div>
                <a
                  href={service.url}
                  className="box-border w-fit h-fit shrink-0 flex flex-row gap-[4px] justify-start items-center"
                >
                  <div className="text-[16px]/[20px] box-border text-[#2F6E80] hover:text-[#000354] transition-colors font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-medium text-left [white-space:nowrap]">
                    {t("services.learn")}
                  </div>
                  <Icon
                    id="chevron-right-d09dc3"
                    className="box-border w-[16px] shrink-0 h-[16px]"
                  />
                </a>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
