"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type DragEvent, type FormEvent } from "react";
import { ChevronDown, CloudUpload, Trash2, X } from "lucide-react";
import { AdminCard, AdminField, AdminNotice, AdminToggle } from "@/components/admin/AdminUi";
import { uploadPhoto } from "@/app/admin/gallery/actions";
import { MAX_PHOTO_MB, galleryCategories } from "@/lib/galleryModel";

const font = "font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif]";

const fieldBox = "box-border w-full h-[48px] shrink-0 flex flex-row gap-0 p-[0px_16px] justify-start items-center bg-[#FFFFFF] [outline:1px_solid_#475E75] [outline-offset:-0.5px] rounded-[8px] focus-within:[outline:2px_solid_#2F6E80] focus-within:[outline-offset:-1px]";
const controlClass = `box-border w-full min-w-0 bg-transparent text-[16px]/[20px] text-[#223548] ${font} font-normal outline-none placeholder:text-[#8396A8]`;
const labelClass = `text-[14px]/[18px] box-border text-[#223548] ${font} font-medium text-left [white-space:nowrap]`;
const accepted = ["image/png", "image/jpeg", "image/webp", "image/gif"];

type Status = "waiting" | "uploading" | "done" | "failed";
type Item = { key: string; file: File; preview: string; status: Status; error?: string };

const megabytes = (bytes: number) => `${(bytes / 1024 / 1024).toFixed(1)} MB`;

export function UploadGalleryView({ nextOrder }: { nextOrder: number }) {
  const router = useRouter();
  const input = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [rejected, setRejected] = useState<string[]>([]);
  const [dragging, setDragging] = useState(false);
  const [published, setPublished] = useState(true);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  // Free the preview URLs when leaving the page
  const previews = useRef<string[]>([]);
  useEffect(() => () => previews.current.forEach((url) => URL.revokeObjectURL(url)), []);

  function add(files: FileList | null) {
    if (!files) return;
    const skipped: string[] = [];
    const next: Item[] = [];
    for (const file of Array.from(files)) {
      if (!accepted.includes(file.type)) skipped.push(`${file.name}: not a PNG, JPG, WebP or GIF image`);
      else if (file.size > MAX_PHOTO_MB * 1024 * 1024) skipped.push(`${file.name}: larger than ${MAX_PHOTO_MB} MB`);
      else {
        const preview = URL.createObjectURL(file);
        previews.current.push(preview);
        next.push({ key: `${file.name}-${file.size}-${file.lastModified}-${Math.random()}`, file, preview, status: "waiting" });
      }
    }
    setRejected(skipped);
    setItems((current) => [...current, ...next]);
    if (input.current) input.current.value = "";
  }

  function drop(event: DragEvent<HTMLElement>) {
    event.preventDefault();
    setDragging(false);
    add(event.dataTransfer.files);
  }

  const setStatus = (key: string, status: Status, error?: string) =>
    setItems((current) => current.map((item) => (item.key === key ? { ...item, status, error } : item)));

  // One request per photo keeps each under the size limit and gives real progress
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const pendingItems = items.filter((item) => item.status !== "done");
    if (!pendingItems.length) {
      setMessage("Add at least one image first.");
      return;
    }
    const form = new FormData(event.currentTarget);
    if (!String(form.get("title") ?? "").trim()) {
      setMessage("Title is required.");
      return;
    }
    setMessage("");
    setBusy(true);
    let order = Number.parseFloat(String(form.get("order"))) || nextOrder;
    let failed = 0;
    for (const item of pendingItems) {
      setStatus(item.key, "uploading");
      const data = new FormData();
      for (const [key, value] of form.entries()) if (key !== "order") data.append(key, value);
      data.set("order", String(order++));
      data.set("photo", item.file);
      const result = await uploadPhoto({ message: "" }, data);
      if (result.ok) setStatus(item.key, "done");
      else {
        failed++;
        setStatus(item.key, "failed", result.message);
      }
    }
    setBusy(false);
    if (!failed) router.push("/admin/gallery");
    else setMessage(`${failed} of ${pendingItems.length} uploads failed. Fix the problem and press Upload again to retry them.`);
  }

  const remaining = items.filter((item) => item.status !== "done").length;

  return (
    <form onSubmit={handleSubmit} className="box-border w-full h-fit shrink-0 flex flex-row gap-[24px] p-[32px] justify-start items-start max-lg:flex-col max-lg:p-[20px]">
      {published && <input type="hidden" name="published" value="on" />}
      <div className="box-border [flex:1_1_0] min-w-0 max-lg:w-full h-fit flex flex-col gap-[24px] justify-start items-start">
        {message && <AdminNotice>{message}</AdminNotice>}

        <AdminCard title="Images" sub="Upload one or more photos">
          <input ref={input} type="file" multiple accept={accepted.join(",")} className="sr-only" aria-label="Upload images" onChange={(event) => add(event.target.files)} />
          <button
            type="button"
            onClick={() => input.current?.click()}
            onDragOver={(event) => {
              event.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={drop}
            className={`box-border w-full h-fit shrink-0 flex flex-col gap-[10px] p-[56px_24px] justify-start items-center [outline:1.5px_dashed_#A9B4BE] [outline-offset:-0.75px] rounded-[12px] cursor-pointer transition-colors ${dragging ? "bg-[#EAF3F5]" : "bg-[#F5F6F7] hover:bg-[#EAF3F5]"}`}
          >
            <span className="box-border w-[52px] h-[52px] shrink-0 flex flex-row gap-0 justify-center items-center bg-[#EAF3F5] rounded-[999px]">
              <CloudUpload size={24} className="text-[#2F6E80]" />
            </span>
            <span className="box-border w-fit max-w-full h-fit shrink-0 flex flex-row flex-wrap justify-center gap-[4px]">
              <span className={`text-[15px]/[20px] box-border text-[#2F6E80] ${font} font-medium`}>Click to upload</span>
              <span className={`text-[15px]/[20px] box-border text-[#354A5F] ${font} font-normal`}>or drag and drop multiple images</span>
            </span>
            <span className={`text-[13px]/[17px] box-border text-[#475E75] ${font} font-normal text-center`}>PNG, JPG, WebP or GIF up to {MAX_PHOTO_MB} MB each</span>
          </button>
          {rejected.length > 0 && <AdminNotice>Skipped {rejected.join("; ")}.</AdminNotice>}

          {items.length > 0 && (
            <div className="box-border w-full h-fit shrink-0 flex flex-col gap-[10px] justify-start items-start">
              {items.map((item) => {
                const label = { waiting: "Ready", uploading: "Uploading…", done: "Uploaded", failed: item.error ?? "Failed" }[item.status];
                const color = { waiting: "text-[#475E75]", uploading: "text-[#2F6E80]", done: "text-[#188918]", failed: "text-[#D20A0A]" }[item.status];
                return (
                  <div key={item.key} className="box-border w-full h-fit shrink-0 flex flex-row gap-[14px] p-[12px] justify-start items-center [outline:1px_solid_#D5DADD] [outline-offset:-0.5px] rounded-[8px]">
                    <div className="box-border w-[56px] shrink-0 h-[42px] bg-no-repeat bg-cover bg-center rounded-[4px]" style={{ backgroundImage: `url(${item.preview})` }} />
                    <div className="box-border [flex:1_1_0] min-w-0 h-fit flex flex-col gap-[6px] justify-start items-start">
                      <div className="box-border w-full h-fit shrink-0 flex flex-row flex-wrap gap-x-[12px] justify-between items-start">
                        <span className={`text-[14px]/[18px] box-border max-w-full truncate text-[#000000] ${font} font-medium text-left`}>{item.file.name}</span>
                        <span className={`text-[12px]/[16px] box-border ${color} ${font} font-normal text-left`}>
                          {megabytes(item.file.size)} · {label}
                        </span>
                      </div>
                      <div className="box-border w-full h-[6px] shrink-0 bg-[#EAECEE] rounded-[999px] overflow-hidden">
                        <div
                          className={`h-[6px] rounded-[999px] transition-all ${item.status === "done" ? "w-full bg-[#188918]" : item.status === "uploading" ? "w-2/3 bg-[#2F6E80] animate-pulse" : item.status === "failed" ? "w-full bg-[#D20A0A]" : "w-0"}`}
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      aria-label={`Remove ${item.file.name}`}
                      disabled={busy || item.status === "done"}
                      onClick={() => setItems(items.filter((other) => other.key !== item.key))}
                      className="box-border w-[32px] shrink-0 h-[32px] flex flex-row gap-0 justify-center items-center rounded-[8px] hover:bg-[#EAF3F5] cursor-pointer transition-colors disabled:opacity-40 disabled:cursor-default"
                    >
                      {item.status === "failed" ? <X size={16} className="text-[#475E75]" /> : <Trash2 size={16} className="text-[#475E75]" />}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </AdminCard>

        <AdminCard title="Details" sub="Applied to all images in this upload">
          <AdminField label="Title *" name="title" placeholder="e.g. SAP implementation workshop" hint="Also read out by screen readers. Edit each photo later to give it its own title." />
          <AdminField label="Description" name="description" multiline rows={3} hint="Optional. Shown under the photo when a visitor opens it." />
          <div className="box-border w-full h-fit shrink-0 flex flex-row gap-[16px] justify-start items-start max-sm:flex-col">
            <label className="box-border [flex:1_1_0] min-w-0 max-sm:w-full h-fit flex flex-col gap-[8px] justify-start items-start">
              <span className={labelClass}>Category</span>
              <div className={`${fieldBox} justify-between`}>
                <select name="category" defaultValue={galleryCategories[0]} className={`${controlClass} appearance-none cursor-pointer`}>
                  {galleryCategories.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
                <ChevronDown size={18} className="text-[#475E75] shrink-0 pointer-events-none" />
              </div>
            </label>
            <label className="box-border [flex:1_1_0] min-w-0 max-sm:w-full h-fit flex flex-col gap-[8px] justify-start items-start">
              <span className={labelClass}>Event date</span>
              <div className={fieldBox}>
                <input type="date" name="eventDate" aria-label="Event date" className={`${controlClass} [color-scheme:light]`} />
              </div>
            </label>
          </div>
        </AdminCard>
        <AdminCard title="Indonesian version" sub="Optional · empty fields use the English text">
          <AdminField label="Title (ID)" name="titleId" placeholder="e.g. Workshop implementasi SAP" />
          <AdminField label="Description (ID)" name="descriptionId" multiline rows={3} />
        </AdminCard>
      </div>

      <div className="box-border w-[360px] max-lg:w-full shrink-0 h-fit flex flex-col gap-[24px] justify-start items-start">
        <AdminCard title="Settings">
          <div className="box-border w-full h-fit shrink-0 flex flex-row gap-[16px] justify-between items-center">
            <div className="box-border [flex:1_1_0] h-fit flex flex-col gap-[2px] justify-start items-start">
              <div className={`text-[14px]/[18px] box-border text-[#000000] ${font} font-medium text-left [white-space:nowrap]`}>Published</div>
              <div className={`text-[13px]/[17px] box-border w-full text-[#475E75] ${font} font-normal text-left`}>Visible on the Gallery page</div>
            </div>
            <AdminToggle checked={published} onChange={setPublished} label="Published" />
          </div>
          <AdminField label="Display order" name="order" type="number" value={String(nextOrder)} hint="Lower numbers appear first. Each next image counts up from here." />
        </AdminCard>

        <AdminCard title="Actions">
          <button type="submit" disabled={busy} className={`box-border w-full h-[48px] shrink-0 flex flex-row gap-[8px] p-[0px_24px] justify-center items-center bg-[#000354] hover:bg-[#0B1470] disabled:opacity-60 disabled:cursor-wait rounded-[8px] text-[16px]/[20px] text-[#FFFFFF] ${font} font-medium cursor-pointer transition-colors`}>
            {busy ? "Uploading…" : `Upload ${remaining} ${remaining === 1 ? "image" : "images"}`}
          </button>
          <Link href="/admin/gallery" className={`box-border w-full text-[14px]/[18px] text-[#475E75] hover:text-[#000354] transition-colors ${font} font-medium text-center`}>
            Cancel
          </Link>
        </AdminCard>
      </div>
    </form>
  );
}
