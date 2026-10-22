import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { GalleryView } from "@/components/admin/GalleryView";

export const metadata: Metadata = {
  title: "Gallery — Content Admin",
  robots: { index: false, follow: false },
};

export default function AdminGalleryPage() {
  return (
    <AdminShell activeKey="gallery" breadcrumb="Content / Gallery" title="Gallery">
      <GalleryView />
    </AdminShell>
  );
}
