"use server";

import { cookies } from "next/headers";
import { unlockCookie } from "@/lib/blog";
import { currentPage, recordActivity, sheetsConfigured } from "@/lib/activityLog";
import { appendRow } from "@/lib/sheets";

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
};

export type UnlockState = {
  status: "idle" | "success" | "error";
  message: string;
  firstName: string;
  email: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function unlockArticle(
  _prev: UnlockState,
  formData: FormData,
): Promise<UnlockState> {
  const field = (name: string) => String(formData.get(name) ?? "").trim();
  const name = field("name");
  const email = field("email");

  if (!name || !email) {
    return {
      status: "error",
      message: "Please fill in your full name and email.",
      firstName: "",
      email: "",
    };
  }
  if (!emailPattern.test(email)) {
    return {
      status: "error",
      message: "Please enter a valid email address.",
      firstName: "",
      email: "",
    };
  }

  const updates = formData.get("updates") === "on";
  await recordActivity({
    type: "article_unlock",
    page: await currentPage(),
    name,
    email,
    company: field("company"),
    phone: field("phone"),
    detail: [field("from"), updates ? "Wants new articles and updates" : ""].filter(Boolean).join(" · "),
  });

  const store = await cookies();
  store.set(unlockCookie, "1", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    secure: process.env.NODE_ENV === "production",
  });
  return { status: "success", message: "", firstName: name.split(" ")[0], email };
}

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const field = (name: string) => String(formData.get(name) ?? "").trim();
  const name = field("name");
  const email = field("email");
  const company = field("company");
  const subject = field("subject");
  const message = field("message");
  const phone = field("phone");

  if (!name || !email || !message) {
    return {
      status: "error",
      message: "Please fill in your name, email and message.",
    };
  }
  if (!emailPattern.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  const logged = await recordActivity({
    type: "contact_form",
    page: await currentPage(),
    name,
    email,
    company,
    phone,
    detail: [subject, message].filter(Boolean).join(": "),
  });

  // The "Contacts" tab is kept for staff who already read it. Without Google
  // (the demo) the Activity Log alone holds the message.
  let sheetSaved = !sheetsConfigured();
  if (sheetsConfigured()) {
    try {
      await appendRow("Contacts", [new Date().toISOString(), name, email, company, subject, message, phone]);
      sheetSaved = true;
    } catch {
      sheetSaved = false;
    }
  }
  if (!logged && !sheetSaved) {
    return {
      status: "error",
      message:
        "Something went wrong. Please try again or email marketing@pst.co.id.",
    };
  }
  return {
    status: "success",
    message: "Thanks! Our team will get back to you soon.",
  };
}

export type ProfileState = {
  status: "idle" | "success" | "error";
  code: "" | "missing" | "email" | "server";
  name: string;
  email: string;
};

// Documents a visitor can download after leaving their details. The key goes
// into the "Downloads" Sheet tab; the label into the Activity Log.
const downloadDocs = {
  "company-profile": { type: "profile_download", label: "Company profile (PDF)" },
  "pcoe-certificate": { type: "certificate_download", label: "SAP Partner Center of Expertise certificate (PDF)" },
  "partneredge-certificate": { type: "certificate_download", label: "SAP PartnerEdge Silver Partner certificate (PDF)" },
} as const;
export type DownloadDoc = keyof typeof downloadDocs;

export async function requestProfile(
  _prev: ProfileState,
  formData: FormData,
): Promise<ProfileState> {
  const field = (name: string) => String(formData.get(name) ?? "").trim();
  const name = field("name");
  const organization = field("organization");
  const email = field("email");
  const docKey = (field("document") || "company-profile") as DownloadDoc;
  const doc = downloadDocs[docKey];
  if (!doc) return { status: "error", code: "server", name: "", email: "" };

  if (!name || !organization || !email) {
    return { status: "error", code: "missing", name: "", email: "" };
  }
  if (!emailPattern.test(email)) {
    return { status: "error", code: "email", name: "", email: "" };
  }

  const logged = await recordActivity({
    type: doc.type,
    page: await currentPage(),
    name,
    email,
    company: organization,
    detail: doc.label,
  });

  let sheetSaved = !sheetsConfigured();
  if (sheetsConfigured()) {
    try {
      await appendRow("Downloads", [new Date().toISOString(), name, organization, email, docKey]);
      sheetSaved = true;
    } catch {
      sheetSaved = false;
    }
  }
  if (!logged && !sheetSaved) return { status: "error", code: "server", name: "", email: "" };
  return { status: "success", code: "", name: name.split(" ")[0], email };
}
