import type { Lang } from "@/lib/i18n";
import type { SheetRecord } from "@/lib/sheetStore";

// Gallery data shapes shared by the admin pages (browser) and the server code
// in gallery.ts. Nothing here may touch the server.

export const galleryTab = "Gallery";

export const galleryColumns = ["order", "status", "title", "title_id", "description", "description_id", "category", "event_date", "image", "updated_at"];

export const galleryCategories = ["Events", "Projects", "Team", "Office"];
export const MAX_PHOTO_MB = 8;
// Uploaded photos are resized so their longest side is at most this many pixels
export const GALLERY_MAX_SIDE = 2000;

export type GalleryPhoto = {
  id: string;
  order: number;
  published: boolean;
  title: string;
  // Indonesian title and description; empty ones fall back to the English text
  titleId: string;
  description: string;
  descriptionId: string;
  category: string;
  eventDate: string;
  image: string;
  updatedAt: string;
};

export type PublicPhoto = Pick<GalleryPhoto, "id" | "title" | "titleId" | "description" | "descriptionId" | "category" | "eventDate" | "image">;

const toOrder = (value = "") => {
  const n = Number.parseFloat(value);
  return Number.isFinite(n) ? n : 999;
};

export function toPhoto(r: SheetRecord): GalleryPhoto {
  return {
    id: r.id,
    order: toOrder(r.order),
    published: (r.status ?? "").toLowerCase() !== "draft",
    title: r.title ?? "",
    titleId: r.title_id ?? "",
    description: r.description ?? "",
    descriptionId: r.description_id ?? "",
    category: r.category ?? "",
    eventDate: r.event_date ?? "",
    image: r.image ?? "",
    updatedAt: r.updated_at ?? "",
  };
}

export function photoValues(p: Omit<GalleryPhoto, "id">): Record<string, string> {
  return {
    order: String(p.order),
    status: p.published ? "Published" : "Draft",
    title: p.title,
    title_id: p.titleId,
    description: p.description,
    description_id: p.descriptionId,
    category: p.category,
    event_date: p.eventDate,
    image: p.image,
    updated_at: p.updatedAt,
  };
}

export function toPublicPhoto({ id, title, titleId, description, descriptionId, category, eventDate, image }: GalleryPhoto): PublicPhoto {
  return { id, title, titleId, description, descriptionId, category, eventDate, image };
}

const categoryLabelsId: Record<string, string> = { Events: "Acara", Projects: "Proyek", Team: "Tim", Office: "Kantor" };

// "2026-11-10" -> "10 November 2026"; anything that isn't a full date is hidden
export function formatPhotoDate(date: string, lang: Lang): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return "";
  return new Intl.DateTimeFormat(lang === "id" ? "id-ID" : "en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${date}T00:00:00Z`),
  );
}

// What the Gallery page shows for one photo in the chosen language. Indonesian
// text typed in the admin wins; a built-in photo imported before the Sheet had
// Indonesian columns keeps its built-in translation; otherwise the English text.
export function localPhoto(p: PublicPhoto, lang: Lang) {
  const pick = (en: string, id: string) => (lang === "id" ? id || en : en);
  const builtIn = fallbackPhotos.find((f) => f.title === p.title)?.titleId ?? "";
  return {
    image: p.image,
    title: pick(p.title, p.titleId || builtIn),
    description: pick(p.description, p.descriptionId),
    category: lang === "id" ? (categoryLabelsId[p.category] ?? p.category) : p.category,
    date: formatPhotoDate(p.eventDate, lang),
  };
}

const seed = (order: number, file: string, title: string, titleId: string, category: string): GalleryPhoto => ({
  id: `seed-${order}`,
  order,
  published: true,
  title,
  titleId,
  description: "",
  descriptionId: "",
  category,
  eventDate: "",
  image: `/images/pst/gallery/${file}`,
  updatedAt: "",
});

// The nine photos the Gallery page showed before moving to the Sheet
export const fallbackPhotos: GalleryPhoto[] = [
  seed(1, "PSt.jpg", "Team at the PST office", "Tim di kantor PST", "Team"),
  seed(2, "Gallery-2.png", "Project review meeting", "Rapat tinjauan proyek", "Projects"),
  seed(3, "Gallery-3.png", "PST team gathering", "Kebersamaan tim PST", "Team"),
  seed(4, "Gallery-4.png", "Client workshop session", "Sesi workshop bersama klien", "Projects"),
  seed(5, "Gallery-5.png", "Business process mapping", "Pemetaan proses bisnis", "Projects"),
  seed(6, "Gallery-7.png", "Consultant training", "Pelatihan konsultan", "Events"),
  seed(7, "Gallery-8.png", "Implementation kickoff", "Kickoff implementasi", "Projects"),
  seed(8, "Gallery-9.png", "Weekly project sync", "Sinkronisasi proyek mingguan", "Events"),
  seed(9, "Gallery-10.jpg", "Online meeting with client", "Rapat online bersama klien", "Events"),
];
