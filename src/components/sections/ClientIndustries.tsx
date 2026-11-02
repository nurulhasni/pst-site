"use client";

import { useState } from "react";
import { Factory, Landmark, LayoutGrid, Pickaxe, Ship, ShoppingBasket, type LucideIcon } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { industries, type PublicClient } from "@/lib/clientModel";

const font = "font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif]";

const industryIcons: Record<string, LucideIcon> = {
  heavy: Factory,
  maritime: Ship,
  mining: Pickaxe,
  finance: Landmark,
  consumer: ShoppingBasket,
  other: LayoutGrid,
};

type Group = { name: string; key?: string; clients: PublicClient[] };

// Known industries keep their usual order; anything typed differently in the
// Sheet gets its own group after them instead of disappearing.
function groupByIndustry(clients: PublicClient[]): Group[] {
  const known = industries.map((industry) => ({
    ...industry,
    clients: clients.filter((c) => c.industry === industry.name),
  }));
  const extraNames = [...new Set(clients.map((c) => c.industry).filter((name) => !industries.some((i) => i.name === name)))];
  const extra = extraNames.map((name) => ({ name, clients: clients.filter((c) => c.industry === name) }));
  return [...known, ...extra].filter((group) => group.clients.length);
}

export function ClientIndustries({ clients }: { clients: PublicClient[] }) {
  const { t } = useLanguage();
  const [selected, setSelected] = useState<string | null>(null);
  const groups = groupByIndustry(clients);
  const label = (group: Group) => (group.key ? t(`ci.name.${group.key}`) : group.name);
  const filterLabel = (group: Group) => (group.key ? t(`ci.${group.key}`) : group.name);
  const visible = selected ? groups.filter((group) => group.name === selected) : groups;

  return (
    <>
      <div className="box-border w-full h-fit flex flex-row flex-wrap gap-[8px]">
        {[null, ...groups].map((group) => {
          const isActive = selected === (group?.name ?? null);
          return (
            <button
              key={group?.name ?? "all"}
              type="button"
              aria-pressed={isActive}
              onClick={() => setSelected(group?.name ?? null)}
              className={`box-border w-fit h-[36px] p-[0px_16px] flex flex-row gap-[8px] items-center rounded-[999px] text-[14px] ${font} font-medium cursor-pointer transition-colors ${
                isActive
                  ? "bg-[#000354] hover:bg-[#0B1470] text-[#FFFFFF]"
                  : "bg-[#FFFFFF] hover:bg-[#EAF3F5] text-[#223548] [outline:1px_solid_#D5DADD] [outline-offset:-0.5px]"
              }`}
            >
              {group ? filterLabel(group) : t("ci.all")}
              <span className={`text-[12px]/[16px] ${isActive ? "text-[#A6CBD3]" : "text-[#475E75]"}`}>{group ? group.clients.length : clients.length}</span>
            </button>
          );
        })}
      </div>
      <div className="box-border w-full h-fit flex flex-col">
        {visible.map((group) => {
          const Icon = (group.key && industryIcons[group.key]) || LayoutGrid;
          return (
            <div
              key={group.name}
              className="box-border w-full min-h-[160px] flex flex-row gap-[48px] py-[24px] items-center [border-width:0px_0px_1px_0px] [border-style:solid] [border-color:#D5DADD] max-lg:flex-col max-lg:items-stretch max-lg:gap-[16px]"
            >
              <div className="box-border w-[300px] max-lg:w-full shrink-0 flex flex-row gap-[16px] items-center">
                <div className="box-border w-[48px] h-[48px] shrink-0 flex items-center justify-center bg-[#EAF3F5] rounded-[8px]">
                  <Icon size={22} className="text-[#2F6E80]" />
                </div>
                <div className="box-border w-full flex flex-col gap-[4px]">
                  <div className={`text-[18px]/[22px] text-[#000000] ${font} font-medium`}>{label(group)}</div>
                  <div className={`text-[13px]/[17px] text-[#475E75] ${font}`}>
                    {group.clients.length} {group.clients.length === 1 ? t("ci.client") : t("ci.clients")}
                  </div>
                </div>
              </div>
              <div className="box-border [flex:1_1_0] min-w-0 flex flex-row flex-wrap gap-[16px] items-center">
                {group.clients.map((client) => (
                  <div
                    key={client.id}
                    role="img"
                    aria-label={client.name}
                    title={client.name}
                    className="box-border w-[160px] h-[104px] shrink-0 flex items-center justify-center max-lg:w-[120px] max-lg:h-[80px]"
                  >
                    <div
                      className="box-border w-[112px] h-[68px] bg-no-repeat bg-contain bg-center max-lg:w-[88px] max-lg:h-[54px]"
                      style={{ backgroundImage: `url(${client.logo})` }}
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
