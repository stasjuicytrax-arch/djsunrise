import { cn } from "@/lib/utils";
import { WORDMARK_PATH, WORDMARK_VIEWBOX } from "./wordmark-path";

/** The SUNRISE wordmark from the logo, as one evenodd path. Color via `color`. */
export function Wordmark({
  className,
  color = "var(--bone-100)",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox={WORDMARK_VIEWBOX}
      role="img"
      aria-label="SUNRISE"
      className={cn("block h-auto", className)}
    >
      <path fill={color} fillRule="evenodd" d={WORDMARK_PATH} />
    </svg>
  );
}
