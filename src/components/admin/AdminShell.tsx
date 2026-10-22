import Link from "next/link";
import type { ReactNode } from "react";
import { Bell, ExternalLink, Search } from "lucide-react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

const font = "font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif]";

export function AdminShell({
  activeKey,
  breadcrumb,
  title,
  children,
}: {
  activeKey: string;
  breadcrumb: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="box-border w-full min-h-screen flex flex-row gap-0 justify-start items-start bg-[#F5F6F7] max-lg:flex-col">
      <AdminSidebar activeKey={activeKey} />

      <div className="box-border [flex:1_1_0] min-w-0 flex flex-col gap-0 justify-start items-start">
        <header className="box-border w-full h-[76px] shrink-0 flex flex-row gap-[24px] p-[0px_32px] justify-start items-center bg-[#FFFFFF] [border-width:0px_0px_1px_0px] [border-style:solid] [border-color:#D5DADD] max-lg:p-[0px_20px]">
          <div className="box-border [flex:1_1_0] min-w-0 h-fit flex flex-col gap-[2px] justify-start items-start">
            <div className={`text-[12px]/[16px] box-border text-[#475E75] ${font} font-normal text-left [white-space:nowrap]`}>{breadcrumb}</div>
            <h1 className={`text-[22px]/[29px] box-border text-[#000000] ${font} font-medium text-left [white-space:nowrap]`}>{title}</h1>
          </div>
          <div className="box-border w-fit shrink-0 h-fit flex flex-row gap-[8px] justify-start items-center">
            <Link href="/" className="box-border w-fit shrink-0 h-fit flex flex-row gap-[6px] p-[8px_12px] justify-start items-center rounded-[8px] hover:bg-[#EAF3F5] transition-colors">
              <ExternalLink size={16} className="text-[#2F6E80]" />
              <span className={`text-[14px]/[18px] box-border text-[#2F6E80] ${font} font-medium text-left [white-space:nowrap]`}>View website</span>
            </Link>
            <button type="button" aria-label="Search" className="box-border w-[40px] shrink-0 h-[40px] flex flex-row gap-0 justify-center items-center rounded-[8px] hover:bg-[#EAF3F5] cursor-pointer transition-colors">
              <Search size={20} className="text-[#354A5F]" />
            </button>
            <button type="button" aria-label="Notifications" className="box-border w-[40px] shrink-0 h-[40px] flex flex-row gap-0 justify-center items-center rounded-[8px] hover:bg-[#EAF3F5] cursor-pointer transition-colors">
              <Bell size={20} className="text-[#354A5F]" />
            </button>
            <div className="box-border w-[36px] shrink-0 h-[36px] flex flex-row gap-0 justify-center items-center bg-[#A6CBD3] rounded-[999px]">
              <div className={`text-[13px]/[17px] box-border text-[#000354] ${font} font-medium text-left [white-space:nowrap]`}>AD</div>
            </div>
          </div>
        </header>

        <div className="box-border w-full h-fit flex flex-col gap-0 justify-start items-start">{children}</div>
      </div>
    </div>
  );
}
