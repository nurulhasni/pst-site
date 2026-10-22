import { InsightsView } from "@/components/sections/InsightsView";
import { getInsights } from "@/lib/sheets";

export async function Insights() {
  const posts = await getInsights();

  return <InsightsView posts={posts} />;
}
