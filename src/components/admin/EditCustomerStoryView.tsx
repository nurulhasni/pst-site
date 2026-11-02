"use client";

import Link from "next/link";
import { startTransition, useActionState, useState, type FormEvent, type ReactNode } from "react";
import { ChevronDown, Factory, Trash2 } from "lucide-react";
import { AdminCard, AdminCheckbox, AdminField, AdminNotice, AdminToggle } from "@/components/admin/AdminUi";
import { ImageDrop } from "@/components/admin/ImageDrop";
import { deleteStory, saveStory } from "@/app/admin/testimonials/actions";
import type { FormState } from "@/lib/adminForms";
import { NARRATIVE_MAX, QUOTE_MAX, attribution, quoted, storyIndustries, storyServices, type Story } from "@/lib/storyModel";

const font = "font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif]";

const labelClass = `text-[14px]/[18px] box-border text-[#223548] ${font} font-medium text-left [white-space:nowrap]`;
const fieldClass = `box-border w-full h-[48px] shrink-0 flex flex-row gap-0 p-[0px_16px] justify-start items-center bg-[#FFFFFF] [outline:1px_solid_#475E75] [outline-offset:-0.5px] rounded-[8px] focus-within:[outline:2px_solid_#2F6E80] focus-within:[outline-offset:-1px]`;
const inputClass = `box-border [flex:1_1_0] min-w-0 h-full bg-transparent text-[16px]/[20px] text-[#223548] ${font} font-normal outline-none`;
const selectClass = `box-border [flex:1_1_0] min-w-0 h-full bg-transparent text-[16px]/[21px] text-[#223548] ${font} font-normal outline-none appearance-none cursor-pointer`;
const counterClass = `text-[12px]/[16px] box-border text-[#475E75] ${font} font-normal text-left [white-space:nowrap]`;

const withCurrent = (options: string[], current: string) => (current && !options.includes(current) ? [current, ...options] : options);

function ChevronField({ children }: { children: ReactNode }) {
  return (
    <div className={`${fieldClass} justify-between`}>
      {children}
      <ChevronDown size={18} className="text-[#475E75] shrink-0 pointer-events-none" />
    </div>
  );
}

function TextInput({ label, name, value, onChange, placeholder }: { label: string; name: string; value: string; onChange: (next: string) => void; placeholder?: string }) {
  return (
    <label className="box-border w-full [flex:1_1_0] min-w-0 h-fit flex flex-col gap-[8px] justify-start items-start">
      <span className={labelClass}>{label}</span>
      <div className={fieldClass}>
        <input name={name} value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} className={inputClass} />
      </div>
    </label>
  );
}

export function EditCustomerStoryView({ story }: { story?: Story }) {
  const [title, setTitle] = useState(story?.title ?? "");
  const [service, setService] = useState(story?.service || storyServices[0]);
  const [narrative, setNarrative] = useState(story?.body ?? "");
  const [quote, setQuote] = useState(story?.quote ?? "");
  const [clientName, setClientName] = useState(story?.clientName ?? "");
  const [position, setPosition] = useState(story?.clientPosition ?? "");
  const [company, setCompany] = useState(story?.company ?? "");
  const [photo, setPhoto] = useState(story?.image ?? "");
  const [published, setPublished] = useState(story?.published ?? true);
  const [featured, setFeatured] = useState(story?.featured ?? false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteState, setDeleteState] = useState<FormState>({ message: "" });
  const [state, action, saving] = useActionState<FormState, FormData>(saveStory, { message: "" });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => action(formData));
  }

  function handleDelete() {
    if (!story) return;
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    setDeleting(true);
    startTransition(async () => {
      setDeleteState(await deleteStory(story.id, true));
      setDeleting(false);
    });
  }

  const message = state.message || deleteState.message;
  const byline = attribution({ clientName, clientPosition: position, company, quoteAuthor: story?.quoteAuthor ?? "" });

  return (
    <form onSubmit={handleSubmit} className="box-border w-full h-fit flex flex-col gap-[24px] p-[32px] justify-start items-start max-lg:p-[20px]">
      <input type="hidden" name="id" value={story?.id ?? ""} />
      <input type="hidden" name="image" value={story?.image ?? ""} />
      <input type="hidden" name="logo" value={story?.logo ?? ""} />
      {published && <input type="hidden" name="published" value="on" />}
      {featured && <input type="hidden" name="featured" value="on" />}

      <div className="box-border w-full h-fit flex flex-row gap-[24px] justify-start items-start max-lg:flex-col">
        <div className="box-border [flex:1_1_0] min-w-0 max-lg:w-full h-fit flex flex-col gap-[24px] justify-start items-start">
          {message && <AdminNotice>{message}</AdminNotice>}

          <AdminCard title="Story">
            <TextInput label="Story title *" name="title" value={title} onChange={setTitle} placeholder="e.g. Transforming a manufacturer's supply chain with SAP S/4HANA" />
            <div className="box-border w-full h-fit shrink-0 flex flex-row gap-[16px] justify-start items-start max-sm:flex-col">
              <label className="box-border [flex:1_1_0] min-w-0 max-sm:w-full h-fit flex flex-col gap-[8px] justify-start items-start">
                <span className={labelClass}>Industry</span>
                <ChevronField>
                  <select name="industry" defaultValue={story?.industry || storyIndustries[0]} className={selectClass}>
                    {withCurrent(storyIndustries, story?.industry ?? "").map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </ChevronField>
              </label>
              <label className="box-border [flex:1_1_0] min-w-0 max-sm:w-full h-fit flex flex-col gap-[8px] justify-start items-start">
                <span className={labelClass}>Service</span>
                <ChevronField>
                  <select name="service" value={service} onChange={(event) => setService(event.target.value)} className={selectClass}>
                    {withCurrent(storyServices, story?.service ?? "").map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </ChevronField>
              </label>
            </div>
            <label className="box-border w-full h-fit shrink-0 flex flex-col gap-[8px] justify-start items-start">
              <span className="box-border w-full h-fit shrink-0 flex flex-row gap-0 justify-between items-start">
                <span className={labelClass}>Narrative *</span>
                <span className={counterClass}>
                  {narrative.length} / {NARRATIVE_MAX}
                </span>
              </span>
              <div className="box-border w-full h-[120px] shrink-0 flex flex-row gap-0 p-[16px] justify-start items-start bg-[#FFFFFF] [outline:1px_solid_#475E75] [outline-offset:-0.5px] rounded-[8px] focus-within:[outline:2px_solid_#2F6E80] focus-within:[outline-offset:-1px]">
                <textarea
                  name="body"
                  value={narrative}
                  maxLength={NARRATIVE_MAX}
                  onChange={(event) => setNarrative(event.target.value)}
                  className={`box-border w-full h-full bg-transparent text-[16px]/[24px] text-[#223548] ${font} font-normal outline-none resize-none`}
                />
              </div>
            </label>
          </AdminCard>

          <AdminCard title="Quote & client">
            <label className="box-border w-full h-fit shrink-0 flex flex-col gap-[8px] justify-start items-start">
              <span className="box-border w-full h-fit shrink-0 flex flex-row gap-0 justify-between items-start">
                <span className={labelClass}>Quote</span>
                <span className={counterClass}>
                  {quote.length} / {QUOTE_MAX}
                </span>
              </span>
              <div className="box-border w-full h-[88px] shrink-0 flex flex-row gap-0 p-[16px] justify-start items-start bg-[#FFFFFF] [outline:1px_solid_#475E75] [outline-offset:-0.5px] rounded-[8px] focus-within:[outline:2px_solid_#2F6E80] focus-within:[outline-offset:-1px]">
                <textarea
                  name="quote"
                  value={quote}
                  maxLength={QUOTE_MAX}
                  placeholder="Without quotation marks; the site adds them"
                  onChange={(event) => setQuote(event.target.value)}
                  className={`box-border w-full h-full bg-transparent text-[16px]/[24px] text-[#223548] ${font} font-normal outline-none resize-none placeholder:text-[#8396A8]`}
                />
              </div>
            </label>
            <div className="box-border w-full h-fit shrink-0 flex flex-row gap-[16px] justify-start items-start max-sm:flex-col">
              <TextInput label="Client name" name="clientName" value={clientName} onChange={setClientName} />
              <TextInput label="Position" name="clientPosition" value={position} onChange={setPosition} />
            </div>
            <TextInput label="Company name" name="company" value={company} onChange={setCompany} />
            <AdminField label="Card subtitle" name="companyMeta" value={story?.companyMeta} placeholder={service} hint="Shown under the company on the photo card. Empty uses the service." />
            <AdminField label="List subtitle" name="meta" value={story?.meta} placeholder="e.g. Retail · Finance transformation" hint="Shown under the title when the story is collapsed. Empty uses industry · service." />
          </AdminCard>

          <AdminCard title="Media">
            <div className="box-border w-full h-fit shrink-0 flex flex-row gap-[16px] justify-start items-start max-sm:flex-col">
              <div className="box-border [flex:1_1_0] min-w-0 max-sm:w-full h-fit flex flex-col gap-[8px] justify-start items-start">
                <span className={labelClass}>Story photo</span>
                <ImageDrop name="photoFile" removeName="removeImage" label="Story photo" hint="Landscape, at least 1200 × 1000 px · up to 8 MB" maxMB={8} current={story?.image} onChange={setPhoto} />
              </div>
              <div className="box-border [flex:1_1_0] min-w-0 max-sm:w-full h-fit flex flex-col gap-[8px] justify-start items-start">
                <span className={labelClass}>Company logo (optional)</span>
                <ImageDrop name="logoFile" removeName="removeLogo" label="Company logo" hint="PNG with a transparent background · up to 2 MB" maxMB={2} current={story?.logo} contain />
              </div>
            </div>
          </AdminCard>

          <AdminCard title="Indonesian version" sub="Optional · empty fields use the built-in translation or the English text">
            <AdminField label="Story title (ID)" name="titleId" value={story?.titleId} />
            <AdminField label="Narrative (ID)" name="bodyId" value={story?.bodyId} multiline rows={4} />
            <AdminField label="Quote (ID)" name="quoteId" value={story?.quoteId} multiline rows={2} />
          </AdminCard>
        </div>

        <div className="box-border w-[360px] max-lg:w-full shrink-0 h-fit flex flex-col gap-[24px] justify-start items-start">
          <AdminCard title="Live preview">
            <div className={`box-border w-full h-[200px] shrink-0 bg-cover bg-center rounded-[8px] overflow-hidden relative ${photo ? "" : "bg-[#EAF3F5]"}`} style={photo ? { backgroundImage: `url(${photo})` } : undefined}>
              <div className="box-border w-fit max-w-[calc(100%-24px)] h-fit absolute left-[12px] bottom-[12px] flex flex-row gap-[10px] p-[10px_12px] justify-start items-center bg-[#FFFFFF] rounded-[8px]">
                <div className="box-border w-[32px] shrink-0 h-[32px] flex flex-row gap-0 justify-center items-center bg-[#EAF3F5] rounded-[4px]">
                  <Factory size={16} className="text-[#2F6E80]" />
                </div>
                <div className="box-border min-w-0 h-fit flex flex-col gap-[1px] justify-start items-start">
                  <div className={`text-[12px]/[16px] box-border max-w-full truncate text-[#000354] ${font} font-medium text-left`}>{company || "Company"}</div>
                  <div className={`text-[11px]/[14px] box-border max-w-full truncate text-[#354A5F] ${font} font-normal text-left`}>{service}</div>
                </div>
              </div>
            </div>
            <div className="w-full h-fit flex flex-col gap-[8px] pl-[14px] [border-width:0px_0px_0px_3px] [border-style:solid] [border-color:#2F6E80] [margin:0px_0px_0px_-1.5px]">
              <div className={`text-[15px]/[19px] box-border w-full text-[#2F6E80] ${font} font-medium text-left`}>{title || "Story title"}</div>
              {quote && <div className={`text-[13px]/[20px] box-border w-full text-[#354A5F] ${font} font-normal text-left`}>{quoted(quote)}</div>}
              {byline && <div className={`text-[12px]/[16px] box-border text-[#475E75] ${font} font-medium text-left`}>{byline}</div>}
            </div>
          </AdminCard>

          <AdminCard title="Settings">
            <div className="box-border w-full h-fit shrink-0 flex flex-row gap-[16px] justify-between items-center">
              <div className="box-border [flex:1_1_0] h-fit flex flex-col gap-[2px] justify-start items-start">
                <div className={`text-[14px]/[18px] box-border text-[#000000] ${font} font-medium text-left [white-space:nowrap]`}>Published</div>
                <div className={`text-[13px]/[17px] box-border w-full text-[#475E75] ${font} font-normal text-left`}>Shown in Customer Stories</div>
              </div>
              <AdminToggle checked={published} onChange={setPublished} label="Published" />
            </div>
            <AdminCheckbox checked={featured} onChange={setFeatured} label="Featured: open first on homepage" />
            <AdminField label="Display order" name="order" type="number" value={story ? String(story.order) : ""} hint="Lower numbers appear first." />
            <AdminField label="Read more link" name="url" value={story?.url} placeholder="https:// or /blog/…" hint="Optional · the featured story's “Read the full story” link." />
          </AdminCard>

          <AdminCard title="Actions">
            <button
              type="submit"
              disabled={saving || deleting}
              className={`box-border w-full h-[48px] shrink-0 flex flex-row gap-[8px] p-[0px_24px] justify-center items-center bg-[#000354] hover:bg-[#0B1470] disabled:opacity-60 disabled:cursor-wait rounded-[8px] text-[16px]/[20px] text-[#FFFFFF] ${font} font-medium cursor-pointer transition-colors`}
            >
              {saving ? "Saving…" : "Save story"}
            </button>
            <Link href="/admin/testimonials" className={`box-border w-full text-[14px]/[18px] text-[#475E75] hover:text-[#000354] transition-colors ${font} font-medium text-center`}>
              Cancel
            </Link>
            {story && (
              <button type="button" onClick={handleDelete} disabled={saving || deleting} className={`box-border w-full h-fit shrink-0 flex flex-row gap-[6px] justify-center items-center text-[14px]/[18px] text-[#D20A0A] ${font} font-medium cursor-pointer disabled:opacity-60`}>
                <Trash2 size={16} className="text-[#D20A0A]" />
                {deleting ? "Deleting…" : confirmDelete ? "Click again to delete permanently" : "Delete story"}
              </button>
            )}
          </AdminCard>
        </div>
      </div>
    </form>
  );
}
