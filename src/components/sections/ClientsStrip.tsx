import { getPublicClients } from "@/lib/clients";
import { ClientsStripView } from "@/components/sections/ClientsStripView";

export async function ClientsStrip() {
  const clients = (await getPublicClients()).filter((c) => c.homepageStrip);
  // Two marquee rows scrolling in opposite directions
  const half = Math.ceil(clients.length / 2);
  const rows = [clients.slice(0, half), clients.slice(half)].filter((row) => row.length);

  return <ClientsStripView rows={rows} />;
}
