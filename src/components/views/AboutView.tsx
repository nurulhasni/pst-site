"use client";

import { Car, Cog, Factory, ShoppingBasket, Target, Telescope } from "lucide-react";
import { Footer } from "@/components/sections/Footer";
import { FloatingContact } from "@/components/sections/FloatingContact";
import { PageHero } from "@/components/PageHero";
import { CtaBanner } from "@/components/CtaBanner";
import { useLanguage } from "@/components/LanguageProvider";

const font = "font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif]";

const copy = {
  en: {
    current: "About Us",
    heroTitle: "About Prima\nSistem Terpadu",
    heroDesc:
      "PT Prima Sistem Terpadu (PST) is a local IT consulting company providing total solutions through information technology implementation. Established in 1999, PST partners with SAP Indonesia as an SAP ERP Silver Partner.",
    companySub: "IT consulting · Indonesia",
    factEst: "Established",
    factPartner: "Partnership",
    factPartnerVal: "SAP ERP Silver Partner",
    factCert: "Certification",
    factCertVal: "Partner Center of Expertise",
    storyEyebrow: "OUR STORY",
    storyTitle: "Built around your business processes",
    storyP1:
      "Many IT implementations, especially ERP, fail due to a lack of understanding of the customer's business processes and issues. Each company is unique, so we can't just assume that any best practice is suitable and applicable.",
    storyP2:
      "That's why we help you find the right practices and conform them to your organization's culture and management approach. Our team brings experience from various industries, so we understand more clearly what you want and what the best possible solution is.",
    sectors: ["Automotive", "FMCG", "Machinery", "Manufacturing"],
    photoAlt: "PST team at work",
    since: "SINCE",
    impactEyebrow: "OUR IMPACT",
    impactTitle: "Numbers that speak",
    impactDesc:
      "Over two decades of delivering measurable results for Indonesian enterprises, from first blueprint to years of run support.",
    stats: [
      { num: "25+", label: "Years of experience", desc: "Serving Indonesia since 1999" },
      { num: "15+", label: "Enterprise clients", desc: "Indonesian enterprises" },
      { num: "300+", label: "Projects delivered", desc: "Implementations & rollouts" },
    ],
    foundationEyebrow: "OUR FOUNDATION",
    foundationTitle: "Vision & mission",
    foundationDesc: "The direction that has guided PST since 1999.",
    statements: [
      {
        label: "VISION",
        title: "World-class best practices for every industry",
        text: "Apply suitable world-class best practices into all range of industries through rapid and efficient implementation of IT as a competitive tool for winning the global competition.",
      },
      {
        label: "MISSION",
        title: "A valuable asset for the nation",
        text: "To be a valuable asset for the nation in helping local companies save their IT project investment and prepare their human resource competencies in applicable IT.",
      },
    ],
    philosophyEyebrow: "OUR PHILOSOPHY",
    philosophyTitle: "Logo philosophy",
    philosophy1:
      "The business environment and competition always change. It is the nature of business itself. Meanwhile, the colour of the company that plays in the business game is clear.",
    philosophy2:
      "Puzzle is a kind of game where each piece has a unique shape and is placed in a certain position to form a bigger picture. Each piece should fit in with the previous and the next pieces. PST chose a puzzle as its logo due to its similarity in nature to the business itself.",
    philosophy3:
      "Just like a puzzle, we can help you create the bigger picture so your company fits in with global challenges.",
    logoAlt: "PST logo",
    achievementEyebrow: "ACHIEVEMENT",
    achievementTitle: "Our experience",
    achievementDesc: "Depth built over 25+ years of SAP projects, measured across the practices our clients rely on most.",
    skills: [
      { label: "SAP ERP Implementation", value: 89 },
      { label: "Business Process Reengineering", value: 94 },
      { label: "Strategic Information Planning", value: 89 },
    ],
    experienceAlt: "PST consultants at a client site",
    ctaTitle: "Achieve your business objective",
    ctaDesc: "Let our team of SAP experts help you unlock the full potential of your enterprise.",
    ctaLabel: "Get started",
  },
  id: {
    current: "Tentang Kami",
    heroTitle: "Tentang Prima\nSistem Terpadu",
    heroDesc:
      "PT Prima Sistem Terpadu (PST) adalah perusahaan konsultan TI lokal yang menyediakan solusi menyeluruh melalui implementasi teknologi informasi. Berdiri sejak 1999, PST bermitra dengan SAP Indonesia sebagai SAP ERP Silver Partner.",
    companySub: "Konsultan TI · Indonesia",
    factEst: "Berdiri",
    factPartner: "Kemitraan",
    factPartnerVal: "SAP ERP Silver Partner",
    factCert: "Sertifikasi",
    factCertVal: "Partner Center of Expertise",
    storyEyebrow: "KISAH KAMI",
    storyTitle: "Dibangun di sekitar proses bisnis Anda",
    storyP1:
      "Banyak implementasi TI, terutama ERP, gagal karena kurangnya pemahaman terhadap proses dan permasalahan bisnis pelanggan. Setiap perusahaan itu unik, sehingga kita tidak bisa begitu saja menganggap setiap best practice cocok dan dapat diterapkan.",
    storyP2:
      "Karena itu kami membantu Anda menemukan praktik yang tepat dan menyesuaikannya dengan budaya serta pendekatan manajemen organisasi Anda. Tim kami membawa pengalaman dari berbagai industri, sehingga kami lebih memahami apa yang Anda inginkan dan solusi terbaik yang memungkinkan.",
    sectors: ["Otomotif", "FMCG", "Permesinan", "Manufaktur"],
    photoAlt: "Tim PST sedang bekerja",
    since: "SEJAK",
    impactEyebrow: "DAMPAK KAMI",
    impactTitle: "Angka yang berbicara",
    impactDesc:
      "Lebih dari dua dekade menghadirkan hasil terukur bagi perusahaan Indonesia, dari blueprint pertama hingga dukungan operasional bertahun-tahun.",
    stats: [
      { num: "25+", label: "Tahun pengalaman", desc: "Melayani Indonesia sejak 1999" },
      { num: "15+", label: "Klien korporasi", desc: "Perusahaan Indonesia" },
      { num: "300+", label: "Proyek terselesaikan", desc: "Implementasi & rollout" },
    ],
    foundationEyebrow: "LANDASAN KAMI",
    foundationTitle: "Visi & misi",
    foundationDesc: "Arah yang memandu PST sejak 1999.",
    statements: [
      {
        label: "VISI",
        title: "Praktik terbaik kelas dunia untuk setiap industri",
        text: "Menerapkan praktik terbaik kelas dunia yang sesuai ke berbagai industri melalui implementasi TI yang cepat dan efisien sebagai alat bersaing untuk memenangkan persaingan global.",
      },
      {
        label: "MISI",
        title: "Aset berharga bagi bangsa",
        text: "Menjadi aset berharga bagi bangsa dalam membantu perusahaan lokal menghemat investasi proyek TI dan menyiapkan kompetensi SDM di bidang TI terapan.",
      },
    ],
    philosophyEyebrow: "FILOSOFI KAMI",
    philosophyTitle: "Filosofi logo",
    philosophy1:
      "Lingkungan dan persaingan bisnis selalu berubah. Itulah sifat bisnis itu sendiri. Sementara itu, warna perusahaan yang bermain dalam permainan bisnis tersebut jelas terlihat.",
    philosophy2:
      "Puzzle adalah permainan di mana setiap kepingnya memiliki bentuk unik dan ditempatkan pada posisi tertentu untuk membentuk gambaran yang lebih besar. Setiap keping harus cocok dengan keping sebelum dan sesudahnya. PST memilih puzzle sebagai logonya karena sifatnya yang serupa dengan bisnis itu sendiri.",
    philosophy3:
      "Layaknya puzzle, kami dapat membantu Anda membentuk gambaran yang lebih besar agar perusahaan Anda selaras dengan tantangan global.",
    logoAlt: "Logo PST",
    achievementEyebrow: "PENCAPAIAN",
    achievementTitle: "Pengalaman kami",
    achievementDesc: "Kedalaman yang dibangun selama 25+ tahun proyek SAP, diukur dari praktik yang paling diandalkan klien kami.",
    skills: [
      { label: "Implementasi SAP ERP", value: 89 },
      { label: "Rekayasa Ulang Proses Bisnis", value: 94 },
      { label: "Perencanaan Informasi Strategis", value: 89 },
    ],
    experienceAlt: "Konsultan PST di lokasi klien",
    ctaTitle: "Raih tujuan bisnis Anda",
    ctaDesc: "Biarkan tim ahli SAP kami membantu Anda membuka potensi penuh perusahaan Anda.",
    ctaLabel: "Mulai sekarang",
  },
};

const facts = (c: typeof copy.en) => [
  { key: c.factEst, value: "1999" },
  { key: c.factPartner, value: c.factPartnerVal },
  { key: c.factCert, value: c.factCertVal },
];

const sectorIcons = [Car, ShoppingBasket, Cog, Factory];
const statementIcons = [Telescope, Target];

const storyPhoto = "https://images.unsplash.com/photo-1646066490241-d386dbb63539?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";
const experiencePhoto = "https://images.unsplash.com/photo-1758876021772-2684360dfc97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";

function Eyebrow({ children, light = false }: { children: string; light?: boolean }) {
  return (
    <div className={`text-[12px]/[15px] ${light ? "text-[#A6CBD3]" : "text-[#2F6E80]"} ${font} font-medium tracking-[1.2px]`}>
      {children}
    </div>
  );
}

export function AboutView() {
  const { lang } = useLanguage();
  const c = copy[lang];

  return (
    <main className="w-full overflow-x-hidden">
      <PageHero
        current={c.current}
        title={c.heroTitle}
        description={c.heroDesc}
        aside={
          <div className="box-border w-full max-w-[400px] h-fit flex flex-col gap-[24px] p-[32px] bg-[#FFFFFF] rounded-[12px] [box-shadow:0px_10px_30px_#00035433]">
            <div className="box-border w-full h-fit flex flex-row gap-[16px] items-start">
              <div className="box-border w-[72px] h-[72px] shrink-0 bg-[url('/images/pst/pst-logo.png')] bg-no-repeat bg-contain bg-center" />
              <div className="box-border w-full h-fit flex flex-col gap-[2px] pt-[6px]">
                <div className={`text-[18px]/[21px] text-[#000354] ${font} font-bold`}>PT Prima Sistem / Terpadu</div>
                <div className={`text-[13px]/[17px] text-[#475E75] ${font}`}>{c.companySub}</div>
              </div>
            </div>
            {facts(c).map((fact) => (
              <div
                key={fact.key}
                className="box-border w-full h-[42px] flex flex-row justify-between items-center [border-width:1px_0px_0px_0px] [border-style:solid] [border-color:#D5DADD]"
              >
                <div className={`text-[14px]/[18px] text-[#475E75] ${font}`}>{fact.key}</div>
                <div className={`text-[14px]/[18px] text-[#000000] ${font} font-medium`}>{fact.value}</div>
              </div>
            ))}
          </div>
        }
      />

      <section className="box-border w-full h-fit flex flex-row flex-wrap gap-[96px] p-[120px_96px] justify-start items-center max-lg:p-[60px_20px] max-lg:gap-[48px]">
        <div className="box-border [flex:1_1_0] min-w-[300px] h-fit flex flex-col gap-[24px]">
          <Eyebrow>{c.storyEyebrow}</Eyebrow>
          <div className={`text-[48px]/[53px] text-[#000000] ${font} font-medium max-lg:text-[32px]/[35px]`}>{c.storyTitle}</div>
          <p className={`text-[17px]/[28px] text-[#354A5F] ${font}`}>{c.storyP1}</p>
          <p className={`text-[17px]/[28px] text-[#354A5F] ${font}`}>{c.storyP2}</p>
          <div className="box-border w-full flex flex-row flex-wrap gap-[8px] pt-[8px]">
            {c.sectors.map((label, index) => {
              const Icon = sectorIcons[index];
              return (
                <span key={label} className={`box-border w-fit h-[34px] p-[0px_14px] flex flex-row gap-[8px] items-center bg-[#EAF3F5] rounded-[999px] text-[14px] text-[#000354] ${font} font-medium`}>
                  <Icon size={16} className="text-[#2F6E80]" />
                  {label}
                </span>
              );
            })}
          </div>
        </div>
        <div className="box-border [flex:1_1_0] min-w-[300px] max-w-[560px] h-[520px] relative">
          <div
            className="box-border w-full h-full bg-cover bg-center rounded-[12px]"
            style={{ backgroundImage: `url(${storyPhoto})` }}
            role="img"
            aria-label={c.photoAlt}
          />
          <div className="box-border w-[220px] h-fit absolute left-[-24px] bottom-[-24px] flex flex-col gap-[4px] p-[24px] bg-[#000354] rounded-[12px] max-lg:left-[16px]">
            <div className={`text-[12px]/[16px] text-[#A6CBD3] ${font} font-medium tracking-[1.2px]`}>{c.since}</div>
            <div className={`text-[36px]/[36px] text-[#FFFFFF] ${font} font-medium`}>1999</div>
          </div>
        </div>
      </section>

      <section className="box-border w-full h-fit flex flex-col gap-[56px] p-[96px] justify-start items-start bg-[#EAF3F5] max-lg:p-[60px_20px] max-lg:gap-[32px]">
        <div className="box-border w-full h-fit flex flex-row flex-wrap gap-[48px] justify-between items-end max-lg:flex-col max-lg:items-stretch">
          <div className="box-border w-fit h-fit flex flex-col gap-[16px]">
            <Eyebrow>{c.impactEyebrow}</Eyebrow>
            <div className={`text-[48px]/[53px] text-[#000000] ${font} font-medium max-lg:text-[32px]/[35px]`}>{c.impactTitle}</div>
          </div>
          <div className={`text-[18px]/[27px] w-[460px] max-w-full text-[#354A5F] ${font}`}>{c.impactDesc}</div>
        </div>
        <div className="box-border w-full h-fit grid grid-cols-3 gap-[32px] max-lg:grid-cols-1">
          {c.stats.map((stat) => (
            <div key={stat.label} className="box-border w-full h-fit flex flex-col gap-[12px]">
              <div className={`text-[72px]/[72px] text-[#000354] ${font} font-medium max-lg:text-[42px]/[42px]`}>{stat.num}</div>
              <div className={`text-[18px]/[23px] text-[#000000] ${font} font-medium`}>{stat.label}</div>
              <div className={`text-[14px]/[18px] text-[#475E75] ${font}`}>{stat.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="box-border w-full h-fit flex flex-row flex-wrap gap-[80px] p-[120px_96px] justify-start items-start max-lg:p-[60px_20px] max-lg:gap-[32px]">
        <div className="box-border w-[380px] max-w-full h-fit flex flex-col gap-[16px]">
          <Eyebrow>{c.foundationEyebrow}</Eyebrow>
          <div className={`text-[48px]/[53px] text-[#000000] ${font} font-medium max-lg:text-[32px]/[35px]`}>{c.foundationTitle}</div>
          <div className={`text-[18px]/[27px] text-[#354A5F] ${font}`}>{c.foundationDesc}</div>
        </div>
        <div className="box-border [flex:1_1_0] min-w-[300px] h-fit grid grid-cols-2 gap-[24px] max-lg:grid-cols-1">
          {c.statements.map((statement, index) => {
            const Icon = statementIcons[index];
            return (
              <div key={statement.label} className="box-border w-full h-fit flex flex-col gap-[20px] p-[40px] bg-[#FFFFFF] [box-shadow:0px_2px_4px_#22364933] rounded-[12px]">
                <div className="box-border w-full h-fit flex flex-row justify-between items-center">
                  <Icon size={28} className="text-[#2F6E80]" />
                  <div className={`text-[13px]/[13px] text-[#2F6E80] ${font} font-medium tracking-[1.4px]`}>{statement.label}</div>
                </div>
                <div className={`text-[28px]/[31px] text-[#000000] ${font} font-medium`}>{statement.title}</div>
                <div className={`text-[16px]/[26px] text-[#354A5F] ${font}`}>{statement.text}</div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="box-border w-full h-fit flex flex-row flex-wrap gap-[96px] p-[96px] justify-start items-center bg-[#000354] max-lg:p-[60px_20px] max-lg:gap-[32px]">
        <div className="box-border w-[520px] max-w-full shrink-0 h-[560px] flex items-center justify-center max-lg:h-[420px]">
          <div role="img" aria-label={c.logoAlt} className="box-border w-full h-full bg-[url('/images/pst/pst-logo.png')] bg-no-repeat bg-contain bg-center" />
        </div>
        <div className="box-border [flex:1_1_0] min-w-[300px] h-fit flex flex-col gap-[20px]">
          <div className={`text-[13px]/[17px] text-[#A6CBD3] ${font} font-medium tracking-[1.4px]`}>{c.philosophyEyebrow}</div>
          <div className={`text-[48px]/[53px] text-[#FFFFFF] ${font} font-medium max-lg:text-[32px]/[35px]`}>{c.philosophyTitle}</div>
          <p className={`text-[18px]/[31px] text-[#FFFFFFCC] ${font}`}>{c.philosophy1}</p>
          <p className={`text-[18px]/[31px] text-[#FFFFFFCC] ${font}`}>{c.philosophy2}</p>
          <p className={`text-[22px]/[32px] text-[#FFFFFF] ${font} font-medium`}>{c.philosophy3}</p>
        </div>
      </section>

      <section className="box-border w-full h-fit flex flex-row flex-wrap gap-[64px] p-[120px_96px] justify-start items-center bg-[#F5F6F7] max-lg:p-[60px_20px] max-lg:gap-[32px]">
        <div className="box-border [flex:1_1_0] min-w-[300px] h-fit flex flex-col gap-[24px]">
          <Eyebrow>{c.achievementEyebrow}</Eyebrow>
          <div className={`text-[48px]/[53px] text-[#000000] ${font} font-medium max-lg:text-[32px]/[35px]`}>{c.achievementTitle}</div>
          <div className={`text-[18px]/[27px] text-[#354A5F] ${font}`}>{c.achievementDesc}</div>
          <div className="box-border w-full h-fit flex flex-col gap-[20px]">
            {c.skills.map((skill) => (
              <div key={skill.label} className="box-border w-full flex flex-col gap-[8px]">
                <div className={`flex flex-row justify-between text-[17px]/[22px] text-[#000000] ${font} font-medium`}>
                  <span>{skill.label}</span>
                  <span className={`text-[24px]/[24px] text-[#000354] ${font} font-medium`}>{skill.value}%</span>
                </div>
                <div className="box-border w-full h-[8px] bg-[#FFFFFF] rounded-[999px] overflow-hidden">
                  <div className="h-full bg-[#2F6E80] rounded-[999px]" style={{ width: `${skill.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="box-border [flex:1_1_0] min-w-[300px] max-w-[560px] h-[480px] relative">
          <div
            className="box-border w-full h-full bg-cover bg-center rounded-[12px]"
            style={{ backgroundImage: `url(${experiencePhoto})` }}
            role="img"
            aria-label={c.experienceAlt}
          />
          <div className="box-border w-[280px] h-fit absolute right-[-24px] bottom-[-24px] flex flex-col gap-[6px] p-[24px] bg-[#FFFFFF] rounded-[12px] [box-shadow:0px_10px_30px_#22364940] max-lg:right-[16px]">
            <div className={`text-[16px]/[21px] text-[#000354] ${font} font-medium`}>Partner Center of Expertise</div>
            <div className={`text-[13px]/[17px] text-[#354A5F] ${font}`}>SAP ERP Silver Partner · VAR-Delivered Support</div>
          </div>
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
