"use client";

import Image from "next/image";
import { useState } from "react";
import { Quote } from "lucide-react";
import { GalleryLightbox, type LightboxItem } from "@/components/GalleryLightbox";
import { Footer } from "@/components/sections/Footer";
import { FloatingContact } from "@/components/sections/FloatingContact";
import { PageHero } from "@/components/PageHero";
import { CtaBanner } from "@/components/CtaBanner";
import { useLanguage } from "@/components/LanguageProvider";
import { localPhoto, type PublicPhoto } from "@/lib/galleryModel";

const font = "font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif]";

const copy = {
  en: {
    current: "Gallery",
    heroTitle: "Our activity",
    heroDesc: "Awesomeness and creative people. We talk about hope, helping and teamwork.",
    eyebrow: "OUR ACTIVITY",
    title: "Moments with our people",
    desc: "Workshops, projects and time together: the team behind every PST engagement.",
    tileAlt: "PST team photo",
    view: "View photo",
    close: "Close",
    previous: "Previous photo",
    next: "Next photo",
    of: "of",
    quoteEyebrow: "WORDS OF TEAM MEMBER",
    quote: "Teamwork is the ability to work together toward a common vision.",
    quoteBody:
      "SAP implementation can be a chance for you to transform your business processes to solve your problems and open up new opportunities, not just to automate the way you work today.",
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
    desc: "Workshop, proyek, dan kebersamaan: tim di balik setiap kerja sama PST.",
    tileAlt: "Foto tim PST",
    view: "Lihat foto",
    close: "Tutup",
    previous: "Foto sebelumnya",
    next: "Foto berikutnya",
    of: "dari",
    quoteEyebrow: "KATA ANGGOTA TIM",
    quote: "Kerja sama tim adalah kemampuan bekerja bersama menuju visi yang sama.",
    quoteBody:
      "Implementasi SAP dapat menjadi kesempatan bagi Anda untuk mentransformasi proses bisnis untuk menyelesaikan masalah dan membuka peluang baru, bukan sekadar mengotomatisasi cara kerja Anda saat ini.",
    memberAlt: "Anggota tim PST",
    ctaTitle: "Siap menemukan solusi Anda?",
    ctaDesc: "Bicarakan dengan tim kami bagaimana SAP dapat mentransformasi proses bisnis Anda.",
    ctaLabel: "Temukan solusi Anda",
  },
};

// next/image serves each photo resized for the screen and only loads it when it
// scrolls into view. Staff may paste an outside image link into the Sheet; the
// optimizer refuses hosts it doesn't know, so those are shown as they are.
// Clicking a photo opens it in the viewer.
function Tile({
  item,
  index,
  sizes,
  viewLabel,
  onOpen,
  className,
}: {
  item: LightboxItem;
  index: number;
  sizes: string;
  viewLabel: string;
  onOpen: (index: number) => void;
  className: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      aria-label={`${viewLabel}: ${item.title}`}
      // max-lg:[flex:none] lets the fixed heights apply once the rows stack into columns
      className={`group box-border relative min-w-0 max-lg:[flex:none] overflow-hidden rounded-[12px] bg-[#EAECEE] cursor-zoom-in focus-visible:[outline:3px_solid_#2F6E80] focus-visible:[outline-offset:2px] ${className}`}
    >
      <Image src={item.image} alt={item.title} fill sizes={sizes} unoptimized={!item.image.startsWith("/")} className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
      <span className="absolute inset-x-0 bottom-0 flex flex-col gap-[2px] p-[40px_16px_14px] text-left bg-[linear-gradient(180deg,_#00035400_0%,_#000354CC_100%)] opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300 max-lg:opacity-100">
        {item.category && <span className={`text-[11px]/[14px] text-[#A6CBD3] ${font} font-medium tracking-[1px] uppercase`}>{item.category}</span>}
        <span className={`text-[15px]/[20px] text-[#FFFFFF] ${font} font-medium`}>{item.title}</span>
      </span>
    </button>
  );
}

export function GalleryView({ photos }: { photos: PublicPhoto[] }) {
  const { lang } = useLanguage();
  const c = copy[lang];
  // The first three photos keep the large-plus-two layout; the rest sit in a
  // fixed three-column grid, so a last row of one or two keeps the same size
  const [open, setOpen] = useState<number | null>(null);
  const items: LightboxItem[] = photos.map((photo, index) => {
    const local = localPhoto(photo, lang);
    return { ...local, title: local.title || `${c.tileAlt} ${index + 1}` };
  });
  const tile = (index: number, sizes: string, className: string) => (
    <Tile key={photos[index].id} item={items[index]} index={index} sizes={sizes} viewLabel={c.view} onOpen={setOpen} className={className} />
  );
  const side = photos.slice(1, 3);
  const rest = photos.slice(3);

  return (
    <main className="w-full overflow-x-hidden">
      <PageHero current={c.current} title={c.heroTitle} description={c.heroDesc} />

      <section className="box-border w-full h-fit flex flex-col gap-[48px] p-[112px_96px] justify-start items-start max-lg:p-[60px_20px]">
        <div className="box-border w-full h-fit flex flex-col gap-[16px]">
          <div className={`text-[12px]/[15px] text-[#2F6E80] ${font} font-medium tracking-[1.2px]`}>{c.eyebrow}</div>
          <div className={`text-[48px]/[53px] text-[#000000] ${font} font-medium max-lg:text-[32px]/[35px]`}>{c.title}</div>
          <div className={`text-[18px]/[27px] max-w-[640px] text-[#354A5F] ${font}`}>{c.desc}</div>
        </div>
        {photos.length > 0 && (
          <div className="box-border w-full h-fit flex flex-col gap-[16px]">
            <div className="box-border w-full h-[520px] flex flex-row gap-[16px] max-lg:h-auto max-lg:flex-col">
              {tile(0, "(max-width: 1024px) 100vw, 60vw", "[flex:2_1_0] h-full max-lg:h-[260px]")}
              {side.length > 0 && (
                <div className="box-border w-[400px] max-lg:w-full shrink-0 h-full flex flex-col gap-[16px]">
                  {side.map((_, index) => tile(index + 1, "(max-width: 1024px) 100vw, 400px", "[flex:1_1_0] w-full max-lg:h-[220px]"))}
                </div>
              )}
            </div>
            {rest.length > 0 && (
              <div className="box-border w-full grid grid-cols-3 gap-[16px] max-lg:grid-cols-2 max-sm:grid-cols-1">
                {rest.map((_, index) => tile(3 + index, "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw", "h-[300px] max-lg:h-[220px]"))}
              </div>
            )}
          </div>
        )}
      </section>

      {open !== null && (
        <GalleryLightbox
          items={items}
          index={open}
          labels={{ close: c.close, previous: c.previous, next: c.next, of: c.of }}
          onChange={setOpen}
          onClose={() => setOpen(null)}
        />
      )}

      <section className="box-border w-full h-fit flex flex-row flex-wrap gap-[96px] p-[112px_96px] justify-start items-center bg-[#000354] max-lg:p-[60px_20px] max-lg:gap-[40px]">
        <div className="box-border relative w-[420px] max-w-full h-[540px] shrink-0 overflow-hidden rounded-[12px] max-lg:h-[380px] max-lg:w-full">
          <Image src="/images/pst/gallery/LN0A5205_2.jpg" alt={c.memberAlt} fill sizes="(max-width: 1024px) 100vw, 420px" className="object-cover" />
        </div>
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
