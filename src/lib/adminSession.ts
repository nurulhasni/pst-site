import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { readSession, sessionCookie, type AdminSession } from "@/lib/adminAuth";
import { sessionStillValid } from "@/lib/adminUsers";

// Every admin page and Server Action calls this before touching data. The proxy
// only redirects page visits; actions can be called directly, so they check again here.
export async function requireAdmin(): Promise<AdminSession> {
  // The session check reads the clock, so keep it out of prerendering
  await connection();
  const session = readSession((await cookies()).get(sessionCookie)?.value);
  // The proxy only checks the signature; a disabled account or a changed
  // password is caught here
  if (!session || !(await sessionStillValid(session))) redirect("/admin/login");
  return session;
}
