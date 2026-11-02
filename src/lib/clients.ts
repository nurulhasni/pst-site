import { cacheLife, cacheTag } from "next/cache";
import { clientsTab, fallbackClients, toClient, type Client, type PublicClient } from "@/lib/clientModel";
import { listRecords, type SheetRecord } from "@/lib/sheetStore";
import { sheetTag } from "@/lib/sheets";

const byOrder = (a: Client, b: Client) => a.order - b.order;

async function readClients(): Promise<SheetRecord[] | null> {
  try {
    return await listRecords(clientsTab);
  } catch {
    // Google unreachable or not configured: keep the site up with the built-in logos
    return null;
  }
}

// Active clients with a name and logo, for the homepage strip and the Services page
export async function getPublicClients(): Promise<PublicClient[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag(sheetTag(clientsTab));

  const rows = await readClients();
  return (rows ? rows.map(toClient) : fallbackClients)
    .filter((c) => c.active && c.name && c.logo)
    .sort(byOrder)
    .map(({ id, name, industry, logo, website, homepageStrip, servicesPage }) => ({
      id,
      name,
      industry,
      logo,
      website,
      homepageStrip,
      servicesPage,
    }));
}

export async function getClientAdminData() {
  const rows = await listRecords(clientsTab);
  return { clients: (rows ?? []).map(toClient).sort(byOrder), imported: rows !== null };
}

export async function getClient(id: string): Promise<Client | null> {
  const rows = await listRecords(clientsTab);
  const row = rows?.find((r) => r.id === id);
  return row ? toClient(row) : null;
}
