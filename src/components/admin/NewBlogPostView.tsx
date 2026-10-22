"use client";

import Link from "next/link";
import { useState, type KeyboardEvent } from "react";
import {
  Bold,
  Check,
  ChevronDown,
  CloudUpload,
  Image as ImageIcon,
  Info,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Quote,
  Table,
  Underline,
  X,
  type LucideIcon,
} from "lucide-react";
import { AdminCard, AdminToggle } from "@/components/admin/AdminUi";

const font = "font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif]";

const EXCERPT_MAX = 200;
const META_MAX = 160;

const categories = ["Technology", "SAP", "Business", "Security", "Leadership"];
const authors = ["PST Team"];
const statuses = ["Draft", "Published", "Scheduled"] as const;

const fieldBox = "box-border w-full h-[48px] shrink-0 flex flex-row gap-0 p-[0px_16px] justify-start items-center bg-[#FFFFFF] [outline:1px_solid_#475E75] [outline-offset:-0.5px] rounded-[8px] focus-within:[outline:2px_solid_#2F6E80] focus-within:[outline-offset:-1px]";
const controlClass = `box-border w-full min-w-0 bg-transparent text-[16px]/[20px] text-[#223548] ${font} font-normal outline-none placeholder:text-[#8396A8] appearance-none cursor-pointer`;
const labelClass = `text-[14px]/[18px] box-border text-[#223548] ${font} font-medium text-left [white-space:nowrap]`;

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

function ToolbarButton({ label, Icon }: { label: string; Icon: LucideIcon }) {
  return (
    <button type="button" aria-label={label} className="box-border w-[32px] shrink-0 h-[32px] flex flex-row gap-0 justify-center items-center rounded-[4px] hover:bg-[#EAF3F5] cursor-pointer transition-colors">
      <Icon size={16} className="text-[#354A5F]" />
    </button>
  );
}

function ToolbarDivider() {
  return <div className="box-border w-[1px] shrink-0 h-[20px] bg-[#D5DADD]" />;
}

export function NewBlogPostView() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState(authors[0]);
  const [tags, setTags] = useState<string[]>(["SAP", "Enterprise"]);
  const [tagInput, setTagInput] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState<(typeof statuses)[number]>("Draft");
  const [pinned, setPinned] = useState(false);
  const [requireForm, setRequireForm] = useState(true);
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");

  const slug = slugify(title);

  function addTag(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key !== "Enter") return;
    event.preventDefault();
    const next = tagInput.trim();
    if (next && !tags.includes(next)) setTags([...tags, next]);
    setTagInput("");
  }

  return (
    <form onSubmit={(event) => event.preventDefault()} className="box-border w-full h-fit shrink-0 flex flex-row gap-[24px] p-[32px] justify-start items-start max-lg:flex-col max-lg:p-[20px]">
      <div className="box-border [flex:1_1_0] min-w-0 h-fit flex flex-col gap-[24px] justify-start items-start">
        <AdminCard title="Basic information">
          <label className="box-border w-full h-fit shrink-0 flex flex-col gap-[8px] justify-start items-start">
            <span className={labelClass}>Title *</span>
            <div className={fieldBox}>
              <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Enter the post title" className={controlClass} />
            </div>
          </label>
          <label className="box-border w-full h-fit shrink-0 flex flex-col gap-[8px] justify-start items-start">
            <span className={labelClass}>Slug</span>
            <div className={fieldBox}>
              <span className={`text-[16px]/[20px] box-border ${slug ? "text-[#223548]" : "text-[#8396A8]"} ${font} font-normal text-left [white-space:nowrap]`}>
                {slug || "auto-generated-from-title"}
              </span>
            </div>
            <span className={`text-[12px]/[15px] box-border text-[#475E75] ${font} font-normal text-left [white-space:nowrap]`}>Generated from the title — you can edit it.</span>
          </label>
          <div className="box-border w-full h-fit shrink-0 flex flex-row gap-[16px] justify-start items-start max-sm:flex-col">
            <label className="box-border [flex:1_1_0] min-w-0 h-fit flex flex-col gap-[8px] justify-start items-start">
              <span className={labelClass}>Category</span>
              <div className={`${fieldBox} justify-between`}>
                <select value={category} onChange={(event) => setCategory(event.target.value)} className={controlClass}>
                  <option value="" disabled>
                    Select category
                  </option>
                  {categories.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
                <ChevronDown size={18} className="text-[#475E75] shrink-0 pointer-events-none" />
              </div>
            </label>
            <label className="box-border [flex:1_1_0] min-w-0 h-fit flex flex-col gap-[8px] justify-start items-start">
              <span className={labelClass}>Author</span>
              <div className={`${fieldBox} justify-between`}>
                <select value={author} onChange={(event) => setAuthor(event.target.value)} className={controlClass}>
                  {authors.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
                <ChevronDown size={18} className="text-[#475E75] shrink-0 pointer-events-none" />
              </div>
            </label>
          </div>
          <div className="box-border w-full h-fit shrink-0 flex flex-col gap-[8px] justify-start items-start">
            <span className={labelClass}>Tags</span>
            <div className="box-border w-full h-[48px] shrink-0 flex flex-row gap-[8px] p-[0px_8px] justify-start items-center bg-[#FFFFFF] [outline:1px_solid_#475E75] [outline-offset:-0.5px] rounded-[8px] focus-within:[outline:2px_solid_#2F6E80] focus-within:[outline-offset:-1px]">
              {tags.map((tag) => (
                <span key={tag} className="box-border w-fit shrink-0 h-fit flex flex-row gap-[6px] p-[4px_8px_4px_10px] justify-start items-center bg-[#EAF3F5] rounded-[4px]">
                  <span className={`text-[13px]/[17px] box-border text-[#2F6E80] ${font} font-medium text-left [white-space:nowrap]`}>{tag}</span>
                  <button type="button" aria-label={`Remove ${tag}`} onClick={() => setTags(tags.filter((item) => item !== tag))} className="cursor-pointer">
                    <X size={12} className="text-[#2F6E80]" />
                  </button>
                </span>
              ))}
              <input
                value={tagInput}
                onChange={(event) => setTagInput(event.target.value)}
                onKeyDown={addTag}
                placeholder={tags.length === 0 ? "Add a tag and press Enter" : ""}
                className={`box-border [flex:1_1_0] min-w-[120px] h-full bg-transparent text-[15px]/[20px] text-[#223548] ${font} font-normal outline-none placeholder:text-[#8396A8]`}
              />
            </div>
          </div>
        </AdminCard>

        <AdminCard title="Content">
          <div className="box-border w-full h-fit shrink-0 flex flex-col gap-[8px] justify-start items-start">
            <span className={labelClass}>Featured image</span>
            <label className="box-border w-full h-fit shrink-0 flex flex-col gap-[10px] p-[32px_24px] justify-start items-center bg-[#F5F6F7] [outline:1.5px_solid_#A9B4BE] [outline-offset:-0.75px] rounded-[12px] cursor-pointer hover:bg-[#EAF3F5] transition-colors">
              <div className="box-border w-[52px] h-[52px] shrink-0 flex flex-row gap-0 justify-center items-center bg-[#EAF3F5] rounded-[999px]">
                <CloudUpload size={24} className="text-[#2F6E80]" />
              </div>
              <div className="box-border w-fit h-fit shrink-0 flex flex-row gap-[4px] justify-start items-start">
                <span className={`text-[15px]/[20px] box-border text-[#2F6E80] ${font} font-medium text-left [white-space:nowrap]`}>Click to upload</span>
                <span className={`text-[15px]/[20px] box-border text-[#354A5F] ${font} font-normal text-left [white-space:nowrap]`}>or drag and drop</span>
              </div>
              <span className={`text-[13px]/[17px] box-border text-[#475E75] ${font} font-normal text-left [white-space:nowrap]`}>PNG, JPG or WEBP up to 5 MB · 1600 × 900 recommended</span>
              <input type="file" accept="image/png,image/jpeg,image/webp" className="sr-only" aria-label="Featured image" />
            </label>
          </div>

          <div className="box-border w-full h-fit shrink-0 flex flex-col gap-[8px] justify-start items-start">
            <div className="box-border w-full h-fit shrink-0 flex flex-row gap-0 justify-between items-start">
              <span className={labelClass}>Excerpt</span>
              <span className={`text-[12px]/[16px] box-border text-[#475E75] ${font} font-normal text-left [white-space:nowrap]`}>
                {excerpt.length} / {EXCERPT_MAX}
              </span>
            </div>
            <div className="box-border w-full h-[96px] shrink-0 flex flex-row gap-0 p-[16px] justify-start items-start bg-[#FFFFFF] [outline:1px_solid_#475E75] [outline-offset:-0.5px] rounded-[8px] focus-within:[outline:2px_solid_#2F6E80] focus-within:[outline-offset:-1px]">
              <textarea
                value={excerpt}
                maxLength={EXCERPT_MAX}
                onChange={(event) => setExcerpt(event.target.value)}
                placeholder="A short summary shown on the blog list and in search results..."
                className={`box-border [flex:1_1_0] w-full h-full bg-transparent text-[16px]/[24px] text-[#223548] ${font} font-normal outline-none resize-none placeholder:text-[#8396A8]`}
              />
            </div>
          </div>

          <div className="box-border w-full h-fit shrink-0 flex flex-col gap-[8px] justify-start items-start">
            <span className={labelClass}>Body *</span>
            <div className="box-border w-full h-fit shrink-0 flex flex-col gap-0 justify-start items-start bg-[#FFFFFF] [outline:1px_solid_#475E75] [outline-offset:-0.5px] rounded-[8px] overflow-hidden">
              <div className="w-full h-fit shrink-0 flex flex-row flex-wrap gap-[4px] p-[8px_10px] justify-start items-center bg-[#F5F6F7] [border-width:0px_0px_1px_0px] [border-style:solid] [border-color:#D5DADD]">
                <label className="box-border w-fit shrink-0 h-[32px] flex flex-row gap-[6px] p-[0px_10px] justify-start items-center bg-[#FFFFFF] [outline:1px_solid_#D5DADD] [outline-offset:-0.5px] rounded-[4px] cursor-pointer">
                  <span className={`text-[13px]/[17px] box-border text-[#223548] ${font} font-normal text-left [white-space:nowrap]`}>Paragraph</span>
                  <ChevronDown size={14} className="text-[#475E75] shrink-0" />
                  <select aria-label="Block style" className="sr-only">
                    <option>Paragraph</option>
                    <option>Heading 2</option>
                    <option>Heading 3</option>
                  </select>
                </label>
                <ToolbarDivider />
                <ToolbarButton label="Bold" Icon={Bold} />
                <ToolbarButton label="Italic" Icon={Italic} />
                <ToolbarButton label="Underline" Icon={Underline} />
                <ToolbarDivider />
                <ToolbarButton label="Bulleted list" Icon={List} />
                <ToolbarButton label="Numbered list" Icon={ListOrdered} />
                <ToolbarButton label="Quote" Icon={Quote} />
                <ToolbarDivider />
                <ToolbarButton label="Link" Icon={LinkIcon} />
                <ToolbarButton label="Image" Icon={ImageIcon} />
                <ToolbarButton label="Table" Icon={Table} />
              </div>
              <div className="box-border w-full h-[300px] shrink-0 flex flex-col gap-[12px] p-[20px] justify-start items-start">
                <textarea
                  value={body}
                  onChange={(event) => setBody(event.target.value)}
                  placeholder="Write your article here. Use headings, lists and images to structure it..."
                  className={`box-border w-full h-full bg-transparent text-[16px]/[26px] text-[#223548] ${font} font-normal outline-none resize-none placeholder:text-[#8396A8]`}
                />
              </div>
            </div>
          </div>
        </AdminCard>
      </div>

      <div className="box-border w-[360px] max-lg:w-full shrink-0 h-fit flex flex-col gap-[24px] justify-start items-start">
        <AdminCard title="Publishing">
          <div className="box-border w-full h-fit shrink-0 flex flex-col gap-[8px] justify-start items-start">
            <span className={labelClass}>Status</span>
            <div role="radiogroup" aria-label="Status" className="box-border w-full h-fit shrink-0 flex flex-row gap-[4px] p-[4px] justify-start items-start bg-[#EAECEE] rounded-[8px]">
              {statuses.map((item) => {
                const isActive = status === item;
                return (
                  <button
                    key={item}
                    type="button"
                    role="radio"
                    aria-checked={isActive}
                    onClick={() => setStatus(item)}
                    className={`box-border [flex:1_1_0] h-[36px] flex flex-row gap-0 justify-center items-center rounded-[4px] cursor-pointer transition-colors ${
                      isActive ? "bg-[#FFFFFF] [box-shadow:0px_1px_3px_#22364933]" : "bg-[#FFFFFF00] hover:bg-[#FFFFFF80]"
                    }`}
                  >
                    <span className={`text-[13px]/[17px] box-border ${isActive ? "text-[#000000]" : "text-[#354A5F]"} ${font} font-medium text-left [white-space:nowrap]`}>{item}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <label className="box-border w-full h-fit shrink-0 flex flex-col gap-[8px] justify-start items-start">
            <span className={labelClass}>Publish date</span>
            <div className={fieldBox}>
              <input placeholder="Oct 22, 2026 · 09:00" className={controlClass} />
            </div>
            <span className={`text-[12px]/[15px] box-border text-[#475E75] ${font} font-normal text-left [white-space:nowrap]`}>Leave empty to publish immediately.</span>
          </label>
          <button type="button" role="checkbox" aria-checked={pinned} onClick={() => setPinned(!pinned)} className="box-border w-full h-fit shrink-0 flex flex-row gap-[10px] justify-start items-center cursor-pointer text-left">
            <span className={`box-border w-[20px] shrink-0 h-[20px] flex flex-row gap-0 justify-center items-center rounded-[4px] ${pinned ? "bg-[#2F6E80]" : "bg-[#FFFFFF] [outline:1px_solid_#475E75] [outline-offset:-0.5px]"}`}>
              {pinned && <Check size={14} className="text-[#FFFFFF]" />}
            </span>
            <span className={`text-[14px]/[18px] box-border text-[#223548] ${font} font-normal text-left [white-space:nowrap]`}>Pin as featured post</span>
          </button>
        </AdminCard>

        <AdminCard title="Access" sub="Turn this article into a lead form">
          <div className="box-border w-full h-fit shrink-0 flex flex-row gap-[16px] justify-between items-center">
            <div className="box-border [flex:1_1_0] h-fit flex flex-col gap-[2px] justify-start items-start">
              <div className={`text-[14px]/[18px] box-border text-[#000000] ${font} font-medium text-left [white-space:nowrap]`}>Require form to read full article</div>
              <div className={`text-[13px]/[17px] box-border w-full text-[#475E75] ${font} font-normal text-left`}>Visitors fill in name, email and organization once</div>
            </div>
            <AdminToggle checked={requireForm} onChange={setRequireForm} label="Require form to read full article" />
          </div>
          <label className="box-border w-full h-fit shrink-0 flex flex-col gap-[8px] justify-start items-start">
            <span className={labelClass}>Free preview</span>
            <div className={`${fieldBox} justify-between`}>
              <select className={controlClass} defaultValue="First 35% of the article">
                <option>First 35% of the article</option>
                <option>First 50% of the article</option>
                <option>First 3 paragraphs</option>
              </select>
              <ChevronDown size={18} className="text-[#475E75] shrink-0 pointer-events-none" />
            </div>
          </label>
          <div className="box-border w-full h-fit shrink-0 flex flex-row gap-[8px] p-[10px_12px] justify-start items-start bg-[#EBF8FF] rounded-[8px]">
            <Info size={14} className="text-[#0070F2] shrink-0 mt-[2px]" />
            <div className={`text-[12px]/[18px] box-border [flex:1_1_0] text-[#354A5F] ${font} font-normal text-left`}>
              The preview stays visible to search engines. Form sign-ups appear under Audience → Subscribers.
            </div>
          </div>
        </AdminCard>

        <AdminCard title="SEO" sub="How this post appears in search results">
          <label className="box-border w-full h-fit shrink-0 flex flex-col gap-[8px] justify-start items-start">
            <span className={labelClass}>Meta title</span>
            <div className={fieldBox}>
              <input value={metaTitle} maxLength={60} onChange={(event) => setMetaTitle(event.target.value)} placeholder="SEO title (max 60 characters)" className={controlClass} />
            </div>
          </label>
          <label className="box-border w-full h-fit shrink-0 flex flex-col gap-[8px] justify-start items-start">
            <div className="box-border w-full h-fit shrink-0 flex flex-row gap-0 justify-between items-start">
              <span className={labelClass}>Meta description</span>
              <span className={`text-[12px]/[16px] box-border text-[#475E75] ${font} font-normal text-left [white-space:nowrap]`}>
                {metaDescription.length} / {META_MAX}
              </span>
            </div>
            <div className="box-border w-full h-[88px] shrink-0 flex flex-row gap-0 p-[16px] justify-start items-start bg-[#FFFFFF] [outline:1px_solid_#475E75] [outline-offset:-0.5px] rounded-[8px] focus-within:[outline:2px_solid_#2F6E80] focus-within:[outline-offset:-1px]">
              <textarea
                value={metaDescription}
                maxLength={META_MAX}
                onChange={(event) => setMetaDescription(event.target.value)}
                placeholder="SEO description (max 160 characters)"
                className={`box-border [flex:1_1_0] w-full h-full bg-transparent text-[16px]/[24px] text-[#223548] ${font} font-normal outline-none resize-none placeholder:text-[#8396A8]`}
              />
            </div>
          </label>
          <div className="box-border w-full h-fit shrink-0 flex flex-col gap-[4px] p-[16px] justify-start items-start bg-[#F5F6F7] rounded-[8px]">
            <div className={`text-[12px]/[16px] box-border text-[#188918] ${font} font-normal text-left [white-space:nowrap]`}>pst.co.id › blog › {slug || "your-post-slug"}</div>
            <div className={`text-[16px]/[21px] box-border w-full text-[#1A0DAB] ${font} font-medium text-left`}>{metaTitle || `${title || "Your post title"} — PT Prima Sistem Terpadu`}</div>
            <div className={`text-[13px]/[19px] box-border w-full text-[#354A5F] ${font} font-normal text-left`}>
              {metaDescription || "Your meta description will appear here in search results."}
            </div>
          </div>
        </AdminCard>

        <AdminCard title="Actions">
          <button type="submit" className={`box-border w-full h-[48px] shrink-0 flex flex-row gap-[8px] p-[0px_24px] justify-center items-center bg-[#000354] hover:bg-[#0B1470] rounded-[8px] text-[16px]/[20px] text-[#FFFFFF] ${font} font-medium cursor-pointer transition-colors`}>
            Publish post
          </button>
          <div className="box-border w-full h-fit shrink-0 flex flex-row gap-[12px] justify-start items-start">
            <button type="button" className={`box-border [flex:1_1_0] h-[48px] flex flex-row gap-[8px] p-[0px_24px] justify-center items-center bg-[#FFFFFF] [outline:1px_solid_#475E75] [outline-offset:-0.5px] rounded-[8px] text-[16px]/[20px] text-[#223548] ${font} font-medium cursor-pointer hover:bg-[#EAF3F5] transition-colors`}>
              Save draft
            </button>
            <button type="button" className={`box-border [flex:1_1_0] h-[48px] flex flex-row gap-[8px] p-[0px_24px] justify-center items-center bg-[#FFFFFF] [outline:1px_solid_#2F6E80] [outline-offset:-0.5px] rounded-[8px] text-[16px]/[20px] text-[#2F6E80] ${font} font-medium cursor-pointer hover:bg-[#EAF3F5] transition-colors`}>
              Preview
            </button>
          </div>
          <Link href="/admin/blog" className={`box-border w-full text-[14px]/[18px] text-[#475E75] hover:text-[#000354] transition-colors ${font} font-medium text-center`}>
            Cancel
          </Link>
        </AdminCard>
      </div>
    </form>
  );
}
