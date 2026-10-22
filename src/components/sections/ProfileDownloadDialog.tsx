"use client";

import { useActionState, useState } from "react";
import { Check, Download, X } from "lucide-react";
import { requestProfile, type ProfileState } from "@/app/actions";
import { useLanguage } from "@/components/LanguageProvider";

const font = "font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif]";

const initialState: ProfileState = { status: "idle", code: "", name: "", email: "" };
const inputClass = `box-border w-full h-[48px] p-[0px_16px] bg-[#FFFFFF] [outline:1px_solid_#475E75] [outline-offset:-0.5px] rounded-[8px] text-[16px] text-[#000000] ${font} placeholder:text-[#A9B4BE] focus:[outline:2px_solid_#2F6E80] focus:[outline-offset:-1px]`;
const labelClass = `text-[14px]/[18px] text-[#223548] ${font} font-medium`;

const copy = {
  en: {
    trigger: "Download company profile",
    title: "Download company profile",
    sub: "Tell us a little about you and we will send the company profile right away.",
    name: "Full name *",
    namePh: "Your full name",
    org: "Organization / company / university *",
    orgPh: "e.g. PT Maju Jaya Indonesia",
    email: "Email *",
    emailPh: "name@organization.com",
    send: "Send",
    sending: "Sending...",
    close: "Close",
    missing: "Please fill in your name, organization and email.",
    invalidEmail: "Please enter a valid email address.",
    server: "Something went wrong. Please try again.",
    done: "Thank you",
    doneDesc: "Your company profile is ready. Our team may also follow up at the email you provided.",
    download: "Download PDF",
  },
  id: {
    trigger: "Unduh profil perusahaan",
    title: "Unduh profil perusahaan",
    sub: "Ceritakan sedikit tentang Anda dan kami akan segera mengirimkan profil perusahaan.",
    name: "Nama lengkap *",
    namePh: "Nama lengkap Anda",
    org: "Organisasi / perusahaan / universitas *",
    orgPh: "contoh: PT Maju Jaya Indonesia",
    email: "Email *",
    emailPh: "nama@organisasi.com",
    send: "Kirim",
    sending: "Mengirim...",
    close: "Tutup",
    missing: "Mohon isi nama, organisasi, dan email Anda.",
    invalidEmail: "Masukkan alamat email yang valid.",
    server: "Terjadi kesalahan. Silakan coba lagi.",
    done: "Terima kasih",
    doneDesc: "Profil perusahaan sudah siap diunduh. Tim kami mungkin juga menghubungi Anda melalui email yang Anda berikan.",
    download: "Unduh PDF",
  },
};

export function ProfileDownloadDialog() {
  const { lang } = useLanguage();
  const c = copy[lang];
  const [open, setOpen] = useState(false);
  const [state, action, pending] = useActionState(requestProfile, initialState);

  const errorText = state.status === "error" ? c[state.code === "email" ? "invalidEmail" : state.code === "missing" ? "missing" : "server"] : "";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`box-border w-fit shrink-0 h-[48px] flex flex-row gap-[8px] p-[0px_20px] justify-center items-center bg-[#FFFFFF] hover:bg-[#EAF3F5] [outline:1px_solid_#000354] [outline-offset:-0.5px] rounded-[8px] cursor-pointer transition-colors`}
      >
        <span className={`text-[16px]/[20px] box-border text-[#000354] ${font} font-medium text-left [white-space:nowrap]`}>{c.trigger}</span>
        <Download size={18} className="text-[#000354]" />
      </button>

      {open && (
        <div role="dialog" aria-modal="true" aria-label={c.title} className="fixed inset-0 z-[60] flex items-center justify-center p-[20px] bg-[#000354A6]" onClick={() => setOpen(false)}>
          <div onClick={(event) => event.stopPropagation()} className="box-border w-full max-w-[520px] max-h-full flex flex-col gap-[20px] p-[32px] bg-[#FFFFFF] rounded-[16px]">
            <div className="box-border w-full flex flex-row gap-[16px] justify-between items-start">
              <div className="box-border w-full flex flex-col gap-[6px]">
                <div className={`text-[22px]/[29px] text-[#000000] ${font} font-medium`}>{c.title}</div>
                <div className={`text-[14px]/[20px] text-[#475E75] ${font}`}>{c.sub}</div>
              </div>
              <button type="button" aria-label={c.close} onClick={() => setOpen(false)} className="box-border w-[32px] h-[32px] shrink-0 flex items-center justify-center bg-[#F5F6F7] hover:bg-[#EAF3F5] rounded-[999px] cursor-pointer">
                <X size={16} className="text-[#223548]" />
              </button>
            </div>

            {state.status === "success" ? (
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
                <a href="/company-profile.pdf" download className={`box-border w-fit h-[48px] flex items-center gap-[8px] p-[0px_24px] bg-[#000354] hover:bg-[#0B1470] rounded-[8px] text-[16px]/[20px] text-[#FFFFFF] ${font} font-medium`}>
                  <Download size={18} className="text-[#A6CBD3]" />
                  {c.download}
                </a>
              </div>
            ) : (
              <form action={action} className="box-border w-full flex flex-col gap-[18px]">
                <label className="box-border w-full flex flex-col gap-[8px]">
                  <span className={labelClass}>{c.name}</span>
                  <input name="name" required autoComplete="name" placeholder={c.namePh} className={inputClass} />
                </label>
                <label className="box-border w-full flex flex-col gap-[8px]">
                  <span className={labelClass}>{c.org}</span>
                  <input name="organization" required autoComplete="organization" placeholder={c.orgPh} className={inputClass} />
                </label>
                <label className="box-border w-full flex flex-col gap-[8px]">
                  <span className={labelClass}>{c.email}</span>
                  <input name="email" type="email" required autoComplete="email" placeholder={c.emailPh} className={inputClass} />
                </label>
                {errorText && <p className={`text-[14px] text-[#B42318] ${font}`}>{errorText}</p>}
                <button type="submit" disabled={pending} className={`box-border w-full h-[48px] bg-[#000354] hover:bg-[#0B1470] disabled:opacity-60 rounded-[8px] text-[16px]/[20px] text-[#FFFFFF] ${font} font-medium cursor-pointer transition-colors`}>
                  {pending ? c.sending : c.send}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
