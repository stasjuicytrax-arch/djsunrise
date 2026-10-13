import { cn } from "@/lib/utils";
import { SUN_RAYS, SUN_VIEWBOX } from "./sun-paths";

type Props = {
  className?: string;
  /** Paint rays with this CSS color. Defaults to the brand red. */
  color?: string;
  title?: string;
};

/** The SUNRISE sun: 16 rays from the logo, each a `path.ray` so they can be animated one by one. */
export function SunMark({ className, color = "var(--sun-500)", title }: Props) {
  return (
    <svg
      viewBox={SUN_VIEWBOX}
      className={cn("block", className)}
      fill={color}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {SUN_RAYS.map((d, i) => (
        <path key={i} className="ray" data-i={i} d={d} />
      ))}
    </svg>
  );
}
