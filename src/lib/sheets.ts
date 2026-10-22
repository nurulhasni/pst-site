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
    url: "#",
  },
  {
    category: "STRATEGY",
    title: "A digital transformation roadmap for Indonesian enterprises",
    excerpt:
      "A practical guide to building a transformation strategy tailored to the Indonesian market.",
    image:
      "https://images.unsplash.com/photo-1751953813464-06a989a71c3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    url: "#",
  },
  {
    category: "TECHNOLOGY",
    title: "Cloud ERP vs on-premise: making the right choice",
    excerpt:
      "The key considerations for choosing between cloud and on-premise ERP deployments.",
    image:
      "https://images.unsplash.com/photo-1746014601017-4e515ef51722?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    url: "#",
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
