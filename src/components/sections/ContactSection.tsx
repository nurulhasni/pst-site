"use client";

import { ContactForm } from "@/components/sections/ContactForm";
import { useLanguage } from "@/components/LanguageProvider";

export function ContactSection() {
  const { t } = useLanguage();

  const officeInfo = [
    {
      title: t("contact.locTitle"),
      lines: [t("footer.address1"), t("footer.address2")],
    },
    {
      title: t("contact.callTitle"),
      lines: ["+62 21 4204626", "+62 21 50919968"],
    },
    {
      title: t("contact.emailTitle"),
      lines: [t("footer.sales"), t("footer.careerEmail")],
    },
    {
      title: t("contact.hoursTitle"),
      lines: [t("contact.hours1"), t("contact.hours2")],
    },
  ];

  return (
    <div
      id="contact"
      className="box-border w-full h-fit shrink-0 flex flex-row gap-[80px] p-[120px_96px] justify-start items-start relative [z-index:10] bg-[#FFFFFF] max-lg:p-[60px_20px] max-lg:flex-col max-lg:items-stretch max-lg:gap-[40px]"
    >
      <div className="box-border [flex:1_1_0] h-fit flex flex-col gap-[32px] justify-start items-start min-w-0">
        <div className="box-border w-fit h-fit flex flex-col gap-[16px] justify-start items-start">
          <div className="text-[12px]/[15px] box-border text-[#2F6E80] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-medium tracking-[1.2px] text-left">
            {t("contact.eyebrow")}
          </div>
          <div className="text-[32px]/[37px] box-border text-[#000000] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-medium text-left">
            {t("contact.title")}
          </div>
        </div>
        <ContactForm />
      </div>
      <div className="box-border w-full lg:w-[380px] shrink-0 h-fit flex flex-col gap-[32px] p-[32px] justify-start items-start bg-[#EAF3F5] rounded-[12px]">
        {officeInfo.map((block) => (
          <div
            key={block.title}
            className="box-border w-full h-fit flex flex-col gap-[8px] justify-start items-start"
          >
            <div className="text-[16px]/[21px] box-border text-[#000000] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-medium text-left">
              {block.title}
            </div>
            {block.lines.map((line) => (
              <div
                key={line}
                className="text-[14px]/[21px] box-border w-full text-[#354A5F] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-normal text-left"
              >
                {line}
              </div>
            ))}
          </div>
        ))}
        <div className="box-border w-full h-fit flex flex-col gap-[4px] pt-[24px] [border-width:1px_0px_0px_0px] [border-style:solid] [border-color:#A6CBD3] justify-start items-start">
          <div className="text-[13px]/[17px] box-border text-[#475E75] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-normal text-left">
            {t("contact.directly")}
          </div>
        </div>
      </div>
    </div>
  );
}
