"use server";

import { cookies } from "next/headers";
import { refresh } from "next/cache";
import { redirect } from "next/navigation";
import { MIN_PASSWORD_LENGTH, sessionCookie, signSession } from "@/lib/adminAuth";
import { emailPattern, failure, text, type FormState } from "@/lib/adminForms";
import { requireAdmin } from "@/lib/adminSession";
import { addAdminUser, adminRoles, changePassword, toRole, updateAdminUser, type AccountChange, type AccountUpdate } from "@/lib/adminUsers";

const field = (formData: FormData, name: string) => String(formData.get(name) ?? "");

// The temporary password is shown once in the result and never stored in plain text
export type AccountFormState = FormState & { tempPassword?: string; email?: string };

const fromChange = (change: AccountChange, email: string): AccountFormState =>
  change.ok ? { message: change.message, ok: true, tempPassword: change.tempPassword, email } : { message: change.message };

const notAdmin: AccountFormState = { message: "Only an Admin can manage accounts." };

export async function addUser(_prev: AccountFormState, formData: FormData): Promise<AccountFormState> {
  const session = await requireAdmin();
  if (session.role !== "Admin") return notAdmin;

  const email = text(formData, "email").toLowerCase();
  const name = text(formData, "name");
  const role = text(formData, "role");
  if (!emailPattern.test(email)) return { message: "Enter a valid email address." };
  if (!name) return { message: "Enter the person's name." };
  if (!adminRoles.includes(role as (typeof adminRoles)[number])) return { message: "Choose a role." };

  try {
    const result = fromChange(await addAdminUser({ email, name, role: toRole(role) }), email);
    if (result.ok) refresh();
    return result;
  } catch (error) {
    return failure(error);
  }
}

// One action for the buttons on each account row; the clicked button's
// name="intent" says which change to make
export async function manageUser(_prev: AccountFormState, formData: FormData): Promise<AccountFormState> {
  const session = await requireAdmin();
  if (session.role !== "Admin") return notAdmin;

  const email = text(formData, "email").toLowerCase();
  const intent = text(formData, "intent");
  const change: AccountUpdate | null =
    intent === "reset"
      ? { kind: "reset" }
      : intent === "enable" || intent === "disable"
        ? { kind: "status", active: intent === "enable" }
        : intent === "make-admin" || intent === "make-editor"
          ? { kind: "role", role: intent === "make-admin" ? "Admin" : "Editor" }
          : null;
  if (!email || !change) return { message: "Unknown action. Reload and try again." };

  try {
    const result = fromChange(await updateAdminUser(session.email, email, change), email);
    if (result.ok) refresh();
    return result;
  } catch (error) {
    return failure(error);
  }
}

export async function updatePassword(_prev: FormState, formData: FormData): Promise<FormState> {
  const session = await requireAdmin({ allowTemporaryPassword: true });
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
  } catch (error) {
    return failure(error);
  }
  // Replacing a temporary password unlocks the rest of the admin
  if (session.mustChangePassword) redirect("/admin");
  return { message: "Password changed. You're still signed in here; other devices will need to sign in again.", ok: true };
}
