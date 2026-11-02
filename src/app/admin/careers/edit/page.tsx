import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminLoading } from "@/components/admin/AdminUi";
import { EditPositionView } from "@/components/admin/EditPositionView";
import { requireAdmin } from "@/lib/adminSession";
import { getCareerPosition } from "@/lib/careers";

export const metadata: Metadata = {
  title: "Edit Position — Content Admin",
  robots: { index: false, follow: false },
};

async function PositionForm({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  await requireAdmin();
  const { id } = await searchParams;
  if (!id) return <EditPositionView />;

  const position = await getCareerPosition(id);
  if (!position) notFound();
  return <EditPositionView position={position} />;
}

export default function AdminEditPositionPage({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  return (
    <AdminShell activeKey="careers" breadcrumb="Content / Careers / Edit" title="Edit Position">
      <Suspense fallback={<AdminLoading />}>
        <PositionForm searchParams={searchParams} />
      </Suspense>
    </AdminShell>
  );
}
