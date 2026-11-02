import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminLoading } from "@/components/admin/AdminUi";
import { EditCustomerStoryView } from "@/components/admin/EditCustomerStoryView";
import { requireAdmin } from "@/lib/adminSession";
import { getStory } from "@/lib/stories";

export const metadata: Metadata = {
  title: "Edit Customer Story — Content Admin",
  robots: { index: false, follow: false },
};

async function StoryForm({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  await requireAdmin();
  const { id } = await searchParams;
  if (!id) return <EditCustomerStoryView />;

  const story = await getStory(id);
  if (!story) notFound();
  return <EditCustomerStoryView story={story} />;
}

export default function EditCustomerStoryPage({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  return (
    <AdminShell activeKey="testimonials" breadcrumb="Content / Testimonials / Edit" title="Edit Customer Story">
      <Suspense fallback={<AdminLoading />}>
        <StoryForm searchParams={searchParams} />
      </Suspense>
    </AdminShell>
  );
}
