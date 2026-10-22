import type { Metadata } from "next";
import { BlogPageView } from "@/components/views/BlogPageView";

export const metadata: Metadata = {
  title: "Blog — PT Prima Sistem Terpadu",
  description:
    "Company news, SAP insights and expert perspectives on digital transformation.",
};

export default function BlogPage() {
  return <BlogPageView />;
}
