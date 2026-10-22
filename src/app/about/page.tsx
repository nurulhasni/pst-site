import type { Metadata } from "next";
import { AboutView } from "@/components/views/AboutView";

export const metadata: Metadata = {
  title: "About Us — PT Prima Sistem Terpadu",
  description:
    "PT Prima Sistem Terpadu is a local IT consulting company, an SAP ERP Silver Partner in Indonesia since 1999.",
};

export default function AboutPage() {
  return <AboutView />;
}
