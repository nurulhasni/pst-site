import type { Metadata } from "next";
import { Suspense } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminLoading } from "@/components/admin/AdminUi";
import { TemporaryPasswordView } from "@/components/admin/AccountSettings";
import { SettingsView } from "@/components/admin/SettingsView";
import { requireAdmin } from "@/lib/adminSession";
import { listAdminUsers } from "@/lib/adminUsers";

export const metadata: Metadata = {
  title: "Settings — Content Admin",
  robots: { index: false, follow: false },
};

async function SettingsData() {
  const session = await requireAdmin({ allowTemporaryPassword: true });
  // Still on a temporary password: only the change-password form until it's done
  if (session.mustChangePassword) return <TemporaryPasswordView />;

  const { users, sheetReadable } = await listAdminUsers();
  const me = users.find((u) => u.email === session.email);
  const canManageUsers = session.role === "Admin";
  return (
    <SettingsView
      // Only what the list shows, and only to Admins; password hashes never leave the server
      adminUsers={(canManageUsers ? users : []).map(({ email, name, active, role, mustChangePassword, lastLogin, source }) => ({ email, name, active, role, mustChangePassword, lastLogin, source }))}
      sheetReadable={sheetReadable}
      currentEmail={session.email}
      canManageUsers={canManageUsers}
      canChangePassword={me?.source === "sheet"}
    />
  );
}

export default function AdminSettingsPage() {
  return (
    <AdminShell activeKey="settings" breadcrumb="System / Settings" title="Settings">
      <Suspense fallback={<AdminLoading />}>
        <SettingsData />
      </Suspense>
    </AdminShell>
  );
}
