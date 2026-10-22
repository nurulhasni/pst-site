import { getServices } from "@/lib/sheets";
import { ServicesView } from "@/components/sections/ServicesView";

export async function Services() {
  const services = await getServices();

  return <ServicesView services={services} />;
}
