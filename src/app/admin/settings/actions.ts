"use server";

import { cookies } from "next/headers";
import { MIN_PASSWORD_LENGTH, sessionCookie, signSession } from "@/lib/adminAuth";
import { failure, type FormState } from "@/lib/adminForms";
import { requireAdmin } from "@/lib/adminSession";
import { changePassword } from "@/lib/adminUsers";

const field = (formData: FormData, name: string) => String(formData.get(name) ?? "");

export async function updatePassword(_prev: FormState, formData: FormData): Promise<FormState> {
  const session = await requireAdmin();
  const current = field(formData, "currentPassword");
  const next = field(formData, "newPassword");
  const repeat = field(formData, "repeatPassword");

  if (!current || !next || !repeat) return { message: "Fill in all three password fields." };
  if (next.length < MIN_PASSWORD_LENGTH) return { message: `The new password needs at least ${MIN_PASSWORD_LENGTH} characters.` };
  if (next !== repeat) return { message: "The two new passwords don't match." };
  if (next === current) return { message: "The new password must be different from the current one." };

  try {
    const result = await changePassword(session.email, current, next);
    if (!result.ok) return { message: result.message };

    // Every older session now fails requireAdmin; give this browser a fresh one
    // that ends when the old one would have
    const issuedAt = Math.ceil(result.changedAt / 1000);
    const remaining = Math.max(session.exp - issuedAt, 60);
    const longLived = remaining > 60 * 60 * 12;
    (await cookies()).set(sessionCookie, signSession(session.email, remaining, issuedAt), {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: longLived ? remaining : undefined,
    });
    return { message: "Password changed. You're still signed in here; other devices will need to sign in again.", ok: true };
  } catch (error) {
    return failure(error);
  }
}
