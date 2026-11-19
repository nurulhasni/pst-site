"use server";

import { refresh, updateTag } from "next/cache";
import { failure, order, text, type FormState } from "@/lib/adminForms";
import { requireAdmin } from "@/lib/adminSession";
import { jakartaToday } from "@/lib/dates";
import {
  clientColumns,
  clientsTab,
  fallbackIndustries,
  industriesTab,
  industryColumns,
  industryIconKeys,
  industryValues,
  toIndustry,
  type IndustryIcon,
} from "@/lib/clientModel";
import { createRecord, deleteRecord, listRecords, updateRecord } from "@/lib/sheetStore";
import { sheetTag } from "@/lib/sheets";

const same = (a: string, b: string) => a.trim().toLowerCase() === b.trim().toLowerCase();

async function clientsUsing(name: string) {
  return ((await listRecords(clientsTab)) ?? []).filter((r) => same(r.industry ?? "", name));
}

function done(): FormState {
  updateTag(sheetTag(industriesTab));
  updateTag(sheetTag(clientsTab));
  refresh();
  return { message: "", ok: true };
}

export async function saveIndustry(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();

  const id = text(formData, "id");
  const name = text(formData, "name");
  const icon = text(formData, "icon");
  if (!name) return { message: "Industry name (English) is required." };
  if (!(industryIconKeys as readonly string[]).includes(icon)) return { message: "Pick an icon." };

  try {
    const rows = await listRecords(industriesTab);
    if (rows === null) return { message: "Import the industries to the Google Sheet first." };
    const all = rows.map(toIndustry);
    if (all.some((i) => i.id !== id && same(i.name, name))) return { message: `There is already an industry called “${name}”.` };

    const values = industryValues({
      order: order(formData),
      name,
      nameId: text(formData, "nameId"),
      short: text(formData, "short"),
      shortId: text(formData, "shortId"),
      icon: icon as IndustryIcon,
      updatedAt: jakartaToday(),
    });

    if (!id) {
      await createRecord(industriesTab, industryColumns, values);
      return done();
    }

    const previous = all.find((i) => i.id === id);
    if (!previous) return { message: "This industry was removed or changed in the Sheet. Reload and try again." };
    await updateRecord(industriesTab, industryColumns, id, values);

    // Clients store the industry name, so a rename moves every client with it
    if (previous.name !== name) {
      for (const client of await clientsUsing(previous.name)) {
        await updateRecord(clientsTab, clientColumns, client.id, { industry: name, updated_at: jakartaToday() });
      }
    }
  } catch (error) {
    return failure(error);
  }
  return done();
}

export async function deleteIndustry(id: string): Promise<FormState> {
  await requireAdmin();
  try {
    const industry = ((await listRecords(industriesTab)) ?? []).map(toIndustry).find((i) => i.id === id);
    if (!industry) return { message: "This industry was already removed. Reload the page." };
    const used = (await clientsUsing(industry.name)).length;
    if (used) {
      return {
        message: `${used} ${used === 1 ? "client still uses" : "clients still use"} “${industry.name}”. Move ${used === 1 ? "it" : "them"} to another industry first.`,
      };
    }
    await deleteRecord(industriesTab, id);
  } catch (error) {
    return failure(error);
  }
  return done();
}

// Copies the six industries the site shows today into a new "Industries" tab.
// Does nothing when the tab already exists, so it can't duplicate rows.
export async function importIndustries(): Promise<FormState> {
  await requireAdmin();
  const today = jakartaToday();
  try {
    if ((await listRecords(industriesTab)) === null) {
      for (const industry of fallbackIndustries) {
        await createRecord(industriesTab, industryColumns, industryValues({ ...industry, updatedAt: today }));
      }
    }
  } catch (error) {
    return failure(error);
  }
  return done();
}
