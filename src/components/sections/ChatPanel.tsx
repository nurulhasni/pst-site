"use client";

import { useState } from "react";
import { Minus, Send, X } from "lucide-react";
import { Icon } from "@/components/Icon";
import { useLanguage } from "@/components/LanguageProvider";

const font = "font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif]";

const suggestionKeys = ["chat.q1", "chat.q2", "chat.q3", "chat.q4"];

type ChatPanelProps = {
  onClose: () => void;
};

export function ChatPanel({ onClose }: ChatPanelProps) {
  const { t } = useLanguage();
  const [input, setInput] = useState("");

  return (
    <div
      role="dialog"
      aria-label={t("float.assistant")}
      className="fixed right-[32px] bottom-[104px] z-[50] w-[400px] max-w-[calc(100vw-32px)] h-[640px] max-h-[calc(100vh-136px)] flex flex-col overflow-hidden bg-[#FFFFFF] rounded-[16px] [box-shadow:0px_10px_30px_#00035433] max-sm:left-[16px] max-sm:right-[16px] max-sm:w-auto"
    >
      <div className="box-border w-full h-[72px] shrink-0 flex flex-row gap-[12px] p-[16px_16px_16px_20px] items-center [background-image:linear-gradient(90deg,_#08174A_0%,_#2B1C8F_100%)]">
        <div className="box-border w-[40px] h-[40px] shrink-0 flex items-center justify-center bg-[#A6CBD3] rounded-[999px]">
          <Icon id="sparkles-35d57f" className="box-border w-[20px] h-[20px]" />
        </div>
        <div className="box-border [flex:1_1_0] min-w-0 flex flex-col gap-[2px]">
          <div className={`text-[16px]/[22px] text-[#FFFFFF] ${font} font-medium`}>{t("float.assistant")}</div>
          <div className={`text-[12px]/[16px] text-[#FFFFFFB3] ${font}`}>{t("chat.online")}</div>
        </div>
        <button
          type="button"
          aria-label={t("chat.minimize")}
          onClick={onClose}
          className="box-border w-[32px] h-[32px] shrink-0 flex items-center justify-center bg-[#FFFFFF14] hover:bg-[#FFFFFF26] rounded-[8px]"
        >
          <Minus size={16} className="text-[#FFFFFF]" />
        </button>
        <button
          type="button"
          aria-label={t("chat.close")}
          onClick={onClose}
          className="box-border w-[32px] h-[32px] shrink-0 flex items-center justify-center bg-[#FFFFFF14] hover:bg-[#FFFFFF26] rounded-[8px]"
        >
          <X size={16} className="text-[#FFFFFF]" />
        </button>
      </div>

      <div className="box-border w-full [flex:1_1_0] min-h-0 flex flex-col gap-[12px] p-[16px] overflow-y-auto bg-[#F5F6F7]">
        <div className="box-border w-full flex flex-col gap-[10px] p-[4px_8px] items-center">
          <div
            role="img"
            aria-label={t("chat.logo")}
            className="box-border w-[48px] h-[48px] bg-[url('/images/pst/pst-logo.png')] bg-no-repeat bg-contain bg-center rounded-[999px] bg-[#FFFFFF]"
          />
          <div className={`text-[20px]/[27px] text-[#000000] text-center ${font} font-medium`}>{t("chat.hi")}</div>
          <div className={`text-[14px]/[21px] text-[#354A5F] text-center max-w-[300px] ${font}`}>{t("chat.desc")}</div>
        </div>

        <div className={`text-[11px]/[15px] text-[#8396A8] ${font} font-medium`}>{t("chat.suggested")}</div>
        <div className="box-border w-full flex flex-col gap-[8px]">
          {suggestionKeys.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setInput(t(key))}
              className={`box-border w-full p-[10px_12px] flex items-center bg-[#FFFFFF] hover:bg-[#EAF3F5] rounded-[8px] text-left text-[14px]/[19px] text-[#223548] ${font} font-medium`}
            >
              {t(key)}
            </button>
          ))}
        </div>

        <div className="box-border w-full flex flex-row flex-wrap gap-[6px] pt-[6px] items-center justify-center">
          <span className={`text-[13px]/[18px] text-[#8396A8] ${font}`}>{t("chat.prefer")}</span>
          <a
            href="https://wa.me/62818653218"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex flex-row gap-[6px] items-center text-[13px]/[18px] text-[#2F6E80] hover:text-[#000354] ${font} font-medium`}
          >
            <Icon id="whatsapp-logo-7d2550" fill="#1DA851" className="box-border w-[16px] h-[16px] shrink-0" />
            {t("chat.whatsapp")}
          </a>
        </div>
      </div>

      <div className="box-border w-full shrink-0 flex flex-col gap-[8px] p-[12px_16px] bg-[#FFFFFF]">
        <div className="box-border w-full flex flex-row gap-[8px] items-center">
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={t("chat.placeholder")}
            className={`box-border [flex:1_1_0] min-w-0 h-[44px] px-[14px] bg-[#F5F6F7] [outline:1px_solid_#D5DADD] [outline-offset:-0.5px] rounded-[999px] text-[14px] text-[#000000] ${font} placeholder:text-[#A9B4BE] outline-none focus:[outline:2px_solid_#2F6E80] focus:[outline-offset:-1px]`}
          />
          <button
            type="button"
            aria-label={t("chat.send")}
            className="box-border w-[44px] h-[44px] shrink-0 flex items-center justify-center bg-[#000354] hover:bg-[#0B1470] rounded-[999px]"
          >
            <Send size={18} className="text-[#FFFFFF]" />
          </button>
        </div>
        <p className={`text-[11px]/[15px] text-[#8396A8] ${font}`}>{t("chat.disclaimer")}</p>
      </div>
    </div>
  );
}
