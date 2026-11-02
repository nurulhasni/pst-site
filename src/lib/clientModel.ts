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

// The Services page groups clients by these; the key picks the translated name
export const industries = [
  { name: "Heavy Equipment & Manufacturing", key: "heavy" },
  { name: "Maritime & Transportation", key: "maritime" },
  { name: "Mining, Energy & Construction", key: "mining" },
  { name: "Finance, Technology & Education", key: "finance" },
  { name: "Consumer Goods", key: "consumer" },
  { name: "Other Industries", key: "other" },
];
export const otherIndustry = "Other Industries";

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
