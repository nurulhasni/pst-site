"use server";

import { refresh, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { failure, file, order, text, type FormState } from "@/lib/adminForms";
import { requireAdmin } from "@/lib/adminSession";
import { jakartaToday } from "@/lib/dates";
import { createRecord, deleteRecord, listRecords, updateRecord } from "@/lib/sheetStore";
import { sheetTag } from "@/lib/sheets";
import { getStory } from "@/lib/stories";
import { NARRATIVE_MAX, QUOTE_MAX, fallbackStories, storiesTab, storyColumns, storyValues, toStory } from "@/lib/storyModel";
import { deleteUpload, saveImage } from "@/lib/uploads";

const maxPhotoBytes = 8 * 1024 * 1024;
const maxLogoBytes = 2 * 1024 * 1024;

// Strip quotation marks typed around a quote; the site adds its own
const unquote = (value: string) => value.replace(/^["“]+|["”]+$/g, "").trim();

// Only one story can open first on the homepage
async function clearOtherFeatured(keepId: string) {
  const rows = (await listRecords(storiesTab)) ?? [];
  for (const story of rows.map(toStory)) {
    if (story.featured && story.id !== keepId) {
      await updateRecord(storiesTab, storyColumns, story.id, { featured: "No" });
    }
  }
}

export async function saveStory(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();

  const id = text(formData, "id");
  const title = text(formData, "title");
  const body = text(formData, "body");
  const quote = unquote(text(formData, "quote"));
  const url = text(formData, "url");
  const photoFile = file(formData, "photoFile");
  const logoFile = file(formData, "logoFile");
  const previousImage = text(formData, "image");
  const previousLogo = text(formData, "logo");
  const featured = formData.get("featured") === "on";

  if (!title) return { message: "Story title is required." };
  if (!body) return { message: "Narrative is required." };
  if (body.length > NARRATIVE_MAX) return { message: `Narrative must be ${NARRATIVE_MAX} characters or fewer.` };
  if (quote.length > QUOTE_MAX) return { message: `Quote must be ${QUOTE_MAX} characters or fewer.` };
  if (url && !/^(https?:\/\/|\/)/i.test(url)) return { message: "Read more link must start with https:// or /." };

  let image = formData.get("removeImage") === "on" ? "" : previousImage;
  let logo = formData.get("removeLogo") === "on" ? "" : previousLogo;
  const uploaded: string[] = [];
  try {
    if (photoFile) uploaded.push((image = await saveImage(photoFile, "stories", maxPhotoBytes)));
    if (logoFile) uploaded.push((logo = await saveImage(logoFile, "stories", maxLogoBytes)));
  } catch (error) {
    for (const upload of uploaded) await deleteUpload(upload);
    return failure(error);
  }

  const values = storyValues({
    order: order(formData),
    published: formData.get("published") === "on",
    featured,
    title,
    titleId: text(formData, "titleId"),
    industry: text(formData, "industry"),
    service: text(formData, "service"),
    body,
    bodyId: text(formData, "bodyId"),
    quote,
    quoteId: unquote(text(formData, "quoteId")),
    clientName: text(formData, "clientName"),
    clientPosition: text(formData, "clientPosition"),
    company: text(formData, "company"),
    companyMeta: text(formData, "companyMeta"),
    meta: text(formData, "meta"),
    url,
    image,
    logo,
    updatedAt: jakartaToday(),
  });

  try {
    let savedId = id;
    if (id) await updateRecord(storiesTab, storyColumns, id, values);
    else savedId = (await createRecord(storiesTab, storyColumns, values)).id;
    if (featured) await clearOtherFeatured(savedId);
  } catch (error) {
    for (const upload of uploaded) await deleteUpload(upload);
    return failure(error);
  }

  if (previousImage && previousImage !== image) await deleteUpload(previousImage);
  if (previousLogo && previousLogo !== logo) await deleteUpload(previousLogo);
  updateTag(sheetTag(storiesTab));
  redirect("/admin/testimonials");
}

export async function deleteStory(id: string, backToList: boolean): Promise<FormState> {
  await requireAdmin();
  try {
    const story = await getStory(id);
    await deleteRecord(storiesTab, id);
    if (story?.image) await deleteUpload(story.image);
    if (story?.logo) await deleteUpload(story.logo);
  } catch (error) {
    return failure(error);
  }
  updateTag(sheetTag(storiesTab));
  if (backToList) redirect("/admin/testimonials");
  refresh();
  return { message: "", ok: true };
}

// Copies the stories the homepage shows today into a new "Customer Stories"
// tab. Does nothing when the tab already exists.
export async function importStories(): Promise<FormState> {
  await requireAdmin();
  const today = jakartaToday();
  try {
    if ((await listRecords(storiesTab)) === null) {
      for (const story of fallbackStories) {
        await createRecord(storiesTab, storyColumns, storyValues({ ...story, updatedAt: today }));
      }
    }
  } catch (error) {
    return failure(error);
  }
  updateTag(sheetTag(storiesTab));
  refresh();
  return { message: "", ok: true };
}
