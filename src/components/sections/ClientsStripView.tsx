"use client";

import Link from "next/link";
import { Icon } from "@/components/Icon";
import { useLanguage } from "@/components/LanguageProvider";

type ClientLogo = { name: string; logo: string };

export function ClientsStripView({ rows }: { rows: ClientLogo[][] }) {
  const { t } = useLanguage();

  return (
    <div className="box-border w-full h-fit shrink-0 flex flex-col gap-[36px] p-[64px_0px_72px_0px] justify-start items-start bg-[#FFFFFF] [border-width:0px_0px_1px_0px] [border-style:solid] [border-color:#D5DADD] [margin:0px_0px_-0.5px_0px] relative [z-index:2] max-lg:p-[32px_0px_36px_0px]">
      <div className="box-border w-full h-fit shrink-0 flex flex-row flex-wrap gap-[16px] p-[0px_96px] justify-between items-end max-lg:p-[0px_20px_0px_20px]">
        <div className="box-border w-fit shrink h-fit flex flex-col gap-[6px] justify-start items-start">
          <div className="text-[22px]/[29px] box-border text-[#000000] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-medium text-left [white-space:nowrap] max-lg:whitespace-normal">
            {t("clients.title")}
          </div>
          <div className="text-[14px]/[18px] box-border text-[#475E75] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-normal text-left [white-space:nowrap] max-lg:whitespace-normal">
            {t("clients.industries")}
          </div>
        </div>
        <Link href="/services#clients" className="group box-border w-fit shrink-0 h-fit flex flex-row gap-[4px] justify-start items-center">
          <div className="text-[16px]/[20px] box-border text-[#2F6E80] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-medium text-left [white-space:nowrap]">
            {t("clients.see")}
          </div>
          <Icon
            id="chevron-right-d09dc3"
            className="box-border w-[16px] shrink-0 h-[16px]"
          />
        </Link>
      </div>
      {rows.map((logos, row) => (
        <div
          key={row}
          className="box-border w-full h-[64px] shrink-0 overflow-hidden relative"
        >
          <div
            className={`flex w-max h-[64px] items-center motion-safe:animate-[marquee_45s_linear_infinite] hover:[animation-play-state:paused] ${
              row === 1 ? "[animation-direction:reverse]" : ""
            }`}
          >
            {[...logos, ...logos].map((client, i) => (
              <div
                key={i}
                role={i < logos.length ? "img" : undefined}
                aria-label={i < logos.length ? client.name : undefined}
                aria-hidden={i >= logos.length}
                className="box-border w-[112px] shrink-0 h-[56px] mr-[64px] bg-no-repeat bg-contain bg-center"
                style={{ backgroundImage: `url(${client.logo})` }}
              ></div>
            ))}
          </div>
          <div className="box-border w-[160px] h-[64px] absolute left-0 top-0 [background-image:linear-gradient(90deg,_#FFFFFF_0%,_#FFFFFF00_100%)] [z-index:2] max-lg:w-[48px]"></div>
          <div className="box-border w-[160px] h-[64px] absolute right-0 top-0 [background-image:linear-gradient(90deg,_#FFFFFF00_0%,_#FFFFFF_100%)] [z-index:2] max-lg:w-[48px]"></div>
        </div>
      ))}
    </div>
  );
}
