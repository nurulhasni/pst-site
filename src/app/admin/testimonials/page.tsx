import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { TestimonialsView } from "@/components/admin/TestimonialsView";

export const metadata: Metadata = {
  title: "Testimonials — Content Admin",
  robots: { index: false, follow: false },
};

export default function AdminTestimonialsPage() {
  return (
    <AdminShell activeKey="testimonials" breadcrumb="Content / Testimonials" title="Testimonials">
      <TestimonialsView />
    </AdminShell>
  );
}
