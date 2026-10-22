"use client";

import Link from "next/link";
import { Icon } from "@/components/Icon";
import { useLanguage } from "@/components/LanguageProvider";

export function Hero() {
  const { t } = useLanguage();

  return (
    <div className="box-border w-full h-fit shrink-0 flex flex-col gap-[56px] p-[72px_96px_64px_96px] justify-start items-start [background-image:linear-gradient(90deg,_#08174A_0%,_#2B1C8F_100%)] bg-no-repeat bg-[length:100%_100%] relative [z-index:1] max-lg:p-[36px_20px_32px_20px] max-lg:gap-[32px]">
      <div className="box-border w-full h-fit shrink-0 flex flex-row gap-[64px] justify-start items-center max-lg:flex-col max-lg:items-stretch max-lg:gap-[32px]">
        <div className="box-border [flex:1_1_0] h-fit flex flex-col gap-[28px] justify-start items-start min-w-0">
          <div className="box-border w-fit h-fit shrink-0 flex flex-row gap-[8px] p-[6px_14px_6px_10px] justify-start items-center bg-[#FFFFFF14] [outline:1px_solid_#FFFFFF33] [outline-offset:-0.5px] rounded-[999px]">
            <Icon
              id="puzzle-8d0537"
              className="box-border w-[18px] shrink-0 h-[18px]"
            />
            <div className="text-[13px]/[17px] box-border text-[#FFFFFF] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-medium text-left [white-space:nowrap] max-lg:whitespace-normal">
              {t("hero.badge")}
            </div>
          </div>
          <div className="text-[64px]/[67px] box-border text-[#FFFFFF] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-bold text-left [white-space:nowrap] max-lg:text-[40px]/[42px] max-lg:whitespace-normal">
            {t("hero.title1")}
            <br />
            {t("hero.title2")}
            <br />
            {t("hero.title3")}
          </div>
          <div className="text-[20px]/[30px] box-border w-[500px] text-[#FFFFFFCC] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-normal text-left max-lg:w-full">
            {t("hero.desc")}
          </div>
          <div className="box-border w-fit h-fit shrink-0 flex flex-row flex-wrap gap-[16px] p-[8px_0px_0px_0px] justify-start items-center">
            <Link href="/contact" className="box-border w-fit shrink-0 h-[48px] flex flex-row gap-[8px] p-[0px_24px] justify-center items-center bg-[#A6CBD3] hover:bg-[#B8D8DF] rounded-[8px]">
              <div className="text-[16px]/[20px] box-border text-[#000354] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-medium text-left [white-space:nowrap] max-lg:whitespace-normal">
                {t("nav.quote")}
              </div>
            </Link>
            <Link href="/services" className="box-border w-fit shrink-0 h-[48px] flex flex-row gap-[8px] p-[0px_24px] justify-center items-center bg-[#FFFFFF00] hover:bg-[#FFFFFF1A] [outline:1px_solid_#FFFFFF80] [outline-offset:-0.5px] rounded-[8px]">
              <div className="text-[16px]/[20px] box-border text-[#FFFFFF] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-medium text-left [white-space:nowrap] max-lg:whitespace-normal">
                {t("hero.explore")}
              </div>
            </Link>
          </div>
        </div>
        <div className="box-border w-[620px] shrink-0 h-[500px] flex flex-row gap-[12px] justify-start items-start max-lg:w-full max-lg:h-[440px] max-sm:h-[380px]">
          <div className="box-border [flex:1_1_0] h-full flex flex-col gap-[12px] justify-start items-start min-w-0">
            <div className="box-border w-full [flex:1_1_0] flex flex-row gap-0 justify-start items-start bg-[url('https://images.unsplash.com/photo-1758518732175-5d608ba3abdf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3OTI0Njc4NTl8&ixlib=rb-4.1.0&q=80&w=1080')] bg-no-repeat bg-cover bg-center rounded-[120px_12px_12px_12px] overflow-hidden min-w-0"></div>
            <div className="box-border w-full h-[170px] shrink-0 flex flex-col gap-0 p-[24px] justify-between items-start bg-[#FFFFFF] rounded-[12px]">
              <Icon
                id="puzzle-ff9b58"
                className="box-border w-[24px] h-[24px] shrink-0"
              />
              <div className="box-border w-fit h-fit shrink-0 flex flex-col gap-[4px] justify-start items-start">
                <div className="text-[40px]/[40px] box-border text-[#000354] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-medium text-left [white-space:nowrap] max-lg:text-[30px]/[30px] max-lg:whitespace-normal">
                  15+
                </div>
                <div className="text-[14px]/[18px] box-border text-[#354A5F] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-normal text-left [white-space:nowrap] max-lg:whitespace-normal">
                  {t("hero.stat1")}
                </div>
              </div>
            </div>
          </div>
          <div className="box-border [flex:1_1_0] h-full flex flex-col gap-[12px] justify-start items-start min-w-0">
            <div className="box-border w-full h-[150px] shrink-0 flex flex-col gap-0 p-[24px] justify-between items-start bg-[#A6CBD3] rounded-[12px]">
              <div className="text-[40px]/[40px] box-border text-[#000354] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-medium text-left [white-space:nowrap] max-lg:text-[30px]/[30px] max-lg:whitespace-normal">
                25+
              </div>
              <div className="text-[14px]/[18px] box-border text-[#000354] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-medium text-left [white-space:nowrap] max-lg:whitespace-normal">
                {t("hero.stat2")}
              </div>
            </div>
            <div className="box-border w-full [flex:1_1_0] flex flex-row gap-0 justify-start items-start bg-[url('https://images.unsplash.com/photo-1762341112610-58061dbace4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3OTI0Njc5MTN8&ixlib=rb-4.1.0&q=80&w=1080')] bg-no-repeat bg-cover bg-center rounded-[12px_12px_120px_12px] overflow-hidden min-w-0"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
