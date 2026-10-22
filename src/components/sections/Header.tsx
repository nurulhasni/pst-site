"use client";

import { useState } from "react";
import { Icon } from "@/components/Icon";

const navItems = [
  { label: "Home", href: "#", active: true },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#" },
  { label: "Career", href: "#" },
  { label: "Contact Us", href: "#contact" },
];

const font = "font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif]";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FFFFFF] [border-width:0px_0px_1px_0px] [border-style:solid] [border-color:#D5DADD]">
      <div className="box-border w-full h-[71px] flex flex-row gap-[48px] p-[0px_96px] justify-start items-center max-lg:p-[0px_20px] max-lg:justify-between">
        <a
          href="#"
          className="box-border w-fit shrink-0 h-fit flex flex-row gap-[10px] justify-start items-center"
        >
          <div className="box-border w-[44px] shrink-0 h-[44px] bg-[url('/images/pst/pst-logo.png')] bg-no-repeat bg-contain bg-center"></div>
          <div
            className={`text-[14px]/[16px] box-border text-[#000354] ${font} font-bold text-left [white-space:nowrap]`}
          >
            Prima Sistem
            <br />
            Terpadu
          </div>
        </a>
        <nav className="box-border [flex:1_1_0] h-full flex flex-row gap-[32px] justify-start items-center max-lg:hidden min-w-0">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`box-border w-fit shrink-0 h-full flex flex-col justify-center items-start ${
                item.active
                  ? "[border-width:0px_0px_3px_0px] [border-style:solid] [border-color:#000354] pt-[3px]"
                  : ""
              }`}
            >
              <span
                className={`text-[15px]/[20px] ${font} text-left [white-space:nowrap] ${
                  item.active
                    ? "text-[#000000] font-medium"
                    : "text-[#223548] font-normal hover:text-[#000354]"
                }`}
              >
                {item.label}
              </span>
            </a>
          ))}
        </nav>
        <div className="box-border w-fit shrink-0 h-fit flex flex-row gap-[24px] justify-start items-center max-lg:gap-[16px]">
          <div className="box-border w-fit shrink-0 h-fit flex flex-row gap-[6px] justify-start items-center max-sm:hidden">
            <Icon
              id="globe-ba8fa5"
              className="box-border w-[18px] shrink-0 h-[18px]"
            />
            <div
              className={`text-[14px]/[18px] box-border text-[#000000] ${font} font-medium text-left [white-space:nowrap]`}
            >
              EN
            </div>
            <div
              className={`text-[14px]/[18px] box-border text-[#A9B4BE] ${font} font-normal text-left [white-space:nowrap]`}
            >
              /
            </div>
            <div
              className={`text-[14px]/[18px] box-border text-[#475E75] ${font} font-normal text-left [white-space:nowrap]`}
            >
              ID
            </div>
          </div>
          <a
            href="#contact"
            className="box-border w-fit shrink-0 h-[40px] flex flex-row gap-[8px] p-[0px_20px] justify-center items-center bg-[#000354] hover:bg-[#0B1470] rounded-[8px] max-sm:p-[0px_14px]"
          >
            <span
              className={`text-[15px]/[19px] box-border text-[#FFFFFF] ${font} font-medium text-left [white-space:nowrap]`}
            >
              Get a quote
            </span>
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="hidden max-lg:flex w-[40px] h-[40px] flex-col justify-center items-center gap-[5px] rounded-[8px] [outline:1px_solid_#D5DADD]"
          >
            <span
              className={`block w-[18px] h-[2px] bg-[#000354] transition-transform ${open ? "translate-y-[7px] rotate-45" : ""}`}
            />
            <span
              className={`block w-[18px] h-[2px] bg-[#000354] transition-opacity ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-[18px] h-[2px] bg-[#000354] transition-transform ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>
      {open && (
        <nav className="hidden max-lg:flex flex-col p-[8px_20px_20px_20px] gap-[4px] bg-[#FFFFFF]">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`text-[16px]/[20px] ${font} p-[12px_0px] [border-width:0px_0px_1px_0px] [border-style:solid] [border-color:#EAECEE] ${
                item.active
                  ? "text-[#000354] font-medium"
                  : "text-[#223548] font-normal"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
