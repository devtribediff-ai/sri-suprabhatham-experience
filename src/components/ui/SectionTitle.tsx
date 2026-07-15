import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { rise, softRise, stagger, sriEase } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface Props {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
}

/**
 * Reusable section title. Eyebrow → display headline (Cormorant) → optional
 * subtitle. All words rise on scroll with a soft blur.
 */
export function SectionTitle({ eyebrow, title, subtitle, align = "left", tone = "light", className }: Props) {
  return (
    <motion.header
      variants={stagger(0.08)}
      initial="initial"
      whileInView="enter"
      viewport={{ once: true, margin: "-15% 0px" }}
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <motion.p
          variants={softRise}
          className={cn(
            "eyebrow mb-5 inline-flex items-center gap-3",
            tone === "light" ? "text-brass-deep" : "text-brass-glow",
          )}
        >
          <span className="h-px w-8 bg-current" aria-hidden />
          {eyebrow}
        </motion.p>
      )}
      <motion.h2
        variants={rise}
        className={cn(
          "font-display text-4xl leading-[1.02] sm:text-5xl md:text-6xl lg:text-7xl",
          tone === "light" ? "text-obsidian" : "text-ivory",
        )}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={softRise}
          custom={0.15}
          transition={{ delay: 0.15, duration: 1, ease: sriEase }}
          className={cn(
            "mt-6 max-w-2xl text-lg leading-relaxed",
            tone === "light" ? "text-muted-foreground" : "text-ivory/70",
            align === "center" && "mx-auto",
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.header>
  );
}
