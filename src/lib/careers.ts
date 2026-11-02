import { cacheLife, cacheTag } from "next/cache";
import {
  byOrder,
  fallbackFaqs,
  fallbackPositions,
  faqTab,
  isListed,
  jakartaToday,
  positionsTab,
  toFaq,
  toPosition,
  type CareerFaq,
  type CareerPosition,
} from "@/lib/careerModel";
import { listRecords, type SheetRecord } from "@/lib/sheetStore";
import { sheetTag } from "@/lib/sheets";

async function readTabSafely(tab: string): Promise<SheetRecord[] | null> {
  try {
    return await listRecords(tab);
  } catch {
    // Google unreachable or not configured: keep the page up with the built-in content
    return null;
  }
}

export type CareerContent = { positions: CareerPosition[]; faqs: CareerFaq[] };

export async function getCareerContent(): Promise<CareerContent> {
  "use cache";
  cacheLife("minutes");
  cacheTag(sheetTag(positionsTab));
  cacheTag(sheetTag(faqTab));

  const [positionRows, faqRows] = await Promise.all([readTabSafely(positionsTab), readTabSafely(faqTab)]);
  const today = jakartaToday();

  const positions = (positionRows ? positionRows.map(toPosition) : fallbackPositions)
    .filter((p) => isListed(p, today))
    .sort(byOrder);
  const faqs = (faqRows ? faqRows.map(toFaq) : fallbackFaqs).filter((f) => f.published && f.question).sort(byOrder);
  return { positions, faqs };
}

// For the admin pages: every row including closed and hidden ones, plus
// whether each tab exists yet so the page can offer to import the old content.
export async function getCareerAdminData() {
  const [positionRows, faqRows] = await Promise.all([listRecords(positionsTab), listRecords(faqTab)]);
  return {
    positions: (positionRows ?? []).map(toPosition).sort(byOrder),
    faqs: (faqRows ?? []).map(toFaq).sort(byOrder),
    imported: positionRows !== null || faqRows !== null,
  };
}

export async function getCareerPosition(id: string): Promise<CareerPosition | null> {
  const rows = await listRecords(positionsTab);
  const row = rows?.find((r) => r.id === id);
  return row ? toPosition(row) : null;
}
