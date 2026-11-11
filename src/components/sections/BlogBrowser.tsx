"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { blogCategories, localSummary, type PostSummary } from "@/lib/blogModel";
import { useLanguage } from "@/components/LanguageProvider";

const font = "font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif]";

const PAGE_SIZE = 9;

// `posts` arrive newest first, with the featured post in front
export function BlogBrowser({ posts }: { posts: PostSummary[] }) {
  const { t, lang } = useLanguage();
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const all = posts.map((post) => localSummary(post, lang));
  const [featured, ...rest] = all;
  // The usual categories in their usual order, then any others staff typed into the Sheet
  const used = new Set(posts.map((post) => post.category).filter(Boolean));
  const categories = ["All", ...blogCategories.filter((item) => used.has(item)), ...[...used].filter((item) => !blogCategories.includes(item))];
  const isFiltered = category !== "All" || query.trim() !== "";
  // A search or category filter looks through every post, the featured one included
  const matches = all.filter((post) => {
    const inCategory = category === "All" || post.category === category;
    const inQuery = post.title.toLowerCase().includes(query.trim().toLowerCase());
    return inCategory && inQuery;
  });
  const listed = isFiltered ? matches : rest;
  const pages = Math.max(1, Math.ceil(listed.length / PAGE_SIZE));
  const current = Math.min(page, pages);
  const shown = listed.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);
  const pageButton = `box-border h-[40px] flex flex-row gap-[6px] items-center justify-center rounded-[8px] text-[14px]/[18px] ${font} font-medium cursor-pointer disabled:cursor-default disabled:opacity-50`;
  const plainButton = "bg-[#FFFFFF] text-[#223548] hover:bg-[#EAF3F5] disabled:hover:bg-[#FFFFFF] [outline:1px_solid_#D5DADD] [outline-offset:-0.5px]";

  return (
    <div className="box-border w-full h-fit flex flex-col gap-[56px] p-[64px_96px_112px_96px] justify-start items-start max-lg:p-[40px_20px_60px_20px]">
      <div className="box-border w-full h-fit min-h-[48px] flex flex-row flex-wrap gap-[16px] justify-between items-center">
        <div className="box-border w-fit max-w-full h-fit flex flex-row flex-wrap gap-[8px]">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                setCategory(item);
                setPage(1);
              }}
              className={`box-border w-fit h-[34px] p-[0px_14px] flex items-center rounded-[999px] text-[14px]/[18px] ${font} font-medium ${
                category === item
                  ? "bg-[#000354] hover:bg-[#0B1470] text-[#FFFFFF]"
                  : "bg-[#FFFFFF] text-[#223548] hover:bg-[#EAF3F5] [outline:1px_solid_#D5DADD] [outline-offset:-0.5px]"
              }`}
            >
              {t(`blog.cat.${item}`)}
            </button>
          ))}
        </div>
        <label className="box-border w-[320px] max-w-full h-[48px] flex flex-row gap-[10px] p-[0px_16px] items-center bg-[#F5F6F7] rounded-[8px]">
          <Search size={20} className="text-[#8396A8] shrink-0" />
          <input
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(1);
            }}
            placeholder={t("blog.search")}
            className={`box-border w-full bg-transparent text-[16px]/[20px] text-[#000000] ${font} placeholder:text-[#8396A8] outline-none`}
          />
        </label>
      </div>

      {!isFiltered && current === 1 && featured && (
        <Link
          href={`/blog/${featured.slug}`}
          className="group box-border w-full h-[440px] flex flex-row gap-[18px] bg-[#FFFFFF] rounded-[12px] overflow-hidden max-lg:h-auto max-lg:flex-col"
        >
          <div
            className="box-border w-[688px] max-w-[55%] h-full shrink-0 bg-cover bg-center max-lg:w-full max-lg:max-w-none max-lg:h-[260px]"
            style={{ backgroundImage: `url(${featured.image})` }}
            role="img"
            aria-label={featured.title}
          />
          <div className="box-border [flex:1_1_0] min-w-0 h-full flex flex-col gap-[18px] justify-center py-[24px] pr-[24px] items-start">
            <div className="flex flex-row gap-[8px]">
              <span className={`box-border w-fit h-[24px] p-[4px_10px] flex items-center bg-[#000354] rounded-[999px] text-[12px]/[16px] text-[#FFFFFF] ${font} font-medium`}>{t("blog.featured")}</span>
              <span className={`box-border w-fit h-[24px] p-[4px_10px] flex items-center bg-[#EAF3F5] rounded-[999px] text-[12px]/[16px] text-[#2F6E80] ${font} font-medium`}>{t(`blog.cat.${featured.category}`)}</span>
            </div>
            <div className={`text-[32px]/[37px] text-[#000000] ${font} font-medium`}>{featured.title}</div>
            <div className={`text-[16px]/[26px] text-[#354A5F] ${font}`}>{featured.excerpt}</div>
            <div className="flex flex-row gap-[12px] items-center">
              <div className="box-border w-[36px] h-[36px] shrink-0 rounded-[999px] bg-[#EAF3F5] bg-[url('/images/pst/pst-logo.png')] bg-no-repeat bg-contain bg-center" />
              <div className="flex flex-col gap-[2px]">
                <span className={`text-[14px]/[18px] text-[#000000] ${font} font-medium`}>{t("blog.team")}</span>
                <span className={`text-[13px]/[17px] text-[#475E75] ${font}`}>{featured.date} · {featured.readTime}</span>
              </div>
            </div>
            <span className={`flex flex-row gap-[4px] items-center text-[16px]/[20px] text-[#2F6E80] group-hover:text-[#000354] transition-colors ${font} font-medium`}>
              {t("insights.read")}
              <ChevronRight size={16} />
            </span>
          </div>
        </Link>
      )}

      <div className="box-border w-full h-fit grid grid-cols-3 gap-x-[32px] gap-y-[56px] max-lg:grid-cols-1 max-xl:grid-cols-2">
        {shown.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group box-border w-full h-fit flex flex-col gap-[16px] justify-start items-start">
            <div
              className="box-border w-full h-[220px] bg-cover bg-center rounded-[12px]"
              style={{ backgroundImage: `url(${post.image})` }}
              role="img"
              aria-label={post.title}
            />
            <div className="box-border w-full h-fit flex flex-col gap-[8px]">
              <div className={`text-[12px]/[15px] text-[#2F6E80] ${font} font-medium tracking-[1.2px]`}>
                {t(`blog.cat.${post.category}`).toUpperCase()}  ·  {post.date}
              </div>
              <div className={`text-[24px]/[28px] text-[#000000] group-hover:text-[#2F6E80] transition-colors ${font} font-medium`}>{post.title}</div>
              <div className={`text-[16px]/[24px] text-[#354A5F] ${font}`}>{post.excerpt}</div>
            </div>
            <span className={`flex flex-row gap-[4px] items-center text-[16px]/[20px] text-[#2F6E80] group-hover:text-[#000354] transition-colors ${font} font-medium`}>
              {t("blog.readMore")}
              <ChevronRight size={16} />
            </span>
          </Link>
        ))}
      </div>
      {isFiltered && matches.length === 0 && (
        <div className={`text-[16px]/[24px] text-[#354A5F] ${font}`}>{t("blog.noMatch")}</div>
      )}

      {pages > 1 && (
        <div className="box-border w-full h-fit flex flex-row flex-wrap gap-[8px] justify-center items-center">
          <button type="button" disabled={current === 1} onClick={() => setPage(current - 1)} className={`${pageButton} ${plainButton} w-[80px]`}>
            <ChevronLeft size={16} />
            {t("blog.prev")}
          </button>
          {Array.from({ length: pages }, (_, index) => index + 1).map((number) => (
            <button
              key={number}
              type="button"
              aria-current={number === current ? "page" : undefined}
              onClick={() => setPage(number)}
              className={`${pageButton} w-[36px] ${number === current ? "bg-[#000354] text-[#FFFFFF]" : plainButton}`}
            >
              {number}
            </button>
          ))}
          <button type="button" disabled={current === pages} onClick={() => setPage(current + 1)} className={`${pageButton} ${plainButton} w-[81px]`}>
            {t("blog.next")}
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
