import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { EditClientView } from "@/components/admin/EditClientView";

export const metadata: Metadata = {
  title: "Edit Client — Content Admin",
  robots: { index: false, follow: false },
};

export default function AdminEditClientPage() {
  return (
    <AdminShell activeKey="clients" breadcrumb="Content / Clients / Edit" title="Edit Client">
      <EditClientView />
    </AdminShell>
  );
}
