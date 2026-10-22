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

const font = "font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif]";

const copy = {
  en: {
    current: "Career",
    heroTitle: "Don't stop your\nknowledge investment",
    heroDesc:
      "Several positions are open in Business Process and Resources Planning. Join the world-class SAP consultants through the following opportunities.",
    openEyebrow: "OPEN POSITIONS",
    openings: [
      { category: "FUNCTIONAL", title: "Business Analyst (SAP S/4HANA) – Trainee" },
      { category: "TECHNICAL", title: "System Engineer / Database Administrator" },
      { category: "ABAPER", title: "Application Developer / Programmer" },
    ],
    whyEyebrow: "WHY PST",
    whyTitle: "Grow with a learning organization",
    whyDesc:
      "We take our employees' development seriously. You will work in a dynamic environment where you can grow both professionally and personally — learning will always be part of your job.",
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
    jobs: [
      {
        title: "Business Analyst (SAP S/4HANA) Consultant – Trainee",
        level: "Trainee",
        reflect:
          "What is this profession? How will it impact my future? Would it be a good investment for me? How could I get this knowledge and skill? Why should I have it?",
        responsibilities: [
          "Business process mapping",
          "Realize and deploy it into the SAP system",
          "Deliver user training and support to clients",
        ],
        qualifications: [
          "Age under 28 years old",
          "D3, D4, S1 or higher with GPA > 3.0",
          "Strong motivation, initiative, discipline and commitment",
          "Good command of Indonesian and English (reading is a must)",
          "Good analytical and structural thinking",
          "Able to work as a team with tight deadlines",
          "Willing to be assigned to any project location",
        ],
      },
      {
        title: "System Engineer / Database Administrator",
        level: "Fresh graduates welcome",
        responsibilities: [
          "Install / upgrade / migrate application systems",
          "Tune and manage application performance",
          "Manage system network",
          "Master RDBMS and operating systems (Windows and Linux)",
        ],
        qualifications: [
          "Minimum D3 in Computer Science, IT, Information Systems, Computer Engineering or equivalent (min. GPA 3.20)",
          "Knowledge of programming languages is an advantage",
          "Basic understanding of operating systems, RDBMS and networks",
          "Strong motivation, initiative, discipline and commitment",
          "Eager to learn new things; able to work in a team and independently",
          "Willing to be assigned to any project location",
        ],
      },
      {
        title: "Application Developer / Programmer",
        level: "Fresh graduates welcome",
        responsibilities: [
          "Analyze and design application requirements and specifications",
          "Develop, build, enhance and modify applications / programs",
          "Support running applications / programs",
          "Create and maintain application / program documentation",
        ],
        qualifications: [
          "Interested in programming",
          "Minimum D3 in Computer Science, IT, Information Systems, Computer Engineering, Mathematics & Natural Science (MIPA) or equivalent (min. GPA 3.20)",
          "Good analytical and structural thinking (logic)",
          "Excellent query and database skills; any programming language is an advantage",
          "Strong motivation, initiative, discipline and commitment",
          "Willing to be assigned to any project location",
        ],
      },
    ],
    faqEyebrow: "FAQ",
    faqTitle: "Frequently asked questions",
    faqDesc: "Still curious? Email recruitment@pst.co.id.",
    faqs: [
      {
        question: "What does an SAP consultant do?",
        answer:
          "Study and explore SAP functionalities with limited guidance, implement the SAP system at client sites according to their business process requirements, conduct SAP user training, work as a team on tight deadlines, and keep learning new things.",
      },
      {
        question: "How is the work environment?",
        answer:
          "Our company always tries to build a conducive working environment to learn SAP independently aligns with the curriculum standards that have been implemented by the company. Employees can also share and exchange ideas about the SAP field. Reviews will be given periodically to assess the extent to which employees have mastered the given SAP module.",
      },
      {
        question: "How does the work system work?",
        answer:
          "Employees will be assigned and placed at client locations throughout Indonesia during the project. The number of employees that assigned can be between 10 and 30 people; depends on the scope of the project to be worked on. The duration of placement ranges from 4-9 months. All transportation and accommodation costs for employees while on the project will be paid by the company. When not assigned, employees can work in our office located in Kemayoran, Central Jakarta.",
      },
      {
        question: "What are PST's advantages among competitors?",
        answer: "Total IT Solution\nLearning Organization\nFlexible\nThink Global act Local\nYoung and Energetic Consultant",
      },
      {
        question: "What is the career path of an SAP consultant?",
        answer: "Trainee\nJunior Consultant\nAssociate Consultant\nSenior Consultant\nProject Manager",
      },
    ],
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
    openings: [
      { category: "FUNGSIONAL", title: "Business Analyst (SAP S/4HANA) – Trainee" },
      { category: "TEKNIS", title: "System Engineer / Database Administrator" },
      { category: "ABAPER", title: "Application Developer / Programmer" },
    ],
    whyEyebrow: "MENGAPA PST",
    whyTitle: "Bertumbuh di organisasi pembelajar",
    whyDesc:
      "Kami serius mengembangkan karyawan kami. Anda akan bekerja di lingkungan dinamis tempat Anda dapat bertumbuh secara profesional maupun pribadi — belajar akan selalu menjadi bagian dari pekerjaan Anda.",
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
    jobs: [
      {
        title: "Business Analyst (SAP S/4HANA) Consultant – Trainee",
        level: "Trainee",
        reflect:
          "Profesi apa ini? Bagaimana dampaknya bagi masa depan saya? Apakah ini investasi yang baik bagi saya? Bagaimana saya bisa memperoleh pengetahuan dan keterampilan ini? Mengapa saya perlu memilikinya?",
        responsibilities: [
          "Pemetaan proses bisnis",
          "Merealisasikan dan menerapkannya ke sistem SAP",
          "Memberikan pelatihan pengguna dan dukungan kepada klien",
        ],
        qualifications: [
          "Usia di bawah 28 tahun",
          "D3, D4, S1 atau lebih tinggi dengan IPK > 3,0",
          "Motivasi, inisiatif, disiplin, dan komitmen yang kuat",
          "Kemampuan analitis dan berpikir terstruktur yang baik",
          "Mampu bekerja dalam tim dengan tenggat waktu ketat",
          "Bersedia ditempatkan di lokasi proyek mana pun",
        ],
      },
      {
        title: "System Engineer / Database Administrator",
        level: "Lulusan baru dipersilakan",
        responsibilities: [
          "Instalasi / upgrade / migrasi sistem aplikasi",
          "Menyetel dan mengelola performa aplikasi",
          "Mengelola jaringan sistem",
          "Menguasai RDBMS dan sistem operasi (Windows dan Linux)",
        ],
        qualifications: [
          "Minimal D3 di bidang Ilmu Komputer, TI, Sistem Informasi, Teknik Komputer, atau setara (IPK min. 3,20)",
          "Menguasai bahasa pemrograman menjadi nilai tambah",
          "Pemahaman dasar sistem operasi, RDBMS, dan jaringan",
          "Antusias mempelajari hal baru; mampu bekerja dalam tim maupun mandiri",
          "Bersedia ditempatkan di lokasi proyek mana pun",
        ],
      },
      {
        title: "Application Developer / Programmer",
        level: "Lulusan baru dipersilakan",
        responsibilities: [
          "Menganalisis dan merancang kebutuhan serta spesifikasi aplikasi",
          "Mengembangkan, membangun, menyempurnakan, dan memodifikasi aplikasi / program",
          "Mendukung aplikasi / program yang berjalan",
          "Membuat dan memelihara dokumentasi aplikasi / program",
        ],
        qualifications: [
          "Tertarik pada pemrograman",
          "Minimal D3 Ilmu Komputer, TI, Sistem Informasi, Teknik Komputer, MIPA atau setara (IPK min. 3,20)",
          "Kemampuan berpikir analitis dan terstruktur (logika) yang baik",
          "Mahir query dan database; menguasai bahasa pemrograman apa pun menjadi nilai tambah",
          "Motivasi, inisiatif, disiplin, dan komitmen yang kuat",
          "Bersedia ditempatkan di lokasi proyek mana pun",
        ],
      },
    ],
    faqEyebrow: "FAQ",
    faqTitle: "Pertanyaan yang sering diajukan",
    faqDesc: "Masih penasaran? Kirim email ke recruitment@pst.co.id.",
    faqs: [
      {
        question: "Apa yang dikerjakan konsultan SAP?",
        answer:
          "Mempelajari dan mengeksplorasi fungsi SAP dengan bimbingan terbatas, mengimplementasikan sistem SAP di lokasi klien sesuai kebutuhan proses bisnisnya, melakukan pelatihan pengguna SAP, bekerja dalam tim dengan tenggat ketat, dan terus mempelajari hal baru.",
      },
      { question: "Bagaimana lingkungan kerjanya?" },
      { question: "Bagaimana sistem kerjanya?" },
      { question: "Apa keunggulan PST dibanding kompetitor?" },
      { question: "Bagaimana jenjang karier konsultan SAP?" },
    ],
    ctaTitle: "Siap bergabung dengan tim kami?",
    ctaDesc: "Kirim CV Anda ke recruitment@pst.co.id dan mulai karier Anda sebagai konsultan SAP.",
    ctaLabel: "Kirim CV Anda",
  },
};

const jobIcons: LucideIcon[] = [BriefcaseBusiness, Server, Code];
const advantageIcons: LucideIcon[] = [Layers, GraduationCap, Shuffle, Globe, Zap];
const jobCategories = ["FUNCTIONAL", "TECHNICAL", "ABAPER"];

function Eyebrow({ children }: { children: string }) {
  return <div className={`text-[12px]/[15px] text-[#2F6E80] ${font} font-medium tracking-[1.2px]`}>{children}</div>;
}

export function CareerView() {
  const { lang } = useLanguage();
  const c = copy[lang];

  return (
    <main className="w-full overflow-x-hidden">
      <PageHero
        current={c.current}
        title={c.heroTitle}
        description={c.heroDesc}
        aside={
          <div className="box-border w-full max-w-[380px] h-fit flex flex-col gap-[16px] p-[28px] bg-[#FFFFFF0F] [outline:1px_solid_#FFFFFF26] [outline-offset:-0.5px] rounded-[12px]">
            <div className={`text-[12px]/[15px] text-[#A6CBD3] ${font} font-medium tracking-[1.2px]`}>{c.openEyebrow}</div>
            {c.openings.map((opening, index) => (
              <a key={opening.title} href={`#${jobCategories[index].toLowerCase()}`} className="group box-border w-full h-[50px] flex flex-col gap-[4px] pt-[12px] [border-width:1px_0px_0px_0px] [border-style:solid] [border-color:#FFFFFF1F]">
                <span className={`text-[11px]/[14px] text-[#FFFFFF99] ${font} font-medium tracking-[1.1px]`}>{opening.category}</span>
                <span className={`text-[15px]/[20px] text-[#FFFFFF] group-hover:text-[#A6CBD3] transition-colors ${font} font-medium`}>{opening.title}</span>
              </a>
            ))}
          </div>
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
        {c.jobs.map((job, index) => {
          const Icon = jobIcons[index];
          return (
            <article key={job.title} id={jobCategories[index].toLowerCase()} className="box-border w-full h-fit flex flex-row flex-wrap gap-[48px] p-[36px] justify-start items-start bg-[#FFFFFF] [border-width:1px] [border-style:solid] [border-color:#D5DADD] rounded-[12px]">
              <div className="box-border w-[340px] max-w-full shrink-0 h-fit flex flex-col gap-[16px]">
                <div className="box-border w-[48px] h-[48px] flex items-center justify-center bg-[#EAF3F5] rounded-[8px]">
                  <Icon size={24} className="text-[#2F6E80]" />
                </div>
                <div className={`text-[12px]/[15px] text-[#2F6E80] ${font} font-medium tracking-[1.2px]`}>{c.openings[index].category}</div>
                <div className={`text-[24px]/[29px] text-[#000000] ${font} font-medium`}>{job.title}</div>
                <div className="box-border w-fit h-fit flex flex-row gap-[8px]">
                  <span className={`box-border w-fit h-[26px] p-[4px_10px] flex items-center bg-[#F5F6F7] [border-width:1px] [border-style:solid] [border-color:#D5DADD] rounded-[999px] text-[12px]/[16px] text-[#354A5F] ${font} font-medium`}>{job.level}</span>
                </div>
                {job.reflect && (
                  <div className="box-border w-full h-fit flex flex-col gap-[8px] p-[16px_18px] bg-[#EAF3F5] rounded-[8px]">
                    <div className={`text-[13px]/[17px] text-[#000354] ${font} font-medium`}>{c.reflectLabel}</div>
                    <div className={`text-[13px]/[20px] text-[#354A5F] ${font}`}>{job.reflect}</div>
                  </div>
                )}
                <a href="mailto:recruitment@pst.co.id" className={`box-border w-fit h-[44px] flex items-center p-[0px_20px] bg-[#000354] hover:bg-[#0B1470] rounded-[8px] text-[16px]/[20px] text-[#FFFFFF] ${font} font-medium`}>
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
          {c.faqs.map((faq, index) =>
            faq.answer ? (
              <details key={faq.question} open={index === 0} className="group box-border w-full p-[24px_0px] [border-width:0px_0px_1px_0px] [border-style:solid] [border-color:#D5DADD]">
                <summary className={`flex flex-row justify-between items-center cursor-pointer list-none text-[18px]/[24px] text-[#000000] hover:text-[#2F6E80] ${font} font-medium`}>
                  {faq.question}
                  <Plus size={20} className="text-[#000354] shrink-0 group-open:hidden" />
                  <Minus size={20} className="text-[#000354] shrink-0 hidden group-open:block" />
                </summary>
                <div className={`mt-[12px] text-[16px]/[26px] text-[#354A5F] whitespace-pre-line ${font}`}>{faq.answer}</div>
              </details>
            ) : (
              <div key={faq.question} className={`box-border w-full p-[24px_0px] flex flex-row justify-between items-center text-[18px]/[24px] text-[#000000] ${font} font-medium [border-width:0px_0px_1px_0px] [border-style:solid] [border-color:#D5DADD]`}>
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
