import type { Metadata } from "next";
import { ServicesPageView } from "@/components/views/ServicesPageView";

export const metadata: Metadata = {
  title: "Services — PT Prima Sistem Terpadu",
  description:
    "End-to-end technology services designed to modernize, optimize and transform your enterprise operations.",
};

export default function ServicesPage() {
  return <ServicesPageView />;
}
