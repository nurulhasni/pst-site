import type { Metadata } from "next";
import { ServicesPageView } from "@/components/views/ServicesPageView";
import { getPublicClients, getPublicIndustries } from "@/lib/clients";

export const metadata: Metadata = {
  title: "Services — PT Prima Sistem Terpadu",
  description:
    "Four services that get SAP live in your business and keep it working: SAP implementation, support and outsourcing, process reengineering and IT planning.",
};

export default async function ServicesPage() {
  const [allClients, industries] = await Promise.all([getPublicClients(), getPublicIndustries()]);
  const clients = allClients.filter((c) => c.servicesPage);
  return <ServicesPageView clients={clients} industries={industries} />;
}
