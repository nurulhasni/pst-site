import { CustomerStoriesView } from "@/components/sections/CustomerStoriesView";
import { getCustomerStories } from "@/lib/sheets";

export async function CustomerStories() {
  const { featured, stories } = await getCustomerStories();

  return <CustomerStoriesView featured={featured} stories={stories} />;
}
