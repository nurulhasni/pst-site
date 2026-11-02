import { randomUUID } from "node:crypto";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";

// Images uploaded from the admin live outside the code folder, so a redeploy
// never wipes them. They are served by app/uploads/[...path]/route.ts.
// Set UPLOAD_DIR on the server to put them somewhere that gets backed up.
export function uploadRoot(): string {
  return path.resolve(process.env.UPLOAD_DIR || path.join(process.cwd(), "uploads"));
}

export const uploadFolders = ["clients", "gallery", "stories", "blog", "files"] as const;
export type UploadFolder = (typeof uploadFolders)[number];

export const imageTypes: Record<string, string> = {
  png: "image/png",
  jpg: "image/jpeg",
  webp: "image/webp",
  gif: "image/gif",
};

// Decide the type from the file's first bytes rather than trusting its name or
// the browser's label. SVG is left out on purpose: it can carry scripts.
function sniffImage(bytes: Uint8Array): string | null {
  const starts = (...sig: number[]) => sig.every((b, i) => bytes[i] === b);
  if (starts(0x89, 0x50, 0x4e, 0x47)) return "png";
  if (starts(0xff, 0xd8, 0xff)) return "jpg";
  if (starts(0x47, 0x49, 0x46, 0x38)) return "gif";
  if (starts(0x52, 0x49, 0x46, 0x46) && String.fromCharCode(...bytes.slice(8, 12)) === "WEBP") return "webp";
  return null;
}

export async function saveImage(file: File, folder: UploadFolder, maxBytes: number): Promise<string> {
  if (file.size === 0) throw new Error("The selected file is empty.");
  if (file.size > maxBytes) throw new Error(`Images must be ${Math.round(maxBytes / 1024 / 1024)} MB or smaller.`);

  const bytes = new Uint8Array(await file.arrayBuffer());
  const ext = sniffImage(bytes);
  if (!ext) throw new Error("Please upload a PNG, JPG, WebP or GIF image.");

  const name = `${Date.now()}-${randomUUID().slice(0, 8)}.${ext}`;
  const dir = path.join(uploadRoot(), folder);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, name), bytes);
  return `/uploads/${folder}/${name}`;
}

// Only removes files this site uploaded; built-in images under /images stay put.
export async function deleteUpload(url: string): Promise<void> {
  const file = resolveUpload(url.replace(/^\/uploads\//, ""));
  if (!url.startsWith("/uploads/") || !file) return;
  await unlink(file).catch(() => {});
}

// Maps a request path to a file inside the upload root, refusing anything that
// would step outside it.
export function resolveUpload(relative: string): string | null {
  const root = uploadRoot();
  const file = path.resolve(root, relative);
  if (!file.startsWith(root + path.sep)) return null;
  const folder = path.relative(root, file).split(path.sep)[0];
  if (!(uploadFolders as readonly string[]).includes(folder)) return null;
  return file;
}
