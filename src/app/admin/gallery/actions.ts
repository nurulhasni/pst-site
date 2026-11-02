"use server";

import { refresh, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { datePattern, failure, file, order, text, type FormState } from "@/lib/adminForms";
import { requireAdmin } from "@/lib/adminSession";
import { jakartaToday } from "@/lib/dates";
import { getPhoto } from "@/lib/gallery";
import { MAX_PHOTO_MB, fallbackPhotos, galleryColumns, galleryTab, photoValues } from "@/lib/galleryModel";
import { createRecord, deleteRecord, listRecords, updateRecord } from "@/lib/sheetStore";
import { sheetTag } from "@/lib/sheets";
import { deleteUpload, saveImage } from "@/lib/uploads";

const maxBytes = MAX_PHOTO_MB * 1024 * 1024;

function details(formData: FormData) {
  const eventDate = text(formData, "eventDate");
  return {
    title: text(formData, "title"),
    category: text(formData, "category"),
    eventDate: datePattern.test(eventDate) ? eventDate : "",
    published: formData.get("published") === "on",
    order: order(formData),
  };
}

// The upload page sends one photo per call so each stays under the request
// size limit and the page can show progress photo by photo.
export async function uploadPhoto(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const photo = file(formData, "photo");
  const info = details(formData);
  if (!photo) return { message: "Choose a photo to upload." };
  if (!info.title) return { message: "Title is required." };

  let image = "";
  try {
    image = await saveImage(photo, "gallery", maxBytes);
    await createRecord(galleryTab, galleryColumns, photoValues({ ...info, image, updatedAt: jakartaToday() }));
  } catch (error) {
    if (image) await deleteUpload(image);
    return failure(error);
  }
  updateTag(sheetTag(galleryTab));
  return { message: "", ok: true };
}

export async function savePhoto(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const id = text(formData, "id");
  const previous = text(formData, "image");
  const replacement = file(formData, "photo");
  const info = details(formData);
  if (!info.title) return { message: "Title is required." };

  let image = previous;
  try {
    if (replacement) image = await saveImage(replacement, "gallery", maxBytes);
    await updateRecord(galleryTab, galleryColumns, id, photoValues({ ...info, image, updatedAt: jakartaToday() }));
  } catch (error) {
    if (image !== previous) await deleteUpload(image);
    return failure(error);
  }
  if (image !== previous) await deleteUpload(previous);
  updateTag(sheetTag(galleryTab));
  redirect("/admin/gallery");
}

// Bulk actions from the gallery grid
export async function setPhotosPublished(ids: string[], published: boolean): Promise<FormState> {
  await requireAdmin();
  try {
    for (const id of ids) {
      await updateRecord(galleryTab, galleryColumns, id, { status: published ? "Published" : "Draft", updated_at: jakartaToday() });
    }
  } catch (error) {
    return failure(error);
  }
  updateTag(sheetTag(galleryTab));
  refresh();
  return { message: "", ok: true };
}

export async function deletePhotos(ids: string[], backToList = false): Promise<FormState> {
  await requireAdmin();
  try {
    for (const id of ids) {
      const photo = await getPhoto(id);
      await deleteRecord(galleryTab, id);
      if (photo?.image) await deleteUpload(photo.image);
    }
  } catch (error) {
    return failure(error);
  }
  updateTag(sheetTag(galleryTab));
  if (backToList) redirect("/admin/gallery");
  refresh();
  return { message: "", ok: true };
}

// Copies the nine photos the Gallery page shows today into a new "Gallery"
// tab. Does nothing when the tab already exists.
export async function importGallery(): Promise<FormState> {
  await requireAdmin();
  const today = jakartaToday();
  try {
    if ((await listRecords(galleryTab)) === null) {
      for (const photo of fallbackPhotos) {
        await createRecord(galleryTab, galleryColumns, photoValues({ ...photo, updatedAt: today }));
      }
    }
  } catch (error) {
    return failure(error);
  }
  updateTag(sheetTag(galleryTab));
  refresh();
  return { message: "", ok: true };
}
