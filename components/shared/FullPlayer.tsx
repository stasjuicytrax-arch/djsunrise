"use client";

import * as React from "react";
import { SpeakerHigh, X } from "@phosphor-icons/react";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/utils";

type Props = {
  /** Full-length file (with sound), loaded only after the click. */
  src: string;
  poster: string;
  /** Trigger content. */
  children: React.ReactNode;
  /** Vertical media (9:16) get a narrower frame. */
  vertical?: boolean;
  triggerClassName?: string;
  title: string;
};

/**
 * Click-to-play full video in a modal. Esc closes, focus goes back to the
 * trigger. Sound is on because the visitor asked for it.
 */
export function FullPlayer({ src, poster, children, vertical, triggerClassName, title }: Props) {
  const [open, setOpen] = React.useState(false);
  const trigger = React.useRef<HTMLButtonElement>(null);
  const closeBtn = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab") {
        // one focusable thing besides the video controls: keep focus inside
        e.preventDefault();
        closeBtn.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();
    const t = trigger.current;
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      t?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={trigger}
        type="button"
        onClick={() => setOpen(true)}
        className={triggerClassName}
        aria-haspopup="dialog"
      >
        {children}
      </button>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={title}
          className="fixed inset-0 z-[70] grid place-items-center bg-ink-950/95 p-4 backdrop-blur-[8px]"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <button
            ref={closeBtn}
            type="button"
            aria-label="Close video"
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 grid size-14 place-items-center rounded-full bg-ink-800 text-white hover:bg-sun-500"
          >
            <X size={24} />
          </button>
          <video
            src={asset(src)}
            poster={asset(poster)}
            controls
            autoPlay
            playsInline
            className={cn(
              "max-h-[88svh] rounded-[var(--r-lg)] bg-ink-950 object-contain",
              vertical ? "w-auto max-w-[min(92vw,calc(88svh*9/16))]" : "w-full max-w-[min(92vw,1600px)]",
            )}
          />
        </div>
      ) : null}
    </>
  );
}

export function SoundIcon() {
  return <SpeakerHigh weight="fill" size={28} aria-hidden />;
}
