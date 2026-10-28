"use client";

import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Clock, Lock, Mail, ShieldCheck, X } from "lucide-react";
import { unlockArticle, type UnlockState } from "@/app/actions";
import { ArticleBlocks } from "@/components/sections/ArticleBlocks";
import { useLanguage } from "@/components/LanguageProvider";
import type { Block } from "@/lib/blog";

const font = "font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif]";

const initialState: UnlockState = { status: "idle", message: "", firstName: "", email: "" };

const inputClass = `box-border w-full h-[48px] p-[0px_16px] bg-[#FFFFFF] [outline:1px_solid_#D5DADD] [outline-offset:-0.5px] rounded-[8px] text-[16px] text-[#000000] ${font} placeholder:text-[#A9B4BE] focus:[outline:2px_solid_#2F6E80] focus:[outline-offset:-1px]`;
const labelClass = `text-[14px]/[18px] text-[#223548] ${font} font-medium`;
const helperClass = `absolute left-0 top-[82px] whitespace-nowrap text-[12px]/[15px] text-[#475E75] ${font}`;

// Source values are sent to the server as-is; only the labels are translated.
// Each source also sets the label and placeholder of the organization field.
const sources = [
  {
    value: "Company",
    en: { label: "Company", field: "Company name *", placeholder: "e.g. PT Maju Jaya Indonesia" },
    id: { label: "Perusahaan", field: "Nama perusahaan *", placeholder: "contoh: PT Maju Jaya Indonesia" },
  },
  {
    value: "University / Campus",
    en: { label: "University / Campus", field: "University / Campus name *", placeholder: "e.g. Universitas Indonesia" },
    id: { label: "Universitas / Kampus", field: "Nama universitas / kampus *", placeholder: "contoh: Universitas Indonesia" },
  },
  {
    value: "Other",
    en: { label: "Other", field: "Organization name *", placeholder: "e.g. your organization or community" },
    id: { label: "Lainnya", field: "Nama organisasi *", placeholder: "contoh: organisasi atau komunitas Anda" },
  },
];

const copy = {
  en: {
    gateTitle: "Continue reading this article",
    gateDesc: "Tell us a little about yourself to unlock the full article. You only need to do this once on this browser.",
    continue: "Continue reading",
    takes: "Takes 30 seconds",
    noSpam: "No spam, unsubscribe anytime",
    dialogTitle: "Unlock the full article",
    close: "Close",
    fullName: "Full name *",
    namePh: "Your full name",
    email: "Email *",
    emailPh: "name@organization.com",
    helper: "We'll only use this to contact you about SAP.",
    from: "I'm from *",
    phone: "Phone / WhatsApp (optional)",
    phonePh: "+62 ...",
    updates: "Send me new articles and updates from PST. You can unsubscribe at any time.",
    unlocking: "Unlocking...",
    privacy:
      "We use your details to give you access and, if you agree, to send updates, in line with Indonesia's Personal Data Protection Law. See our Privacy Policy.",
    allSet: (name: string) => `You're all set, ${name}!`,
    unlockedDesc: "The full article is now unlocked. Other gated articles will open automatically on this browser.",
    confirmTitle: "Confirm your subscription",
    confirmDesc: (email: string) => `We sent a link to ${email}. Click it to start receiving new articles.`,
    readFull: "Read the full article",
  },
  id: {
    gateTitle: "Lanjutkan membaca artikel ini",
    gateDesc: "Ceritakan sedikit tentang diri Anda untuk membuka artikel lengkap. Anda cukup melakukannya sekali di browser ini.",
    continue: "Lanjutkan membaca",
    takes: "Hanya 30 detik",
    noSpam: "Tanpa spam, bisa berhenti kapan saja",
    dialogTitle: "Buka artikel lengkap",
    close: "Tutup",
    fullName: "Nama lengkap *",
    namePh: "Nama lengkap Anda",
    email: "Email *",
    emailPh: "nama@organisasi.com",
    helper: "Kami hanya menggunakan ini untuk menghubungi Anda tentang SAP.",
    from: "Saya dari *",
    phone: "Telepon / WhatsApp (opsional)",
    phonePh: "+62 ...",
    updates: "Kirimi saya artikel dan pembaruan baru dari PST. Anda dapat berhenti berlangganan kapan saja.",
    unlocking: "Membuka...",
    privacy:
      "Kami menggunakan data Anda untuk memberikan akses dan, jika Anda setuju, mengirimkan pembaruan, sesuai dengan Undang-Undang Pelindungan Data Pribadi Indonesia. Lihat Kebijakan Privasi kami.",
    allSet: (name: string) => `Semua sudah siap, ${name}!`,
    unlockedDesc: "Artikel lengkap sudah terbuka. Artikel terbatas lainnya akan terbuka otomatis di peramban ini.",
    confirmTitle: "Konfirmasi langganan Anda",
    confirmDesc: (email: string) => `Kami telah mengirim tautan ke ${email}. Klik untuk mulai menerima artikel baru.`,
    readFull: "Baca artikel lengkap",
  },
};

type GatedArticleProps = {
  title: string;
  blocks: Block[];
  locked: boolean;
};

export function GatedArticle({ title, blocks, locked }: GatedArticleProps) {
  const { lang } = useLanguage();
  const c = copy[lang];
  const router = useRouter();
  const [state, action, pending] = useActionState(unlockArticle, initialState);
  const [formOpen, setFormOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [from, setFrom] = useState(sources[0].value);
  const fromCopy = (sources.find((source) => source.value === from) ?? sources[0])[lang];

  const showSuccess = state.status === "success" && !dismissed;
  const showForm = formOpen && !showSuccess;

  function close() {
    const finished = state.status === "success";
    setFormOpen(false);
    setDismissed(true);
    if (finished) router.refresh();
  }

  return (
    <div className="box-border w-full h-fit flex flex-col gap-[24px] justify-start items-start">
      {locked ? (
        <div className="relative box-border w-full flex flex-col gap-[24px]">
          <ArticleBlocks blocks={blocks} />
          <div className="pointer-events-none absolute left-0 right-0 bottom-0 h-[120px] bg-gradient-to-b from-transparent to-[#FFFFFF]" />
        </div>
      ) : (
        <ArticleBlocks blocks={blocks} />
      )}

      {locked && (
        <div className="box-border w-full h-fit flex flex-col gap-[20px] p-[40px] [background-image:linear-gradient(90deg,_#08174A_0%,_#2B1C8F_100%)] rounded-[12px]">
          <div className="box-border w-[56px] h-[56px] flex items-center justify-center bg-[#FFFFFF1A] rounded-[999px]">
            <Lock size={26} className="text-[#A6CBD3]" />
          </div>
          <div className="box-border w-full h-fit flex flex-col gap-[8px]">
            <div className={`text-[28px]/[36px] text-[#FFFFFF] ${font} font-medium`}>{c.gateTitle}</div>
            <div className={`text-[16px]/[25px] text-[#FFFFFFCC] ${font}`}>{c.gateDesc}</div>
          </div>
          <button
            type="button"
            onClick={() => setFormOpen(true)}
            className={`box-border w-fit h-[48px] p-[0px_24px] flex items-center bg-[#A6CBD3] hover:bg-[#B8D8DF] rounded-[8px] text-[16px]/[20px] text-[#000354] ${font} font-medium`}
          >
            {c.continue}
          </button>
          <div className="box-border w-full flex flex-row flex-wrap gap-[20px]">
            <span className={`flex flex-row gap-[6px] items-center text-[13px]/[17px] text-[#FFFFFFB3] ${font}`}>
              <Clock size={14} className="text-[#A6CBD3]" />
              {c.takes}
            </span>
            <span className={`flex flex-row gap-[6px] items-center text-[13px]/[17px] text-[#FFFFFFB3] ${font}`}>
              <ShieldCheck size={14} className="text-[#A6CBD3]" />
              {c.noSpam}
            </span>
          </div>
        </div>
      )}

      {(showForm || showSuccess) && (
        <div
          role="dialog"
          aria-modal="true"
          className={`fixed inset-0 z-[60] flex items-center justify-center p-[20px] ${showSuccess ? "bg-[#000354D9]" : "bg-[#000354A6]"}`}
          onClick={close}
        >
          {showForm && (
            <form
              action={action}
              onSubmit={() => setDismissed(false)}
              onClick={(event) => event.stopPropagation()}
              className="box-border w-full max-w-[560px] h-fit max-h-full overflow-y-auto flex flex-col [&>*]:shrink-0 gap-[20px] p-[32px] bg-[#FFFFFF] rounded-[16px]"
            >
              <div className="box-border w-full h-[48px] flex flex-row justify-between items-center">
                <div className="box-border w-[300px] max-w-full h-[48px] flex flex-row gap-[12px] items-center">
                  <div className="box-border w-[44px] h-[44px] shrink-0 bg-[url('/images/pst/pst-logo.png')] bg-no-repeat bg-contain bg-center" />
                  <div className="box-border w-full flex flex-col gap-[2px]">
                    <div className={`text-[22px]/[29px] text-[#000000] whitespace-nowrap ${font} font-medium`}>{c.dialogTitle}</div>
                    <div className={`text-[13px]/[17px] text-[#8396A8] whitespace-nowrap ${font}`}>{title}</div>
                  </div>
                </div>
                <button
                  type="button"
                  aria-label={c.close}
                  onClick={close}
                  className="box-border w-[32px] h-[32px] shrink-0 flex items-center justify-center bg-[#F5F6F7] hover:bg-[#EAF3F5] rounded-[999px]"
                >
                  <X size={16} className="text-[#223548]" />
                </button>
              </div>

              <div className="box-border w-full flex flex-row gap-[16px] max-sm:flex-col">
                <label className="relative box-border [flex:1_1_0] h-[74px] flex flex-col gap-[8px] min-w-0">
                  <span className={labelClass}>{c.fullName}</span>
                  <input name="name" required placeholder={c.namePh} className={inputClass} />
                  <span className={helperClass}>{c.helper}</span>
                </label>
                <label className="relative box-border [flex:1_1_0] h-[74px] flex flex-col gap-[8px] min-w-0">
                  <span className={labelClass}>{c.email}</span>
                  <input name="email" type="email" required placeholder={c.emailPh} className={inputClass} />
                  <span className={helperClass}>{c.helper}</span>
                </label>
              </div>

              <fieldset className="relative box-border w-full h-[74px] flex flex-col gap-[8px]">
                <legend className={labelClass}>{c.from}</legend>
                <div className="box-border w-full h-[48px] p-[4px] flex flex-row gap-[4px] bg-[#EAECEE] rounded-[8px]">
                  {sources.map((source) => (
                    <label key={source.value} className="box-border [flex:1_1_0] h-[40px] flex items-center justify-center rounded-[6px] cursor-pointer has-[:checked]:bg-[#FFFFFF] has-[:checked]:text-[#000354] text-[#475E75]">
                      <input
                        type="radio"
                        name="from"
                        value={source.value}
                        checked={from === source.value}
                        onChange={() => setFrom(source.value)}
                        className="sr-only"
                      />
                      <span className={`text-[14px]/[18px] ${font} font-medium`}>{source[lang].label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <label className="relative box-border w-full h-[74px] flex flex-col gap-[8px]">
                <span className={labelClass}>{fromCopy.field}</span>
                <input name="company" placeholder={fromCopy.placeholder} className={inputClass} />
                <span className={helperClass}>{c.helper}</span>
              </label>

              <label className="relative box-border w-full h-[74px] flex flex-col gap-[8px]">
                <span className={labelClass}>{c.phone}</span>
                <input name="phone" placeholder={c.phonePh} className={inputClass} />
                <span className={helperClass}>{c.helper}</span>
              </label>

              <label className={`box-border w-full h-[70px] p-[14px_16px] flex flex-row gap-[12px] items-start bg-[#F5F6F7] rounded-[8px] text-[14px]/[21px] text-[#223548] ${font}`}>
                <input type="checkbox" name="updates" className="mt-[1px] w-[20px] h-[20px] shrink-0 accent-[#000354]" />
                {c.updates}
              </label>

              {state.status === "error" && <p className={`text-[14px] text-[#B42318] ${font}`}>{state.message}</p>}

              <button
                type="submit"
                disabled={pending}
                className={`box-border w-full h-[48px] bg-[#000354] hover:bg-[#0B1470] disabled:opacity-60 rounded-[8px] text-[16px]/[20px] text-[#FFFFFF] ${font} font-medium`}
              >
                {pending ? c.unlocking : c.continue}
              </button>

              <div className="box-border w-full h-[36px] flex flex-row gap-[8px] items-start">
                <ShieldCheck size={14} className="text-[#8396A8] mt-[2px] shrink-0" />
                <p className={`text-[12px]/[18px] text-[#8396A8] ${font}`}>{c.privacy}</p>
              </div>
            </form>
          )}

          {showSuccess && (
            <div
              onClick={(event) => event.stopPropagation()}
              className="box-border w-full max-w-[520px] flex flex-col gap-[20px] p-[40px_40px_32px_40px] bg-[#FFFFFF] rounded-[16px] animate-[popIn_220ms_ease-out]"
            >
              <div className="box-border w-[72px] h-[72px] flex items-center justify-center bg-[#F5FAE5] rounded-[999px]">
                <Check size={36} className="text-[#188918]" />
              </div>
              <div className="box-border w-full flex flex-col gap-[8px]">
                <div className={`text-[26px]/[34px] text-[#000000] ${font} font-medium`}>{c.allSet(state.firstName)}</div>
                <div className={`text-[15px]/[23px] text-[#354A5F] ${font}`}>{c.unlockedDesc}</div>
              </div>
              <div className="box-border w-full flex flex-row gap-[12px] p-[14px_16px] items-start bg-[#EAF3F5] rounded-[8px]">
                <Mail size={20} className="text-[#2F6E80] mt-[2px] shrink-0" />
                <div className="box-border w-full flex flex-col gap-[2px]">
                  <div className={`text-[14px]/[18px] text-[#000354] ${font} font-medium`}>{c.confirmTitle}</div>
                  <div className={`text-[13px]/[20px] text-[#354A5F] ${font}`}>{c.confirmDesc(state.email)}</div>
                </div>
              </div>
              <button
                type="button"
                onClick={close}
                className={`box-border w-full h-[48px] bg-[#000354] hover:bg-[#0B1470] rounded-[8px] text-[16px]/[20px] text-[#FFFFFF] ${font} font-medium`}
              >
                {c.readFull}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
