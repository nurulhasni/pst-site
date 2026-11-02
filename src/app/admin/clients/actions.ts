"use server";

import { refresh, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { emailPattern, failure, file, order, text, type FormState } from "@/lib/adminForms";
import { requireAdmin } from "@/lib/adminSession";
import { jakartaToday } from "@/lib/dates";
import { clientColumns, clientValues, clientsTab, fallbackClients, otherIndustry } from "@/lib/clientModel";
import { getClient } from "@/lib/clients";
import { createRecord, deleteRecord, listRecords, updateRecord } from "@/lib/sheetStore";
import { sheetTag } from "@/lib/sheets";
import { deleteUpload, saveImage } from "@/lib/uploads";

const maxLogoBytes = 2 * 1024 * 1024;

// "pst.co.id" becomes "https://pst.co.id"; anything that still isn't a web address is rejected
function normalizeWebsite(value: string): string | null {
  if (!value) return "";
  const url = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  try {
    const parsed = new URL(url);
    return parsed.hostname.includes(".") ? parsed.toString().replace(/\/$/, "") : null;
  } catch {
    return null;
  }
}

export async function saveClient(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();

  const id = text(formData, "id");
  const name = text(formData, "name");
  const website = normalizeWebsite(text(formData, "website"));
  const contactEmail = text(formData, "contactEmail");
  const logoFile = file(formData, "logoFile");
  const previousLogo = text(formData, "logo");
  const removeLogo = formData.get("removeLogo") === "on";

  if (!name) return { message: "Company name is required." };
  if (website === null) return { message: "Website must be a web address, like https://company.co.id." };
  if (contactEmail && !emailPattern.test(contactEmail)) return { message: "Contact email must be a valid email address." };

  let logo = removeLogo ? "" : previousLogo;
  try {
    if (logoFile) logo = await saveImage(logoFile, "clients", maxLogoBytes);
  } catch (error) {
    return failure(error);
  }

  const values = clientValues({
    order: order(formData),
    active: formData.get("active") === "on",
    name,
    industry: text(formData, "industry") || otherIndustry,
    website,
    description: text(formData, "description").slice(0, 160),
    logo,
    homepageStrip: formData.get("homepageStrip") === "on",
    servicesPage: formData.get("servicesPage") === "on",
    contactName: text(formData, "contactName"),
    contactEmail,
    contactPhone: text(formData, "contactPhone"),
    updatedAt: jakartaToday(),
  });

  try {
    if (id) await updateRecord(clientsTab, clientColumns, id, values);
    else await createRecord(clientsTab, clientColumns, values);
  } catch (error) {
    // The row wasn't saved, so don't leave the new logo behind
    if (logoFile) await deleteUpload(logo);
    return failure(error);
  }

  if (previousLogo && previousLogo !== logo) await deleteUpload(previousLogo);
  updateTag(sheetTag(clientsTab));
  redirect("/admin/clients");
}

// The homepage-strip switch in the client list saves on its own
export async function setClientInStrip(id: string, inStrip: boolean): Promise<FormState> {
  await requireAdmin();
  try {
    await updateRecord(clientsTab, clientColumns, id, { homepage_strip: inStrip ? "Yes" : "No", updated_at: jakartaToday() });
  } catch (error) {
    return failure(error);
  }
  updateTag(sheetTag(clientsTab));
  refresh();
  return { message: "", ok: true };
}

export async function deleteClient(id: string, backToList: boolean): Promise<FormState> {
  await requireAdmin();
  try {
    const client = await getClient(id);
    await deleteRecord(clientsTab, id);
    if (client?.logo) await deleteUpload(client.logo);
  } catch (error) {
    return failure(error);
  }
  updateTag(sheetTag(clientsTab));
  if (backToList) redirect("/admin/clients");
  refresh();
  return { message: "", ok: true };
}

// Copies the 18 clients the site shows today into a new "Clients" tab.
// Does nothing when the tab already exists, so it can't duplicate rows.
export async function importClients(): Promise<FormState> {
  await requireAdmin();
  const today = jakartaToday();
  try {
    if ((await listRecords(clientsTab)) === null) {
      for (const client of fallbackClients) {
        await createRecord(clientsTab, clientColumns, clientValues({ ...client, updatedAt: today }));
      }
    }
  } catch (error) {
    return failure(error);
  }
  updateTag(sheetTag(clientsTab));
  refresh();
  return { message: "", ok: true };
}
