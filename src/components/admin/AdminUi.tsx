import type { ReactNode } from "react";

const font = "font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif]";

export function AdminCard({
  title,
  sub,
  children,
  className = "",
  id,
}: {
  title: string;
  sub?: string;
  children?: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-[24px] box-border w-full h-fit shrink-0 flex flex-col gap-[20px] p-[24px] justify-start items-start bg-[#FFFFFF] [outline:1px_solid_#D5DADD] [outline-offset:-0.5px] rounded-[12px] ${className}`}
    >
      <div className="box-border w-full h-fit shrink-0 flex flex-col gap-[2px] justify-start items-start">
        <div className={`text-[17px]/[22px] box-border text-[#000000] ${font} font-medium text-left [white-space:nowrap]`}>{title}</div>
        {sub && <div className={`text-[13px]/[17px] box-border text-[#475E75] ${font} font-normal text-left [white-space:nowrap]`}>{sub}</div>}
      </div>
      {children}
    </section>
  );
}

export function AdminField({
  label,
  value,
  placeholder,
  hint,
  icon,
  className = "",
  name,
  type = "text",
  multiline = false,
  rows = 4,
  readOnly = false,
}: {
  label: string;
  value?: string;
  placeholder?: string;
  hint?: string;
  icon?: ReactNode;
  className?: string;
  name?: string;
  type?: string;
  multiline?: boolean;
  rows?: number;
  readOnly?: boolean;
}) {
  const fieldBox = multiline
    ? "box-border w-full shrink-0 flex flex-row gap-0 p-[12px_16px] justify-start items-start bg-[#FFFFFF] [outline:1px_solid_#475E75] [outline-offset:-0.5px] rounded-[8px] focus-within:[outline:2px_solid_#2F6E80] focus-within:[outline-offset:-1px]"
    : "box-border w-full h-[48px] shrink-0 flex flex-row gap-[10px] p-[0px_16px] justify-start items-center bg-[#FFFFFF] [outline:1px_solid_#475E75] [outline-offset:-0.5px] rounded-[8px] focus-within:[outline:2px_solid_#2F6E80] focus-within:[outline-offset:-1px]";
  const control = `box-border w-full min-w-0 bg-transparent text-[16px]/[20px] text-[#223548] ${font} font-normal outline-none placeholder:text-[#8396A8]`;

  return (
    <label className={`box-border w-full h-fit shrink-0 flex flex-col gap-[8px] justify-start items-start ${className}`}>
      <span className={`text-[14px]/[18px] box-border text-[#223548] ${font} font-medium text-left [white-space:nowrap]`}>{label}</span>
      <div className={fieldBox}>
        {icon}
        {multiline ? (
          <textarea name={name} defaultValue={value} placeholder={placeholder} rows={rows} readOnly={readOnly} className={`${control} resize-none`} />
        ) : (
          <input name={name} type={type} defaultValue={value} placeholder={placeholder} readOnly={readOnly} className={control} />
        )}
      </div>
      {hint && <span className={`text-[12px]/[15px] box-border text-[#475E75] ${font} font-normal text-left`}>{hint}</span>}
    </label>
  );
}

export function AdminToggle({ checked, onChange, label }: { checked: boolean; onChange: (next: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`box-border w-[44px] shrink-0 h-[24px] flex flex-row gap-0 p-[2px] items-center rounded-[999px] cursor-pointer transition-colors ${
        checked ? "justify-end bg-[#2F6E80]" : "justify-start bg-[#D5DADD]"
      }`}
    >
      <span className="box-border w-[20px] shrink-0 h-[20px] bg-[#FFFFFF] rounded-[50%]" />
    </button>
  );
}

export function AdminCheckbox({ checked, onChange, label }: { checked: boolean; onChange: (next: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="box-border w-full h-fit shrink-0 flex flex-row gap-[10px] justify-start items-center cursor-pointer text-left"
    >
      <span
        className={`box-border w-[20px] shrink-0 h-[20px] flex flex-row gap-0 justify-center items-center rounded-[4px] transition-colors ${
          checked ? "bg-[#2F6E80]" : "bg-[#FFFFFF] [outline:1px_solid_#475E75] [outline-offset:-0.5px]"
        }`}
      >
        {checked && <CheckMark />}
      </span>
      <span className={`text-[14px]/[18px] box-border text-[#223548] ${font} font-normal text-left [white-space:nowrap]`}>{label}</span>
    </button>
  );
}

function CheckMark() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function AdminTableHead({ columns }: { columns: { label: string; width?: string; flex?: boolean }[] }) {
  return (
    <div className="box-border w-full h-fit shrink-0 flex flex-row gap-[16px] p-[10px_16px] justify-start items-start bg-[#F5F6F7]">
      {columns.map((column) => (
        <div
          key={column.label || "blank"}
          className={`text-[12px]/[16px] box-border text-[#475E75] ${font} font-medium tracking-[1px] text-left ${column.flex ? "[flex:1_1_0]" : `${column.width ?? "w-[120px]"} shrink-0`}`}
        >
          {column.label}
        </div>
      ))}
    </div>
  );
}
