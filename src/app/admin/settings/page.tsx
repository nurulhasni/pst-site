import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { SettingsView } from "@/components/admin/SettingsView";

export const metadata: Metadata = {
  title: "Settings — Content Admin",
  robots: { index: false, follow: false },
};

export default function AdminSettingsPage() {
  return (
    <AdminShell activeKey="settings" breadcrumb="System / Settings" title="Settings">
      <SettingsView />
    </AdminShell>
  );
}
