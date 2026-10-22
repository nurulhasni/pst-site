"use client";

import Link from "next/link";
import { useState, type KeyboardEvent } from "react";
import { Check, ChevronDown, CloudUpload, Trash2, X } from "lucide-react";
import { AdminCard, AdminToggle } from "@/components/admin/AdminUi";

const font = "font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif]";

const fieldBox = "box-border w-full h-[48px] shrink-0 flex flex-row gap-0 p-[0px_16px] justify-start items-center bg-[#FFFFFF] [outline:1px_solid_#475E75] [outline-offset:-0.5px] rounded-[8px] focus-within:[outline:2px_solid_#2F6E80] focus-within:[outline-offset:-1px]";
const controlClass = `box-border w-full min-w-0 bg-transparent text-[16px]/[20px] text-[#223548] ${font} font-normal outline-none placeholder:text-[#8396A8]`;
const labelClass = `text-[14px]/[18px] box-border text-[#223548] ${font} font-medium text-left [white-space:nowrap]`;

const categories = ["Events", "Projects", "Team", "Office"];

type Upload = { name: string; size: string; photo: string; progress: number };

const initialUploads: Upload[] = [
  { name: "workshop-day-1.png", size: "1.2 MB", photo: "Gallery-4.png", progress: 100 },
  { name: "workshop-day-2.png", size: "1.1 MB", photo: "Gallery-5.png", progress: 100 },
  { name: "kickoff-meeting.png", size: "1.0 MB", photo: "Gallery-8.png", progress: 64 },
];

export function UploadGalleryView() {
  const [uploads, setUploads] = useState(initialUploads);
  const [tags, setTags] = useState(["Workshop", "SAP"]);
  const [tagInput, setTagInput] = useState("");
  const [published, setPublished] = useState(true);
  const [homepage, setHomepage] = useState(false);
  const [downloadable, setDownloadable] = useState(false);

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
        <AdminCard title="Images" sub="Upload one or more photos">
          <label className="box-border w-full h-fit shrink-0 flex flex-col gap-[10px] p-[56px_24px] justify-start items-center bg-[#F5F6F7] [outline:1.5px_solid_#A9B4BE] [outline-offset:-0.75px] rounded-[12px] cursor-pointer hover:bg-[#EAF3F5] transition-colors">
            <div className="box-border w-[52px] h-[52px] shrink-0 flex flex-row gap-0 justify-center items-center bg-[#EAF3F5] rounded-[999px]">
              <CloudUpload size={24} className="text-[#2F6E80]" />
            </div>
            <div className="box-border w-fit h-fit shrink-0 flex flex-row gap-[4px] justify-start items-start">
              <span className={`text-[15px]/[20px] box-border text-[#2F6E80] ${font} font-medium text-left [white-space:nowrap]`}>Click to upload</span>
              <span className={`text-[15px]/[20px] box-border text-[#354A5F] ${font} font-normal text-left [white-space:nowrap]`}>or drag and drop multiple images</span>
            </div>
            <span className={`text-[13px]/[17px] box-border text-[#475E75] ${font} font-normal text-left [white-space:nowrap]`}>PNG, JPG or WEBP up to 10 MB each</span>
            <input type="file" multiple accept="image/png,image/jpeg,image/webp" className="sr-only" aria-label="Upload images" />
          </label>

          <div className="box-border w-full h-fit shrink-0 flex flex-col gap-[10px] justify-start items-start">
            {uploads.map((upload) => {
              const done = upload.progress === 100;
              return (
                <div key={upload.name} className="box-border w-full h-fit shrink-0 flex flex-row gap-[14px] p-[12px] justify-start items-center [outline:1px_solid_#D5DADD] [outline-offset:-0.5px] rounded-[8px]">
                  <div className="box-border w-[56px] shrink-0 h-[42px] bg-no-repeat bg-cover bg-center rounded-[4px]" style={{ backgroundImage: `url(/images/pst/gallery/${upload.photo})` }} />
                  <div className="box-border [flex:1_1_0] min-w-0 h-fit flex flex-col gap-[6px] justify-start items-start">
                    <div className="box-border w-full h-fit shrink-0 flex flex-row gap-0 justify-between items-start">
                      <span className={`text-[14px]/[18px] box-border text-[#000000] ${font} font-medium text-left [white-space:nowrap]`}>{upload.name}</span>
                      <span className={`text-[12px]/[16px] box-border ${done ? "text-[#188918]" : "text-[#475E75]"} ${font} font-normal text-left [white-space:nowrap]`}>
                        {done ? `${upload.size} · Uploaded` : `${upload.size} · ${upload.progress}%`}
                      </span>
                    </div>
                    <div className="box-border w-full h-[6px] shrink-0 bg-[#EAECEE] rounded-[999px] overflow-hidden">
                      <div className={`h-[6px] rounded-[999px] ${done ? "bg-[#188918]" : "bg-[#2F6E80]"}`} style={{ width: `${upload.progress}%` }} />
                    </div>
                  </div>
                  <button
                    type="button"
                    aria-label={`Remove ${upload.name}`}
                    onClick={() => setUploads(uploads.filter((item) => item.name !== upload.name))}
                    className="box-border w-[32px] shrink-0 h-[32px] flex flex-row gap-0 justify-center items-center rounded-[8px] hover:bg-[#EAF3F5] cursor-pointer transition-colors"
                  >
                    {done ? <Trash2 size={16} className="text-[#475E75]" /> : <X size={16} className="text-[#475E75]" />}
                  </button>
                </div>
              );
            })}
          </div>
        </AdminCard>

        <AdminCard title="Details" sub="Applied to all images in this upload">
          <label className="box-border w-full h-fit shrink-0 flex flex-col gap-[8px] justify-start items-start">
            <span className={labelClass}>Title *</span>
            <div className={fieldBox}>
              <input placeholder="e.g. SAP implementation workshop" className={controlClass} />
            </div>
          </label>
          <div className="box-border w-full h-fit shrink-0 flex flex-row gap-[16px] justify-start items-start max-sm:flex-col">
            <label className="box-border [flex:1_1_0] min-w-0 h-fit flex flex-col gap-[8px] justify-start items-start">
              <span className={labelClass}>Category</span>
              <div className={`${fieldBox} justify-between`}>
                <select defaultValue="" className={`${controlClass} appearance-none cursor-pointer`}>
                  <option value="" disabled>
                    Select category
                  </option>
                  {categories.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
                <ChevronDown size={18} className="text-[#475E75] shrink-0 pointer-events-none" />
              </div>
            </label>
            <label className="box-border [flex:1_1_0] min-w-0 h-fit flex flex-col gap-[8px] justify-start items-start">
              <span className={labelClass}>Event date</span>
              <div className={fieldBox}>
                <input type="date" aria-label="Event date" className={`${controlClass} [color-scheme:light]`} />
              </div>
            </label>
          </div>
          <label className="box-border w-full h-fit shrink-0 flex flex-col gap-[8px] justify-start items-start">
            <div className="box-border w-full h-fit shrink-0 flex flex-row gap-0 justify-between items-start">
              <span className={labelClass}>Description</span>
            </div>
            <div className="box-border w-full h-[96px] shrink-0 flex flex-row gap-0 p-[16px] justify-start items-start bg-[#FFFFFF] [outline:1px_solid_#475E75] [outline-offset:-0.5px] rounded-[8px] focus-within:[outline:2px_solid_#2F6E80] focus-within:[outline-offset:-1px]">
              <textarea
                placeholder="A short caption shown under the photo (optional)"
                className={`box-border [flex:1_1_0] w-full h-full bg-transparent text-[16px]/[24px] text-[#223548] ${font} font-normal outline-none resize-none placeholder:text-[#8396A8]`}
              />
            </div>
          </label>
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
          <label className="box-border w-full h-fit shrink-0 flex flex-col gap-[8px] justify-start items-start">
            <span className={labelClass}>Display order</span>
            <div className={fieldBox}>
              <input defaultValue="1" inputMode="numeric" className={controlClass} />
            </div>
            <span className={`text-[12px]/[15px] box-border text-[#475E75] ${font} font-normal text-left [white-space:nowrap]`}>Lower numbers appear first.</span>
          </label>
          <CheckRow label="Show on homepage" checked={homepage} onToggle={() => setHomepage(!homepage)} />
          <CheckRow label="Allow visitors to download" checked={downloadable} onToggle={() => setDownloadable(!downloadable)} />
        </AdminCard>

        <AdminCard title="Actions">
          <button type="submit" className={`box-border w-full h-[48px] shrink-0 flex flex-row gap-[8px] p-[0px_24px] justify-center items-center bg-[#000354] hover:bg-[#0B1470] rounded-[8px] text-[16px]/[20px] text-[#FFFFFF] ${font} font-medium cursor-pointer transition-colors`}>
            Upload {uploads.length} {uploads.length === 1 ? "image" : "images"}
          </button>
          <button type="button" className={`box-border w-full h-[48px] shrink-0 flex flex-row gap-[8px] p-[0px_24px] justify-center items-center bg-[#FFFFFF] [outline:1px_solid_#475E75] [outline-offset:-0.5px] rounded-[8px] text-[16px]/[20px] text-[#223548] ${font} font-medium cursor-pointer hover:bg-[#EAF3F5] transition-colors`}>
            Save as draft
          </button>
          <Link href="/admin/gallery" className={`box-border w-full text-[14px]/[18px] text-[#475E75] hover:text-[#000354] transition-colors ${font} font-medium text-center`}>
            Cancel
          </Link>
        </AdminCard>
      </div>
    </form>
  );
}

function CheckRow({ label, checked, onToggle }: { label: string; checked: boolean; onToggle: () => void }) {
  return (
    <button type="button" role="checkbox" aria-checked={checked} onClick={onToggle} className="box-border w-full h-fit shrink-0 flex flex-row gap-[10px] justify-start items-center cursor-pointer text-left">
      <span className={`box-border w-[20px] shrink-0 h-[20px] flex flex-row gap-0 justify-center items-center rounded-[4px] ${checked ? "bg-[#2F6E80]" : "bg-[#FFFFFF] [outline:1px_solid_#475E75] [outline-offset:-0.5px]"}`}>
        {checked && <Check size={14} className="text-[#FFFFFF]" />}
      </span>
      <span className={`text-[14px]/[18px] box-border text-[#223548] ${font} font-normal text-left [white-space:nowrap]`}>{label}</span>
    </button>
  );
}
