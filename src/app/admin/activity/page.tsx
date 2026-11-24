import type { Metadata } from "next";
import { connection } from "next/server";
import { Suspense } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { ActivityLogView } from "@/components/admin/ActivityLogView";
import { activityStorageLabel, daysAgo, getActivity } from "@/lib/activityLog";

export const metadata: Metadata = {
  title: "Activity Log — Content Admin",
  robots: { index: false, follow: false },
};

const font = "font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif]";

// Visitors act all the time, so the log is read fresh on every visit
async function ActivityLog() {
  await connection();
  const rows = await getActivity().catch(() => null);
  if (!rows) {
    return (
      <div className={`box-border w-full p-[32px] text-[14px]/[20px] text-[#9B1C1C] ${font} max-lg:p-[20px]`}>
        The activity log could not be loaded from Google Sheets. Check the service account settings and try again.
      </div>
    );
  }
  return <ActivityLogView rows={rows} storage={activityStorageLabel()} weekAgo={daysAgo(7)} />;
}

export default function AdminActivityPage() {
  return (
    <AdminShell activeKey="activity" breadcrumb="Audience / Activity Log" title="Activity Log">
      <Suspense fallback={<div className={`box-border w-full p-[32px] text-[14px] text-[#475E75] ${font} max-lg:p-[20px]`}>Loading activity…</div>}>
        <ActivityLog />
      </Suspense>
    </AdminShell>
  );
}
