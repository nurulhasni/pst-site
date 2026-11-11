import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

// CVs sent with the job application form. They live in .data/cv/ on the server
// under a random name, and only the admin Activity Log links to them. Like the
// rest of .data/, the folder is wiped whenever Render redeploys.

export const MAX_CV_MB = 5;

const types = {
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
} as const;
type CvType = keyof typeof types;

const folder = () => path.join(/*turbopackIgnore: true*/ process.cwd(), ".data", "cv");
const namePattern = /^[0-9a-f-]{36}\.(pdf|docx?)$/;

// Decide the type from the file's first bytes rather than trusting its name
function sniff(bytes: Uint8Array, name: string): CvType | null {
  const starts = (...sig: number[]) => sig.every((b, i) => bytes[i] === b);
  if (starts(0x25, 0x50, 0x44, 0x46)) return "pdf"; // %PDF
  if (starts(0xd0, 0xcf, 0x11, 0xe0)) return "doc"; // old Word
  // .docx is a zip file; only accept it when the name says so too
  if (starts(0x50, 0x4b, 0x03, 0x04) && /\.docx$/i.test(name)) return "docx";
  return null;
}

export class CvError extends Error {
  constructor(public code: "type" | "size") {
    super(code);
  }
}

// Returns the stored file name
export async function saveCv(file: File): Promise<string> {
  if (file.size > MAX_CV_MB * 1024 * 1024) throw new CvError("size");
  const bytes = new Uint8Array(await file.arrayBuffer());
  const type = sniff(bytes, file.name);
  if (!type) throw new CvError("type");
  const name = `${randomUUID()}.${type}`;
  await mkdir(folder(), { recursive: true });
  await writeFile(path.join(/*turbopackIgnore: true*/ folder(), name), bytes);
  return name;
}

export async function readCv(name: string): Promise<{ bytes: Uint8Array; contentType: string } | null> {
  if (!namePattern.test(name)) return null;
  try {
    const bytes = new Uint8Array(await readFile(path.join(/*turbopackIgnore: true*/ folder(), name)));
    return { bytes, contentType: types[name.split(".").pop() as CvType] };
  } catch {
    return null;
  }
}
