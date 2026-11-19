import type { Metadata } from "next";
import { ServicesPageView } from "@/components/views/ServicesPageView";
import { getPublicClients, getPublicIndustries } from "@/lib/clients";

export const metadata: Metadata = {
  title: "Services — PT Prima Sistem Terpadu",
  description:
    "End-to-end technology services designed to modernize, optimize and transform your enterprise operations.",
};

export default async function ServicesPage() {
  const [allClients, industries] = await Promise.all([getPublicClients(), getPublicIndustries()]);
  const clients = allClients.filter((c) => c.servicesPage);
  return <ServicesPageView clients={clients} industries={industries} />;
}
