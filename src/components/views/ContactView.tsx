"use client";

import { MapPin, Navigation } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/sections/Footer";
import { FloatingContact } from "@/components/sections/FloatingContact";
import { useLanguage } from "@/components/LanguageProvider";

const copy = {
  en: {
    current: "Contact Us",
    title: "Let's start a conversation",
    description:
      "Have a project in mind? We'd love to hear from you. Reach out and let's explore how we can work together.",
    directions: "Get directions",
    office: "PST Office",
    areaLine: "Kemayoran, Jakarta Pusat 10640",
  },
  id: {
    current: "Hubungi Kami",
    title: "Mari mulai percakapan",
    description:
      "Punya rencana proyek? Kami senang mendengarnya. Hubungi kami dan mari jajaki bagaimana kita dapat bekerja sama.",
    directions: "Petunjuk arah",
    office: "Kantor PST",
    areaLine: "Kemayoran, Jakarta Pusat 10640",
  },
};

export function ContactView() {
  const { lang } = useLanguage();
  const c = copy[lang];

  return (
    <main className="w-full overflow-x-hidden">
      <PageHero current={c.current} title={c.title} description={c.description} />
      <ContactSection />
      <section className="box-border w-full h-fit flex flex-col p-[56px_96px] justify-start items-start max-lg:p-[40px_20px]">
        <div className="box-border relative w-full h-[440px] rounded-[12px] overflow-hidden [border-width:1px] [border-style:solid] [border-color:#D5DADD] bg-[url('/images/pst/contact-map.png')] bg-cover bg-center max-lg:h-[520px]">
          <div className="box-border absolute left-[32px] top-[32px] w-[340px] max-w-[calc(100%-64px)] flex flex-col gap-[12px] p-[24px] bg-[#FFFFFF] rounded-[12px] [box-shadow:0px_10px_30px_#00035433] max-lg:left-[16px] max-lg:top-[16px] max-lg:w-[calc(100%-32px)] max-lg:max-w-none max-lg:p-[16px]">
            <div className="box-border w-full flex flex-row gap-[10px] items-center">
              <div className="box-border w-[32px] h-[32px] shrink-0 bg-[url('/images/pst/pst-logo.png')] bg-no-repeat bg-contain bg-center" />
              <div className="text-[16px]/[21px] text-[#000354] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-medium">PT Prima Sistem Terpadu</div>
            </div>
            <div className="text-[14px]/[20px] text-[#354A5F] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif]">
              Jalan Sumur Batu VI Blok E No.3
              <br />
              {c.areaLine}
            </div>
            <a href="https://maps.google.com/?q=Jalan+Sumur+Batu+VI+Blok+E+No.3+Jakarta+Pusat" className="box-border w-fit flex flex-row gap-[6px] items-center text-[14px]/[20px] text-[#2F6E80] hover:text-[#000354] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-medium">
              {c.directions}
              <Navigation size={16} />
            </a>
          </div>
          <div className="box-border absolute left-[62.5%] top-[38.6%] w-[56px] h-[56px] flex items-center justify-center bg-[#FFFFFF] rounded-[999px] [box-shadow:0px_10px_30px_#00035433]">
            <MapPin size={26} className="text-[#000354]" />
          </div>
          <div className="box-border absolute left-[59.1%] top-[53.6%] h-[27px] p-[0px_12px] flex items-center bg-[#000354] rounded-[999px] text-[13px] leading-normal text-[#FFFFFF] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-medium whitespace-nowrap">
            {c.office}
          </div>
        </div>
      </section>
      <Footer />
      <FloatingContact />
    </main>
  );
}
