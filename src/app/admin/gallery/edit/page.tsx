import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminLoading } from "@/components/admin/AdminUi";
import { EditGalleryPhotoView } from "@/components/admin/EditGalleryPhotoView";
import { requireAdmin } from "@/lib/adminSession";
import { getPhoto } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Edit Photo — Content Admin",
  robots: { index: false, follow: false },
};

async function PhotoForm({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  await requireAdmin();
  const { id } = await searchParams;
  const photo = id ? await getPhoto(id) : null;
  if (!photo) notFound();
  return <EditGalleryPhotoView photo={photo} />;
}

export default function AdminEditPhotoPage({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  return (
    <AdminShell activeKey="gallery" breadcrumb="Content / Gallery / Edit" title="Edit Photo">
      <Suspense fallback={<AdminLoading />}>
        <PhotoForm searchParams={searchParams} />
      </Suspense>
    </AdminShell>
  );
}
