import { headers } from "next/headers";
import { createRecord } from "@/lib/sheetStore";

// Every job application from the Career page becomes one row in the
// "Applications" tab (its own spreadsheet file, GOOGLE_SHEET_APPLICATIONS).
// The tab and its header row are created on the first application. HR can use
// the status and notes columns freely; the site only ever adds rows.

export const applicationsTab = "Applications";
export const applicationColumns = [
  "submitted_at",
  "position",
  "name",
  "email",
  "phone",
  "university",
  "major",
  "gpa",
  "cv_link",
  "cv_file",
  "status",
  "notes",
  "page",
];

export type Application = {
  position: string;
  name: string;
  email: string;
  phone: string;
  university: string;
  major: string;
  gpa: string;
  cvFile: string;
  page: string;
};

// The CV link opens through the admin, so only signed-in staff can download it
async function cvLink(file: string): Promise<string> {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? (host?.startsWith("localhost") ? "http" : "https");
  const path = `/admin/applications/cv/${encodeURIComponent(file)}`;
  return host ? `${proto}://${host}${path}` : path;
}

// Returns false instead of throwing, so the visitor's application still goes
// through when only the Sheet is unavailable (the Activity Log has a copy)
export async function saveApplication(a: Application): Promise<boolean> {
  try {
    await createRecord(applicationsTab, applicationColumns, {
      submitted_at: new Date().toISOString(),
      position: a.position,
      name: a.name,
      email: a.email,
      phone: a.phone,
      university: a.university,
      major: a.major,
      gpa: a.gpa,
      cv_link: await cvLink(a.cvFile),
      cv_file: a.cvFile,
      status: "New",
      notes: "",
      page: a.page,
    });
    return true;
  } catch (error) {
    console.error("[career] could not save the application to the Sheet:", error);
    return false;
  }
}
