import type { Lang } from "@/lib/i18n";
import { localize } from "@/lib/sheetI18n";
import type { SheetRecord } from "@/lib/sheetStore";

// Customer story shapes shared by the admin forms (browser), the homepage
// section and the server code in stories.ts. Nothing here may touch the server.

export const storiesTab = "Customer Stories";

// The tab started with title, body, quote, quote_author, company,
// company_meta, meta, url and image. Those keep working; the rest are added
// the first time the admin saves a story.
export const storyColumns = [
  "order",
  "status",
  "featured",
  "title",
  "title_id",
  "industry",
  "service",
  "body",
  "body_id",
  "quote",
  "quote_id",
  "client_name",
  "client_position",
  "company",
  "company_meta",
  "meta",
  "url",
  "image",
  "logo",
  "updated_at",
];

export const storyIndustries = ["Manufacturing", "Retail", "Energy", "Maritime & Transportation", "Mining & Construction", "Finance & Technology", "Consumer Goods"];
export const storyServices = ["SAP Solution", "SAP Support & Outsourcing", "Business Process Reengineering", "Strategic Information Planning"];

export const NARRATIVE_MAX = 400;
export const QUOTE_MAX = 200;

export type Story = {
  id: string;
  order: number;
  published: boolean;
  featured: boolean;
  title: string;
  titleId: string;
  industry: string;
  service: string;
  body: string;
  bodyId: string;
  quote: string;
  quoteId: string;
  clientName: string;
  clientPosition: string;
  company: string;
  companyMeta: string;
  meta: string;
  url: string;
  image: string;
  logo: string;
  // From the original tab layout, used when no client name is filled in
  quoteAuthor: string;
  updatedAt: string;
};

// What the homepage section renders. Lines are ready to show; *_id fields
// are empty when no Indonesian text was entered.
export type PublicStory = {
  key: string;
  title: string;
  titleId: string;
  body: string;
  bodyId: string;
  quote: string;
  quoteId: string;
  quoteAuthor: string;
  company: string;
  companyMeta: string;
  meta: string;
  url: string;
  image: string;
  logo: string;
};

export type CustomerStories = { featured: PublicStory; stories: PublicStory[] };

const toOrder = (value = "") => {
  const n = Number.parseFloat(value);
  return Number.isFinite(n) ? n : 999;
};

export function toStory(r: SheetRecord): Story {
  return {
    id: r.id,
    order: toOrder(r.order),
    published: (r.status ?? "").toLowerCase() !== "hidden",
    featured: /^(yes|true|1)$/i.test((r.featured ?? "").trim()),
    title: r.title ?? "",
    titleId: r.title_id ?? "",
    industry: r.industry ?? "",
    service: r.service ?? "",
    body: r.body ?? "",
    bodyId: r.body_id ?? "",
    quote: r.quote ?? "",
    quoteId: r.quote_id ?? "",
    clientName: r.client_name ?? "",
    clientPosition: r.client_position ?? "",
    company: r.company ?? "",
    companyMeta: r.company_meta ?? "",
    meta: r.meta ?? "",
    url: r.url ?? "",
    image: r.image ?? "",
    logo: r.logo ?? "",
    quoteAuthor: r.quote_author ?? "",
    updatedAt: r.updated_at ?? "",
  };
}

export function storyValues(s: Omit<Story, "id" | "quoteAuthor">): Record<string, string> {
  return {
    order: String(s.order),
    status: s.published ? "Published" : "Hidden",
    featured: s.featured ? "Yes" : "No",
    title: s.title,
    title_id: s.titleId,
    industry: s.industry,
    service: s.service,
    body: s.body,
    body_id: s.bodyId,
    quote: s.quote,
    quote_id: s.quoteId,
    client_name: s.clientName,
    client_position: s.clientPosition,
    company: s.company,
    company_meta: s.companyMeta,
    meta: s.meta,
    url: s.url,
    image: s.image,
    logo: s.logo,
    updated_at: s.updatedAt,
  };
}

// Quotes are typed without quotation marks; add them unless they're already there
export function quoted(text: string): string {
  const t = text.trim();
  return !t || /^["“]/.test(t) ? t : `“${t}”`;
}

// "Andi Wijaya · CIO, Manufacturing Corp"
export function attribution(s: Pick<Story, "clientName" | "clientPosition" | "company" | "quoteAuthor">): string {
  if (!s.clientName) return s.quoteAuthor;
  const role = [s.clientPosition, s.company].filter(Boolean).join(", ");
  return role ? `${s.clientName} · ${role}` : s.clientName;
}

// Indonesian text typed in the admin wins; otherwise the built-in translation
// table, and failing that the English text
export function localStory(s: PublicStory, lang: Lang): PublicStory {
  const pick = (en: string, id: string) => (lang === "id" ? id || localize(en, lang) : en);
  return {
    ...s,
    title: pick(s.title, s.titleId),
    body: pick(s.body, s.bodyId),
    quote: pick(s.quote, s.quoteId),
    quoteAuthor: localize(s.quoteAuthor, lang),
    companyMeta: localize(s.companyMeta, lang),
    meta: localize(s.meta, lang),
  };
}

const fallbackImages = [
  "https://images.unsplash.com/photo-1653290523116-662a6e8c4b88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  "https://images.unsplash.com/photo-1751953813464-06a989a71c3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  "https://images.unsplash.com/photo-1746014601017-4e515ef51722?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
];

export function toPublicStory(s: Story, index: number): PublicStory {
  return {
    key: s.id,
    title: s.title,
    titleId: s.titleId,
    body: s.body,
    bodyId: s.bodyId,
    quote: quoted(s.quote),
    quoteId: quoted(s.quoteId),
    quoteAuthor: attribution(s),
    company: s.company,
    companyMeta: s.companyMeta || s.service,
    meta: s.meta || [s.industry, s.service].filter(Boolean).join(" · "),
    url: s.url || "#",
    image: s.image || fallbackImages[index % fallbackImages.length],
    logo: s.logo,
  };
}

// The stories the homepage showed before moving to the Sheet. The second one
// still has placeholder text from the original design, to replace after import.
export const fallbackStories: Story[] = [
  {
    id: "seed-1",
    order: 1,
    published: true,
    featured: true,
    title: "Transforming a manufacturer's supply chain with SAP S/4HANA",
    titleId: "",
    industry: "Manufacturing",
    service: "SAP Solution",
    body: "A manufacturing company partnered with PST to move its entire supply chain onto SAP S/4HANA. Deep SAP expertise and a shared commitment to the outcome carried the team through every stage of its digital transformation.",
    bodyId: "",
    quote: "Their team's deep expertise and commitment to our success made all the difference.",
    quoteId: "",
    clientName: "Andi Wijaya",
    clientPosition: "CIO",
    company: "Manufacturing Corp",
    companyMeta: "SAP S/4HANA · Supply chain",
    meta: "",
    url: "",
    image: fallbackImages[0],
    logo: "",
    quoteAuthor: "",
    updatedAt: "",
  },
  {
    id: "seed-2",
    order: 2,
    published: true,
    featured: false,
    title: "Turning an implementation into a strategic partnership",
    titleId: "",
    industry: "Retail",
    service: "SAP Solution",
    body: "[Placeholder] Narrative text for this story goes here.",
    bodyId: "",
    quote: "[Placeholder] Quote from the client goes here.",
    quoteId: "",
    clientName: "[Placeholder] Name",
    clientPosition: "Role",
    company: "Company",
    companyMeta: "",
    meta: "Retail · Finance transformation",
    url: "",
    image: fallbackImages[1],
    logo: "",
    quoteAuthor: "",
    updatedAt: "",
  },
  {
    id: "seed-3",
    order: 3,
    published: true,
    featured: false,
    title: "Keeping energy operations running smoothly for years",
    titleId: "",
    industry: "Energy",
    service: "SAP Support & Outsourcing",
    body: "",
    bodyId: "",
    quote: "",
    quoteId: "",
    clientName: "",
    clientPosition: "",
    company: "",
    companyMeta: "",
    meta: "Energy · Support & maintenance",
    url: "",
    image: fallbackImages[2],
    logo: "",
    quoteAuthor: "",
    updatedAt: "",
  },
];
