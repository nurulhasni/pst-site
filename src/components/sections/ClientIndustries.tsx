"use client";

import { useState } from "react";
import { Factory, Landmark, LayoutGrid, Pickaxe, Ship, ShoppingBasket, type LucideIcon } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

const font = "font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif]";

const filters = [
  { key: "ci.all", count: 18, match: null },
  { key: "ci.heavy", count: 5, match: "Heavy Equipment & Manufacturing" },
  { key: "ci.maritime", count: 3, match: "Maritime & Transportation" },
  { key: "ci.mining", count: 2, match: "Mining, Energy & Construction" },
  { key: "ci.finance", count: 3, match: "Finance, Technology & Education" },
  { key: "ci.consumer", count: 1, match: "Consumer Goods" },
  { key: "ci.other", count: 4, match: "Other Industries" },
];

const industries: { name: string; nameKey: string; clients: number; Icon: LucideIcon; logos: string[] }[] = [
  {
    name: "Heavy Equipment & Manufacturing",
    nameKey: "ci.name.heavy",
    clients: 5,
    Icon: Factory,
    logos: ["utpe", "komatsu-undercarriage", "reman", "dharma-polimetal", "triatra"],
  },
  {
    name: "Maritime & Transportation",
    nameKey: "ci.name.maritime",
    clients: 3,
    Icon: Ship,
    logos: ["pml", "pmp", "kcic"],
  },
  {
    name: "Mining, Energy & Construction",
    nameKey: "ci.name.mining",
    clients: 2,
    Icon: Pickaxe,
    logos: ["ithaca", "nusacipta"],
  },
  {
    name: "Finance, Technology & Education",
    nameKey: "ci.name.finance",
    clients: 3,
    Icon: Landmark,
    logos: ["jalin", "wipro", "edugate"],
  },
  { name: "Consumer Goods", nameKey: "ci.name.consumer", clients: 1, Icon: ShoppingBasket, logos: ["nabati"] },
  {
    name: "Other Industries",
    nameKey: "ci.name.other",
    clients: 4,
    Icon: LayoutGrid,
    logos: ["canopus", "bsm", "lg", "monogram"],
  },
];

export function ClientIndustries() {
  const { t } = useLanguage();
  const [selected, setSelected] = useState(0);
  const visible = filters[selected].match
    ? industries.filter((industry) => industry.name === filters[selected].match)
    : industries;

  return (
    <>
      <div className="box-border w-full h-fit flex flex-row flex-wrap gap-[8px]">
        {filters.map((filter, index) => (
          <button
            key={filter.key}
            type="button"
            aria-pressed={selected === index}
            onClick={() => setSelected(index)}
            className={`box-border w-fit h-[36px] p-[0px_16px] flex flex-row gap-[8px] items-center rounded-[999px] text-[14px] ${font} font-medium cursor-pointer transition-colors ${
              selected === index
                ? "bg-[#000354] hover:bg-[#0B1470] text-[#FFFFFF]"
                : "bg-[#FFFFFF] hover:bg-[#EAF3F5] text-[#223548] [outline:1px_solid_#D5DADD] [outline-offset:-0.5px]"
            }`}
          >
            {t(filter.key)}
            <span className={`text-[12px]/[16px] ${selected === index ? "text-[#A6CBD3]" : "text-[#475E75]"}`}>{filter.count}</span>
          </button>
        ))}
      </div>
      <div className="box-border w-full h-fit flex flex-col">
        {visible.map((industry) => (
          <div
            key={industry.name}
            className="box-border w-full min-h-[160px] flex flex-row gap-[48px] py-[24px] items-center [border-width:0px_0px_1px_0px] [border-style:solid] [border-color:#D5DADD] max-lg:flex-col max-lg:items-stretch max-lg:gap-[16px]"
          >
            <div className="box-border w-[300px] max-lg:w-full shrink-0 flex flex-row gap-[16px] items-center">
              <div className="box-border w-[48px] h-[48px] shrink-0 flex items-center justify-center bg-[#EAF3F5] rounded-[8px]">
                <industry.Icon size={22} className="text-[#2F6E80]" />
              </div>
              <div className="box-border w-full flex flex-col gap-[4px]">
                <div className={`text-[18px]/[22px] text-[#000000] ${font} font-medium`}>{t(industry.nameKey)}</div>
                <div className={`text-[13px]/[17px] text-[#475E75] ${font}`}>
                  {industry.clients} {industry.clients === 1 ? t("ci.client") : t("ci.clients")}
                </div>
              </div>
            </div>
            <div className="box-border [flex:1_1_0] min-w-0 flex flex-row flex-wrap gap-[16px] items-center">
              {industry.logos.map((logo) => (
                <div
                  key={logo}
                  role="img"
                  aria-label={logo}
                  className="box-border w-[160px] h-[104px] shrink-0 flex items-center justify-center max-lg:w-[120px] max-lg:h-[80px]"
                >
                  <div
                    className="box-border w-[112px] h-[68px] bg-no-repeat bg-contain bg-center max-lg:w-[88px] max-lg:h-[54px]"
                    style={{ backgroundImage: `url(/images/pst/clients/${logo}.png)` }}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
