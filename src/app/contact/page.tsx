import type { Metadata } from "next";
import { ContactView } from "@/components/views/ContactView";

export const metadata: Metadata = {
  title: "Contact — PT Prima Sistem Terpadu",
  description:
    "Get in touch with PST about SAP implementation, support and IT services.",
};

export default function ContactPage() {
  return <ContactView />;
}
