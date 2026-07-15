import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  tone?: "ivory" | "ink";
  /** Adds a subtle brass frame. */
  framed?: boolean;
}

export function GlassCard({ children, className, tone = "ivory", framed = false, ...rest }: Props) {
  return (
    <div
      className={cn(
        "relative rounded-sm",
        tone === "ivory" ? "glass-panel text-obsidian" : "glass-panel-dark text-ivory",
        framed && "brass-frame",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export function MarbleCard({ children, className, framed = false, ...rest }: { children: ReactNode; className?: string; framed?: boolean } & HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative overflow-hidden marble-surface marble-vein-overlay text-obsidian",
        framed && "brass-frame",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
