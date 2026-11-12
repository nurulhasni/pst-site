"use client";

import {
  ArrowDownRight,
  Award,
  ChartLine,
  ChartPie,
  Cloud,
  Compass,
  Handshake,
  Headset,
  Layers,
  Rocket,
  ShieldCheck,
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
    heroDesc: "Six services that get SAP running in your business and keep it running, from the first blueprint to years of support.",
    certTitle: "Partner Center of Expertise",
    certDesc: "Certified for SAP VAR-Delivered Support",
    offerEyebrow: "WHAT WE OFFER",
    offerTitle: "Our service portfolio",
    offerDesc: "Six services delivered by one team, from SAP implementation and analytics to migration audits and long-term support.",
    discuss: "Discuss this service",
    services: [
      {
        id: "sap-solution",
        title: "SAP Solution",
        description:
          "Your SAP ERP is built around your business processes, not the other way round. We keep scope and cost under control, and work side by side with your team until they can run the system themselves.",
      },
      {
        id: "sap-support",
        title: "SAP Support & Outsourcing",
        description:
          "Keep SAP running without building a large in-house team. PST is an authorised SAP Value Added Reseller (VAR), and our support process passed SAP's audit for the “Partner Center of Expertise” certification.",
      },
      {
        id: "business-process",
        title: "Business Process Reengineering",
        description:
          "We redesign slow, manual processes with IT as the enabler, so work that adds no value is removed before it gets locked into a system. Along the way we point out opportunities to raise your company's value that are easy to miss from the inside.",
      },
      {
        id: "strategic-planning",
        title: "Strategic Information Planning",
        description:
          "When every initiative looks urgent, it is hard to know where to start. We help you see the whole business process and rank your initiatives, then give you an IT blueprint with priorities, an investment estimate for each one and its expected return.",
      },
      {
        id: "sap-analytics-cloud",
        title: "SAP Analytics Cloud (SAC)",
        description:
          "After go-live, many companies still export data to Excel to build their reports, and every department ends up with different numbers. We set up SAP Analytics Cloud on your SAP data: dashboards leaders actually open, budgets and forecasts planned in the same tool, and reports your team can build on their own.",
      },
      {
        id: "migration-audit",
        title: "Migration Compliance Audit",
        description:
          "A migration to SAP S/4HANA or a new SAP system can look finished while gaps stay hidden: balances that do not reconcile, incomplete master data, user access that is too broad. We review the migration against your processes and internal controls, and give you a clear list of what to fix, ranked by risk. It works for migrations we run and for those done by another partner.",
      },
    ],
    whyEyebrow: "WHY CHOOSE US",
    whyTitle: "We understand your needs and the solution that fits",
    reasons: [
      {
        title: "Full commitment and honest partnership",
        description:
          "Our team works alongside yours until the problem is solved, and the relationship doesn't end when the project does.",
      },
      {
        title: "Lower TCO and faster ROI",
        description:
          "An ERP implementation is a big investment. We help you weigh the factors that matter most to your business, then recommend the solution that fits your needs.",
      },
      {
        title: "Wide-ranging team and experience",
        description:
          "Our people come from different backgrounds and industries, such as automotive, FMCG, machinery and other manufacturing, so we can look at your challenges from many angles.",
      },
    ],
    riseEyebrow: "RISE WITH SAP",
    riseTitle: "Driving business innovation together",
    riseDesc:
      "Ready to move to the cloud? PST guides your RISE with SAP journey, from assessing the systems you run today to getting your new SAP S/4HANA Cloud system live.",
    riseItems: ["Move to SAP S/4HANA Cloud", "See which business processes need fixing", "Guided by PST from assessment to go-live"],
    riseCta: "Talk to our team",
    clientsEyebrow: "OUR CLIENTS",
    clientsTitle: "Proven across Indonesia's key industries",
    clientsDesc:
      "Our services run inside companies in heavy equipment, maritime, mining, finance and consumer goods. Here are some of them.",
    ctaTitle: "Not sure what you need?",
    ctaDesc: "Our consultants can assess your current systems and suggest the next step.",
    ctaLabel: "Find your solution",
  },
  id: {
    current: "Layanan",
    heroTitle: "Solusi SAP & TI\nyang menyeluruh",
    heroDesc: "Enam layanan untuk membuat SAP berjalan di bisnis Anda dan tetap berjalan, dari blueprint pertama sampai dukungan bertahun-tahun.",
    certTitle: "Partner Center of Expertise",
    certDesc: "Tersertifikasi untuk SAP VAR-Delivered Support",
    offerEyebrow: "YANG KAMI TAWARKAN",
    offerTitle: "Portofolio layanan kami",
    offerDesc: "Enam layanan yang dikerjakan satu tim, mulai dari implementasi SAP dan analitik sampai audit migrasi dan dukungan jangka panjang.",
    discuss: "Diskusikan layanan ini",
    services: [
      {
        id: "sap-solution",
        title: "Solusi SAP",
        description:
          "SAP ERP Anda dibangun mengikuti proses bisnis Anda, bukan sebaliknya. Kami menjaga lingkup dan biaya tetap terkendali, dan bekerja bersama tim Anda sampai mereka mampu menjalankan sistemnya sendiri.",
      },
      {
        id: "sap-support",
        title: "Dukungan & Outsourcing SAP",
        description:
          "Jaga SAP tetap berjalan tanpa harus membangun tim internal yang besar. PST adalah Value Added Reseller (VAR) resmi SAP, dan proses dukungan kami lolos audit SAP untuk sertifikasi “Partner Center of Expertise”.",
      },
      {
        id: "business-process",
        title: "Rekayasa Ulang Proses Bisnis",
        description:
          "Kami merancang ulang proses yang lambat dan manual dengan TI sebagai pendorongnya, sehingga pekerjaan yang tidak bernilai tambah hilang sebelum terkunci di dalam sistem. Sambil berjalan, kami menunjukkan peluang menaikkan nilai perusahaan yang sering terlewat dari dalam.",
      },
      {
        id: "strategic-planning",
        title: "Perencanaan Informasi Strategis",
        description:
          "Saat semua inisiatif terasa mendesak, sulit menentukan harus mulai dari mana. Kami membantu Anda melihat proses bisnis secara utuh dan mengurutkan inisiatifnya, lalu menyerahkan blueprint TI berisi prioritas, perkiraan investasi tiap inisiatif, dan hasil yang diharapkan.",
      },
      {
        id: "sap-analytics-cloud",
        title: "SAP Analytics Cloud (SAC)",
        description:
          "Setelah go-live, banyak perusahaan masih mengekspor data ke Excel untuk menyusun laporan, dan setiap departemen akhirnya punya angka yang berbeda. Kami menyiapkan SAP Analytics Cloud di atas data SAP Anda: dashboard yang benar-benar dibuka pimpinan, anggaran dan proyeksi yang disusun di alat yang sama, dan laporan yang bisa dibuat sendiri oleh tim Anda.",
      },
      {
        id: "migration-audit",
        title: "Migration Compliance Audit",
        description:
          "Migrasi ke SAP S/4HANA atau sistem SAP baru bisa terlihat selesai padahal masih ada celah tersembunyi: saldo yang tidak cocok, master data yang belum lengkap, hak akses pengguna yang terlalu luas. Kami meninjau migrasi terhadap proses dan kontrol internal Anda, lalu menyerahkan daftar perbaikan yang jelas, diurutkan menurut risikonya. Layanan ini berlaku untuk migrasi yang kami kerjakan maupun yang dikerjakan mitra lain.",
      },
    ],
    whyEyebrow: "MENGAPA MEMILIH KAMI",
    whyTitle: "Kami paham kebutuhan Anda dan solusi yang paling cocok",
    reasons: [
      {
        title: "Komitmen penuh dan kemitraan yang jujur",
        description:
          "Kami ikut turun menyelesaikan masalah bersama tim Anda sampai tuntas, dan hubungan kami tidak berhenti saat proyek selesai.",
      },
      {
        title: "TCO lebih rendah, ROI lebih cepat",
        description:
          "Implementasi ERP adalah investasi besar. Kami membantu Anda menimbang faktor yang paling berpengaruh bagi bisnis Anda, lalu merekomendasikan solusi yang sesuai kebutuhan.",
      },
      {
        title: "Tim dan pengalaman yang beragam",
        description:
          "Tim kami berasal dari beragam latar belakang dan industri, seperti otomotif, FMCG, permesinan, dan manufaktur lainnya, sehingga kami bisa melihat tantangan Anda dari banyak sudut.",
      },
    ],
    riseEyebrow: "RISE WITH SAP",
    riseTitle: "Mendorong inovasi bisnis bersama",
    riseDesc:
      "Siap beralih ke cloud? PST mendampingi RISE with SAP Anda, dari menilai sistem yang Anda pakai sekarang sampai SAP S/4HANA Cloud yang baru berjalan.",
    riseItems: ["Beralih ke SAP S/4HANA Cloud", "Lihat bagian proses bisnis yang bisa diperbaiki", "Didampingi PST dari asesmen hingga go-live"],
    riseCta: "Bicara dengan tim kami",
    clientsEyebrow: "KLIEN KAMI",
    clientsTitle: "Terbukti di berbagai industri utama Indonesia",
    clientsDesc:
      "Layanan kami berjalan di perusahaan alat berat, maritim, pertambangan, keuangan, dan barang konsumen. Berikut beberapa di antaranya.",
    ctaTitle: "Belum yakin apa yang Anda butuhkan?",
    ctaDesc: "Konsultan kami bisa menilai sistem Anda sekarang dan menyarankan langkah berikutnya.",
    ctaLabel: "Temukan solusi Anda",
  },
};

const serviceIcons: LucideIcon[] = [Layers, Headset, Workflow, Compass, ChartPie, ShieldCheck];
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
        <div className="box-border [flex:1_1_0] min-w-[min(300px,100%)] h-fit flex flex-col gap-[20px]">
          <div className="flex flex-row gap-[10px] items-center">
            <Rocket size={18} className="text-[#2F6E80]" />
            <div className={`text-[13px]/[17px] text-[#2F6E80] ${font} font-medium tracking-[1.4px]`}>{c.riseEyebrow}</div>
          </div>
          <div className={`text-[40px]/[44px] text-[#000354] ${font} font-medium max-lg:text-[30px]/[33px]`}>{c.riseTitle}</div>
          <div className={`text-[17px]/[27px] text-[#354A5F] ${font}`}>{c.riseDesc}</div>
        </div>
        <div className="box-border [flex:1_1_0] min-w-[min(300px,100%)] h-fit flex flex-col gap-[14px] p-[56px_64px] bg-[#EAF3F5] [background-image:radial-gradient(ellipse_35%_80%_at_95%_50%,_#A6CBD399_0%,_#A6CBD300_100%)] rounded-[12px] max-lg:p-[32px_24px]">
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
