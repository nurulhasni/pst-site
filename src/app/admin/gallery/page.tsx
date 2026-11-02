import type { Metadata } from "next";
import { Suspense } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminLoading } from "@/components/admin/AdminUi";
import { GalleryView } from "@/components/admin/GalleryView";
import { requireAdmin } from "@/lib/adminSession";
import { getGalleryAdminData } from "@/lib/gallery";
import { fallbackPhotos } from "@/lib/galleryModel";

export const metadata: Metadata = {
  title: "Gallery — Content Admin",
  robots: { index: false, follow: false },
};

async function GalleryData() {
  await requireAdmin();
  const { photos, imported } = await getGalleryAdminData();
  // Before the first import, show what the Gallery page displays today
  return <GalleryView photos={imported ? photos : fallbackPhotos} imported={imported} />;
}

export default function AdminGalleryPage() {
  return (
    <AdminShell activeKey="gallery" breadcrumb="Content / Gallery" title="Gallery">
      <Suspense fallback={<AdminLoading />}>
        <GalleryData />
      </Suspense>
    </AdminShell>
  );
}
