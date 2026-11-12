"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Check, ChevronDown, FileText, ShieldCheck, Upload, X } from "lucide-react";
import { submitApplication, type ApplyState } from "@/app/careerActions";
import { useLanguage } from "@/components/LanguageProvider";

const font = "font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif]";

const initialState: ApplyState = { status: "idle", code: "", name: "" };
const inputClass = `box-border w-full h-[48px] p-[0px_16px] bg-[#FFFFFF] [outline:1px_solid_#475E75] [outline-offset:-0.5px] rounded-[8px] text-[16px] text-[#000000] ${font} placeholder:text-[#A9B4BE] focus:[outline:2px_solid_#2F6E80] focus:[outline-offset:-1px]`;
const labelClass = `text-[14px]/[18px] text-[#223548] ${font} font-medium`;
const MAX_MB = 5;
const accept = ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

const copy = {
  en: {
    title: "Apply for a position",
    sub: "Fill in your details and attach your CV. Our recruitment team will contact you by email.",
    name: "Full name *",
    namePh: "Your full name",
    email: "Email *",
    emailPh: "name@email.com",
    phone: "Phone / WhatsApp",
    phonePh: "+62 ...",
    position: "Position *",
    university: "University *",
    universityPh: "Universitas Indonesia",
    major: "Major",
    majorPh: "Information Systems",
    gpa: "GPA *",
    gpaPh: "3.45",
    cv: "CV *",
    cvPick: "Choose a file",
    cvHint: `PDF or Word, up to ${MAX_MB} MB`,
    cvChange: "Change",
    send: "Send application",
    sending: "Sending...",
    close: "Close",
    privacy: "Your details and CV are only used for recruitment at PST, in line with Indonesia's Personal Data Protection Law.",
    errors: {
      missing: "Please fill in every field marked * and attach your CV.",
      email: "Please enter a valid email address.",
      gpa: "Please enter your GPA as a number from 0 to 4, for example 3.45.",
      cvType: "Your CV must be a PDF or Word file.",
      cvSize: `Your CV must be ${MAX_MB} MB or smaller.`,
      limit: "Too many applications from this connection. Please try again later.",
      server: "Something went wrong. Please try again, or email your CV to recruitment@pst.co.id.",
    },
    done: "Thank you",
    doneDesc: "Your application has been received. Our recruitment team will review it and contact you by email.",
    doneClose: "Close",
  },
  id: {
    title: "Lamar posisi",
    sub: "Isi data Anda dan lampirkan CV. Tim rekrutmen kami akan menghubungi Anda melalui email.",
    name: "Nama lengkap *",
    namePh: "Nama lengkap Anda",
    email: "Email *",
    emailPh: "nama@email.com",
    phone: "Telepon / WhatsApp",
    phonePh: "+62 ...",
    position: "Posisi yang dilamar *",
    university: "Universitas *",
    universityPh: "Universitas Indonesia",
    major: "Jurusan",
    majorPh: "Sistem Informasi",
    gpa: "IPK *",
    gpaPh: "3,45",
    cv: "CV *",
    cvPick: "Pilih file",
    cvHint: `PDF atau Word, maksimal ${MAX_MB} MB`,
    cvChange: "Ganti",
    send: "Kirim lamaran",
    sending: "Mengirim...",
    close: "Tutup",
    privacy: "Data dan CV Anda hanya digunakan untuk proses rekrutmen di PST, sesuai Undang-Undang Pelindungan Data Pribadi.",
    errors: {
      missing: "Mohon isi semua kolom bertanda * dan lampirkan CV Anda.",
      email: "Masukkan alamat email yang valid.",
      gpa: "Masukkan IPK berupa angka 0 sampai 4, misalnya 3,45.",
      cvType: "CV harus berupa file PDF atau Word.",
      cvSize: `Ukuran CV maksimal ${MAX_MB} MB.`,
      limit: "Terlalu banyak lamaran dari koneksi ini. Silakan coba lagi nanti.",
      server: "Terjadi kesalahan. Silakan coba lagi, atau kirim CV Anda ke recruitment@pst.co.id.",
    },
    done: "Terima kasih",
    doneDesc: "Lamaran Anda sudah kami terima. Tim rekrutmen kami akan meninjaunya dan menghubungi Anda melalui email.",
    doneClose: "Tutup",
  },
};

// The form inside the dialog. It is remounted each time the dialog opens, so a
// sent application never shows up again as already submitted.
function ApplyForm({ positions, position, onClose }: { positions: string[]; position: string; onClose: () => void }) {
  const { lang } = useLanguage();
  const c = copy[lang];
  const [state, action, pending] = useActionState(submitApplication, initialState);
  const [fileName, setFileName] = useState("");
  const [fileError, setFileError] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);

  // Check the file in the browser too, so a large file isn't uploaded only to be refused
  function pickFile(file: File | undefined) {
    setFileError("");
    if (!file) return setFileName("");
    if (!/\.(pdf|docx?)$/i.test(file.name)) {
      setFileError(c.errors.cvType);
    } else if (file.size > MAX_MB * 1024 * 1024) {
      setFileError(c.errors.cvSize);
    } else {
      return setFileName(file.name);
    }
    setFileName("");
    if (fileInput.current) fileInput.current.value = "";
  }

  const errorText = fileError || (state.status === "error" && state.code ? c.errors[state.code] : "");

  if (state.status === "success") {
    return (
      <div className="box-border w-full flex flex-col gap-[20px] items-start">
        <div className="box-border w-[64px] h-[64px] flex items-center justify-center bg-[#F5FAE5] rounded-[999px]">
          <Check size={30} className="text-[#188918]" />
        </div>
        <div className="box-border w-full flex flex-col gap-[8px]">
          <div className={`text-[24px]/[32px] text-[#000000] ${font} font-medium`}>
            {c.done}, {state.name}!
          </div>
          <div className={`text-[15px]/[23px] text-[#354A5F] ${font}`}>{c.doneDesc}</div>
        </div>
        <button type="button" onClick={onClose} className={`box-border w-fit h-[48px] px-[24px] bg-[#000354] hover:bg-[#0B1470] rounded-[8px] text-[16px]/[20px] text-[#FFFFFF] ${font} font-medium cursor-pointer`}>
          {c.doneClose}
        </button>
      </div>
    );
  }

  return (
    <form action={action} className="box-border w-full flex flex-col gap-[18px]">
      <div className="box-border w-full grid grid-cols-2 gap-[16px] max-sm:grid-cols-1">
        <label className="box-border min-w-0 flex flex-col gap-[8px]">
          <span className={labelClass}>{c.name}</span>
          <input name="name" required autoComplete="name" placeholder={c.namePh} className={inputClass} />
        </label>
        <label className="box-border min-w-0 flex flex-col gap-[8px]">
          <span className={labelClass}>{c.email}</span>
          <input name="email" type="email" required autoComplete="email" placeholder={c.emailPh} className={inputClass} />
        </label>
      </div>
      <div className="box-border w-full grid grid-cols-2 gap-[16px] max-sm:grid-cols-1">
        <label className="box-border min-w-0 flex flex-col gap-[8px]">
          <span className={labelClass}>{c.position}</span>
          <span className="relative block">
            <select name="position" required defaultValue={position} className={`${inputClass} appearance-none pr-[40px] cursor-pointer`}>
              {positions.map((title) => (
                <option key={title}>{title}</option>
              ))}
            </select>
            <ChevronDown size={18} className="absolute right-[14px] top-[15px] text-[#475E75] pointer-events-none" />
          </span>
        </label>
        <label className="box-border min-w-0 flex flex-col gap-[8px]">
          <span className={labelClass}>{c.phone}</span>
          <input name="phone" type="tel" autoComplete="tel" placeholder={c.phonePh} className={inputClass} />
        </label>
      </div>
      <div className="box-border w-full grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_120px] gap-[16px] max-sm:grid-cols-1">
        <label className="box-border min-w-0 flex flex-col gap-[8px]">
          <span className={labelClass}>{c.university}</span>
          <input name="university" required placeholder={c.universityPh} className={inputClass} />
        </label>
        <label className="box-border min-w-0 flex flex-col gap-[8px]">
          <span className={labelClass}>{c.major}</span>
          <input name="major" placeholder={c.majorPh} className={inputClass} />
        </label>
        <label className="box-border min-w-0 flex flex-col gap-[8px]">
          <span className={labelClass}>{c.gpa}</span>
          <input name="gpa" required inputMode="decimal" placeholder={c.gpaPh} className={inputClass} />
        </label>
      </div>

      <div className="box-border w-full flex flex-col gap-[8px]">
        <span className={labelClass}>{c.cv}</span>
        <input ref={fileInput} type="file" name="cv" accept={accept} required className="sr-only" id="apply-cv" onChange={(e) => pickFile(e.target.files?.[0])} />
        <label
          htmlFor="apply-cv"
          className={`box-border w-full min-h-[56px] flex flex-row gap-[12px] p-[12px_16px] items-center rounded-[8px] cursor-pointer transition-colors ${
            fileName ? "bg-[#EAF3F5] [outline:1px_solid_#A6CBD3]" : "bg-[#F5F6F7] hover:bg-[#EAF3F5] [outline:1.5px_dashed_#A9B4BE]"
          } [outline-offset:-0.5px]`}
        >
          {fileName ? <FileText size={20} className="text-[#2F6E80] shrink-0" /> : <Upload size={20} className="text-[#2F6E80] shrink-0" />}
          <span className="[flex:1_1_0] min-w-0 flex flex-col">
            <span className={`text-[15px]/[20px] text-[#000354] ${font} font-medium truncate`}>{fileName || c.cvPick}</span>
            <span className={`text-[12px]/[16px] text-[#475E75] ${font}`}>{c.cvHint}</span>
          </span>
          {fileName && <span className={`text-[14px] text-[#2F6E80] ${font} font-medium shrink-0`}>{c.cvChange}</span>}
        </label>
      </div>

      {errorText && (
        <p role="alert" className={`text-[14px]/[20px] text-[#B42318] ${font}`}>
          {errorText}
        </p>
      )}

      <button type="submit" disabled={pending || Boolean(fileError)} className={`box-border w-full h-[48px] bg-[#000354] hover:bg-[#0B1470] disabled:opacity-60 rounded-[8px] text-[16px]/[20px] text-[#FFFFFF] ${font} font-medium cursor-pointer transition-colors`}>
        {pending ? c.sending : c.send}
      </button>

      <div className="box-border w-full flex flex-row gap-[8px] items-start">
        <ShieldCheck size={14} className="text-[#8396A8] mt-[2px] shrink-0" />
        <p className={`text-[12px]/[18px] text-[#8396A8] ${font}`}>{c.privacy}</p>
      </div>
    </form>
  );
}

// `position` is the job the visitor clicked, or "" for the general "Send your CV" button
export function ApplyDialog({ open, positions, position, onClose }: { open: boolean; positions: string[]; position: string; onClose: () => void }) {
  const { lang } = useLanguage();
  const c = copy[lang];

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div role="dialog" aria-modal="true" aria-label={c.title} className="fixed inset-0 z-[60] flex items-center justify-center p-[20px] max-sm:p-[12px] bg-[#000354A6]" onClick={onClose}>
      <div onClick={(event) => event.stopPropagation()} className="box-border w-full max-w-[640px] max-h-full overflow-y-auto flex flex-col gap-[20px] p-[32px] max-sm:p-[20px] bg-[#FFFFFF] rounded-[16px]">
        <div className="box-border w-full flex flex-row gap-[16px] justify-between items-start">
          <div className="box-border w-full flex flex-col gap-[6px]">
            <div className={`text-[22px]/[29px] text-[#000000] ${font} font-medium`}>{c.title}</div>
            <div className={`text-[14px]/[20px] text-[#475E75] ${font}`}>{c.sub}</div>
          </div>
          <button type="button" aria-label={c.close} onClick={onClose} className="box-border w-[32px] h-[32px] shrink-0 flex items-center justify-center bg-[#F5F6F7] hover:bg-[#EAF3F5] rounded-[999px] cursor-pointer">
            <X size={16} className="text-[#223548]" />
          </button>
        </div>
        <ApplyForm positions={positions} position={position || positions[0]} onClose={onClose} />
      </div>
    </div>,
    document.body,
  );
}
