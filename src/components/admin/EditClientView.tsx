"use client";

import Link from "next/link";
import { startTransition, useActionState, useRef, useState, type FormEvent } from "react";
import { ChevronDown, Info, RefreshCw, Trash2, Upload } from "lucide-react";
import { AdminCard, AdminCheckbox, AdminField, AdminNotice, AdminToggle } from "@/components/admin/AdminUi";
import { deleteClient, saveClient } from "@/app/admin/clients/actions";
import type { FormState } from "@/lib/adminForms";
import { industries, type Client } from "@/lib/clientModel";

const font = "font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] ";

const fieldBox = "box-border w-full h-[48px] shrink-0 flex flex-row gap-0 p-[0px_16px] justify-between items-center bg-[#FFFFFF] [outline:1px_solid_#475E75] [outline-offset:-0.5px] rounded-[8px] focus-within:[outline:2px_solid_#2F6E80] focus-within:[outline-offset:-1px]";
const labelClass = `text-[14px]/[18px] box-border text-[#223548] ${font}font-medium text-left [white-space:nowrap]`;
const selectClass = `box-border w-full min-w-0 bg-transparent text-[16px]/[21px] text-[#223548] ${font}font-normal outline-none appearance-none cursor-pointer`;
const linkButton = `box-border w-fit shrink-0 h-fit flex flex-row gap-[6px] justify-start items-center text-[14px]/[18px] ${font}font-medium cursor-pointer transition-colors`;

const DESCRIPTION_MAX = 160;
const MAX_LOGO_MB = 2;

export function EditClientView({ client }: { client?: Client }) {
  const [description, setDescription] = useState(client?.description ?? "");
  const [active, setActive] = useState(client?.active ?? true);
  const [inStrip, setInStrip] = useState(client?.homepageStrip ?? true);
  const [onServices, setOnServices] = useState(client?.servicesPage ?? true);
  const [preview, setPreview] = useState<{ url: string; name: string; size: number } | null>(null);
  const [removed, setRemoved] = useState(false);
  const [fileError, setFileError] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteState, setDeleteState] = useState<FormState>({ message: "" });
  const [deleting, setDeleting] = useState(false);
  const [state, action, saving] = useActionState<FormState, FormData>(saveClient, { message: "" });
  const fileInput = useRef<HTMLInputElement>(null);

  const currentLogo = removed ? "" : (preview?.url ?? client?.logo ?? "");
  const currentName = preview?.name ?? client?.logo.split("/").pop() ?? "";

  function pickFile(selected: File | undefined) {
    setFileError("");
    if (!selected) return;
    if (selected.size > MAX_LOGO_MB * 1024 * 1024) {
      setFileError(`The logo must be ${MAX_LOGO_MB} MB or smaller.`);
      if (fileInput.current) fileInput.current.value = "";
      return;
    }
    if (preview) URL.revokeObjectURL(preview.url);
    setPreview({ url: URL.createObjectURL(selected), name: selected.name, size: selected.size });
    setRemoved(false);
  }

  function removeLogo() {
    if (preview) URL.revokeObjectURL(preview.url);
    setPreview(null);
    setRemoved(true);
    if (fileInput.current) fileInput.current.value = "";
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => action(formData));
  }

  function handleDelete() {
    if (!client) return;
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    setDeleting(true);
    startTransition(async () => {
      setDeleteState(await deleteClient(client.id, true));
      setDeleting(false);
    });
  }

  const message = state.message || deleteState.message;

  return (
    <form onSubmit={handleSubmit} className="box-border w-full h-fit shrink-0 flex flex-row gap-[24px] p-[32px] justify-start items-start max-lg:flex-col max-lg:p-[20px]">
      <input type="hidden" name="id" value={client?.id ?? ""} />
      <input type="hidden" name="logo" value={client?.logo ?? ""} />
      {removed && <input type="hidden" name="removeLogo" value="on" />}
      {active && <input type="hidden" name="active" value="on" />}
      {inStrip && <input type="hidden" name="homepageStrip" value="on" />}
      {onServices && <input type="hidden" name="servicesPage" value="on" />}

      <div className="box-border [flex:1_1_0] min-w-0 max-lg:w-full h-fit flex flex-col gap-[24px] justify-start items-start">
        {message && <AdminNotice>{message}</AdminNotice>}

        <AdminCard title="Company information">
          <AdminField label="Company name *" value={client?.name} name="name" placeholder="e.g. PT United Tractors Pandu Engineering" />
          <div className="box-border w-full h-fit shrink-0 flex flex-row gap-[16px] justify-start items-start max-sm:flex-col">
            <label className="box-border [flex:1_1_0] min-w-0 max-sm:w-full h-fit flex flex-col gap-[8px] justify-start items-start">
              <span className={labelClass}>Industry *</span>
              <div className={fieldBox}>
                <select name="industry" defaultValue={client?.industry ?? industries[0].name} className={selectClass}>
                  {client && !industries.some((i) => i.name === client.industry) && <option>{client.industry}</option>}
                  {industries.map((item) => (
                    <option key={item.name}>{item.name}</option>
                  ))}
                </select>
                <ChevronDown size={18} className="text-[#475E75] shrink-0 pointer-events-none" />
              </div>
            </label>
            <AdminField label="Website" placeholder="https://" name="website" value={client?.website} className="[flex:1_1_0] min-w-0 max-sm:w-full" />
          </div>
          <label className="box-border w-full h-fit shrink-0 flex flex-col gap-[8px] justify-start items-start">
            <div className="box-border w-full h-fit shrink-0 flex flex-row gap-0 justify-between items-start">
              <span className={labelClass}>Short description</span>
              <span className={`text-[12px]/[16px] box-border text-[#475E75] ${font}font-normal text-left [white-space:nowrap]`}>
                {description.length} / {DESCRIPTION_MAX}
              </span>
            </div>
            <div className="box-border w-full h-[96px] shrink-0 flex flex-row gap-0 p-[16px] justify-start items-start bg-[#FFFFFF] [outline:1px_solid_#475E75] [outline-offset:-0.5px] rounded-[8px] focus-within:[outline:2px_solid_#2F6E80] focus-within:[outline-offset:-1px]">
              <textarea
                name="description"
                value={description}
                maxLength={DESCRIPTION_MAX}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Optional · for internal notes and future client stories"
                className={`box-border [flex:1_1_0] w-full h-full bg-transparent text-[16px]/[24px] text-[#223548] ${font}font-normal outline-none resize-none placeholder:text-[#8396A8]`}
              />
            </div>
          </label>
        </AdminCard>

        <AdminCard title="Logo" sub="Shown in the homepage strip and on the Services page">
          <input ref={fileInput} type="file" name="logoFile" accept="image/png,image/jpeg,image/webp,image/gif" className="hidden" onChange={(event) => pickFile(event.target.files?.[0])} />
          <div className="box-border w-full h-fit shrink-0 flex flex-row gap-[20px] p-[16px] justify-start items-center [outline:1px_solid_#D5DADD] [outline-offset:-0.5px] rounded-[8px] max-sm:flex-col max-sm:items-start">
            <div className="box-border w-[160px] shrink-0 h-[104px] flex flex-row gap-0 p-[18px_24px] justify-center items-center bg-[#FFFFFF] [outline:1px_solid_#D5DADD] [outline-offset:-0.5px] rounded-[8px]">
              {currentLogo ? (
                <div className="box-border [flex:1_1_0] h-full bg-no-repeat bg-contain bg-center" style={{ backgroundImage: `url(${currentLogo})` }} />
              ) : (
                <span className={`text-[13px]/[17px] text-[#A9B4BE] ${font}font-normal`}>No logo</span>
              )}
            </div>
            <div className="box-border [flex:1_1_0] min-w-0 h-fit flex flex-col gap-[4px] justify-start items-start">
              {currentLogo ? (
                <>
                  <div className={`text-[15px]/[20px] box-border max-w-full truncate text-[#000000] ${font}font-medium text-left`}>{currentName}</div>
                  <div className={`text-[13px]/[17px] box-border text-[#475E75] ${font}font-normal text-left`}>
                    {preview ? `${Math.max(1, Math.round(preview.size / 1024))} KB · uploads when you save` : "Current logo"}
                  </div>
                </>
              ) : (
                <div className={`text-[13px]/[17px] box-border text-[#475E75] ${font}font-normal text-left`}>Clients without a logo are not shown on the website.</div>
              )}
              <div className="box-border w-fit h-fit shrink-0 flex flex-row gap-[12px] p-[8px_0px_0px_0px] justify-start items-start">
                <button type="button" onClick={() => fileInput.current?.click()} className={`${linkButton} text-[#2F6E80] hover:text-[#000354]`}>
                  {currentLogo ? <RefreshCw size={15} className="text-[#2F6E80]" /> : <Upload size={15} className="text-[#2F6E80]" />}
                  {currentLogo ? "Replace" : "Upload logo"}
                </button>
                {currentLogo && (
                  <button type="button" onClick={removeLogo} className={`${linkButton} text-[#D20A0A]`}>
                    <Trash2 size={15} className="text-[#D20A0A]" />
                    Remove
                  </button>
                )}
              </div>
            </div>
          </div>
          {fileError && <AdminNotice>{fileError}</AdminNotice>}
          <div className="box-border w-full h-fit shrink-0 flex flex-row gap-[10px] p-[12px_14px] justify-start items-start bg-[#EBF8FF] rounded-[8px]">
            <Info size={16} className="text-[#0070F2] shrink-0 mt-[1px]" />
            <div className={`text-[13px]/[20px] box-border [flex:1_1_0] text-[#354A5F] ${font}font-normal text-left`}>
              PNG, JPG or WebP up to {MAX_LOGO_MB} MB. A PNG with a transparent background looks best on the site.
            </div>
          </div>
        </AdminCard>
      </div>

      <div className="box-border w-[360px] max-lg:w-full shrink-0 h-fit flex flex-col gap-[24px] justify-start items-start">
        <AdminCard title="Display">
          <div className="box-border w-full h-fit shrink-0 flex flex-row gap-[16px] justify-between items-center">
            <div className="box-border [flex:1_1_0] h-fit flex flex-col gap-[2px] justify-start items-start">
              <div className={`text-[14px]/[18px] box-border text-[#000000] ${font}font-medium text-left [white-space:nowrap]`}>Active</div>
              <div className={`text-[13px]/[17px] box-border w-full text-[#475E75] ${font}font-normal text-left`}>Visible on the website</div>
            </div>
            <AdminToggle checked={active} onChange={setActive} label="Active" />
          </div>
          <AdminCheckbox checked={inStrip} onChange={setInStrip} label="Show in homepage logo strip" />
          <AdminCheckbox checked={onServices} onChange={setOnServices} label="Show on Services page (by industry)" />
          <AdminField label="Display order" value={client ? String(client.order) : ""} name="order" type="number" hint="Lower numbers appear first." />
        </AdminCard>

        <AdminCard title="Internal contact" sub="Optional · never shown on the website">
          <AdminField label="Contact name" placeholder="Full name" name="contactName" value={client?.contactName} />
          <AdminField label="Email" placeholder="name@company.com" name="contactEmail" type="email" value={client?.contactEmail} />
          <AdminField label="Phone" placeholder="+62 ..." name="contactPhone" type="tel" value={client?.contactPhone} />
        </AdminCard>

        <AdminCard title="Actions">
          <button type="submit" disabled={saving || deleting} className={`box-border w-full h-[48px] shrink-0 flex flex-row gap-[8px] p-[0px_24px] justify-center items-center bg-[#000354] hover:bg-[#0B1470] disabled:opacity-60 disabled:cursor-wait rounded-[8px] text-[16px]/[20px] text-[#FFFFFF] ${font}font-medium cursor-pointer transition-colors`}>
            {saving ? "Saving…" : "Save client"}
          </button>
          <Link href="/admin/clients" className={`box-border w-full text-[14px]/[18px] text-[#475E75] hover:text-[#000354] transition-colors ${font}font-medium text-center`}>
            Cancel
          </Link>
          {client && (
            <button type="button" onClick={handleDelete} disabled={saving || deleting} className={`box-border w-full h-fit shrink-0 flex flex-row gap-[6px] justify-center items-center text-[14px]/[18px] text-[#D20A0A] ${font}font-medium cursor-pointer disabled:opacity-60`}>
              <Trash2 size={16} className="text-[#D20A0A]" />
              {deleting ? "Deleting…" : confirmDelete ? "Click again to delete permanently" : "Delete client"}
            </button>
          )}
        </AdminCard>
      </div>
    </form>
  );
}
