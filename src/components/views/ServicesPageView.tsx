"use client";

import {
  ArrowDownRight,
  Award,
  ChartLine,
  Cloud,
  Compass,
  Handshake,
  Headset,
  Layers,
  Rocket,
  TrendingDown,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { Footer } from "@/components/sections/Footer";
import { FloatingContact } from "@/components/sections/FloatingContact";
import { PageHero } from "@/components/PageHero";
import { CtaBanner } from "@/components/CtaBanner";
import { ClientIndustries } from "@/components/sections/ClientIndustries";
import { useLanguage } from "@/components/LanguageProvider";

const font = "font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif]";

const copy = {
  en: {
    current: "Services",
    heroTitle: "Comprehensive SAP\n& IT solutions",
    heroDesc: "End-to-end technology services designed to modernize, optimize and transform your enterprise operations.",
    certTitle: "Partner Center of Expertise",
    certDesc: "Certified for SAP VAR-Delivered Support",
    offerEyebrow: "WHAT WE OFFER",
    offerTitle: "Our service portfolio",
    offerDesc: "Four core services, one integrated team, from SAP implementation to long-term support and outsourcing.",
    discuss: "Discuss this service",
    services: [
      {
        id: "sap-solution",
        title: "SAP Solution",
        description:
          "ERP implementation is more than just an implementation of software or automation of the current business processes. An ERP system is merely a tool to help you run the business, so its implementation should be driven by the business processes, instead of the tool.",
      },
      {
        id: "sap-support",
        title: "SAP Support & Outsourcing",
        description:
          "PST is an authorised Value Added Reseller (VAR) of SAP and was awarded the “Partner Center of Expertise” certification, a title granted for successfully completing the audit process for SAP VAR-Delivered Support.",
      },
      {
        id: "business-process",
        title: "Business Process Reengineering",
        description:
          "The fast growth of technology has changed the face of the world, forcing business players to redefine the way they run their business. Many conventional business processes have been re-engineered by applying IT as an enabler.",
      },
      {
        id: "strategic-planning",
        title: "Strategic Information Planning",
        description:
          "Confusion in setting the priority of business process initiatives derives from the complexity of the business processes themselves. We help you set a clear, prioritized plan for your information systems.",
      },
    ],
    whyEyebrow: "WHY CHOOSE US",
    whyTitle: "We understand what you need and what fits you best",
    reasons: [
      {
        title: "Full commitment and honest partnership",
        description:
          "We believe success is achieved through commitment and collaboration. Our team works together with you to solve the problem. We don't just do business, we build long-lasting, sustainable partnerships with our clients.",
      },
      {
        title: "Lower TCO and faster ROI",
        description:
          "Implementing ERP can be a big investment. We help you analyse and identify the factors relevant to your business, and provide the solution best suited to your needs and requirements.",
      },
      {
        title: "Wide-ranging team and experience",
        description:
          "Our people come from different backgrounds and industries, such as automotive, FMCG, machinery and other manufacturing, giving us a wider perspective on our clients' challenges.",
      },
    ],
    riseEyebrow: "RISE WITH SAP",
    riseTitle: "Driving business innovation together",
    riseDesc:
      "Ready to move to the cloud? PST guides your RISE with SAP journey, from assessing your current landscape to running your new SAP S/4HANA Cloud system.",
    riseItems: ["Move to SAP S/4HANA Cloud", "Gain business process insights", "Guided by PST from assessment to go-live"],
    riseCta: "Talk to our team",
    clientsEyebrow: "OUR CLIENTS",
    clientsTitle: "Proven across Indonesia's key industries",
    clientsDesc:
      "Our services run inside companies in heavy equipment, maritime, mining, finance and consumer goods. Here are some of them.",
    ctaTitle: "Not sure what you need?",
    ctaDesc: "Our experts can assess your current systems and recommend the best path forward.",
    ctaLabel: "Find your solution",
  },
  id: {
    current: "Layanan",
    heroTitle: "Solusi SAP & TI\nyang menyeluruh",
    heroDesc: "Layanan teknologi menyeluruh yang dirancang untuk memodernisasi, mengoptimalkan, dan mentransformasi operasional perusahaan Anda.",
    certTitle: "Partner Center of Expertise",
    certDesc: "Tersertifikasi untuk SAP VAR-Delivered Support",
    offerEyebrow: "YANG KAMI TAWARKAN",
    offerTitle: "Portofolio layanan kami",
    offerDesc: "Empat layanan inti, satu tim terintegrasi, dari implementasi SAP hingga dukungan jangka panjang dan outsourcing.",
    discuss: "Diskusikan layanan ini",
    services: [
      {
        id: "sap-solution",
        title: "Solusi SAP",
        description:
          "Implementasi ERP lebih dari sekadar implementasi perangkat lunak atau otomatisasi proses bisnis yang ada. Sistem ERP hanyalah alat untuk membantu Anda menjalankan bisnis, sehingga implementasinya harus digerakkan oleh proses bisnis, bukan oleh alatnya.",
      },
      {
        id: "sap-support",
        title: "Dukungan & Outsourcing SAP",
        description:
          "PST adalah Value Added Reseller (VAR) resmi SAP dan telah meraih sertifikasi “Partner Center of Expertise”, gelar yang diberikan atas keberhasilan menyelesaikan proses audit SAP VAR-Delivered Support.",
      },
      {
        id: "business-process",
        title: "Rekayasa Ulang Proses Bisnis",
        description:
          "Pesatnya perkembangan teknologi telah mengubah wajah dunia, memaksa pelaku bisnis mendefinisikan ulang cara mereka menjalankan usaha. Banyak proses bisnis konvensional telah direkayasa ulang dengan TI sebagai pendorongnya.",
      },
      {
        id: "strategic-planning",
        title: "Perencanaan Informasi Strategis",
        description:
          "Kebingungan dalam menentukan prioritas inisiatif proses bisnis berasal dari kompleksitas proses bisnis itu sendiri. Kami membantu Anda menyusun rencana sistem informasi yang jelas dan terprioritas.",
      },
    ],
    whyEyebrow: "MENGAPA MEMILIH KAMI",
    whyTitle: "Kami memahami kebutuhan Anda dan apa yang paling sesuai",
    reasons: [
      {
        title: "Komitmen penuh dan kemitraan yang jujur",
        description:
          "Kami percaya kesuksesan diraih melalui komitmen dan kolaborasi. Tim kami bekerja bersama Anda menyelesaikan masalah. Kami tidak sekadar berbisnis, kami membangun kemitraan jangka panjang yang berkelanjutan dengan klien.",
      },
      {
        title: "TCO lebih rendah, ROI lebih cepat",
        description:
          "Implementasi ERP bisa menjadi investasi besar. Kami membantu Anda menganalisis dan mengidentifikasi faktor yang relevan bagi bisnis Anda, serta memberikan solusi yang paling sesuai dengan kebutuhan Anda.",
      },
      {
        title: "Tim dan pengalaman yang beragam",
        description:
          "Tim kami berasal dari beragam latar belakang dan industri, seperti otomotif, FMCG, permesinan, dan manufaktur lainnya, sehingga kami memiliki perspektif yang lebih luas atas tantangan klien.",
      },
    ],
    riseEyebrow: "RISE WITH SAP",
    riseTitle: "Mendorong inovasi bisnis bersama",
    riseDesc:
      "Siap beralih ke cloud? PST mendampingi perjalanan RISE with SAP Anda, dari asesmen lanskap saat ini hingga menjalankan sistem SAP S/4HANA Cloud yang baru.",
    riseItems: ["Beralih ke SAP S/4HANA Cloud", "Dapatkan wawasan proses bisnis", "Didampingi PST dari asesmen hingga go-live"],
    riseCta: "Bicara dengan tim kami",
    clientsEyebrow: "KLIEN KAMI",
    clientsTitle: "Terbukti di berbagai industri utama Indonesia",
    clientsDesc:
      "Layanan kami berjalan di perusahaan alat berat, maritim, pertambangan, keuangan, dan barang konsumen. Berikut beberapa di antaranya.",
    ctaTitle: "Belum yakin apa yang Anda butuhkan?",
    ctaDesc: "Para ahli kami dapat menilai sistem Anda saat ini dan merekomendasikan langkah terbaik ke depan.",
    ctaLabel: "Temukan solusi Anda",
  },
};

const serviceIcons: LucideIcon[] = [Layers, Headset, Workflow, Compass];
const reasonIcons: LucideIcon[] = [Handshake, TrendingDown, Users];
const riseIcons: LucideIcon[] = [Cloud, ChartLine, Users];

export function ServicesPageView() {
  const { lang } = useLanguage();
  const c = copy[lang];

  return (
    <main className="w-full overflow-x-hidden">
      <PageHero
        current={c.current}
        title={c.heroTitle}
        description={c.heroDesc}
        aside={
          <div className="box-border w-full max-w-[420px] h-fit flex flex-col p-[8px_24px] bg-[#FFFFFF0F] [outline:1px_solid_#FFFFFF33] [outline-offset:-0.5px] rounded-[12px]">
            {c.services.map((service, index) => (
              <a
                key={service.id}
                href={`#${service.id}`}
                className="group box-border w-full h-fit flex flex-row gap-[14px] justify-between items-center py-[16px] [border-width:0px_0px_1px_0px] [border-style:solid] [border-color:#FFFFFF1F] last:[border-width:0px]"
              >
                <span className="flex flex-row gap-[14px] items-center">
                  <span className={`w-[16px] text-[13px]/[17px] text-[#A6CBD3] ${font} font-medium tracking-[0.6px]`}>0{index + 1}</span>
                  <span className={`text-[16px]/[21px] text-[#FFFFFF] group-hover:text-[#A6CBD3] transition-colors ${font} font-medium`}>{service.title}</span>
                </span>
                <ArrowDownRight size={18} className="text-[#FFFFFFA6]" />
              </a>
            ))}
          </div>
        }
      >
        <div className="box-border w-fit h-fit flex flex-row gap-[10px] items-center p-[10px_16px_10px_12px] bg-[#FFFFFF14] rounded-[8px]">
          <Award size={22} className="text-[#A6CBD3] shrink-0" />
          <div className="box-border w-fit h-fit flex flex-col gap-[1px]">
            <div className={`text-[14px]/[18px] text-[#FFFFFF] ${font} font-medium`}>{c.certTitle}</div>
            <div className={`text-[12px]/[16px] text-[#FFFFFFB3] ${font}`}>{c.certDesc}</div>
          </div>
        </div>
      </PageHero>

      <section className="box-border w-full h-fit flex flex-col gap-[40px] p-[112px_96px] justify-start items-start max-lg:p-[60px_20px]">
        <div className="box-border w-full h-fit flex flex-col gap-[16px]">
          <div className={`text-[12px]/[15px] text-[#2F6E80] ${font} font-medium tracking-[1.2px]`}>{c.offerEyebrow}</div>
          <div className={`text-[48px]/[53px] text-[#000000] ${font} font-medium max-lg:text-[32px]/[35px]`}>{c.offerTitle}</div>
          <div className={`text-[18px]/[27px] max-w-[640px] text-[#354A5F] ${font}`}>{c.offerDesc}</div>
        </div>
        {c.services.map((service, index) => {
          const Icon = serviceIcons[index];
          return (
            <div
              key={service.id}
              id={service.id}
              className="box-border w-full h-fit flex flex-row gap-[32px] pt-[32px] [border-width:1px_0px_0px_0px] [border-style:solid] [border-color:#D5DADD] max-lg:flex-col"
            >
              <div className="box-border w-[48px] h-[48px] shrink-0 flex items-center justify-center bg-[#EAF3F5] rounded-[8px]">
                <Icon size={24} className="text-[#2F6E80]" />
              </div>
              <div className="box-border w-full h-fit flex flex-col gap-[12px]">
                <div className={`text-[14px]/[18px] text-[#2F6E80] ${font} font-medium`}>0{index + 1}</div>
                <div className={`text-[28px]/[32px] text-[#000000] ${font} font-medium`}>{service.title}</div>
                <div className={`text-[18px]/[30px] max-w-[760px] text-[#354A5F] ${font}`}>{service.description}</div>
                <a href="/contact" className={`box-border w-fit h-fit flex flex-row gap-[4px] items-center text-[16px]/[20px] text-[#2F6E80] hover:text-[#000354] ${font} font-medium`}>
                  {c.discuss}
                </a>
              </div>
            </div>
          );
        })}
      </section>

      <section className="box-border w-full h-fit flex flex-col gap-[48px] p-[112px_96px] justify-start items-start bg-[#000354] max-lg:p-[60px_20px] max-lg:gap-[32px]">
        <div className="box-border w-full h-fit flex flex-col gap-[16px]">
          <div className={`text-[13px]/[17px] text-[#A6CBD3] ${font} font-medium tracking-[1.4px]`}>{c.whyEyebrow}</div>
          <div className={`text-[48px]/[53px] text-[#FFFFFF] ${font} font-medium max-lg:text-[32px]/[35px]`}>{c.whyTitle}</div>
        </div>
        <div className="box-border w-full h-fit grid grid-cols-3 gap-[24px] max-lg:grid-cols-1">
          {c.reasons.map((reason, index) => {
            const Icon = reasonIcons[index];
            return (
              <div key={reason.title} className="box-border w-full h-fit flex flex-col gap-[24px] p-[40px] bg-[#FFFFFF14] rounded-[12px]">
                <div className="box-border w-[52px] h-[52px] flex items-center justify-center bg-[#A6CBD3] rounded-[8px]">
                  <Icon size={26} className="text-[#000354]" />
                </div>
                <div className={`text-[22px]/[26px] text-[#FFFFFF] ${font} font-medium`}>{reason.title}</div>
                <div className={`text-[15px]/[24px] text-[#FFFFFFBF] ${font}`}>{reason.description}</div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="box-border w-full h-fit flex flex-row flex-wrap gap-[64px] p-[112px_96px] justify-start items-start max-lg:p-[60px_20px] max-lg:gap-[32px]">
        <div className="box-border [flex:1_1_0] min-w-[300px] h-fit flex flex-col gap-[20px]">
          <div className="flex flex-row gap-[10px] items-center">
            <Rocket size={18} className="text-[#2F6E80]" />
            <div className={`text-[13px]/[17px] text-[#2F6E80] ${font} font-medium tracking-[1.4px]`}>{c.riseEyebrow}</div>
          </div>
          <div className={`text-[40px]/[44px] text-[#000354] ${font} font-medium max-lg:text-[30px]/[33px]`}>{c.riseTitle}</div>
          <div className={`text-[17px]/[27px] text-[#354A5F] ${font}`}>{c.riseDesc}</div>
        </div>
        <div className="box-border [flex:1_1_0] min-w-[300px] h-fit flex flex-col gap-[14px] p-[56px_64px] bg-[#EAF3F5] [background-image:radial-gradient(ellipse_35%_80%_at_95%_50%,_#A6CBD399_0%,_#A6CBD300_100%)] rounded-[12px] max-lg:p-[32px_24px]">
          {c.riseItems.map((label, index) => {
            const Icon = riseIcons[index];
            return (
              <div key={label} className={`box-border w-full p-[16px_20px] flex flex-row gap-[14px] items-center bg-[#FFFFFF] rounded-[8px] text-[15px]/[20px] text-[#000354] ${font} font-medium`}>
                <Icon size={20} className="text-[#2F6E80] shrink-0" />
                {label}
              </div>
            );
          })}
          <a href="/contact" className={`box-border w-fit h-[48px] mt-[8px] flex items-center p-[0px_24px] bg-[#000354] hover:bg-[#0B1470] rounded-[8px] text-[16px]/[20px] text-[#FFFFFF] ${font} font-medium`}>
            {c.riseCta}
          </a>
        </div>
      </section>

      <section id="clients" className="scroll-mt-[72px] box-border w-full h-fit flex flex-col gap-[40px] p-[112px_96px] justify-start items-start bg-[#F5F6F7] max-lg:p-[60px_20px]">
        <div className="box-border w-full max-w-[720px] h-fit flex flex-col gap-[16px]">
          <div className={`text-[12px]/[15px] text-[#2F6E80] ${font} font-medium tracking-[1.2px]`}>{c.clientsEyebrow}</div>
          <div className={`text-[48px]/[53px] text-[#000000] ${font} font-medium max-lg:text-[32px]/[35px]`}>{c.clientsTitle}</div>
          <div className={`text-[18px]/[27px] text-[#354A5F] ${font}`}>{c.clientsDesc}</div>
        </div>
        <ClientIndustries />
      </section>

      <section className="box-border w-full h-fit p-[96px] pb-[120px] max-lg:p-[60px_20px]">
        <CtaBanner title={c.ctaTitle} description={c.ctaDesc} label={c.ctaLabel} href="/contact" />
      </section>

      <Footer />
      <FloatingContact />
    </main>
  );
}
