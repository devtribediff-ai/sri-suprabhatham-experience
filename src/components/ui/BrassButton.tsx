import { forwardRef, useRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { Link, type LinkProps } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

type Tone = "brass" | "ghost" | "outline" | "ink";
type Size = "sm" | "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-none font-sans-body uppercase tracking-[0.24em] transition-[transform,color,background,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50";

const sizes: Record<Size, string> = {
  sm: "px-5 py-2.5 text-[10px]",
  md: "px-7 py-3.5 text-[11px]",
  lg: "px-9 py-4 text-[12px]",
};

const tones: Record<Tone, string> = {
  brass:
    "text-ivory bg-obsidian hover:text-brass-glow before:absolute before:inset-0 before:bg-[image:var(--gradient-brass)] before:bg-[length:200%_100%] before:opacity-0 hover:before:opacity-15 before:transition-opacity before:duration-700 hover:shadow-[0_20px_50px_-20px_var(--brass)]",
  ghost:
    "text-obsidian hover:text-brass border border-transparent hover:border-brass/40",
  outline:
    "text-obsidian border border-obsidian/30 hover:border-brass hover:text-brass",
  ink:
    "text-ivory border border-brass/30 hover:border-brass bg-obsidian/60 hover:bg-obsidian/80",
};

interface Common {
  tone?: Tone;
  size?: Size;
  children: ReactNode;
  /** Adds a decorative arrow suffix. */
  arrow?: boolean;
  className?: string;
}

type ButtonProps = Common & ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * Signature CTA. Renders a subtle brass shimmer on hover and a ripple on
 * press. The default tone is used for primary calls-to-action across the
 * app. Also available as `<BrassLink>` for router navigation.
 */
export const BrassButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ tone = "brass", size = "md", children, arrow, className, onPointerDown, ...rest }, ref) => {
    const rippleRef = useRef<HTMLSpanElement>(null);
    return (
      <button
        ref={ref}
        className={cn(base, sizes[size], tones[tone], className)}
        onPointerDown={(e) => {
          const el = rippleRef.current;
          if (el) {
            const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
            el.style.left = `${e.clientX - rect.left}px`;
            el.style.top = `${e.clientY - rect.top}px`;
            el.classList.remove("animate-[ripple_650ms_ease-out]");
            void el.offsetWidth; // reflow
            el.classList.add("animate-[ripple_650ms_ease-out]");
          }
          onPointerDown?.(e);
        }}
        {...rest}
      >
        <span className="relative z-10 flex items-center gap-2.5">
          {children}
          {arrow && (
            <svg width="18" height="10" viewBox="0 0 18 10" fill="none" aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">
              <path d="M0 5 H16 M12 1 L16 5 L12 9" stroke="currentColor" strokeWidth="1" />
            </svg>
          )}
        </span>
        <span
          ref={rippleRef}
          className="pointer-events-none absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brass/60 opacity-0"
          style={{ boxShadow: "0 0 40px 20px var(--brass)" }}
        />
      </button>
    );
  },
);
BrassButton.displayName = "BrassButton";

type BrassLinkProps = Common & Omit<LinkProps, "children">;

export function BrassLink({ tone = "brass", size = "md", children, arrow, className, ...rest }: BrassLinkProps) {
  return (
    <Link
      {...rest}
      className={cn(base, sizes[size], tones[tone], "no-underline", className)}
    >
      <span className="relative z-10 flex items-center gap-2.5">
        {children}
        {arrow && (
          <svg width="18" height="10" viewBox="0 0 18 10" fill="none" aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">
            <path d="M0 5 H16 M12 1 L16 5 L12 9" stroke="currentColor" strokeWidth="1" />
          </svg>
        )}
      </span>
    </Link>
  );
}

// Global ripple keyframes injected once via styles.css? Simpler: use inline animation via Tailwind.
// We add the keyframes to styles.css:
