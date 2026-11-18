import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

export const sessionCookie = "pst_admin";

// iat = when the session was signed, so a password change can end older sessions
export type AdminSession = { email: string; exp: number; iat: number };

export const MIN_PASSWORD_LENGTH = 12;

// A stored password is "salt:hash" (both hex), the same format in the
// Admin Users Sheet tab and in ADMIN_USERS entries ("email:salt:hash").
export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  return `${salt}:${scrypt(password, salt).toString("hex")}`;
}

function scrypt(password: string, salt: string): Buffer {
  return scryptSync(password, Buffer.from(salt, "hex"), 64);
}

// Always hashes, even with nothing stored, so the response time doesn't reveal
// which accounts exist
export function passwordMatches(password: string, stored: string | undefined): boolean {
  const [salt, hash] = (stored ?? "").split(":");
  const actual = scrypt(password, salt && hash ? salt : "00".repeat(16));
  if (!salt || !hash) return false;
  const expected = Buffer.from(hash, "hex");
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

// Emergency accounts from the server's .env. ADMIN_USERS holds comma-separated
// "email:salt:hash" entries; generate one with `npm run hash-password -- you@pst.co.id`.
// They keep working when the Sheet can't be read, and can only be changed in .env.
export function envAdminPassword(email: string): string | undefined {
  const wanted = email.trim().toLowerCase();
  for (const entry of (process.env.ADMIN_USERS ?? "").split(",")) {
    const [address, salt, hash] = entry.trim().split(":");
    if (address && salt && hash && address.toLowerCase() === wanted) return `${salt}:${hash}`;
  }
  return undefined;
}

export function envAdminEmails(): string[] {
  return (process.env.ADMIN_USERS ?? "")
    .split(",")
    .map((entry) => entry.trim().split(":"))
    .filter((parts) => parts.length === 3 && parts.every(Boolean))
    .map(([email]) => email.toLowerCase());
}

function sessionSecret(): string | null {
  const secret = process.env.SESSION_SECRET;
  return secret && secret.length >= 32 ? secret : null;
}

function sign(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

export function signSession(email: string, maxAgeSeconds: number, issuedAt = Math.floor(Date.now() / 1000)): string {
  const secret = sessionSecret();
  if (!secret) throw new Error("SESSION_SECRET must be set to at least 32 characters");

  const session: AdminSession = {
    email: email.trim().toLowerCase(),
    exp: issuedAt + maxAgeSeconds,
    iat: issuedAt,
  };
  const payload = Buffer.from(JSON.stringify(session)).toString("base64url");
  return `${payload}.${sign(payload, secret)}`;
}

// Checks the signature and expiry only. Whether the account is still active
// (and the password unchanged) needs the Sheet, so requireAdmin checks that.
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
    if (!session.email || session.exp < Date.now() / 1000) return null;
    // Sessions signed before iat existed count as issued at the start of time,
    // so any recorded password change ends them
    return { ...session, iat: session.iat ?? 0 };
  } catch {
    return null;
  }
}
