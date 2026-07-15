/**
 * Project data contract.
 *
 * Every project is a plain object matching this shape. Add a new project
 * by adding an entry to `projects.data.ts` — no component code changes.
 *
 * The optional slots (walkthrough360, vrScene, arModel, droneVideo,
 * progressUpdates, aiContext) are placeholders for future phases. Filling
 * them in later activates the corresponding routes without a refactor.
 */

export type ProjectStatus = "ready" | "ongoing" | "upcoming";

export interface AssetRef {
  /** Path or URL. Placeholder allowed; components render a marble fallback. */
  src: string;
  alt: string;
  /** Optional caption rendered under galleries. */
  caption?: string;
}

export interface FloorPlan {
  id: string;
  name: string;
  facing: string;
  area: string;
  bedrooms: number;
  units: string[];
  description?: string;
  image?: AssetRef;
}

export interface Amenity {
  id: string;
  title: string;
  description: string;
  /** Lucide icon name (rendered by the AmenityIcon component). */
  icon: string;
}

export interface SpecGroup {
  id: string;
  title: string;
  items: string[];
}

export interface LatLng {
  lat: number;
  lng: number;
  /** Human-readable address for meta and cards. */
  address: string;
}

export interface CityCoord {
  /** Grid position on the miniature city plinth (unitless, ~-6..6). */
  x: number;
  z: number;
  /** Building height factor. */
  height: number;
  /** Footprint width × depth. */
  width: number;
  depth: number;
  /** Optional rotation in radians. */
  rotationY?: number;
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  location: string;
  status: ProjectStatus;
  configuration: string;
  unitsCount: number;
  bhk: string;
  sizeRange: string;
  /** Short brand paragraph used across hero + og. */
  description: string;
  /** Longer overview essay. */
  overview: string;
  hero: AssetRef;
  gallery: AssetRef[];
  floorPlans: FloorPlan[];
  amenities: Amenity[];
  specs: SpecGroup[];
  quality: string[];
  location3d: LatLng;
  cityCoord: CityCoord;
  contact: {
    phones: string[];
    email: string;
    whatsapp: string;
  };
  /** Accent hue for this project's monolith (oklch string). Falls back to brass. */
  accent?: string;

  // ── Future phase slots (undefined today) ─────────────────────────────
  walkthrough360?: AssetRef;
  vrScene?: { url: string; poster?: string };
  arModel?: AssetRef;
  droneVideo?: { src: string; poster?: string };
  progressUpdates?: Array<{ date: string; title: string; note: string; images?: AssetRef[] }>;
  aiContext?: string;
}

export interface CompanyProfile {
  name: string;
  wordmarkTamil: string;
  tagline: string;
  since: number;
  legacyYears: number;
  phones: string[];
  email: string;
  whatsapp: string;
  address: string;
  socials: { label: string; href: string }[];
  founder: { name: string; role: string; portrait: AssetRef; quote: string; bio: string };
  managingDirector: { name: string; role: string; portrait: AssetRef; quote: string; bio: string };
  vision: string;
  mission: string;
  awards: { year: string; title: string; issuer: string }[];
  milestones: { year: string; title: string; note: string }[];
}
