import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { readSession, sessionCookie, type AdminSession } from "@/lib/adminAuth";
import { sessionAccount, type SessionAccount } from "@/lib/adminUsers";

export type SignedInAdmin = AdminSession & SessionAccount;

// Where someone still on a temporary password is sent until they change it
export const changePasswordPath = "/admin/settings";

// Every admin page and Server Action calls this before touching data. The proxy
// only redirects page visits; actions can be called directly, so they check again here.
// Only the Settings page and the change-password action pass allowTemporaryPassword.
export async function requireAdmin({ allowTemporaryPassword = false } = {}): Promise<SignedInAdmin> {
  // The session check reads the clock, so keep it out of prerendering
  await connection();
  const session = readSession((await cookies()).get(sessionCookie)?.value);
  // The proxy only checks the signature; a disabled account or a changed
  // password is caught here
  const account = session ? await sessionAccount(session) : null;
  if (!session || !account) redirect("/admin/login");
  if (account.mustChangePassword && !allowTemporaryPassword) redirect(changePasswordPath);
  return { ...session, ...account };
}
