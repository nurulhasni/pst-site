"use client";

import { Icon } from "@/components/Icon";
import { useLanguage } from "@/components/LanguageProvider";

export function AboutIntro() {
  const { t } = useLanguage();

  return (
    <div id="about" className="box-border w-full h-fit shrink-0 flex flex-row gap-[96px] p-[120px_96px] justify-start items-center relative [z-index:3] max-lg:p-[60px_20px_60px_20px] max-lg:flex-col max-lg:items-stretch max-lg:gap-[32px]">
      <div className="box-border w-[560px] shrink-0 h-[560px] relative max-lg:w-full max-lg:h-auto max-lg:aspect-square max-lg:max-w-[560px]">
        <div className="box-border w-[520px] h-[520px] absolute left-0 top-0 max-lg:w-[calc(100%-24px)] max-lg:h-[calc(100%-24px)] bg-[url('https://images.unsplash.com/photo-1758691737124-05c5bffe46f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3OTI0NjY4NzJ8&ixlib=rb-4.1.0&q=80&w=1080')] bg-no-repeat bg-cover bg-center rounded-[12px] overflow-hidden [z-index:0] max-lg:w-full max-lg:h-[320px]">
          <div className="box-border w-[520px] h-[520px] absolute left-0 top-0 flex flex-row gap-0 justify-start items-start [background-image:linear-gradient(180deg,_#00035400_40%,_#000354B3_100%)] bg-no-repeat bg-[length:100%_100%] [z-index:0] max-lg:w-full max-lg:h-full"></div>
          <div className="box-border w-[80px] h-[80px] [box-shadow:0px_10px_30px_#00000059] absolute left-[220px] top-[220px] max-lg:left-[calc(50%-40px)] max-lg:top-[calc(50%-40px)] flex flex-row gap-0 justify-center items-center bg-[#A6CBD3] rounded-[999px] [z-index:1]">
            <Icon
              id="play-49912a"
              className="box-border w-[30px] shrink-0 h-[30px]"
            />
          </div>
          <div className="box-border w-fit h-fit absolute left-[28px] top-[28px] flex flex-row gap-[8px] p-[6px_12px] justify-start items-center bg-[#00035499] rounded-[999px] [z-index:2]">
            <Icon
              id="video-8046d5"
              className="box-border w-[14px] shrink-0 h-[14px]"
            />
            <div className="text-[13px]/[17px] box-border text-[#FFFFFF] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-medium text-left [white-space:nowrap]">
              {t("about.video")}
            </div>
          </div>
        </div>
        <div className="box-border w-[260px] h-fit [box-shadow:0px_10px_30px_#22364940] absolute left-[300px] top-[400px] max-lg:left-auto max-lg:top-auto max-lg:right-0 max-lg:bottom-0 max-sm:w-[220px] max-sm:p-[16px] flex flex-col gap-[6px] p-[24px] justify-start items-start bg-[#FFFFFF] rounded-[12px] [z-index:1]">
          <div className="text-[40px]/[40px] box-border text-[#000354] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-medium text-left [white-space:nowrap] max-lg:text-[30px]/[30px] max-lg:whitespace-normal">
            {t("about.est")}
          </div>
          <div className="text-[14px]/[20px] box-border w-full text-[#354A5F] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-normal text-left">
            {t("about.partner")}
          </div>
        </div>
      </div>
      <div className="box-border [flex:1_1_0] h-fit flex flex-col gap-[24px] justify-start items-start min-w-0">
        <div className="box-border w-fit h-fit shrink-0 flex flex-row gap-0 justify-start items-start">
          <div className="text-[12px]/[15px] box-border text-[#2F6E80] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-medium tracking-[1.2px] text-left [white-space:nowrap]">
            {t("about.eyebrow")}
          </div>
        </div>
        <div className="text-[48px]/[53px] box-border w-full text-[#000000] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-medium text-left max-lg:text-[32px]/[35px]">
          {t("about.title")}
        </div>
        <div className="[box-sizing:content-box] max-lg:box-border w-[590.5px] h-[76px] max-lg:h-auto shrink-0 flex flex-row gap-0 p-[4px_0px_4px_24px] justify-start items-start [border-width:0px_0px_0px_3px] [border-style:solid] [border-color:#2F6E80] [margin:0px_0px_0px_-1.5px] max-lg:w-full">
          <div className="text-[24px]/[34px] box-border [flex:1_1_0] text-[#223548] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-normal text-left min-w-0">
            {t("about.quote")}
          </div>
        </div>
        <div className="text-[16px]/[26px] box-border w-full text-[#354A5F] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-normal text-left">
          {t("about.body")}
        </div>
        <div className="box-border w-full h-fit shrink-0 flex flex-row gap-[12px] justify-start items-start">
          <div className="box-border [flex:1_1_0] h-fit flex flex-row gap-[10px] p-[14px_16px] justify-start items-center bg-[#EAF3F5] rounded-[8px] min-w-0">
            <Icon
              id="users-d5d360"
              className="box-border w-[20px] shrink-0 h-[20px]"
            />
            <div className="text-[16px]/[21px] box-border text-[#000354] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-medium text-left [white-space:nowrap]">
              {t("about.people")}
            </div>
          </div>
          <div className="box-border [flex:1_1_0] h-fit flex flex-row gap-[10px] p-[14px_16px] justify-start items-center bg-[#EAF3F5] rounded-[8px] min-w-0">
            <Icon
              id="package-71ff29"
              className="box-border w-[20px] shrink-0 h-[20px]"
            />
            <div className="text-[16px]/[21px] box-border text-[#000354] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-medium text-left [white-space:nowrap]">
              {t("about.product")}
            </div>
          </div>
          <div className="box-border [flex:1_1_0] h-fit flex flex-row gap-[10px] p-[14px_16px] justify-start items-center bg-[#EAF3F5] rounded-[8px] min-w-0">
            <Icon
              id="workflow-cbeff6"
              className="box-border w-[20px] shrink-0 h-[20px]"
            />
            <div className="text-[16px]/[21px] box-border text-[#000354] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-medium text-left [white-space:nowrap]">
              {t("about.process")}
            </div>
          </div>
        </div>
        <div className="box-border w-fit h-fit shrink-0 flex flex-row gap-[4px] justify-start items-center">
          <div className="text-[16px]/[20px] box-border text-[#2F6E80] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-medium text-left [white-space:nowrap]">
            {t("about.watch")}
          </div>
          <Icon
            id="chevron-right-d09dc3"
            className="box-border w-[16px] shrink-0 h-[16px]"
          />
        </div>
      </div>
    </div>
  );
}
