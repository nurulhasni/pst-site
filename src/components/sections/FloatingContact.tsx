import { Icon } from "@/components/Icon";

export function FloatingContact() {
  return (
    <div className="box-border w-fit h-fit fixed right-[32px] bottom-[32px] max-sm:right-[16px] max-sm:bottom-[16px] flex flex-col gap-[12px] justify-start items-end [z-index:50]">
      <div className="box-border w-fit h-[60px] shrink-0 [filter:drop-shadow(0px_10px_14px_#00035440)] flex flex-row gap-[12px] p-[0px_22px_0px_8px] max-sm:p-[8px] justify-start items-center bg-[#FFFFFF] [outline:1px_solid_#D5DADD] [outline-offset:-0.5px] rounded-[999px]">
        <div className="box-border w-[44px] shrink-0 h-[44px] flex flex-row gap-0 justify-center items-center bg-[#25D366] rounded-[999px]">
          <Icon
            id="whatsapp-logo-7d2550"
            className="box-border w-[24px] shrink-0 h-[24px]"
          />
        </div>
        <div className="box-border w-fit shrink-0 h-fit flex flex-col gap-[2px] max-sm:hidden justify-start items-start">
          <div className="text-[15px]/[18px] box-border text-[#000354] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-medium text-left [white-space:nowrap]">
            Chat on WhatsApp
          </div>
          <div className="text-[12px]/[14px] box-border text-[#354A5F] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-normal text-left [white-space:nowrap]">
            Talk to our team
          </div>
        </div>
      </div>
      <div className="box-border w-fit h-[60px] shrink-0 [filter:drop-shadow(0px_10px_14px_#00035440)] flex flex-row gap-[12px] p-[0px_22px_0px_8px] max-sm:p-[8px] justify-start items-center bg-[#000354] rounded-[999px]">
        <div className="box-border w-[44px] shrink-0 h-[44px] flex flex-row gap-0 justify-center items-center bg-[#A6CBD3] rounded-[999px]">
          <Icon
            id="sparkles-35d57f"
            className="box-border w-[24px] shrink-0 h-[24px]"
          />
        </div>
        <div className="box-border w-fit shrink-0 h-fit flex flex-col gap-[2px] max-sm:hidden justify-start items-start">
          <div className="text-[15px]/[18px] box-border text-[#FFFFFF] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-medium text-left [white-space:nowrap]">
            PST Assistant
          </div>
          <div className="text-[12px]/[14px] box-border text-[#FFFFFFB3] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-normal text-left [white-space:nowrap]">
            Ask about SAP & our services
          </div>
        </div>
      </div>
    </div>
  );
}
