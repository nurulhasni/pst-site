import { NextResponse, type NextRequest } from "next/server";
import { readSession, sessionCookie } from "@/lib/adminAuth";

export function proxy(request: NextRequest) {
  const session = readSession(request.cookies.get(sessionCookie)?.value);
  const onLogin = request.nextUrl.pathname === "/admin/login";

  // The login page stays reachable with a signed cookie: requireAdmin sends
  // disabled accounts and sessions ended by a password change there, and
  // bouncing them back to /admin would loop.
  if (!onLogin && !session) return NextResponse.redirect(new URL("/admin/login", request.url));
  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
