import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { BlogDetailView } from "@/components/views/BlogDetailView";
import { getPost, posts, unlockCookie, type Post } from "@/lib/blog";

const relatedSlugs = [
  "why-sap-s4hana-matters-for-modern-enterprises",
  "the-future-of-cloud-erp-solutions",
  "5-ways-to-optimize-your-business-processes",
];

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} — PT Prima Sistem Terpadu`,
    description: post.excerpt,
  };
}

async function BlogDetailContent({ slug }: { slug: string }) {
  const post = getPost(slug);
  if (!post) notFound();

  const unlocked = (await cookies()).get(unlockCookie)?.value === "1";
  const related = relatedSlugs
    .map((item) => getPost(item))
    .filter((item): item is Post => Boolean(item) && item?.slug !== post.slug)
    .map(({ slug: relatedSlug, title, category }) => ({ slug: relatedSlug, title, category }));

  return <BlogDetailView post={post} locked={post.gated && !unlocked} related={related} />;
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
