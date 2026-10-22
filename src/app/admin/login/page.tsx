import type { Metadata } from "next";
import { LoginView } from "@/components/admin/LoginView";

export const metadata: Metadata = {
  title: "Admin Login — PT Prima Sistem Terpadu",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return <LoginView />;
}
