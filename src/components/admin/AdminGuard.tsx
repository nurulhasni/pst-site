import { Suspense, type ReactNode } from "react";
import { AdminLoading } from "@/components/admin/AdminUi";
import { requireAdmin } from "@/lib/adminSession";

async function Checked({ children }: { children: ReactNode }) {
  await requireAdmin();
  return children;
}

// For admin pages that load no data of their own: still runs the full account
// check (disabled account, ended session, temporary password) before showing anything
export function AdminGuard({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<AdminLoading />}>
      <Checked>{children}</Checked>
    </Suspense>
  );
}
