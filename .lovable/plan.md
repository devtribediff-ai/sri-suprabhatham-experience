# WebPlace — One Continuous Camera Journey

Not a redesign. A change to the *interaction model*: the visitor is a camera moving through one architectural world. Existing UI, data, brochure assets, palette and typography stay. What changes is how routes connect, how the camera moves, and how UI chrome behaves.

## Guiding rules (applied everywhere)

- No hard cuts. Every route change is masked by an in-world camera motion (dolly, door pass, terrace step-out, entrance fly-through, lounge dissolve).
- No stacked "sections". Each existing page becomes a *chapter* on a horizontally-choreographed, vertically-scrolled scene with pinned camera beats.
- Navigation chrome hides by default. It fades in only when the camera is idle > 2s, and dissolves the moment the visitor moves.
- No white flashes, no blank loaders. Route transitions are warm-black or brass-bloom veils driven by `framer-motion` `AnimatePresence` at the router level.
- Ambient audio is continuous across routes; only *layers* change per act (bell → hall reverb → city wind + birds → interior room tone → lounge strings).

## The five acts (mapping to existing routes)

```text
ACT 1  Arrival           →  /            (IntroScene)
ACT 2  Legacy Gallery    →  /lobby       (MarbleHall + lobby sections re-choreographed)
ACT 3  Discovery City    →  /projects    (MiniatureCity)
ACT 4  Residence Walk    →  /projects/$  (ProjectHero → Overview → … → Location)
ACT 5  Consultation      →  /lounge      (ConsultationLounge)
Coda   Outro             →  /outro       (already exists)
```

## Chapter-by-chapter changes

### Act 1 — Arrival
- Keep current IntroScene structure. Remove any visible skip link until phase ≥ 2; move it to a low-contrast corner glyph.
- The "Enter the Experience" button triggers `DoorGate` open → camera dolly bloom → route push to `/lobby`. The bloom veil is *owned by the router transition layer*, not the intro, so the veil persists across the route change and dissolves inside the marble hall. This is the single most important fix — today the veil unmounts with the intro.

### Act 2 — Legacy Gallery
- Convert `/lobby` from stacked sections into a single pinned scroll-scene using `framer-motion` `useScroll` on a tall outer container. Inner "rooms" (MarbleHall → Founder → Vision/Mission → Quality Promise → Awards → Legacy Timeline) translate horizontally as the visitor scrolls vertically, so it *feels like walking down a corridor*.
- Legacy Timeline becomes an engraved marble frieze along the corridor wall; each milestone lights up as it enters a center focus band (not on hover).
- At end of corridor: a terrace archway. Reaching it triggers a soft prompt "Step onto the terrace" → routes to `/projects` with a *step-out-to-daylight* transition (warm overexposure, not white).

### Act 3 — Discovery City
- Keep `MiniatureCity`. Remove card-like project labels; replace with subtle brass ground-plaques that only appear on proximity (cursor within N px).
- Hover on a building: windows illuminate (already), plus a subtle orchestral cue layer (`audio.ts` gains a per-building stinger), and camera slowly orbits via CSS transform on the city stage.
- Click: camera flies toward the building's entrance — a scale/translate on the city stage combined with a matched brass-door mask that grows to fill the viewport, then route to `/projects/$slug`. On the project page the same door mask *opens outward*, so the cut is invisible.

### Act 4 — Residence Walk
- The project page becomes a single guided walkthrough with pinned camera beats, not a scroll-stack. Order:
  Exterior arrival → Architectural reveal → Entrance → Living → Dining → Kitchen → Master → Children → Balcony → Amenities → Quality → Materials → Specs → Floor plans → Location → Lounge invite.
- Each beat uses one hero brochure image with Ken-Burns pan + parallax caption. Advance is driven by scroll, but *snap-progresses* one beat at a time (scroll-jack with escape hatch — respects reduced-motion and `prefers-reduced-motion`).
- Floor plans keep zoom lightbox; specifications ledger stays but restyled as an engraved plaque, not a card.
- Final beat "Consultation Lounge" is a marble doorway; clicking it fires the door-mask transition to `/lounge`.

### Act 5 — Consultation Lounge
- Restyle as a full-bleed marble room (already partway there). Remove any visible form on load. Show only the headline "Your next chapter begins here." and five brass actions: Book Private Visit, Meet Our Team, Download Brochure, WhatsApp, Call Now.
- Selecting an action reveals its interface *inside the lounge* (a brass-framed panel slides up on the marble table); no route change, no modal shell.
- A quiet "Return to the entrance" glyph in the corner routes back to `/` with a fade-to-black — this becomes the natural loop into the Outro.

## Global systems to add / upgrade

1. **Router transition layer** (`CinematicTransition.tsx`): replace current single-flash veil with a *pair* of motion layers — `enter` (brass bloom or warm black) and `exit` — orchestrated per source→destination pair via a small route-pair map in `src/lib/scene-progress.ts`. Ensures every transition is motivated.
2. **Continuous audio bus** (`src/lib/audio.ts` + `AudioHost.tsx`): keep a single `<audio>` element alive across routes; crossfade layer gains per act. Add per-building stingers for Act 3 hovers.
3. **Chrome auto-hide** (`Nav.tsx`): hide after 2s idle, reveal on pointer move or key. Keeps existing scroll-aware contrast logic.
4. **Reduced motion + escape hatch**: every scroll-jack, dolly, and mask honors `prefers-reduced-motion` — falls back to standard vertical scroll and simple fades.
5. **Scene progress store** (`scene-progress.ts`): tiny store tracking `{ act, beat }` so audio, chrome, and cursor can react without prop-drilling.

## Files touched

- Edit: `src/routes/__root.tsx` (transition layer wiring), `src/components/world/CinematicTransition.tsx` (pair layers, route-pair map), `src/components/ui/Nav.tsx` (idle hide), `src/components/ui/AudioHost.tsx` + `src/lib/audio.ts` (continuous bus, layers), `src/lib/scene-progress.ts` (store expansion), `src/components/cinematic/IntroScene.tsx` (hand off veil to router), `src/routes/lobby.tsx` + `MarbleHall.tsx` + `LegacyTimeline.tsx` + `FounderCard.tsx` + `VisionMission.tsx` + `QualityPromise.tsx` + `AwardsRibbon.tsx` (corridor choreography), `src/routes/projects.index.tsx` + `city/MiniatureCity.tsx` + `city/ProjectMonolith.tsx` (proximity plaques, orbit, door-mask launch), `src/routes/projects.$slug.tsx` + all `components/project/*` (beat-based walkthrough), `src/routes/lounge.tsx` + `lounge/ConsultationLounge.tsx` (in-room action reveals).
- New: `src/components/world/DoorMask.tsx` (shared mask used for city→project and project→lounge), `src/components/world/CorridorTrack.tsx` (horizontal pinned scroller for lobby), `src/components/project/WalkthroughBeat.tsx` (single beat primitive for Act 4), `src/lib/route-pairs.ts` (transition choreography map), `src/lib/scroll-snap.ts` (beat-snap helper with reduced-motion opt-out).
- Not touched: brand tokens, brochure data, palette, typography, existing brochure images, `Outro`, footer content, `sitemap`, SEO metadata.

## Out of scope
- No new copy, no rewriting brochure content.
- No real 3D (WebGL/Three) — the "city" and "camera" remain 2.5D CSS transforms + parallax, which is what already works.
- No new brand identity, no new palette, no new fonts.
- No auth, no CMS, no backend changes.

## Success check
Manual walkthrough after build: from `/` → click Enter → doors part → corridor scrolls horizontally → terrace step-out → hover a building (windows light, orbit) → click → door mask → residence walkthrough beats → final doorway → lounge → action reveal in-room → return glyph → outro. Zero visible page cuts, zero white flashes, chrome absent unless idle. Reduced-motion path verified via DevTools emulation.

Reply "go" and I'll build it.