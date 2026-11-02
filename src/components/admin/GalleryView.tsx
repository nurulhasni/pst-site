"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { Check, LayoutGrid, List, Pencil, Plus } from "lucide-react";
import { AdminNotice } from "@/components/admin/AdminUi";
import { deletePhotos, importGallery, setPhotosPublished } from "@/app/admin/gallery/actions";
import type { FormState } from "@/lib/adminForms";
import { galleryCategories, type GalleryPhoto } from "@/lib/galleryModel";

const font = "font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif]";

const primaryButton = `box-border w-fit shrink-0 h-[40px] flex flex-row gap-[8px] p-[0px_20px] justify-center items-center bg-[#000354] hover:bg-[#0B1470] disabled:opacity-60 disabled:cursor-wait rounded-[8px] text-[14px]/[18px] text-[#FFFFFF] ${font} font-medium cursor-pointer transition-colors`;
const barButton = `box-border w-fit shrink-0 h-[36px] flex flex-row gap-[6px] p-[0px_14px] justify-center items-center bg-[#FFFFFF] [outline:1px_solid_#475E75] [outline-offset:-0.5px] rounded-[8px] text-[13px]/[17px] text-[#223548] ${font} font-medium cursor-pointer hover:bg-[#EAF3F5] disabled:opacity-60 transition-colors`;

const statusStyle = {
  Published: { bg: "#F5FAE5", text: "#188918", dot: "#188918" },
  Draft: { bg: "#EAECEE", text: "#354A5F", dot: "#354A5F" },
};

export function GalleryView({ photos, imported }: { photos: GalleryPhoto[]; imported: boolean }) {
  const [category, setCategory] = useState("All");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [message, setMessage] = useState("");
  const [pending, startTransition] = useTransition();

  // Categories typed straight into the Sheet get their own filter too
  const categories = ["All", ...galleryCategories, ...new Set(photos.map((p) => p.category).filter((c) => c && !galleryCategories.includes(c)))];
  const visible = photos.filter((photo) => category === "All" || photo.category === category);
  const ids = [...selected];

  function toggle(id: string) {
    setConfirmDelete(false);
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function run(task: () => Promise<FormState>, clearSelection = true) {
    setMessage("");
    startTransition(async () => {
      const result = await task();
      if (result.message) setMessage(result.message);
      else if (clearSelection) setSelected(new Set());
      setConfirmDelete(false);
    });
  }

  return (
    <div className="box-border w-full h-fit shrink-0 flex flex-col gap-[24px] p-[32px] justify-start items-start max-lg:p-[20px]">
      {!imported && (
        <div className="box-border w-full h-fit shrink-0 flex flex-row flex-wrap gap-[16px] p-[20px] justify-between items-center bg-[#EAF3F5] rounded-[12px]">
          <div className="box-border [flex:1_1_320px] min-w-0 h-fit flex flex-col gap-[4px]">
            <div className={`text-[15px]/[20px] text-[#000354] ${font} font-medium`}>The gallery isn’t in the Google Sheet yet</div>
            <div className={`text-[14px]/[20px] text-[#354A5F] ${font} font-normal`}>Below are the nine photos the Gallery page shows today. Import them to the “Gallery” tab before uploading new ones.</div>
          </div>
          <button type="button" disabled={pending} onClick={() => run(importGallery, false)} className={primaryButton}>
            {pending ? "Importing…" : "Import to Google Sheet"}
          </button>
        </div>
      )}
      {message && <AdminNotice>{message}</AdminNotice>}

      <div className="box-border w-full h-fit shrink-0 flex flex-row flex-wrap gap-[16px] justify-between items-center">
        <div role="tablist" className="box-border w-fit max-w-full shrink-0 h-fit flex flex-row flex-wrap gap-[8px] justify-start items-start">
          {categories.map((item) => {
            const count = item === "All" ? photos.length : photos.filter((photo) => photo.category === item).length;
            const isActive = category === item;
            return (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setCategory(item)}
                className={`box-border w-fit shrink-0 h-fit flex flex-row gap-[8px] p-[8px_14px] justify-start items-center rounded-[999px] cursor-pointer transition-colors ${
                  isActive ? "bg-[#000354] [outline:1px_solid_#000354] [outline-offset:-0.5px]" : "bg-[#FFFFFF] hover:bg-[#EAF3F5] [outline:1px_solid_#D5DADD] [outline-offset:-0.5px]"
                }`}
              >
                <span className={`text-[14px]/[18px] box-border ${isActive ? "text-[#FFFFFF]" : "text-[#223548]"} ${font} font-medium text-left [white-space:nowrap]`}>{item}</span>
                <span className={`text-[12px]/[16px] box-border ${isActive ? "text-[#A6CBD3]" : "text-[#475E75]"} ${font} font-medium text-left [white-space:nowrap]`}>{count}</span>
              </button>
            );
          })}
        </div>
        <div className="box-border w-fit shrink-0 h-fit flex flex-row gap-[12px] justify-start items-center">
          <div role="group" aria-label="View" className="box-border w-fit shrink-0 h-fit flex flex-row gap-[4px] p-[4px] justify-start items-start bg-[#FFFFFF] [outline:1px_solid_#D5DADD] [outline-offset:-0.5px] rounded-[8px]">
            <button type="button" aria-label="Grid view" aria-pressed={view === "grid"} onClick={() => setView("grid")} className={`box-border w-[32px] shrink-0 h-[32px] flex flex-row gap-0 justify-center items-center rounded-[4px] cursor-pointer ${view === "grid" ? "bg-[#EAF3F5]" : "bg-[#FFFFFF00] hover:bg-[#EAF3F5]"}`}>
              <LayoutGrid size={16} className={view === "grid" ? "text-[#2F6E80]" : "text-[#475E75]"} />
            </button>
            <button type="button" aria-label="List view" aria-pressed={view === "list"} onClick={() => setView("list")} className={`box-border w-[32px] shrink-0 h-[32px] flex flex-row gap-0 justify-center items-center rounded-[4px] cursor-pointer ${view === "list" ? "bg-[#EAF3F5]" : "bg-[#FFFFFF00] hover:bg-[#EAF3F5]"}`}>
              <List size={16} className={view === "list" ? "text-[#2F6E80]" : "text-[#475E75]"} />
            </button>
          </div>
          {imported && (
            <Link href="/admin/gallery/upload" className={`box-border w-fit shrink-0 h-[44px] flex flex-row gap-[8px] p-[0px_24px] justify-center items-center bg-[#000354] hover:bg-[#0B1470] rounded-[8px] text-[15px]/[19px] text-[#FFFFFF] ${font} font-medium transition-colors`}>
              + Upload images
            </Link>
          )}
        </div>
      </div>

      {ids.length > 0 && (
        <div className="box-border w-full h-fit shrink-0 flex flex-row flex-wrap gap-[10px] p-[10px_14px] items-center bg-[#EAF3F5] rounded-[8px]">
          <span className={`[flex:1_1_auto] text-[14px]/[18px] text-[#000354] ${font} font-medium`}>{ids.length} selected</span>
          <button type="button" disabled={pending} onClick={() => run(() => setPhotosPublished(ids, true))} className={barButton}>
            Publish
          </button>
          <button type="button" disabled={pending} onClick={() => run(() => setPhotosPublished(ids, false))} className={barButton}>
            Move to draft
          </button>
          <button
            type="button"
            disabled={pending}
            onClick={() => (confirmDelete ? run(() => deletePhotos(ids)) : setConfirmDelete(true))}
            className={`box-border w-fit shrink-0 h-[36px] flex flex-row gap-[6px] p-[0px_14px] justify-center items-center rounded-[8px] text-[13px]/[17px] ${font} font-medium cursor-pointer disabled:opacity-60 transition-colors ${confirmDelete ? "bg-[#D20A0A] hover:bg-[#AA0808] text-[#FFFFFF]" : "bg-[#FFFFFF] text-[#D20A0A] [outline:1px_solid_#D20A0A] [outline-offset:-0.5px]"}`}
          >
            {pending ? "Working…" : confirmDelete ? `Delete ${ids.length} permanently` : "Delete"}
          </button>
          <button type="button" onClick={() => setSelected(new Set())} className={`text-[13px]/[17px] text-[#354A5F] hover:text-[#000354] ${font} font-medium cursor-pointer px-[6px]`}>
            Clear
          </button>
        </div>
      )}

      <div className={`box-border w-full h-fit shrink-0 flex flex-row flex-wrap gap-[20px] justify-start items-start ${view === "list" ? "flex-col" : ""}`}>
        {visible.map((photo) => {
          const status = photo.published ? "Published" : "Draft";
          const style = statusStyle[status];
          const isSelected = selected.has(photo.id);
          return (
            <article
              key={photo.id}
              className={`box-border [flex:1_1_220px] min-w-[220px] max-w-full h-fit flex ${view === "list" ? "w-full flex-row" : "flex-col"} gap-0 justify-start items-start bg-[#FFFFFF] rounded-[12px] overflow-hidden ${isSelected ? "[outline:2px_solid_#2F6E80] [outline-offset:-1px]" : "[outline:1px_solid_#D5DADD] [outline-offset:-0.5px]"}`}
            >
              <div className={`box-border relative shrink-0 bg-no-repeat bg-cover bg-center ${view === "list" ? "w-[220px] h-[130px] max-sm:w-[120px]" : "w-full h-[170px]"}`} style={{ backgroundImage: `url(${photo.image})` }}>
                {imported && (
                  <button
                    type="button"
                    role="checkbox"
                    aria-checked={isSelected}
                    aria-label={`Select ${photo.title}`}
                    onClick={() => toggle(photo.id)}
                    className={`box-border w-[22px] h-[22px] absolute left-[12px] top-[12px] flex flex-row gap-0 justify-center items-center rounded-[4px] cursor-pointer ${isSelected ? "bg-[#2F6E80]" : "bg-[#FFFFFFE6] [outline:1px_solid_#475E75] [outline-offset:-0.5px]"}`}
                  >
                    {isSelected && <Check size={14} className="text-[#FFFFFF]" />}
                  </button>
                )}
              </div>
              <div className="box-border [flex:1_1_0] min-w-0 w-full h-fit flex flex-col gap-[8px] p-[14px_16px] justify-start items-start">
                <div className="box-border w-full flex flex-row gap-[8px] justify-between items-start">
                  <div className={`text-[15px]/[20px] box-border [flex:1_1_0] min-w-0 text-[#000000] ${font} font-medium text-left`}>{photo.title || "(untitled)"}</div>
                  {imported && (
                    <Link href={`/admin/gallery/edit?id=${encodeURIComponent(photo.id)}`} aria-label={`Edit ${photo.title}`} className="box-border w-[28px] h-[28px] shrink-0 flex justify-center items-center rounded-[6px] hover:bg-[#EAF3F5]">
                      <Pencil size={14} className="text-[#354A5F]" />
                    </Link>
                  )}
                </div>
                <div className="box-border w-full h-fit shrink-0 flex flex-row gap-0 justify-between items-center">
                  <span className={`text-[13px]/[17px] box-border text-[#475E75] ${font} font-normal text-left [white-space:nowrap]`}>{photo.category || "No category"}</span>
                  <div className="box-border w-fit shrink-0 h-fit flex flex-row gap-[6px] p-[4px_10px] justify-start items-center rounded-[999px]" style={{ backgroundColor: style.bg }}>
                    <div className="box-border w-[6px] shrink-0 h-[6px] rounded-[50%]" style={{ backgroundColor: style.dot }} />
                    <span className={`text-[12px]/[16px] box-border ${font} font-medium text-left [white-space:nowrap]`} style={{ color: style.text }}>
                      {status}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          );
        })}

        {imported && (
          <Link
            href="/admin/gallery/upload"
            className={`box-border [flex:1_1_220px] min-w-[220px] ${view === "list" ? "w-full h-[130px]" : "h-[250px]"} flex flex-col gap-[10px] justify-center items-center bg-[#FFFFFF] [outline:1.5px_dashed_#A9B4BE] [outline-offset:-0.75px] rounded-[12px] hover:bg-[#EAF3F5] transition-colors`}
          >
            <div className="box-border w-[48px] h-[48px] shrink-0 flex flex-row gap-0 justify-center items-center bg-[#EAF3F5] rounded-[999px]">
              <Plus size={22} className="text-[#2F6E80]" />
            </div>
            <span className={`text-[15px]/[20px] box-border text-[#2F6E80] ${font} font-medium text-left [white-space:nowrap]`}>Upload images</span>
          </Link>
        )}
      </div>
    </div>
  );
}
