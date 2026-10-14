"use client";

import * as React from "react";
import {
  gsap,
  ScrollTrigger,
  prefersReducedMotion,
  registerGsap,
  EASE_OUT,
} from "@/lib/motion";

/* Content is visible by default. Hidden start states are applied in a layout
   effect, before first paint on the client, and removed when the tween ends,
   so a failed script or reduced motion leaves the final state in place. */

type Kind = "mask" | "wipe" | "scale" | "horizon" | "blur" | "letters";

const FROM: Record<Exclude<Kind, "letters">, gsap.TweenVars> = {
  // side margins keep things that sit outside the box (timeline dots) from being clipped
  mask: { clipPath: "inset(100% -160px 0% -160px)" },
  wipe: { clipPath: "inset(0% 100% 0% 0%)" },
  scale: { scale: 0.86, opacity: 0, transformOrigin: "50% 50%" },
  horizon: { clipPath: "inset(48% 0% 48% 0%)" },
  blur: { filter: "blur(12px)", opacity: 0 },
};
const TO: Record<Exclude<Kind, "letters">, gsap.TweenVars> = {
  mask: { clipPath: "inset(0% -160px 0% -160px)" },
  wipe: { clipPath: "inset(0% 0% 0% 0%)" },
  scale: { scale: 1, opacity: 1 },
  horizon: { clipPath: "inset(0% 0% 0% 0%)" },
  blur: { filter: "blur(0px)", opacity: 1 },
};

type RevealProps = {
  kind?: Kind;
  /** Seconds before the first target starts. */
  delay?: number;
  duration?: number;
  /** Seconds between children. When set, each direct child is a target. */
  stagger?: number;
  /** Total stagger spread is capped to this many seconds. */
  maxSpread?: number;
  /** Vertical travel in px that rides along with a mask. */
  y?: number;
  /** ScrollTrigger start. */
  start?: string;
  as?: React.ElementType;
  className?: string;
  children?: React.ReactNode;
} & Omit<React.HTMLAttributes<HTMLElement>, "children">;

/**
 * One-time entrance when the element scrolls into view. Different `kind`s
 * per section keep the page from repeating one fade-up everywhere.
 */
export function Reveal({
  kind = "mask",
  delay = 0,
  duration = 0.9,
  stagger = 0,
  maxSpread = 0.6,
  y = 0,
  start = "top 88%",
  as: Tag = "div",
  className,
  children,
  ...rest
}: RevealProps) {
  const ref = React.useRef<HTMLElement>(null);

  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    registerGsap();
    const ctx = gsap.context(() => {
      const targets = stagger ? Array.from(el.children) : [el];
      if (!targets.length) return;
      const from = { ...FROM[kind as Exclude<Kind, "letters">], ...(y ? { y } : {}) };
      const to = { ...TO[kind as Exclude<Kind, "letters">], ...(y ? { y: 0 } : {}) };
      gsap.set(targets, from);
      ScrollTrigger.create({
        trigger: el,
        start,
        once: true,
        onEnter: () => {
          gsap.to(targets, {
            ...to,
            duration,
            delay,
            ease: EASE_OUT,
            stagger: stagger
              ? { each: Math.min(stagger, maxSpread / Math.max(targets.length, 1)) }
              : 0,
            clearProps: "clipPath,transform,opacity,filter",
          });
        },
      });
    }, el);
    return () => ctx.revert();
  }, [kind, delay, duration, stagger, maxSpread, y, start]);

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}

type ScrubProps = {
  /** CSS-ish tween vars for the start and end of the scroll range. */
  from: gsap.TweenVars;
  to: gsap.TweenVars;
  start?: string;
  end?: string;
  /** Element whose position drives the scrub (defaults to the element itself). */
  triggerSelector?: string;
  as?: React.ElementType;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
} & Omit<React.HTMLAttributes<HTMLElement>, "children" | "style">;

/** Scroll-linked tween (scrub). Reduced motion renders the end state. */
export function Scrub({
  from,
  to,
  start = "top bottom",
  end = "bottom top",
  triggerSelector,
  as: Tag = "div",
  className,
  style,
  children,
  ...rest
}: ScrubProps) {
  const ref = React.useRef<HTMLElement>(null);

  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    registerGsap();
    if (prefersReducedMotion()) {
      gsap.set(el, to);
      return;
    }
    const ctx = gsap.context(() => {
      const trigger = triggerSelector
        ? (el.closest(triggerSelector) as HTMLElement | null) ?? el
        : el;
      gsap.fromTo(el, from, {
        ...to,
        ease: "none",
        scrollTrigger: { trigger, start, end, scrub: 0.6 },
      });
    }, el);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Tag ref={ref} className={className} style={style} {...rest}>
      {children}
    </Tag>
  );
}

/** One-time opacity fade-in when the element first enters the viewport (no transforms). */
export function FadeIn({
  className,
  children,
  duration = 0.9,
}: {
  className?: string;
  children?: React.ReactNode;
  duration?: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    el.style.opacity = "0";
    el.style.transition = `opacity ${duration}s cubic-bezier(0.16, 1, 0.3, 1)`;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        el.style.opacity = "1";
        io.disconnect();
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [duration]);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/** Depth parallax: moves slower or faster than the page by +/- `distance` px. */
export function Parallax({
  distance = 60,
  as: Tag = "div",
  className,
  children,
  ...rest
}: {
  distance?: number;
  as?: React.ElementType;
  className?: string;
  children?: React.ReactNode;
} & Omit<React.HTMLAttributes<HTMLElement>, "children">) {
  return (
    <Scrub
      as={Tag}
      className={className}
      from={{ y: distance }}
      to={{ y: -distance }}
      {...rest}
    >
      {children}
    </Scrub>
  );
}
