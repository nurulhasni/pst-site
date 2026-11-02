import { cacheLife, cacheTag } from "next/cache";
import { fallbackPhotos, galleryTab, toPhoto, type GalleryPhoto, type PublicPhoto } from "@/lib/galleryModel";
import { listRecords, type SheetRecord } from "@/lib/sheetStore";
import { sheetTag } from "@/lib/sheets";

const byOrder = (a: GalleryPhoto, b: GalleryPhoto) => a.order - b.order;

async function readPhotos(): Promise<SheetRecord[] | null> {
  try {
    return await listRecords(galleryTab);
  } catch {
    // Google unreachable or not configured: keep the page up with the built-in photos
    return null;
  }
}

export async function getPublicPhotos(): Promise<PublicPhoto[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag(sheetTag(galleryTab));

  const rows = await readPhotos();
  return (rows ? rows.map(toPhoto) : fallbackPhotos)
    .filter((p) => p.published && p.image)
    .sort(byOrder)
    .map(({ id, title, image }) => ({ id, title, image }));
}

export async function getGalleryAdminData() {
  const rows = await listRecords(galleryTab);
  return { photos: (rows ?? []).map(toPhoto).sort(byOrder), imported: rows !== null };
}

export async function getPhoto(id: string): Promise<GalleryPhoto | null> {
  const rows = await listRecords(galleryTab);
  const row = rows?.find((r) => r.id === id);
  return row ? toPhoto(row) : null;
}
