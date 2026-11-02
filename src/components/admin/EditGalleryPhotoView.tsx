"use client";

import Link from "next/link";
import { startTransition, useActionState, useState, type FormEvent } from "react";
import { ChevronDown, Trash2 } from "lucide-react";
import { AdminCard, AdminField, AdminNotice, AdminToggle } from "@/components/admin/AdminUi";
import { ImageDrop } from "@/components/admin/ImageDrop";
import { deletePhotos, savePhoto } from "@/app/admin/gallery/actions";
import type { FormState } from "@/lib/adminForms";
import { MAX_PHOTO_MB, galleryCategories, type GalleryPhoto } from "@/lib/galleryModel";

const font = "font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif]";
const fieldBox = "box-border w-full h-[48px] shrink-0 flex flex-row gap-0 p-[0px_16px] justify-between items-center bg-[#FFFFFF] [outline:1px_solid_#475E75] [outline-offset:-0.5px] rounded-[8px] focus-within:[outline:2px_solid_#2F6E80] focus-within:[outline-offset:-1px]";
const controlClass = `box-border w-full min-w-0 bg-transparent text-[16px]/[20px] text-[#223548] ${font} font-normal outline-none`;
const labelClass = `text-[14px]/[18px] box-border text-[#223548] ${font} font-medium text-left [white-space:nowrap]`;

export function EditGalleryPhotoView({ photo }: { photo: GalleryPhoto }) {
  const [published, setPublished] = useState(photo.published);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteState, setDeleteState] = useState<FormState>({ message: "" });
  const [state, action, saving] = useActionState<FormState, FormData>(savePhoto, { message: "" });
  const categories = photo.category && !galleryCategories.includes(photo.category) ? [photo.category, ...galleryCategories] : galleryCategories;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => action(formData));
  }

  function handleDelete() {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    setDeleting(true);
    startTransition(async () => {
      setDeleteState(await deletePhotos([photo.id], true));
      setDeleting(false);
    });
  }

  const message = state.message || deleteState.message;

  return (
    <form onSubmit={handleSubmit} className="box-border w-full h-fit shrink-0 flex flex-row gap-[24px] p-[32px] justify-start items-start max-lg:flex-col max-lg:p-[20px]">
      <input type="hidden" name="id" value={photo.id} />
      <input type="hidden" name="image" value={photo.image} />
      {published && <input type="hidden" name="published" value="on" />}

      <div className="box-border [flex:1_1_0] min-w-0 max-lg:w-full h-fit flex flex-col gap-[24px] justify-start items-start">
        {message && <AdminNotice>{message}</AdminNotice>}
        <AdminCard title="Photo" sub="Replace to swap the image; the details stay">
          <ImageDrop
            name="photo"
            removeName="removeImage"
            removable={false}
            label="Gallery photo"
            hint={`PNG, JPG, WebP or GIF up to ${MAX_PHOTO_MB} MB`}
            maxMB={MAX_PHOTO_MB}
            current={photo.image}
          />
        </AdminCard>
        <AdminCard title="Details">
          <AdminField label="Title *" name="title" value={photo.title} />
          <div className="box-border w-full h-fit shrink-0 flex flex-row gap-[16px] justify-start items-start max-sm:flex-col">
            <label className="box-border [flex:1_1_0] min-w-0 max-sm:w-full h-fit flex flex-col gap-[8px] justify-start items-start">
              <span className={labelClass}>Category</span>
              <div className={fieldBox}>
                <select name="category" defaultValue={photo.category || galleryCategories[0]} className={`${controlClass} appearance-none cursor-pointer`}>
                  {categories.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
                <ChevronDown size={18} className="text-[#475E75] shrink-0 pointer-events-none" />
              </div>
            </label>
            <label className="box-border [flex:1_1_0] min-w-0 max-sm:w-full h-fit flex flex-col gap-[8px] justify-start items-start">
              <span className={labelClass}>Event date</span>
              <div className={fieldBox}>
                <input type="date" name="eventDate" defaultValue={photo.eventDate} aria-label="Event date" className={`${controlClass} [color-scheme:light]`} />
              </div>
            </label>
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
          <AdminField label="Display order" name="order" type="number" value={String(photo.order)} hint="Lower numbers appear first." />
        </AdminCard>
        <AdminCard title="Actions">
          <button type="submit" disabled={saving || deleting} className={`box-border w-full h-[48px] shrink-0 flex flex-row gap-[8px] p-[0px_24px] justify-center items-center bg-[#000354] hover:bg-[#0B1470] disabled:opacity-60 disabled:cursor-wait rounded-[8px] text-[16px]/[20px] text-[#FFFFFF] ${font} font-medium cursor-pointer transition-colors`}>
            {saving ? "Saving…" : "Save photo"}
          </button>
          <Link href="/admin/gallery" className={`box-border w-full text-[14px]/[18px] text-[#475E75] hover:text-[#000354] transition-colors ${font} font-medium text-center`}>
            Cancel
          </Link>
          <button type="button" onClick={handleDelete} disabled={saving || deleting} className={`box-border w-full h-fit shrink-0 flex flex-row gap-[6px] justify-center items-center text-[14px]/[18px] text-[#D20A0A] ${font} font-medium cursor-pointer disabled:opacity-60`}>
            <Trash2 size={16} className="text-[#D20A0A]" />
            {deleting ? "Deleting…" : confirmDelete ? "Click again to delete permanently" : "Delete photo"}
          </button>
        </AdminCard>
      </div>
    </form>
  );
}
