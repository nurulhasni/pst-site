import Link from "next/link";

const font = "font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif]";

type CtaBannerProps = {
  title: string;
  description: string;
  label: string;
  href: string;
};

const buttonClass = `box-border w-fit h-[48px] flex items-center p-[0px_24px] bg-[#A6CBD3] hover:bg-[#B8D8DF] rounded-[8px] text-[16px]/[20px] text-[#000354] ${font} font-medium`;

export function CtaBanner({ title, description, label, href }: CtaBannerProps) {
  return (
    <div className="box-border w-full h-fit flex flex-row flex-wrap gap-[32px] p-[69px_64px] justify-between items-center rounded-[12px] [background-image:radial-gradient(ellipse_30%_60%_at_90%_10%,_#A6CBD333_0%,_#A6CBD300_100%),_linear-gradient(90deg,_#08174A_0%,_#2B1C8F_100%)] max-lg:p-[32px_20px]">
      <div className="box-border w-fit max-w-[720px] h-fit flex flex-col gap-[12px]">
        <div className={`text-[44px]/[48px] text-[#FFFFFF] ${font} font-medium max-lg:text-[30px]/[33px]`}>{title}</div>
        <div className={`text-[18px]/[27px] text-[#FFFFFFCC] ${font}`}>{description}</div>
      </div>
      {href.startsWith("/") ? (
        <Link href={href} className={buttonClass}>
          {label}
        </Link>
      ) : (
        <a href={href} className={buttonClass}>
          {label}
        </a>
      )}
    </div>
  );
}
