import type { Metadata } from "next";
import { Suspense } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminLoading } from "@/components/admin/AdminUi";
import { IndustriesView } from "@/components/admin/IndustriesView";
import { requireAdmin } from "@/lib/adminSession";
import { fallbackClients } from "@/lib/clientModel";
import { getClientAdminData, getIndustryAdminData } from "@/lib/clients";

export const metadata: Metadata = {
  title: "Industries — Content Admin",
  robots: { index: false, follow: false },
};

async function IndustriesData() {
  await requireAdmin();
  const [{ industries, imported }, { clients, imported: clientsImported }] = await Promise.all([getIndustryAdminData(), getClientAdminData()]);
  const clientIndustries = (clientsImported ? clients : fallbackClients).map((c) => c.industry);
  return <IndustriesView industries={industries} imported={imported} clientIndustries={clientIndustries} />;
}

export default function AdminIndustriesPage() {
  return (
    <AdminShell activeKey="clients" breadcrumb="Content / Clients / Industries" title="Industries">
      <Suspense fallback={<AdminLoading />}>
        <IndustriesData />
      </Suspense>
    </AdminShell>
  );
}
