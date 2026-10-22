import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { SubscribersView } from "@/components/admin/SubscribersView";

export const metadata: Metadata = {
  title: "Subscribers — Content Admin",
  robots: { index: false, follow: false },
};

export default function AdminSubscribersPage() {
  return (
    <AdminShell activeKey="subscribers" breadcrumb="Audience / Subscribers" title="Subscribers">
      <SubscribersView />
    </AdminShell>
  );
}
