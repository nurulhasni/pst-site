import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/sections/Header";
import { LanguageProvider } from "@/components/LanguageProvider";

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PT Prima Sistem Terpadu — SAP & IT Total Solution Provider",
  description:
    "An IT total solution provider, specializing in SAP. People, product, process.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${publicSans.variable} h-full antialiased`}>
      <body className="min-h-full">
        <LanguageProvider>
          <Header />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
