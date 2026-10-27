import type { Metadata } from "next";
import { ServiceDetailView } from "@/components/views/ServiceDetailView";

export const metadata: Metadata = {
  title: "Service Detail — PT Prima Sistem Terpadu",
  description:
    "From strategy and process design to SAP implementation and long-term support, here's how we work, in detail.",
};

export default function ServiceDetailPage() {
  return <ServiceDetailView />;
}
