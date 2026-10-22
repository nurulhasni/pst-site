import { Icon } from "@/components/Icon";

export function Footer() {
  return (
    <div className="box-border w-full h-fit shrink-0 flex flex-col gap-[56px] p-[72px_96px_32px_96px] justify-start items-start bg-[#F5F6F7] [border-width:1px_0px_0px_0px] [border-style:solid] [border-color:#D5DADD] [margin:-0.5px_0px_0px_0px] relative [z-index:11] max-lg:p-[36px_20px_32px_20px] max-lg:gap-[32px]">
      <div className="box-border w-full h-fit shrink-0 flex flex-row gap-[48px] justify-start items-start max-lg:flex-col max-lg:items-stretch max-lg:gap-[32px]">
        <div className="box-border [flex:1_1_0] h-fit flex flex-col gap-[20px] justify-start items-start min-w-0">
          <div className="box-border w-fit h-fit shrink-0 flex flex-row gap-[12px] justify-start items-center">
            <div className="box-border w-[44px] shrink-0 h-[44px] flex flex-row gap-0 justify-start items-start bg-[url('/images/pst/pst-logo.png')] bg-no-repeat bg-contain bg-center"></div>
            <div className="text-[14px]/[16px] box-border text-[#000354] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-bold text-left [white-space:nowrap]">
              Prima Sistem
              <br />
              Terpadu
            </div>
          </div>
          <div className="text-[14px]/[22px] box-border w-[340px] text-[#354A5F] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-normal text-left max-lg:w-full">
            PT Prima Sistem Terpadu is an SAP Silver Partner in Indonesia,
            delivering enterprise technology solutions since 1999.
          </div>
        </div>
        <div className="box-border w-[200px] shrink-0 h-fit flex flex-col gap-[14px] justify-start items-start">
          <div className="text-[14px]/[18px] box-border text-[#000000] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-medium text-left [white-space:nowrap]">
            Company
          </div>
          <div className="text-[14px]/[18px] box-border text-[#354A5F] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-normal text-left [white-space:nowrap]">
            About Us
          </div>
          <div className="text-[14px]/[18px] box-border text-[#354A5F] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-normal text-left [white-space:nowrap]">
            Services
          </div>
          <div className="text-[14px]/[18px] box-border text-[#354A5F] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-normal text-left [white-space:nowrap]">
            Gallery
          </div>
          <div className="text-[14px]/[18px] box-border text-[#354A5F] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-normal text-left [white-space:nowrap]">
            Career
          </div>
        </div>
        <div className="box-border w-[200px] shrink-0 h-fit flex flex-col gap-[14px] justify-start items-start">
          <div className="text-[14px]/[18px] box-border text-[#000000] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-medium text-left [white-space:nowrap]">
            Resources
          </div>
          <div className="text-[14px]/[18px] box-border text-[#354A5F] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-normal text-left [white-space:nowrap]">
            Blog
          </div>
          <div className="text-[14px]/[18px] box-border text-[#354A5F] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-normal text-left [white-space:nowrap]">
            Contact
          </div>
          <div className="text-[14px]/[18px] box-border text-[#354A5F] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-normal text-left [white-space:nowrap]">
            Privacy Policy
          </div>
          <div className="text-[14px]/[18px] box-border text-[#354A5F] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-normal text-left [white-space:nowrap]">
            Terms of Service
          </div>
        </div>
        <div className="box-border w-[300px] shrink-0 h-fit flex flex-col gap-[14px] justify-start items-start max-lg:w-full">
          <div className="text-[14px]/[18px] box-border text-[#000000] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-medium text-left [white-space:nowrap]">
            Contact
          </div>
          <div className="box-border w-full h-fit shrink-0 flex flex-row gap-[10px] justify-start items-start">
            <Icon
              id="map-pin-d66139"
              className="box-border w-[16px] shrink-0 h-[16px]"
            />
            <div className="text-[14px]/[20px] box-border [flex:1_1_0] text-[#354A5F] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-normal text-left min-w-0">
              Jalan Sumur Batu VI Blok E No.3
              <br />
              Jakarta Pusat, Indonesia 10640
            </div>
          </div>
          <div className="box-border w-full h-fit shrink-0 flex flex-row gap-[10px] justify-start items-start">
            <Icon
              id="mail-82c56f"
              className="box-border w-[16px] shrink-0 h-[16px]"
            />
            <div className="text-[14px]/[20px] box-border [flex:1_1_0] text-[#354A5F] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-normal text-left min-w-0">
              Sales: marketing@pst.co.id
            </div>
          </div>
          <div className="box-border w-full h-fit shrink-0 flex flex-row gap-[10px] justify-start items-start">
            <Icon
              id="briefcase-09c5d9"
              className="box-border w-[16px] shrink-0 h-[16px]"
            />
            <div className="text-[14px]/[20px] box-border [flex:1_1_0] text-[#354A5F] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-normal text-left min-w-0">
              Career: recruitment@pst.co.id
            </div>
          </div>
          <div className="box-border w-full h-fit shrink-0 flex flex-row gap-[10px] justify-start items-start">
            <Icon
              id="phone-9c4018"
              className="box-border w-[16px] shrink-0 h-[16px]"
            />
            <div className="text-[14px]/[20px] box-border [flex:1_1_0] text-[#354A5F] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-normal text-left min-w-0">
              +62 21 4204626 / +62 21 50919968
            </div>
          </div>
        </div>
      </div>
      <div className="[box-sizing:content-box] max-lg:box-border w-[1248px] h-[59.5px] shrink-0 flex flex-row gap-0 p-[24px_0px_0px_0px] justify-between items-center [border-width:1px_0px_0px_0px] [border-style:solid] [border-color:#D5DADD] [margin:-0.5px_0px_0px_0px] max-lg:w-full">
        <div className="text-[12px]/[16px] box-border text-[#354A5F] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-normal text-left [white-space:nowrap]">
          © 2026 PT Prima Sistem Terpadu. All rights reserved.
        </div>
        <div className="box-border w-fit shrink-0 h-fit flex flex-row gap-[8px] justify-start items-start">
          <div className="box-border w-[36px] shrink-0 h-[36px] flex flex-row gap-0 justify-center items-center bg-[#FFFFFF] [outline:1px_solid_#D5DADD] [outline-offset:-0.5px] rounded-[8px]">
            <Icon
              id="linkedin-36a16b"
              className="box-border w-[16px] shrink-0 h-[16px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
