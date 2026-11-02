import { cacheLife, cacheTag } from "next/cache";
import { listRecords, type SheetRecord } from "@/lib/sheetStore";
import { sheetTag } from "@/lib/sheets";
import { fallbackStories, storiesTab, toPublicStory, toStory, type CustomerStories, type Story } from "@/lib/storyModel";

const byOrder = (a: Story, b: Story) => a.order - b.order;

async function readStories(): Promise<SheetRecord[] | null> {
  try {
    return await listRecords(storiesTab);
  } catch {
    // Google unreachable or not configured: keep the section up with the built-in stories
    return null;
  }
}

// The featured story opens first. Rows from the original tab have no
// "featured" column, so the first story stands in when none is marked.
export function arrangeStories(all: Story[]): Story[] {
  const listed = all.filter((s) => s.published && s.title).sort(byOrder);
  const featured = listed.find((s) => s.featured) ?? listed[0];
  return featured ? [featured, ...listed.filter((s) => s !== featured)] : [];
}

export async function getCustomerStories(): Promise<CustomerStories> {
  "use cache";
  cacheLife("minutes");
  cacheTag(sheetTag(storiesTab));

  const rows = await readStories();
  let arranged = arrangeStories(rows ? rows.map(toStory) : fallbackStories);
  // An empty or fully hidden tab would leave the section without a featured story
  if (!arranged.length) arranged = arrangeStories(fallbackStories);

  const [featured, ...stories] = arranged.map(toPublicStory);
  return { featured, stories };
}

export async function getStoryAdminData() {
  const rows = await listRecords(storiesTab);
  return { stories: arrangeStoriesForAdmin((rows ?? []).map(toStory)), imported: rows !== null };
}

// Admin shows hidden stories too, but in the same order the homepage uses
function arrangeStoriesForAdmin(all: Story[]): Story[] {
  const shown = arrangeStories(all);
  return [...shown, ...all.filter((s) => !shown.includes(s)).sort(byOrder)];
}

export async function getStory(id: string): Promise<Story | null> {
  const rows = await listRecords(storiesTab);
  const row = rows?.find((r) => r.id === id);
  return row ? toStory(row) : null;
}
