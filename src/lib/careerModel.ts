import type { SheetRecord } from "@/lib/sheetStore";
export { jakartaToday } from "@/lib/dates";

// Career data shapes and conversions shared by the admin forms (browser) and
// the server code in careers.ts. Nothing here may touch the server.

export const positionsTab = "Careers";
export const faqTab = "Career FAQ";

// Column order used when the admin first creates a tab. Lists are stored one
// item per line inside a cell so they stay readable in the Sheet. Columns
// ending in _id hold the Indonesian text; empty ones fall back to English.
export const positionColumns = [
  "order",
  "status",
  "category",
  "type",
  "location",
  "title",
  "title_id",
  "responsibilities",
  "responsibilities_id",
  "qualifications",
  "qualifications_id",
  "note",
  "note_id",
  "apply_email",
  "closing_date",
  "updated_at",
];

export const faqColumns = ["order", "status", "question", "answer", "question_id", "answer_id", "updated_at"];

export const positionCategories = ["Functional", "Technical", "ABAPER"];
export const employmentTypes = ["Trainee", "Full-time", "Full-time · Fresh grad", "Contract"];
export const defaultApplyEmail = "recruitment@pst.co.id";

export type CareerPosition = {
  id: string;
  order: number;
  open: boolean;
  category: string;
  type: string;
  location: string;
  title: string;
  titleId: string;
  responsibilities: string[];
  responsibilitiesId: string[];
  qualifications: string[];
  qualificationsId: string[];
  note: string;
  noteId: string;
  applyEmail: string;
  closingDate: string;
  updatedAt: string;
};

export type CareerFaq = {
  id: string;
  order: number;
  published: boolean;
  question: string;
  answer: string;
  questionId: string;
  answerId: string;
  updatedAt: string;
};

const lines = (value = "") =>
  value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

const toOrder = (value = "") => {
  const n = Number.parseFloat(value);
  return Number.isFinite(n) ? n : 999;
};

export function toPosition(r: SheetRecord): CareerPosition {
  return {
    id: r.id,
    order: toOrder(r.order),
    // Anything other than "closed" counts as open, so a typo in the Sheet doesn't hide a job
    open: (r.status ?? "").toLowerCase() !== "closed",
    category: r.category ?? "",
    type: r.type ?? "",
    location: r.location ?? "",
    title: r.title ?? "",
    titleId: r.title_id ?? "",
    responsibilities: lines(r.responsibilities),
    responsibilitiesId: lines(r.responsibilities_id),
    qualifications: lines(r.qualifications),
    qualificationsId: lines(r.qualifications_id),
    note: r.note ?? "",
    noteId: r.note_id ?? "",
    applyEmail: r.apply_email ?? "",
    closingDate: r.closing_date ?? "",
    updatedAt: r.updated_at ?? "",
  };
}

export function positionValues(p: Omit<CareerPosition, "id">): Record<string, string> {
  return {
    order: String(p.order),
    status: p.open ? "Open" : "Closed",
    category: p.category,
    type: p.type,
    location: p.location,
    title: p.title,
    title_id: p.titleId,
    responsibilities: p.responsibilities.join("\n"),
    responsibilities_id: p.responsibilitiesId.join("\n"),
    qualifications: p.qualifications.join("\n"),
    qualifications_id: p.qualificationsId.join("\n"),
    note: p.note,
    note_id: p.noteId,
    apply_email: p.applyEmail,
    closing_date: p.closingDate,
    updated_at: p.updatedAt,
  };
}

export function toFaq(r: SheetRecord): CareerFaq {
  return {
    id: r.id,
    order: toOrder(r.order),
    published: (r.status ?? "").toLowerCase() !== "hidden",
    question: r.question ?? "",
    answer: r.answer ?? "",
    questionId: r.question_id ?? "",
    answerId: r.answer_id ?? "",
    updatedAt: r.updated_at ?? "",
  };
}

export function faqValues(f: Omit<CareerFaq, "id">): Record<string, string> {
  return {
    order: String(f.order),
    status: f.published ? "Published" : "Hidden",
    question: f.question,
    answer: f.answer,
    question_id: f.questionId,
    answer_id: f.answerId,
    updated_at: f.updatedAt,
  };
}

export const byOrder = <T extends { order: number }>(a: T, b: T) => a.order - b.order;

export function isListed(p: CareerPosition, today: string): boolean {
  return p.open && Boolean(p.title) && (!p.closingDate || p.closingDate >= today);
}

// The content the Career page showed before it moved to the Sheet. It stays
// on the site until the admin imports it, and seeds the tabs on import.
export const fallbackPositions: CareerPosition[] = [
  {
    id: "seed-1",
    order: 1,
    open: true,
    category: "Functional",
    type: "Trainee",
    location: "Kemayoran HQ · client sites",
    title: "Business Analyst (SAP S/4HANA) Consultant – Trainee",
    titleId: "",
    responsibilities: [
      "Business process mapping",
      "Realize and deploy it into the SAP system",
      "Deliver user training and support to clients",
    ],
    responsibilitiesId: [
      "Pemetaan proses bisnis",
      "Merealisasikan dan menerapkannya ke sistem SAP",
      "Memberikan pelatihan pengguna dan dukungan kepada klien",
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
    qualificationsId: [
      "Usia di bawah 28 tahun",
      "D3, D4, S1 atau lebih tinggi dengan IPK > 3,0",
      "Motivasi, inisiatif, disiplin, dan komitmen yang kuat",
      "Kemampuan analitis dan berpikir terstruktur yang baik",
      "Mampu bekerja dalam tim dengan tenggat waktu ketat",
      "Bersedia ditempatkan di lokasi proyek mana pun",
    ],
    note: "What is this profession? How will it impact my future? Would it be a good investment for me? How could I get this knowledge and skill? Why should I have it?",
    noteId:
      "Profesi apa ini? Bagaimana dampaknya bagi masa depan saya? Apakah ini investasi yang baik bagi saya? Bagaimana saya bisa memperoleh pengetahuan dan keterampilan ini? Mengapa saya perlu memilikinya?",
    applyEmail: defaultApplyEmail,
    closingDate: "",
    updatedAt: "",
  },
  {
    id: "seed-2",
    order: 2,
    open: true,
    category: "Technical",
    type: "Full-time · Fresh grad",
    location: "Kemayoran HQ · client sites",
    title: "System Engineer / Database Administrator",
    titleId: "",
    responsibilities: [
      "Install / upgrade / migrate application systems",
      "Tune and manage application performance",
      "Manage system network",
      "Master RDBMS and operating systems (Windows and Linux)",
    ],
    responsibilitiesId: [
      "Instalasi / upgrade / migrasi sistem aplikasi",
      "Menyetel dan mengelola performa aplikasi",
      "Mengelola jaringan sistem",
      "Menguasai RDBMS dan sistem operasi (Windows dan Linux)",
    ],
    qualifications: [
      "Minimum D3 in Computer Science, IT, Information Systems, Computer Engineering or equivalent (min. GPA 3.20)",
      "Knowledge of programming languages is an advantage",
      "Basic understanding of operating systems, RDBMS and networks",
      "Strong motivation, initiative, discipline and commitment",
      "Eager to learn new things; able to work in a team and independently",
      "Willing to be assigned to any project location",
    ],
    qualificationsId: [
      "Minimal D3 di bidang Ilmu Komputer, TI, Sistem Informasi, Teknik Komputer, atau setara (IPK min. 3,20)",
      "Menguasai bahasa pemrograman menjadi nilai tambah",
      "Pemahaman dasar sistem operasi, RDBMS, dan jaringan",
      "Antusias mempelajari hal baru; mampu bekerja dalam tim maupun mandiri",
      "Bersedia ditempatkan di lokasi proyek mana pun",
    ],
    note: "",
    noteId: "",
    applyEmail: defaultApplyEmail,
    closingDate: "",
    updatedAt: "",
  },
  {
    id: "seed-3",
    order: 3,
    open: true,
    category: "ABAPER",
    type: "Full-time · Fresh grad",
    location: "Kemayoran HQ · client sites",
    title: "Application Developer / Programmer",
    titleId: "",
    responsibilities: [
      "Analyze and design application requirements and specifications",
      "Develop, build, enhance and modify applications / programs",
      "Support running applications / programs",
      "Create and maintain application / program documentation",
    ],
    responsibilitiesId: [
      "Menganalisis dan merancang kebutuhan serta spesifikasi aplikasi",
      "Mengembangkan, membangun, menyempurnakan, dan memodifikasi aplikasi / program",
      "Mendukung aplikasi / program yang berjalan",
      "Membuat dan memelihara dokumentasi aplikasi / program",
    ],
    qualifications: [
      "Interested in programming",
      "Minimum D3 in Computer Science, IT, Information Systems, Computer Engineering, Mathematics & Natural Science (MIPA) or equivalent (min. GPA 3.20)",
      "Good analytical and structural thinking (logic)",
      "Excellent query and database skills; any programming language is an advantage",
      "Strong motivation, initiative, discipline and commitment",
      "Willing to be assigned to any project location",
    ],
    qualificationsId: [
      "Tertarik pada pemrograman",
      "Minimal D3 Ilmu Komputer, TI, Sistem Informasi, Teknik Komputer, MIPA atau setara (IPK min. 3,20)",
      "Kemampuan berpikir analitis dan terstruktur (logika) yang baik",
      "Mahir query dan database; menguasai bahasa pemrograman apa pun menjadi nilai tambah",
      "Motivasi, inisiatif, disiplin, dan komitmen yang kuat",
      "Bersedia ditempatkan di lokasi proyek mana pun",
    ],
    note: "",
    noteId: "",
    applyEmail: defaultApplyEmail,
    closingDate: "",
    updatedAt: "",
  },
];

export const fallbackFaqs: CareerFaq[] = [
  {
    id: "seed-1",
    order: 1,
    published: true,
    question: "What does an SAP consultant do?",
    answer:
      "Study and explore SAP functionalities with limited guidance, implement the SAP system at client sites according to their business process requirements, conduct SAP user training, work as a team on tight deadlines, and keep learning new things.",
    questionId: "Apa yang dikerjakan konsultan SAP?",
    answerId:
      "Mempelajari dan mengeksplorasi fungsi SAP dengan bimbingan terbatas, mengimplementasikan sistem SAP di lokasi klien sesuai kebutuhan proses bisnisnya, melakukan pelatihan pengguna SAP, bekerja dalam tim dengan tenggat ketat, dan terus mempelajari hal baru.",
    updatedAt: "",
  },
  {
    id: "seed-2",
    order: 2,
    published: true,
    question: "How is the work environment?",
    answer:
      "Our company always tries to build a conducive working environment to learn SAP independently aligns with the curriculum standards that have been implemented by the company. Employees can also share and exchange ideas about the SAP field. Reviews will be given periodically to assess the extent to which employees have mastered the given SAP module.",
    questionId: "Bagaimana lingkungan kerjanya?",
    answerId: "",
    updatedAt: "",
  },
  {
    id: "seed-3",
    order: 3,
    published: true,
    question: "How does the work system work?",
    answer:
      "Employees will be assigned and placed at client locations throughout Indonesia during the project. The number of employees that assigned can be between 10 and 30 people; depends on the scope of the project to be worked on. The duration of placement ranges from 4-9 months. All transportation and accommodation costs for employees while on the project will be paid by the company. When not assigned, employees can work in our office located in Kemayoran, Central Jakarta.",
    questionId: "Bagaimana sistem kerjanya?",
    answerId: "",
    updatedAt: "",
  },
  {
    id: "seed-4",
    order: 4,
    published: true,
    question: "What are PST's advantages among competitors?",
    answer: "Total IT Solution\nLearning Organization\nFlexible\nThink Global act Local\nYoung and Energetic Consultant",
    questionId: "Apa keunggulan PST dibanding kompetitor?",
    answerId: "",
    updatedAt: "",
  },
  {
    id: "seed-5",
    order: 5,
    published: true,
    question: "What is the career path of an SAP consultant?",
    answer: "Trainee\nJunior Consultant\nAssociate Consultant\nSenior Consultant\nProject Manager",
    questionId: "Bagaimana jenjang karier konsultan SAP?",
    answerId: "",
    updatedAt: "",
  },
];

