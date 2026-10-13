import * as React from "react";
import { cn } from "@/lib/utils";

type Props = {
  /** SVG path data, in the viewBox coordinate system. */
  d: string;
  viewBox: string;
  /** Left and right x of the gradient span (usually 0 and the viewBox width). */
  x1?: number;
  x2?: number;
  /** Optional city dots drawn on top, in viewBox coordinates. */
  points?: { x: number; y: number; label?: string; below?: boolean }[];
  /** Seconds for the bright run to cross the line. */
  duration?: number;
  strokeWidth?: number;
  className?: string;
  title?: string;
};

/**
 * A line with a gradient (--sun-500 to --dawn-400) that runs along it.
 * Native replacement for Gradient Tracing: a dim full line, a bright
 * dash that travels, round ends. Reduced motion freezes the bright dash
 * at the line's centre via the global reduced-motion rule.
 */
export function TracingLine({
  d,
  viewBox,
  x1 = 0,
  x2 = 1000,
  points,
  duration = 5,
  strokeWidth = 3,
  className,
  title,
}: Props) {
  const id = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  return (
    <svg
      viewBox={viewBox}
      className={cn("block h-auto w-full overflow-visible", className)}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      fill="none"
    >
      <defs>
        <linearGradient id={`tl-${id}`} gradientUnits="userSpaceOnUse" x1={x1} y1="0" x2={x2} y2="0">
          <stop offset="0" stopColor="var(--sun-500)" />
          <stop offset="1" stopColor="var(--dawn-400)" />
        </linearGradient>
      </defs>
      {/* the road */}
      <path d={d} stroke="var(--ink-700)" strokeWidth={strokeWidth} strokeLinecap="round" pathLength={1000} />
      {/* the gradient, dimmed, so the whole route reads */}
      <path
        d={d}
        stroke={`url(#tl-${id})`}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeOpacity={0.35}
        pathLength={1000}
      />
      {/* the light that runs */}
      <path
        d={d}
        stroke={`url(#tl-${id})`}
        strokeWidth={strokeWidth + 1}
        strokeLinecap="round"
        pathLength={1000}
        strokeDasharray="140 860"
        style={{
          animation: `tl-run ${duration}s var(--ease-in-out) infinite`,
        }}
      />
      {points?.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r={strokeWidth * 2.2} fill="var(--ink-950)" stroke="var(--sun-500)" strokeWidth={strokeWidth * 0.8} />
          {p.label ? (
            <text
              x={p.x}
              y={p.below ? p.y + strokeWidth * 8 : p.y - strokeWidth * 5}
              textAnchor="middle"
              fill="var(--fog-400)"
              style={{ font: "500 13px var(--font-sans)", letterSpacing: "0.06em", textTransform: "uppercase" }}
            >
              {p.label}
            </text>
          ) : null}
        </g>
      ))}
      <style>{`@keyframes tl-run{from{stroke-dashoffset:140}to{stroke-dashoffset:-1000}}`}</style>
    </svg>
  );
}
