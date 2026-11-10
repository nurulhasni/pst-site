import type { SheetRecord } from "@/lib/sheetStore";

// Gallery data shapes shared by the admin pages (browser) and the server code
// in gallery.ts. Nothing here may touch the server.

export const galleryTab = "Gallery";

export const galleryColumns = ["order", "status", "title", "category", "event_date", "image", "updated_at"];

export const galleryCategories = ["Events", "Projects", "Team", "Office"];
export const MAX_PHOTO_MB = 8;
// Uploaded photos are resized so their longest side is at most this many pixels
export const GALLERY_MAX_SIDE = 2000;

export type GalleryPhoto = {
  id: string;
  order: number;
  published: boolean;
  title: string;
  category: string;
  eventDate: string;
  image: string;
  updatedAt: string;
};

export type PublicPhoto = Pick<GalleryPhoto, "id" | "title" | "image">;

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
    category: p.category,
    event_date: p.eventDate,
    image: p.image,
    updated_at: p.updatedAt,
  };
}

const seed = (order: number, file: string, title: string, category: string): GalleryPhoto => ({
  id: `seed-${order}`,
  order,
  published: true,
  title,
  category,
  eventDate: "",
  image: `/images/pst/gallery/${file}`,
  updatedAt: "",
});

// The nine photos the Gallery page showed before moving to the Sheet
export const fallbackPhotos: GalleryPhoto[] = [
  seed(1, "PSt.jpg", "Team at the PST office", "Team"),
  seed(2, "Gallery-2.png", "Project review meeting", "Projects"),
  seed(3, "Gallery-3.png", "PST team gathering", "Team"),
  seed(4, "Gallery-4.png", "Client workshop session", "Projects"),
  seed(5, "Gallery-5.png", "Business process mapping", "Projects"),
  seed(6, "Gallery-7.png", "Consultant training", "Events"),
  seed(7, "Gallery-8.png", "Implementation kickoff", "Projects"),
  seed(8, "Gallery-9.png", "Weekly project sync", "Events"),
  seed(9, "Gallery-10.jpg", "Online meeting with client", "Events"),
];
