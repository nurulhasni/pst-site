import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { EditPositionView } from "@/components/admin/EditPositionView";

export const metadata: Metadata = {
  title: "Edit Position — Content Admin",
  robots: { index: false, follow: false },
};

export default function AdminEditPositionPage() {
  return (
    <AdminShell activeKey="careers" breadcrumb="Content / Careers / Edit" title="Edit Position">
      <EditPositionView />
    </AdminShell>
  );
}
