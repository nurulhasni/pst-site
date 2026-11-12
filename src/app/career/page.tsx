import type { Metadata } from "next";
import { CareerView } from "@/components/views/CareerView";

export const metadata: Metadata = {
  title: "Career — PT Prima Sistem Terpadu",
  description:
    "Start your career as an SAP consultant at PST. Fresh graduates are welcome: we train you on SAP and put you on real client projects across Indonesia.",
};

export default function CareerPage() {
  return <CareerView />;
}
