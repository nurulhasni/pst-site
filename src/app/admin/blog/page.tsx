import type { Metadata } from "next";
import { Suspense } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminLoading } from "@/components/admin/AdminUi";
import { BlogPostsView } from "@/components/admin/BlogPostsView";
import { requireAdmin } from "@/lib/adminSession";
import { fallbackPosts } from "@/lib/blogModel";
import { getBlogAdminData } from "@/lib/blogPosts";
import { jakartaToday } from "@/lib/dates";

export const metadata: Metadata = {
  title: "Blog Posts — Content Admin",
  robots: { index: false, follow: false },
};

async function PostsData() {
  await requireAdmin();
  const { posts, imported } = await getBlogAdminData();
  // Before the first import, show what the Blog page displays today
  return <BlogPostsView posts={imported ? posts : fallbackPosts} imported={imported} today={jakartaToday()} />;
}

export default function AdminBlogPostsPage() {
  return (
    <AdminShell activeKey="blog" breadcrumb="Content / Blog Posts" title="Blog Posts">
      <Suspense fallback={<AdminLoading />}>
        <PostsData />
      </Suspense>
    </AdminShell>
  );
}
