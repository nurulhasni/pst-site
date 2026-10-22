"use server";

import { cookies } from "next/headers";
import { unlockCookie } from "@/lib/blog";
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

  try {
    await appendRow("Contacts", [
      new Date().toISOString(),
      name,
      email,
      company,
      subject,
      message,
      phone,
    ]);
    return {
      status: "success",
      message: "Thanks! Our team will get back to you soon.",
    };
  } catch {
    return {
      status: "error",
      message:
        "Something went wrong. Please try again or email marketing@pst.co.id.",
    };
  }
}

export type ProfileState = {
  status: "idle" | "success" | "error";
  code: "" | "missing" | "email" | "server";
  name: string;
  email: string;
};

export async function requestProfile(
  _prev: ProfileState,
  formData: FormData,
): Promise<ProfileState> {
  const field = (name: string) => String(formData.get(name) ?? "").trim();
  const name = field("name");
  const organization = field("organization");
  const email = field("email");

  if (!name || !organization || !email) {
    return { status: "error", code: "missing", name: "", email: "" };
  }
  if (!emailPattern.test(email)) {
    return { status: "error", code: "email", name: "", email: "" };
  }

  try {
    await appendRow("Downloads", [new Date().toISOString(), name, organization, email, "company-profile"]);
    return { status: "success", code: "", name: name.split(" ")[0], email };
  } catch {
    return { status: "error", code: "server", name: "", email: "" };
  }
}
