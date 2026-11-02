"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { sessionCookie, signSession, verifyCredentials } from "@/lib/adminAuth";

export type LoginState = { message: string; email: string };

const rememberSeconds = 60 * 60 * 24 * 30;
const sessionSeconds = 60 * 60 * 12;
const maxFailures = 5;
const lockMs = 15 * 60 * 1000;

// The site runs as a single Node process on PST's server, so an in-memory
// counter is enough to slow down password guessing.
const failures = new Map<string, { count: number; until: number }>();

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const remember = formData.get("remember") === "on";

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0].trim() || "local";
  const record = failures.get(ip);
  if (record && record.count >= maxFailures && record.until > Date.now()) {
    return { message: "Too many attempts. Please wait 15 minutes and try again.", email };
  }

  if (!email || !password) return { message: "Please enter your email and password.", email };

  if (!verifyCredentials(email, password)) {
    const count = record && record.until > Date.now() ? record.count + 1 : 1;
    failures.set(ip, { count, until: Date.now() + lockMs });
    return { message: "Incorrect email or password.", email };
  }

  failures.delete(ip);
  (await cookies()).set(sessionCookie, signSession(email, remember ? rememberSeconds : sessionSeconds), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    // Without "remember me" the cookie ends with the browser session
    maxAge: remember ? rememberSeconds : undefined,
  });
  redirect("/admin");
}

export async function logout() {
  (await cookies()).delete(sessionCookie);
  redirect("/admin/login");
}
