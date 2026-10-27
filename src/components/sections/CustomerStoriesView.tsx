"use client";

import { useState } from "react";
import { Icon } from "@/components/Icon";
import { StoryStack } from "@/components/sections/StoryStack";
import { useLanguage } from "@/components/LanguageProvider";
import { localize } from "@/lib/sheetI18n";
import type { CustomerStories as CustomerStoriesData } from "@/lib/sheets";

export function CustomerStoriesView({ featured, stories }: CustomerStoriesData) {
  const { t, lang } = useLanguage();
  const [openKey, setOpenKey] = useState<string | null>("featured");
  // The image keeps showing the last opened story when every item is collapsed
  const [activeKey, setActiveKey] = useState("featured");

  // Only expandable stories (featured + ones with a body) get a slide
  const slides = [
    { key: "featured", image: featured.image, icon: "factory-ebdede", company: featured.company, companyMeta: localize(featured.companyMeta, lang) },
    ...stories
      .filter((story) => story.body)
      .map((story) => {
        const [industry, focus] = localize(story.meta, lang).split(" · ");
        return {
          key: story.title,
          image: story.image,
          icon: "briefcase-09c5d9",
          company: story.company || industry,
          companyMeta: story.companyMeta ? localize(story.companyMeta, lang) : focus ?? "",
        };
      }),
  ];
  const active = slides.find((slide) => slide.key === activeKey) ?? slides[0];

  function toggle(key: string) {
    const next = openKey === key ? null : key;
    setOpenKey(next);
    if (next) setActiveKey(next);
  }

  return (
    <div className="box-border w-full h-fit shrink-0 flex flex-col gap-[56px] p-[120px_96px] justify-start items-start bg-[#000354] relative [z-index:8] max-lg:p-[60px_20px_60px_20px] max-lg:gap-[32px]">
      <div className="box-border w-full h-fit shrink-0 flex flex-row gap-[48px] justify-start items-end max-lg:flex-col max-lg:items-stretch max-lg:gap-[32px]">
        <div className="box-border [flex:1_1_0] h-fit flex flex-col gap-[16px] justify-start items-start min-w-0">
          <div className="box-border w-fit h-fit shrink-0 flex flex-row gap-0 justify-start items-start">
            <div className="text-[12px]/[15px] box-border text-[#A6CBD3] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-medium tracking-[1.2px] text-left [white-space:nowrap]">
              {t("stories.eyebrow")}
            </div>
          </div>
          <div className="text-[48px]/[53px] box-border text-[#FFFFFF] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-medium text-left [white-space:nowrap] max-lg:text-[32px]/[35px] max-lg:whitespace-normal">
            {t("stories.title")}
          </div>
        </div>
        <div className="text-[18px]/[27px] box-border w-[460px] shrink-0 text-[#FFFFFFBF] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-normal text-left max-lg:w-full">
          {t("stories.desc")}
        </div>
      </div>
      <div className="box-border w-full h-fit shrink-0 flex flex-row gap-[64px] justify-start items-start max-lg:flex-col max-lg:items-stretch max-lg:gap-[32px]">
        <div className="[box-sizing:content-box] max-lg:box-border w-[519px] shrink-0 h-fit flex flex-col gap-[8px] justify-start items-start [border-width:0px_0px_0px_2px] [border-style:solid] [border-color:#FFFFFF2E] [margin:0px_0px_0px_-1px] max-lg:w-full max-lg:h-auto">
          <StoryStack featured={featured} stories={stories} openKey={openKey} onToggle={toggle} />
        </div>
        <div className="box-border [flex:1_1_0] h-[560px] bg-[#000354] rounded-[12px] overflow-hidden relative max-lg:flex-none max-lg:w-full max-lg:h-[380px] min-w-0">
          {slides.map((slide) => (
            <div
              key={slide.key}
              style={{ backgroundImage: `url('${slide.image}')` }}
              className={`box-border w-[664px] h-[560px] absolute left-0 top-0 bg-no-repeat bg-cover bg-center [z-index:0] transition-opacity duration-500 max-lg:w-full max-lg:h-full ${slide.key === active.key ? "opacity-100" : "opacity-0"}`}
            ></div>
          ))}
          <div className="box-border w-[664px] h-[560px] absolute left-0 top-0 flex flex-row gap-0 justify-start items-start [background-image:linear-gradient(180deg,_#00035400_50%,_#00035499_100%)] bg-no-repeat bg-[length:100%_100%] [z-index:1] max-lg:w-full max-lg:h-full"></div>
          <div className="box-border w-[300px] h-fit [box-shadow:0px_10px_30px_#00035433] absolute left-[32px] top-[424px] flex flex-row gap-[14px] p-[18px_20px] justify-start items-center bg-[#FFFFFF] rounded-[12px] [z-index:2] max-lg:w-auto max-lg:left-[16px] max-lg:right-[16px] max-lg:top-auto max-lg:bottom-[16px]">
            <div className="box-border w-[48px] shrink-0 h-[48px] flex flex-row gap-0 justify-center items-center bg-[#EAF3F5] rounded-[8px]">
              <Icon
                id={active.icon}
                className="box-border w-[24px] shrink-0 h-[24px]"
              />
            </div>
            <div className="box-border w-fit shrink-0 h-fit flex flex-col gap-[2px] justify-start items-start">
              <div className="text-[17px]/[22px] box-border text-[#000354] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-medium text-left [white-space:nowrap]">
                {active.company}
              </div>
              <div className="text-[13px]/[17px] box-border text-[#354A5F] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-normal text-left [white-space:nowrap]">
                {active.companyMeta}
              </div>
            </div>
          </div>
          <div className="box-border w-fit h-fit absolute left-[560px] top-[504px] max-lg:left-auto max-lg:right-[20px] max-lg:top-[20px] flex flex-row gap-[8px] justify-start items-center [z-index:3]">
            {slides.map((slide) => (
              <button
                key={slide.key}
                type="button"
                aria-label={slide.company}
                onClick={() => {
                  setOpenKey(slide.key);
                  setActiveKey(slide.key);
                }}
                className={`box-border shrink-0 h-[8px] rounded-[999px] cursor-pointer transition-all ${slide.key === active.key ? "w-[24px] bg-[#FFFFFF]" : "w-[8px] bg-[#FFFFFF80] hover:bg-[#FFFFFFCC]"}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
