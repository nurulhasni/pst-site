"use client";

import { Quote } from "lucide-react";
import { Footer } from "@/components/sections/Footer";
import { FloatingContact } from "@/components/sections/FloatingContact";
import { PageHero } from "@/components/PageHero";
import { CtaBanner } from "@/components/CtaBanner";
import { useLanguage } from "@/components/LanguageProvider";

const font = "font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif]";

const copy = {
  en: {
    current: "Gallery",
    heroTitle: "Our activity",
    heroDesc: "Awesomeness and creative people. We talk about hope, helping and teamwork.",
    eyebrow: "OUR ACTIVITY",
    title: "Moments with our people",
    desc: "Workshops, projects and time together — the team behind every PST engagement.",
    tileAlt: "PST team photo",
    quoteEyebrow: "WORDS OF TEAM MEMBER",
    quote: "Teamwork is the ability to work together toward a common vision.",
    quoteBody:
      "SAP implementation can be a chance for you to transform your business processes — to solve your problems and open up new opportunities, not just to automate the way you work today.",
    memberAlt: "PST team member",
    ctaTitle: "Ready to find your solution?",
    ctaDesc: "Talk to our team about how SAP can transform your business processes.",
    ctaLabel: "Find your solution",
  },
  id: {
    current: "Galeri",
    heroTitle: "Aktivitas kami",
    heroDesc: "Orang-orang hebat dan kreatif. Kami berbicara tentang harapan, saling membantu, dan kerja sama tim.",
    eyebrow: "AKTIVITAS KAMI",
    title: "Momen bersama tim kami",
    desc: "Workshop, proyek, dan kebersamaan — tim di balik setiap kerja sama PST.",
    tileAlt: "Foto tim PST",
    quoteEyebrow: "KATA ANGGOTA TIM",
    quote: "Kerja sama tim adalah kemampuan bekerja bersama menuju visi yang sama.",
    quoteBody:
      "Implementasi SAP dapat menjadi kesempatan bagi Anda untuk mentransformasi proses bisnis — menyelesaikan masalah dan membuka peluang baru, bukan sekadar mengotomatisasi cara kerja Anda saat ini.",
    memberAlt: "Anggota tim PST",
    ctaTitle: "Siap menemukan solusi Anda?",
    ctaDesc: "Bicarakan dengan tim kami bagaimana SAP dapat mentransformasi proses bisnis Anda.",
    ctaLabel: "Temukan solusi Anda",
  },
};

const photos = [
  "PSt.jpg",
  "Gallery-2.png",
  "Gallery-3.png",
  "Gallery-4.png",
  "Gallery-5.png",
  "Gallery-7.png",
  "Gallery-8.png",
  "Gallery-9.png",
  "Gallery-10.jpg",
];

function Tile({ photo, index, alt, className }: { photo: string; index: number; alt: string; className: string }) {
  return (
    <div
      className={`box-border min-w-0 bg-cover bg-center rounded-[12px] ${className}`}
      style={{ backgroundImage: `url(/images/pst/gallery/${photo})` }}
      role="img"
      aria-label={`${alt} ${index + 1}`}
    />
  );
}

export function GalleryView() {
  const { lang } = useLanguage();
  const c = copy[lang];

  return (
    <main className="w-full overflow-x-hidden">
      <PageHero current={c.current} title={c.heroTitle} description={c.heroDesc} />

      <section className="box-border w-full h-fit flex flex-col gap-[48px] p-[112px_96px] justify-start items-start max-lg:p-[60px_20px]">
        <div className="box-border w-full h-fit flex flex-col gap-[16px]">
          <div className={`text-[12px]/[15px] text-[#2F6E80] ${font} font-medium tracking-[1.2px]`}>{c.eyebrow}</div>
          <div className={`text-[48px]/[53px] text-[#000000] ${font} font-medium max-lg:text-[32px]/[35px]`}>{c.title}</div>
          <div className={`text-[18px]/[27px] max-w-[640px] text-[#354A5F] ${font}`}>{c.desc}</div>
        </div>
        <div className="box-border w-full h-fit flex flex-col gap-[16px]">
          <div className="box-border w-full h-[520px] flex flex-row gap-[16px] max-lg:h-auto max-lg:flex-col">
            <Tile photo={photos[0]} index={0} alt={c.tileAlt} className="[flex:2_1_0] h-full max-lg:h-[260px]" />
            <div className="box-border w-[400px] max-lg:w-full shrink-0 h-full flex flex-col gap-[16px]">
              <Tile photo={photos[1]} index={1} alt={c.tileAlt} className="[flex:1_1_0] w-full max-lg:h-[220px]" />
              <Tile photo={photos[2]} index={2} alt={c.tileAlt} className="[flex:1_1_0] w-full max-lg:h-[220px]" />
            </div>
          </div>
          <div className="box-border w-full h-[300px] flex flex-row gap-[16px] max-lg:h-auto max-lg:flex-col">
            {photos.slice(3, 6).map((photo, index) => (
              <Tile key={photo} photo={photo} index={index + 3} alt={c.tileAlt} className="[flex:1_1_0] h-full max-lg:h-[220px]" />
            ))}
          </div>
          <div className="box-border w-full h-[300px] flex flex-row gap-[16px] max-lg:h-auto max-lg:flex-col">
            {photos.slice(6, 9).map((photo, index) => (
              <Tile key={photo} photo={photo} index={index + 6} alt={c.tileAlt} className="[flex:1_1_0] h-full max-lg:h-[220px]" />
            ))}
          </div>
        </div>
      </section>

      <section className="box-border w-full h-fit flex flex-row flex-wrap gap-[96px] p-[112px_96px] justify-start items-center bg-[#000354] max-lg:p-[60px_20px] max-lg:gap-[40px]">
        <div
          className="box-border w-[420px] max-w-full h-[540px] shrink-0 bg-cover bg-center rounded-[12px] max-lg:h-[380px] max-lg:w-full"
          style={{ backgroundImage: "url(/images/pst/gallery/LN0A5205_2.jpg)" }}
          role="img"
          aria-label={c.memberAlt}
        />
        <div className="box-border [flex:1_1_0] min-w-[300px] h-fit flex flex-col gap-[28px]">
          <Quote size={44} className="text-[#A6CBD3]" />
          <div className={`text-[13px]/[17px] text-[#A6CBD3] ${font} font-medium tracking-[1.4px]`}>{c.quoteEyebrow}</div>
          <div className={`text-[40px]/[46px] text-[#FFFFFF] ${font} font-medium max-lg:text-[28px]/[36px]`}>{c.quote}</div>
          <div className={`text-[18px]/[30px] text-[#FFFFFFCC] ${font}`}>{c.quoteBody}</div>
        </div>
      </section>

      <section className="box-border w-full h-fit p-[96px] pb-[120px] max-lg:p-[60px_20px]">
        <CtaBanner title={c.ctaTitle} description={c.ctaDesc} label={c.ctaLabel} href="/contact" />
      </section>

      <Footer />
      <FloatingContact />
    </main>
  );
}
