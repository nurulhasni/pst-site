"use client";

import { useState, type FormEvent } from "react";
import {
  Building,
  Download,
  Ellipsis,
  FileText,
  Lock,
  MessageCircle,
  Phone,
  Share2,
  Users,
  type LucideIcon,
} from "lucide-react";
import { BrandIcon, type BrandName } from "@/components/admin/BrandIcons";
import { AdminCard, AdminField, AdminToggle, AdminTableHead } from "@/components/admin/AdminUi";

const font = "font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif]";

const sections: { id: string; label: string; Icon: LucideIcon }[] = [
  { id: "company", label: "Company", Icon: Building },
  { id: "contact", label: "Contact", Icon: Phone },
  { id: "whatsapp", label: "WhatsApp & chat", Icon: MessageCircle },
  { id: "downloads", label: "Downloads", Icon: Download },
  { id: "social", label: "Social media", Icon: Share2 },
  { id: "admin-users", label: "Admin users", Icon: Users },
  { id: "security", label: "Security", Icon: Lock },
];

const socials: { label: string; name: BrandName }[] = [
  { label: "LinkedIn", name: "LinkedIn" },
  { label: "Instagram", name: "Instagram" },
  { label: "Facebook", name: "Facebook" },
  { label: "X (Twitter)", name: "Twitter" },
  { label: "YouTube", name: "YouTube" },
];

const logoRow = (name: string, hint: string) => (
  <div className="box-border w-full h-fit shrink-0 flex flex-row gap-[14px] p-[14px] justify-start items-center [outline:1px_solid_#D5DADD] [outline-offset:-0.5px] rounded-[8px]">
    <div className="box-border w-[56px] shrink-0 h-[56px] flex flex-row gap-0 p-[6px] justify-start items-start bg-[#F5F6F7] rounded-[8px]">
      <div className="box-border [flex:1_1_0] h-full bg-[url('/images/pst/pst-logo.png')] bg-no-repeat bg-contain bg-center" />
    </div>
    <div className="box-border [flex:1_1_0] min-w-0 h-fit flex flex-col gap-[2px] justify-start items-start">
      <div className={`text-[13px]/[17px] box-border text-[#000000] ${font} font-medium text-left [white-space:nowrap]`}>{name}</div>
      <div className={`text-[12px]/[16px] box-border text-[#475E75] ${font} font-normal text-left [white-space:nowrap]`}>{hint}</div>
    </div>
    <button type="button" className={`text-[14px]/[18px] box-border text-[#2F6E80] hover:text-[#000354] ${font} font-medium text-left [white-space:nowrap] cursor-pointer transition-colors`}>
      Replace
    </button>
  </div>
);

export function SettingsView() {
  const [whatsappOn, setWhatsappOn] = useState(true);
  const [assistantOn, setAssistantOn] = useState(true);
  const [dirty, setDirty] = useState(true);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setDirty(false);
  }

  return (
    <form onSubmit={handleSubmit} onChange={() => setDirty(true)} className="box-border w-full h-fit shrink-0 flex flex-row gap-[24px] p-[32px] justify-start items-start max-lg:flex-col max-lg:p-[20px]">
      <nav className="box-border w-[220px] max-lg:w-full shrink-0 h-fit flex flex-col gap-[2px] p-[8px] justify-start items-start bg-[#FFFFFF] [outline:1px_solid_#D5DADD] [outline-offset:-0.5px] rounded-[12px]">
        {sections.map((section, index) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={`box-border w-full h-[40px] shrink-0 flex flex-row gap-[10px] p-[0px_12px] justify-start items-center rounded-[8px] transition-colors ${
              index === 0 ? "bg-[#EAF3F5]" : "hover:bg-[#EAF3F5]"
            }`}
          >
            <section.Icon size={16} className={index === 0 ? "text-[#2F6E80]" : "text-[#354A5F]"} />
            <span className={`text-[14px]/[18px] box-border ${index === 0 ? "text-[#2F6E80]" : "text-[#223548]"} ${font} font-medium text-left [white-space:nowrap]`}>{section.label}</span>
          </a>
        ))}
      </nav>

      <div className="box-border [flex:1_1_0] min-w-0 h-fit flex flex-col gap-[24px] justify-start items-start">
        <AdminCard id="company" title="Company" sub="Shown in the header, footer and browser tab">
          <div className="box-border w-full h-fit shrink-0 flex flex-row gap-[16px] justify-start items-start max-sm:flex-col">
            <AdminField label="Company name" value="PT Prima Sistem Terpadu" name="companyName" className="[flex:1_1_0]" />
            <AdminField label="Short name" value="PST" name="shortName" className="[flex:1_1_0]" />
          </div>
          <AdminField
            label="Footer description"
            value="Prima Sistem Terpadu (PST) is an IT total solution provider, specializing in SAP Solutions."
            name="footerDescription"
          />
          <div className="box-border w-full h-fit shrink-0 flex flex-row gap-[16px] justify-start items-start max-sm:flex-col">
            <div className="box-border [flex:1_1_0] min-w-0 h-fit flex flex-col gap-[8px] justify-start items-start">
              <span className={`text-[14px]/[18px] box-border text-[#223548] ${font} font-medium text-left [white-space:nowrap]`}>Logo</span>
              {logoRow("pst-logo.png", "PNG, transparent background")}
            </div>
            <div className="box-border [flex:1_1_0] min-w-0 h-fit flex flex-col gap-[8px] justify-start items-start">
              <span className={`text-[14px]/[18px] box-border text-[#223548] ${font} font-medium text-left [white-space:nowrap]`}>Favicon</span>
              {logoRow("favicon.png", "Square, 512 × 512 px")}
            </div>
          </div>
        </AdminCard>

        <AdminCard id="contact" title="Contact" sub="Used on the Contact page and in the footer">
          <AdminField label="Address" value="Jalan Sumur Batu VI Blok E No.3, Jakarta Pusat, Indonesia 10640" name="address" />
          <div className="box-border w-full h-fit shrink-0 flex flex-row gap-[16px] justify-start items-start max-sm:flex-col">
            <AdminField label="Phone 1" value="+62 21 4204626" name="phone1" className="[flex:1_1_0]" />
            <AdminField label="Phone 2" value="+62 21 50919968" name="phone2" className="[flex:1_1_0]" />
          </div>
          <div className="box-border w-full h-fit shrink-0 flex flex-row gap-[16px] justify-start items-start max-sm:flex-col">
            <AdminField label="Sales email" value="marketing@pst.co.id" name="salesEmail" className="[flex:1_1_0]" />
            <AdminField label="Career email" value="recruitment@pst.co.id" name="careerEmail" className="[flex:1_1_0]" />
          </div>
          <div className="box-border w-full h-fit shrink-0 flex flex-row gap-[16px] justify-start items-start max-sm:flex-col">
            <AdminField label="Office hours (weekdays)" value="Mon – Fri: 09.00 – 18.00 WIB" name="hours" className="[flex:1_1_0]" />
            <AdminField
              label="Google Maps link"
              placeholder="https://maps.google.com/..."
              name="mapsLink"
              hint='Used for the map and "Get directions".'
              className="[flex:1_1_0]"
            />
          </div>
        </AdminCard>

        <AdminCard id="whatsapp" title="WhatsApp & chat" sub="Floating buttons shown on every page">
          <div className="box-border w-full h-fit shrink-0 flex flex-row gap-[16px] justify-start items-start max-sm:flex-col">
            <AdminField label="WhatsApp number" value="62818653218" name="whatsapp" hint="Country code without + or leading 0 · opens wa.me/62818653218" className="[flex:1_1_0]" />
            <AdminField label="Button subtitle" value="Talk to our team" name="whatsappSubtitle" className="[flex:1_1_0]" />
          </div>
          <AdminField
            label="Prefilled message"
            value="Hello PST, I'd like to know more about your SAP services."
            name="prefilled"
            hint="Optional · pre-typed when the chat opens."
          />
          <div className="box-border w-full h-fit shrink-0 flex flex-row gap-[16px] justify-between items-center">
            <div className="box-border [flex:1_1_0] h-fit flex flex-col gap-[2px] justify-start items-start">
              <div className={`text-[14px]/[18px] box-border text-[#000000] ${font} font-medium text-left [white-space:nowrap]`}>Show WhatsApp button</div>
              <div className={`text-[13px]/[17px] box-border w-full text-[#475E75] ${font} font-normal text-left`}>Bottom-right on all pages</div>
            </div>
            <AdminToggle checked={whatsappOn} onChange={setWhatsappOn} label="Show WhatsApp button" />
          </div>
          <div className="box-border w-full h-fit shrink-0 flex flex-row gap-[16px] justify-between items-center">
            <div className="box-border [flex:1_1_0] h-fit flex flex-col gap-[2px] justify-start items-start">
              <div className={`text-[14px]/[18px] box-border text-[#000000] ${font} font-medium text-left [white-space:nowrap]`}>Show PST Assistant</div>
              <div className={`text-[13px]/[17px] box-border w-full text-[#475E75] ${font} font-normal text-left`}>AI chat for questions about SAP &amp; services</div>
            </div>
            <AdminToggle checked={assistantOn} onChange={setAssistantOn} label="Show PST Assistant" />
          </div>
        </AdminCard>

        <AdminCard id="downloads" title="Downloads" sub="Files linked from buttons on the website">
          <div className="box-border w-full h-fit shrink-0 flex flex-row gap-[16px] p-[16px] justify-start items-center bg-[#FFF8D6] [outline:1px_solid_#E76500] [outline-offset:-0.5px] rounded-[8px]">
            <div className="box-border w-[44px] shrink-0 h-[44px] flex flex-row gap-0 justify-center items-center bg-[#FFFFFF] rounded-[8px]">
              <FileText size={22} className="text-[#E76500]" />
            </div>
            <div className="box-border [flex:1_1_0] min-w-0 h-fit flex flex-col gap-[2px] justify-start items-start">
              <div className={`text-[15px]/[20px] box-border text-[#000000] ${font} font-medium text-left [white-space:nowrap]`}>Company profile (PDF)</div>
              <div className={`text-[13px]/[19px] box-border w-full text-[#354A5F] ${font} font-normal text-left`}>
                No file uploaded yet · the &quot;Download company profile&quot; button on the homepage is hidden until a file is added
              </div>
            </div>
            <button type="button" className={`box-border w-fit shrink-0 h-[40px] flex flex-row gap-[8px] p-[0px_16px] justify-center items-center bg-[#000354] hover:bg-[#0B1470] rounded-[8px] text-[14px]/[18px] text-[#FFFFFF] ${font} font-medium cursor-pointer transition-colors`}>
              Upload PDF
            </button>
          </div>
        </AdminCard>

        <AdminCard id="social" title="Social media" sub="Icons in the footer · leave empty to hide">
          <div className="box-border w-full h-fit shrink-0 flex flex-row flex-wrap gap-[16px] justify-start items-start">
            {socials.map((social) => (
              <AdminField
                key={social.label}
                label={social.label}
                placeholder="https://"
                name={social.label.toLowerCase().replace(/[^a-z]/g, "")}
                icon={<BrandIcon name={social.name} size={18} className="text-[#475E75] shrink-0" />}
                className="[flex:1_1_240px] min-w-[240px]"
              />
            ))}
          </div>
        </AdminCard>

        <AdminCard id="admin-users" title="Admin users" sub="People who can sign in to this admin">
          <div className="box-border w-full h-fit shrink-0 flex flex-col gap-0 justify-start items-start [outline:1px_solid_#D5DADD] [outline-offset:-0.5px] rounded-[8px] overflow-hidden">
            <AdminTableHead
              columns={[
                { label: "USER", flex: true },
                { label: "ROLE", width: "w-[120px]" },
                { label: "LAST SIGN-IN", width: "w-[150px]" },
                { label: "", width: "w-[40px]" },
              ]}
            />
            <div className="w-full h-fit shrink-0 flex flex-row gap-[16px] p-[12px_16px] justify-start items-center [border-width:1px_0px_0px_0px] [border-style:solid] [border-color:#D5DADD]">
              <div className="box-border [flex:1_1_0] min-w-0 h-fit flex flex-row gap-[12px] justify-start items-center">
                <div className="box-border w-[36px] shrink-0 h-[36px] flex flex-row gap-0 justify-center items-center bg-[#A6CBD3] rounded-[999px]">
                  <div className={`text-[13px]/[17px] box-border text-[#000354] ${font} font-medium text-left [white-space:nowrap]`}>AD</div>
                </div>
                <div className="box-border w-fit shrink-0 h-fit flex flex-col gap-[2px] justify-start items-start">
                  <div className={`text-[14px]/[18px] box-border text-[#000000] ${font} font-medium text-left [white-space:nowrap]`}>Admin User</div>
                  <div className={`text-[12px]/[16px] box-border text-[#475E75] ${font} font-normal text-left [white-space:nowrap]`}>admin@pst.co.id</div>
                </div>
              </div>
              <div className="box-border w-[120px] shrink-0 h-fit flex flex-row gap-0 justify-start items-start">
                <div className="box-border w-fit shrink-0 h-fit flex flex-row gap-0 p-[3px_10px] justify-start items-start bg-[#000354] rounded-[999px]">
                  <div className={`text-[12px]/[16px] box-border text-[#FFFFFF] ${font} font-medium text-left [white-space:nowrap]`}>Owner</div>
                </div>
              </div>
              <div className={`text-[14px]/[18px] box-border w-[150px] shrink-0 text-[#354A5F] ${font} font-normal text-left`}>Today, 08:42</div>
              <div className="box-border w-[40px] shrink-0 h-fit flex flex-row gap-0 justify-end items-start">
                <Ellipsis size={18} className="text-[#475E75]" />
              </div>
            </div>
          </div>
          <button type="button" className={`box-border w-fit h-[40px] shrink-0 flex flex-row gap-[8px] p-[0px_24px] justify-center items-center bg-[#FFFFFF] [outline:1px_solid_#475E75] [outline-offset:-0.5px] rounded-[8px] text-[14px]/[18px] text-[#223548] ${font} font-medium cursor-pointer hover:bg-[#EAF3F5] transition-colors`}>
            + Invite user
          </button>
        </AdminCard>

        <div className="box-border w-full h-fit shrink-0 flex flex-row gap-0 p-[16px_24px] justify-between items-center bg-[#000354] rounded-[12px]">
          <div className={`text-[14px]/[18px] box-border text-[#FFFFFF] ${font} font-medium text-left [white-space:nowrap]`}>
            {dirty ? "You have unsaved changes" : "All changes saved"}
          </div>
          <div className="box-border w-fit shrink-0 h-fit flex flex-row gap-[12px] justify-start items-center">
            <button type="button" onClick={() => setDirty(false)} className={`text-[14px]/[18px] box-border text-[#FFFFFFB3] hover:text-[#FFFFFF] ${font} font-medium text-left [white-space:nowrap] cursor-pointer transition-colors`}>
              Discard
            </button>
            <button type="submit" className={`box-border w-fit shrink-0 h-[40px] flex flex-row gap-[8px] p-[0px_24px] justify-center items-center bg-[#A6CBD3] hover:bg-[#B8D8DF] rounded-[8px] text-[14px]/[18px] text-[#000354] ${font} font-medium cursor-pointer transition-colors`}>
              Save changes
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
