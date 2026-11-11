import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound, redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminLoading } from "@/components/admin/AdminUi";
import { EditBlogPostView } from "@/components/admin/EditBlogPostView";
import { requireAdmin } from "@/lib/adminSession";
import { getBlogPost } from "@/lib/blogPosts";
import { jakartaToday } from "@/lib/dates";

export const metadata: Metadata = {
  title: "Edit Blog Post — Content Admin",
  robots: { index: false, follow: false },
};

async function PostForm({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  await requireAdmin();
  const { id } = await searchParams;
  if (!id) redirect("/admin/blog/new");

  const post = await getBlogPost(id);
  if (!post) notFound();
  return <EditBlogPostView post={post} today={jakartaToday()} />;
}

export default function AdminEditBlogPostPage({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  return (
    <AdminShell activeKey="blog" breadcrumb="Content / Blog Posts / Edit" title="Edit Blog Post">
      <Suspense fallback={<AdminLoading />}>
        <PostForm searchParams={searchParams} />
      </Suspense>
    </AdminShell>
  );
}
