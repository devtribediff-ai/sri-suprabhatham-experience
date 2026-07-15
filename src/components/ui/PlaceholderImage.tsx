import { useState } from "react";
import { cn } from "@/lib/utils";

interface Props {
  src: string;
  alt: string;
  className?: string;
  /** Aspect-ratio class, e.g. "aspect-[4/3]" */
  aspect?: string;
  /** Overlay caption. */
  caption?: string;
  /** eager | lazy — LCP images should be eager. */
  loading?: "eager" | "lazy";
  /** Object-fit; defaults to cover. */
  fit?: "cover" | "contain";
  /** Optional tint overlay strength 0..1 for text contrast. */
  vignette?: number;
}

/**
 * Image with graceful marble fallback. If the src fails to load, renders a
 * marble-veined SVG so the layout stays composed while the client swaps in
 * real assets. Add `loading="eager"` for hero images.
 */
export function PlaceholderImage({
  src,
  alt,
  className,
  aspect = "aspect-[4/3]",
  caption,
  loading = "lazy",
  fit = "cover",
  vignette = 0,
}: Props) {
  const [failed, setFailed] = useState(false);
  return (
    <figure className={cn("relative overflow-hidden bg-marble marble-vein-overlay marble-surface", aspect, className)}>
      {!failed && (
        <img
          src={src}
          alt={alt}
          loading={loading}
          decoding="async"
          onError={() => setFailed(true)}
          className={cn(
            "h-full w-full transition-transform duration-[1800ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
            fit === "cover" ? "object-cover" : "object-contain",
          )}
        />
      )}
      {failed && (
        <div className="absolute inset-0 grid place-items-center">
          <svg
            viewBox="0 0 200 200"
            className="h-16 w-16 text-brass/60"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            aria-hidden
          >
            <rect x="20" y="20" width="160" height="160" />
            <path d="M20 140 L70 90 L110 130 L150 90 L180 120" />
            <circle cx="140" cy="60" r="10" />
          </svg>
        </div>
      )}
      {vignette > 0 && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(120% 100% at 50% 100%, oklch(0.14 0.008 60 / ${vignette}) 0%, transparent 65%)`,
          }}
        />
      )}
      {caption && (
        <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 p-5 text-ivory/90">
          <span className="eyebrow block text-brass-glow">Detail</span>
          <span className="font-display text-2xl leading-tight">{caption}</span>
        </figcaption>
      )}
    </figure>
  );
}
