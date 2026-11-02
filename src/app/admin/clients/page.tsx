import type { Metadata } from "next";
import { Suspense } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminLoading } from "@/components/admin/AdminUi";
import { ClientsView } from "@/components/admin/ClientsView";
import { requireAdmin } from "@/lib/adminSession";
import { fallbackClients } from "@/lib/clientModel";
import { getClientAdminData } from "@/lib/clients";

export const metadata: Metadata = {
  title: "Clients — Content Admin",
  robots: { index: false, follow: false },
};

async function ClientsData() {
  await requireAdmin();
  const { clients, imported } = await getClientAdminData();
  // Before the first import, show what the site displays today
  return <ClientsView clients={imported ? clients : fallbackClients} imported={imported} />;
}

export default function AdminClientsPage() {
  return (
    <AdminShell activeKey="clients" breadcrumb="Content / Clients" title="Clients">
      <Suspense fallback={<AdminLoading />}>
        <ClientsData />
      </Suspense>
    </AdminShell>
  );
}
