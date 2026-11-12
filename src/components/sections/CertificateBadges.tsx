"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Download, Eye, X } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { LeadDownloadDialog } from "@/components/sections/ProfileDownloadDialog";
import type { DownloadDoc } from "@/app/actions";

// SAP certificates shown on the homepage, under the impact numbers. The preview is page 1 rendered to
// WebP (PDFs embedded in a page often fail on phones); the download is the
// original PDF. Expiry dates are deliberately not shown on the site: they are
// visible inside the certificate. The PartnerEdge certificate is valid for six
// months, so PST has to replace both files in public/certificates/ when SAP
// issues a new one. The preview is free to view; the PDF asks for name,
// organization and email first, the same form as the company profile.

type CertKey = "pcoe" | "silver";

const certs: Record<CertKey, { doc: DownloadDoc; image: string; pdf: string; width: number; height: number; pages: number }> = {
  pcoe: { doc: "pcoe-certificate", image: "/certificates/sap-pcoe-certificate.webp", pdf: "/certificates/sap-pcoe-certificate.pdf", width: 1100, height: 1555, pages: 1 },
  silver: { doc: "partneredge-certificate", image: "/certificates/sap-partneredge-certificate.webp", pdf: "/certificates/sap-partneredge-certificate.pdf", width: 1100, height: 1424, pages: 2 },
};

const font = "font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif]";

export function CertificateBadges() {
  const { t } = useLanguage();
  const [open, setOpen] = useState<CertKey | null>(null);
  const [form, setForm] = useState<CertKey | null>(null);

  const titles: Record<CertKey, string> = { pcoe: t("services.badgeTitle"), silver: t("cert.silverTitle") };
  const descs: Record<CertKey, string> = { pcoe: t("services.badgeDesc"), silver: t("cert.silverDesc") };

  return (
    <div className="box-border w-full h-fit shrink-0 flex flex-row gap-[48px] pt-[40px] justify-start items-center [border-width:1px_0px_0px_0px] [border-style:solid] [border-color:#A6CBD3] max-lg:flex-col max-lg:items-stretch max-lg:gap-[20px] max-lg:pt-[28px]">
      <div className="box-border [flex:1_1_0] min-w-0 h-fit flex flex-col gap-[6px] justify-start items-start">
        <div className={`text-[22px]/[29px] text-[#000000] ${font} font-medium`}>{t("cert.title")}</div>
        <div className={`text-[15px]/[22px] text-[#475E75] ${font}`}>{t("cert.sub")}</div>
      </div>
      <div className="box-border w-[760px] max-w-full shrink-0 h-fit grid grid-cols-2 gap-[20px] max-lg:w-full max-md:grid-cols-1 max-md:gap-[12px]">
        {(["pcoe", "silver"] as const).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setOpen(key)}
            className="group box-border w-full min-w-0 h-fit flex flex-row gap-[16px] p-[14px] justify-start items-center bg-[#FFFFFF] rounded-[12px] cursor-pointer text-left [box-shadow:0px_1px_3px_#22364914] hover:[box-shadow:0px_8px_24px_#22364926] transition-shadow focus-visible:[outline:2px_solid_#2F6E80]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- small static thumbnail of the certificate */}
            <img
              src={certs[key].image}
              alt=""
              width={certs[key].width}
              height={certs[key].height}
              loading="lazy"
              className="block w-[68px] h-[92px] shrink-0 object-cover object-top rounded-[4px] [outline:1px_solid_#D5DADD] [outline-offset:-0.5px]"
            />
            <div className="box-border [flex:1_1_0] min-w-0 h-fit flex flex-col gap-[4px] justify-start items-start">
              <div className={`text-[16px]/[21px] text-[#000354] ${font} font-medium`}>{titles[key]}</div>
              <div className={`text-[13px]/[18px] text-[#475E75] ${font}`}>{descs[key]}</div>
              <span className={`mt-[6px] flex flex-row gap-[5px] items-center text-[14px]/[18px] text-[#2F6E80] group-hover:text-[#000354] ${font} font-medium`}>
                <Eye size={15} strokeWidth={2} />
                {t("cert.view")}
              </span>
            </div>
          </button>
        ))}
      </div>
      {open && (
        <CertificateDialog
          title={titles[open]}
          cert={certs[open]}
          onClose={() => setOpen(null)}
          onDownload={() => {
            setForm(open);
            setOpen(null);
          }}
        />
      )}
      {form && (
        <LeadDownloadDialog
          document={certs[form].doc}
          file={certs[form].pdf}
          title={t("cert.formTitle").replace("{name}", titles[form])}
          sub={t("cert.formSub")}
          doneDesc={t("cert.formDone")}
          onClose={() => setForm(null)}
        />
      )}
    </div>
  );
}

function CertificateDialog({ title, cert, onClose, onDownload }: { title: string; cert: (typeof certs)[CertKey]; onClose: () => void; onDownload: () => void }) {
  const { t } = useLanguage();

  // Close on Escape and stop the page scrolling behind the popup
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return createPortal(
    <div role="dialog" aria-modal="true" aria-label={title} className="fixed inset-0 z-[60] flex items-center justify-center p-[20px] max-sm:p-[12px] bg-[#000354A6]" onClick={onClose}>
      <div onClick={(event) => event.stopPropagation()} className="box-border w-full max-w-[640px] max-h-full flex flex-col bg-[#FFFFFF] rounded-[16px] overflow-hidden">
        <div className="shrink-0 flex flex-row gap-[12px] justify-between items-center p-[16px_20px] [border-width:0px_0px_1px_0px] [border-style:solid] [border-color:#EAECEE]">
          <div className={`text-[18px]/[24px] text-[#000000] ${font} font-medium min-w-0`}>{title}</div>
          <button type="button" onClick={onClose} aria-label={t("cert.close")} className="shrink-0 w-[36px] h-[36px] flex items-center justify-center rounded-[8px] hover:bg-[#EAF3F5] cursor-pointer">
            <X size={20} className="text-[#000354]" />
          </button>
        </div>
        <div className="min-h-0 overflow-y-auto bg-[#F5F6F7] p-[16px] max-sm:p-[8px]">
          {/* eslint-disable-next-line @next/next/no-img-element -- static file, shown at its natural ratio */}
          <img src={cert.image} alt={title} width={cert.width} height={cert.height} className="block w-full h-auto rounded-[4px] [box-shadow:0px_2px_10px_#22364926] bg-[#FFFFFF]" />
        </div>
        <div className="shrink-0 flex flex-row flex-wrap gap-[12px] justify-between items-center p-[16px_20px] [border-width:1px_0px_0px_0px] [border-style:solid] [border-color:#EAECEE]">
          <div className={`text-[13px]/[18px] text-[#475E75] ${font}`}>{cert.pages > 1 ? t("cert.pagesNote").replace("{n}", String(cert.pages)) : ""}</div>
          <button
            type="button"
            onClick={onDownload}
            className="h-[40px] flex flex-row gap-[8px] items-center p-[0px_18px] bg-[#000354] hover:bg-[#0B1470] rounded-[8px] cursor-pointer"
          >
            <Download size={16} className="text-[#FFFFFF]" />
            <span className={`text-[15px]/[19px] text-[#FFFFFF] ${font} font-medium whitespace-nowrap`}>{t("cert.download")}</span>
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
