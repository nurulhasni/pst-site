import { readCv } from "@/lib/cvFiles";

// Downloads a CV linked from the Activity Log. Files have random names and the
// name is checked against a strict pattern, so nothing else on disk can be read.
export async function GET(_request: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  const cv = await readCv(file);
  if (!cv) return new Response("Not found", { status: 404 });
  return new Response(Buffer.from(cv.bytes), {
    headers: {
      "Content-Type": cv.contentType,
      "Content-Disposition": `attachment; filename="cv-${file}"`,
      "Cache-Control": "private, no-store",
      "X-Robots-Tag": "noindex",
    },
  });
}
