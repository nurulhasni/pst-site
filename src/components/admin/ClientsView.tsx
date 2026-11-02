"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { Pencil, Search, Trash2 } from "lucide-react";
import { AdminNotice } from "@/components/admin/AdminUi";
import { deleteClient, importClients, setClientInStrip } from "@/app/admin/clients/actions";
import type { FormState } from "@/lib/adminForms";
import { industries, type Client } from "@/lib/clientModel";

const font = "font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] ";

const iconButton = "box-border w-[32px] shrink-0 h-[32px] flex flex-row gap-0 justify-center items-center rounded-[8px] hover:bg-[#EAF3F5] cursor-pointer transition-colors";
const primaryButton = `box-border w-fit shrink-0 h-[40px] flex flex-row gap-[8px] p-[0px_20px] justify-center items-center bg-[#000354] hover:bg-[#0B1470] disabled:opacity-60 disabled:cursor-wait rounded-[8px] text-[14px]/[18px] text-[#FFFFFF] ${font}font-medium cursor-pointer transition-colors`;

// Short filter labels for the known industries; others show their full name
const shortLabels: Record<string, string> = {
  heavy: "Heavy Equipment",
  maritime: "Maritime",
  mining: "Mining",
  finance: "Finance",
  consumer: "Consumer",
  other: "Other",
};

export function ClientsView({ clients, imported }: { clients: Client[]; imported: boolean }) {
  const [filter, setFilter] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [confirming, setConfirming] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [pending, startTransition] = useTransition();
  // Show the switch flipped right away while the save runs
  const [stripOverrides, setStripOverrides] = useState<Record<string, boolean>>({});

  const industryNames = [
    ...industries.map((i) => i.name),
    ...new Set(clients.map((c) => c.industry).filter((name) => !industries.some((i) => i.name === name))),
  ];
  const filters = [
    { label: "All", industry: null as string | null, count: clients.length },
    ...industryNames
      .map((name) => ({
        label: shortLabels[industries.find((i) => i.name === name)?.key ?? ""] ?? name,
        industry: name as string | null,
        count: clients.filter((c) => c.industry === name).length,
      }))
      .filter((f) => f.count > 0),
  ];

  const needle = query.trim().toLowerCase();
  const visible = clients.filter((c) => (filter === null || c.industry === filter) && c.name.toLowerCase().includes(needle));

  function run(task: () => Promise<FormState>, after?: () => void) {
    setMessage("");
    startTransition(async () => {
      const result = await task();
      if (result.message) setMessage(result.message);
      setConfirming(null);
      after?.();
    });
  }

  function toggleStrip(client: Client) {
    const next = !(stripOverrides[client.id] ?? client.homepageStrip);
    setStripOverrides({ ...stripOverrides, [client.id]: next });
    run(
      () => setClientInStrip(client.id, next),
      () => setStripOverrides((current) => Object.fromEntries(Object.entries(current).filter(([key]) => key !== client.id))),
    );
  }

  return (
    <div className="box-border w-full h-fit shrink-0 flex flex-col gap-[24px] p-[32px] justify-start items-start max-lg:p-[20px]">
      {!imported && (
        <div className="box-border w-full h-fit shrink-0 flex flex-row flex-wrap gap-[16px] p-[20px] justify-between items-center bg-[#EAF3F5] rounded-[12px]">
          <div className="box-border [flex:1_1_320px] min-w-0 h-fit flex flex-col gap-[4px]">
            <div className={`text-[15px]/[20px] text-[#000354] ${font}font-medium`}>Clients aren’t in the Google Sheet yet</div>
            <div className={`text-[14px]/[20px] text-[#354A5F] ${font}font-normal`}>
              Below are the 18 clients the website shows today. Import them to the “Clients” tab, then check the names of the last eight, which are short labels for now.
            </div>
          </div>
          <button type="button" disabled={pending} onClick={() => run(importClients)} className={primaryButton}>
            {pending ? "Importing…" : "Import to Google Sheet"}
          </button>
        </div>
      )}
      {message && <AdminNotice>{message}</AdminNotice>}

      <div className="box-border w-full h-fit shrink-0 flex flex-row flex-wrap gap-[16px] justify-between items-center">
        <div role="tablist" className="box-border w-fit max-w-full shrink-0 h-fit flex flex-row flex-wrap gap-[8px] justify-start items-start">
          {filters.map((item) => {
            const isActive = filter === item.industry;
            return (
              <button
                key={item.label}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setFilter(item.industry)}
                className={`box-border w-fit shrink-0 h-fit flex flex-row gap-[8px] p-[8px_12px] justify-start items-center rounded-[999px] cursor-pointer transition-colors ${
                  isActive ? "bg-[#000354] [outline:1px_solid_#000354] [outline-offset:-0.5px]" : "bg-[#FFFFFF] hover:bg-[#EAF3F5] [outline:1px_solid_#D5DADD] [outline-offset:-0.5px]"
                }`}
              >
                <span className={`text-[13px]/[17px] box-border ${isActive ? "text-[#FFFFFF]" : "text-[#223548]"} ${font}text-left [white-space:nowrap]`}>{item.label}</span>
                <span className={`text-[12px]/[16px] box-border ${isActive ? "text-[#A6CBD3]" : "text-[#475E75]"} ${font}text-left [white-space:nowrap]`}>{item.count}</span>
              </button>
            );
          })}
        </div>
        {imported && (
          <Link href="/admin/clients/edit" className={`box-border w-fit shrink-0 h-[44px] flex flex-row gap-[8px] p-[0px_24px] justify-center items-center bg-[#000354] hover:bg-[#0B1470] rounded-[8px] text-[15px]/[19px] text-[#FFFFFF] ${font}font-medium transition-colors`}>
            + Add client
          </Link>
        )}
      </div>

      <div className="box-border w-full h-fit shrink-0 flex flex-col gap-0 justify-start items-start bg-[#FFFFFF] [outline:1px_solid_#D5DADD] [outline-offset:-0.5px] rounded-[12px] overflow-x-auto">
        <div className="w-full h-fit shrink-0 flex flex-row flex-wrap gap-[12px] p-[16px_20px] justify-between items-center [border-width:0px_0px_1px_0px] [border-style:solid] [border-color:#D5DADD]">
          <label className="box-border w-[320px] max-w-full h-[40px] shrink-0 flex flex-row gap-[10px] p-[0px_16px] justify-start items-center bg-[#F5F6F7] [outline:1px_solid_#D5DADD] [outline-offset:-0.5px] rounded-[8px]">
            <Search size={20} className="text-[#475E75] shrink-0" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search clients"
              className={`box-border w-full min-w-0 bg-transparent text-[14px]/[18px] text-[#223548] ${font}font-normal outline-none placeholder:text-[#475E75]`}
            />
          </label>
          <span className={`text-[13px]/[17px] box-border text-[#475E75] ${font}font-normal text-left`}>Sorted by display order</span>
        </div>

        <div className="w-full min-w-[940px] h-fit shrink-0 flex flex-row gap-[16px] p-[12px_20px] justify-start items-start bg-[#F5F6F7] [border-width:0px_0px_1px_0px] [border-style:solid] [border-color:#D5DADD]">
          <div className={`text-[12px]/[16px] box-border [flex:1_1_0] min-w-[240px] text-[#475E75] ${font}font-medium tracking-[1px] text-left`}>CLIENT</div>
          <div className={`text-[12px]/[16px] box-border w-[230px] shrink-0 text-[#475E75] ${font}font-medium tracking-[1px] text-left`}>INDUSTRY</div>
          <div className={`text-[12px]/[16px] box-border w-[130px] shrink-0 text-[#475E75] ${font}font-medium tracking-[1px] text-left`}>HOMEPAGE STRIP</div>
          <div className={`text-[12px]/[16px] box-border w-[100px] shrink-0 text-[#475E75] ${font}font-medium tracking-[1px] text-left`}>STATUS</div>
          <div className="box-border w-[80px] shrink-0 h-[16px]" />
        </div>

        {visible.length === 0 && (
          <div className={`w-full min-w-[940px] p-[24px_20px] text-[14px]/[20px] text-[#475E75] ${font}font-normal`}>
            {clients.length === 0 ? "No clients yet. Add one with “+ Add client”." : "No clients match this filter."}
          </div>
        )}

        {visible.map((client) => {
          const inStrip = stripOverrides[client.id] ?? client.homepageStrip;
          const deleteKey = client.id;
          return (
            <div key={client.id} className="w-full min-w-[940px] h-fit shrink-0 flex flex-row gap-[16px] p-[12px_20px] justify-start items-center [border-width:0px_0px_1px_0px] [border-style:solid] [border-color:#EAECEE]">
              <div className="box-border [flex:1_1_0] min-w-[240px] h-fit flex flex-row gap-[14px] justify-start items-center">
                <div className="box-border w-[72px] shrink-0 h-[48px] flex flex-row gap-0 p-[6px_8px] justify-start items-start [outline:1px_solid_#D5DADD] [outline-offset:-0.5px] rounded-[8px]">
                  {client.logo ? (
                    <div className="box-border [flex:1_1_0] h-full bg-no-repeat bg-contain bg-center" style={{ backgroundImage: `url(${client.logo})` }} />
                  ) : (
                    <span className={`m-auto text-[11px]/[14px] text-[#A9B4BE] ${font}font-normal`}>No logo</span>
                  )}
                </div>
                <div className="box-border [flex:1_1_0] min-w-0 h-fit flex flex-col gap-[2px] justify-start items-start">
                  <div className={`text-[15px]/[20px] box-border w-full text-[#000000] ${font}font-medium text-left`}>{client.name}</div>
                  <div className={`text-[12px]/[16px] box-border max-w-full truncate ${client.logo ? "text-[#A9B4BE]" : "text-[#AA5808]"} ${font}font-normal text-left`}>
                    {!client.logo ? "No logo · not shown on the website" : client.website ? client.website.replace(/^https?:\/\//, "") : "No website added"}
                  </div>
                </div>
              </div>
              <div className={`text-[14px]/[18px] box-border w-[230px] shrink-0 text-[#354A5F] ${font}font-normal text-left`}>{client.industry}</div>
              <div className="box-border w-[130px] shrink-0 h-fit flex flex-row gap-0 justify-start items-start">
                <button
                  type="button"
                  role="switch"
                  aria-checked={inStrip}
                  aria-label={`Show ${client.name} on homepage strip`}
                  disabled={!imported}
                  onClick={() => toggleStrip(client)}
                  className={`box-border w-[36px] shrink-0 h-[20px] flex flex-row gap-0 p-[2px] items-center rounded-[999px] cursor-pointer transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${inStrip ? "justify-end bg-[#2F6E80]" : "justify-start bg-[#CAD0D5]"}`}
                >
                  <span className="box-border w-[16px] shrink-0 h-[16px] bg-[#FFFFFF] rounded-[50%]" />
                </button>
              </div>
              <div className="box-border w-[100px] shrink-0 h-fit flex flex-row gap-0 justify-start items-start">
                <div className={`box-border w-fit shrink-0 h-fit flex flex-row gap-[6px] p-[4px_10px] justify-start items-center ${client.active ? "bg-[#F5FAE5]" : "bg-[#F5F6F7]"} rounded-[999px]`}>
                  <div className={`box-border w-[6px] shrink-0 h-[6px] ${client.active ? "bg-[#188918]" : "bg-[#8396A8]"} rounded-[50%]`} />
                  <span className={`text-[12px]/[16px] box-border ${client.active ? "text-[#188918]" : "text-[#475E75]"} ${font}font-medium text-left [white-space:nowrap]`}>{client.active ? "Active" : "Hidden"}</span>
                </div>
              </div>
              <div className="box-border w-[80px] shrink-0 h-fit flex flex-row gap-[4px] justify-end items-center">
                {imported &&
                  (confirming === deleteKey ? (
                    <>
                      <button type="button" disabled={pending} onClick={() => run(() => deleteClient(client.id, false))} className={`h-[32px] px-[8px] rounded-[8px] bg-[#D20A0A] hover:bg-[#AA0808] text-[12px]/[16px] text-[#FFFFFF] ${font}font-medium cursor-pointer disabled:opacity-60`}>
                        {pending ? "…" : "Delete"}
                      </button>
                      <button type="button" aria-label="Cancel delete" onClick={() => setConfirming(null)} className={`h-[32px] px-[6px] rounded-[8px] hover:bg-[#EAF3F5] text-[12px]/[16px] text-[#354A5F] ${font}font-medium cursor-pointer`}>
                        ✕
                      </button>
                    </>
                  ) : (
                    <>
                      <Link href={`/admin/clients/edit?id=${encodeURIComponent(client.id)}`} aria-label={`Edit ${client.name}`} className={iconButton}>
                        <Pencil size={16} className="text-[#354A5F]" />
                      </Link>
                      <button type="button" aria-label={`Delete ${client.name}`} onClick={() => setConfirming(deleteKey)} className={iconButton}>
                        <Trash2 size={16} className="text-[#D20A0A]" />
                      </button>
                    </>
                  ))}
              </div>
            </div>
          );
        })}

        <div className="w-full h-fit shrink-0 flex flex-row gap-0 p-[14px_20px] justify-between items-center [border-width:1px_0px_0px_0px] [border-style:solid] [border-color:#D5DADD]">
          <span className={`text-[13px]/[17px] box-border text-[#475E75] ${font}font-normal text-left`}>
            Showing {visible.length} of {clients.length} clients
          </span>
        </div>
      </div>
    </div>
  );
}
