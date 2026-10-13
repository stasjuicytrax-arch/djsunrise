import { cn } from "@/lib/utils";

type Props = {
  text?: string;
  className?: string;
};

/**
 * Footer wordmark: the name at --t-name, cropped by the bottom edge of its
 * box. Letters warm up one by one on hover. Native replacement for the
 * Halftone Wordmark Footer (no halftone dots).
 */
export function GiantWordmark({ text = "SUNRISE", className }: Props) {
  return (
    <div
      className={cn("overflow-hidden", className)}
      aria-label={text}
      role="img"
    >
      {/* 0.62em of a 0.8 line-height box: the lower part of the glyphs is cut off */}
      <div
        aria-hidden
        className="flex h-[0.62em] select-none items-start justify-between font-display font-semibold leading-[0.8] tracking-[-0.04em] text-ink-800"
        style={{ fontSize: "var(--t-name)" }}
      >
        {[...text].map((ch, i) => (
          <span
            key={i}
            className="transition-colors duration-[var(--d-slow)] ease-[var(--ease-out)] hover:text-dawn-400 hover:duration-[var(--d-instant)]"
          >
            {ch}
          </span>
        ))}
      </div>
    </div>
  );
}
