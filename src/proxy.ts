import { NextResponse, type NextRequest } from "next/server";
import { readSession, sessionCookie } from "@/lib/adminAuth";

export function proxy(request: NextRequest) {
  const session = readSession(request.cookies.get(sessionCookie)?.value);
  const onLogin = request.nextUrl.pathname === "/admin/login";

  if (onLogin && session) return NextResponse.redirect(new URL("/admin", request.url));
  if (!onLogin && !session) return NextResponse.redirect(new URL("/admin/login", request.url));
  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
