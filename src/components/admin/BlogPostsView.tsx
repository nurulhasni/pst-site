"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, Eye, Lock, Pencil, Plus, Search, Star, Trash2, type LucideIcon } from "lucide-react";

const font = "font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif]";

const unsplash = (id: string, ixid = "M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3OTI2NDM4MjF8") =>
  `https://images.unsplash.com/${id}?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=${ixid}&ixlib=rb-4.1.0&q=80&w=1080`;

type Status = "Published" | "Draft" | "Scheduled";

type Post = {
  title: string;
  slug: string;
  category: string;
  author: string;
  status: Status;
  date: string;
  thumb: string;
  starred?: boolean;
  gated?: boolean;
};

const posts: Post[] = [
  {
    title: "Navigating the future of enterprise technology",
    slug: "/blog/navigating-future-enterprise-technology",
    category: "Technology",
    author: "PST Team",
    status: "Published",
    date: "Oct 15, 2026",
    thumb: unsplash("photo-1787647562412-e9eaad870778", "M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3OTI2NDM3OTd8"),
    starred: true,
  },
  {
    title: "Digital transformation trends this year",
    slug: "/blog/digital-transformation-trends",
    category: "Technology",
    author: "PST Team",
    status: "Published",
    date: "Oct 12, 2026",
    thumb: unsplash("photo-1665725045018-d734fe11e46d"),
    gated: true,
  },
  {
    title: "Why SAP S/4HANA matters for modern enterprises",
    slug: "/blog/why-sap-s4hana-matters",
    category: "SAP",
    author: "PST Team",
    status: "Published",
    date: "Oct 10, 2026",
    thumb: unsplash("photo-1782330300311-fbe6f4389012"),
    gated: true,
  },
  {
    title: "5 ways to optimize your business processes",
    slug: "/blog/optimize-business-processes",
    category: "Business",
    author: "PST Team",
    status: "Published",
    date: "Oct 8, 2026",
    thumb: unsplash("photo-1690192123455-6337e6db4179"),
  },
  {
    title: "The future of cloud ERP solutions",
    slug: "/blog/future-cloud-erp",
    category: "Technology",
    author: "PST Team",
    status: "Draft",
    date: "—",
    thumb: unsplash("photo-1690264459607-a90b23d887f8"),
  },
  {
    title: "How to choose the right SAP partner",
    slug: "/blog/choose-right-sap-partner",
    category: "SAP",
    author: "PST Team",
    status: "Published",
    date: "Oct 2, 2026",
    thumb: unsplash("photo-1759310610325-2c7cb621e5e3"),
  },
  {
    title: "Maximizing ROI from your ERP investment",
    slug: "/blog/maximizing-erp-roi",
    category: "Business",
    author: "PST Team",
    status: "Draft",
    date: "—",
    thumb: unsplash("photo-1686061593213-98dad7c599b9"),
  },
  {
    title: "Cybersecurity best practices for enterprise systems",
    slug: "/blog/cybersecurity-best-practices",
    category: "Security",
    author: "PST Team",
    status: "Scheduled",
    date: "Oct 30, 2026",
    thumb: unsplash("photo-1642693963853-2c231c0a014a"),
  },
];

const statusStyle: Record<Status, { bg: string; text: string; dot: string }> = {
  Published: { bg: "#F5FAE5", text: "#188918", dot: "#188918" },
  Draft: { bg: "#EAECEE", text: "#354A5F", dot: "#354A5F" },
  Scheduled: { bg: "#EBF8FF", text: "#0070F2", dot: "#0070F2" },
};

const tabs = ["All posts", "Published", "Drafts"] as const;
type Tab = (typeof tabs)[number];

const tabCounts: Record<Tab, string> = { "All posts": "9", Published: "6", Drafts: "3" };

export function BlogPostsView() {
  const [tab, setTab] = useState<Tab>("All posts");
  const [query, setQuery] = useState("");

  const visible = posts.filter((post) => {
    const matchesTab = tab === "All posts" || (tab === "Published" && post.status === "Published") || (tab === "Drafts" && post.status === "Draft");
    const matchesQuery = query.trim() === "" || post.title.toLowerCase().includes(query.trim().toLowerCase());
    return matchesTab && matchesQuery;
  });

  return (
    <div className="box-border w-full h-fit shrink-0 flex flex-col gap-[24px] p-[32px] justify-start items-start max-lg:p-[20px]">
      <div className="box-border w-full h-fit shrink-0 flex flex-row flex-wrap gap-[16px] justify-between items-center">
        <div role="tablist" className="box-border w-fit shrink-0 h-fit flex flex-row flex-wrap gap-[12px] justify-start items-start">
          {tabs.map((item) => {
            const isActive = tab === item;
            return (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setTab(item)}
                className={`box-border w-fit shrink-0 h-fit flex flex-row gap-[8px] p-[8px_14px] justify-start items-center rounded-[999px] cursor-pointer transition-colors ${
                  isActive ? "bg-[#000354] [outline:1px_solid_#000354] [outline-offset:-0.5px]" : "bg-[#FFFFFF] hover:bg-[#EAF3F5] [outline:1px_solid_#D5DADD] [outline-offset:-0.5px]"
                }`}
              >
                <span className={`text-[14px]/[18px] box-border ${isActive ? "text-[#FFFFFF]" : "text-[#223548]"} ${font} font-medium text-left [white-space:nowrap]`}>{item}</span>
                <span className={`text-[12px]/[16px] box-border ${isActive ? "text-[#A6CBD3]" : "text-[#475E75]"} ${font} font-medium text-left [white-space:nowrap]`}>{tabCounts[item]}</span>
              </button>
            );
          })}
        </div>
        <Link href="/admin/blog/new" className={`box-border w-fit shrink-0 h-[44px] flex flex-row gap-[8px] p-[0px_24px] justify-center items-center bg-[#000354] hover:bg-[#0B1470] rounded-[8px] text-[15px]/[19px] text-[#FFFFFF] ${font} font-medium transition-colors`}>
          <Plus size={16} className="text-[#FFFFFF]" />
          New post
        </Link>
      </div>

      <div className="box-border w-full h-fit shrink-0 flex flex-col gap-0 justify-start items-start bg-[#FFFFFF] [outline:1px_solid_#D5DADD] [outline-offset:-0.5px] rounded-[12px] overflow-hidden">
        <div className="w-full h-fit shrink-0 flex flex-row flex-wrap gap-[12px] p-[16px_20px] justify-start items-center [border-width:0px_0px_1px_0px] [border-style:solid] [border-color:#D5DADD]">
          <label className="box-border [flex:1_1_240px] min-w-[240px] max-w-[320px] h-[40px] flex flex-row gap-[10px] p-[0px_16px] justify-start items-center bg-[#F5F6F7] [outline:1px_solid_#D5DADD] [outline-offset:-0.5px] rounded-[8px]">
            <Search size={20} className="text-[#475E75] shrink-0" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search posts"
              className={`box-border w-full min-w-0 bg-transparent text-[14px]/[18px] text-[#223548] ${font} font-normal outline-none placeholder:text-[#475E75]`}
            />
          </label>
          <FilterSelect label="All categories" options={["All categories", "Technology", "SAP", "Business", "Security"]} />
          <FilterSelect label="All authors" options={["All authors", "PST Team"]} />
        </div>

        <div className="w-full h-fit shrink-0 flex flex-row gap-[16px] p-[12px_20px] justify-start items-start bg-[#F5F6F7] [border-width:0px_0px_1px_0px] [border-style:solid] [border-color:#D5DADD]">
          <div className={`text-[12px]/[16px] box-border [flex:1_1_0] text-[#475E75] ${font} font-medium tracking-[1px] text-left`}>POST</div>
          <div className={`text-[12px]/[16px] box-border w-[130px] shrink-0 text-[#475E75] ${font} font-medium tracking-[1px] text-left`}>CATEGORY</div>
          <div className={`text-[12px]/[16px] box-border w-[120px] shrink-0 text-[#475E75] ${font} font-medium tracking-[1px] text-left`}>AUTHOR</div>
          <div className={`text-[12px]/[16px] box-border w-[120px] shrink-0 text-[#475E75] ${font} font-medium tracking-[1px] text-left`}>STATUS</div>
          <div className={`text-[12px]/[16px] box-border w-[130px] shrink-0 text-[#475E75] ${font} font-medium tracking-[1px] text-left`}>DATE</div>
          <div className="box-border w-[112px] shrink-0 h-[16px]" />
        </div>

        {visible.map((post) => {
          const style = statusStyle[post.status];
          return (
            <div key={post.slug} className="w-full h-fit shrink-0 flex flex-row gap-[16px] p-[14px_20px] justify-start items-center [border-width:0px_0px_1px_0px] [border-style:solid] [border-color:#EAECEE]">
              <div className="box-border [flex:1_1_0] min-w-0 h-fit flex flex-row gap-[14px] justify-start items-center">
                <div className="box-border w-[64px] shrink-0 h-[44px] bg-no-repeat bg-cover bg-center rounded-[4px]" style={{ backgroundImage: `url(${post.thumb})` }} />
                <div className="box-border [flex:1_1_0] min-w-0 h-fit flex flex-col gap-[2px] justify-start items-start">
                  <div className="box-border w-full h-fit shrink-0 flex flex-row gap-[8px] justify-start items-center">
                    <div className={`text-[15px]/[20px] box-border [flex:1_1_0] min-w-0 text-[#000000] ${font} font-medium text-left`}>{post.title}</div>
                    {post.starred && <Star size={14} className="text-[#E76500] fill-[#E76500] shrink-0" />}
                    {post.gated && (
                      <div className="box-border w-fit shrink-0 h-fit flex flex-row gap-[4px] p-[2px_8px] justify-start items-center bg-[#EAF3F5] rounded-[999px]">
                        <Lock size={11} className="text-[#2F6E80] shrink-0" />
                        <span className={`text-[11px]/[14px] box-border text-[#2F6E80] ${font} font-medium text-left [white-space:nowrap]`}>Form</span>
                      </div>
                    )}
                  </div>
                  <div className={`text-[12px]/[16px] box-border text-[#475E75] ${font} font-normal text-left [white-space:nowrap]`}>{post.slug}</div>
                </div>
              </div>
              <div className={`text-[14px]/[18px] box-border w-[130px] shrink-0 text-[#354A5F] ${font} font-normal text-left`}>{post.category}</div>
              <div className={`text-[14px]/[18px] box-border w-[120px] shrink-0 text-[#354A5F] ${font} font-normal text-left`}>{post.author}</div>
              <div className="box-border w-[120px] shrink-0 h-fit flex flex-row gap-0 justify-start items-start">
                <div className="box-border w-fit shrink-0 h-fit flex flex-row gap-[6px] p-[4px_10px] justify-start items-center rounded-[999px]" style={{ backgroundColor: style.bg }}>
                  <div className="box-border w-[6px] shrink-0 h-[6px] rounded-[50%]" style={{ backgroundColor: style.dot }} />
                  <span className={`text-[12px]/[16px] box-border ${font} font-medium text-left [white-space:nowrap]`} style={{ color: style.text }}>
                    {post.status}
                  </span>
                </div>
              </div>
              <div className={`text-[14px]/[18px] box-border w-[130px] shrink-0 text-[#354A5F] ${font} font-normal text-left`}>{post.date}</div>
              <div className="box-border w-[112px] shrink-0 h-fit flex flex-row gap-[4px] justify-end items-start">
                <RowAction label="View post" Icon={Eye} color="#354A5F" />
                <RowAction label="Edit post" Icon={Pencil} color="#354A5F" />
                <RowAction label="Delete post" Icon={Trash2} color="#D20A0A" />
              </div>
            </div>
          );
        })}

        <div className="w-full h-fit shrink-0 flex flex-row gap-0 p-[14px_20px] justify-between items-center [border-width:1px_0px_0px_0px] [border-style:solid] [border-color:#D5DADD]">
          <span className={`text-[13px]/[17px] box-border text-[#475E75] ${font} font-normal text-left [white-space:nowrap]`}>
            Showing {visible.length > 0 ? `1–${visible.length}` : "0"} of 9 posts
          </span>
          <div className="box-border w-fit shrink-0 h-fit flex flex-row gap-[6px] justify-start items-start">
            <PageButton label="Previous page" Icon={ChevronLeft} />
            <PageButton label="Page 1" text="1" active />
            <PageButton label="Page 2" text="2" />
            <PageButton label="Next page" Icon={ChevronRight} />
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterSelect({ label, options }: { label: string; options: string[] }) {
  return (
    <label className="box-border w-fit shrink-0 h-[40px] flex flex-row gap-[8px] p-[0px_14px] justify-start items-center [outline:1px_solid_#D5DADD] [outline-offset:-0.5px] rounded-[8px] cursor-pointer">
      <select aria-label={label} className={`bg-transparent text-[14px]/[18px] text-[#223548] ${font} font-normal outline-none appearance-none cursor-pointer`}>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
      <ChevronDown size={16} className="text-[#475E75] shrink-0" />
    </label>
  );
}

function RowAction({ label, Icon, color }: { label: string; Icon: LucideIcon; color: string }) {
  return (
    <button type="button" aria-label={label} className="box-border w-[32px] shrink-0 h-[32px] flex flex-row gap-0 justify-center items-center rounded-[8px] hover:bg-[#EAF3F5] cursor-pointer transition-colors">
      <Icon size={16} style={{ color }} />
    </button>
  );
}

function PageButton({ label, text, Icon, active = false }: { label: string; text?: string; Icon?: LucideIcon; active?: boolean }) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-current={active ? "page" : undefined}
      className={`box-border w-[32px] shrink-0 h-[32px] flex flex-row gap-0 justify-center items-center rounded-[8px] cursor-pointer transition-colors ${
        active ? "bg-[#000354] [outline:1px_solid_#000354] [outline-offset:-0.5px]" : "bg-[#FFFFFF] hover:bg-[#EAF3F5] [outline:1px_solid_#D5DADD] [outline-offset:-0.5px]"
      }`}
    >
      {Icon ? <Icon size={16} className="text-[#354A5F]" /> : <span className={`text-[13px]/[17px] box-border ${active ? "text-[#FFFFFF]" : "text-[#223548]"} ${font} font-medium text-left`}>{text}</span>}
    </button>
  );
}
