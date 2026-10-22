"use client";

import { Mail } from "lucide-react";
import { Footer } from "@/components/sections/Footer";
import { FloatingContact } from "@/components/sections/FloatingContact";
import { BlogBrowser } from "@/components/sections/BlogBrowser";
import { PageHero } from "@/components/PageHero";
import { useLanguage } from "@/components/LanguageProvider";

const font = "font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif]";

const copy = {
  en: {
    current: "Blog",
    title: "Insights & updates",
    description: "Company news, SAP insights and expert perspectives on digital transformation.",
    stayTitle: "Stay updated",
    stayDesc: "Subscribe for the latest insights on SAP, digital transformation and enterprise technology.",
    emailPh: "Enter your email",
    start: "Start Conversation",
  },
  id: {
    current: "Blog",
    title: "Wawasan & kabar terbaru",
    description: "Berita perusahaan, wawasan SAP, dan perspektif ahli seputar transformasi digital.",
    stayTitle: "Tetap terkini",
    stayDesc: "Berlangganan untuk wawasan terbaru seputar SAP, transformasi digital, dan teknologi enterprise.",
    emailPh: "Masukkan email Anda",
    start: "Berlangganan",
  },
};

export function BlogPageView() {
  const { lang } = useLanguage();
  const c = copy[lang];

  return (
    <main className="w-full overflow-x-hidden">
      <PageHero current={c.current} title={c.title} description={c.description} />
      <BlogBrowser />
      <section className="box-border w-full h-fit p-[96px_96px_120px_96px] max-lg:p-[60px_20px]">
        <div className="box-border w-full h-fit flex flex-row flex-wrap gap-[48px] p-[64px] justify-between items-center rounded-[12px] [background-image:radial-gradient(ellipse_30%_60%_at_90%_10%,_#A6CBD333_0%,_#A6CBD300_100%),_linear-gradient(90deg,_#08174A_0%,_#2B1C8F_100%)] max-lg:p-[32px_20px]">
          <div className="box-border w-fit max-w-[637px] h-fit flex flex-col gap-[16px]">
            <div className={`text-[44px]/[48px] text-[#FFFFFF] ${font} font-medium max-lg:text-[30px]/[33px]`}>{c.stayTitle}</div>
            <div className={`text-[18px]/[27px] text-[#FFFFFFCC] ${font}`}>{c.stayDesc}</div>
          </div>
          <div className="box-border w-fit h-[48px] flex flex-row gap-[12px] max-lg:w-full max-lg:flex-col">
            <label className="box-border w-[300px] max-w-full h-[48px] flex flex-row gap-[10px] p-[0px_16px] items-center bg-[#FFFFFF14] rounded-[8px]">
              <Mail size={18} className="text-[#A6CBD3] shrink-0" />
              <input
                type="email"
                placeholder={c.emailPh}
                className={`box-border w-full bg-transparent text-[16px]/[20px] text-[#FFFFFF] ${font} placeholder:text-[#FFFFFF99] outline-none`}
              />
            </label>
            <button
              type="button"
              className={`box-border w-[123px] h-[48px] flex items-center justify-center bg-[#A6CBD3] hover:bg-[#B8D8DF] rounded-[8px] text-[16px]/[20px] text-[#000354] ${font} font-medium`}
            >
              {c.start}
            </button>
          </div>
        </div>
      </section>
      <Footer />
      <FloatingContact />
    </main>
  );
}
