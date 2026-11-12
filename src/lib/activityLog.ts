import { appendFile, mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import { headers } from "next/headers";
import { isActivityType, type ActivityRow } from "@/lib/activityModel";
import { getAccessToken } from "@/lib/sheets";

// One row for every form a visitor sends and every WhatsApp, email, phone or
// Apply link they click. With Google configured the rows go to the "Activity
// Log" tab of the site's Sheet. Without it (local dev, the Render demo) they go
// to .data/activity-log.jsonl, which is wiped whenever the host redeploys.

export const activityTab = "Activity Log";
const columns = ["time", "type", "page", "name", "email", "company", "phone", "detail", "file", "lang"] as const;

export const sheetsConfigured = () =>
  Boolean(process.env.GOOGLE_SHEET_ID && process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_PRIVATE_KEY);

const localFile = () => path.join(/*turbopackIgnore: true*/ process.cwd(), ".data", "activity-log.jsonl");

// --- Google Sheets -----------------------------------------------------------

async function sheetsFetch(suffix: string, init: RequestInit = {}): Promise<Response> {
  const token = await getAccessToken();
  return fetch(`https://sheets.googleapis.com/v4/spreadsheets/${process.env.GOOGLE_SHEET_ID}${suffix}`, {
    ...init,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", ...init.headers },
    cache: "no-store",
  });
}

const appendToSheet = (values: string[][]) =>
  sheetsFetch(`/values/${encodeURIComponent(activityTab)}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`, {
    method: "POST",
    body: JSON.stringify({ values }),
  });

async function createTab(): Promise<void> {
  const res = await sheetsFetch(":batchUpdate", {
    method: "POST",
    body: JSON.stringify({ requests: [{ addSheet: { properties: { title: activityTab } } }] }),
  });
  // Another request may have just created it; that's fine
  if (!res.ok && !(await res.text()).includes("already exists")) throw new Error("Could not create the Activity Log tab");
  await appendToSheet([[...columns]]);
}

async function readSheet(): Promise<ActivityRow[]> {
  const res = await sheetsFetch(`/values/${encodeURIComponent(activityTab)}`);
  if (res.status === 400) return []; // no tab yet: nothing recorded so far
  if (!res.ok) throw new Error("Could not read the Activity Log tab");
  const { values = [] } = (await res.json()) as { values?: string[][] };
  const [header = [], ...rows] = values;
  const keys = header.map((h) => h.trim().toLowerCase());
  return rows.map((row) => Object.fromEntries(keys.map((k, i) => [k, row[i] ?? ""])) as ActivityRow);
}

// --- Recording ---------------------------------------------------------------

const clean = (value: unknown, max: number) => String(value ?? "").trim().slice(0, max);

// The page the visitor was on, taken from the request that sent the form
export async function currentPage(): Promise<string> {
  try {
    const referer = (await headers()).get("referer");
    return referer ? new URL(referer).pathname : "";
  } catch {
    return "";
  }
}

// Saves one activity. Returns false instead of throwing, so a logging problem
// never stops the visitor's form from going through.
export async function recordActivity(input: Partial<ActivityRow> & Pick<ActivityRow, "type">): Promise<boolean> {
  if (!isActivityType(input.type)) return false;
  const row: ActivityRow = {
    time: new Date().toISOString(),
    type: input.type,
    page: clean(input.page, 200),
    name: clean(input.name, 120),
    email: clean(input.email, 160),
    company: clean(input.company, 160),
    phone: clean(input.phone, 40),
    detail: clean(input.detail, 600),
    file: clean(input.file, 80),
    lang: input.lang === "id" ? "id" : input.lang === "en" ? "en" : "",
  };

  try {
    if (sheetsConfigured()) {
      const values = [columns.map((c) => row[c] ?? "")];
      let res = await appendToSheet(values);
      if (res.status === 400) {
        await createTab();
        res = await appendToSheet(values);
      }
      if (!res.ok) throw new Error("Could not save the activity to Google Sheets");
    } else {
      await mkdir(path.dirname(localFile()), { recursive: true });
      await appendFile(localFile(), JSON.stringify(row) + "\n", "utf8");
    }
    return true;
  } catch (error) {
    console.error("[activity] could not record:", error);
    return false;
  }
}

// --- Reading -----------------------------------------------------------------

// Newest first
export async function getActivity(): Promise<ActivityRow[]> {
  let rows: ActivityRow[];
  if (sheetsConfigured()) {
    rows = await readSheet();
  } else {
    try {
      rows = (await readFile(localFile(), "utf8"))
        .split("\n")
        .filter(Boolean)
        .flatMap((line) => {
          try {
            return [JSON.parse(line) as ActivityRow];
          } catch {
            return [];
          }
        });
    } catch {
      rows = [];
    }
  }
  return rows.filter((r) => isActivityType(r.type)).sort((a, b) => b.time.localeCompare(a.time));
}

// ISO time `days` days ago, for the "last 7 days" counts on the admin page
export function daysAgo(days: number): string {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
}

export function activityStorageLabel(): string {
  return sheetsConfigured() ? `Google Sheet, tab “${activityTab}”` : "Local file on the server (.data/activity-log.jsonl), cleared on every redeploy";
}
