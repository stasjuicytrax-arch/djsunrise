import * as React from "react";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/utils";

/**
 * Static sunset backdrop for Contact (no WebGL, no animation): light rises
 * from the bottom (dawn-400 to dawn-600 to sun-700 to ink-950), the top stays
 * almost black. A small tiled grain PNG sits on top at 6 %.
 * Children are laid over it; the wrapper itself ignores pointer events so
 * only the interactive children opt back in.
 */
export function SunriseHaze({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn("relative isolate w-full overflow-hidden bg-ink-950", className)}
      aria-label="Warm sunrise light"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 62% at 50% 100%, #FE6C04 0%, #DD2C05 24%, #8F1719 52%, #3A0A0B 74%, #0A0909 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `url(${asset("/brand/grain.png")})`,
          backgroundSize: "128px 128px",
          opacity: 0.06,
        }}
      />
      <div className="pointer-events-none relative z-10 flex h-full w-full flex-col">
        {children}
      </div>
    </section>
  );
}
