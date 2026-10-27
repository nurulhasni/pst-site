"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { ArrowLeft, BadgeCheck, Check, Eye, EyeOff, Lock, Mail, ShieldCheck } from "lucide-react";

const font = "font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif]";

const fieldClass = `box-border w-full h-[48px] shrink-0 flex flex-row gap-[10px] p-[0px_16px] justify-start items-center bg-[#FFFFFF] [outline:1px_solid_#475E75] [outline-offset:-0.5px] rounded-[8px] focus-within:[outline:2px_solid_#2F6E80] focus-within:[outline-offset:-1px]`;
const inputClass = `box-border [flex:1_1_0] min-w-0 h-full bg-transparent text-[16px]/[21px] text-[#223548] ${font} font-normal outline-none placeholder:text-[#8396A8]`;
const labelClass = `text-[14px]/[18px] box-border text-[#223548] ${font} font-medium text-left [white-space:nowrap]`;

export function LoginView() {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <div className="box-border w-full min-h-screen flex flex-row gap-0 justify-start items-start bg-[#FFFFFF] overflow-hidden max-lg:flex-col">
      <div className="box-border w-[720px] shrink-0 min-h-screen flex flex-col gap-0 p-[64px] justify-between items-start [background-image:radial-gradient(ellipse_45%_45%_at_80%_20%,_#A6CBD333_0%,_#A6CBD300_100%),_linear-gradient(90deg,_#08174A_0%,_#2B1C8F_100%)] [background-repeat:no-repeat,_no-repeat] [background-size:100%_100%,_100%_100%] max-lg:w-full max-lg:min-h-0 max-lg:p-[32px_24px] max-lg:gap-[32px]">
        <div className="box-border w-fit h-fit shrink-0 flex flex-row gap-[12px] justify-start items-center">
          <div className="box-border w-[44px] shrink-0 h-[44px] bg-[#FFFFFF] bg-[url('/images/pst/pst-logo.png')] bg-no-repeat bg-contain bg-center rounded-[8px]" />
          <div className={`text-[16px]/[21px] box-border text-[#FFFFFF] ${font} font-medium text-left [white-space:nowrap]`}>
            Prima Sistem Terpadu
          </div>
        </div>
        <div className="box-border w-full h-fit shrink-0 flex flex-col gap-[24px] justify-start items-start">
          <div className="box-border w-[160px] h-[172px] shrink-0 bg-[url('/images/pst/pst-logo.png')] bg-no-repeat bg-contain bg-center" />
          <div className={`text-[48px]/[53px] box-border text-[#FFFFFF] ${font} font-medium text-left [white-space:nowrap] max-lg:text-[36px]/[40px]`}>
            Content Admin
          </div>
          <div className={`text-[18px]/[28px] box-border w-[480px] max-w-full text-[#FFFFFFBF] ${font} font-normal text-left`}>
            Manage blog posts, gallery, careers, clients and testimonials for pst.co.id, all in one place.
          </div>
        </div>
        <div className="box-border w-fit h-fit shrink-0 flex flex-row gap-[8px] p-[8px_14px] justify-start items-center bg-[#FFFFFF14] [outline:1px_solid_#FFFFFF33] [outline-offset:-0.5px] rounded-[999px]">
          <BadgeCheck size={16} className="text-[#A6CBD3] shrink-0" />
          <div className={`text-[13px]/[17px] box-border text-[#FFFFFF] ${font} font-medium text-left [white-space:nowrap]`}>
            SAP ERP Silver Partner · Est. 1999
          </div>
        </div>
      </div>

      <div className="box-border [flex:1_1_0] min-h-screen flex flex-row gap-0 justify-center items-center py-[48px] max-lg:py-[40px] max-lg:px-[20px]">
        <form onSubmit={handleSubmit} className="box-border w-[400px] max-w-full shrink-0 h-fit flex flex-col gap-[24px] justify-start items-start">
          <div className="box-border w-full h-fit shrink-0 flex flex-col gap-[8px] justify-start items-start">
            <div className={`text-[36px]/[47px] box-border text-[#000000] ${font} font-medium text-left [white-space:nowrap]`}>Welcome back</div>
            <div className={`text-[16px]/[21px] box-border text-[#354A5F] ${font} font-normal text-left [white-space:nowrap]`}>
              Sign in to manage website content.
            </div>
          </div>

          <label className="box-border w-full h-fit shrink-0 flex flex-col gap-[8px] justify-start items-start">
            <span className={labelClass}>Email address</span>
            <div className={fieldClass}>
              <Mail size={18} className="text-[#475E75] shrink-0" />
              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="admin@pst.co.id"
                className={inputClass}
              />
            </div>
          </label>

          <label className="box-border w-full h-fit shrink-0 flex flex-col gap-[8px] justify-start items-start">
            <span className={labelClass}>Password</span>
            <div className={fieldClass}>
              <Lock size={18} className="text-[#475E75] shrink-0" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="current-password"
                placeholder="••••••••••"
                className={inputClass}
              />
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword(!showPassword)}
                className="box-border w-[18px] h-[18px] shrink-0 flex items-center justify-center cursor-pointer text-[#475E75] hover:text-[#000354] transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </label>

          <div className="box-border w-full h-fit shrink-0 flex flex-row gap-0 justify-between items-center">
            <button
              type="button"
              role="checkbox"
              aria-checked={remember}
              onClick={() => setRemember(!remember)}
              className="box-border [flex:1_1_0] h-fit flex flex-row gap-[10px] justify-start items-center cursor-pointer text-left"
            >
              <span
                className={`box-border w-[20px] shrink-0 h-[20px] flex flex-row gap-0 justify-center items-center rounded-[4px] transition-colors ${remember ? "bg-[#2F6E80]" : "bg-[#FFFFFF] [outline:1px_solid_#475E75] [outline-offset:-0.5px]"
                  }`}
              >
                {remember && <Check size={14} className="text-[#FFFFFF]" />}
              </span>
              <span className={`text-[14px]/[18px] box-border text-[#223548] ${font} font-normal text-left [white-space:nowrap]`}>Remember me</span>
            </button>
            <button
              type="button"
              className={`text-[14px]/[18px] box-border text-[#2F6E80] hover:text-[#000354] transition-colors ${font} font-medium text-left [white-space:nowrap] cursor-pointer`}
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className={`box-border w-full h-[48px] shrink-0 flex flex-row gap-[8px] p-[0px_24px] justify-center items-center bg-[#000354] hover:bg-[#0B1470] rounded-[8px] text-[16px]/[20px] text-[#FFFFFF] ${font} font-medium cursor-pointer transition-colors`}
          >
            Sign in
          </button>

          <div className="box-border w-full h-fit shrink-0 flex flex-row gap-[10px] p-[14px_16px] justify-start items-start bg-[#F5F6F7] rounded-[8px]">
            <ShieldCheck size={18} className="text-[#2F6E80] shrink-0" />
            <div className={`text-[13px]/[20px] box-border [flex:1_1_0] text-[#354A5F] ${font} font-normal text-left`}>
              Access is limited to PST staff. Need an account? Contact your administrator.
            </div>
          </div>

          <Link href="/" className="box-border w-full h-fit shrink-0 flex flex-row gap-[6px] justify-center items-center">
            <ArrowLeft size={16} className="text-[#2F6E80]" />
            <span className={`text-[14px]/[18px] box-border text-[#2F6E80] hover:text-[#000354] transition-colors ${font} font-medium text-left [white-space:nowrap]`}>
              Back to website
            </span>
          </Link>
        </form>
      </div>
    </div>
  );
}
