import type { Metadata } from "next";
import { connection } from "next/server";
import { Suspense } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { ChatHistoryView } from "@/components/admin/ChatHistoryView";
import { chatStorageLabel, countActiveSince, getChatSessions } from "@/lib/chatLog";

export const metadata: Metadata = {
  title: "Chat History — Content Admin",
  robots: { index: false, follow: false },
};

const font = "font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif]";

// Chats arrive all the time, so the list is read fresh on every visit
async function ChatHistory() {
  await connection();
  const sessions = await getChatSessions().catch(() => null);
  if (!sessions) {
    return (
      <div className={`box-border w-full p-[32px] text-[14px]/[20px] text-[#9B1C1C] ${font} max-lg:p-[20px]`}>
        The chat log could not be loaded from Google Sheets. Check the service account settings and try again.
      </div>
    );
  }
  return <ChatHistoryView sessions={sessions} activeThisWeek={countActiveSince(sessions, 7)} storage={chatStorageLabel()} />;
}

export default function AdminChatsPage() {
  return (
    <AdminShell activeKey="chats" breadcrumb="Audience / Chat History" title="Chat History">
      <Suspense fallback={<div className={`box-border w-full p-[32px] text-[14px] text-[#475E75] ${font} max-lg:p-[20px]`}>Loading chats…</div>}>
        <ChatHistory />
      </Suspense>
    </AdminShell>
  );
}
