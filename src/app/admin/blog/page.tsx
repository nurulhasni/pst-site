import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { BlogPostsView } from "@/components/admin/BlogPostsView";

export const metadata: Metadata = {
  title: "Blog Posts — Content Admin",
  robots: { index: false, follow: false },
};

export default function AdminBlogPostsPage() {
  return (
    <AdminShell activeKey="blog" breadcrumb="Content / Blog Posts" title="Blog Posts">
      <BlogPostsView />
    </AdminShell>
  );
}
