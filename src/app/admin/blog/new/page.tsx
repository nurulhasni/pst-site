import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { NewBlogPostView } from "@/components/admin/NewBlogPostView";

export const metadata: Metadata = {
  title: "New Blog Post — Content Admin",
  robots: { index: false, follow: false },
};

export default function AdminNewBlogPostPage() {
  return (
    <AdminShell activeKey="blog" breadcrumb="Content / Blog Posts / New" title="New Blog Post">
      <NewBlogPostView />
    </AdminShell>
  );
}
