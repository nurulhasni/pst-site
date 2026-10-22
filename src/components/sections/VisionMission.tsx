import { Icon } from "@/components/Icon";

export function VisionMission() {
  return (
    <div className="box-border w-full h-fit shrink-0 flex flex-row gap-[80px] p-[120px_96px] justify-start items-start bg-[#F5F6F7] relative [z-index:7] max-lg:p-[60px_20px_60px_20px] max-lg:flex-col max-lg:items-stretch max-lg:gap-[32px]">
      <div className="box-border w-[380px] shrink-0 h-fit flex flex-col gap-[24px] justify-start items-start max-lg:w-full">
        <div className="box-border w-fit h-fit shrink-0 flex flex-row gap-0 justify-start items-start">
          <div className="text-[12px]/[15px] box-border text-[#2F6E80] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-medium tracking-[1.2px] text-left [white-space:nowrap]">
            OUR FOUNDATION
          </div>
        </div>
        <div className="text-[48px]/[53px] box-border text-[#000000] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-medium text-left [white-space:nowrap] max-lg:text-[32px]/[35px] max-lg:whitespace-normal">
          Vision & mission
        </div>
        <div className="text-[18px]/[27px] box-border w-full text-[#354A5F] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-normal text-left">
          What guides every engagement, from the first workshop to long-term
          support.
        </div>
      </div>
      <div className="box-border [flex:1_1_0] h-fit flex flex-row gap-[24px] justify-start items-start max-lg:flex-col max-lg:items-stretch min-w-0">
        <div className="box-border [flex:1_1_0] h-fit [box-shadow:0px_2px_4px_#22364933] flex flex-col gap-[20px] p-[40px] justify-start items-start bg-[#FFFFFF] rounded-[12px] max-lg:p-[24px_20px_24px_20px] min-w-0">
          <div className="box-border w-full h-fit shrink-0 flex flex-row gap-0 justify-between items-center">
            <Icon
              id="telescope-a00dba"
              className="box-border w-[28px] shrink-0 h-[28px]"
            />
            <div className="text-[40px]/[40px] box-border text-[#A6CBD3] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-medium text-left [white-space:nowrap] max-lg:text-[30px]/[30px] max-lg:whitespace-normal">
              01
            </div>
          </div>
          <div className="text-[28px]/[31px] box-border text-[#000000] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-medium text-left [white-space:nowrap] max-lg:text-[24px]/[27px] max-lg:whitespace-normal">
            Our vision
          </div>
          <div className="text-[16px]/[26px] box-border w-full text-[#354A5F] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-normal text-left">
            Apply suitable world-class best practices into all range of
            industries through rapid and efficient implementation of IT as a
            competitive tool for winning the global competition.
          </div>
        </div>
        <div className="box-border [flex:1_1_0] h-fit [box-shadow:0px_2px_4px_#22364933] flex flex-col gap-[20px] p-[40px] justify-start items-start bg-[#FFFFFF] rounded-[12px] max-lg:p-[24px_20px_24px_20px] min-w-0">
          <div className="box-border w-full h-fit shrink-0 flex flex-row gap-0 justify-between items-center">
            <Icon
              id="target-15adad"
              className="box-border w-[28px] shrink-0 h-[28px]"
            />
            <div className="text-[40px]/[40px] box-border text-[#A6CBD3] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-medium text-left [white-space:nowrap] max-lg:text-[30px]/[30px] max-lg:whitespace-normal">
              02
            </div>
          </div>
          <div className="text-[28px]/[31px] box-border text-[#000000] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-medium text-left [white-space:nowrap] max-lg:text-[24px]/[27px] max-lg:whitespace-normal">
            Our mission
          </div>
          <div className="text-[16px]/[26px] box-border w-full text-[#354A5F] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-normal text-left">
            To be a valuable asset for the nation in helping local companies
            save their IT project investment and prepare their human resource
            competencies in applicable IT.
          </div>
        </div>
      </div>
    </div>
  );
}
