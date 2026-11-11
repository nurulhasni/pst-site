"use server";

import { headers } from "next/headers";
import { currentPage, recordActivity } from "@/lib/activityLog";
import { CvError, saveCv } from "@/lib/cvFiles";

export type ApplyState = {
  status: "idle" | "success" | "error";
  code: "" | "missing" | "email" | "gpa" | "cvType" | "cvSize" | "limit" | "server";
  name: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// A small in-memory limit so one person or script can't flood the CV folder.
// It resets when the server restarts, which is fine at this traffic.
const hits = new Map<string, number[]>();
function overLimit(key: string, max = 5, windowMs = 60 * 60 * 1000): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > max;
}

const fail = (code: ApplyState["code"]): ApplyState => ({ status: "error", code, name: "" });

export async function submitApplication(_prev: ApplyState, formData: FormData): Promise<ApplyState> {
  const field = (name: string, max = 160) => String(formData.get(name) ?? "").trim().slice(0, max);
  const name = field("name", 120);
  const email = field("email");
  const phone = field("phone", 40);
  const position = field("position", 120);
  const university = field("university");
  const major = field("major");
  const gpaText = field("gpa", 10).replace(",", ".");
  const cv = formData.get("cv");

  if (!name || !email || !position || !university || !gpaText || !(cv instanceof File) || cv.size === 0) return fail("missing");
  if (!emailPattern.test(email)) return fail("email");
  const gpa = Number(gpaText);
  if (!/^\d(\.\d{1,2})?$/.test(gpaText) || gpa < 0 || gpa > 4) return fail("gpa");

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0].trim() || h.get("x-real-ip") || "unknown";
  if (overLimit(ip)) return fail("limit");

  let file = "";
  try {
    file = await saveCv(cv);
  } catch (error) {
    if (error instanceof CvError) return fail(error.code === "size" ? "cvSize" : "cvType");
    console.error("[career] could not save CV:", error);
    return fail("server");
  }

  const saved = await recordActivity({
    type: "job_application",
    page: await currentPage(),
    name,
    email,
    phone,
    company: [university, major].filter(Boolean).join(" · "),
    detail: `${position} · GPA ${gpa.toFixed(2)}`,
    file,
  });
  if (!saved) return fail("server");
  return { status: "success", code: "", name: name.split(" ")[0] };
}
