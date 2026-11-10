"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Calendar, ChevronLeft, ChevronRight, X } from "lucide-react";

const font = "font-['72_Brand_Variable',var(--font-public-sans),system-ui,sans-serif]";

export type LightboxItem = {
  image: string;
  title: string;
  category: string;
  date: string;
  description: string;
};

type Labels = { close: string; previous: string; next: string; of: string };

// Full-size photo viewer for the Gallery page. Esc closes it, the arrow keys
// move between photos, and the page behind stops scrolling while it is open.
export function GalleryLightbox({
  items,
  index,
  labels,
  onChange,
  onClose,
}: {
  items: LightboxItem[];
  index: number;
  labels: Labels;
  onChange: (index: number) => void;
  onClose: () => void;
}) {
  const closeButton = useRef<HTMLButtonElement>(null);
  const item = items[index];
  const count = items.length;
  const go = (step: number) => onChange((index + step + count) % count);

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus?.();
    };
  }, []);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      else if (event.key === "ArrowLeft") onChange((index - 1 + count) % count);
      else if (event.key === "ArrowRight") onChange((index + 1) % count);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, count, onChange, onClose]);

  if (!item) return null;

  const arrow =
    "box-border w-[48px] h-[48px] shrink-0 flex items-center justify-center rounded-[999px] bg-[#FFFFFF1A] hover:bg-[#FFFFFF33] text-[#FFFFFF] transition-colors max-md:w-[40px] max-md:h-[40px]";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      className="fixed inset-0 z-[100] flex flex-col bg-[#000214F2]"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="box-border w-full h-[64px] shrink-0 flex flex-row items-center justify-between p-[0px_24px] max-md:p-[0px_16px]">
        <span className={`text-[14px]/[18px] text-[#FFFFFFB3] ${font}`}>
          {index + 1} {labels.of} {count}
        </span>
        <button ref={closeButton} type="button" aria-label={labels.close} onClick={onClose} className={arrow}>
          <X size={22} />
        </button>
      </div>

      <div
        className="box-border w-full [flex:1_1_0] min-h-0 flex flex-row items-center gap-[16px] p-[0px_24px] max-md:p-[0px_8px] max-md:gap-[8px]"
        onClick={(event) => {
          if (event.target === event.currentTarget) onClose();
        }}
      >
        {count > 1 && (
          <button type="button" aria-label={labels.previous} onClick={() => go(-1)} className={arrow}>
            <ChevronLeft size={24} />
          </button>
        )}
        <div className="box-border relative [flex:1_1_0] h-full min-w-0">
          <Image key={item.image} src={item.image} alt={item.title} fill sizes="100vw" preload className="object-contain" />
        </div>
        {count > 1 && (
          <button type="button" aria-label={labels.next} onClick={() => go(1)} className={arrow}>
            <ChevronRight size={24} />
          </button>
        )}
      </div>

      <div className="box-border w-full shrink-0 flex justify-center p-[20px_24px_28px] max-md:p-[16px]">
        <div className="box-border w-full max-w-[760px] flex flex-col gap-[8px]">
          <div className="flex flex-row flex-wrap gap-[8px] items-center">
            {item.category && (
              <span className={`p-[3px_10px] rounded-[999px] bg-[#A6CBD3] text-[12px]/[16px] text-[#000354] ${font} font-medium`}>{item.category}</span>
            )}
            {item.date && (
              <span className={`flex flex-row gap-[6px] items-center text-[13px]/[18px] text-[#FFFFFFB3] ${font}`}>
                <Calendar size={14} /> {item.date}
              </span>
            )}
          </div>
          <div className={`text-[22px]/[29px] text-[#FFFFFF] ${font} font-medium max-md:text-[18px]/[24px]`}>{item.title}</div>
          {item.description && (
            <p className={`text-[15px]/[24px] text-[#FFFFFFCC] ${font} [white-space:pre-line] max-h-[120px] overflow-y-auto`}>{item.description}</p>
          )}
        </div>
      </div>
    </div>
  );
}
