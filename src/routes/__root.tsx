import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Nav } from "@/components/ui/Nav";
import { Cursor } from "@/components/ui/Cursor";
import { AudioHost } from "@/components/ui/AudioHost";
import { company } from "@/lib/projects.data";

const SITE_NAME = "Sri Suprabatham Builder";
const SITE_TAGLINE = "Built on Trust. Designed for Generations. Boutique luxury residences in Chennai since 2002.";

function NotFoundComponent() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-ivory px-4 text-obsidian">
      <div className="max-w-md text-center">
        <p className="eyebrow text-brass-deep">404</p>
        <h1 className="mt-4 font-display text-6xl">This wing is not open yet.</h1>
        <p className="mt-4 text-muted-foreground">The page you are looking for has moved or does not exist.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link to="/" className="border border-obsidian/25 px-6 py-3 text-[11px] uppercase tracking-[0.28em] transition-colors hover:border-brass hover:text-brass">
            Return to the entrance
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-dvh items-center justify-center bg-ivory px-4 text-obsidian">
      <div className="max-w-md text-center">
        <p className="eyebrow text-brass-deep">Something went quiet</p>
        <h1 className="mt-4 font-display text-5xl">This page didn&apos;t load.</h1>
        <p className="mt-4 text-muted-foreground">You can try again or return to the entrance.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="border border-obsidian bg-obsidian px-6 py-3 text-[11px] uppercase tracking-[0.28em] text-ivory transition-colors hover:bg-obsidian/85"
          >
            Try again
          </button>
          <a href="/" className="border border-obsidian/25 px-6 py-3 text-[11px] uppercase tracking-[0.28em] transition-colors hover:border-brass hover:text-brass">
            Return
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: `${SITE_NAME} — ${company.tagline}` },
      { name: "description", content: SITE_TAGLINE },
      { name: "author", content: SITE_NAME },
      { name: "theme-color", content: "#0E0D0B" },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:title", content: `${SITE_NAME} — ${company.tagline}` },
      { property: "og:description", content: SITE_TAGLINE },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Sri Suprabatham Builder — A Legacy, Composed in Stone" },
      { property: "og:title", content: "Sri Suprabatham Builder — A Legacy, Composed in Stone" },
      { name: "twitter:title", content: "Sri Suprabatham Builder — A Legacy, Composed in Stone" },
      { name: "description", content: "Enter the cinematic experience centre of Sri Suprabatham Builder — twenty-five years of boutique luxury residences in Chennai." },
      { property: "og:description", content: "Enter the cinematic experience centre of Sri Suprabatham Builder — twenty-five years of boutique luxury residences in Chennai." },
      { name: "twitter:description", content: "Enter the cinematic experience centre of Sri Suprabatham Builder — twenty-five years of boutique luxury residences in Chennai." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/ec4519d4-08c3-4735-9344-32e8b29a6244/id-preview-fe098eb9--31dc9f5b-3045-41f2-8ec2-8b0f3f2f4762.lovable.app-1784102260404.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/ec4519d4-08c3-4735-9344-32e8b29a6244/id-preview-fe098eb9--31dc9f5b-3045-41f2-8ec2-8b0f3f2f4762.lovable.app-1784102260404.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      // Fonts — Cormorant Garamond (display) + Karla (body). Loaded via <link> per Tailwind v4 rules.
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Karla:wght@300;400;500;600&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: SITE_NAME,
          foundingDate: `${company.since}`,
          description: SITE_TAGLINE,
          telephone: company.phones[0],
          email: company.email,
          address: {
            "@type": "PostalAddress",
            streetAddress: company.address,
            addressLocality: "Chennai",
            addressRegion: "TN",
            addressCountry: "IN",
          },
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Nav />
      <Cursor />
      <AudioHost />
      <main>
        <Outlet />
      </main>
      <SiteFooter />
    </QueryClientProvider>
  );
}

function SiteFooter() {
  return (
    <footer className="relative border-t border-obsidian/10 bg-ivory py-16 text-obsidian">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-6 md:grid-cols-12 lg:px-10">
        <div className="md:col-span-4">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center brass-frame bg-obsidian text-brass-glow" aria-hidden>
              <span className="font-display text-lg">S</span>
            </span>
            <span className="font-display text-xl">{SITE_NAME}</span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">{SITE_TAGLINE}</p>
        </div>
        <div className="md:col-span-3">
          <p className="eyebrow text-brass-deep">Address</p>
          <address className="mt-3 text-sm not-italic leading-relaxed text-obsidian">
            {company.address}
          </address>
        </div>
        <div className="md:col-span-3">
          <p className="eyebrow text-brass-deep">Contact</p>
          <ul className="mt-3 space-y-2 text-sm">
            {company.phones.map((p) => (
              <li key={p}><a href={`tel:${p.replace(/\s+/g, "")}`} className="hover:text-brass">{p}</a></li>
            ))}
            <li><a href={`mailto:${company.email}`} className="hover:text-brass">{company.email}</a></li>
          </ul>
        </div>
        <div className="md:col-span-2">
          <p className="eyebrow text-brass-deep">Follow</p>
          <ul className="mt-3 space-y-2 text-sm">
            {company.socials.map((s) => (
              <li key={s.label}><a href={s.href} className="hover:text-brass">{s.label}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-14 max-w-[1400px] border-t border-obsidian/10 px-6 pt-6 text-xs uppercase tracking-[0.28em] text-obsidian/50 lg:px-10">
        © {new Date().getFullYear()} {SITE_NAME}. Composed with restraint.
      </div>
    </footer>
  );
}
