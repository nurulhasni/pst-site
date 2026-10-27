import type { Lang } from "@/lib/i18n";

// Indonesian copy for the fallback content that comes from Google Sheets.
// Keys are the English strings the sheet (or its fallback) provides; anything
// not listed here stays as it was in the sheet.
const idCopy: Record<string, string> = {
  "SAP": "SAP",
  "STRATEGY": "STRATEGI",
  "TECHNOLOGY": "TEKNOLOGI",
  "5 reasons to migrate to SAP S/4HANA in 2025": "5 alasan migrasi ke SAP S/4HANA di 2025",
  "Why leading enterprises are accelerating their S/4HANA migration and how to prepare your organization.":
    "Mengapa perusahaan terkemuka mempercepat migrasi S/4HANA dan cara menyiapkan organisasi Anda.",
  // Older dashed wording, kept in case the live Google Sheet still uses it
  "Why leading enterprises are accelerating their S/4HANA migration — and how to prepare your organization.":
    "Mengapa perusahaan terkemuka mempercepat migrasi S/4HANA dan cara menyiapkan organisasi Anda.",
  "A digital transformation roadmap for Indonesian enterprises": "Peta jalan transformasi digital untuk perusahaan Indonesia",
  "A practical guide to building a transformation strategy tailored to the Indonesian market.":
    "Panduan praktis menyusun strategi transformasi yang disesuaikan dengan pasar Indonesia.",
  "Cloud ERP vs on-premise: making the right choice": "Cloud ERP vs on-premise: menentukan pilihan yang tepat",
  "The key considerations for choosing between cloud and on-premise ERP deployments.":
    "Pertimbangan utama dalam memilih antara penerapan ERP cloud dan on-premise.",
  "SAP Solution": "Solusi SAP",
  "ERP implementation is more than just an implementation of software or automation of the current business processes.":
    "Implementasi ERP lebih dari sekadar implementasi perangkat lunak atau otomatisasi proses bisnis yang ada.",
  "SAP Support & Outsourcing": "Dukungan & Outsourcing SAP",
  "An authorised SAP Value Added Reseller (VAR), awarded the “Partner Center of Expertise” certification for SAP VAR-Delivered Support.":
    "Value Added Reseller (VAR) resmi SAP, peraih sertifikasi “Partner Center of Expertise” untuk SAP VAR-Delivered Support.",
  "Business Process Reengineering": "Rekayasa Ulang Proses Bisnis",
  "The fast growth of technology has changed the face of the world, forcing business players to redefine the way they run their business.":
    "Pesatnya perkembangan teknologi telah mengubah wajah dunia, memaksa pelaku bisnis mendefinisikan ulang cara mereka menjalankan usaha.",
  "Strategic Information Planning": "Perencanaan Informasi Strategis",
  "Confusion in setting the priority of business process initiatives derives from the complexity of the business processes themselves.":
    "Kebingungan dalam menentukan prioritas inisiatif proses bisnis berasal dari kompleksitas proses bisnis itu sendiri.",
  "Years of experience": "Tahun pengalaman",
  "Serving Indonesia since 1999": "Melayani Indonesia sejak 1999",
  "Enterprise clients": "Klien korporasi",
  "Indonesian enterprises": "Perusahaan Indonesia",
  "Projects delivered": "Proyek terselesaikan",
  "Implementations & rollouts": "Implementasi & rollout",
  "Transforming a manufacturer's supply chain with SAP S/4HANA": "Mentransformasi rantai pasok produsen dengan SAP S/4HANA",
  "A manufacturing company partnered with PST to move its entire supply chain onto SAP S/4HANA. Deep SAP expertise and a shared commitment to the outcome carried the team through every stage of its digital transformation.":
    "Sebuah perusahaan manufaktur bermitra dengan PST untuk memindahkan seluruh rantai pasoknya ke SAP S/4HANA. Keahlian SAP yang mendalam dan komitmen bersama terhadap hasil membawa tim melewati setiap tahap transformasi digitalnya.",
  "“Their team's deep expertise and commitment to our success made all the difference.”":
    "“Keahlian mendalam dan komitmen tim mereka terhadap kesuksesan kami benar-benar membuat perbedaan.”",
  "SAP S/4HANA · Supply chain": "SAP S/4HANA · Rantai pasok",
  "Turning an implementation into a strategic partnership": "Mengubah implementasi menjadi kemitraan strategis",
  "Retail · Finance transformation": "Ritel · Transformasi keuangan",
  "Keeping energy operations running smoothly for years": "Menjaga operasional energi tetap lancar selama bertahun-tahun",
  "Energy · Support & maintenance": "Energi · Dukungan & pemeliharaan",
};

export function localize(text: string, lang: Lang): string {
  return lang === "id" ? idCopy[text] ?? text : text;
}
