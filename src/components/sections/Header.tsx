"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { Icon } from "@/components/Icon";
import { useLanguage } from "@/components/LanguageProvider";

type NavChild = { labelKey: string; href: string };
type NavItem = { labelKey: string; href?: string; children?: NavChild[] };

const navItems: NavItem[] = [
  { labelKey: "nav.home", href: "/" },
  {
    labelKey: "nav.about",
    children: [
      { labelKey: "nav.aboutUs", href: "/about" },
      { labelKey: "nav.services", href: "/services" },
      { labelKey: "nav.career", href: "/career" },
    ],
  },
  {
    labelKey: "nav.content",
    children: [
      { labelKey: "nav.gallery", href: "/gallery" },
      { labelKey: "nav.blog", href: "/blog" },
    ],
  },
];

const font = "font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif]";

function isActivePath(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const { lang, setLang, t } = useLanguage();

  if (pathname.startsWith("/admin")) return null;

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FFFFFF] [border-width:0px_0px_1px_0px] [border-style:solid] [border-color:#D5DADD]">
      <div className="box-border w-full h-[71px] flex flex-row gap-[48px] p-[0px_96px] justify-start items-center max-lg:p-[0px_20px] max-lg:justify-between">
        <Link href="/" className="box-border w-fit shrink-0 h-fit flex flex-row gap-[10px] justify-start items-center">
          <div className="box-border w-[44px] shrink-0 h-[44px] bg-[url('/images/pst/pst-logo.png')] bg-no-repeat bg-contain bg-center"></div>
          <div className={`text-[14px]/[16px] box-border text-[#000354] ${font} font-bold text-left [white-space:nowrap]`}>
            Prima Sistem
            <br />
            Terpadu
          </div>
        </Link>
        <nav className="box-border [flex:1_1_0] h-full flex flex-row gap-[32px] justify-start items-center max-lg:hidden min-w-0">
          {navItems.map((item) => {
            const label = t(item.labelKey);
            if (!item.children) {
              const active = isActivePath(pathname, item.href ?? "/");
              return (
                <Link
                  key={item.labelKey}
                  href={item.href ?? "/"}
                  className={`box-border w-fit shrink-0 h-full flex flex-col justify-center items-start ${
                    active ? "[border-width:0px_0px_3px_0px] [border-style:solid] [border-color:#000354] pt-[3px]" : ""
                  }`}
                >
                  <span
                    className={`text-[15px]/[20px] ${font} text-left [white-space:nowrap] ${
                      active ? "text-[#000000] font-medium" : "text-[#223548] font-normal hover:text-[#000354]"
                    }`}
                  >
                    {label}
                  </span>
                </Link>
              );
            }

            const active = item.children.some((child) => isActivePath(pathname, child.href ?? ""));
            const isOpen = dropdown === item.labelKey;
            return (
              <div
                key={item.labelKey}
                className="relative box-border w-fit shrink-0 h-full flex flex-col justify-center items-start"
                onMouseEnter={() => setDropdown(item.labelKey)}
                onMouseLeave={() => setDropdown(null)}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setDropdown(isOpen ? null : item.labelKey)}
                  className={`box-border w-fit h-full flex flex-row gap-[4px] justify-center items-center cursor-pointer ${
                    active ? "[border-width:0px_0px_3px_0px] [border-style:solid] [border-color:#000354] pt-[3px]" : ""
                  }`}
                >
                  <span
                    className={`text-[15px]/[20px] ${font} text-left [white-space:nowrap] ${
                      active ? "text-[#000000] font-medium" : "text-[#223548] font-normal hover:text-[#000354]"
                    }`}
                  >
                    {label}
                  </span>
                  <ChevronDown size={14} className={`text-[#475E75] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                </button>
                <div
                  className={`absolute left-0 top-full pt-[12px] transition-all duration-200 ${
                    isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-[4px] pointer-events-none"
                  }`}
                >
                  <div className="box-border w-[220px] flex flex-col gap-[2px] p-[8px] bg-[#FFFFFF] rounded-[8px] [box-shadow:0px_10px_30px_#00035433] [outline:1px_solid_#D5DADD] [outline-offset:-0.5px]">
                    {item.children.map((child) => {
                      const childActive = isActivePath(pathname, child.href);
                      return (
                        <Link
                          key={child.labelKey}
                          href={child.href}
                          onClick={() => setDropdown(null)}
                          className={`box-border w-full p-[10px_12px] rounded-[6px] text-[15px]/[20px] ${font} transition-colors ${
                            childActive
                              ? "bg-[#EAF3F5] text-[#000354] font-medium"
                              : "text-[#223548] font-normal hover:bg-[#EAF3F5] hover:text-[#000354]"
                          }`}
                        >
                          {t(child.labelKey)}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>
        <div className="box-border w-fit shrink-0 h-fit flex flex-row gap-[24px] justify-start items-center max-lg:gap-[16px]">
          <div className="box-border w-fit shrink-0 h-fit flex flex-row gap-[6px] justify-start items-center max-sm:hidden">
            <Icon id="globe-ba8fa5" className="box-border w-[18px] shrink-0 h-[18px]" />
            <button
              type="button"
              onClick={() => setLang("en")}
              aria-pressed={lang === "en"}
              className={`text-[14px]/[18px] box-border ${font} text-left [white-space:nowrap] cursor-pointer ${
                lang === "en" ? "text-[#000000] font-medium" : "text-[#475E75] font-normal hover:text-[#000354]"
              }`}
            >
              EN
            </button>
            <div className={`text-[14px]/[18px] box-border text-[#A9B4BE] ${font} font-normal text-left [white-space:nowrap]`}>/</div>
            <button
              type="button"
              onClick={() => setLang("id")}
              aria-pressed={lang === "id"}
              className={`text-[14px]/[18px] box-border ${font} text-left [white-space:nowrap] cursor-pointer ${
                lang === "id" ? "text-[#000000] font-medium" : "text-[#475E75] font-normal hover:text-[#000354]"
              }`}
            >
              ID
            </button>
          </div>
          <Link
            href="/contact"
            className="box-border w-fit shrink-0 h-[40px] flex flex-row gap-[8px] p-[0px_20px] justify-center items-center bg-[#000354] hover:bg-[#0B1470] rounded-[8px] max-sm:p-[0px_14px]"
          >
            <span className={`text-[15px]/[19px] box-border text-[#FFFFFF] ${font} font-medium text-left [white-space:nowrap]`}>{t("nav.quote")}</span>
          </Link>
          <button
            type="button"
            aria-label={open ? t("nav.closeMenu") : t("nav.openMenu")}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="hidden max-lg:flex w-[40px] h-[40px] flex-col justify-center items-center gap-[5px] rounded-[8px] hover:bg-[#EAF3F5] [outline:1px_solid_#D5DADD]"
          >
            <span className={`block w-[18px] h-[2px] bg-[#000354] transition-transform ${open ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`block w-[18px] h-[2px] bg-[#000354] transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`block w-[18px] h-[2px] bg-[#000354] transition-transform ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>
      {open && (
        <nav className="hidden max-lg:flex flex-col p-[8px_20px_20px_20px] gap-[4px] bg-[#FFFFFF]">
          {navItems.map((item) =>
            item.children ? (
              <div key={item.labelKey} className="flex flex-col">
                <div className={`text-[13px]/[17px] text-[#2F6E80] ${font} font-medium tracking-[1.2px] pt-[12px] pb-[4px]`}>
                  {t(item.labelKey).toUpperCase()}
                </div>
                {item.children.map((child) => {
                  const active = isActivePath(pathname, child.href);
                  return (
                    <Link
                      key={child.labelKey}
                      href={child.href}
                      onClick={() => setOpen(false)}
                      className={`text-[16px]/[20px] ${font} p-[12px_0px_12px_12px] [border-width:0px_0px_1px_0px] [border-style:solid] [border-color:#EAECEE] ${
                        active ? "text-[#000354] font-medium" : "text-[#223548] font-normal hover:text-[#000354]"
                      }`}
                    >
                      {t(child.labelKey)}
                    </Link>
                  );
                })}
              </div>
            ) : (
              <Link
                key={item.labelKey}
                href={item.href ?? "/"}
                onClick={() => setOpen(false)}
                className={`text-[16px]/[20px] ${font} p-[12px_0px] [border-width:0px_0px_1px_0px] [border-style:solid] [border-color:#EAECEE] ${
                  isActivePath(pathname, item.href ?? "/") ? "text-[#000354] font-medium" : "text-[#223548] font-normal hover:text-[#000354]"
                }`}
              >
                {t(item.labelKey)}
              </Link>
            ),
          )}
        </nav>
      )}
    </header>
  );
}
