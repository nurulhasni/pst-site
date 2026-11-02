import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { getAccessToken, serviceAccountReady } from "@/lib/sheets";

// Read-write access to Sheet tabs for the admin pages. Each tab is a table
// whose first row holds the column names and whose "id" column identifies a
// row, so staff can sort or insert rows in the Sheet without breaking edits.

export type SheetRecord = Record<string, string> & { id: string };

type Table = { header: string[]; rows: string[][] };

type Backend = {
  read(tab: string): Promise<Table | null>;
  create(tab: string, header: string[]): Promise<void>;
  setHeader(tab: string, header: string[]): Promise<void>;
  append(tab: string, row: string[]): Promise<void>;
  // index = position among the data rows, 0 being the row under the header
  update(tab: string, index: number, row: string[]): Promise<void>;
  remove(tab: string, index: number): Promise<void>;
};

const api = "https://sheets.googleapis.com/v4/spreadsheets";

function columnLetter(n: number): string {
  let letters = "";
  for (let i = n; i > 0; i = Math.floor((i - 1) / 26)) {
    letters = String.fromCharCode(65 + ((i - 1) % 26)) + letters;
  }
  return letters;
}

function range(tab: string, from: string, to?: string): string {
  const name = `'${tab.replace(/'/g, "''")}'`;
  return encodeURIComponent(to ? `${name}!${from}:${to}` : `${name}!${from}`);
}

async function google(url: string, init: RequestInit = {}): Promise<Response> {
  const res = await fetch(url, {
    ...init,
    headers: { Authorization: `Bearer ${await getAccessToken()}`, "Content-Type": "application/json" },
  });
  return res;
}

const googleBackend: Backend = {
  async read(tab) {
    const id = process.env.GOOGLE_SHEET_ID;
    const res = await google(`${api}/${id}/values/${range(tab, "A1", "ZZ")}`);
    // Google answers 400 for a tab that doesn't exist yet
    if (res.status === 400) return null;
    if (!res.ok) throw new Error(`Could not read the "${tab}" tab from Google Sheets`);
    const { values = [] } = (await res.json()) as { values?: string[][] };
    const [header = [], ...rows] = values;
    return { header, rows };
  },
  async create(tab, header) {
    const id = process.env.GOOGLE_SHEET_ID;
    const res = await google(`${api}/${id}:batchUpdate`, {
      method: "POST",
      body: JSON.stringify({ requests: [{ addSheet: { properties: { title: tab } } }] }),
    });
    if (!res.ok) throw new Error(`Could not create the "${tab}" tab in Google Sheets`);
    await this.setHeader(tab, header);
  },
  async setHeader(tab, header) {
    await writeRow(tab, 1, header);
  },
  async append(tab, row) {
    const id = process.env.GOOGLE_SHEET_ID;
    const res = await google(
      `${api}/${id}/values/${range(tab, "A1")}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`,
      { method: "POST", body: JSON.stringify({ values: [row] }) },
    );
    if (!res.ok) throw new Error(`Could not add a row to the "${tab}" tab`);
  },
  async update(tab, index, row) {
    await writeRow(tab, index + 2, row);
  },
  async remove(tab, index) {
    const id = process.env.GOOGLE_SHEET_ID;
    const meta = await google(`${api}/${id}?fields=sheets.properties(sheetId,title)`);
    if (!meta.ok) throw new Error("Could not read the Google Sheet's tabs");
    const { sheets = [] } = (await meta.json()) as {
      sheets?: { properties: { sheetId: number; title: string } }[];
    };
    const sheetId = sheets.find((s) => s.properties.title === tab)?.properties.sheetId;
    if (sheetId === undefined) throw new Error(`The "${tab}" tab no longer exists`);

    const res = await google(`${api}/${id}:batchUpdate`, {
      method: "POST",
      body: JSON.stringify({
        requests: [
          {
            deleteDimension: {
              range: { sheetId, dimension: "ROWS", startIndex: index + 1, endIndex: index + 2 },
            },
          },
        ],
      }),
    });
    if (!res.ok) throw new Error(`Could not delete a row from the "${tab}" tab`);
  },
};

async function writeRow(tab: string, rowNumber: number, row: string[]): Promise<void> {
  const id = process.env.GOOGLE_SHEET_ID;
  const res = await google(
    `${api}/${id}/values/${range(tab, `A${rowNumber}`, `${columnLetter(row.length)}${rowNumber}`)}?valueInputOption=RAW`,
    { method: "PUT", body: JSON.stringify({ values: [row] }) },
  );
  if (!res.ok) throw new Error(`Could not save to the "${tab}" tab`);
}

// Without Google credentials in development, tabs live in .data/sheets.json
// so the admin pages can be built and tested before the real Sheet exists.
const devFile = path.join(process.cwd(), ".data", "sheets.json");

async function loadDev(): Promise<Record<string, Table>> {
  try {
    return JSON.parse(await readFile(devFile, "utf8")) as Record<string, Table>;
  } catch {
    return {};
  }
}

async function saveDev(tables: Record<string, Table>): Promise<void> {
  await mkdir(path.dirname(devFile), { recursive: true });
  await writeFile(devFile, JSON.stringify(tables, null, 2));
}

const devBackend: Backend = {
  async read(tab) {
    return (await loadDev())[tab] ?? null;
  },
  async create(tab, header) {
    const tables = await loadDev();
    tables[tab] = { header, rows: [] };
    await saveDev(tables);
  },
  async setHeader(tab, header) {
    const tables = await loadDev();
    tables[tab] = { header, rows: tables[tab]?.rows ?? [] };
    await saveDev(tables);
  },
  async append(tab, row) {
    const tables = await loadDev();
    tables[tab].rows.push(row);
    await saveDev(tables);
  },
  async update(tab, index, row) {
    const tables = await loadDev();
    tables[tab].rows[index] = row;
    await saveDev(tables);
  },
  async remove(tab, index) {
    const tables = await loadDev();
    tables[tab].rows.splice(index, 1);
    await saveDev(tables);
  },
};

function backend(): Backend {
  if (serviceAccountReady()) return googleBackend;
  if (process.env.NODE_ENV !== "production") return devBackend;
  throw new Error("Google Sheets is not configured. Set GOOGLE_SHEET_ID and the service account in .env");
}

const key = (column: string) => column.trim().toLowerCase();

function toRecord(header: string[], row: string[], index: number): SheetRecord {
  const record = Object.fromEntries(header.map((column, i) => [key(column), (row[i] ?? "").trim()]));
  // Rows typed straight into the Sheet may have no id yet; address them by position
  // until the admin saves them, which writes a real id.
  return { ...record, id: record.id || `row-${index + 2}` };
}

async function ensureTable(tab: string, columns: string[]): Promise<Table> {
  const wanted = ["id", ...columns.filter((c) => key(c) !== "id")];
  const store = backend();
  const table = await store.read(tab);
  if (!table || !table.header.length) {
    await (table ? store.setHeader(tab, wanted) : store.create(tab, wanted));
    return { header: wanted, rows: table?.rows ?? [] };
  }

  // Staff may have reordered or added columns; only append the ones that are missing
  const present = new Set(table.header.map(key));
  const missing = wanted.filter((c) => !present.has(key(c)));
  if (missing.length) {
    table.header = [...table.header, ...missing];
    await store.setHeader(tab, table.header);
  }
  return table;
}

function findIndex(table: Table, id: string): number {
  if (id.startsWith("row-")) {
    const index = Number(id.slice(4)) - 2;
    return index >= 0 && index < table.rows.length ? index : -1;
  }
  const idColumn = table.header.map(key).indexOf("id");
  return table.rows.findIndex((row) => (row[idColumn] ?? "").trim() === id);
}

export async function listRecords(tab: string): Promise<SheetRecord[]> {
  const table = await backend().read(tab);
  if (!table) return [];
  return table.rows
    .map((row, index) => ({ row, index }))
    .filter(({ row }) => row.some((cell) => cell?.trim()))
    .map(({ row, index }) => toRecord(table.header, row, index));
}

export async function createRecord(
  tab: string,
  columns: string[],
  values: Record<string, string>,
): Promise<SheetRecord> {
  const table = await ensureTable(tab, columns);
  const id = randomUUID().slice(0, 8);
  const row = table.header.map((column) => (key(column) === "id" ? id : (values[key(column)] ?? "")));
  await backend().append(tab, row);
  return toRecord(table.header, row, table.rows.length);
}

export async function updateRecord(
  tab: string,
  columns: string[],
  id: string,
  values: Record<string, string>,
): Promise<void> {
  const table = await ensureTable(tab, columns);
  const index = findIndex(table, id);
  if (index < 0) throw new Error("This item was removed or changed in the Sheet. Reload and try again.");

  const current = table.rows[index] ?? [];
  const row = table.header.map((column, i) => {
    const k = key(column);
    if (k === "id") return id.startsWith("row-") ? randomUUID().slice(0, 8) : id;
    // Columns the admin form doesn't know about keep whatever staff typed in the Sheet
    return k in values ? values[k] : (current[i] ?? "");
  });
  await backend().update(tab, index, row);
}

export async function deleteRecord(tab: string, id: string): Promise<void> {
  const table = await backend().read(tab);
  const index = table ? findIndex(table, id) : -1;
  if (!table || index < 0) return;
  await backend().remove(tab, index);
}
