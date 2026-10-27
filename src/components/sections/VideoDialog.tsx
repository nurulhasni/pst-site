"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

type VideoDialogProps = {
  src: string;
  title: string;
  onClose: () => void;
};

export function VideoDialog({ src, title, onClose }: VideoDialogProps) {
  const { lang } = useLanguage();

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

  // Portal to body so a parent section's stacking context (z-index) can't clip the popup
  return createPortal(
    <div role="dialog" aria-modal="true" aria-label={title} className="fixed inset-0 z-[60] flex items-center justify-center p-[20px] bg-[#000354E6]" onClick={onClose}>
      <div onClick={(event) => event.stopPropagation()} className="box-border relative w-full max-w-[1100px] flex flex-col gap-[12px] items-end">
        <button type="button" aria-label={lang === "id" ? "Tutup" : "Close"} onClick={onClose} className="box-border w-[40px] h-[40px] shrink-0 flex items-center justify-center bg-[#FFFFFF1F] hover:bg-[#FFFFFF33] rounded-[999px] cursor-pointer transition-colors">
          <X size={20} className="text-[#FFFFFF]" />
        </button>
        <video src={src} controls autoPlay playsInline className="box-border w-full max-h-[calc(100vh-112px)] bg-[#000000] rounded-[12px] [box-shadow:0px_20px_60px_#00000080]" />
      </div>
    </div>,
    document.body,
  );
}
