import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { ClientsStrip } from "@/components/sections/ClientsStrip";
import { AboutIntro } from "@/components/sections/AboutIntro";
import { ImpactStats } from "@/components/sections/ImpactStats";
import { Services } from "@/components/sections/Services";
import { RISEWithSAP } from "@/components/sections/RISEWithSAP";
import { VisionMission } from "@/components/sections/VisionMission";
import { CustomerStories } from "@/components/sections/CustomerStories";
import { Insights } from "@/components/sections/Insights";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";
import { FloatingContact } from "@/components/sections/FloatingContact";

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden">
      <Header />
      <Hero />
      <ClientsStrip />
      <AboutIntro />
      <ImpactStats />
      <Services />
      <RISEWithSAP />
      <VisionMission />
      <CustomerStories />
      <Insights />
      <CTA />
      <Footer />
      <FloatingContact />
    </main>
  );
}
