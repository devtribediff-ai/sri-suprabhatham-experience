import { motion } from "framer-motion";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { rise, softRise, stagger } from "@/lib/motion";

const promises = [
  { id: "structure", title: "Earthquake-Resistant Framing", note: "RCC framed structures engineered for a quarter-century of grace." },
  { id: "heights", title: "10-Foot Floor Heights", note: "Volume that lets light and air travel the way architecture intended." },
  { id: "vastu", title: "Vastu-Aligned Planning", note: "Traditional principles composed into modern circulation." },
  { id: "materials", title: "Signature Materials", note: "Asian Ultima, American Standard, Godrej — specified, never substituted." },
  { id: "warranty", title: "Written Warranties", note: "Structural, joinery and finishing warranties in writing, not in speech." },
  { id: "boutique", title: "Ten Homes At A Time", note: "Never more. A vow the studio has kept for two decades." },
];

/**
 * The Quality Promise — six engraved plates on marble. Each is a public
 * commitment the studio has kept since 2002.
 */
export function QualityPromise() {
  return (
    <section className="relative isolate bg-ivory py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionTitle
          eyebrow="The Quality Promise"
          title={<>Six commitments <span className="text-brass-gradient">in writing</span>.</>}
          subtitle="The clauses that appear in every Sri Suprabatham contract. Nothing new — just what we've always done, made explicit."
        />
        <motion.ul
          variants={stagger(0.08, 0.15)}
          initial="initial"
          whileInView="enter"
          viewport={{ once: true, margin: "-10% 0px" }}
          className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {promises.map((p, i) => (
            <motion.li key={p.id} variants={rise} className="brass-frame relative bg-warmwhite/70 p-8">
              <motion.p variants={softRise} className="eyebrow text-brass-deep">
                No. {String(i + 1).padStart(2, "0")}
              </motion.p>
              <motion.h3 variants={softRise} className="mt-4 font-display text-2xl text-obsidian">
                {p.title}
              </motion.h3>
              <motion.p variants={softRise} className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {p.note}
              </motion.p>
              <span
                aria-hidden
                className="absolute right-4 top-4 h-8 w-8 opacity-30"
                style={{ background: "var(--gradient-brass)", clipPath: "polygon(50% 0, 100% 50%, 50% 100%, 0 50%)" }}
              />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
