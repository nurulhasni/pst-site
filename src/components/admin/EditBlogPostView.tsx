"use client";

import Link from "next/link";
import { startTransition, useActionState, useRef, useState, type FormEvent } from "react";
import { ChevronDown, ExternalLink, Heading2, Image as ImageIcon, Info, List, ListOrdered, Quote, Trash2, type LucideIcon } from "lucide-react";
import { AdminCard, AdminCheckbox, AdminField, AdminNotice, AdminToggle } from "@/components/admin/AdminUi";
import { ImageDrop } from "@/components/admin/ImageDrop";
import { deletePost, savePost } from "@/app/admin/blog/actions";
import type { FormState } from "@/lib/adminForms";
import { EXCERPT_MAX, MAX_COVER_MB, META_DESCRIPTION_MAX, META_TITLE_MAX, blogCategories, postStatus, slugify, type BlogPost } from "@/lib/blogModel";

const font = "font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif]";

const fieldBox = "box-border w-full h-[48px] shrink-0 flex flex-row gap-0 p-[0px_16px] justify-start items-center bg-[#FFFFFF] [outline:1px_solid_#475E75] [outline-offset:-0.5px] rounded-[8px] focus-within:[outline:2px_solid_#2F6E80] focus-within:[outline-offset:-1px]";
const controlClass = `box-border w-full min-w-0 bg-transparent text-[16px]/[20px] text-[#223548] ${font} font-normal outline-none placeholder:text-[#8396A8]`;
const labelClass = `text-[14px]/[18px] box-border text-[#223548] ${font} font-medium text-left [white-space:nowrap]`;
const hintClass = `text-[12px]/[16px] box-border text-[#475E75] ${font} font-normal text-left`;
const areaBox = "box-border w-full shrink-0 flex flex-row gap-0 p-[16px] justify-start items-start bg-[#FFFFFF] [outline:1px_solid_#475E75] [outline-offset:-0.5px] rounded-[8px] focus-within:[outline:2px_solid_#2F6E80] focus-within:[outline-offset:-1px]";
const areaClass = `box-border [flex:1_1_0] w-full h-full bg-transparent text-[16px]/[24px] text-[#223548] ${font} font-normal outline-none resize-none placeholder:text-[#8396A8]`;

const statuses = ["Draft", "Published"] as const;

// What each toolbar button puts in front of the current line
const formats: { label: string; Icon: LucideIcon; prefix: string; sample: string }[] = [
  { label: "Subheading", Icon: Heading2, prefix: "## ", sample: "Subheading" },
  { label: "Bulleted list", Icon: List, prefix: "- ", sample: "List item" },
  { label: "Numbered list", Icon: ListOrdered, prefix: "1. ", sample: "List item" },
  { label: "Quote", Icon: Quote, prefix: "> ", sample: "Quote" },
  { label: "Image", Icon: ImageIcon, prefix: "![", sample: "Caption](https://link-to-image)" },
];

export function EditBlogPostView({ post, today }: { post?: BlogPost; today: string }) {
  const [title, setTitle] = useState(post?.title ?? "");
  // A new post's web address follows its title until someone types their own
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(post));
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [body, setBody] = useState(post?.body ?? "");
  const [published, setPublished] = useState(post?.published ?? false);
  const [date, setDate] = useState(post?.date ?? "");
  const [featured, setFeatured] = useState(post?.featured ?? false);
  const [gated, setGated] = useState(post?.gated ?? false);
  const [metaTitle, setMetaTitle] = useState(post?.metaTitle ?? "");
  const [metaDescription, setMetaDescription] = useState(post?.metaDescription ?? "");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteState, setDeleteState] = useState<FormState>({ message: "" });
  const [state, action, saving] = useActionState<FormState, FormData>(savePost, { message: "" });
  const bodyArea = useRef<HTMLTextAreaElement>(null);

  const shownSlug = slugTouched ? slug : slugify(title);
  const categories = post?.category && !blogCategories.includes(post.category) ? [post.category, ...blogCategories] : blogCategories;
  const scheduled = postStatus({ published, date }, today) === "Scheduled";
  const live = post && postStatus(post, today) === "Published";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => action(formData));
  }

  function handleDelete() {
    if (!post) return;
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    setDeleting(true);
    startTransition(async () => {
      setDeleteState(await deletePost(post.id, true));
      setDeleting(false);
    });
  }

  // Starts a new line with the marker and leaves the sample text selected, ready to type over
  function insert(prefix: string, sample: string) {
    const area = bodyArea.current;
    if (!area) return;
    const at = area.selectionStart;
    const lineStart = body.lastIndexOf("\n", at - 1) + 1;
    const lineEnd = body.indexOf("\n", at) === -1 ? body.length : body.indexOf("\n", at);
    const line = body.slice(lineStart, lineEnd);
    // An empty line takes the marker in place; otherwise it goes in a new paragraph below
    const before = line.trim() ? `${body.slice(0, lineEnd)}\n\n` : body.slice(0, lineStart);
    const after = body.slice(lineEnd);
    setBody(`${before}${prefix}${sample}${after}`);
    requestAnimationFrame(() => {
      area.focus();
      area.setSelectionRange(before.length + prefix.length, before.length + prefix.length + sample.length);
    });
  }

  const message = state.message || deleteState.message;

  return (
    <form onSubmit={handleSubmit} className="box-border w-full h-fit shrink-0 flex flex-row gap-[24px] p-[32px] justify-start items-start max-lg:flex-col max-lg:p-[20px]">
      {post && <input type="hidden" name="id" value={post.id} />}
      <input type="hidden" name="image" value={post?.image ?? ""} />
      {published && <input type="hidden" name="published" value="on" />}
      {featured && <input type="hidden" name="featured" value="on" />}
      {gated && <input type="hidden" name="gated" value="on" />}

      <div className="box-border [flex:1_1_0] min-w-0 max-lg:w-full h-fit flex flex-col gap-[24px] justify-start items-start">
        {message && <AdminNotice>{message}</AdminNotice>}

        <AdminCard title="Basic information">
          <label className="box-border w-full h-fit shrink-0 flex flex-col gap-[8px] justify-start items-start">
            <span className={labelClass}>Title *</span>
            <div className={fieldBox}>
              <input name="title" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Enter the post title" className={controlClass} />
            </div>
          </label>
          <label className="box-border w-full h-fit shrink-0 flex flex-col gap-[8px] justify-start items-start">
            <span className={labelClass}>Slug</span>
            <div className={fieldBox}>
              <span className={`text-[16px]/[20px] text-[#8396A8] ${font} font-normal [white-space:nowrap]`}>/blog/</span>
              <input
                name="slug"
                value={shownSlug}
                onChange={(event) => {
                  setSlugTouched(true);
                  setSlug(event.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"));
                }}
                placeholder="generated-from-the-title"
                aria-label="Slug"
                className={controlClass}
              />
            </div>
            <span className={hintClass}>
              {post ? "The post's web address. Changing it breaks links people have already shared." : "The post's web address, generated from the title. You can edit it."}
            </span>
          </label>
          <div className="box-border w-full h-fit shrink-0 flex flex-row gap-[16px] justify-start items-start max-sm:flex-col">
            <label className="box-border [flex:1_1_0] min-w-0 max-sm:w-full h-fit flex flex-col gap-[8px] justify-start items-start">
              <span className={labelClass}>Category</span>
              <div className={`${fieldBox} justify-between`}>
                <select name="category" defaultValue={post?.category || blogCategories[0]} className={`${controlClass} appearance-none cursor-pointer`}>
                  {categories.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
                <ChevronDown size={18} className="text-[#475E75] shrink-0 pointer-events-none" />
              </div>
            </label>
            <AdminField className="[flex:1_1_0] min-w-0 max-sm:w-full" label="Tags" name="tags" value={post?.tags} placeholder="SAP, Cloud ERP, Enterprise" hint="Separate tags with commas." />
          </div>
        </AdminCard>

        <AdminCard title="Content">
          <div className="box-border w-full h-fit shrink-0 flex flex-col gap-[8px] justify-start items-start">
            <span className={labelClass}>Featured image</span>
            <ImageDrop
              name="cover"
              removeName="removeImage"
              label="Featured image"
              hint={`PNG, JPG, WebP or GIF up to ${MAX_COVER_MB} MB · 1600 × 900 recommended`}
              maxMB={MAX_COVER_MB}
              current={post?.image}
            />
          </div>

          <label className="box-border w-full h-fit shrink-0 flex flex-col gap-[8px] justify-start items-start">
            <div className="box-border w-full h-fit shrink-0 flex flex-row gap-0 justify-between items-start">
              <span className={labelClass}>Excerpt</span>
              <span className={hintClass}>
                {excerpt.length} / {EXCERPT_MAX}
              </span>
            </div>
            <div className={`${areaBox} h-[96px]`}>
              <textarea
                name="excerpt"
                value={excerpt}
                maxLength={EXCERPT_MAX}
                onChange={(event) => setExcerpt(event.target.value)}
                placeholder="A short summary shown on the blog list and in search results..."
                className={areaClass}
              />
            </div>
          </label>

          <div className="box-border w-full h-fit shrink-0 flex flex-col gap-[8px] justify-start items-start">
            <span className={labelClass}>Body *</span>
            <div className="box-border w-full h-fit shrink-0 flex flex-col gap-0 justify-start items-start bg-[#FFFFFF] [outline:1px_solid_#475E75] [outline-offset:-0.5px] rounded-[8px] overflow-hidden focus-within:[outline:2px_solid_#2F6E80] focus-within:[outline-offset:-1px]">
              <div className="w-full h-fit shrink-0 flex flex-row flex-wrap gap-[4px] p-[8px_10px] justify-start items-center bg-[#F5F6F7] [border-width:0px_0px_1px_0px] [border-style:solid] [border-color:#D5DADD]">
                {formats.map(({ label, Icon, prefix, sample }) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => insert(prefix, sample)}
                    className={`box-border w-fit shrink-0 h-[32px] flex flex-row gap-[6px] p-[0px_10px] justify-center items-center rounded-[4px] hover:bg-[#EAF3F5] cursor-pointer transition-colors text-[13px]/[17px] text-[#223548] ${font} font-normal`}
                  >
                    <Icon size={16} className="text-[#354A5F]" />
                    {label}
                  </button>
                ))}
              </div>
              <div className="box-border w-full h-[420px] shrink-0 flex flex-col p-[20px] justify-start items-start">
                <textarea
                  ref={bodyArea}
                  name="body"
                  value={body}
                  onChange={(event) => setBody(event.target.value)}
                  placeholder={"Write your article here. Leave an empty line between paragraphs.\n\n## A subheading\n\n- A bullet point\n\n> A quote"}
                  className={`box-border w-full h-full bg-transparent text-[16px]/[26px] text-[#223548] ${font} font-normal outline-none resize-none placeholder:text-[#8396A8]`}
                />
              </div>
            </div>
            <div className="box-border w-full h-fit shrink-0 flex flex-row gap-[8px] p-[10px_12px] justify-start items-start bg-[#EBF8FF] rounded-[8px]">
              <Info size={14} className="text-[#0070F2] shrink-0 mt-[2px]" />
              <div className={`text-[12px]/[18px] box-border [flex:1_1_0] text-[#354A5F] ${font} font-normal text-left`}>
                Leave an empty line between paragraphs; the first paragraph is shown larger as the introduction. Start a line with <b>##</b> for a subheading, <b>-</b> for a bullet, <b>1.</b> for a numbered item or <b>&gt;</b> for a
                quote. The same marks work when editing the “body” cell in the Sheet.
              </div>
            </div>
          </div>
        </AdminCard>

        <AdminCard title="Indonesian version" sub="Optional · empty fields use the English text">
          <AdminField label="Title (ID)" name="titleId" value={post?.titleId} />
          <AdminField label="Excerpt (ID)" name="excerptId" value={post?.excerptId} multiline rows={3} />
          <AdminField label="Body (ID)" name="bodyId" value={post?.bodyId} multiline rows={14} hint="Uses the same marks as the English body." />
        </AdminCard>
      </div>

      <div className="box-border w-[360px] max-lg:w-full shrink-0 h-fit flex flex-col gap-[24px] justify-start items-start">
        <AdminCard title="Publishing">
          <div className="box-border w-full h-fit shrink-0 flex flex-col gap-[8px] justify-start items-start">
            <span className={labelClass}>Status</span>
            <div role="radiogroup" aria-label="Status" className="box-border w-full h-fit shrink-0 flex flex-row gap-[4px] p-[4px] justify-start items-start bg-[#EAECEE] rounded-[8px]">
              {statuses.map((item) => {
                const isActive = published === (item === "Published");
                return (
                  <button
                    key={item}
                    type="button"
                    role="radio"
                    aria-checked={isActive}
                    onClick={() => setPublished(item === "Published")}
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
              <input type="date" name="date" value={date} onChange={(event) => setDate(event.target.value)} aria-label="Publish date" className={`${controlClass} [color-scheme:light]`} />
            </div>
            <span className={hintClass}>
              {scheduled ? "Scheduled: the post appears on the website on this date." : "Leave empty to use today. A published post with a later date stays hidden until that day."}
            </span>
          </label>
          <AdminCheckbox checked={featured} onChange={setFeatured} label="Pin as featured post" />
          <AdminField label="Read time (minutes)" name="readMinutes" type="number" value={post?.readMinutes} hint="Leave empty to work it out from the length of the article." />
        </AdminCard>

        <AdminCard title="Access" sub="Turn this article into a lead form">
          <div className="box-border w-full h-fit shrink-0 flex flex-row gap-[16px] justify-between items-center">
            <div className="box-border [flex:1_1_0] h-fit flex flex-col gap-[2px] justify-start items-start">
              <div className={`text-[14px]/[18px] box-border text-[#000000] ${font} font-medium text-left`}>Require form to read full article</div>
              <div className={`text-[13px]/[17px] box-border w-full text-[#475E75] ${font} font-normal text-left`}>Visitors fill in name, email and organization once</div>
            </div>
            <AdminToggle checked={gated} onChange={setGated} label="Require form to read full article" />
          </div>
          {gated && (
            <div className="box-border w-full h-fit shrink-0 flex flex-row gap-[8px] p-[10px_12px] justify-start items-start bg-[#EBF8FF] rounded-[8px]">
              <Info size={14} className="text-[#0070F2] shrink-0 mt-[2px]" />
              <div className={`text-[12px]/[18px] box-border [flex:1_1_0] text-[#354A5F] ${font} font-normal text-left`}>Visitors see the start of the article, then the form.</div>
            </div>
          )}
        </AdminCard>

        <AdminCard title="SEO" sub="How this post appears in search results">
          <label className="box-border w-full h-fit shrink-0 flex flex-col gap-[8px] justify-start items-start">
            <span className={labelClass}>Meta title</span>
            <div className={fieldBox}>
              <input name="metaTitle" value={metaTitle} maxLength={META_TITLE_MAX} onChange={(event) => setMetaTitle(event.target.value)} placeholder={`SEO title (max ${META_TITLE_MAX} characters)`} className={controlClass} />
            </div>
          </label>
          <label className="box-border w-full h-fit shrink-0 flex flex-col gap-[8px] justify-start items-start">
            <div className="box-border w-full h-fit shrink-0 flex flex-row gap-0 justify-between items-start">
              <span className={labelClass}>Meta description</span>
              <span className={hintClass}>
                {metaDescription.length} / {META_DESCRIPTION_MAX}
              </span>
            </div>
            <div className={`${areaBox} h-[88px]`}>
              <textarea
                name="metaDescription"
                value={metaDescription}
                maxLength={META_DESCRIPTION_MAX}
                onChange={(event) => setMetaDescription(event.target.value)}
                placeholder={`SEO description (max ${META_DESCRIPTION_MAX} characters)`}
                className={areaClass}
              />
            </div>
          </label>
          <div className="box-border w-full h-fit shrink-0 flex flex-col gap-[4px] p-[16px] justify-start items-start bg-[#F5F6F7] rounded-[8px]">
            <div className={`text-[12px]/[16px] box-border w-full text-[#188918] ${font} font-normal text-left break-all`}>pst.co.id › blog › {shownSlug || "your-post-slug"}</div>
            <div className={`text-[16px]/[21px] box-border w-full text-[#1A0DAB] ${font} font-medium text-left`}>{metaTitle || `${title || "Your post title"} — PT Prima Sistem Terpadu`}</div>
            <div className={`text-[13px]/[19px] box-border w-full text-[#354A5F] ${font} font-normal text-left`}>
              {metaDescription || excerpt || "Your meta description will appear here in search results."}
            </div>
          </div>
        </AdminCard>

        <AdminCard title="Actions">
          <button type="submit" disabled={saving || deleting} className={`box-border w-full h-[48px] shrink-0 flex flex-row gap-[8px] p-[0px_24px] justify-center items-center bg-[#000354] hover:bg-[#0B1470] disabled:opacity-60 disabled:cursor-wait rounded-[8px] text-[16px]/[20px] text-[#FFFFFF] ${font} font-medium cursor-pointer transition-colors`}>
            {saving ? "Saving…" : !published ? "Save draft" : scheduled ? "Schedule post" : post ? "Save post" : "Publish post"}
          </button>
          {live && (
            <Link href={`/blog/${post.slug}`} target="_blank" className={`box-border w-full h-[48px] shrink-0 flex flex-row gap-[8px] p-[0px_24px] justify-center items-center bg-[#FFFFFF] [outline:1px_solid_#2F6E80] [outline-offset:-0.5px] rounded-[8px] text-[16px]/[20px] text-[#2F6E80] ${font} font-medium hover:bg-[#EAF3F5] transition-colors`}>
              <ExternalLink size={16} />
              View on website
            </Link>
          )}
          <Link href="/admin/blog" className={`box-border w-full text-[14px]/[18px] text-[#475E75] hover:text-[#000354] transition-colors ${font} font-medium text-center`}>
            Cancel
          </Link>
          {post && (
            <button type="button" onClick={handleDelete} disabled={saving || deleting} className={`box-border w-full h-fit shrink-0 flex flex-row gap-[6px] justify-center items-center text-[14px]/[18px] text-[#D20A0A] ${font} font-medium cursor-pointer disabled:opacity-60`}>
              <Trash2 size={16} className="text-[#D20A0A]" />
              {deleting ? "Deleting…" : confirmDelete ? "Click again to delete permanently" : "Delete post"}
            </button>
          )}
        </AdminCard>
      </div>
    </form>
  );
}
