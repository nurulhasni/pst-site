import type { Metadata } from "next";
import { Suspense } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminLoading } from "@/components/admin/AdminUi";
import { SettingsView } from "@/components/admin/SettingsView";
import { requireAdmin } from "@/lib/adminSession";
import { listAdminUsers } from "@/lib/adminUsers";

export const metadata: Metadata = {
  title: "Settings — Content Admin",
  robots: { index: false, follow: false },
};

async function SettingsData() {
  const session = await requireAdmin();
  const { users, sheetReadable } = await listAdminUsers();
  const me = users.find((u) => u.email === session.email);
  return (
    <SettingsView
      // Only what the list shows; password hashes never leave the server
      adminUsers={users.map(({ email, name, active, lastLogin, source }) => ({ email, name, active, lastLogin, source }))}
      sheetReadable={sheetReadable}
      currentEmail={session.email}
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
