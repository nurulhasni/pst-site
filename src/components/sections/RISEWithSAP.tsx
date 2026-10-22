"use client";

import Link from "next/link";
import { Icon } from "@/components/Icon";
import { ProfileDownloadDialog } from "@/components/sections/ProfileDownloadDialog";
import { useLanguage } from "@/components/LanguageProvider";

export function RISEWithSAP() {
  const { t } = useLanguage();

  return (
    <div className="box-border w-full h-fit shrink-0 flex flex-row gap-0 p-[0px_96px_112px_96px] justify-start items-start relative [z-index:6] max-lg:p-[0px_20px_56px_20px]">
      <div className="box-border [flex:1_1_0] h-fit flex flex-row gap-[64px] p-[56px_64px] justify-start items-center bg-[#EAF3F5] [background-image:radial-gradient(ellipse_35%_80%_at_95%_50%,_#A6CBD399_0%,_#A6CBD300_100%)] bg-no-repeat bg-[length:100%_100%] rounded-[12px] max-lg:p-[24px_20px_24px_20px] max-lg:flex-col max-lg:items-stretch max-lg:gap-[32px] min-w-0">
        <div className="box-border [flex:1_1_0] h-fit flex flex-col gap-[16px] justify-start items-start min-w-0">
          <div className="box-border w-fit h-fit shrink-0 flex flex-row gap-[10px] justify-start items-center">
            <Icon
              id="rocket-73a25b"
              className="box-border w-[18px] shrink-0 h-[18px]"
            />
            <div className="text-[13px]/[17px] box-border text-[#2F6E80] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-medium tracking-[1.4px] text-left [white-space:nowrap] max-lg:whitespace-normal">
              {t("rise.eyebrow")}
            </div>
          </div>
          <div className="text-[40px]/[44px] box-border w-full text-[#000354] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-medium text-left max-lg:text-[30px]/[33px]">
            {t("rise.title")}
          </div>
          <div className="text-[17px]/[27px] box-border w-full text-[#354A5F] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-normal text-left">
            {t("rise.desc")}
          </div>
        </div>
        <div className="box-border w-[420px] shrink-0 h-fit flex flex-col gap-[14px] justify-start items-start max-lg:w-full">
          <div className="box-border w-full h-fit shrink-0 flex flex-row gap-[14px] p-[14px_18px] justify-start items-center bg-[#FFFFFF] rounded-[8px]">
            <Icon
              id="cloud-0fe1e6"
              className="box-border w-[20px] shrink-0 h-[20px]"
            />
            <div className="text-[15px]/[20px] box-border text-[#000354] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-medium text-left [white-space:nowrap] max-lg:whitespace-normal">
              {t("rise.item1")}
            </div>
          </div>
          <div className="box-border w-full h-fit shrink-0 flex flex-row gap-[14px] p-[14px_18px] justify-start items-center bg-[#FFFFFF] rounded-[8px]">
            <Icon
              id="chart-line-97efa9"
              className="box-border w-[20px] shrink-0 h-[20px]"
            />
            <div className="text-[15px]/[20px] box-border text-[#000354] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-medium text-left [white-space:nowrap] max-lg:whitespace-normal">
              {t("rise.item2")}
            </div>
          </div>
          <div className="box-border w-full h-fit shrink-0 flex flex-row gap-[14px] p-[14px_18px] justify-start items-center bg-[#FFFFFF] rounded-[8px]">
            <Icon
              id="users-d5d360"
              className="box-border w-[20px] shrink-0 h-[20px]"
            />
            <div className="text-[15px]/[20px] box-border text-[#000354] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-medium text-left [white-space:nowrap] max-lg:whitespace-normal">
              {t("rise.item3")}
            </div>
          </div>
          <div className="box-border w-fit h-fit shrink-0 flex flex-row flex-wrap gap-[12px] p-[8px_0px_0px_0px] justify-start items-center">
            <Link href="/contact" className="box-border w-fit shrink-0 h-[48px] flex flex-row gap-[8px] p-[0px_24px] justify-center items-center bg-[#000354] hover:bg-[#0B1470] rounded-[8px]">
              <div className="text-[16px]/[20px] box-border text-[#FFFFFF] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-medium text-left [white-space:nowrap] max-lg:whitespace-normal">
                {t("rise.start")}
              </div>
            </Link>
            <ProfileDownloadDialog />
          </div>
        </div>
      </div>
    </div>
  );
}
