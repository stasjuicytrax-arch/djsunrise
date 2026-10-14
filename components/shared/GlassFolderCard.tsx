"use client";

import * as React from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

type Props = {
  /** Club name, shown on the folder tab. */
  title: string;
  /** City / country line under the title. */
  meta: string;
  /** Always visible line: role. */
  summary?: string;
  /** Content shown on the folder front (rank digits, badge). */
  children?: React.ReactNode;
  /** Revealed when the folder is open (role, rank line, video). */
  files?: React.ReactNode;
  open: boolean;
  onToggle: () => void;
  /** Entrance delay in seconds (0 / 0.14 / 0.28 in the spec). */
  appearDelay?: number;
  className?: string;
};

const MAX_TILT = 3;

/**
 * Glass folder: frosted panel over the scene, tilts toward the pointer,
 * opens on click/Enter and fans its files out. Native replacement for the
 * 21st.dev Glass Folder Cards, painted with the SUNRISE ember tokens.
 */
export function GlassFolderCard({
  title,
  meta,
  summary,
  children,
  files,
  open,
  onToggle,
  appearDelay = 0,
  className,
}: Props) {
  const reduce = useReducedMotion();
  const panelId = React.useId();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 220, damping: 22, mass: 0.6 };
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-MAX_TILT, MAX_TILT]), spring);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [MAX_TILT, -MAX_TILT]), spring);
  const sheen = useTransform(px, [-0.5, 0.5], ["25%", "75%"]);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType === "touch") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <motion.div
      layout="position"
      className={cn("[perspective:900px]", className)}
      initial={reduce ? false : { opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1], delay: appearDelay }}
    >
      <motion.div
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative"
      >
        {/* tab */}
        <div
          aria-hidden
          className="ml-6 h-4 w-28 rounded-t-[var(--r-md)] border border-b-0 border-ink-500 bg-ink-800"
        />
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className={cn(
            "group relative block w-full overflow-hidden rounded-[var(--r-lg)] border border-ink-700 p-6 text-left",
            "bg-[rgba(18,16,17,0.55)] backdrop-blur-[20px] transition-colors duration-[var(--d-base)]",
            "hover:border-dawn-600 focus-visible:border-dawn-400",
          )}
        >
          {/* ember cover: light comes from the lower edge, like the sun under the horizon */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-70 transition-opacity duration-[var(--d-slow)] group-hover:opacity-100"
            style={{ background: "var(--g-sunrise)" }}
          />
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            style={{ left: sheen }}
          />
          <span className="relative flex items-start justify-between gap-4">
            <span>
              <span className="block font-display text-h3 font-medium leading-[1.1] tracking-[-0.015em] text-white">
                {title}
              </span>
              <span className="mt-1 block text-meta font-medium uppercase tracking-[0.06em] text-white">
                {meta}
              </span>
              {summary ? (
                <span className="mt-3 block max-w-[48ch] text-body text-white">{summary}</span>
              ) : null}
            </span>
            <span
              aria-hidden
              className={cn(
                "mt-1 grid size-8 shrink-0 place-items-center rounded-full bg-white text-sun-500",
                "transition-transform duration-[var(--d-base)] ease-[var(--ease-out)]",
                open ? "rotate-45" : "rotate-0",
              )}
            >
              <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M8 3v10M3 8h10" />
              </svg>
            </span>
          </span>
          <span className="relative mt-10 block">{children}</span>
        </button>
      </motion.div>

      {/* files fan out of the folder */}
      <div id={panelId} hidden={!open} className="mt-3">
        {open ? (
          <div className="flex flex-col gap-2">
            {React.Children.toArray(files).map((file, i, all) => (
              <motion.div
                key={i}
                initial={reduce ? false : { opacity: 0, y: -16, rotate: (i - (all.length - 1) / 2) * -2.5 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 }}
                className="rounded-[var(--r-md)] border border-ink-700 bg-ink-900 p-4 text-body"
              >
                {file}
              </motion.div>
            ))}
          </div>
        ) : null}
      </div>
    </motion.div>
  );
}
