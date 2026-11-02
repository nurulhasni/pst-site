import { readFile } from "node:fs/promises";
import path from "node:path";
import { imageTypes, resolveUpload } from "@/lib/uploads";

export async function GET(_request: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const parts = (await params).path;
  const file = resolveUpload(parts.join("/"));
  const type = imageTypes[path.extname(parts.at(-1) ?? "").slice(1).toLowerCase()];
  if (!file || !type) return new Response("Not found", { status: 404 });

  try {
    const body = await readFile(file);
    return new Response(body, {
      headers: {
        "Content-Type": type,
        // Every upload gets a new name, so a file never changes once it exists
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
