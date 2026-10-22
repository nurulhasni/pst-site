import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { ClientsView } from "@/components/admin/ClientsView";

export const metadata: Metadata = {
  title: "Clients — Content Admin",
  robots: { index: false, follow: false },
};

export default function AdminClientsPage() {
  return (
    <AdminShell activeKey="clients" breadcrumb="Content / Clients" title="Clients">
      <ClientsView />
    </AdminShell>
  );
}
