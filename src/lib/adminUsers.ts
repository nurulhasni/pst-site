import { envAdminEmails, envAdminPassword, hashPassword, passwordMatches, type AdminSession } from "@/lib/adminAuth";
import { listRecords, updateRecord, type SheetRecord } from "@/lib/sheetStore";

// Admin accounts live in the "Admin Users" tab, by default in a spreadsheet of
// its own (GOOGLE_SHEET_ADMIN_USERS) shared only with IT and the service account.
// IT adds a row (email, name, status Active) and pastes a temporary
// password_hash from `npm run hash-password`; the admin then changes it in
// Settings. Accounts in ADMIN_USERS (.env) stay as an emergency way in.

export const adminUsersTab = "Admin Users";
export const adminUserColumns = ["email", "name", "status", "password_hash", "password_changed_at", "last_login"];

export type AdminUser = {
  id: string;
  email: string;
  name: string;
  active: boolean;
  passwordHash: string;
  passwordChangedAt: string;
  lastLogin: string;
  source: "sheet" | "env";
};

const toUser = (r: SheetRecord): AdminUser => ({
  id: r.id,
  email: (r.email ?? "").trim().toLowerCase(),
  name: r.name ?? "",
  // Only an explicit Active lets someone in, so a typo locks rather than opens
  active: (r.status ?? "").trim().toLowerCase() === "active",
  passwordHash: r.password_hash ?? "",
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
      users.push({ id: `env-${email}`, email, name: "", active: true, passwordHash: "", passwordChangedAt: "", lastLogin: "", source: "env" });
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
  if (user) return user.active && passwordMatches(password, user.passwordHash);
  return passwordMatches(password, envAdminPassword(email));
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

export async function sessionStillValid(session: AdminSession): Promise<boolean> {
  const users = await sheetUsers();
  const user = users?.find((u) => u.email === session.email);
  if (user) {
    if (!user.active) return false;
    // A password change ends every session signed before it
    const changed = Date.parse(user.passwordChangedAt);
    return Number.isNaN(changed) || session.iat * 1000 >= changed;
  }
  if (envAdminPassword(session.email)) return true;
  // The Sheet couldn't be read at all: trust the signed session for now
  // rather than lock every admin out during a Google outage
  return users === null;
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
  });
  forget();
  return { ok: true, changedAt };
}
