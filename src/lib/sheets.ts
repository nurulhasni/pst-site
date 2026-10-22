import { createSign } from "node:crypto";
import { cacheLife } from "next/cache";

export type Insight = {
  category: string;
  title: string;
  excerpt: string;
  image: string;
  url: string;
};

const fallbackInsights: Insight[] = [
  {
    category: "SAP",
    title: "5 reasons to migrate to SAP S/4HANA in 2025",
    excerpt:
      "Why leading enterprises are accelerating their S/4HANA migration — and how to prepare your organization.",
    image:
      "https://images.unsplash.com/photo-1785682117028-6fcf2c0b515b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    url: "/blog/why-sap-s4hana-matters-for-modern-enterprises",
  },
  {
    category: "STRATEGY",
    title: "A digital transformation roadmap for Indonesian enterprises",
    excerpt:
      "A practical guide to building a transformation strategy tailored to the Indonesian market.",
    image:
      "https://images.unsplash.com/photo-1751953813464-06a989a71c3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    url: "/blog/digital-transformation-trends-this-year",
  },
  {
    category: "TECHNOLOGY",
    title: "Cloud ERP vs on-premise: making the right choice",
    excerpt:
      "The key considerations for choosing between cloud and on-premise ERP deployments.",
    image:
      "https://images.unsplash.com/photo-1746014601017-4e515ef51722?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    url: "/blog/the-future-of-cloud-erp-solutions",
  },
];

async function readTab(tab: string): Promise<Record<string, string>[] | null> {
  const id = process.env.GOOGLE_SHEET_ID;
  const key = process.env.GOOGLE_API_KEY;
  if (!id || !key) return null;

  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${id}/values/${encodeURIComponent(tab)}?key=${key}`,
  );
  if (!res.ok) return null;

  const { values } = (await res.json()) as { values?: string[][] };
  if (!values || values.length < 2) return null;

  const [header, ...rows] = values;
  const keys = header.map((h) => h.trim().toLowerCase());
  return rows.map((row) =>
    Object.fromEntries(keys.map((k, i) => [k, row[i] ?? ""])),
  );
}

export type Client = { name: string; logo: string };

const fallbackClients: Client[][] = [
  [
    "utpe",
    "komatsu-undercarriage",
    "reman",
    "dharma-polimetal",
    "triatra",
    "pml",
    "pmp",
    "kcic",
    "ithaca",
  ],
  [
    "nusacipta",
    "jalin",
    "wipro",
    "edugate",
    "nabati",
    "canopus",
    "bsm",
    "lg",
    "monogram",
  ],
].map((row) =>
  row.map((slug) => ({ name: slug, logo: `/images/pst/clients/${slug}.png` })),
);

export type Service = {
  title: string;
  description: string;
  icon: string;
  url: string;
};

const fallbackServices: Service[] = [
  {
    title: "SAP Solution",
    description:
      "ERP implementation is more than just an implementation of software or automation of the current business processes.",
    icon: "layers",
    url: "/service-detail#sap-solution",
  },
  {
    title: "SAP Support & Outsourcing",
    description:
      "An authorised SAP Value Added Reseller (VAR), awarded the “Partner Center of Expertise” certification for SAP VAR-Delivered Support.",
    icon: "headset",
    url: "/service-detail#sap-support",
  },
  {
    title: "Business Process Reengineering",
    description:
      "The fast growth of technology has changed the face of the world, forcing business players to redefine the way they run their business.",
    icon: "workflow",
    url: "/service-detail#business-process",
  },
  {
    title: "Strategic Information Planning",
    description:
      "Confusion in setting the priority of business process initiatives derives from the complexity of the business processes themselves.",
    icon: "compass",
    url: "/service-detail#strategic-planning",
  },
];

export type ImpactStat = { value: string; label: string; note: string };

const fallbackImpactStats: ImpactStat[] = [
  { value: "25+", label: "Years of experience", note: "Serving Indonesia since 1999" },
  { value: "15+", label: "Enterprise clients", note: "Indonesian enterprises" },
  { value: "300+", label: "Projects delivered", note: "Implementations & rollouts" },
];

export type CustomerStory = {
  title: string;
  meta: string;
  url: string;
  body?: string;
  quote?: string;
  quoteAuthor?: string;
};

export type FeaturedStory = {
  title: string;
  body: string;
  quote: string;
  quoteAuthor: string;
  company: string;
  companyMeta: string;
  url: string;
};

export type CustomerStories = {
  featured: FeaturedStory;
  stories: CustomerStory[];
};

const fallbackCustomerStories: CustomerStories = {
  featured: {
    title: "Transforming a manufacturer's supply chain with SAP S/4HANA",
    body: "A manufacturing company partnered with PST to move its entire supply chain onto SAP S/4HANA. Deep SAP expertise and a shared commitment to the outcome carried the team through every stage of its digital transformation.",
    quote:
      "“Their team's deep expertise and commitment to our success made all the difference.”",
    quoteAuthor: "Andi Wijaya · CIO, Manufacturing Corp",
    company: "Manufacturing Corp",
    companyMeta: "SAP S/4HANA · Supply chain",
    url: "#",
  },
  stories: [
    {
      title: "Turning an implementation into a strategic partnership",
      meta: "Retail · Finance transformation",
      url: "#",
      body: "[Placeholder] Narrative text for this story goes here.",
      quote: "“[Placeholder] Quote from the client goes here.”",
      quoteAuthor: "[Placeholder] Name · Role, Company",
    },
    {
      title: "Keeping energy operations running smoothly for years",
      meta: "Energy · Support & maintenance",
      url: "#",
    },
  ],
};

export async function getClientRows(): Promise<Client[][]> {
  "use cache";
  cacheLife("minutes");

  const rows = await readTab("Clients");
  if (!rows) return fallbackClients;

  const clients = rows
    .filter((r) => r.logo)
    .map((r) => ({ name: r.name, logo: r.logo }));
  const half = Math.ceil(clients.length / 2);
  return [clients.slice(0, half), clients.slice(half)].filter((r) => r.length);
}

export async function getInsights(): Promise<Insight[]> {
  "use cache";
  cacheLife("minutes");

  const rows = await readTab("Insights");
  if (!rows) return fallbackInsights;

  return rows
    .filter((r) => r.title && r.published?.toLowerCase() !== "false")
    .slice(0, 3)
    .map((r) => ({
      category: (r.category || "").toUpperCase(),
      title: r.title,
      excerpt: r.excerpt,
      image: r.image,
      url: r.url || "#",
    }));
}

export async function getServices(): Promise<Service[]> {
  "use cache";
  cacheLife("minutes");

  const rows = await readTab("Services");
  if (!rows) return fallbackServices;

  const services = rows
    .filter((r) => r.title)
    .map((r) => ({
      title: r.title,
      description: r.description,
      icon: r.icon || "layers",
      url: r.url || "#",
    }));
  return services.length ? services : fallbackServices;
}

export async function getImpactStats(): Promise<ImpactStat[]> {
  "use cache";
  cacheLife("minutes");

  const rows = await readTab("Impact Stats");
  if (!rows) return fallbackImpactStats;

  const stats = rows
    .filter((r) => r.value)
    .map((r) => ({ value: r.value, label: r.label, note: r.note }));
  return stats.length ? stats : fallbackImpactStats;
}

export async function getCustomerStories(): Promise<CustomerStories> {
  "use cache";
  cacheLife("minutes");

  const rows = await readTab("Customer Stories");
  if (!rows) return fallbackCustomerStories;

  const [first, ...rest] = rows.filter((r) => r.title);
  if (!first) return fallbackCustomerStories;

  return {
    featured: {
      title: first.title,
      body: first.body,
      quote: first.quote,
      quoteAuthor: first.quote_author,
      company: first.company,
      companyMeta: first.company_meta,
      url: first.url || "#",
    },
    stories: rest.map((r) => ({
      title: r.title,
      meta: r.meta,
      url: r.url || "#",
      body: r.body || undefined,
      quote: r.quote || undefined,
      quoteAuthor: r.quote_author || undefined,
    })),
  };
}

async function getAccessToken(): Promise<string> {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (!email || !key) {
    throw new Error("Google service account is not configured");
  }

  const now = Math.floor(Date.now() / 1000);
  const encode = (value: object) =>
    Buffer.from(JSON.stringify(value)).toString("base64url");
  const unsigned = `${encode({ alg: "RS256", typ: "JWT" })}.${encode({
    iss: email,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  })}`;
  const signature = createSign("RSA-SHA256").update(unsigned).sign(key, "base64url");

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${unsigned}.${signature}`,
    }),
  });
  if (!res.ok) throw new Error("Could not authenticate with Google");

  const { access_token } = (await res.json()) as { access_token: string };
  return access_token;
}

export async function appendRow(tab: string, row: string[]): Promise<void> {
  const id = process.env.GOOGLE_SHEET_ID;
  if (!id) throw new Error("GOOGLE_SHEET_ID is not configured");

  const token = await getAccessToken();
  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${id}/values/${encodeURIComponent(tab)}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ values: [row] }),
    },
  );
  if (!res.ok) throw new Error("Could not save to Google Sheets");
}
