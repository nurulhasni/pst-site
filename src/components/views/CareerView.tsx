"use client";

import {
  BriefcaseBusiness,
  Check,
  Code,
  Globe,
  GraduationCap,
  Layers,
  Minus,
  Plus,
  Server,
  Shuffle,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Footer } from "@/components/sections/Footer";
import { FloatingContact } from "@/components/sections/FloatingContact";
import { PageHero } from "@/components/PageHero";
import { CtaBanner } from "@/components/CtaBanner";
import { useLanguage } from "@/components/LanguageProvider";
import { defaultApplyEmail, type CareerPosition } from "@/lib/careerModel";
import type { CareerContent } from "@/lib/careers";
import type { Lang } from "@/lib/i18n";

const font = "font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif]";

const copy = {
  en: {
    current: "Career",
    heroTitle: "Don't stop your\nknowledge investment",
    heroDesc:
      "Several positions are open in Business Process and Resources Planning. Join the world-class SAP consultants through the following opportunities.",
    openEyebrow: "OPEN POSITIONS",
    whyEyebrow: "WHY PST",
    whyTitle: "Grow with a learning organization",
    whyDesc:
      "We take our employees' development seriously. You will work in a dynamic environment where you can grow both professionally and personally, and learning will always be part of your job.",
    advantages: [
      "Total IT solution",
      "Learning organization",
      "Flexible",
      "Think global, act local",
      "Young and energetic consultants",
    ],
    pathTitle: "Your career path as an SAP consultant",
    careerPath: ["Trainee", "Junior Consultant", "Associate Consultant", "Senior Consultant", "Project Manager"],
    jobsEyebrow: "OPEN POSITIONS",
    jobsTitle: "Current opportunities",
    jobsDesc: "Fresh graduates are welcome. All roles require the willingness to be assigned to any project location.",
    reflectLabel: "Before your interview, reflect on:",
    applyNow: "Apply now",
    responsibilities: "RESPONSIBILITIES",
    qualifications: "QUALIFICATIONS",
    freshGrad: "Fresh graduates welcome",
    noOpenings: "There are no open positions right now. You can still send your CV to recruitment@pst.co.id.",
    faqEyebrow: "FAQ",
    faqTitle: "Frequently asked questions",
    faqDesc: "Still curious? Email recruitment@pst.co.id.",
    ctaTitle: "Ready to join our team?",
    ctaDesc: "Send your CV to recruitment@pst.co.id and start your career as an SAP consultant.",
    ctaLabel: "Send your CV",
  },
  id: {
    current: "Karier",
    heroTitle: "Jangan berhenti\nberinvestasi pada ilmu",
    heroDesc:
      "Beberapa posisi terbuka di bidang Business Process dan Resources Planning. Bergabunglah dengan konsultan SAP kelas dunia melalui kesempatan berikut.",
    openEyebrow: "POSISI TERBUKA",
    whyEyebrow: "MENGAPA PST",
    whyTitle: "Bertumbuh di organisasi pembelajar",
    whyDesc:
      "Kami serius mengembangkan karyawan kami. Anda akan bekerja di lingkungan dinamis tempat Anda dapat bertumbuh secara profesional maupun pribadi, dan belajar akan selalu menjadi bagian dari pekerjaan Anda.",
    advantages: [
      "Solusi TI menyeluruh",
      "Organisasi pembelajar",
      "Fleksibel",
      "Berpikir global, bertindak lokal",
      "Konsultan muda dan energik",
    ],
    pathTitle: "Jenjang karier Anda sebagai konsultan SAP",
    careerPath: ["Trainee", "Junior Consultant", "Associate Consultant", "Senior Consultant", "Project Manager"],
    jobsEyebrow: "POSISI TERBUKA",
    jobsTitle: "Lowongan saat ini",
    jobsDesc:
      "Lulusan baru dipersilakan. Semua posisi mensyaratkan kesediaan ditempatkan di lokasi proyek mana pun.",
    reflectLabel: "Sebelum wawancara, renungkan:",
    applyNow: "Lamar sekarang",
    responsibilities: "TANGGUNG JAWAB",
    qualifications: "KUALIFIKASI",
    freshGrad: "Lulusan baru dipersilakan",
    noOpenings: "Saat ini belum ada lowongan terbuka. Anda tetap dapat mengirim CV ke recruitment@pst.co.id.",
    faqEyebrow: "FAQ",
    faqTitle: "Pertanyaan yang sering diajukan",
    faqDesc: "Masih penasaran? Kirim email ke recruitment@pst.co.id.",
    ctaTitle: "Siap bergabung dengan tim kami?",
    ctaDesc: "Kirim CV Anda ke recruitment@pst.co.id dan mulai karier Anda sebagai konsultan SAP.",
    ctaLabel: "Kirim CV Anda",
  },
};

const advantageIcons: LucideIcon[] = [Layers, GraduationCap, Shuffle, Globe, Zap];
const categoryIcons: Record<string, LucideIcon> = { functional: BriefcaseBusiness, technical: Server, abaper: Code };
const categoryId: Record<string, string> = { FUNCTIONAL: "FUNGSIONAL", TECHNICAL: "TEKNIS" };

function Eyebrow({ children }: { children: string }) {
  return <div className={`text-[12px]/[15px] text-[#2F6E80] ${font} font-medium tracking-[1.2px]`}>{children}</div>;
}

// Indonesian fields left empty in the Sheet fall back to the English text
function localJob(p: CareerPosition, lang: Lang) {
  const id = lang === "id";
  const category = p.category.toUpperCase();
  return {
    anchor: `job-${p.id}`,
    Icon: categoryIcons[p.category.toLowerCase()] ?? BriefcaseBusiness,
    category: id ? (categoryId[category] ?? category) : category,
    title: (id && p.titleId) || p.title,
    responsibilities: id && p.responsibilitiesId.length ? p.responsibilitiesId : p.responsibilities,
    qualifications: id && p.qualificationsId.length ? p.qualificationsId : p.qualifications,
    note: (id && p.noteId) || p.note,
    applyEmail: p.applyEmail || defaultApplyEmail,
  };
}

export function CareerView({ positions, faqs }: CareerContent) {
  const { lang } = useLanguage();
  const c = copy[lang];
  const jobs = positions.map((p) => ({ ...localJob(p, lang), level: /fresh grad/i.test(p.type) ? c.freshGrad : p.type }));
  const questions = faqs.map((f) => ({
    id: f.id,
    question: (lang === "id" && f.questionId) || f.question,
    answer: (lang === "id" && f.answerId) || f.answer,
  }));

  return (
    <main className="w-full overflow-x-hidden">
      <PageHero
        current={c.current}
        title={c.heroTitle}
        description={c.heroDesc}
        aside={
          jobs.length > 0 && (
            <div className="box-border w-full max-w-[380px] h-fit flex flex-col gap-[16px] p-[28px] bg-[#FFFFFF0F] [outline:1px_solid_#FFFFFF26] [outline-offset:-0.5px] rounded-[12px]">
              <div className={`text-[12px]/[15px] text-[#A6CBD3] ${font} font-medium tracking-[1.2px]`}>{c.openEyebrow}</div>
              {jobs.map((job) => (
                <a key={job.anchor} href={`#${job.anchor}`} className="group box-border w-full h-fit flex flex-col gap-[4px] pt-[12px] [border-width:1px_0px_0px_0px] [border-style:solid] [border-color:#FFFFFF1F]">
                  <span className={`text-[11px]/[14px] text-[#FFFFFF99] ${font} font-medium tracking-[1.1px]`}>{job.category}</span>
                  <span className={`text-[15px]/[20px] text-[#FFFFFF] group-hover:text-[#A6CBD3] transition-colors ${font} font-medium`}>{job.title}</span>
                </a>
              ))}
            </div>
          )
        }
      />

      <section className="box-border w-full h-fit flex flex-col gap-[64px] p-[112px_96px] justify-start items-start max-lg:p-[60px_20px] max-lg:gap-[32px]">
        <div className="box-border w-full h-fit flex flex-col gap-[48px] justify-start items-start">
          <div className="box-border w-full max-w-[720px] h-fit flex flex-col gap-[20px]">
            <Eyebrow>{c.whyEyebrow}</Eyebrow>
            <div className={`text-[48px]/[53px] text-[#000000] ${font} font-medium max-lg:text-[36px]/[40px]`}>{c.whyTitle}</div>
            <div className={`text-[18px]/[27px] text-[#354A5F] ${font}`}>{c.whyDesc}</div>
          </div>
          <div className="box-border w-full h-fit grid grid-cols-5 gap-[20px] max-lg:grid-cols-1">
            {c.advantages.map((title, index) => {
              const Icon = advantageIcons[index];
              return (
                <div key={title} className="box-border w-full h-[140px] flex flex-col gap-[20px] p-[24px] bg-[#EAF3F5] rounded-[12px] max-lg:h-auto">
                  <div className="box-border w-[48px] h-[48px] shrink-0 flex items-center justify-center bg-[#FFFFFF] rounded-[8px]">
                    <Icon size={24} className="text-[#2F6E80]" />
                  </div>
                  <div className={`text-[18px]/[22px] text-[#000354] ${font} font-medium`}>{title}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="box-border w-full h-fit flex flex-col gap-[32px] pt-[48px] [border-width:1px_0px_0px_0px] [border-style:solid] [border-color:#D5DADD] justify-start items-start">
          <div className={`text-[20px]/[26px] text-[#000000] ${font} font-medium`}>{c.pathTitle}</div>
          <div className="box-border w-full h-fit flex flex-row max-lg:flex-col">
            {c.careerPath.map((step, index) => {
              const last = index === c.careerPath.length - 1;
              return (
                <div key={step} className={`box-border h-fit flex flex-col gap-[12px] ${last ? "w-fit shrink-0" : "[flex:1_1_0] min-w-0"}`}>
                  <div className="box-border w-full h-[36px] flex flex-row items-center">
                    <div className={`box-border w-[36px] h-[36px] shrink-0 rounded-[999px] [border-width:2px] [border-style:solid] [border-color:#000354] ${last ? "bg-[#000354]" : "bg-[#FFFFFF]"}`} />
                    {!last && <div className="box-border [flex:1_1_0] h-[2px] bg-[#A6CBD3]" />}
                  </div>
                  <div className={`text-[16px]/[21px] text-[#000000] ${font} font-medium`}>{step}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="box-border w-full h-fit flex flex-col gap-[56px] p-[112px_96px] justify-start items-start bg-[#F5F6F7] max-lg:p-[60px_20px]">
        <div className="box-border w-full h-fit flex flex-col gap-[16px]">
          <Eyebrow>{c.jobsEyebrow}</Eyebrow>
          <div className={`text-[48px]/[53px] text-[#000000] ${font} font-medium max-lg:text-[36px]/[40px]`}>{c.jobsTitle}</div>
          <div className={`text-[18px]/[27px] max-w-[640px] text-[#354A5F] ${font}`}>{c.jobsDesc}</div>
        </div>
        {jobs.length === 0 && (
          <div className={`box-border w-full p-[36px] bg-[#FFFFFF] [border-width:1px] [border-style:solid] [border-color:#D5DADD] rounded-[12px] text-[16px]/[24px] text-[#354A5F] ${font}`}>
            {c.noOpenings}
          </div>
        )}
        {jobs.map((job) => {
          const Icon = job.Icon;
          return (
            <article key={job.anchor} id={job.anchor} className="scroll-mt-[96px] box-border w-full h-fit flex flex-row flex-wrap gap-[48px] p-[36px] justify-start items-start bg-[#FFFFFF] [border-width:1px] [border-style:solid] [border-color:#D5DADD] rounded-[12px]">
              <div className="box-border w-[340px] max-w-full shrink-0 h-fit flex flex-col gap-[16px]">
                <div className="box-border w-[48px] h-[48px] flex items-center justify-center bg-[#EAF3F5] rounded-[8px]">
                  <Icon size={24} className="text-[#2F6E80]" />
                </div>
                <div className={`text-[12px]/[15px] text-[#2F6E80] ${font} font-medium tracking-[1.2px]`}>{job.category}</div>
                <div className={`text-[24px]/[29px] text-[#000000] ${font} font-medium`}>{job.title}</div>
                <div className="box-border w-fit h-fit flex flex-row gap-[8px]">
                  <span className={`box-border w-fit h-[26px] p-[4px_10px] flex items-center bg-[#F5F6F7] [border-width:1px] [border-style:solid] [border-color:#D5DADD] rounded-[999px] text-[12px]/[16px] text-[#354A5F] ${font} font-medium`}>{job.level}</span>
                </div>
                {job.note && (
                  <div className="box-border w-full h-fit flex flex-col gap-[8px] p-[16px_18px] bg-[#EAF3F5] rounded-[8px]">
                    <div className={`text-[13px]/[17px] text-[#000354] ${font} font-medium`}>{c.reflectLabel}</div>
                    <div className={`text-[13px]/[20px] text-[#354A5F] whitespace-pre-line ${font}`}>{job.note}</div>
                  </div>
                )}
                <a href={`mailto:${job.applyEmail}`} className={`box-border w-fit h-[44px] flex items-center p-[0px_20px] bg-[#000354] hover:bg-[#0B1470] rounded-[8px] text-[16px]/[20px] text-[#FFFFFF] ${font} font-medium`}>
                  {c.applyNow}
                </a>
              </div>
              <div className="box-border [flex:1_1_0] min-w-[300px] h-fit grid grid-cols-2 gap-[32px] max-lg:grid-cols-1">
                <div className="box-border w-full h-fit flex flex-col gap-[12px]">
                  <div className={`text-[12px]/[16px] text-[#475E75] ${font} font-medium tracking-[1.2px]`}>{c.responsibilities}</div>
                  {job.responsibilities.map((item) => (
                    <div key={item} className={`flex flex-row gap-[10px] items-start text-[15px]/[24px] text-[#354A5F] ${font}`}>
                      <Check size={16} className="text-[#2F6E80] mt-[4px] shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
                <div className="box-border w-full h-fit flex flex-col gap-[12px]">
                  <div className={`text-[12px]/[16px] text-[#475E75] ${font} font-medium tracking-[1.2px]`}>{c.qualifications}</div>
                  {job.qualifications.map((item) => (
                    <div key={item} className={`flex flex-row gap-[10px] items-start text-[15px]/[24px] text-[#354A5F] ${font}`}>
                      <Check size={16} className="text-[#2F6E80] mt-[4px] shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <section className="box-border w-full h-fit flex flex-row flex-wrap gap-[80px] p-[112px_96px] justify-start items-start max-lg:p-[60px_20px] max-lg:gap-[32px]">
        <div className="box-border [flex:1_1_0] min-w-[300px] max-w-[380px] h-fit flex flex-col gap-[16px]">
          <Eyebrow>{c.faqEyebrow}</Eyebrow>
          <div className={`text-[44px]/[48px] text-[#000000] ${font} font-medium max-lg:text-[34px]/[38px]`}>{c.faqTitle}</div>
          <div className={`text-[16px]/[24px] text-[#354A5F] ${font}`}>{c.faqDesc}</div>
        </div>
        <div className="box-border [flex:1_1_0] min-w-[300px] h-fit flex flex-col">
          {questions.map((faq, index) =>
            faq.answer ? (
              <details key={faq.id} open={index === 0} className="group box-border w-full p-[24px_0px] [border-width:0px_0px_1px_0px] [border-style:solid] [border-color:#D5DADD]">
                <summary className={`flex flex-row justify-between items-center cursor-pointer list-none text-[18px]/[24px] text-[#000000] hover:text-[#2F6E80] ${font} font-medium`}>
                  {faq.question}
                  <Plus size={20} className="text-[#000354] shrink-0 group-open:hidden" />
                  <Minus size={20} className="text-[#000354] shrink-0 hidden group-open:block" />
                </summary>
                <div className={`mt-[12px] text-[16px]/[26px] text-[#354A5F] whitespace-pre-line ${font}`}>{faq.answer}</div>
              </details>
            ) : (
              <div key={faq.id} className={`box-border w-full p-[24px_0px] flex flex-row justify-between items-center text-[18px]/[24px] text-[#000000] ${font} font-medium [border-width:0px_0px_1px_0px] [border-style:solid] [border-color:#D5DADD]`}>
                {faq.question}
                <Plus size={20} className="text-[#000354] shrink-0" />
              </div>
            ),
          )}
        </div>
      </section>

      <section className="box-border w-full h-fit p-[0px_96px_120px_96px] max-lg:p-[0px_20px_60px_20px]">
        <CtaBanner title={c.ctaTitle} description={c.ctaDesc} label={c.ctaLabel} href="mailto:recruitment@pst.co.id" />
      </section>

      <Footer />
      <FloatingContact />
    </main>
  );
}
