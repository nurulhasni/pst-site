import type { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminLoading } from "@/components/admin/AdminUi";
import { UploadGalleryView } from "@/components/admin/UploadGalleryView";
import { requireAdmin } from "@/lib/adminSession";
import { getGalleryAdminData } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Upload to Gallery — Content Admin",
  robots: { index: false, follow: false },
};

async function UploadForm() {
  await requireAdmin();
  const { photos, imported } = await getGalleryAdminData();
  // Uploading first would start the tab with only the new photos and drop the
  // built-in ones from the site, so send the admin to import them first
  if (!imported) redirect("/admin/gallery");
  const nextOrder = photos.reduce((max, p) => Math.max(max, p.order < 999 ? p.order : 0), 0) + 1;
  return <UploadGalleryView nextOrder={nextOrder} />;
}

export default function AdminUploadGalleryPage() {
  return (
    <AdminShell activeKey="gallery" breadcrumb="Content / Gallery / Upload" title="Upload to Gallery">
      <Suspense fallback={<AdminLoading />}>
        <UploadForm />
      </Suspense>
    </AdminShell>
  );
}
