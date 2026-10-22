import { Icon } from "@/components/Icon";
import { getInsights } from "@/lib/sheets";

export async function Insights() {
  const posts = await getInsights();

  return (
    <div className="box-border w-full h-fit shrink-0 flex flex-col gap-[56px] p-[120px_96px] justify-start items-start relative [z-index:9] max-lg:p-[60px_20px_60px_20px] max-lg:gap-[32px]">
      <div className="box-border w-full h-fit shrink-0 flex flex-row flex-wrap gap-[16px] justify-between items-end">
        <div className="box-border w-fit shrink-0 h-fit flex flex-col gap-[16px] justify-start items-start">
          <div className="box-border w-fit h-fit shrink-0 flex flex-row gap-0 justify-start items-start">
            <div className="text-[12px]/[15px] box-border text-[#2F6E80] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-medium tracking-[1.2px] text-left [white-space:nowrap]">
              LATEST INSIGHTS
            </div>
          </div>
          <div className="text-[48px]/[53px] box-border text-[#000000] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-medium text-left [white-space:nowrap] max-lg:text-[32px]/[35px] max-lg:whitespace-normal">
            From our blog
          </div>
        </div>
        <div className="box-border w-fit shrink-0 h-[48px] flex flex-row gap-[8px] p-[0px_24px] justify-center items-center bg-[#FFFFFF] [outline:1px_solid_#000354] [outline-offset:-0.5px] rounded-[8px]">
          <div className="text-[16px]/[20px] box-border text-[#2F6E80] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-medium text-left [white-space:nowrap]">
            View all insights
          </div>
        </div>
      </div>
      <div className="box-border w-full h-fit shrink-0 flex flex-row gap-[32px] justify-start items-start max-lg:flex-col max-lg:items-stretch">
        {posts.map((post) => (
          <div
            key={post.title}
            className="box-border [flex:1_1_0] h-fit flex flex-col gap-[16px] justify-start items-start min-w-0"
          >
            <div
              className="box-border w-full h-[220px] shrink-0 bg-no-repeat bg-cover bg-center rounded-[12px] overflow-hidden max-lg:h-[154px]"
              style={{ backgroundImage: `url(${post.image})` }}
            ></div>
            <div className="box-border w-full h-fit shrink-0 flex flex-col gap-[8px] justify-start items-start">
              <div className="text-[12px]/[15px] box-border text-[#2F6E80] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-medium tracking-[1.2px] text-left [white-space:nowrap]">
                {post.category}
              </div>
              <div className="text-[24px]/[28px] box-border w-full text-[#000000] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-medium text-left">
                {post.title}
              </div>
              <div className="text-[16px]/[24px] box-border w-full text-[#354A5F] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-normal text-left">
                {post.excerpt}
              </div>
            </div>
            <a
              href={post.url}
              className="box-border w-fit h-fit shrink-0 flex flex-row gap-[4px] justify-start items-center"
            >
              <div className="text-[16px]/[20px] box-border text-[#2F6E80] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-medium text-left [white-space:nowrap]">
                Read article
              </div>
              <Icon
                id="chevron-right-d09dc3"
                className="box-border w-[16px] shrink-0 h-[16px]"
              />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
