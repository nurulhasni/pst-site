import type { Metadata } from "next";
import { ServicesPageView } from "@/components/views/ServicesPageView";

export const metadata: Metadata = {
  title: "Services — PT Prima Sistem Terpadu",
  description:
    "Four services that get SAP live in your business and keep it working: SAP implementation, support and outsourcing, process reengineering and IT planning.",
};

export default function ServicesPage() {
  return <ServicesPageView />;
}
