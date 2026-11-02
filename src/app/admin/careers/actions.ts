"use server";

import { refresh, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/adminSession";
import {
  defaultApplyEmail,
  fallbackFaqs,
  fallbackPositions,
  faqColumns,
  faqTab,
  faqValues,
  jakartaToday,
  positionColumns,
  positionValues,
  positionsTab,
} from "@/lib/careerModel";
import { datePattern, emailPattern, failure, order, text, type FormState } from "@/lib/adminForms";
import { createRecord, deleteRecord, listRecords, updateRecord } from "@/lib/sheetStore";
import { sheetTag } from "@/lib/sheets";

// List items are stored one per line, so a line break inside an item would split it in two
const items = (formData: FormData, name: string) =>
  formData
    .getAll(name)
    .map((value) => String(value).replace(/\s*\r?\n\s*/g, " ").trim())
    .filter(Boolean);

export async function savePosition(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();

  const id = text(formData, "id");
  const title = text(formData, "title");
  const applyEmail = text(formData, "applyEmail") || defaultApplyEmail;
  const closingDate = text(formData, "closingDate");

  if (!title) return { message: "Position title is required." };
  if (!emailPattern.test(applyEmail)) return { message: "Apply via email must be a valid email address." };
  if (closingDate && !datePattern.test(closingDate)) return { message: "Closing date must be a valid date." };

  const values = positionValues({
    order: order(formData),
    open: formData.get("open") === "on",
    category: text(formData, "category"),
    type: text(formData, "type"),
    location: text(formData, "location"),
    title,
    titleId: text(formData, "titleId"),
    responsibilities: items(formData, "responsibilities"),
    responsibilitiesId: items(formData, "responsibilitiesId"),
    qualifications: items(formData, "qualifications"),
    qualificationsId: items(formData, "qualificationsId"),
    note: text(formData, "note"),
    noteId: text(formData, "noteId"),
    applyEmail,
    closingDate,
    updatedAt: jakartaToday(),
  });

  try {
    if (id) await updateRecord(positionsTab, positionColumns, id, values);
    else await createRecord(positionsTab, positionColumns, values);
  } catch (error) {
    return failure(error);
  }

  updateTag(sheetTag(positionsTab));
  redirect("/admin/careers");
}

export async function deletePosition(id: string, backToList: boolean): Promise<FormState> {
  await requireAdmin();
  try {
    await deleteRecord(positionsTab, id);
  } catch (error) {
    return failure(error);
  }
  updateTag(sheetTag(positionsTab));
  if (backToList) redirect("/admin/careers");
  refresh();
  return { message: "", ok: true };
}

export async function saveFaq(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();

  const id = text(formData, "id");
  const question = text(formData, "question");
  if (!question) return { message: "Question is required." };

  const values = faqValues({
    order: order(formData),
    published: formData.get("published") === "on",
    question,
    answer: text(formData, "answer"),
    questionId: text(formData, "questionId"),
    answerId: text(formData, "answerId"),
    updatedAt: jakartaToday(),
  });

  try {
    if (id) await updateRecord(faqTab, faqColumns, id, values);
    else await createRecord(faqTab, faqColumns, values);
  } catch (error) {
    return failure(error);
  }

  updateTag(sheetTag(faqTab));
  refresh();
  return { message: "", ok: true };
}

export async function deleteFaq(id: string): Promise<FormState> {
  await requireAdmin();
  try {
    await deleteRecord(faqTab, id);
  } catch (error) {
    return failure(error);
  }
  updateTag(sheetTag(faqTab));
  refresh();
  return { message: "", ok: true };
}

// Copies the positions and FAQ the Career page shows today into new Sheet tabs.
// Skips a tab that already exists so a second click can't duplicate rows.
export async function importCareers(): Promise<FormState> {
  await requireAdmin();
  const today = jakartaToday();
  try {
    if ((await listRecords(positionsTab)) === null) {
      for (const position of fallbackPositions) {
        await createRecord(positionsTab, positionColumns, positionValues({ ...position, updatedAt: today }));
      }
    }
    if ((await listRecords(faqTab)) === null) {
      for (const faq of fallbackFaqs) {
        await createRecord(faqTab, faqColumns, faqValues({ ...faq, updatedAt: today }));
      }
    }
  } catch (error) {
    return failure(error);
  }
  updateTag(sheetTag(positionsTab));
  updateTag(sheetTag(faqTab));
  refresh();
  return { message: "", ok: true };
}
