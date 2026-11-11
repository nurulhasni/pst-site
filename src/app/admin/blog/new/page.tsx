import type { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminLoading } from "@/components/admin/AdminUi";
import { EditBlogPostView } from "@/components/admin/EditBlogPostView";
import { requireAdmin } from "@/lib/adminSession";
import { getBlogAdminData } from "@/lib/blogPosts";
import { jakartaToday } from "@/lib/dates";

export const metadata: Metadata = {
  title: "New Blog Post — Content Admin",
  robots: { index: false, follow: false },
};

async function PostForm() {
  await requireAdmin();
  // A new post before the import would start the tab with just that row and
  // drop the built-in articles from the Blog page, so import first
  if (!(await getBlogAdminData()).imported) redirect("/admin/blog");
  return <EditBlogPostView today={jakartaToday()} />;
}

export default function AdminNewBlogPostPage() {
  return (
    <AdminShell activeKey="blog" breadcrumb="Content / Blog Posts / New" title="New Blog Post">
      <Suspense fallback={<AdminLoading />}>
        <PostForm />
      </Suspense>
    </AdminShell>
  );
}
