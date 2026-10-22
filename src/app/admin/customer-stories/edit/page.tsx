import type { Metadata } from "next";
import { EditCustomerStoryView } from "@/components/admin/EditCustomerStoryView";

export const metadata: Metadata = {
  title: "Edit Customer Story — Content Admin",
  robots: { index: false, follow: false },
};

export default function EditCustomerStoryPage() {
  return <EditCustomerStoryView />;
}
