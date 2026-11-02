import type { Metadata } from "next";
import { Suspense } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminLoading } from "@/components/admin/AdminUi";
import { TestimonialsView } from "@/components/admin/TestimonialsView";
import { requireAdmin } from "@/lib/adminSession";
import { arrangeStories, getStoryAdminData } from "@/lib/stories";
import { fallbackStories } from "@/lib/storyModel";

export const metadata: Metadata = {
  title: "Testimonials — Content Admin",
  robots: { index: false, follow: false },
};

async function StoriesData() {
  await requireAdmin();
  const { stories, imported } = await getStoryAdminData();
  // Before the first import, show what the homepage displays today
  return <TestimonialsView stories={imported ? stories : arrangeStories(fallbackStories)} imported={imported} />;
}

export default function AdminTestimonialsPage() {
  return (
    <AdminShell activeKey="testimonials" breadcrumb="Content / Testimonials" title="Testimonials">
      <Suspense fallback={<AdminLoading />}>
        <StoriesData />
      </Suspense>
    </AdminShell>
  );
}
