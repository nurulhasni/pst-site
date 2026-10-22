import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  Briefcase,
  Building2,
  ChevronRight,
  FilePen,
  FilePlus,
  FileText,
  Images,
  ImagePlus,
  Link as LinkIcon,
  Mail,
  MessageSquarePlus,
  MessageSquareQuote,
  TriangleAlert,
  type LucideIcon,
} from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";

export const metadata: Metadata = {
  title: "Dashboard — Content Admin",
  robots: { index: false, follow: false },
};

const font = "font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif]";
const cardClass = "box-border h-fit flex flex-col gap-[16px] p-[24px] justify-start items-start bg-[#FFFFFF] [outline:1px_solid_#D5DADD] [outline-offset:-0.5px] rounded-[12px]";
const quickClass = "box-border w-full min-w-0 h-fit flex flex-col gap-[10px] p-[16px] justify-start items-start bg-[#F5F6F7] [outline:1px_solid_#D5DADD] [outline-offset:-0.5px] rounded-[8px] hover:bg-[#EAF3F5] transition-colors";

const stats: { label: string; value: string; sub: string; Icon: LucideIcon }[] = [
  { label: "Blog posts", value: "9", sub: "6 published · 3 drafts", Icon: FileText },
  { label: "Gallery images", value: "10", sub: "2 drafts", Icon: Images },
  { label: "Open positions", value: "3", sub: "Careers page", Icon: Briefcase },
  { label: "Clients", value: "18", sub: "Across 6 industries", Icon: Building2 },
];

const activity: { title: string; detail: string; time: string; iconBg: string; iconColor: string; Icon: LucideIcon }[] = [
  { title: "Blog post published", detail: "Digital transformation trends this year", time: "2 hours ago", iconBg: "#F5FAE5", iconColor: "#188918", Icon: FileText },
  { title: "3 images uploaded to Gallery", detail: "Projects", time: "5 hours ago", iconBg: "#EBF8FF", iconColor: "#0070F2", Icon: Images },
  { title: "Customer story updated", detail: "Transforming a manufacturer's supply chain with SAP S/4HANA", time: "1 day ago", iconBg: "#EAF3F5", iconColor: "#2F6E80", Icon: MessageSquareQuote },
  { title: "Blog post saved as draft", detail: "The future of cloud ERP solutions", time: "2 days ago", iconBg: "#EAECEE", iconColor: "#354A5F", Icon: FilePen },
  { title: "Position updated", detail: "Business Analyst (SAP S/4HANA) Consultant – Trainee", time: "3 days ago", iconBg: "#FFF8D6", iconColor: "#E76500", Icon: Briefcase },
];

const attention: { text: string; Icon: LucideIcon; color: string }[] = [
  { text: "2 customer stories have no photo", Icon: TriangleAlert, color: "#E76500" },
  { text: "3 blog posts are still drafts", Icon: FilePen, color: "#354A5F" },
  { text: "15 clients have no website added", Icon: LinkIcon, color: "#0070F2" },
];

const quickActions: { label: string; href: string; Icon: LucideIcon }[] = [
  { label: "New blog post", href: "/admin/blog/new", Icon: FilePlus },
  { label: "Upload images", href: "/admin/gallery/upload", Icon: ImagePlus },
  { label: "New position", href: "/admin/careers/edit", Icon: Briefcase },
  { label: "Add customer story", href: "/admin/customer-stories/edit", Icon: MessageSquarePlus },
];

export default function AdminDashboardPage() {
  return (
    <AdminShell activeKey="dashboard" breadcrumb="Overview" title="Dashboard">
      <div className="box-border w-full h-fit shrink-0 flex flex-col gap-[24px] p-[32px] justify-start items-start max-lg:p-[20px]">
        <div className="box-border w-full h-fit shrink-0 flex flex-row flex-wrap gap-[16px] justify-between items-end">
          <div className="box-border w-fit shrink-0 h-fit flex flex-col gap-[4px] justify-start items-start">
            <div className={`text-[26px]/[34px] box-border text-[#000000] ${font} font-medium text-left [white-space:nowrap]`}>Good morning, Admin</div>
            <div className={`text-[14px]/[18px] box-border text-[#475E75] ${font} font-normal text-left [white-space:nowrap]`}>
              Thursday, 22 October 2026 · Here&apos;s what&apos;s happening on pst.co.id
            </div>
          </div>
        </div>

        <div className="box-border w-full h-fit shrink-0 flex flex-row flex-wrap gap-[20px] justify-start items-start">
          {stats.map((stat) => (
            <div key={stat.label} className={`${cardClass} [flex:1_1_200px] min-w-[200px]`}>
              <div className="box-border w-full h-fit shrink-0 flex flex-row gap-0 justify-between items-center">
                <div className="box-border w-[44px] shrink-0 h-[44px] flex flex-row gap-0 justify-center items-center bg-[#EAF3F5] rounded-[8px]">
                  <stat.Icon size={22} className="text-[#2F6E80]" />
                </div>
                <ArrowUpRight size={18} className="text-[#475E75]" />
              </div>
              <div className="box-border w-fit h-fit shrink-0 flex flex-col gap-[2px] justify-start items-start">
                <div className={`text-[36px]/[40px] box-border text-[#000354] ${font} font-medium text-left [white-space:nowrap]`}>{stat.value}</div>
                <div className={`text-[15px]/[20px] box-border text-[#000000] ${font} font-medium text-left [white-space:nowrap]`}>{stat.label}</div>
                <div className={`text-[13px]/[17px] box-border text-[#475E75] ${font} font-normal text-left [white-space:nowrap]`}>{stat.sub}</div>
              </div>
            </div>
          ))}
          <div className={`${cardClass} [flex:1_1_200px] min-w-[200px]`}>
            <div className="box-border w-full h-fit shrink-0 flex flex-row gap-0 justify-between items-center">
              <div className="box-border w-[44px] shrink-0 h-[44px] flex flex-row gap-0 justify-center items-center bg-[#000354] rounded-[8px]">
                <Mail size={22} className="text-[#A6CBD3]" />
              </div>
              <div className="box-border w-fit shrink-0 h-fit flex flex-row gap-0 p-[3px_8px] justify-start items-start bg-[#F5FAE5] rounded-[999px]">
                <div className={`text-[12px]/[16px] box-border text-[#188918] ${font} font-medium text-left [white-space:nowrap]`}>+3 this week</div>
              </div>
            </div>
            <div className="box-border w-fit h-fit shrink-0 flex flex-col gap-[2px] justify-start items-start">
              <div className={`text-[36px]/[40px] box-border text-[#000354] ${font} font-medium text-left [white-space:nowrap]`}>8</div>
              <div className={`text-[15px]/[20px] box-border text-[#000000] ${font} font-medium text-left [white-space:nowrap]`}>Subscribers</div>
              <div className={`text-[13px]/[17px] box-border text-[#475E75] ${font} font-normal text-left [white-space:nowrap]`}>5 subscribed · 1 pending</div>
            </div>
          </div>
        </div>

        <div className="box-border w-full h-fit shrink-0 flex flex-row flex-wrap gap-[20px] justify-start items-start">
          <div className="box-border [flex:2_1_480px] min-w-0 h-fit flex flex-col gap-[4px] p-[24px] justify-start items-start bg-[#FFFFFF] [outline:1px_solid_#D5DADD] [outline-offset:-0.5px] rounded-[12px]">
            <div className="box-border w-full h-fit shrink-0 flex flex-row gap-0 pb-[12px] justify-between items-center">
              <div className={`text-[17px]/[22px] box-border text-[#000000] ${font} font-medium text-left [white-space:nowrap]`}>Recent activity</div>
              <span className={`text-[14px]/[18px] box-border text-[#2F6E80] ${font} font-medium text-left [white-space:nowrap]`}>View all</span>
            </div>
            {activity.map((item, index) => (
              <div
                key={item.title}
                className={`box-border w-full h-fit shrink-0 flex flex-row gap-[14px] py-[12px] justify-start items-center ${
                  index < activity.length - 1 ? "[border-width:0px_0px_1px_0px] [border-style:solid] [border-color:#EAECEE]" : ""
                }`}
              >
                <div className="box-border w-[36px] shrink-0 h-[36px] flex flex-row gap-0 justify-center items-center rounded-[999px]" style={{ backgroundColor: item.iconBg }}>
                  <item.Icon size={16} style={{ color: item.iconColor }} />
                </div>
                <div className="box-border [flex:1_1_0] min-w-0 h-fit flex flex-col gap-[2px] justify-start items-start">
                  <div className={`text-[14px]/[18px] box-border text-[#000000] ${font} font-medium text-left [white-space:nowrap]`}>{item.title}</div>
                  <div className={`text-[13px]/[17px] box-border w-full text-[#475E75] ${font} font-normal text-left`}>{item.detail}</div>
                </div>
                <div className={`text-[12px]/[16px] box-border text-[#475E75] ${font} font-normal text-left [white-space:nowrap]`}>{item.time}</div>
              </div>
            ))}
          </div>

          <div className="box-border [flex:1_1_320px] min-w-[320px] h-fit flex flex-col gap-[20px] justify-start items-start">
            <div className="box-border w-full h-fit shrink-0 flex flex-col gap-[16px] p-[24px] justify-start items-start bg-[#FFFFFF] [outline:1px_solid_#D5DADD] [outline-offset:-0.5px] rounded-[12px]">
              <div className={`text-[17px]/[22px] box-border text-[#000000] ${font} font-medium text-left [white-space:nowrap]`}>Quick actions</div>
              <div className="box-border w-full h-fit shrink-0 grid grid-cols-2 gap-[12px] justify-start items-start">
                {quickActions.map((action) => (
                  <Link key={action.label} href={action.href} className={quickClass}>
                    <div className="box-border w-[36px] h-[36px] shrink-0 flex flex-row gap-0 justify-center items-center bg-[#000354] rounded-[8px]">
                      <action.Icon size={18} className="text-[#A6CBD3]" />
                    </div>
                    <div className={`text-[14px]/[18px] box-border w-full text-[#000000] ${font} font-medium text-left`}>{action.label}</div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="box-border w-full h-fit shrink-0 flex flex-col gap-[12px] p-[24px] justify-start items-start bg-[#FFFFFF] [outline:1px_solid_#D5DADD] [outline-offset:-0.5px] rounded-[12px]">
              <div className={`text-[17px]/[22px] box-border text-[#000000] ${font} font-medium text-left [white-space:nowrap]`}>Needs attention</div>
              {attention.map((item) => (
                <div key={item.text} className="box-border w-full h-fit shrink-0 flex flex-row gap-[10px] p-[10px_12px] justify-start items-center bg-[#F5F6F7] rounded-[8px]">
                  <item.Icon size={16} style={{ color: item.color }} className="shrink-0" />
                  <div className={`text-[14px]/[18px] box-border [flex:1_1_0] text-[#223548] ${font} font-normal text-left`}>{item.text}</div>
                  <ChevronRight size={16} className="text-[#475E75] shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
