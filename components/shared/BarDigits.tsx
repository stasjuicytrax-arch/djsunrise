"use client";

import * as React from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Digits built from vertical bars. Each glyph is a 5x7 grid; consecutive
 * filled cells of one column merge into one bar, and the bars grow up from
 * the baseline when the number enters the screen.
 */

const GLYPHS: Record<string, string[]> = {
  "0": ["01110", "10001", "10011", "10101", "11001", "10001", "01110"],
  "1": ["00100", "01100", "00100", "00100", "00100", "00100", "01110"],
  "2": ["01110", "10001", "00001", "00010", "00100", "01000", "11111"],
  "3": ["11110", "00001", "00001", "01110", "00001", "00001", "11110"],
  "4": ["00010", "00110", "01010", "10010", "11111", "00010", "00010"],
  "5": ["11111", "10000", "11110", "00001", "00001", "10001", "01110"],
  "6": ["00110", "01000", "10000", "11110", "10001", "10001", "01110"],
  "7": ["11111", "00001", "00010", "00100", "01000", "01000", "01000"],
  "8": ["01110", "10001", "10001", "01110", "10001", "10001", "01110"],
  "9": ["01110", "10001", "10001", "01111", "00001", "00010", "01100"],
  "#": ["01010", "01010", "11111", "01010", "11111", "01010", "01010"],
  "+": ["00000", "00100", "00100", "11111", "00100", "00100", "00000"],
  ",": ["0", "0", "0", "0", "0", "1", "1"],
  " ": ["000", "000", "000", "000", "000", "000", "000"],
};

const CELL = 10; // grid cell, user units
const BAR = 8; // bar width inside a cell (cells almost touch: strokes read as solid bars)
const GAP_BETWEEN_GLYPHS = 1; // in cells
const ROWS = 7;

type Bar = { x: number; y: number; h: number; col: number };

function layout(text: string) {
  const bars: Bar[] = [];
  let cursor = 0;
  let col = 0;
  for (const ch of text) {
    const glyph = GLYPHS[ch] ?? GLYPHS[" "];
    const w = glyph[0].length;
    for (let c = 0; c < w; c++) {
      let r = 0;
      while (r < ROWS) {
        if (glyph[r][c] === "1") {
          const start = r;
          while (r < ROWS && glyph[r][c] === "1") r++;
          bars.push({
            x: (cursor + c) * CELL + (CELL - BAR) / 2,
            y: start * CELL,
            h: (r - start) * CELL,
            col: col + c,
          });
        } else r++;
      }
    }
    cursor += w + GAP_BETWEEN_GLYPHS;
    col += w + GAP_BETWEEN_GLYPHS;
  }
  const width = Math.max(cursor - GAP_BETWEEN_GLYPHS, 1) * CELL;
  return { bars, width, height: ROWS * CELL };
}

type Props = {
  /** Digits to draw. Supports 0-9 # + , and space. */
  value: string | number;
  className?: string;
  /** Accessible text, defaults to the value. */
  label?: string;
  /** Seconds before the first bar starts growing. */
  delay?: number;
};

export function BarDigits({ value, className, label, delay = 0 }: Props) {
  const text = String(value);
  const id = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const ref = React.useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const reduce = useReducedMotion();
  const { bars, width, height } = React.useMemo(() => layout(text), [text]);
  const show = reduce || inView;

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${width} ${height}`}
      className={cn("block h-[1em] w-auto overflow-visible", className)}
      role="img"
      aria-label={label ?? text}
    >
      <defs>
        {/* bottom = sun, top = dawn; one gradient in user space so every bar shares it */}
        <linearGradient id={`bd-${id}`} gradientUnits="userSpaceOnUse" x1="0" y1={height} x2="0" y2="0">
          <stop offset="0" stopColor="var(--sun-500)" />
          <stop offset="1" stopColor="var(--dawn-400)" />
        </linearGradient>
      </defs>
      {bars.map((b, i) => (
        <motion.rect
          key={i}
          x={b.x}
          y={b.y}
          width={BAR}
          height={b.h}
          rx={BAR / 2}
          fill={`url(#bd-${id})`}
          style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}
          initial={reduce ? false : { scaleY: 0, opacity: 0 }}
          animate={show ? { scaleY: 1, opacity: 1 } : undefined}
          transition={{
            duration: 0.72,
            ease: [0.16, 1, 0.3, 1],
            delay: delay + b.col * 0.035,
          }}
        />
      ))}
    </svg>
  );
}
