import { GatedArticle } from "@/components/sections/GatedArticle";
import { previewBlocks, type Block } from "@/lib/blog";

export function ArticleBody({ post, locked }: { post: { title: string; excerpt: string; body?: Block[] }; locked: boolean }) {
  const body = post.body?.length ? post.body : [{ type: "lead" as const, text: post.excerpt }];
  const blocks = locked ? body.slice(0, previewBlocks) : body;

  return <GatedArticle title={post.title} blocks={blocks} locked={locked} />;
}
