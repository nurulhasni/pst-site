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
    title: "ABAP & SAP Fiori Developer",
    titleId: "",
    responsibilities: [
      "Analyze and design application requirements and specifications",
      "Develop, build, enhance and modify ABAP programs",
      "Build and enhance SAP Fiori apps (SAPUI5 and OData services)",
      "Support running applications / programs",
      "Create and maintain application / program documentation",
    ],
    responsibilitiesId: [
      "Menganalisis dan merancang kebutuhan serta spesifikasi aplikasi",
      "Mengembangkan, membangun, menyempurnakan, dan memodifikasi program ABAP",
      "Membangun dan menyempurnakan aplikasi SAP Fiori (SAPUI5 dan layanan OData)",
      "Mendukung aplikasi / program yang berjalan",
      "Membuat dan memelihara dokumentasi aplikasi / program",
    ],
    qualifications: [
      "Interested in programming",
      "Minimum D3 in Computer Science, IT, Information Systems, Computer Engineering, Mathematics & Natural Science (MIPA) or equivalent (min. GPA 3.20)",
      "Good analytical and structural thinking (logic)",
      "Excellent query and database skills; any programming language is an advantage",
      "Knowledge of JavaScript, HTML or SAPUI5 is an advantage for the Fiori track",
      "Strong motivation, initiative, discipline and commitment",
      "Willing to be assigned to any project location",
    ],
    qualificationsId: [
      "Tertarik pada pemrograman",
      "Minimal D3 Ilmu Komputer, TI, Sistem Informasi, Teknik Komputer, MIPA atau setara (IPK min. 3,20)",
      "Kemampuan berpikir analitis dan terstruktur (logika) yang baik",
      "Mahir query dan database; menguasai bahasa pemrograman apa pun menjadi nilai tambah",
      "Menguasai JavaScript, HTML, atau SAPUI5 menjadi nilai tambah untuk jalur Fiori",
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
      "You study SAP functions largely on your own, implement SAP at client sites to match their business processes, train the client's users, and work as a team to tight deadlines. Learning new things is part of the job.",
    questionId: "Apa yang dikerjakan konsultan SAP?",
    answerId:
      "Anda mempelajari fungsi SAP sebagian besar secara mandiri, mengimplementasikan SAP di lokasi klien sesuai proses bisnisnya, melatih pengguna di sisi klien, dan bekerja dalam tim dengan tenggat yang ketat. Mempelajari hal baru adalah bagian dari pekerjaan ini.",
    updatedAt: "",
  },
  {
    id: "seed-2",
    order: 2,
    published: true,
    question: "Do I need SAP experience?",
    answer:
      "No. Fresh graduates are welcome. You learn SAP through our internal curriculum and regular reviews, then apply it on real client projects.",
    questionId: "Apakah saya perlu pengalaman SAP?",
    answerId:
      "Tidak. Fresh graduate juga bisa melamar. Anda mempelajari SAP melalui kurikulum internal dan evaluasi berkala, lalu menerapkannya di proyek klien yang nyata.",
    updatedAt: "",
  },
  {
    id: "seed-3",
    order: 3,
    published: true,
    question: "What is the work environment like?",
    answer:
      "You get room to learn SAP on your own, following the company's curriculum, and you can share ideas with colleagues working in the same field. Regular reviews show how far you have mastered your SAP module.",
    questionId: "Bagaimana lingkungan kerjanya?",
    answerId:
      "Anda diberi ruang untuk mempelajari SAP secara mandiri mengikuti kurikulum perusahaan, dan dapat bertukar ide dengan rekan di bidang yang sama. Evaluasi berkala menunjukkan sejauh mana Anda menguasai modul SAP Anda.",
    updatedAt: "",
  },
  {
    id: "seed-4",
    order: 4,
    published: true,
    question: "How does project work run?",
    answer:
      "During a project you are placed at the client's location, anywhere in Indonesia. A project team has 10 to 30 people depending on the scope, and a placement lasts 4 to 9 months. The company pays all transport and accommodation while you are on the project. Between projects you work from our office in Kemayoran, Central Jakarta.",
    questionId: "Bagaimana sistem kerja di proyek?",
    answerId:
      "Selama proyek, Anda ditempatkan di lokasi klien di seluruh Indonesia. Satu tim proyek berisi 10 sampai 30 orang tergantung lingkupnya, dan masa penempatan 4 sampai 9 bulan. Seluruh biaya transportasi dan akomodasi selama proyek ditanggung perusahaan. Di antara proyek, Anda bekerja dari kantor kami di Kemayoran, Jakarta Pusat.",
    updatedAt: "",
  },
];
