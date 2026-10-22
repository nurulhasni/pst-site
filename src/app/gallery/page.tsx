import type { Metadata } from "next";
import { GalleryView } from "@/components/views/GalleryView";

export const metadata: Metadata = {
  title: "Gallery — PT Prima Sistem Terpadu",
  description:
    "Workshops, projects and time together — the team behind every PST engagement.",
};

export default function GalleryPage() {
  return <GalleryView />;
}
