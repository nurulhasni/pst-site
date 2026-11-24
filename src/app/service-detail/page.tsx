import type { Metadata } from "next";
import { ServiceDetailView } from "@/components/views/ServiceDetailView";

export const metadata: Metadata = {
  title: "How our services work — PT Prima Sistem Terpadu",
  description:
    "From strategy and process design to SAP implementation and long-term support: what each PST service involves and what you get from it.",
};

export default function ServiceDetailPage() {
  return <ServiceDetailView />;
}
