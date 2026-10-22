"use client";

import Link from "next/link";
import { Icon } from "@/components/Icon";
import { useLanguage } from "@/components/LanguageProvider";

const font = "font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif]";

const companyLinks = [
  { labelKey: "nav.aboutUs", href: "/about" },
  { labelKey: "nav.services", href: "/services" },
  { labelKey: "nav.gallery", href: "/gallery" },
  { labelKey: "nav.career", href: "/career" },
];

const resourceLinks = [
  { labelKey: "nav.blog", href: "/blog" },
  { labelKey: "footer.contact", href: "/contact" },
  { labelKey: "footer.privacy", href: "#" },
  { labelKey: "footer.terms", href: "#" },
];

const headingClass = `text-[14px]/[18px] text-[#000000] ${font} font-medium`;
const textClass = `text-[14px]/[18px] text-[#354A5F] ${font} font-normal`;

export function Footer() {
  const { t } = useLanguage();

  const contactItems = [
    { icon: "map-pin-d66139", lines: [t("footer.address1"), t("footer.address2")] },
    { icon: "mail-82c56f", lines: [t("footer.sales")] },
    { icon: "briefcase-09c5d9", lines: [t("footer.careerEmail")] },
    { icon: "phone-9c4018", lines: ["+62 21 4204626 / +62 21 50919968"] },
  ];

  return (
    <footer className="box-border w-full h-fit shrink-0 flex flex-col gap-[56px] p-[72px_96px_32px_96px] justify-start items-start bg-[#F5F6F7] [border-width:1px_0px_0px_0px] [border-style:solid] [border-color:#D5DADD] relative max-lg:p-[36px_20px_32px_20px] max-lg:gap-[32px]">
      <div className="box-border w-full h-fit flex flex-row gap-[48px] justify-start items-start max-lg:flex-col max-lg:gap-[32px]">
        <div className="box-border w-[404px] max-w-full shrink-0 h-fit flex flex-col gap-[20px] justify-start items-start max-lg:w-full">
          <div className="box-border w-fit h-[44px] flex flex-row gap-[12px] justify-start items-center">
            <div className="box-border w-[44px] h-[44px] shrink-0 bg-[url('/images/pst/pst-logo.png')] bg-no-repeat bg-contain bg-center" />
            <div className={`text-[14px]/[16px] text-[#000354] ${font} font-bold whitespace-nowrap`}>
              Prima Sistem
              <br />
              Terpadu
            </div>
          </div>
          <div className={`text-[14px]/[22px] w-[340px] max-w-full text-[#354A5F] ${font} font-normal`}>{t("footer.about")}</div>
        </div>

        <div className="box-border w-[200px] max-lg:w-full shrink-0 h-fit flex flex-col gap-[14px] justify-start items-start">
          <div className={headingClass}>{t("footer.company")}</div>
          {companyLinks.map((link) => (
            <Link key={link.labelKey} href={link.href} className={`${textClass} hover:text-[#000354] transition-colors`}>
              {t(link.labelKey)}
            </Link>
          ))}
        </div>

        <div className="box-border w-[200px] max-lg:w-full shrink-0 h-fit flex flex-col gap-[14px] justify-start items-start">
          <div className={headingClass}>{t("footer.resources")}</div>
          {resourceLinks.map((link) =>
            link.href.startsWith("/") ? (
              <Link key={link.labelKey} href={link.href} className={`${textClass} hover:text-[#000354] transition-colors`}>
                {t(link.labelKey)}
              </Link>
            ) : (
              <a key={link.labelKey} href={link.href} className={`${textClass} hover:text-[#000354] transition-colors`}>
                {t(link.labelKey)}
              </a>
            ),
          )}
        </div>

        <div className="box-border w-[300px] max-lg:w-full shrink-0 h-fit flex flex-col gap-[14px] justify-start items-start">
          <div className={headingClass}>{t("footer.contact")}</div>
          {contactItems.map((item) => (
            <div key={item.icon} className="box-border w-full h-fit flex flex-row gap-[10px] justify-start items-start">
              <Icon id={item.icon} className="box-border w-[16px] h-[16px] shrink-0" />
              <div className={`text-[14px]/[20px] w-full text-[#354A5F] ${font} font-normal`}>
                {item.lines.map((line) => (
                  <div key={line}>{line}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="box-border w-full h-fit flex flex-row gap-[16px] pt-[24px] justify-between items-center [border-width:1px_0px_0px_0px] [border-style:solid] [border-color:#D5DADD]">
        <div className={`text-[12px]/[16px] text-[#354A5F] ${font} font-normal`}>{t("footer.copyright")}</div>
        <div className="box-border w-fit h-fit flex flex-row gap-[8px]">
          <div className="box-border w-[36px] h-[36px] flex items-center justify-center bg-[#FFFFFF] [border-width:1px] [border-style:solid] [border-color:#D5DADD] rounded-[8px]">
            <Icon id="linkedin-36a16b" className="box-border w-[16px] h-[16px]" />
          </div>
        </div>
      </div>
    </footer>
  );
}
