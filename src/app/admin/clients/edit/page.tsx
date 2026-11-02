import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound, redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminLoading } from "@/components/admin/AdminUi";
import { EditClientView } from "@/components/admin/EditClientView";
import { requireAdmin } from "@/lib/adminSession";
import { getClient, getClientAdminData } from "@/lib/clients";

export const metadata: Metadata = {
  title: "Edit Client — Content Admin",
  robots: { index: false, follow: false },
};

async function ClientForm({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  await requireAdmin();
  const { id } = await searchParams;
  if (!id) {
    // A new client before the import would start the tab with just that row
    // and drop the built-in logos from the site, so import first
    if (!(await getClientAdminData()).imported) redirect("/admin/clients");
    return <EditClientView />;
  }

  const client = await getClient(id);
  if (!client) notFound();
  return <EditClientView client={client} />;
}

export default function AdminEditClientPage({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  return (
    <AdminShell activeKey="clients" breadcrumb="Content / Clients / Edit" title="Edit Client">
      <Suspense fallback={<AdminLoading />}>
        <ClientForm searchParams={searchParams} />
      </Suspense>
    </AdminShell>
  );
}
