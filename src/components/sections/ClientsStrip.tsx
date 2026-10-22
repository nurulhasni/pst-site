import { getClientRows } from "@/lib/sheets";
import { ClientsStripView } from "@/components/sections/ClientsStripView";

export async function ClientsStrip() {
  const rows = await getClientRows();

  return <ClientsStripView rows={rows} />;
}
