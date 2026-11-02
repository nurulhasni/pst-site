import { CustomerStoriesView } from "@/components/sections/CustomerStoriesView";
import { getCustomerStories } from "@/lib/stories";

export async function CustomerStories() {
  const { featured, stories } = await getCustomerStories();

  return <CustomerStoriesView featured={featured} stories={stories} />;
}
