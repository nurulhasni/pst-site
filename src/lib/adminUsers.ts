import { randomInt } from "node:crypto";
import { envAdminEmails, envAdminPassword, hashPassword, passwordMatches, type AdminSession } from "@/lib/adminAuth";
import { createRecord, listRecords, updateRecord, type SheetRecord } from "@/lib/sheetStore";

// Admin accounts live in the "Admin Users" tab, by default in a spreadsheet of
// its own (GOOGLE_SHEET_ADMIN_USERS) shared only with IT and the service account.
// People with role Admin add accounts, reset passwords and change roles under
// Settings > Admin users; a new or reset account gets a temporary password that
// must be changed at the next sign-in. Accounts in ADMIN_USERS (.env) stay as
// an emergency way in and always count as Admin.

export const adminUsersTab = "Admin Users";
export const adminUserColumns = ["email", "name", "status", "role", "password_hash", "password_changed_at", "last_login", "must_change_password"];

export const adminRoles = ["Admin", "Editor"] as const;
export type AdminRole = (typeof adminRoles)[number];

// An empty or unknown role is the smaller one, so a typo in the Sheet never
// hands out more access
export const toRole = (value: string | undefined): AdminRole => ((value ?? "").trim().toLowerCase() === "admin" ? "Admin" : "Editor");

export type AdminUser = {
  id: string;
  email: string;
  name: string;
  active: boolean;
  role: AdminRole;
  mustChangePassword: boolean;
  passwordHash: string;
  passwordChangedAt: string;
  lastLogin: string;
  source: "sheet" | "env";
};

// The hash tool prints a "salt:hash" line for the Sheet and an
// "email:salt:hash" line for .env; accept either in the Sheet.
const sheetHash = (value: string | undefined): string => {
  const parts = (value ?? "").replace(/\s+/g, "").split(":");
  return parts.length === 3 && parts[0].includes("@") ? `${parts[1]}:${parts[2]}` : parts.join(":");
};

const toUser = (r: SheetRecord): AdminUser => ({
  id: r.id,
  email: (r.email ?? "").trim().toLowerCase(),
  name: r.name ?? "",
  // Only an explicit Active lets someone in, so a typo locks rather than opens
  active: (r.status ?? "").trim().toLowerCase() === "active",
  role: toRole(r.role),
  mustChangePassword: (r.must_change_password ?? "").trim().toLowerCase() === "yes",
  passwordHash: sheetHash(r.password_hash),
  passwordChangedAt: r.password_changed_at ?? "",
  lastLogin: r.last_login ?? "",
  source: "sheet",
});

// requireAdmin runs on every admin page and action, so keep the Sheet read
// for a short while. Own writes clear it right away.
const cacheMs = 30_000;
let cached: { users: AdminUser[]; at: number } | null = null;

async function sheetUsers(): Promise<AdminUser[] | null> {
  if (cached && Date.now() - cached.at < cacheMs) return cached.users;
  try {
    const rows = await listRecords(adminUsersTab);
    const users = (rows ?? []).map(toUser).filter((u) => u.email);
    cached = { users, at: Date.now() };
    return users;
  } catch {
    // Google unreachable: keep the last list we read, or report "unknown"
    return cached?.users ?? null;
  }
}

function forget() {
  cached = null;
}

// Sheet accounts first; .env accounts not in the Sheet are added after them
export async function listAdminUsers(): Promise<{ users: AdminUser[]; sheetReadable: boolean }> {
  const fromSheet = await sheetUsers();
  const users = [...(fromSheet ?? [])];
  for (const email of envAdminEmails()) {
    if (!users.some((u) => u.email === email)) {
      users.push({ id: `env-${email}`, email, name: "", active: true, role: "Admin", mustChangePassword: false, passwordHash: "", passwordChangedAt: "", lastLogin: "", source: "env" });
    }
  }
  return { users, sheetReadable: fromSheet !== null };
}

async function sheetUser(email: string): Promise<AdminUser | undefined> {
  const wanted = email.trim().toLowerCase();
  return (await sheetUsers())?.find((u) => u.email === wanted);
}

// A Sheet row decides for its email; the .env entry is used only when the
// Sheet has no row for that email.
export async function verifyLogin(email: string, password: string): Promise<boolean> {
  const user = await sheetUser(email);
  let ok: boolean;
  let reason = "";
  if (user) {
    ok = passwordMatches(password, user.passwordHash);
    if (!/^[0-9a-f]{32}:[0-9a-f]{128}$/i.test(user.passwordHash)) {
      reason = "password_hash in the Admin Users tab is not a full salt:hash line (paste it again from npm run hash-password)";
    } else if (!ok) {
      reason = "wrong password";
    } else if (!user.active) {
      reason = 'status is not "Active" in the Admin Users tab';
    }
    ok = ok && user.active;
  } else {
    ok = passwordMatches(password, envAdminPassword(email));
    if (!ok) reason = envAdminPassword(email) ? "wrong password (.env account)" : "no row in the Admin Users tab and not in ADMIN_USERS";
  }
  // The login page shows one generic message so it can't be used to find out
  // which emails have accounts; IT sees the real reason in the server log.
  if (!ok) console.warn(`[admin login] ${email.trim().toLowerCase()} refused: ${reason || "unknown"}`);
  return ok;
}

export async function recordLogin(email: string): Promise<void> {
  const user = await sheetUser(email);
  if (!user) return;
  try {
    await updateRecord(adminUsersTab, adminUserColumns, user.id, { last_login: new Date().toISOString() });
    forget();
  } catch {
    // A missing timestamp shouldn't stop someone from signing in
  }
}

export type SessionAccount = { role: AdminRole; mustChangePassword: boolean };

// The account behind a signed session, or null when it may no longer sign in
// (disabled, removed, or its password changed after the session was signed)
export async function sessionAccount(session: AdminSession): Promise<SessionAccount | null> {
  const users = await sheetUsers();
  const user = users?.find((u) => u.email === session.email);
  if (user) {
    if (!user.active) return null;
    // A password change ends every session signed before it
    const changed = Date.parse(user.passwordChangedAt);
    if (!Number.isNaN(changed) && session.iat * 1000 < changed) return null;
    return { role: user.role, mustChangePassword: user.mustChangePassword };
  }
  if (envAdminPassword(session.email)) return { role: "Admin", mustChangePassword: false };
  // The Sheet couldn't be read at all: trust the signed session for now rather
  // than lock everyone out during a Google outage, but with Editor rights only
  // since the role is unknown
  return users === null ? { role: "Editor", mustChangePassword: false } : null;
}

export type PasswordChange = { ok: true; changedAt: number } | { ok: false; message: string };

export async function changePassword(email: string, current: string, next: string): Promise<PasswordChange> {
  forget();
  const user = await sheetUser(email);
  if (!user) {
    return { ok: false, message: "This account is set in the server's .env file, so its password can only be changed there by IT." };
  }
  if (!user.active || !passwordMatches(current, user.passwordHash)) {
    return { ok: false, message: "Your current password is incorrect." };
  }

  const changedAt = Date.now();
  await updateRecord(adminUsersTab, adminUserColumns, user.id, {
    password_hash: hashPassword(next),
    password_changed_at: new Date(changedAt).toISOString(),
    must_change_password: "",
  });
  forget();
  return { ok: true, changedAt };
}

// Readable temporary passwords: no 0/O or 1/l/I, so they survive being read
// out or copied from a chat message
const tempAlphabet = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";

function temporaryPassword(): string {
  return Array.from({ length: 14 }, () => tempAlphabet[randomInt(tempAlphabet.length)]).join("");
}

export type AccountChange = { ok: true; message: string; tempPassword?: string } | { ok: false; message: string };

export async function addAdminUser(input: { email: string; name: string; role: AdminRole }): Promise<AccountChange> {
  forget();
  const users = await sheetUsers();
  if (users === null) return { ok: false, message: "The Admin Users tab couldn't be read right now. Please try again in a moment." };
  if (users.some((u) => u.email === input.email)) return { ok: false, message: `${input.email} already has an account.` };

  const tempPassword = temporaryPassword();
  await createRecord(adminUsersTab, adminUserColumns, {
    email: input.email,
    name: input.name,
    status: "Active",
    role: input.role,
    password_hash: hashPassword(tempPassword),
    password_changed_at: new Date().toISOString(),
    must_change_password: "Yes",
  });
  forget();
  return { ok: true, message: `${input.email} was added as ${input.role}. Send them this temporary password; they must change it when they first sign in.`, tempPassword };
}

export type AccountUpdate = { kind: "reset" } | { kind: "status"; active: boolean } | { kind: "role"; role: AdminRole };

// Nobody can reset, disable or demote their own account here, so there is
// always an Admin left who can undo a mistake
export async function updateAdminUser(actorEmail: string, email: string, change: AccountUpdate): Promise<AccountChange> {
  forget();
  const user = await sheetUser(email);
  if (!user) return { ok: false, message: "This account isn't in the Admin Users tab. Reload and try again." };
  if (user.email === actorEmail) return { ok: false, message: "You can't change your own account here. Ask another Admin, or use Security to change your password." };

  if (change.kind === "reset") {
    const tempPassword = temporaryPassword();
    await updateRecord(adminUsersTab, adminUserColumns, user.id, {
      password_hash: hashPassword(tempPassword),
      // Signs them out everywhere, the same as a password change
      password_changed_at: new Date().toISOString(),
      must_change_password: "Yes",
    });
    forget();
    return { ok: true, message: `New temporary password for ${user.email}. They are signed out everywhere and must change it when they sign in.`, tempPassword };
  }

  if (change.kind === "status") {
    await updateRecord(adminUsersTab, adminUserColumns, user.id, { status: change.active ? "Active" : "Disabled" });
    forget();
    return { ok: true, message: `${user.email} is now ${change.active ? "active" : "disabled"}.` };
  }

  await updateRecord(adminUsersTab, adminUserColumns, user.id, { role: change.role });
  forget();
  return { ok: true, message: `${user.email} is now ${change.role}.` };
}
