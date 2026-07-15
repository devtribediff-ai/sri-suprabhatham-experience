## Goal

Refine the existing build into one continuous cinematic film. No UI redesign, no brand changes — only narrative, motion, environmental, and readability upgrades. All refinements stay data-driven and preserve the existing component architecture.

## Scope (11 refinements)

### 1. Cinematic opening — `IntroScene.tsx` + new `ChakraMark.tsx` + `audio.ts`
Extend the timeline to a scored sequence:
- 0.0s black
- 0.8s ambient orchestral pad starts (existing AudioHost)
- 1.2s single temple-bell strike (new short SFX, ElevenLabs or lightweight synth via WebAudio)
- 1.6s Vishnu Chakra emerges (SVG, slow rotation + brass glow) — new component
- 2.8s SSB logo cross-fades in below the chakra
- 3.8s "Building Trust Since 2002" hairline
- 4.6s tagline
- 5.6s brass doors (existing `DoorGate`) become visible closed
- 6.4s "Enter the Experience" CTA
- On click: doors part → camera dolly-in (existing) → route to `/lobby`

### 2. Lobby as marble museum — `lobby.tsx` + existing lobby components
Re-sequence the lobby into scroll-driven "rooms" with scroll-linked camera feel (parallax + section pinning via existing framer-motion `useScroll`):
1. MarbleHall (arrival)
2. FounderCard — Founder
3. FounderCard — Managing Director
4. LegacyTimeline (engraved brass rail — see #10)
5. QualityPromise (new small component, reuses `GlassCard`)
6. VisionMission
7. AwardsRibbon
Each section fades/rises as it enters; a persistent hairline "gallery progress" indicator on the right.

### 3. Environmental city — `MiniatureCity.tsx` + new world layers
Add ground plane detail so monoliths sit in a world:
- Road ribbons (thin dark strips radiating out) via instanced meshes
- Denser `TreeCluster` bands + a few taller cypress silhouettes
- Reflection pool (already present) — deepen with subtle ripple normal
- Volumetric fog (scene.fog exists — tune density + add ground haze plane)
- Moving cloud sprites overhead (translucent planes drifting)
- Existing `BirdsLayer` — port to 3D as sprite flock (or keep DOM overlay on top of canvas)
- Warm directional sunrise light (already present — retune color + shadow softness)
- Landscaped garden ring (low green disks between trees)

### 4. Camera choreography — continuous flight between routes
Introduce shared "flight veil" transitions:
- New `CinematicTransition` provider in `__root.tsx` — on route change, cross-fade through a warm bloom + subtle motion-blur veil (~800ms) so cuts read as one drone flight.
- Intro → Lobby: use existing dolly-in bloom (already implemented)
- Lobby → City: fade to warm sky, city fades up (already partial — extend duration)
- City → Project: existing fly-to-monolith → keep, add bloom bridge
- Project → Lounge: doors-close-style veil

### 5. Project pages — `projects.$slug.tsx` + `ProjectHero.tsx` + `ProjectFloorPlans.tsx` + `ProjectAmenities.tsx`
- Hero: animated Ken-Burns pan on the brochure hero image + parallax overlay of location + specs
- Layered parallax between hero, overview, gallery
- Gallery: replace grid pop with smooth horizontal drift + framer `AnimatePresence`
- Specifications: elegant two-column typographic ledger (already close — tighten spacing, add hairlines)
- Floor plans: fade + subtle scale/rotate reveal on scroll; add zoom-on-click lightbox
- Global: enable smooth scrolling behavior for immersive feel

### 6. Nav readability — `Nav.tsx`
Auto-invert nav text based on scroll position/route:
- Track `window.scrollY` + current route
- On dark hero sections (intro, city, project hero) → ivory text
- On marble/light lobby sections → obsidian text
- Add a very soft backdrop-blur pill behind the nav that fades in past 40px scroll to guarantee contrast at all times

### 7. Consultation lounge — `ConsultationLounge.tsx`
Restyle (not redesign) into a "room":
- Full-bleed marble backdrop with brass sconce gradients (reuse `MarbleHall` motifs)
- Centerpiece: a "consultation table" card — brass-framed, holds the CTA row (Book Site Visit / Schedule Meeting / WhatsApp / Call / Brochure) as engraved buttons
- Warm-lit vignette + dust motes
- Founder signature line at the bottom

### 8. Environmental life — new/updated world components
- `WindLayer` — subtle CSS transform sway on any element marked `data-sway`
- Extend `BirdsLayer` with parallax drift
- `GodRays` component (radial gradient shafts, additive blend) placed in intro + lounge
- `FogBands` — low horizontal gradient bands drifting across hero sections
- Reuse existing `DustField` more widely (lobby, lounge, project hero)

### 9. Founder museum — `FounderCard.tsx`
Upgrade the two founder cards into portrait "plinths":
- Portrait in a brass-framed arch (CSS mask)
- Engraved name plate below
- Quote pull-out in serif italic
- Slow reveal on scroll (blur → sharp)

### 10. Engraved brass legacy timeline — `LegacyTimeline.tsx`
Redo as a horizontal brass rail with engraved year markers:
- Thin brass line spanning full width
- Year ticks with serif numerals
- Each milestone reveals its label + micro-render on scroll
- Sticky/pinned while user scrolls its section (framer-motion `useScroll`)

### 11. Cinematic outro — new `/outro` route + `OutroScene.tsx`
Reached from a "Conclude the Journey" link in the lounge:
- Camera pulls back from the city (still image + slow zoom-out)
- Sky transitions from warm noon → sunset gradient
- SSB logo fades in
- "Built on Trust. Designed for Generations."
- Fade to black
- Small "Return to the Lobby" hairline link

## Technical details

- No new heavy deps. Use existing `framer-motion`, `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`.
- Temple bell: bundle a small MP3 to `src/assets/audio/bell.mp3` (placeholder note left for user to replace).
- Vishnu Chakra: pure SVG so it scales crisply and animates cheaply.
- Reduced-motion path preserved — all new motion respects `useReducedMotionPreference`.
- All copy stays data-driven via `projects.data.ts` and `company` object.
- Nav contrast: driven by `useLocation` + `scrollY` listener; no per-page prop drilling.
- Route transitions live in `__root.tsx` wrapper — no page code changes required.
- Add `/outro` as a new file `src/routes/outro.tsx`.
- Update `mem://index.md` with narrative act structure.

## Out of scope

- Real founder photos, videos, drone footage → placeholders remain, user swaps assets.
- 360°/VR/AR — future phases.
- Any brand color, logo, or typography changes.

## Deliverables

- Updated: `IntroScene.tsx`, `Nav.tsx`, `MiniatureCity.tsx`, `MarbleHall.tsx`, `LegacyTimeline.tsx`, `FounderCard.tsx`, `ConsultationLounge.tsx`, `ProjectHero.tsx`, `ProjectFloorPlans.tsx`, `projects.$slug.tsx`, `lobby.tsx`, `lounge.tsx`, `__root.tsx`, `styles.css`, `audio.ts`.
- New: `ChakraMark.tsx`, `QualityPromise.tsx`, `CinematicTransition.tsx`, `GodRays.tsx`, `FogBands.tsx`, `WindLayer.tsx`, `OutroScene.tsx`, `routes/outro.tsx`, `assets/audio/bell.mp3` (placeholder).

After implementation I'll verify with a Playwright pass across intro → lobby → city → project → lounge → outro and screenshot each transition.
