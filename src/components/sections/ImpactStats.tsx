import { getImpactStats } from "@/lib/sheets";
import { ImpactStatsView } from "@/components/sections/ImpactStatsView";

export async function ImpactStats() {
  const stats = await getImpactStats();

  return <ImpactStatsView stats={stats} />;
}
