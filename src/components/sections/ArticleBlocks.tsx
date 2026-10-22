import type { Block } from "@/lib/blog";
import { figureImage } from "@/lib/blog";

const font = "font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif]";

export function ArticleBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="box-border w-full h-fit flex flex-col gap-[24px] justify-start items-start">
      {blocks.map((block, index) => {
        if (block.type === "lead") {
          return (
            <p key={index} className={`text-[22px]/[35px] w-full text-[#000354] ${font} font-normal`}>
              {block.text}
            </p>
          );
        }
        if (block.type === "p") {
          return (
            <p key={index} className={`text-[18px]/[32px] w-full text-[#354A5F] ${font} font-normal`}>
              {block.text}
            </p>
          );
        }
        if (block.type === "h2") {
          return (
            <h2 key={index} className={`text-[30px]/[36px] w-full pt-[16px] text-[#000000] ${font} font-medium`}>
              {block.text}
            </h2>
          );
        }
        if (block.type === "quote") {
          return (
            <blockquote key={index} className={`box-border w-full p-[24px_28px] bg-[#EAF3F5] rounded-[8px] text-[20px]/[31px] text-[#000354] ${font} font-medium`}>
              {block.text}
            </blockquote>
          );
        }
        if (block.type === "figure") {
          return (
            <figure key={index} className="box-border w-full flex flex-col gap-[10px] py-[8px]">
              <div
                role="img"
                aria-label={block.caption}
                className="box-border w-full h-[384px] bg-cover bg-center rounded-[12px]"
                style={{ backgroundImage: `url(${figureImage})` }}
              />
              <figcaption className={`text-[14px]/[18px] text-[#475E75] ${font}`}>{block.caption}</figcaption>
            </figure>
          );
        }
        if (block.type === "ul") {
          return (
            <ul key={index} className="box-border w-full flex flex-col gap-[12px] pl-[8px]">
              {block.items.map((item) => (
                <li key={item} className={`flex flex-row gap-[12px] items-start text-[18px]/[29px] text-[#354A5F] ${font}`}>
                  <span className="box-border w-[6px] h-[6px] mt-[12px] shrink-0 bg-[#2F6E80] rounded-[999px]" />
                  {item}
                </li>
              ))}
            </ul>
          );
        }
        return (
          <ol key={index} className="box-border w-full flex flex-col gap-[12px] pl-[8px]">
            {block.items.map((item, itemIndex) => (
              <li key={item} className={`flex flex-row gap-[12px] items-start text-[18px]/[29px] text-[#354A5F] ${font}`}>
                <span className={`w-[16px] shrink-0 text-[13px]/[17px] text-[#2F6E80] ${font} font-medium mt-[4px]`}>{itemIndex + 1}</span>
                {item}
              </li>
            ))}
          </ol>
        );
      })}
    </div>
  );
}
