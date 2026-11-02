import type { Metadata } from "next";
import { Suspense } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminLoading } from "@/components/admin/AdminUi";
import { CareersView } from "@/components/admin/CareersView";
import { requireAdmin } from "@/lib/adminSession";
import { fallbackFaqs, fallbackPositions } from "@/lib/careerModel";
import { getCareerAdminData } from "@/lib/careers";

export const metadata: Metadata = {
  title: "Careers — Content Admin",
  robots: { index: false, follow: false },
};

async function CareersData() {
  await requireAdmin();
  const data = await getCareerAdminData();
  return data.imported ? (
    <CareersView positions={data.positions} faqs={data.faqs} imported />
  ) : (
    // Before the first import, show what the site displays today so the admin knows what will be copied
    <CareersView positions={fallbackPositions} faqs={fallbackFaqs} imported={false} />
  );
}

export default function AdminCareersPage() {
  return (
    <AdminShell activeKey="careers" breadcrumb="Content / Careers" title="Careers">
      <Suspense fallback={<AdminLoading />}>
        <CareersData />
      </Suspense>
    </AdminShell>
  );
}
