import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { BlogDetailView } from "@/components/views/BlogDetailView";
import { previewBlocks, unlockCookie } from "@/lib/blog";
import { fallbackPosts } from "@/lib/blogModel";
import { getPostSummaries, getPublicPost } from "@/lib/blogPosts";

// Posts added in the admin after a build are rendered the first time they are opened
export async function generateStaticParams() {
  const posts = await getPostSummaries();
  // The build needs at least one page to check, even when every post is a draft
  return (posts.length ? posts : fallbackPosts.slice(0, 1)).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const found = await getPublicPost(slug);
  if (!found) return {};
  const { post } = found;
  return {
    title: post.metaTitle || `${post.title} — PT Prima Sistem Terpadu`,
    description: post.metaDescription || post.excerpt,
  };
}

async function BlogDetailContent({ slug }: { slug: string }) {
  const found = await getPublicPost(slug);
  if (!found) notFound();
  const { post, related } = found;

  const unlocked = (await cookies()).get(unlockCookie)?.value === "1";
  const locked = post.gated && !unlocked;
  // A locked article only sends its opening to the browser
  const shown = locked ? { ...post, body: post.body.slice(0, previewBlocks), bodyId: post.bodyId.slice(0, previewBlocks) } : post;

  return <BlogDetailView post={shown} locked={locked} related={related} />;
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <Suspense fallback={null}>
      <BlogDetailContent slug={slug} />
    </Suspense>
  );
}
