"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Root of the orbits: hover state lives in JS (a class on the root), not in a
 * :has() selector, so the browser does not re-evaluate the whole subtree.
 * Debug flag: ?noorbits renders nothing.
 */
export function OrbitsRoot({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const [off, setOff] = React.useState(false);
  const [hover, setHover] = React.useState(false);

  React.useEffect(() => {
    setOff(new URLSearchParams(window.location.search).has("noorbits"));
  }, []);

  if (off) return null;

  return (
    <div
      data-pause-offscreen
      className={cn("orbits", hover && "is-hovering", className)}
      onPointerOver={(e) => {
        if ((e.target as HTMLElement).closest(".orbits-name")) setHover(true);
      }}
      onPointerOut={(e) => {
        const to = e.relatedTarget as HTMLElement | null;
        if (!to || !to.closest?.(".orbits-name")) setHover(false);
      }}
    >
      {children}
    </div>
  );
}
