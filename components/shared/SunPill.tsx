import * as React from "react";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";

type Props = Omit<React.ComponentProps<"a">, "children"> & {
  children: React.ReactNode;
  /** `sun` is the red pill with a white arrow disc, `ghost` a quiet text link. */
  variant?: "sun" | "ghost";
};

/**
 * Sun-pill CTA (REF-3): red pill, white disc with an arrow on the right.
 * Hover: the disc slides 4px, the arrow turns 45 degrees.
 */
export function SunPill({ children, variant = "sun", className, ...props }: Props) {
  if (variant === "ghost") {
    return (
      <a
        className={cn(
          "group inline-flex items-center gap-2 text-lead font-medium text-white no-underline",
          "decoration-white/40 underline-offset-[0.25em] hover:text-white hover:underline",
          className,
        )}
        {...props}
      >
        {children}
      </a>
    );
  }
  return (
    <a
      className={cn(
        "group inline-flex h-14 items-center gap-4 rounded-[var(--r-pill)] bg-sun-500 pl-7 pr-2 text-body font-semibold text-white no-underline",
        "transition-colors duration-[var(--d-base)] ease-[var(--ease-out)] hover:bg-dawn-400 hover:text-white",
        className,
      )}
      {...props}
    >
      <span>{children}</span>
      <span
        aria-hidden
        className={cn(
          "grid size-10 place-items-center rounded-full bg-white text-sun-500",
          "transition-transform duration-[var(--d-base)] ease-[var(--ease-out)] group-hover:translate-x-1",
        )}
      >
        <ArrowUpRight
          weight="bold"
          className="size-5 transition-transform duration-[var(--d-base)] ease-[var(--ease-out)] group-hover:rotate-45"
        />
      </span>
    </a>
  );
}
