import { createHmac, scryptSync, timingSafeEqual } from "node:crypto";

export const sessionCookie = "pst_admin";

export type AdminSession = { email: string; exp: number };

type AdminUser = { email: string; salt: string; hash: string };

// ADMIN_USERS holds comma-separated "email:salt:hash" entries.
// Generate one with `npm run hash-password -- you@pst.co.id`.
function adminUsers(): AdminUser[] {
  return (process.env.ADMIN_USERS ?? "")
    .split(",")
    .map((entry) => entry.trim().split(":"))
    .filter((parts) => parts.length === 3 && parts.every(Boolean))
    .map(([email, salt, hash]) => ({ email: email.toLowerCase(), salt, hash }));
}

function hashPassword(password: string, salt: string): Buffer {
  return scryptSync(password, Buffer.from(salt, "hex"), 64);
}

export function verifyCredentials(email: string, password: string): boolean {
  const user = adminUsers().find((u) => u.email === email.trim().toLowerCase());
  // Hash even for unknown emails so the response time doesn't reveal which accounts exist
  const actual = hashPassword(password, user?.salt ?? "00".repeat(16));
  if (!user) return false;

  const expected = Buffer.from(user.hash, "hex");
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

function sessionSecret(): string | null {
  const secret = process.env.SESSION_SECRET;
  return secret && secret.length >= 32 ? secret : null;
}

function sign(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

export function signSession(email: string, maxAgeSeconds: number): string {
  const secret = sessionSecret();
  if (!secret) throw new Error("SESSION_SECRET must be set to at least 32 characters");

  const session: AdminSession = {
    email: email.trim().toLowerCase(),
    exp: Math.floor(Date.now() / 1000) + maxAgeSeconds,
  };
  const payload = Buffer.from(JSON.stringify(session)).toString("base64url");
  return `${payload}.${sign(payload, secret)}`;
}

export function readSession(value: string | undefined): AdminSession | null {
  const secret = sessionSecret();
  if (!value || !secret) return null;

  const [payload, signature] = value.split(".");
  if (!payload || !signature) return null;

  const expected = Buffer.from(sign(payload, secret));
  const actual = Buffer.from(signature);
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) return null;

  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString()) as AdminSession;
    if (session.exp < Date.now() / 1000) return null;
    // Removing someone from ADMIN_USERS signs them out on their next request
    if (!adminUsers().some((u) => u.email === session.email)) return null;
    return session;
  } catch {
    return null;
  }
}
