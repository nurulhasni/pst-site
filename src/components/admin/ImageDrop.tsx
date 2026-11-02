"use client";

import { useRef, useState, type DragEvent } from "react";
import { CloudUpload, RefreshCw, Trash2 } from "lucide-react";
import { AdminNotice } from "@/components/admin/AdminUi";

const font = "font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif]";
const accepted = ["image/png", "image/jpeg", "image/webp", "image/gif"];

// An image field for admin forms. The chosen file travels with the form under
// `name`; `current` is the saved image, and removing it sends `removeName=on`.
export function ImageDrop({
  name,
  removeName,
  label,
  hint,
  maxMB,
  current = "",
  contain = false,
  removable = true,
  onChange,
}: {
  name: string;
  removeName: string;
  label: string;
  hint: string;
  maxMB: number;
  current?: string;
  // Logos are shown whole; photos fill the preview
  contain?: boolean;
  // False for images that must always exist, like a gallery photo
  removable?: boolean;
  onChange?: (url: string) => void;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [removed, setRemoved] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");
  const shown = removed ? "" : (preview ?? current);

  function takeFiles(files: FileList | null) {
    const picked = files?.[0];
    setError("");
    if (!picked) return;
    if (!accepted.includes(picked.type)) {
      setError("Please choose a PNG, JPG, WebP or GIF image.");
    } else if (picked.size > maxMB * 1024 * 1024) {
      setError(`The image must be ${maxMB} MB or smaller.`);
    } else {
      // Drag-and-drop gives files outside the input; put them in so the form sends them
      if (input.current && input.current.files !== files) input.current.files = files;
      if (preview) URL.revokeObjectURL(preview);
      const url = URL.createObjectURL(picked);
      setPreview(url);
      setRemoved(false);
      onChange?.(url);
      return;
    }
    if (input.current) input.current.value = "";
  }

  function remove() {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    setRemoved(true);
    if (input.current) input.current.value = "";
    onChange?.("");
  }

  function drop(event: DragEvent<HTMLElement>) {
    event.preventDefault();
    setDragging(false);
    takeFiles(event.dataTransfer.files);
  }

  return (
    <div className="box-border w-full h-fit flex flex-col gap-[8px]">
      <input ref={input} type="file" name={name} accept={accepted.join(",")} aria-label={label} className="sr-only" onChange={(event) => takeFiles(event.target.files)} />
      {removed && <input type="hidden" name={removeName} value="on" />}
      {shown ? (
        <div className="box-border w-full h-fit flex flex-col gap-[10px]">
          <div
            onDragOver={(event) => event.preventDefault()}
            onDrop={drop}
            className={`box-border w-full h-[160px] rounded-[12px] bg-no-repeat bg-center [outline:1px_solid_#D5DADD] [outline-offset:-0.5px] ${contain ? "bg-contain bg-[#FFFFFF] [background-origin:content-box] p-[16px]" : "bg-cover"}`}
            style={{ backgroundImage: `url(${shown})` }}
            role="img"
            aria-label={label}
          />
          <div className="box-border w-full flex flex-row flex-wrap gap-[12px] items-center">
            <span className={`text-[12px]/[16px] text-[#475E75] ${font} font-normal`}>{preview ? "New image · uploads when you save" : "Current image"}</span>
            <button type="button" onClick={() => input.current?.click()} className={`flex flex-row gap-[6px] items-center text-[14px]/[18px] text-[#2F6E80] hover:text-[#000354] ${font} font-medium cursor-pointer`}>
              <RefreshCw size={15} />
              Replace
            </button>
            {removable && (
              <button type="button" onClick={remove} className={`flex flex-row gap-[6px] items-center text-[14px]/[18px] text-[#D20A0A] ${font} font-medium cursor-pointer`}>
                <Trash2 size={15} />
                Remove
              </button>
            )}
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => input.current?.click()}
          onDragOver={(event) => {
            event.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={drop}
          className={`box-border w-full h-fit flex flex-col gap-[10px] p-[32px_24px] items-center rounded-[12px] cursor-pointer transition-colors [outline:1.5px_dashed_#A9B4BE] [outline-offset:-0.75px] ${dragging ? "bg-[#EAF3F5]" : "bg-[#F5F6F7] hover:bg-[#EAF3F5]"}`}
        >
          <span className="box-border w-[52px] h-[52px] flex justify-center items-center bg-[#EAF3F5] rounded-[999px]">
            <CloudUpload size={24} className="text-[#2F6E80]" />
          </span>
          <span className="flex flex-row flex-wrap justify-center gap-[4px]">
            <span className={`text-[15px]/[20px] text-[#2F6E80] ${font} font-medium`}>Click to upload</span>
            <span className={`text-[15px]/[20px] text-[#354A5F] ${font} font-normal`}>or drag and drop</span>
          </span>
          <span className={`text-[13px]/[17px] text-[#475E75] text-center ${font} font-normal`}>{hint}</span>
        </button>
      )}
      {error && <AdminNotice>{error}</AdminNotice>}
    </div>
  );
}
