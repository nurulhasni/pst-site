"use client";

import { GraduationCap, LifeBuoy, Ruler, Workflow, type LucideIcon } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

const font = "font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif]";

const steps: { key: string; Icon: LucideIcon }[] = [
  { key: "how.step1", Icon: Workflow },
  { key: "how.step2", Icon: Ruler },
  { key: "how.step3", Icon: GraduationCap },
  { key: "how.step4", Icon: LifeBuoy },
];

// Backs up the hero's promise: the four things PST does so a project goes live
// and stays in use. Same layout as the Vision & mission section.
export function HowWeWork() {
  const { t } = useLanguage();

  return (
    <div className="box-border w-full h-fit shrink-0 flex flex-row gap-[80px] p-[120px_96px] justify-start items-start bg-[#F5F6F7] relative [z-index:2] max-lg:p-[60px_20px_60px_20px] max-lg:flex-col max-lg:items-stretch max-lg:gap-[32px]">
      <div className="box-border w-[380px] shrink-0 h-fit flex flex-col gap-[24px] justify-start items-start max-lg:w-full">
        <div className={`text-[12px]/[15px] box-border text-[#2F6E80] ${font} font-medium tracking-[1.2px] text-left`}>{t("how.eyebrow")}</div>
        <div className={`text-[48px]/[53px] box-border w-full text-[#000000] ${font} font-medium text-left max-lg:text-[32px]/[35px]`}>{t("how.title")}</div>
        <div className={`text-[18px]/[27px] box-border w-full text-[#354A5F] ${font} font-normal text-left`}>{t("how.desc")}</div>
      </div>
      <div className="box-border [flex:1_1_0] h-fit grid grid-cols-2 gap-[24px] max-sm:grid-cols-1 min-w-0">
        {steps.map(({ key, Icon }, index) => (
          <div key={key} className="box-border w-full h-full [box-shadow:0px_2px_4px_#22364933] flex flex-col gap-[20px] p-[40px] justify-start items-start bg-[#FFFFFF] rounded-[12px] max-lg:p-[24px_20px_24px_20px] min-w-0">
            <div className="box-border w-full h-fit shrink-0 flex flex-row gap-[12px] justify-between items-center">
              <Icon size={28} strokeWidth={1.75} className="text-[#2F6E80] shrink-0" />
              <div className={`text-[40px]/[40px] box-border text-[#A6CBD3] ${font} font-medium text-left max-lg:text-[30px]/[30px]`}>0{index + 1}</div>
            </div>
            <div className={`text-[24px]/[29px] box-border w-full text-[#000000] ${font} font-medium text-left max-lg:text-[22px]/[27px]`}>{t(`${key}.title`)}</div>
            <div className={`text-[16px]/[26px] box-border w-full text-[#354A5F] ${font} font-normal text-left`}>{t(`${key}.body`)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
