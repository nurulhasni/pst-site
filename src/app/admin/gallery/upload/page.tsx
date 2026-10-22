import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { UploadGalleryView } from "@/components/admin/UploadGalleryView";

export const metadata: Metadata = {
  title: "Upload to Gallery — Content Admin",
  robots: { index: false, follow: false },
};

export default function AdminUploadGalleryPage() {
  return (
    <AdminShell activeKey="gallery" breadcrumb="Content / Gallery / Upload" title="Upload to Gallery">
      <UploadGalleryView />
    </AdminShell>
  );
}
