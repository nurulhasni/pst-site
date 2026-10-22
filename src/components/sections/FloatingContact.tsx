"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { ChatPanel } from "@/components/sections/ChatPanel";
import { Icon } from "@/components/Icon";
import { useLanguage } from "@/components/LanguageProvider";

export function FloatingContact() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  function toggleGroup() {
    if (chatOpen) {
      setChatOpen(false);
      return;
    }
    setOpen(!open);
  }

  return (
    <>
      <div className="box-border w-fit h-fit fixed right-[32px] bottom-[32px] max-sm:right-[16px] max-sm:bottom-[16px] flex flex-col gap-[12px] justify-start items-end [z-index:50]">
        <div
          aria-hidden={!open}
          className={`flex flex-col gap-[12px] justify-start items-end transition-all duration-300 ease-out origin-bottom-right ${
            open ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-[16px] scale-95 pointer-events-none"
          }`}
        >
          <a
            href="https://wa.me/62818653218"
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={open ? 0 : -1}
            className="box-border w-fit h-[60px] shrink-0 [filter:drop-shadow(0px_10px_14px_#00035440)] flex flex-row gap-[12px] p-[0px_22px_0px_8px] max-sm:p-[8px] justify-start items-center bg-[#FFFFFF] [outline:1px_solid_#D5DADD] [outline-offset:-0.5px] rounded-[999px] hover:bg-[#EAF3F5]"
          >
            <div className="box-border w-[44px] shrink-0 h-[44px] flex flex-row gap-0 justify-center items-center bg-[#25D366] rounded-[999px]">
              <Icon id="whatsapp-logo-7d2550" className="box-border w-[24px] shrink-0 h-[24px]" />
            </div>
            <div className="box-border w-fit shrink-0 h-fit flex flex-col gap-[2px] max-sm:hidden justify-start items-start">
              <div className="text-[15px]/[18px] box-border text-[#000354] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-medium text-left [white-space:nowrap]">
                {t("float.whatsapp")}
              </div>
              <div className="text-[12px]/[14px] box-border text-[#354A5F] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-normal text-left [white-space:nowrap]">
                {t("float.whatsappSub")}
              </div>
            </div>
          </a>
          <button
            type="button"
            tabIndex={open ? 0 : -1}
            onClick={() => {
              setOpen(false);
              setChatOpen(true);
            }}
            className="box-border w-fit h-[60px] shrink-0 [filter:drop-shadow(0px_10px_14px_#00035440)] flex flex-row gap-[12px] p-[0px_22px_0px_8px] max-sm:p-[8px] justify-start items-center bg-[#000354] hover:bg-[#0B1470] rounded-[999px]"
          >
            <div className="box-border w-[44px] shrink-0 h-[44px] flex flex-row gap-0 justify-center items-center bg-[#A6CBD3] rounded-[999px]">
              <Icon id="sparkles-35d57f" className="box-border w-[24px] shrink-0 h-[24px]" />
            </div>
            <div className="box-border w-fit shrink-0 h-fit flex flex-col gap-[2px] max-sm:hidden justify-start items-start">
              <div className="text-[15px]/[18px] box-border text-[#FFFFFF] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-medium text-left [white-space:nowrap]">
                {t("float.assistant")}
              </div>
              <div className="text-[12px]/[14px] box-border text-[#FFFFFFB3] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-normal text-left [white-space:nowrap]">
                {t("float.assistantSub")}
              </div>
            </div>
          </button>
        </div>
        <button
          type="button"
          aria-expanded={chatOpen ? true : open}
          aria-label={chatOpen || open ? t("float.closeLabel") : t("float.openLabel")}
          onClick={toggleGroup}
          className="box-border w-[56px] h-[56px] flex items-center justify-center bg-[#000354] hover:bg-[#0B1470] [filter:drop-shadow(0px_10px_14px_#00035440)] rounded-[999px]"
        >
          {chatOpen || open ? <X size={24} className="text-[#FFFFFF]" /> : <MessageCircle size={24} className="text-[#FFFFFF]" />}
        </button>
      </div>
      {chatOpen && <ChatPanel onClose={() => setChatOpen(false)} />}
    </>
  );
}
