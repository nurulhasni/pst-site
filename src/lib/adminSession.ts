import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { readSession, sessionCookie, type AdminSession } from "@/lib/adminAuth";

// Every admin Server Action calls this before touching data. The proxy only
// redirects page visits; actions can be called directly, so they check again here.
export async function requireAdmin(): Promise<AdminSession> {
  const session = readSession((await cookies()).get(sessionCookie)?.value);
  if (!session) redirect("/admin/login");
  return session;
}
