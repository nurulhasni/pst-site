"use client";

import { useMemo, useState } from "react";
import {
  BookOpen,
  Building2,
  Calendar,
  CircleCheck,
  Download,
  FileText,
  GraduationCap,
  MailCheck,
  MailX,
  Phone,
  Search,
  Trash2,
  X,
  Check,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";

const font = "font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif]";

type Status = "Subscribed" | "Pending" | "Not subscribed" | "Unsubscribed";
type OrgType = "Company" | "Campus" | "Other";

type Subscriber = {
  id: string;
  name: string;
  initials: string;
  email: string;
  org: string;
  orgType: OrgType;
  status: Status;
  firstForm: string;
  phone: string;
  articles: string[];
  consent?: { ticked: string; confirmed?: string; text: string };
};

const subscribers: Subscriber[] = [
  {
    id: "rina",
    name: "Rina Wijaya",
    initials: "RW",
    email: "rina.w@majujaya.co.id",
    org: "PT Maju Jaya Indonesia",
    orgType: "Company",
    status: "Pending",
    firstForm: "Oct 22, 2026 · 09:12 WIB",
    phone: "Not provided",
    articles: [],
  },
  {
    id: "ahmad",
    name: "Ahmad Fauzi",
    initials: "AF",
    email: "ahmad.fauzi@cendekia.ac.id",
    org: "Universitas Cendekia",
    orgType: "Campus",
    status: "Subscribed",
    firstForm: "Oct 21, 2026 · 14:32 WIB",
    phone: "Not provided",
    articles: ["Why SAP S/4HANA matters for modern enterprises", "Digital transformation trends this year"],
    consent: {
      ticked: 'Ticked "Send me new articles and updates" · Oct 21, 14:32',
      confirmed: "Email confirmed · Oct 21, 14:40",
      text: 'Consent text v1.0 · shown on "Why SAP S/4HANA matters…"',
    },
  },
  {
    id: "dewi",
    name: "Dewi Lestari",
    initials: "DL",
    email: "dewi@sentosa-logistik.com",
    org: "PT Sentosa Logistik",
    orgType: "Company",
    status: "Subscribed",
    firstForm: "Oct 19, 2026 · 10:05 WIB",
    phone: "Not provided",
    articles: ["The future of cloud ERP solutions"],
  },
  {
    id: "budi",
    name: "Budi Prasetyo",
    initials: "BP",
    email: "budi.p@arunika.co.id",
    org: "PT Arunika Retail",
    orgType: "Company",
    status: "Subscribed",
    firstForm: "Oct 17, 2026 · 16:48 WIB",
    phone: "Not provided",
    articles: ["5 ways to optimize your business processes"],
  },
  {
    id: "sari",
    name: "Sari Putri",
    initials: "SP",
    email: "sari.putri@cendekia.ac.id",
    org: "Universitas Cendekia",
    orgType: "Campus",
    status: "Not subscribed",
    firstForm: "Oct 15, 2026 · 11:20 WIB",
    phone: "Not provided",
    articles: [],
  },
  {
    id: "hendra",
    name: "Hendra Gunawan",
    initials: "HG",
    email: "hendra@mitrausaha.id",
    org: "Koperasi Mitra Usaha",
    orgType: "Other",
    status: "Subscribed",
    firstForm: "Oct 14, 2026 · 08:30 WIB",
    phone: "Not provided",
    articles: ["Digital transformation trends this year"],
  },
  {
    id: "maya",
    name: "Maya Anggraini",
    initials: "MA",
    email: "maya.a@nusantarafoods.com",
    org: "PT Nusantara Foods",
    orgType: "Company",
    status: "Unsubscribed",
    firstForm: "Oct 10, 2026 · 13:02 WIB",
    phone: "Not provided",
    articles: ["Why SAP S/4HANA matters for modern enterprises"],
  },
  {
    id: "yoga",
    name: "Yoga Pratama",
    initials: "YP",
    email: "yoga@majujaya.co.id",
    org: "PT Maju Jaya Indonesia",
    orgType: "Company",
    status: "Subscribed",
    firstForm: "Oct 08, 2026 · 15:41 WIB",
    phone: "Not provided",
    articles: ["The future of cloud ERP solutions"],
  },
];

const statusStyle: Record<Status, { bg: string; text: string; dot: string }> = {
  Subscribed: { bg: "#F5FAE5", text: "#188918", dot: "#188918" },
  Pending: { bg: "#FFF8D6", text: "#E76500", dot: "#E76500" },
  "Not subscribed": { bg: "#EAECEE", text: "#354A5F", dot: "#354A5F" },
  Unsubscribed: { bg: "#FFEAF4", text: "#D20A0A", dot: "#D20A0A" },
};

const tabs: ("All" | Status)[] = ["All", "Subscribed", "Pending", "Not subscribed", "Unsubscribed"];

const orgIcon: Record<OrgType, LucideIcon> = { Company: Building2, Campus: GraduationCap, Other: Building2 };

function Checkbox({ checked, onToggle, label }: { checked: boolean; onToggle: () => void; label: string }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={label}
      onClick={(event) => {
        event.stopPropagation();
        onToggle();
      }}
      className={`box-border w-[18px] shrink-0 h-[18px] flex flex-row gap-0 justify-center items-center rounded-[4px] cursor-pointer transition-colors ${
        checked ? "bg-[#2F6E80] [outline:1px_solid_#2F6E80] [outline-offset:-0.5px]" : "bg-[#FFFFFF] [outline:1px_solid_#475E75] [outline-offset:-0.5px]"
      }`}
    >
      {checked && <Check size={12} className="text-[#FFFFFF]" />}
    </button>
  );
}

export function SubscribersView() {
  const [tab, setTab] = useState<"All" | Status>("All");
  const [query, setQuery] = useState("");
  const [orgFilter, setOrgFilter] = useState<"All types" | OrgType>("All types");
  const [selected, setSelected] = useState<Set<string>>(new Set(["ahmad", "dewi"]));
  const [activeId, setActiveId] = useState("ahmad");

  const counts = useMemo(() => {
    const result: Record<"All" | Status, number> = { All: subscribers.length, Subscribed: 0, Pending: 0, "Not subscribed": 0, Unsubscribed: 0 };
    subscribers.forEach((subscriber) => {
      result[subscriber.status] += 1;
    });
    return result;
  }, []);

  const visible = subscribers.filter((subscriber) => {
    const matchesTab = tab === "All" || subscriber.status === tab;
    const matchesOrg = orgFilter === "All types" || subscriber.orgType === orgFilter;
    const needle = query.trim().toLowerCase();
    const matchesQuery = needle === "" || [subscriber.name, subscriber.email, subscriber.org].some((value) => value.toLowerCase().includes(needle));
    return matchesTab && matchesOrg && matchesQuery;
  });

  const active = subscribers.find((subscriber) => subscriber.id === activeId) ?? subscribers[0];
  const ActiveOrgIcon = orgIcon[active.orgType];

  function toggleSelected(id: string) {
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="box-border w-full h-fit shrink-0 flex flex-col gap-[20px] p-[32px] justify-start items-start max-lg:p-[20px]">
      <div className="box-border w-full h-fit shrink-0 flex flex-row flex-wrap gap-[16px] justify-between items-center">
        <div role="tablist" className="box-border w-fit shrink-0 h-fit flex flex-row flex-wrap gap-[8px] justify-start items-start">
          {tabs.map((item) => {
            const isActive = tab === item;
            return (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setTab(item)}
                className={`box-border w-fit shrink-0 h-fit flex flex-row gap-[8px] p-[8px_12px] justify-start items-center rounded-[999px] cursor-pointer transition-colors ${
                  isActive ? "bg-[#000354] [outline:1px_solid_#000354] [outline-offset:-0.5px]" : "bg-[#FFFFFF] hover:bg-[#EAF3F5] [outline:1px_solid_#D5DADD] [outline-offset:-0.5px]"
                }`}
              >
                <span className={`text-[13px]/[17px] box-border ${isActive ? "text-[#FFFFFF]" : "text-[#223548]"} ${font} font-medium text-left [white-space:nowrap]`}>{item}</span>
                <span className={`text-[12px]/[16px] box-border ${isActive ? "text-[#A6CBD3]" : "text-[#475E75]"} ${font} font-medium text-left [white-space:nowrap]`}>{counts[item]}</span>
              </button>
            );
          })}
        </div>
        <button type="button" className={`box-border w-fit shrink-0 h-[40px] flex flex-row gap-[8px] p-[0px_16px] justify-center items-center bg-[#FFFFFF] [outline:1px_solid_#475E75] [outline-offset:-0.5px] rounded-[8px] text-[14px]/[18px] text-[#223548] ${font} font-medium cursor-pointer hover:bg-[#EAF3F5] transition-colors`}>
          Export CSV
          <Download size={18} className="text-[#223548]" />
        </button>
      </div>

      <div className="box-border w-full h-fit shrink-0 flex flex-row flex-wrap gap-[20px] justify-start items-start">
        <div className="box-border [flex:1_1_520px] min-w-0 h-fit flex flex-col gap-0 justify-start items-start bg-[#FFFFFF] [outline:1px_solid_#D5DADD] [outline-offset:-0.5px] rounded-[12px] overflow-hidden">
          <div className="w-full h-fit shrink-0 flex flex-row flex-wrap gap-[10px] p-[14px_16px] justify-start items-center [border-width:0px_0px_1px_0px] [border-style:solid] [border-color:#D5DADD]">
            <label className="box-border [flex:1_1_200px] min-w-[200px] h-[40px] flex flex-row gap-[10px] p-[0px_16px] justify-start items-center bg-[#F5F6F7] [outline:1px_solid_#D5DADD] [outline-offset:-0.5px] rounded-[8px]">
              <Search size={20} className="text-[#475E75] shrink-0" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search name, email or organization"
                className={`box-border w-full min-w-0 bg-transparent text-[14px]/[18px] text-[#223548] ${font} font-normal outline-none placeholder:text-[#475E75]`}
              />
            </label>
            <label className="box-border w-fit shrink-0 h-[40px] flex flex-row gap-[8px] p-[0px_12px] justify-start items-center [outline:1px_solid_#D5DADD] [outline-offset:-0.5px] rounded-[8px] cursor-pointer">
              <select
                value={orgFilter}
                onChange={(event) => setOrgFilter(event.target.value as "All types" | OrgType)}
                className={`bg-transparent text-[14px]/[18px] text-[#223548] ${font} font-normal outline-none appearance-none cursor-pointer`}
              >
                <option value="All types">All types</option>
                <option value="Company">Company</option>
                <option value="Campus">Campus</option>
                <option value="Other">Other</option>
              </select>
              <ChevronDown size={16} className="text-[#475E75] shrink-0" />
            </label>
            <label className="box-border w-fit shrink-0 h-[40px] flex flex-row gap-[8px] p-[0px_12px] justify-start items-center [outline:1px_solid_#D5DADD] [outline-offset:-0.5px] rounded-[8px] cursor-pointer">
              <select className={`bg-transparent text-[14px]/[18px] text-[#223548] ${font} font-normal outline-none appearance-none cursor-pointer`}>
                <option>All articles</option>
                <option>Why SAP S/4HANA matters for modern enterprises</option>
                <option>Digital transformation trends this year</option>
                <option>The future of cloud ERP solutions</option>
                <option>5 ways to optimize your business processes</option>
              </select>
              <ChevronDown size={16} className="text-[#475E75] shrink-0" />
            </label>
          </div>

          {selected.size > 0 && (
            <div className="w-full h-fit shrink-0 flex flex-row gap-[16px] p-[10px_16px] justify-start items-center bg-[#EAF3F5] [border-width:0px_0px_1px_0px] [border-style:solid] [border-color:#D5DADD]">
              <div className={`text-[14px]/[18px] box-border [flex:1_1_0] text-[#000354] ${font} font-medium text-left`}>{selected.size} selected</div>
              <button type="button" className={`box-border w-fit shrink-0 h-fit flex flex-row gap-[6px] justify-start items-center text-[13px]/[17px] text-[#000354] ${font} font-medium cursor-pointer`}>
                <MailX size={15} className="text-[#000354]" />
                Unsubscribe
              </button>
              <button type="button" className={`box-border w-fit shrink-0 h-fit flex flex-row gap-[6px] justify-start items-center text-[13px]/[17px] text-[#000354] ${font} font-medium cursor-pointer`}>
                <Download size={15} className="text-[#000354]" />
                Export
              </button>
              <button type="button" className={`box-border w-fit shrink-0 h-fit flex flex-row gap-[6px] justify-start items-center text-[13px]/[17px] text-[#D20A0A] ${font} font-medium cursor-pointer`}>
                <Trash2 size={15} className="text-[#D20A0A]" />
                Delete data
              </button>
            </div>
          )}

          <div className="w-full h-fit shrink-0 flex flex-row gap-[14px] p-[10px_16px] justify-start items-center bg-[#F5F6F7] [border-width:0px_0px_1px_0px] [border-style:solid] [border-color:#D5DADD]">
            <div className="box-border w-[18px] shrink-0 h-[18px]" />
            <div className={`text-[12px]/[16px] box-border [flex:1_1_0] text-[#475E75] ${font} font-medium tracking-[1px] text-left`}>SUBSCRIBER</div>
            <div className={`text-[12px]/[16px] box-border w-[190px] shrink-0 text-[#475E75] ${font} font-medium tracking-[1px] text-left`}>ORGANIZATION</div>
            <div className={`text-[12px]/[16px] box-border w-[124px] shrink-0 text-[#475E75] ${font} font-medium tracking-[1px] text-left`}>STATUS</div>
          </div>

          {visible.map((subscriber) => {
            const isActive = subscriber.id === active.id;
            const style = statusStyle[subscriber.status];
            return (
              <div
                key={subscriber.id}
                role="button"
                tabIndex={0}
                onClick={() => setActiveId(subscriber.id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") setActiveId(subscriber.id);
                }}
                className={`w-full h-fit shrink-0 flex flex-row gap-[14px] p-[12px_16px] justify-start items-center cursor-pointer transition-colors [border-width:0px_0px_1px_0px] [border-style:solid] [border-color:#EAECEE] ${
                  isActive ? "bg-[#EAF3F5] [border-width:0px_0px_0px_3px] [border-color:#2F6E80]" : "bg-[#FFFFFF] hover:bg-[#F5F6F7]"
                }`}
              >
                <Checkbox checked={selected.has(subscriber.id)} onToggle={() => toggleSelected(subscriber.id)} label={`Select ${subscriber.name}`} />
                <div className="box-border [flex:1_1_0] min-w-0 h-fit flex flex-row gap-[12px] justify-start items-center">
                  <div className="box-border w-[34px] shrink-0 h-[34px] flex flex-row gap-0 justify-center items-center bg-[#EAF3F5] rounded-[999px]">
                    <span className={`text-[12px]/[16px] box-border text-[#2F6E80] ${font} font-medium text-left [white-space:nowrap]`}>{subscriber.initials}</span>
                  </div>
                  <div className="box-border [flex:1_1_0] min-w-0 h-fit flex flex-col gap-[1px] justify-start items-start">
                    <div className={`text-[14px]/[18px] box-border text-[#000000] ${font} font-medium text-left [white-space:nowrap]`}>{subscriber.name}</div>
                    <div className={`text-[12px]/[16px] box-border w-full text-[#475E75] ${font} font-normal text-left truncate`}>{subscriber.email}</div>
                  </div>
                </div>
                <div className="box-border w-[190px] shrink-0 h-fit flex flex-col gap-[2px] justify-start items-start">
                  <div className={`text-[13px]/[17px] box-border w-full text-[#223548] ${font} font-medium text-left truncate`}>{subscriber.org}</div>
                  <div className={`text-[12px]/[16px] box-border text-[#475E75] ${font} font-normal text-left [white-space:nowrap]`}>{subscriber.orgType}</div>
                </div>
                <div className="box-border w-[124px] shrink-0 h-fit flex flex-row gap-0 justify-start items-start">
                  <div className="box-border w-fit shrink-0 h-fit flex flex-row gap-[6px] p-[4px_10px] justify-start items-center rounded-[999px]" style={{ backgroundColor: style.bg }}>
                    <div className="box-border w-[6px] shrink-0 h-[6px] rounded-[50%]" style={{ backgroundColor: style.dot }} />
                    <span className={`text-[12px]/[16px] box-border ${font} font-medium text-left [white-space:nowrap]`} style={{ color: style.text }}>
                      {subscriber.status}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="w-full h-fit shrink-0 flex flex-row gap-0 p-[12px_16px] justify-between items-center [border-width:1px_0px_0px_0px] [border-style:solid] [border-color:#D5DADD]">
            <span className={`text-[13px]/[17px] box-border text-[#475E75] ${font} font-normal text-left [white-space:nowrap]`}>
              Showing {visible.length} of {subscribers.length} people
            </span>
          </div>
        </div>

        <aside className="box-border w-[380px] max-w-full shrink-0 h-fit flex flex-col gap-0 justify-start items-start bg-[#FFFFFF] [outline:1px_solid_#D5DADD] [outline-offset:-0.5px] rounded-[12px] overflow-hidden">
          <div className="w-full h-fit shrink-0 flex flex-col gap-[14px] p-[24px] justify-start items-start [border-width:0px_0px_1px_0px] [border-style:solid] [border-color:#D5DADD]">
            <div className="box-border w-full h-fit shrink-0 flex flex-row gap-0 justify-between items-start">
              <div className="box-border w-[52px] shrink-0 h-[52px] flex flex-row gap-0 justify-center items-center bg-[#EAF3F5] rounded-[999px]">
                <span className={`text-[18px]/[23px] box-border text-[#2F6E80] ${font} font-medium text-left [white-space:nowrap]`}>{active.initials}</span>
              </div>
              <button type="button" aria-label="Close details" className="box-border w-[32px] shrink-0 h-[32px] flex flex-row gap-0 justify-center items-center rounded-[8px] hover:bg-[#EAF3F5] cursor-pointer transition-colors">
                <X size={16} className="text-[#475E75]" />
              </button>
            </div>
            <div className="box-border w-full h-fit shrink-0 flex flex-col gap-[4px] justify-start items-start">
              <div className={`text-[20px]/[26px] box-border text-[#000000] ${font} font-medium text-left [white-space:nowrap]`}>{active.name}</div>
              <div className={`text-[14px]/[18px] box-border text-[#354A5F] ${font} font-normal text-left [white-space:nowrap]`}>{active.email}</div>
            </div>
            <div className="box-border w-fit h-fit shrink-0 flex flex-row gap-[6px] p-[4px_10px] justify-start items-center rounded-[999px]" style={{ backgroundColor: statusStyle[active.status].bg }}>
              <div className="box-border w-[6px] shrink-0 h-[6px] rounded-[50%]" style={{ backgroundColor: statusStyle[active.status].dot }} />
              <span className={`text-[12px]/[16px] box-border ${font} font-medium text-left [white-space:nowrap]`} style={{ color: statusStyle[active.status].text }}>
                {active.status === "Subscribed" && active.consent ? "Subscribed · confirmed" : active.status}
              </span>
            </div>
          </div>

          <div className="w-full h-fit shrink-0 flex flex-col gap-[12px] p-[20px_24px] justify-start items-start [border-width:0px_0px_1px_0px] [border-style:solid] [border-color:#D5DADD]">
            <div className={`text-[11px]/[14px] box-border text-[#475E75] ${font} font-medium tracking-[1.2px] text-left [white-space:nowrap]`}>PROFILE</div>
            <ProfileRow Icon={ActiveOrgIcon} label="Organization" value={active.org} />
            <ProfileRow Icon={GraduationCap} label="Type" value={active.orgType === "Campus" ? "University / Campus" : active.orgType} />
            <ProfileRow Icon={Phone} label="Phone / WhatsApp" value={active.phone} />
            <ProfileRow Icon={Calendar} label="First form" value={active.firstForm} />
          </div>

          {active.consent && (
            <div className="w-full h-fit shrink-0 flex flex-col gap-[12px] p-[20px_24px] justify-start items-start [border-width:0px_0px_1px_0px] [border-style:solid] [border-color:#D5DADD]">
              <div className={`text-[11px]/[14px] box-border text-[#475E75] ${font} font-medium tracking-[1.2px] text-left [white-space:nowrap]`}>CONSENT RECORD</div>
              <div className="box-border w-full h-fit shrink-0 flex flex-col gap-[8px] p-[12px_14px] justify-start items-start bg-[#F5F6F7] rounded-[8px]">
                <NoteRow Icon={CircleCheck} color="#188918" text={active.consent.ticked} />
                {active.consent.confirmed && <NoteRow Icon={MailCheck} color="#188918" text={active.consent.confirmed} />}
                <NoteRow Icon={FileText} color="#475E75" text={active.consent.text} />
              </div>
            </div>
          )}

          <div className="w-full h-fit shrink-0 flex flex-col gap-[12px] p-[20px_24px] justify-start items-start [border-width:0px_0px_1px_0px] [border-style:solid] [border-color:#D5DADD]">
            <div className={`text-[11px]/[14px] box-border text-[#475E75] ${font} font-medium tracking-[1.2px] text-left [white-space:nowrap]`}>
              UNLOCKED ARTICLES · {active.articles.length}
            </div>
            {active.articles.map((article) => (
              <div key={article} className="box-border w-full h-fit shrink-0 flex flex-row gap-[8px] justify-start items-center">
                <BookOpen size={14} className="text-[#2F6E80] shrink-0" />
                <div className={`text-[13px]/[17px] box-border [flex:1_1_0] text-[#223548] ${font} font-medium text-left`}>{article}</div>
              </div>
            ))}
          </div>

          <div className="box-border w-full h-fit shrink-0 flex flex-col gap-[12px] p-[24px] justify-start items-start">
            <button type="button" className={`box-border w-full h-[44px] shrink-0 flex flex-row gap-[8px] p-[0px_4px] justify-center items-center bg-[#FFFFFF] [outline:1px_solid_#475E75] [outline-offset:-0.5px] rounded-[8px] text-[15px]/[19px] text-[#223548] ${font} font-medium cursor-pointer hover:bg-[#EAF3F5] transition-colors`}>
              Unsubscribe
              <MailX size={18} className="text-[#223548]" />
            </button>
            <div className={`text-[12px]/[18px] box-border w-full text-[#475E75] ${font} font-normal text-left`}>
              Stops all emails. They can still read unlocked articles and are kept on a do-not-email list.
            </div>
            <button type="button" className={`box-border w-full h-fit shrink-0 flex flex-row gap-[6px] p-[8px_0px_0px_0px] justify-center items-center text-[14px]/[18px] text-[#D20A0A] ${font} font-medium cursor-pointer`}>
              <Trash2 size={15} className="text-[#D20A0A]" />
              Delete personal data
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

function ProfileRow({ Icon, label, value }: { Icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="box-border w-full h-fit shrink-0 flex flex-row gap-[10px] justify-start items-start">
      <Icon size={16} className="text-[#475E75] shrink-0 mt-[2px]" />
      <div className="box-border [flex:1_1_0] h-fit flex flex-col gap-[1px] justify-start items-start">
        <div className={`text-[12px]/[16px] box-border text-[#475E75] ${font} font-normal text-left [white-space:nowrap]`}>{label}</div>
        <div className={`text-[14px]/[18px] box-border w-full text-[#223548] ${font} font-medium text-left`}>{value}</div>
      </div>
    </div>
  );
}

function NoteRow({ Icon, color, text }: { Icon: LucideIcon; color: string; text: string }) {
  return (
    <div className="box-border w-full h-fit shrink-0 flex flex-row gap-[8px] justify-start items-start">
      <Icon size={14} className="shrink-0 mt-[3px]" style={{ color }} />
      <div className={`text-[13px]/[19px] box-border [flex:1_1_0] text-[#354A5F] ${font} font-normal text-left`}>{text}</div>
    </div>
  );
}
