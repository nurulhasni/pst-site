"use server";

import { refresh, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { failure, file, text, type FormState } from "@/lib/adminForms";
import { requireAdmin } from "@/lib/adminSession";
import {
  BODY_MAX,
  COVER_MAX_SIDE,
  EXCERPT_MAX,
  MAX_COVER_MB,
  META_DESCRIPTION_MAX,
  META_TITLE_MAX,
  blogColumns,
  blogTab,
  blogValues,
  fallbackPosts,
  isDate,
  slugify,
  toBlogPost,
} from "@/lib/blogModel";
import { getBlogPost } from "@/lib/blogPosts";
import { jakartaToday } from "@/lib/dates";
import { createRecord, deleteRecord, listRecords, updateRecord } from "@/lib/sheetStore";
import { sheetTag } from "@/lib/sheets";
import { deleteUpload, saveImage } from "@/lib/uploads";

const maxCoverBytes = MAX_COVER_MB * 1024 * 1024;

// Only one post can be pinned to the top of the Blog page
async function clearOtherFeatured(keepId: string) {
  const rows = (await listRecords(blogTab)) ?? [];
  for (const post of rows.map(toBlogPost)) {
    if (post.featured && post.id !== keepId) await updateRecord(blogTab, blogColumns, post.id, { featured: "No" });
  }
}

export async function savePost(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();

  const id = text(formData, "id");
  const title = text(formData, "title");
  const slug = slugify(text(formData, "slug") || title);
  const excerpt = text(formData, "excerpt");
  const excerptId = text(formData, "excerptId");
  const body = text(formData, "body");
  const bodyId = text(formData, "bodyId");
  const metaTitle = text(formData, "metaTitle");
  const metaDescription = text(formData, "metaDescription");
  const date = text(formData, "date") || jakartaToday();
  const minutes = text(formData, "readMinutes");
  const featured = formData.get("featured") === "on";
  const cover = file(formData, "cover");
  const previousImage = text(formData, "image");

  if (!title) return { message: "Title is required." };
  if (!slug) return { message: "The web address needs at least one letter or number." };
  if (!body) return { message: "Body is required." };
  if (!isDate(date)) return { message: "Publish date is not a valid date." };
  if (minutes && !(Number.parseInt(minutes, 10) > 0)) return { message: "Read time must be a number of minutes, or empty." };
  if (excerpt.length > EXCERPT_MAX || excerptId.length > EXCERPT_MAX) return { message: `Excerpt must be ${EXCERPT_MAX} characters or fewer.` };
  if (body.length > BODY_MAX || bodyId.length > BODY_MAX) return { message: `The article is too long for one Sheet cell (${BODY_MAX.toLocaleString("en")} characters at most).` };
  if (metaTitle.length > META_TITLE_MAX) return { message: `Meta title must be ${META_TITLE_MAX} characters or fewer.` };
  if (metaDescription.length > META_DESCRIPTION_MAX) return { message: `Meta description must be ${META_DESCRIPTION_MAX} characters or fewer.` };

  let image = formData.get("removeImage") === "on" ? "" : previousImage;
  let uploaded = "";
  try {
    const rows = (await listRecords(blogTab)) ?? [];
    if (rows.some((row) => row.id !== id && (row.slug ?? "") === slug)) {
      return { message: `Another post already uses the web address “${slug}”. Change the slug.` };
    }
    if (cover) image = uploaded = await saveImage(cover, "blog", maxCoverBytes, { maxSide: COVER_MAX_SIDE });

    const values = blogValues({
      published: formData.get("published") === "on",
      date,
      featured,
      gated: formData.get("gated") === "on",
      slug,
      category: text(formData, "category"),
      title,
      titleId: text(formData, "titleId"),
      excerpt,
      excerptId,
      body,
      bodyId,
      tags: text(formData, "tags"),
      readMinutes: minutes ? String(Number.parseInt(minutes, 10)) : "",
      image,
      metaTitle,
      metaDescription,
      updatedAt: jakartaToday(),
    });

    let savedId = id;
    if (id) await updateRecord(blogTab, blogColumns, id, values);
    else savedId = (await createRecord(blogTab, blogColumns, values)).id;
    if (featured) await clearOtherFeatured(savedId);
  } catch (error) {
    if (uploaded) await deleteUpload(uploaded);
    return failure(error);
  }

  if (previousImage && previousImage !== image) await deleteUpload(previousImage);
  updateTag(sheetTag(blogTab));
  redirect("/admin/blog");
}

export async function deletePost(id: string, backToList: boolean): Promise<FormState> {
  await requireAdmin();
  try {
    const post = await getBlogPost(id);
    await deleteRecord(blogTab, id);
    if (post?.image) await deleteUpload(post.image);
  } catch (error) {
    return failure(error);
  }
  updateTag(sheetTag(blogTab));
  if (backToList) redirect("/admin/blog");
  refresh();
  return { message: "", ok: true };
}

// Copies the articles the Blog page shows today into a new "Blog" tab.
// Does nothing when the tab already exists.
export async function importBlog(): Promise<FormState> {
  await requireAdmin();
  const today = jakartaToday();
  try {
    if ((await listRecords(blogTab)) === null) {
      // Oldest first, so the newest article ends up on the last row like any post added later
      for (const post of [...fallbackPosts].reverse()) {
        await createRecord(blogTab, blogColumns, blogValues({ ...post, updatedAt: today }));
      }
    }
  } catch (error) {
    return failure(error);
  }
  updateTag(sheetTag(blogTab));
  refresh();
  return { message: "", ok: true };
}
