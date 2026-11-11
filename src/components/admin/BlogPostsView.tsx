"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { ChevronDown, Eye, Lock, Pencil, Plus, Search, Star, Trash2 } from "lucide-react";
import { AdminNotice } from "@/components/admin/AdminUi";
import { deletePost, importBlog } from "@/app/admin/blog/actions";
import type { FormState } from "@/lib/adminForms";
import { defaultCover, formatPostDate, postStatus, type BlogPost, type PostStatus } from "@/lib/blogModel";

const font = "font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif]";

const statusStyle: Record<PostStatus, { bg: string; text: string; dot: string }> = {
  Published: { bg: "#F5FAE5", text: "#188918", dot: "#188918" },
  Draft: { bg: "#EAECEE", text: "#354A5F", dot: "#354A5F" },
  Scheduled: { bg: "#EBF8FF", text: "#0070F2", dot: "#0070F2" },
};

const tabs = ["All posts", "Published", "Drafts"] as const;
type Tab = (typeof tabs)[number];

const rowAction = "box-border w-[32px] shrink-0 h-[32px] flex flex-row gap-0 justify-center items-center rounded-[8px] hover:bg-[#EAF3F5] cursor-pointer transition-colors";

// `today` (Jakarta) decides whether a published post is live or still scheduled
export function BlogPostsView({ posts, imported, today }: { posts: BlogPost[]; imported: boolean; today: string }) {
  const [tab, setTab] = useState<Tab>("All posts");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [confirming, setConfirming] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [pending, startTransition] = useTransition();

  const rows = posts.map((post) => ({ post, status: postStatus(post, today) }));
  const counts: Record<Tab, number> = {
    "All posts": rows.length,
    Published: rows.filter((row) => row.status !== "Draft").length,
    Drafts: rows.filter((row) => row.status === "Draft").length,
  };
  const categories = [...new Set(posts.map((post) => post.category).filter(Boolean))].sort();
  const search = query.trim().toLowerCase();
  const visible = rows.filter(({ post, status }) => {
    const matchesTab = tab === "All posts" || (tab === "Drafts" ? status === "Draft" : status !== "Draft");
    const matchesQuery = !search || post.title.toLowerCase().includes(search) || post.titleId.toLowerCase().includes(search);
    return matchesTab && matchesQuery && (!category || post.category === category);
  });

  function run(task: () => Promise<FormState>) {
    setMessage("");
    startTransition(async () => {
      const result = await task();
      if (result.message) setMessage(result.message);
      setConfirming(null);
    });
  }

  return (
    <div className="box-border w-full h-fit shrink-0 flex flex-col gap-[24px] p-[32px] justify-start items-start max-lg:p-[20px]">
      {!imported && (
        <div className="box-border w-full h-fit shrink-0 flex flex-row flex-wrap gap-[16px] p-[20px] justify-between items-center bg-[#EAF3F5] rounded-[12px]">
          <div className="box-border [flex:1_1_320px] min-w-0 h-fit flex flex-col gap-[4px]">
            <div className={`text-[15px]/[20px] text-[#000354] ${font} font-medium`}>Blog posts aren’t in the Google Sheet yet</div>
            <div className={`text-[14px]/[20px] text-[#354A5F] ${font} font-normal`}>Below are the articles the Blog page shows today. Import them to the “Blog” tab to edit them or add new posts.</div>
          </div>
          <button
            type="button"
            disabled={pending}
            onClick={() => run(importBlog)}
            className={`box-border w-fit shrink-0 h-[44px] flex flex-row gap-[8px] p-[0px_24px] justify-center items-center bg-[#000354] hover:bg-[#0B1470] disabled:opacity-60 disabled:cursor-wait rounded-[8px] text-[15px]/[19px] text-[#FFFFFF] ${font} font-medium cursor-pointer transition-colors`}
          >
            {pending ? "Importing…" : "Import to Google Sheet"}
          </button>
        </div>
      )}
      {message && <AdminNotice>{message}</AdminNotice>}

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
                <span className={`text-[12px]/[16px] box-border ${isActive ? "text-[#A6CBD3]" : "text-[#475E75]"} ${font} font-medium text-left [white-space:nowrap]`}>{counts[item]}</span>
              </button>
            );
          })}
        </div>
        {imported && (
          <Link href="/admin/blog/new" className={`box-border w-fit shrink-0 h-[44px] flex flex-row gap-[8px] p-[0px_24px] justify-center items-center bg-[#000354] hover:bg-[#0B1470] rounded-[8px] text-[15px]/[19px] text-[#FFFFFF] ${font} font-medium transition-colors`}>
            <Plus size={16} className="text-[#FFFFFF]" />
            New post
          </Link>
        )}
      </div>

      <div className="box-border w-full h-fit shrink-0 flex flex-col gap-0 justify-start items-start bg-[#FFFFFF] [outline:1px_solid_#D5DADD] [outline-offset:-0.5px] rounded-[12px] overflow-x-auto">
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
          <label className="box-border w-fit shrink-0 h-[40px] flex flex-row gap-[8px] p-[0px_14px] justify-start items-center [outline:1px_solid_#D5DADD] [outline-offset:-0.5px] rounded-[8px] cursor-pointer">
            <select value={category} onChange={(event) => setCategory(event.target.value)} aria-label="Category" className={`bg-transparent text-[14px]/[18px] text-[#223548] ${font} font-normal outline-none appearance-none cursor-pointer`}>
              <option value="">All categories</option>
              {categories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
            <ChevronDown size={16} className="text-[#475E75] shrink-0" />
          </label>
        </div>

        <div className="w-full min-w-[760px] h-fit shrink-0 flex flex-row gap-[16px] p-[12px_20px] justify-start items-start bg-[#F5F6F7] [border-width:0px_0px_1px_0px] [border-style:solid] [border-color:#D5DADD]">
          <div className={`text-[12px]/[16px] box-border [flex:1_1_0] min-w-[260px] text-[#475E75] ${font} font-medium tracking-[1px] text-left`}>POST</div>
          <div className={`text-[12px]/[16px] box-border w-[130px] shrink-0 text-[#475E75] ${font} font-medium tracking-[1px] text-left`}>CATEGORY</div>
          <div className={`text-[12px]/[16px] box-border w-[120px] shrink-0 text-[#475E75] ${font} font-medium tracking-[1px] text-left`}>STATUS</div>
          <div className={`text-[12px]/[16px] box-border w-[130px] shrink-0 text-[#475E75] ${font} font-medium tracking-[1px] text-left`}>DATE</div>
          <div className="box-border w-[112px] shrink-0 h-[16px]" />
        </div>

        {visible.map(({ post, status }) => {
          const style = statusStyle[status];
          return (
            <div key={post.id} className="w-full min-w-[760px] h-fit shrink-0 flex flex-row gap-[16px] p-[14px_20px] justify-start items-center [border-width:0px_0px_1px_0px] [border-style:solid] [border-color:#EAECEE]">
              <div className="box-border [flex:1_1_0] min-w-[260px] h-fit flex flex-row gap-[14px] justify-start items-center">
                <div className="box-border w-[64px] shrink-0 h-[44px] bg-[#EAECEE] bg-no-repeat bg-cover bg-center rounded-[4px]" style={{ backgroundImage: `url(${post.image || defaultCover})` }} />
                <div className="box-border [flex:1_1_0] min-w-0 h-fit flex flex-col gap-[2px] justify-start items-start">
                  <div className="box-border w-full h-fit shrink-0 flex flex-row gap-[8px] justify-start items-center">
                    <div className={`text-[15px]/[20px] box-border [flex:1_1_0] min-w-0 text-[#000000] ${font} font-medium text-left break-words`}>{post.title || "(untitled)"}</div>
                    {post.featured && <Star size={14} aria-label="Featured" className="text-[#E76500] fill-[#E76500] shrink-0" />}
                    {post.gated && (
                      <div className="box-border w-fit shrink-0 h-fit flex flex-row gap-[4px] p-[2px_8px] justify-start items-center bg-[#EAF3F5] rounded-[999px]">
                        <Lock size={11} className="text-[#2F6E80] shrink-0" />
                        <span className={`text-[11px]/[14px] box-border text-[#2F6E80] ${font} font-medium text-left [white-space:nowrap]`}>Form</span>
                      </div>
                    )}
                  </div>
                  <div className={`text-[12px]/[16px] box-border text-[#475E75] ${font} font-normal text-left w-full truncate`}>/blog/{post.slug}</div>
                </div>
              </div>
              <div className={`text-[14px]/[18px] box-border w-[130px] shrink-0 text-[#354A5F] ${font} font-normal text-left`}>{post.category}</div>
              <div className="box-border w-[120px] shrink-0 h-fit flex flex-row gap-0 justify-start items-start">
                <div className="box-border w-fit shrink-0 h-fit flex flex-row gap-[6px] p-[4px_10px] justify-start items-center rounded-[999px]" style={{ backgroundColor: style.bg }}>
                  <div className="box-border w-[6px] shrink-0 h-[6px] rounded-[50%]" style={{ backgroundColor: style.dot }} />
                  <span className={`text-[12px]/[16px] box-border ${font} font-medium text-left [white-space:nowrap]`} style={{ color: style.text }}>
                    {status}
                  </span>
                </div>
              </div>
              <div className={`text-[14px]/[18px] box-border w-[130px] shrink-0 text-[#354A5F] ${font} font-normal text-left`}>{formatPostDate(post.date, "en") || "—"}</div>
              <div className="box-border w-[112px] shrink-0 h-fit flex flex-row gap-[4px] justify-end items-center">
                {confirming === post.id ? (
                  <>
                    <button type="button" disabled={pending} onClick={() => run(() => deletePost(post.id, false))} className={`h-[32px] px-[10px] rounded-[8px] bg-[#D20A0A] hover:bg-[#AA0808] text-[12px]/[16px] text-[#FFFFFF] ${font} font-medium cursor-pointer disabled:opacity-60`}>
                      {pending ? "…" : "Delete"}
                    </button>
                    <button type="button" disabled={pending} onClick={() => setConfirming(null)} className={`h-[32px] px-[8px] rounded-[8px] hover:bg-[#EAF3F5] text-[12px]/[16px] text-[#354A5F] ${font} font-medium cursor-pointer`}>
                      Keep
                    </button>
                  </>
                ) : (
                  <>
                    {status === "Published" && (
                      <Link href={`/blog/${post.slug}`} target="_blank" aria-label={`View ${post.title}`} className={rowAction}>
                        <Eye size={16} className="text-[#354A5F]" />
                      </Link>
                    )}
                    {imported && (
                      <>
                        <Link href={`/admin/blog/edit?id=${encodeURIComponent(post.id)}`} aria-label={`Edit ${post.title}`} className={rowAction}>
                          <Pencil size={16} className="text-[#354A5F]" />
                        </Link>
                        <button type="button" aria-label={`Delete ${post.title}`} onClick={() => setConfirming(post.id)} className={rowAction}>
                          <Trash2 size={16} className="text-[#D20A0A]" />
                        </button>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          );
        })}

        <div className="w-full h-fit shrink-0 flex flex-row gap-0 p-[14px_20px] justify-between items-center">
          <span className={`text-[13px]/[17px] box-border text-[#475E75] ${font} font-normal text-left [white-space:nowrap]`}>
            {visible.length === rows.length ? `${rows.length} ${rows.length === 1 ? "post" : "posts"}` : `Showing ${visible.length} of ${rows.length} posts`}
          </span>
        </div>
      </div>
    </div>
  );
}
