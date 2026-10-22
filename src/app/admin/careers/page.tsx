import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { CareersView } from "@/components/admin/CareersView";

export const metadata: Metadata = {
  title: "Careers — Content Admin",
  robots: { index: false, follow: false },
};

export default function AdminCareersPage() {
  return (
    <AdminShell activeKey="careers" breadcrumb="Content / Careers" title="Careers">
      <CareersView />
    </AdminShell>
  );
}
