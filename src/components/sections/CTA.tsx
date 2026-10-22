"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";

export function CTA() {
  const { t } = useLanguage();

  return (
    <div className="box-border w-full h-fit shrink-0 flex flex-row gap-0 p-[0px_96px_120px_96px] justify-start items-start relative [z-index:10] max-lg:p-[0px_20px_60px_20px]">
      <div className="box-border [flex:1_1_0] h-fit flex flex-row gap-[48px] p-[64px] justify-start items-center [background-image:radial-gradient(ellipse_30%_60%_at_90%_10%,_#A6CBD333_0%,_#A6CBD300_100%),_linear-gradient(90deg,_#08174A_0%,_#2B1C8F_100%)] [background-repeat:no-repeat,_no-repeat] [background-size:100%_100%,_100%_100%] rounded-[12px] max-lg:p-[32px_20px_32px_20px] max-lg:flex-col max-lg:items-stretch max-lg:gap-[32px] min-w-0">
        <div className="box-border [flex:1_1_0] h-fit flex flex-col gap-[16px] justify-start items-start min-w-0">
          <div className="text-[44px]/[48px] box-border text-[#FFFFFF] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-medium text-left [white-space:nowrap] max-lg:text-[30px]/[33px] max-lg:whitespace-normal">
            {t("cta.title")}
          </div>
          <div className="text-[18px]/[27px] box-border w-full text-[#FFFFFFCC] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-normal text-left">
            {t("cta.desc")}
          </div>
        </div>
        <div className="box-border w-fit shrink-0 h-fit flex flex-col gap-[16px] justify-start items-end">
          <Link
            href="/contact"
            className="box-border w-fit h-[48px] shrink-0 flex flex-row gap-[8px] p-[0px_24px] justify-center items-center bg-[#A6CBD3] hover:bg-[#B8D8DF] rounded-[8px]"
          >
            <div className="text-[16px]/[20px] box-border text-[#000354] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-medium text-left [white-space:nowrap]">
              {t("cta.start")}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
