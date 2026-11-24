import { recordActivity } from "@/lib/activityLog";
import { clickTypes, type ActivityType } from "@/lib/activityModel";

// Receives the link clicks ActivityTracker sends with navigator.sendBeacon.
// Only click types are accepted here; forms record themselves on the server.

// A small in-memory limit so a script can't flood the log. It resets when the
// server restarts, which is fine at this traffic.
const hits = new Map<string, number[]>();
function overLimit(key: string, max = 60, windowMs = 60 * 60 * 1000): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > max;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || request.headers.get("x-real-ip") || "unknown";
  if (overLimit(ip)) return new Response(null, { status: 429 });

  let body: { type?: unknown; label?: unknown; target?: unknown; page?: unknown; lang?: unknown };
  try {
    body = await request.json();
  } catch {
    return new Response(null, { status: 400 });
  }
  if (!clickTypes.includes(body.type as ActivityType)) return new Response(null, { status: 400 });

  const label = String(body.label ?? "").trim();
  const target = String(body.target ?? "").trim();
  await recordActivity({
    type: body.type as ActivityType,
    page: String(body.page ?? ""),
    lang: String(body.lang ?? ""),
    detail: [label, target].filter(Boolean).join(" · "),
  });
  return new Response(null, { status: 204 });
}
