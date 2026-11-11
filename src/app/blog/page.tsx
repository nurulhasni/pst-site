import type { Metadata } from "next";
import { BlogPageView } from "@/components/views/BlogPageView";
import { getPostSummaries } from "@/lib/blogPosts";

export const metadata: Metadata = {
  title: "Blog — PT Prima Sistem Terpadu",
  description:
    "Company news, SAP insights and expert perspectives on digital transformation.",
};

export default async function BlogPage() {
  return <BlogPageView posts={await getPostSummaries()} />;
}
