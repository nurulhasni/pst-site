import Link from "next/link";
import {
  Briefcase,
  Building2,
  FileText,
  Images,
  LayoutDashboard,
  LogOut,
  Mail,
  MessageSquareQuote,
  Settings,
  type LucideIcon,
} from "lucide-react";

const font = "font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif]";

type NavItem = {
  key: string;
  label: string;
  Icon: LucideIcon;
  href: string;
  badge?: string;
};

const contentItems: NavItem[] = [
  { key: "dashboard", label: "Dashboard", Icon: LayoutDashboard, href: "/admin" },
  { key: "blog", label: "Blog Posts", Icon: FileText, href: "/admin/blog" },
  { key: "gallery", label: "Gallery", Icon: Images, href: "/admin/gallery" },
  { key: "careers", label: "Careers", Icon: Briefcase, href: "/admin/careers" },
  { key: "clients", label: "Clients", Icon: Building2, href: "/admin/clients" },
  { key: "testimonials", label: "Testimonials", Icon: MessageSquareQuote, href: "/admin/testimonials" },
];

const audienceItems: NavItem[] = [{ key: "subscribers", label: "Subscribers", Icon: Mail, href: "/admin/subscribers", badge: "3 new" }];

function NavRow({ item, active }: { item: NavItem; active: boolean }) {
  const { Icon } = item;

  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      className={`box-border w-full h-[44px] shrink-0 flex flex-row gap-[12px] p-[0px_14px] justify-start items-center rounded-[8px] transition-colors ${
        active ? "bg-[#FFFFFF1A]" : "hover:bg-[#FFFFFF0F]"
      }`}
    >
      <Icon size={18} className={active ? "text-[#A6CBD3] shrink-0" : "text-[#FFFFFFA6] shrink-0"} />
      <div
        className={`text-[14px]/[18px] box-border [flex:1_1_0] ${active ? "text-[#FFFFFF]" : "text-[#FFFFFFBF]"} ${font} font-medium text-left [white-space:nowrap]`}
      >
        {item.label}
      </div>
      {item.badge && (
        <div className={`box-border w-fit shrink-0 h-fit flex flex-row gap-0 p-[2px_8px] justify-start items-start bg-[#A6CBD3] rounded-[999px]`}>
          <div className={`text-[11px]/[14px] box-border text-[#000354] ${font} font-medium text-left [white-space:nowrap]`}>{item.badge}</div>
        </div>
      )}
    </Link>
  );
}

export function AdminSidebar({ activeKey }: { activeKey: string }) {
  return (
    <aside className="box-border w-[260px] shrink-0 sticky top-0 h-screen flex flex-col gap-0 justify-start items-start bg-[#000354] max-lg:hidden">
      <div className="w-[260px] h-[87.5px] shrink-0 flex flex-row gap-[12px] p-[24px] justify-start items-center [border-width:0px_0px_1px_0px] [border-style:solid] [border-color:#FFFFFF1A]">
        <div className="box-border w-[40px] shrink-0 h-[40px] bg-[#FFFFFF] bg-[url('/images/pst/pst-logo.png')] bg-no-repeat bg-contain bg-center rounded-[8px]" />
        <div className="box-border w-fit shrink-0 h-fit flex flex-col gap-[2px] justify-start items-start">
          <div className={`text-[14px]/[18px] box-border text-[#FFFFFF] ${font} font-medium text-left [white-space:nowrap]`}>Prima Sistem Terpadu</div>
          <div className={`text-[12px]/[16px] box-border text-[#FFFFFF99] ${font} font-normal text-left [white-space:nowrap]`}>Content Admin</div>
        </div>
      </div>

      <nav className="box-border w-full [flex:1_1_0] flex flex-col gap-[4px] p-[20px_12px] justify-start items-start">
        <div className={`text-[11px]/[14px] box-border text-[#FFFFFF66] ${font} font-medium tracking-[1.2px] text-left [white-space:nowrap]`}>CONTENT</div>
        {contentItems.map((item) => (
          <NavRow key={item.key} item={item} active={item.key === activeKey} />
        ))}

        <div className="box-border w-full h-fit shrink-0 flex flex-row gap-0 p-[16px_0px_4px_0px] justify-start items-start">
          <div className={`text-[11px]/[14px] box-border text-[#FFFFFF66] ${font} font-medium tracking-[1.2px] text-left [white-space:nowrap]`}>AUDIENCE</div>
        </div>
        {audienceItems.map((item) => (
          <NavRow key={item.key} item={item} active={item.key === activeKey} />
        ))}

        <div className="box-border w-full h-[8px] shrink-0" />
        <NavRow item={{ key: "settings", label: "Settings", Icon: Settings, href: "/admin/settings" }} active={activeKey === "settings"} />
      </nav>

      <div className="w-[260px] h-fit shrink-0 flex flex-row gap-[12px] p-[20px_24px] justify-start items-center [border-width:1px_0px_0px_0px] [border-style:solid] [border-color:#FFFFFF1A]">
        <div className="box-border w-[36px] shrink-0 h-[36px] flex flex-row gap-0 justify-center items-center bg-[#A6CBD3] rounded-[999px]">
          <div className={`text-[13px]/[17px] box-border text-[#000354] ${font} font-medium text-left [white-space:nowrap]`}>AD</div>
        </div>
        <div className="box-border [flex:1_1_0] h-fit flex flex-col gap-[2px] justify-start items-start min-w-0">
          <div className={`text-[14px]/[18px] box-border text-[#FFFFFF] ${font} font-medium text-left [white-space:nowrap]`}>Admin User</div>
          <div className={`text-[12px]/[16px] box-border text-[#FFFFFF99] ${font} font-normal text-left [white-space:nowrap]`}>admin@pst.co.id</div>
        </div>
        <button type="button" aria-label="Log out" className="box-border w-[18px] shrink-0 h-[18px] flex items-center justify-center cursor-pointer text-[#FFFFFFA6] hover:text-[#FFFFFF] transition-colors">
          <LogOut size={18} />
        </button>
      </div>
    </aside>
  );
}
