import type { Metadata } from "next";
import { CareerView } from "@/components/views/CareerView";

export const metadata: Metadata = {
  title: "Career — PT Prima Sistem Terpadu",
  description:
    "Several positions are open in Business Process and Resources Planning. Join the world-class SAP consultants at PST.",
};

export default function CareerPage() {
  return <CareerView />;
}
