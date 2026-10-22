import { GatedArticle } from "@/components/sections/GatedArticle";
import { previewBlocks, type Post } from "@/lib/blog";

export function ArticleBody({ post, locked }: { post: Post; locked: boolean }) {
  const body = post.body ?? [{ type: "lead" as const, text: post.excerpt }];
  const blocks = locked ? body.slice(0, previewBlocks) : body;

  return <GatedArticle title={post.title} blocks={blocks} locked={locked} />;
}
