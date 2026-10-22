"use client";

import { useActionState } from "react";
import { submitContact, type ContactState } from "@/app/actions";
import { useLanguage } from "@/components/LanguageProvider";

// Option values are stored in the sheet, so they stay English; only the labels are translated.
const subjects = [
  { value: "SAP Solution", key: "contact.subj1" },
  { value: "SAP Support & Outsourcing", key: "contact.subj2" },
  { value: "Business Process Reengineering", key: "contact.subj3" },
  { value: "Strategic Information Planning", key: "contact.subj4" },
  { value: "General inquiry", key: "contact.subj5" },
];

const initialState: ContactState = { status: "idle", message: "" };

const inputClass =
  "box-border w-full h-[48px] p-[0px_16px] bg-[#FFFFFF] [outline:1px_solid_#D5DADD] [outline-offset:-0.5px] rounded-[8px] text-[16px]/[20px] text-[#000000] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] placeholder:text-[#A9B4BE] focus:[outline:2px_solid_#2F6E80] focus:[outline-offset:-1px]";

const labelClass =
  "text-[14px]/[18px] text-[#223548] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-medium";

export function ContactForm() {
  const { t } = useLanguage();
  const [state, action, pending] = useActionState(submitContact, initialState);

  return (
    <form
      action={action}
      className="box-border w-full h-fit flex flex-col gap-[20px] justify-start items-start"
    >
      <div className="box-border w-full h-fit flex flex-row gap-[16px] justify-start items-start max-sm:flex-col max-sm:items-stretch">
        <label className="box-border [flex:1_1_0] h-fit flex flex-col gap-[8px] min-w-0">
          <span className={labelClass}>{t("contact.name")}</span>
          <input
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder={t("contact.namePh")}
            className={inputClass}
          />
        </label>
        <label className="box-border [flex:1_1_0] h-fit flex flex-col gap-[8px] min-w-0">
          <span className={labelClass}>{t("contact.email")}</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder={t("contact.emailPh")}
            className={inputClass}
          />
        </label>
      </div>
      <label className="box-border w-full h-fit flex flex-col gap-[8px]">
        <span className={labelClass}>{t("contact.company")}</span>
        <input
          name="company"
          type="text"
          autoComplete="organization"
          placeholder={t("contact.companyPh")}
          className={inputClass}
        />
      </label>
      <label className="box-border w-full h-fit flex flex-col gap-[8px]">
        <span className={labelClass}>{t("contact.phone")}</span>
        <input
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder={t("contact.phonePh")}
          className={inputClass}
        />
      </label>
      <label className="box-border w-full h-fit flex flex-col gap-[8px]">
        <span className={labelClass}>{t("contact.subject")}</span>
        <select
          name="subject"
          defaultValue=""
          className={`${inputClass} appearance-none`}
        >
          <option value="" disabled>
            {t("contact.subjectPh")}
          </option>
          {subjects.map((subject) => (
            <option key={subject.value} value={subject.value}>
              {t(subject.key)}
            </option>
          ))}
        </select>
      </label>
      <label className="box-border w-full h-fit flex flex-col gap-[8px]">
        <span className={labelClass}>{t("contact.message")}</span>
        <textarea
          name="message"
          required
          rows={5}
          placeholder={t("contact.messagePh")}
          className="box-border w-full h-[140px] p-[12px_16px] bg-[#FFFFFF] [outline:1px_solid_#D5DADD] [outline-offset:-0.5px] rounded-[8px] text-[16px]/[24px] text-[#000000] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] placeholder:text-[#A9B4BE] resize-y focus:[outline:2px_solid_#2F6E80] focus:[outline-offset:-1px]"
        />
      </label>
      <div className="box-border w-full h-fit flex flex-row gap-[16px] justify-start items-center flex-wrap">
        <button
          type="submit"
          disabled={pending}
          className="box-border w-fit h-[48px] flex flex-row gap-[8px] p-[0px_24px] justify-center items-center bg-[#000354] hover:bg-[#0B1470] disabled:opacity-60 rounded-[8px] text-[16px]/[20px] text-[#FFFFFF] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-medium"
        >
          {pending ? t("contact.sending") : t("contact.send")}
        </button>
        {state.message && (
          <p
            role="status"
            className={`text-[15px]/[20px] font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif] font-medium ${
              state.status === "success" ? "text-[#2F6E80]" : "text-[#B42318]"
            }`}
          >
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}
