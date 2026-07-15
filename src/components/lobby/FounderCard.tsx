import { motion } from "framer-motion";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { rise, softRise, sriEase, stagger } from "@/lib/motion";
import type { CompanyProfile } from "@/lib/projects.schema";

interface Props {
  person: CompanyProfile["founder"];
  align?: "left" | "right";
  eyebrow?: string;
}

/**
 * Editorial-style leadership card. Large portrait, hairline-framed pull
 * quote, biography paragraph. Placeholder marble renders when no real
 * portrait is available.
 */
export function FounderCard({ person, align = "left", eyebrow }: Props) {
  const reverse = align === "right";
  return (
    <motion.article
      variants={stagger(0.1)}
      initial="initial"
      whileInView="enter"
      viewport={{ once: true, margin: "-10% 0px" }}
      className={`grid gap-10 md:grid-cols-12 md:gap-14 ${reverse ? "md:[direction:rtl]" : ""}`}
    >
      <div className="md:col-span-5 md:[direction:ltr]">
        <motion.div variants={rise} className="relative">
          <div
            className="brass-frame overflow-hidden"
            style={{ borderTopLeftRadius: "50% 22%", borderTopRightRadius: "50% 22%" }}
          >
            <PlaceholderImage
              src={person.portrait.src}
              alt={person.portrait.alt}
              aspect="aspect-[3/4]"
              fit="cover"
            />
          </div>
          {/* Engraved name plate */}
          <div
            className="absolute -bottom-6 left-1/2 -translate-x-1/2 brass-frame bg-obsidian px-6 py-2 text-center text-ivory"
            style={{ boxShadow: "var(--shadow-brass)" }}
          >
            <span className="eyebrow text-brass-glow">Est. 2002</span>
          </div>
          {/* Signature brass corner tag */}
          <div
            aria-hidden
            className="absolute -bottom-4 -right-4 grid h-16 w-16 place-items-center brass-frame bg-obsidian text-ivory"
            style={{ boxShadow: "var(--shadow-brass)" }}
          >
            <span className="font-display text-2xl">SS</span>
          </div>
        </motion.div>
      </div>

      <div className="md:col-span-7 md:[direction:ltr]">
        {eyebrow && (
          <motion.p variants={softRise} className="eyebrow text-brass-deep">
            <span className="mr-3 inline-block h-px w-8 align-middle bg-brass" aria-hidden />
            {eyebrow}
          </motion.p>
        )}
        <motion.h3 variants={rise} className="mt-4 font-display text-5xl md:text-6xl">
          {person.name}
        </motion.h3>
        <motion.p variants={softRise} className="mt-2 eyebrow text-obsidian/60">
          {person.role}
        </motion.p>

        <motion.blockquote
          variants={rise}
          transition={{ delay: 0.15, duration: 1.1, ease: sriEase }}
          className="mt-10 border-l border-brass/50 pl-6"
        >
          <p className="font-display text-2xl leading-snug text-obsidian md:text-3xl">
            &ldquo;{person.quote}&rdquo;
          </p>
        </motion.blockquote>

        <motion.p variants={softRise} className="mt-8 max-w-xl leading-relaxed text-muted-foreground">
          {person.bio}
        </motion.p>
      </div>
    </motion.article>
  );
}
