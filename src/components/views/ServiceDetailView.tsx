"use client";

import Link from "next/link";
import {
  ArrowDownRight,
  Award,
  BadgeCheck,
  ChevronRight,
  CircleCheck,
  Compass,
  GitBranch,
  Layers,
  LifeBuoy,
  TrendingUp,
  Wallet,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { Footer } from "@/components/sections/Footer";
import { FloatingContact } from "@/components/sections/FloatingContact";
import { CtaBanner } from "@/components/CtaBanner";
import { useLanguage } from "@/components/LanguageProvider";

const font = "font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif]";

const copy = {
  en: {
    home: "Home",
    services: "Services",
    current: "Core Level Services",
    heroTitle: "Core level\nservices",
    heroDesc: "We are an IT solution provider. From strategy and process design to SAP implementation and long-term support, here's how we work, in detail.",
    certTitle: "Partner Center of Expertise",
    certDesc: "Certified for SAP VAR-Delivered Support",
    discuss: "Discuss this service",
    outcomes: [
      { title: "Better TCO", text: "Lower total cost of ownership" },
      { title: "Faster ROI", text: "Quicker return on investment" },
      { title: "Proper processes", text: "Business processes done right" },
    ],
    deliverables: [
      ["Detailed business processes", "Prioritized business initiatives"],
      ["Investment estimate per initiative", "Estimated TCO and its return"],
    ],
    credentials: [
      { title: "Partner Center of Expertise", text: "SAP VAR-Delivered Support audit" },
      { title: "Authorised SAP VAR", text: "Value Added Reseller of SAP" },
    ],
    jump: ["SAP Solution", "Business Process Reengineering", "Strategic Information Planning", "SAP Support & Outsourcing"],
    s1: {
      title: "SAP Solution",
      lead: "Implementation driven by your business processes, not by the tool.",
      p1: "ERP implementation is more than just an implementation of software or automation of the current business processes. An ERP system is merely a tool to help you run the business. Its implementation should be driven by the business processes, instead of the tool.",
      p2: "We realize that many ERP implementations are over budget and too big of an investment for the customer. Therefore, our sole concern is to ensure an SAP ERP implementation with:",
      p3: "PST has successfully helped many customers implement SAP ERP. Most of them had very limited knowledge of SAP at first, but every barrier and issue was solved through honest partnership between our consultants and the client.",
    },
    s2: {
      title: "Business Process Reengineering",
      lead: "Re-engineer conventional processes with IT as the enabler.",
      p1: "The fast growth of technology has changed the face of the world, forcing business players to redefine the way they run their business. A lot of conventional business processes have been re-engineered by applying IT as an enabler.",
      quote: "Our experience lets us see the wisdom in applying the most beneficial, efficient and effective technology for our clients.",
      p2: "Beyond eliminating non-value-added processes, we help you see other possibilities that will increase your company's value.",
    },
    s3: {
      title: "Strategic Information Planning",
      lead: "An IT blueprint that sets clear priorities for every initiative.",
      p1: "Confusion in setting the priority of business process initiatives derives from the complexity of the business processes themselves. We help you see the overall business process and set the priority of business initiatives based on the core competencies you have to build, related to your company vision, in delivering better value to your business partners.",
      p2: "Strategic information planning becomes an IT blueprint: a complete picture and guideline for stakeholders in prioritizing initiatives and making decisions.",
      receive: "WHAT YOU RECEIVE",
    },
    s4: {
      title: "SAP Support & Outsourcing",
      lead: "Certified, SAP-audited support for systems that run your business every day.",
      p1: "PST has been an authorised Value Added Reseller (VAR) of SAP and was awarded the “Partner Center of Expertise” certification, a title granted for the successful completion of the audit process for SAP VAR-Delivered Support.",
      cta: "Talk to our support team",
    },
    ctaTitle: "Achieve your business objective",
    ctaDesc: "Tell us where your business is heading and our consultants will map the right mix of SAP, process and strategy services to get you there.",
    ctaLabel: "Get started",
  },
  id: {
    home: "Beranda",
    services: "Layanan",
    current: "Layanan Inti",
    heroTitle: "Layanan\ninti",
    heroDesc: "Kami adalah penyedia solusi TI. Dari strategi dan perancangan proses hingga implementasi SAP dan dukungan jangka panjang, inilah cara kami bekerja, secara rinci.",
    certTitle: "Partner Center of Expertise",
    certDesc: "Tersertifikasi untuk SAP VAR-Delivered Support",
    discuss: "Diskusikan layanan ini",
    outcomes: [
      { title: "TCO lebih baik", text: "Total cost of ownership lebih rendah" },
      { title: "ROI lebih cepat", text: "Balik modal lebih cepat" },
      { title: "Proses yang tepat", text: "Proses bisnis yang dijalankan dengan benar" },
    ],
    deliverables: [
      ["Proses bisnis yang terperinci", "Inisiatif bisnis yang terprioritas"],
      ["Estimasi investasi per inisiatif", "Estimasi TCO dan pengembaliannya"],
    ],
    credentials: [
      { title: "Partner Center of Expertise", text: "Audit SAP VAR-Delivered Support" },
      { title: "SAP VAR resmi", text: "Value Added Reseller resmi SAP" },
    ],
    jump: ["Solusi SAP", "Rekayasa Ulang Proses Bisnis", "Perencanaan Informasi Strategis", "Dukungan & Outsourcing SAP"],
    s1: {
      title: "Solusi SAP",
      lead: "Implementasi yang digerakkan oleh proses bisnis Anda, bukan oleh alatnya.",
      p1: "Implementasi ERP lebih dari sekadar implementasi perangkat lunak atau otomatisasi proses bisnis yang ada. Sistem ERP hanyalah alat untuk membantu Anda menjalankan bisnis. Implementasinya harus digerakkan oleh proses bisnis, bukan oleh alatnya.",
      p2: "Kami menyadari banyak implementasi ERP yang melebihi anggaran dan menjadi investasi terlalu besar bagi pelanggan. Karena itu, fokus utama kami adalah memastikan implementasi SAP ERP dengan:",
      p3: "PST telah berhasil membantu banyak pelanggan mengimplementasikan SAP ERP. Sebagian besar awalnya memiliki pengetahuan SAP yang sangat terbatas, namun setiap hambatan dan masalah dapat diatasi melalui kemitraan yang jujur antara konsultan kami dan klien.",
    },
    s2: {
      title: "Rekayasa Ulang Proses Bisnis",
      lead: "Rekayasa ulang proses konvensional dengan TI sebagai pendorong.",
      p1: "Pesatnya perkembangan teknologi telah mengubah wajah dunia, memaksa pelaku bisnis mendefinisikan ulang cara mereka menjalankan usaha. Banyak proses bisnis konvensional telah direkayasa ulang dengan menerapkan TI sebagai pendorongnya.",
      quote: "Pengalaman kami memungkinkan kami melihat kearifan dalam menerapkan teknologi yang paling bermanfaat, efisien, dan efektif bagi klien kami.",
      p2: "Selain menghilangkan proses yang tidak bernilai tambah, kami membantu Anda melihat peluang lain yang akan meningkatkan nilai perusahaan Anda.",
    },
    s3: {
      title: "Perencanaan Informasi Strategis",
      lead: "Blueprint TI yang menetapkan prioritas jelas untuk setiap inisiatif.",
      p1: "Kebingungan dalam menentukan prioritas inisiatif proses bisnis berasal dari kompleksitas proses bisnis itu sendiri. Kami membantu Anda melihat proses bisnis secara keseluruhan dan menetapkan prioritas inisiatif bisnis berdasarkan kompetensi inti yang perlu Anda bangun, terkait visi perusahaan Anda, demi memberikan nilai lebih bagi mitra bisnis Anda.",
      p2: "Perencanaan informasi strategis menjadi blueprint TI: gambaran lengkap dan pedoman bagi pemangku kepentingan dalam memprioritaskan inisiatif dan mengambil keputusan.",
      receive: "YANG ANDA DAPATKAN",
    },
    s4: {
      title: "Dukungan & Outsourcing SAP",
      lead: "Dukungan tersertifikasi dan diaudit SAP untuk sistem yang menjalankan bisnis Anda setiap hari.",
      p1: "PST adalah Value Added Reseller (VAR) resmi SAP dan telah meraih sertifikasi “Partner Center of Expertise”, gelar yang diberikan atas keberhasilan menyelesaikan proses audit SAP VAR-Delivered Support.",
      cta: "Hubungi tim dukungan kami",
    },
    ctaTitle: "Raih tujuan bisnis Anda",
    ctaDesc: "Ceritakan arah bisnis Anda dan konsultan kami akan memetakan kombinasi layanan SAP, proses, dan strategi yang tepat untuk mewujudkannya.",
    ctaLabel: "Mulai sekarang",
  },
};

const outcomeIcons: LucideIcon[] = [Wallet, TrendingUp, Workflow];
const credentialIcons: LucideIcon[] = [Award, BadgeCheck];

function SectionMeta({ Icon, number, dark = false }: { Icon: LucideIcon; number: string; dark?: boolean }) {
  return (
    <div className="box-border w-fit h-[48px] flex flex-row gap-[12px] items-center">
      <div
        className={`box-border w-[48px] h-[48px] shrink-0 flex items-center justify-center rounded-[8px] ${
          dark ? "bg-[#FFFFFF1A]" : "bg-[#EAF3F5]"
        }`}
      >
        <Icon size={24} className={dark ? "text-[#A6CBD3]" : "text-[#2F6E80]"} />
      </div>
      <div className={`text-[14px]/[18px] ${dark ? "text-[#A6CBD3]" : "text-[#2F6E80]"} ${font} font-medium tracking-[0.6px]`}>{number}</div>
    </div>
  );
}

export function ServiceDetailView() {
  const { lang } = useLanguage();
  const c = copy[lang];
  const discussLink = (
    <Link href="/contact" className={`box-border w-fit flex flex-row gap-[4px] items-center text-[16px]/[20px] text-[#2F6E80] hover:text-[#000354] transition-colors ${font} font-medium`}>
      {c.discuss}
      <ChevronRight size={16} />
    </Link>
  );

  return (
    <main className="w-full overflow-x-hidden">
      <section className="box-border w-full h-fit flex flex-row flex-wrap gap-[64px] p-[64px_96px_80px_96px] justify-between items-start bg-[#08174A] [background-image:linear-gradient(90deg,_#08174A_0%,_#2B1C8F_100%)] max-lg:flex-col max-lg:p-[40px_20px_48px_20px]">
        <div className="box-border [flex:1_1_0] min-w-[300px] h-fit flex flex-col gap-[24px]">
          <div className={`box-border w-fit h-fit flex flex-row gap-[8px] items-center text-[14px]/[18px] ${font}`}>
            <Link href="/" className="text-[#FFFFFFA6] hover:text-[#FFFFFF]">{c.home}</Link>
            <ChevronRight size={14} className="text-[#FFFFFF66]" />
            <Link href="/services" className="text-[#FFFFFFA6] hover:text-[#FFFFFF]">{c.services}</Link>
            <ChevronRight size={14} className="text-[#FFFFFF66]" />
            <span className="text-[#A6CBD3] font-medium">{c.current}</span>
          </div>
          <h1 className={`text-[64px]/[67px] box-border w-full text-[#FFFFFF] ${font} font-bold whitespace-pre-line max-lg:text-[40px]/[44px]`}>
            {c.heroTitle}
          </h1>
          <div className={`text-[20px]/[30px] box-border w-[560px] max-w-full text-[#FFFFFFCC] ${font} font-normal`}>{c.heroDesc}</div>
          <div className="box-border w-fit h-[55px] flex flex-row gap-[10px] p-[10px_16px_10px_12px] items-center bg-[#FFFFFF14] rounded-[8px]">
            <Award size={22} className="text-[#A6CBD3] shrink-0" />
            <div className="box-border w-fit h-fit flex flex-col gap-[1px]">
              <div className={`text-[14px]/[18px] text-[#FFFFFF] ${font} font-medium`}>{c.certTitle}</div>
              <div className={`text-[12px]/[16px] text-[#FFFFFFB3] ${font}`}>{c.certDesc}</div>
            </div>
          </div>
        </div>

        <div className="box-border w-[420px] max-w-full shrink-0 h-fit flex flex-col p-[8px_24px] bg-[#FFFFFF0F] [outline:1px_solid_#FFFFFF33] [outline-offset:-0.5px] rounded-[12px]">
          {c.jump.map((label, index) => {
            const id = ["sap-solution", "business-process", "strategic-planning", "sap-support"][index];
            return (
              <a
                key={id}
                href={`#${id}`}
                className="group box-border w-full h-fit flex flex-row gap-[14px] justify-between items-center py-[16px] [border-width:0px_0px_1px_0px] [border-style:solid] [border-color:#FFFFFF1F] last:[border-width:0px]"
              >
                <span className="flex flex-row gap-[14px] items-center">
                  <span className={`w-[16px] text-[13px]/[17px] text-[#A6CBD3] ${font} font-medium tracking-[0.6px]`}>0{index + 1}</span>
                  <span className={`text-[16px]/[21px] text-[#FFFFFF] group-hover:text-[#A6CBD3] transition-colors ${font} font-medium`}>{label}</span>
                </span>
                <ArrowDownRight size={18} className="text-[#FFFFFFA6]" />
              </a>
            );
          })}
        </div>
      </section>

      <section className="box-border w-full h-fit flex flex-col p-[40px_96px_96px_96px] justify-start items-start max-lg:p-[32px_20px_60px_20px]">
        <div id="sap-solution" className="scroll-mt-[72px] box-border w-full flex flex-row flex-wrap gap-[80px] py-[72px] justify-start items-start max-lg:gap-[32px]">
          <div className="box-border w-[400px] max-w-full shrink-0 flex flex-col gap-[20px]">
            <SectionMeta Icon={Layers} number="01 / 04" />
            <h2 className={`text-[40px]/[44px] box-border w-full text-[#000000] ${font} font-medium`}>{c.s1.title}</h2>
            <p className={`text-[18px]/[27px] box-border w-full text-[#223548] ${font}`}>{c.s1.lead}</p>
            {discussLink}
          </div>
          <div className="box-border [flex:1_1_0] min-w-[300px] flex flex-col gap-[24px]">
            <p className={`text-[18px]/[29px] box-border w-full text-[#354A5F] ${font}`}>{c.s1.p1}</p>
            <p className={`text-[18px]/[29px] box-border w-full text-[#354A5F] ${font}`}>{c.s1.p2}</p>
            <div className="box-border w-full p-[28px_8px] flex flex-row flex-wrap bg-[#F5F6F7] rounded-[12px]">
              {c.outcomes.map((item, index) => {
                const Icon = outcomeIcons[index];
                return (
                  <div
                    key={item.title}
                    className={`box-border [flex:1_1_0] min-w-[200px] p-[4px_24px] flex flex-col gap-[10px] ${index > 0 ? "[border-width:0px_0px_0px_1px] [border-style:solid] [border-color:#D5DADD]" : ""}`}
                  >
                    <Icon size={22} className="text-[#2F6E80]" />
                    <div className={`text-[24px]/[29px] text-[#000000] ${font} font-medium`}>{item.title}</div>
                    <div className={`text-[15px]/[22px] text-[#354A5F] ${font}`}>{item.text}</div>
                  </div>
                );
              })}
            </div>
            <p className={`text-[18px]/[29px] box-border w-full text-[#354A5F] ${font}`}>{c.s1.p3}</p>
          </div>
        </div>

        <div id="business-process" className="scroll-mt-[72px] box-border w-full flex flex-row flex-wrap gap-[80px] py-[72px] justify-start items-start max-lg:gap-[32px]">
          <div className="box-border w-[400px] max-w-full shrink-0 flex flex-col gap-[20px]">
            <SectionMeta Icon={GitBranch} number="02 / 04" />
            <h2 className={`text-[40px]/[44px] box-border w-full text-[#000000] ${font} font-medium`}>{c.s2.title}</h2>
            <p className={`text-[18px]/[27px] box-border w-full text-[#223548] ${font}`}>{c.s2.lead}</p>
            {discussLink}
          </div>
          <div className="box-border [flex:1_1_0] min-w-[300px] flex flex-col gap-[24px]">
            <p className={`text-[18px]/[29px] box-border w-full text-[#354A5F] ${font}`}>{c.s2.p1}</p>
            <blockquote className="box-border w-full flex flex-col gap-[12px] pt-[8px] pb-[8px] pl-[28px] [border-width:0px_0px_0px_3px] [border-style:solid] [border-color:#A6CBD3]">
              <p className={`text-[26px]/[35px] text-[#000000] ${font} font-medium`}>{c.s2.quote}</p>
            </blockquote>
            <p className={`text-[18px]/[29px] box-border w-full text-[#354A5F] ${font}`}>{c.s2.p2}</p>
          </div>
        </div>

        <div id="strategic-planning" className="scroll-mt-[72px] box-border w-full flex flex-row flex-wrap gap-[80px] py-[72px] justify-start items-start max-lg:gap-[32px]">
          <div className="box-border w-[400px] max-w-full shrink-0 flex flex-col gap-[20px]">
            <SectionMeta Icon={Compass} number="03 / 04" />
            <h2 className={`text-[40px]/[44px] box-border w-full text-[#000000] ${font} font-medium`}>{c.s3.title}</h2>
            <p className={`text-[18px]/[27px] box-border w-full text-[#223548] ${font}`}>{c.s3.lead}</p>
            {discussLink}
          </div>
          <div className="box-border [flex:1_1_0] min-w-[300px] flex flex-col gap-[24px]">
            <p className={`text-[18px]/[29px] box-border w-full text-[#354A5F] ${font}`}>{c.s3.p1}</p>
            <p className={`text-[18px]/[29px] box-border w-full text-[#354A5F] ${font}`}>{c.s3.p2}</p>
            <div className="box-border w-full flex flex-col gap-[20px] p-[32px] [border-width:1px] [border-style:solid] [border-color:#D5DADD] rounded-[12px]">
              <div className={`text-[13px]/[17px] text-[#2F6E80] tracking-[1.2px] ${font} font-medium`}>{c.s3.receive}</div>
              {c.deliverables.map((row) => (
                <div key={row[0]} className="box-border w-full flex flex-row flex-wrap gap-[24px]">
                  {row.map((item) => (
                    <div key={item} className="box-border [flex:1_1_0] min-w-[200px] flex flex-row gap-[12px] items-center">
                      <CircleCheck size={20} className="text-[#2F6E80] shrink-0" />
                      <span className={`text-[17px]/[25px] text-[#223548] ${font}`}>{item}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          id="sap-support"
          className="scroll-mt-[72px] box-border w-full flex flex-row flex-wrap gap-[80px] p-[64px] rounded-[12px] [background-image:linear-gradient(90deg,_#08174A_0%,_#2B1C8F_100%)] justify-start items-start max-lg:gap-[32px] max-lg:p-[32px]"
        >
          <div className="box-border w-[336px] max-w-full shrink-0 flex flex-col gap-[20px]">
            <SectionMeta Icon={LifeBuoy} number="04 / 04" dark />
            <h2 className={`text-[40px]/[44px] box-border w-full text-[#FFFFFF] ${font} font-medium`}>{c.s4.title}</h2>
            <p className={`text-[18px]/[27px] box-border w-full text-[#FFFFFFCC] ${font}`}>{c.s4.lead}</p>
          </div>
          <div className="box-border [flex:1_1_0] min-w-[300px] flex flex-col gap-[32px]">
            <p className={`text-[20px]/[32px] box-border w-full text-[#FFFFFF] ${font}`}>{c.s4.p1}</p>
            <div className="box-border w-full flex flex-row flex-wrap gap-[16px]">
              {c.credentials.map((item, index) => {
                const Icon = credentialIcons[index];
                return (
                  <div key={item.title} className="box-border [flex:1_1_0] min-w-[220px] flex flex-row gap-[16px] items-center">
                    <div className="box-border w-[48px] h-[48px] shrink-0 flex items-center justify-center bg-[#FFFFFF1A] rounded-[8px]">
                      <Icon size={26} className="text-[#A6CBD3]" />
                    </div>
                    <div className="box-border w-full flex flex-col gap-[2px]">
                      <div className={`text-[16px]/[21px] text-[#FFFFFF] ${font} font-medium`}>{item.title}</div>
                      <div className={`text-[14px]/[18px] text-[#FFFFFFB3] ${font}`}>{item.text}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <Link
              href="/contact"
              className={`box-border w-fit h-[48px] flex items-center p-[0px_24px] bg-[#A6CBD3] hover:bg-[#B8D8DF] rounded-[8px] text-[16px]/[20px] text-[#000354] transition-colors ${font} font-medium`}
            >
              {c.s4.cta}
            </Link>
          </div>
        </div>
      </section>

      <section className="box-border w-full h-fit p-[0px_96px_120px_96px] max-lg:p-[0px_20px_60px_20px]">
        <CtaBanner title={c.ctaTitle} description={c.ctaDesc} label={c.ctaLabel} href="/contact" />
      </section>

      <Footer />
      <FloatingContact />
    </main>
  );
}
