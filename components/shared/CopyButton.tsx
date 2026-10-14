"use client";

import * as React from "react";
import { Check, Copy } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

type Props = {
  value: string;
  label: string;
  className?: string;
  /** `text`: borderless icon button, for dense rows. */
  variant?: "pill" | "text";
};

/** Copies `value`, says "copied" for 1.5 s. */
export function CopyButton({ value, label, className, variant = "pill" }: Props) {
  const [done, setDone] = React.useState(false);
  const timer = React.useRef<number | undefined>(undefined);

  React.useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // clipboard blocked: select-and-copy fallback
      const ta = document.createElement("textarea");
      ta.value = value;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
      } catch {
        /* nothing else to try */
      }
      document.body.removeChild(ta);
    }
    setDone(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setDone(false), 1500);
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy ${label}`}
      className={cn(
        "pointer-events-auto inline-flex items-center gap-2 text-white transition-colors duration-[var(--d-fast)]",
        variant === "pill"
          ? "h-11 rounded-full border border-white/30 px-4 text-meta font-medium uppercase tracking-[0.06em] hover:border-white hover:bg-white/10"
          : "h-9 rounded-md px-2 text-micro font-medium uppercase tracking-[0.1em] text-fog-400 hover:text-white",
        className,
      )}
    >
      {done ? <Check size={18} weight="bold" /> : <Copy size={18} />}
      <span aria-hidden>{done ? "copied" : "copy"}</span>
      <span role="status" className="sr-only">
        {done ? `${label} copied` : ""}
      </span>
    </button>
  );
}
