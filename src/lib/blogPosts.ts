import { cacheLife, cacheTag } from "next/cache";
import { blogTab, fallbackPosts, isDate, toBlogPost, toPublicPost, toSummary, type BlogPost, type PostSummary, type PublicPost } from "@/lib/blogModel";
import { jakartaToday } from "@/lib/dates";
import { listRecords, type SheetRecord } from "@/lib/sheetStore";
import { sheetTag } from "@/lib/sheets";

const newestFirst = (a: BlogPost, b: BlogPost) => b.date.localeCompare(a.date);

async function readPosts(): Promise<SheetRecord[] | null> {
  try {
    return await listRecords(blogTab);
  } catch {
    // Google unreachable or not configured: keep the blog up with the built-in articles
    return null;
  }
}

// Published posts dated today or earlier, newest first, with the featured one
// (or the newest, when none is marked) in front
export function arrangePosts(all: BlogPost[], today: string): BlogPost[] {
  const listed = all.filter((p) => p.published && p.slug && p.title && (!isDate(p.date) || p.date <= today)).sort(newestFirst);
  const featured = listed.find((p) => p.featured);
  return featured ? [featured, ...listed.filter((p) => p !== featured)] : listed;
}

async function publishedPosts(): Promise<PublicPost[]> {
  const rows = await readPosts();
  return arrangePosts(rows ? rows.map(toBlogPost) : fallbackPosts, jakartaToday()).map(toPublicPost);
}

// The cards on the Blog page; the first one is the featured post
export async function getPostSummaries(): Promise<PostSummary[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag(sheetTag(blogTab));

  return (await publishedPosts()).map(toSummary);
}

// One article with up to three others to read next: same category first, then the newest
export async function getPublicPost(slug: string): Promise<{ post: PublicPost; related: PostSummary[] } | null> {
  "use cache";
  cacheLife("minutes");
  cacheTag(sheetTag(blogTab));

  const all = await publishedPosts();
  const post = all.find((p) => p.slug === slug);
  if (!post) return null;
  const others = all.filter((p) => p !== post);
  const related = [...others.filter((p) => p.category === post.category), ...others.filter((p) => p.category !== post.category)].slice(0, 3);
  return { post, related: related.map(toSummary) };
}

export async function getBlogAdminData() {
  const rows = await listRecords(blogTab);
  return { posts: (rows ?? []).map(toBlogPost).sort(newestFirst), imported: rows !== null };
}

export async function getBlogPost(id: string): Promise<BlogPost | null> {
  const rows = await listRecords(blogTab);
  const row = rows?.find((r) => r.id === id);
  return row ? toBlogPost(row) : null;
}
