import type { SheetRecord } from "@/lib/sheetStore";

// Client data shapes shared by the admin forms (browser) and the server code
// in clients.ts. Nothing here may touch the server.

export const clientsTab = "Clients";

// The tab started with just "name" and "logo"; the other columns are added
// the first time the admin saves a client.
export const clientColumns = [
  "order",
  "status",
  "name",
  "industry",
  "website",
  "description",
  "logo",
  "homepage_strip",
  "services_page",
  "contact_name",
  "contact_email",
  "contact_phone",
  "updated_at",
];

export const otherIndustry = "Other Industries";

// The Services page groups clients by industry. Industries live in their own
// tab next to Clients; a client's "industry" cell holds the English name so
// staff can read and type it in the Sheet. Renaming an industry in the admin
// renames it on every client too.
export const industriesTab = "Industries";
export const industryColumns = ["order", "name", "name_id", "short", "short_id", "icon", "updated_at"];

// Icon keys staff can pick; the public page and admin map them to drawings
export const industryIconKeys = [
  "factory",
  "ship",
  "pickaxe",
  "landmark",
  "basket",
  "grid",
  "truck",
  "zap",
  "building",
  "health",
  "education",
  "cpu",
  "plane",
  "utensils",
  "sprout",
  "shopping",
] as const;
export type IndustryIcon = (typeof industryIconKeys)[number];

export type Industry = {
  id: string;
  order: number;
  name: string;
  nameId: string;
  short: string;
  shortId: string;
  icon: IndustryIcon;
  updatedAt: string;
};

const toIcon = (value = ""): IndustryIcon => {
  const key = value.trim().toLowerCase();
  return (industryIconKeys as readonly string[]).includes(key) ? (key as IndustryIcon) : "grid";
};

export function toIndustry(r: SheetRecord): Industry {
  return {
    id: r.id,
    order: toOrder(r.order),
    name: (r.name ?? "").trim(),
    nameId: r.name_id ?? "",
    short: r.short ?? "",
    shortId: r.short_id ?? "",
    icon: toIcon(r.icon),
    updatedAt: r.updated_at ?? "",
  };
}

export function industryValues(i: Omit<Industry, "id">): Record<string, string> {
  return {
    order: String(i.order),
    name: i.name,
    name_id: i.nameId,
    short: i.short,
    short_id: i.shortId,
    icon: i.icon,
    updated_at: i.updatedAt,
  };
}

// Labels in the visitor's language; empty Indonesian or short names fall back
export const industryLabel = (i: Industry, lang: string) => (lang === "id" && i.nameId) || i.name;
export const industryShortLabel = (i: Industry, lang: string) =>
  (lang === "id" ? i.shortId || i.nameId : i.short) || i.short || i.name;

const industrySeed = (order: number, name: string, nameId: string, short: string, shortId: string, icon: IndustryIcon): Industry => ({
  id: `seed-industry-${order}`,
  order,
  name,
  nameId,
  short,
  shortId,
  icon,
  updatedAt: "",
});

// The industries the site showed before they moved to the Sheet
export const fallbackIndustries: Industry[] = [
  industrySeed(1, "Heavy Equipment & Manufacturing", "Alat Berat & Manufaktur", "Heavy Equipment", "Alat Berat", "factory"),
  industrySeed(2, "Maritime & Transportation", "Maritim & Transportasi", "Maritime", "Maritim", "ship"),
  industrySeed(3, "Mining, Energy & Construction", "Pertambangan, Energi & Konstruksi", "Mining", "Pertambangan", "pickaxe"),
  industrySeed(4, "Finance, Technology & Education", "Keuangan, Teknologi & Pendidikan", "Finance", "Keuangan", "landmark"),
  industrySeed(5, "Consumer Goods", "Barang Konsumsi", "Consumer Goods", "Barang Konsumsi", "basket"),
  industrySeed(6, otherIndustry, "Industri Lainnya", "Other Industries", "Industri Lainnya", "grid"),
];

export type Client = {
  id: string;
  order: number;
  active: boolean;
  name: string;
  industry: string;
  website: string;
  description: string;
  logo: string;
  homepageStrip: boolean;
  servicesPage: boolean;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  updatedAt: string;
};

// The public pages only need these; contact details stay on the server
export type PublicClient = Pick<Client, "id" | "name" | "industry" | "logo" | "website" | "homepageStrip" | "servicesPage">;

const toOrder = (value = "") => {
  const n = Number.parseFloat(value);
  return Number.isFinite(n) ? n : 999;
};

// Empty means yes, so rows from the original two-column tab keep showing
const yes = (value = "") => !/^(no|false|0|hidden)$/i.test(value.trim());

export function toClient(r: SheetRecord): Client {
  return {
    id: r.id,
    order: toOrder(r.order),
    active: (r.status ?? "").toLowerCase() !== "hidden",
    name: r.name ?? "",
    industry: r.industry || otherIndustry,
    website: r.website ?? "",
    description: r.description ?? "",
    logo: r.logo ?? "",
    homepageStrip: yes(r.homepage_strip),
    servicesPage: yes(r.services_page),
    contactName: r.contact_name ?? "",
    contactEmail: r.contact_email ?? "",
    contactPhone: r.contact_phone ?? "",
    updatedAt: r.updated_at ?? "",
  };
}

export function clientValues(c: Omit<Client, "id">): Record<string, string> {
  return {
    order: String(c.order),
    status: c.active ? "Active" : "Hidden",
    name: c.name,
    industry: c.industry,
    website: c.website,
    description: c.description,
    logo: c.logo,
    homepage_strip: c.homepageStrip ? "Yes" : "No",
    services_page: c.servicesPage ? "Yes" : "No",
    contact_name: c.contactName,
    contact_email: c.contactEmail,
    contact_phone: c.contactPhone,
    updated_at: c.updatedAt,
  };
}

const seed = (order: number, name: string, slug: string, industry: string): Client => ({
  id: `seed-${order}`,
  order,
  active: true,
  name,
  industry,
  website: "",
  description: "",
  logo: `/images/pst/clients/${slug}.png`,
  homepageStrip: true,
  servicesPage: true,
  contactName: "",
  contactEmail: "",
  contactPhone: "",
  updatedAt: "",
});

// The clients the site showed before moving to the Sheet. Names for the last
// eight weren't recorded anywhere, so they start as short labels to fix after import.
export const fallbackClients: Client[] = [
  seed(1, "PT United Tractors Pandu Engineering", "utpe", "Heavy Equipment & Manufacturing"),
  seed(2, "PT Komatsu Undercarriage Indonesia", "komatsu-undercarriage", "Heavy Equipment & Manufacturing"),
  seed(3, "PT Komatsu Reman Indonesia", "reman", "Heavy Equipment & Manufacturing"),
  seed(4, "PT Dharma Polimetal Tbk", "dharma-polimetal", "Heavy Equipment & Manufacturing"),
  seed(5, "PT Triatra Sinergia Pratama", "triatra", "Heavy Equipment & Manufacturing"),
  seed(6, "PT Patria Maritime Lines", "pml", "Maritime & Transportation"),
  seed(7, "PT Patria Maritim Perkasa", "pmp", "Maritime & Transportation"),
  seed(8, "PT Kereta Cepat Indonesia China", "kcic", "Maritime & Transportation"),
  seed(9, "Ithaca Resources", "ithaca", "Mining, Energy & Construction"),
  seed(10, "NusaCipta Construction", "nusacipta", "Mining, Energy & Construction"),
  seed(11, "Jalin", "jalin", "Finance, Technology & Education"),
  seed(12, "Wipro", "wipro", "Finance, Technology & Education"),
  seed(13, "Edugate", "edugate", "Finance, Technology & Education"),
  seed(14, "Nabati", "nabati", "Consumer Goods"),
  seed(15, "Canopus", "canopus", "Other Industries"),
  seed(16, "BSM", "bsm", "Other Industries"),
  seed(17, "LG", "lg", "Other Industries"),
  seed(18, "Monogram", "monogram", "Other Industries"),
];
