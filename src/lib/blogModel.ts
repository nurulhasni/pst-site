import { idBodies, idPosts, postImages, posts as builtInPosts, type Block } from "@/lib/blog";
import type { Lang } from "@/lib/i18n";
import type { SheetRecord } from "@/lib/sheetStore";

// Blog data shapes shared by the admin pages (browser) and the server code in
// blogPosts.ts. Nothing here may touch the server.

export const blogTab = "Blog";

export const blogColumns = [
  "status",
  "date",
  "featured",
  "gated",
  "slug",
  "category",
  "title",
  "title_id",
  "excerpt",
  "excerpt_id",
  "body",
  "body_id",
  "tags",
  "read_minutes",
  "image",
  "meta_title",
  "meta_description",
  "updated_at",
];

export const blogCategories = ["Technology", "SAP", "Business", "Security", "Leadership"];
export const EXCERPT_MAX = 300;
export const META_TITLE_MAX = 60;
export const META_DESCRIPTION_MAX = 160;
export const MAX_COVER_MB = 8;
export const COVER_MAX_SIDE = 2000;
// Google Sheets refuses more than 50,000 characters in one cell
export const BODY_MAX = 45000;

export type BlogPost = {
  id: string;
  published: boolean;
  // YYYY-MM-DD. A published post with a later date stays hidden until that day.
  date: string;
  featured: boolean;
  gated: boolean;
  slug: string;
  category: string;
  title: string;
  titleId: string;
  excerpt: string;
  excerptId: string;
  // Article text in the simple format parseBody() reads
  body: string;
  bodyId: string;
  // "#SAP, #Cloud"
  tags: string;
  // Empty to work it out from the length of the article
  readMinutes: string;
  image: string;
  metaTitle: string;
  metaDescription: string;
  updatedAt: string;
};

const yes = (value = "") => ["yes", "true", "1"].includes(value.trim().toLowerCase());

export function toBlogPost(r: SheetRecord): BlogPost {
  return {
    id: r.id,
    published: (r.status ?? "").toLowerCase() !== "draft",
    date: r.date ?? "",
    featured: yes(r.featured),
    gated: yes(r.gated),
    slug: r.slug ?? "",
    category: r.category ?? "",
    title: r.title ?? "",
    titleId: r.title_id ?? "",
    excerpt: r.excerpt ?? "",
    excerptId: r.excerpt_id ?? "",
    body: r.body ?? "",
    bodyId: r.body_id ?? "",
    tags: r.tags ?? "",
    readMinutes: r.read_minutes ?? "",
    image: r.image ?? "",
    metaTitle: r.meta_title ?? "",
    metaDescription: r.meta_description ?? "",
    updatedAt: r.updated_at ?? "",
  };
}

export function blogValues(p: Omit<BlogPost, "id">): Record<string, string> {
  return {
    status: p.published ? "Published" : "Draft",
    date: p.date,
    featured: p.featured ? "Yes" : "No",
    gated: p.gated ? "Yes" : "No",
    slug: p.slug,
    category: p.category,
    title: p.title,
    title_id: p.titleId,
    excerpt: p.excerpt,
    excerpt_id: p.excerptId,
    body: p.body,
    body_id: p.bodyId,
    tags: p.tags,
    read_minutes: p.readMinutes,
    image: p.image,
    meta_title: p.metaTitle,
    meta_description: p.metaDescription,
    updated_at: p.updatedAt,
  };
}

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

export const isDate = (value: string) => /^\d{4}-\d{2}-\d{2}$/.test(value);

// "Draft", "Scheduled" (published, but dated after today) or "Published"
export type PostStatus = "Published" | "Draft" | "Scheduled";
export function postStatus(p: Pick<BlogPost, "published" | "date">, today: string): PostStatus {
  if (!p.published) return "Draft";
  return isDate(p.date) && p.date > today ? "Scheduled" : "Published";
}

// ---- Article text ----
//
// Staff write the article as plain text, in the admin or straight in the Sheet:
//
//   A blank line starts a new paragraph. The first paragraph is the intro.
//   ## Subheading
//   - bullet            (one per line)
//   1. numbered item    (one per line)
//   > A pulled quote
//   ![Caption](https://link-to-image)   an image; the link is optional

const bullet = /^[-*•]\s+/;
const numbered = /^\d+[.)]\s+/;
const figure = /^!\[(.*?)\](?:\((.*?)\))?$/;

export function parseBody(text: string): Block[] {
  const blocks: Block[] = [];
  const chunks = text
    .replace(/\r\n?/g, "\n")
    .split(/\n\s*\n/)
    .map((chunk) => chunk.trim())
    .filter(Boolean);

  for (const chunk of chunks) {
    const lines = chunk.split("\n").map((line) => line.trim()).filter(Boolean);
    let paragraph: string[] = [];
    const flush = () => {
      if (!paragraph.length) return;
      const type = blocks.length === 0 ? "lead" : "p";
      blocks.push({ type, text: paragraph.join(" ") });
      paragraph = [];
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const image = line.match(figure);
      if (line.startsWith("## ")) {
        flush();
        blocks.push({ type: "h2", text: line.slice(3).trim() });
      } else if (line.startsWith("> ")) {
        flush();
        const quote = [line.slice(2)];
        while (lines[i + 1]?.startsWith("> ")) quote.push(lines[++i].slice(2));
        blocks.push({ type: "quote", text: quote.join(" ").trim() });
      } else if (image) {
        flush();
        blocks.push({ type: "figure", caption: image[1].trim(), ...(image[2]?.trim() ? { image: image[2].trim() } : {}) });
      } else if (bullet.test(line) || numbered.test(line)) {
        flush();
        const marker = bullet.test(line) ? bullet : numbered;
        const items = [line.replace(marker, "")];
        while (lines[i + 1] && marker.test(lines[i + 1])) items.push(lines[++i].replace(marker, ""));
        blocks.push({ type: marker === bullet ? "ul" : "ol", items });
      } else {
        paragraph.push(line);
      }
    }
    flush();
  }
  return blocks;
}

// The reverse of parseBody, used to copy the built-in articles into the Sheet
export function formatBody(blocks: Block[]): string {
  return blocks
    .map((block) => {
      switch (block.type) {
        case "h2":
          return `## ${block.text}`;
        case "quote":
          return `> ${block.text}`;
        case "ul":
          return block.items.map((item) => `- ${item}`).join("\n");
        case "ol":
          return block.items.map((item, index) => `${index + 1}. ${item}`).join("\n");
        case "figure":
          return `![${block.caption}]${block.image ? `(${block.image})` : ""}`;
        default:
          return block.text;
      }
    })
    .join("\n\n");
}

const blockWords = (block: Block) => ("items" in block ? block.items.join(" ") : "text" in block ? block.text : block.caption).split(/\s+/).length;

// About 200 words a minute
export function readMinutes(blocks: Block[]): number {
  const words = blocks.reduce((sum, block) => sum + blockWords(block), 0);
  return Math.max(1, Math.round(words / 200));
}

export function tagList(tags: string): string[] {
  return tags
    .split(/[,\n]/)
    .map((tag) => tag.trim())
    .filter(Boolean)
    .map((tag) => (tag.startsWith("#") ? tag : `#${tag}`));
}

// ---- What the public pages receive ----

// A card on the Blog page
export type PostSummary = {
  slug: string;
  category: string;
  title: string;
  titleId: string;
  excerpt: string;
  excerptId: string;
  date: string;
  readMinutes: number;
  readMinutesId: number;
  gated: boolean;
  image: string;
};

// A full article
export type PublicPost = PostSummary & {
  tags: string[];
  body: Block[];
  // Empty when no Indonesian article was written
  bodyId: Block[];
  metaTitle: string;
  metaDescription: string;
};

// Shown when a post has no cover image of its own
export const defaultCover =
  "https://images.unsplash.com/photo-1702295669371-fc110f29f62e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";

export function toPublicPost(p: BlogPost): PublicPost {
  const body = parseBody(p.body);
  const bodyId = parseBody(p.bodyId);
  const fixed = Number.parseInt(p.readMinutes, 10);
  const minutes = (blocks: Block[]) => (fixed > 0 ? fixed : readMinutes(blocks));
  return {
    slug: p.slug,
    category: p.category,
    title: p.title,
    titleId: p.titleId,
    excerpt: p.excerpt,
    excerptId: p.excerptId,
    date: p.date,
    readMinutes: minutes(body),
    readMinutesId: minutes(bodyId.length ? bodyId : body),
    gated: p.gated,
    image: p.image || defaultCover,
    tags: tagList(p.tags),
    body,
    bodyId,
    metaTitle: p.metaTitle,
    metaDescription: p.metaDescription,
  };
}

export function toSummary(p: PublicPost): PostSummary {
  const { slug, category, title, titleId, excerpt, excerptId, date, readMinutes, readMinutesId, gated, image } = p;
  return { slug, category, title, titleId, excerpt, excerptId, date, readMinutes, readMinutesId, gated, image };
}

// "Oct 15, 2026" in English, "15 Okt 2026" in Indonesian
export function formatPostDate(date: string, lang: Lang): string {
  if (!isDate(date)) return "";
  return new Intl.DateTimeFormat(lang === "id" ? "id-ID" : "en-US", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${date}T00:00:00Z`),
  );
}

// The text of a card or article in the chosen language. Empty Indonesian
// fields fall back to the English text.
export function localSummary<T extends PostSummary>(p: T, lang: Lang) {
  const id = lang === "id";
  const minutes = id ? p.readMinutesId : p.readMinutes;
  return {
    ...p,
    title: (id && p.titleId) || p.title,
    excerpt: (id && p.excerptId) || p.excerpt,
    date: formatPostDate(p.date, lang),
    readTime: id ? `${minutes} menit baca` : `${minutes} min read`,
  };
}

// ---- The ten articles the site showed before moving to the Sheet ----

const isoDate = (text: string) => {
  const time = Date.parse(`${text} UTC`);
  return Number.isNaN(time) ? "" : new Date(time).toISOString().slice(0, 10);
};

export const fallbackPosts: BlogPost[] = builtInPosts.map((post, index) => ({
  id: `seed-${index + 1}`,
  published: true,
  date: isoDate(post.date),
  featured: index === 0,
  gated: post.gated,
  slug: post.slug,
  category: post.category,
  title: post.title,
  titleId: idPosts[post.slug]?.title ?? "",
  excerpt: post.excerpt,
  excerptId: idPosts[post.slug]?.excerpt ?? "",
  body: formatBody(post.body ?? []),
  bodyId: formatBody(idBodies[post.slug] ?? []),
  tags: (post.tags ?? []).join(", "),
  readMinutes: String(Number.parseInt(post.readTime, 10) || ""),
  image: postImages[post.slug] ?? "",
  metaTitle: "",
  metaDescription: "",
  updatedAt: "",
}));
