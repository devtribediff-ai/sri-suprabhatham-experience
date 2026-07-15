/**
 * Sri Suprabhatham Builders — Content Layer
 *
 * Single source of truth for the entire experience. Every page reads from
 * this file. Add / edit projects here; components never change.
 *
 * Image paths under `/placeholders/*` are intentional. Drop a real file at
 * the same path (or point to a CDN) and it appears everywhere immediately.
 */

import type { CompanyProfile, Project } from "./projects.schema";

// ── Company ──────────────────────────────────────────────────────────────
export const company: CompanyProfile = {
  name: "Sri Suprabhatham Builders",
  wordmarkTamil: "ஸ்ரீ சுப்ரபாதம்",
  tagline: "Building Trust Since 2000",
  since: 2000,
  legacyYears: 25,
  phones: ["+91 99624 82979", "+91 91767 94005"],
  email: "srisuprabhathambuilders@gmail.com",
  whatsapp: "+919962482979",
  address: "No. 19/9, Thambiah Reddy Road, West Mambalam, Chennai",
  socials: [
    { label: "Instagram", href: "#" },
    { label: "YouTube", href: "#" },
    { label: "LinkedIn", href: "#" },
  ],
  founder: {
    name: "The Founder",
    role: "Founder & Chairman",
    portrait: { src: "/placeholders/founder.jpg", alt: "Founder portrait — replace with real photo" },
    quote:
      "A home is the quietest cathedral a family will ever build. Our craft is to make sure it lasts three generations.",
    bio: "Twenty-five years of quiet, uncompromising practice in Chennai's most storied neighbourhoods. Every stone laid under his watch.",
  },
  managingDirector: {
    name: "The Managing Director",
    role: "Managing Director",
    portrait: { src: "/placeholders/md.jpg", alt: "MD portrait — replace with real photo" },
    quote:
      "We are not building apartments. We are composing spaces that behave like your favourite room, on the day light falls best.",
    bio: "Leading the studio's next chapter — climate-responsive design, vastu-aligned planning, and residencies engineered for a quarter-century of grace.",
  },
  vision:
    "To be South India's most trusted signature of residential architecture — where every address becomes a family heirloom.",
  mission:
    "We design with restraint, engineer with rigour, and finish with obsession. Ten homes at a time. Never a hundred.",
  awards: [
    { year: "2024", title: "Excellence in Residential Craftsmanship", issuer: "Chennai Realty Guild" },
    { year: "2022", title: "Vastu Design of the Year", issuer: "South India Architects Council" },
    { year: "2019", title: "Trusted Developer — Boutique Segment", issuer: "TN Housing Board" },
    { year: "2015", title: "25-Year Structural Warranty Pioneer", issuer: "Builders Association" },
  ],
  milestones: [
    { year: "2000", title: "The First Foundation", note: "Sri Suprabhatham begins in West Mambalam with a single 4-unit residence." },
    { year: "2006", title: "Ten Addresses", note: "Ten completed projects across T. Nagar, Nanganallur and Adyar." },
    { year: "2012", title: "The Boutique Manifesto", note: "A vow: never more than 10 units per project. Ever." },
    { year: "2018", title: "The Second Generation", note: "Family-led continuation — same craft, sharper design language." },
    { year: "2022", title: "Vastu Design of the Year", note: "Recognised for climate + vastu-aligned residential planning." },
    { year: "2025", title: "Twenty-Five Years", note: "A quarter century. Over 400 families. Zero litigations." },
  ],
};

// ── Projects ─────────────────────────────────────────────────────────────
// The city plinth is roughly a 14×14 unit grid centred at 0. The
// `cityCoord` values are hand-placed to compose a small architectural
// vignette rather than a regular pattern.

export const projects: Project[] = [
  {
    slug: "mathura",
    name: "Mathura",
    tagline: "Serenity that Redefines Living",
    location: "Nanganallur, Chennai",
    status: "ongoing",
    configuration: "Stilt + 5 Floors",
    unitsCount: 10,
    bhk: "3 BHK",
    sizeRange: "1,775 – 1,866 sq.ft",
    description:
      "Ten premium 3 BHK residences composed for the limited few. Nanganallur, reimagined with the restraint of a private villa and the grammar of a boutique tower.",
    overview:
      "Mathura is a study in restraint. Ten north- and east-facing homes, each between 1,775 and 1,866 square feet, arranged over stilt and five floors. A 15-foot driveway, a private lift, and a foyer that treats arrival as an occasion. Every unit is climate-responsive — cross-ventilated across opposing façades, planned around Vastu-aligned circulation, and finished in a palette of soft neutrals and warm woods.",
    hero: { src: "/placeholders/mathura/hero.jpg", alt: "Mathura — architectural rendering (replace with real render)" },
    gallery: [
      { src: "/placeholders/mathura/foyer.jpg", alt: "Foyer — Mathura", caption: "The Foyer" },
      { src: "/placeholders/mathura/living.jpg", alt: "Living — Mathura", caption: "The Living" },
      { src: "/placeholders/mathura/bedroom.jpg", alt: "Bedroom — Mathura", caption: "The Bedroom" },
      { src: "/placeholders/mathura/kitchen.jpg", alt: "Kitchen — Mathura", caption: "The Kitchen" },
      { src: "/placeholders/mathura/puja.jpg", alt: "Puja — Mathura", caption: "The Puja" },
      { src: "/placeholders/mathura/palette.jpg", alt: "Material palette — Mathura", caption: "The Palette" },
    ],
    floorPlans: [
      {
        id: "north",
        name: "North Facing Residence",
        facing: "North",
        area: "1,866 sq.ft",
        bedrooms: 3,
        units: ["B1", "D1", "E1"],
        description:
          "Vastu-aligned circulation. Direct, clutter-free movement between zones. Bedroom privacy engineered through smooth spatial transitions.",
        image: { src: "/placeholders/mathura/plan-north.png", alt: "North facing floor plan" },
      },
      {
        id: "east",
        name: "East Facing Residence",
        facing: "East",
        area: "1,775 sq.ft",
        bedrooms: 3,
        units: ["B2", "C2", "D2", "E2"],
        description:
          "Morning light maximised. Cross-ventilation through aligned fenestrations on opposite façades. Integrated storage and climate-responsive planning.",
        image: { src: "/placeholders/mathura/plan-east.png", alt: "East facing floor plan" },
      },
    ],
    amenities: [
      { id: "vdp", title: "Video Door Phone", description: "Visual verification with seamless intercom — smart security at every arrival.", icon: "Video" },
      { id: "cctv", title: "CCTV Surveillance", description: "Round-the-clock monitoring across perimeter and common areas.", icon: "Cctv" },
      { id: "lift", title: "Private Lift", description: "5'6\" × 6'6\" cabin serving all floors.", icon: "MoveVertical" },
      { id: "drive", title: "15' Driveway", description: "Generous stilt-level driveway with dedicated entry & exit.", icon: "Route" },
      { id: "parking", title: "Covered Parking", description: "1' × 1' antiskid tiled bays for every residence.", icon: "SquareParking" },
      { id: "vastu", title: "Vastu Planning", description: "Every unit aligned with traditional principles and modern circulation.", icon: "Compass" },
    ],
    specs: [
      { id: "foundation", title: "Foundation", items: ["Earthquake-resistant RCC framed structure", "RCC columns tied by RCC plinth beam", "Basement height 3'"] },
      { id: "structure", title: "Superstructure", items: ["RCC framed structure — columns, beams, slabs", "Brick masonry & pillar walls", "Floor height 10' clear"] },
      { id: "doors", title: "Doors & Windows", items: ["Main door: solid teak 7' × 3'-3\" with 6-lever Godrej lock", "Teak frame, matte varnish finish"] },
      { id: "flooring", title: "Flooring", items: ["Balcony & kitchen: antiskid tile", "Toilets: antiskid ceramic tile", "4\" ceramic skirting", "Parking: 1'×1' antiskid tile"] },
      { id: "paint", title: "Paint", items: ["Interiors: Asian Ultima emulsion over 2-coat putty", "Exteriors: Asian ACE weather-shield or equivalent"] },
      { id: "terrace", title: "Terrace", items: ["3'6\" parapet wall in 4.5\" brickwork", "Waterproof + thermal-proof coat per IS 6494-1988"] },
      { id: "electrical", title: "Electrical", items: ["TV & telephone points across living / bedrooms", "5A / 15A circuits per specification", "Exhaust points in every toilet & utility"] },
    ],
    quality: [
      "Earthquake-resistant RCC framing",
      "10-foot clear floor heights",
      "Vastu-aligned unit planning",
      "Cross-ventilation across opposing façades",
      "Weather-shield exterior finishes",
      "IS-6494 compliant terrace thermal-proofing",
    ],
    location3d: {
      lat: 12.9788,
      lng: 80.1889,
      address: "Nanganallur, Chennai — 30-foot road access with entry & exit driveways",
    },
    cityCoord: { x: 0, z: 0, height: 3.4, width: 1.6, depth: 1.6, rotationY: 0.2 },
    contact: {
      phones: company.phones,
      email: company.email,
      whatsapp: company.whatsapp,
    },
    accent: "oklch(0.72 0.11 78)", // brass
    aiContext:
      "Mathura is a boutique 10-unit residential project in Nanganallur, Chennai. 3 BHK units, 1775–1866 sq.ft, stilt + 5 floors, RCC framed structure with 10-ft floor heights.",
  },
  {
    slug: "aadya",
    name: "Aadya",
    tagline: "The First Signature",
    location: "Chennai",
    status: "ready",
    configuration: "Stilt + 4 Floors",
    unitsCount: 8,
    bhk: "3 BHK",
    sizeRange: "Details on request",
    description:
      "The origin residence — a study in composed proportion and honest materials. Brochure available on request.",
    overview:
      "Full architectural narrative and floor plans arriving soon. Reach out to schedule a private walkthrough of the completed residence.",
    hero: { src: "/placeholders/aadya/hero.jpg", alt: "Aadya — architectural rendering (placeholder)" },
    gallery: [],
    floorPlans: [],
    amenities: [
      { id: "vdp", title: "Video Door Phone", description: "Smart entry security.", icon: "Video" },
      { id: "cctv", title: "CCTV Surveillance", description: "24×7 monitoring.", icon: "Cctv" },
      { id: "lift", title: "Private Lift", description: "Serving all floors.", icon: "MoveVertical" },
      { id: "vastu", title: "Vastu Planning", description: "Traditional principles, modern circulation.", icon: "Compass" },
    ],
    specs: [{ id: "foundation", title: "Foundation", items: ["RCC framed structure", "Earthquake-resistant design"] }],
    quality: ["RCC framing", "Vastu-aligned planning", "Weather-shield finishes"],
    location3d: { lat: 13.04, lng: 80.19, address: "Chennai" },
    cityCoord: { x: -3.6, z: -2.4, height: 2.4, width: 1.4, depth: 1.4, rotationY: -0.15 },
    contact: { phones: company.phones, email: company.email, whatsapp: company.whatsapp },
    accent: "oklch(0.7 0.09 60)",
  },
  {
    slug: "aastha",
    name: "Aastha",
    tagline: "Grace, at Home",
    location: "Chennai",
    status: "ready",
    configuration: "Stilt + 4 Floors",
    unitsCount: 9,
    bhk: "3 BHK",
    sizeRange: "Details on request",
    description:
      "A residence composed around quiet grace — proportion, light, and family circulation.",
    overview:
      "Full architectural narrative arriving soon. Contact our lounge to schedule a private tour.",
    hero: { src: "/placeholders/aastha/hero.jpg", alt: "Aastha — architectural rendering (placeholder)" },
    gallery: [],
    floorPlans: [],
    amenities: [
      { id: "vdp", title: "Video Door Phone", description: "Smart entry security.", icon: "Video" },
      { id: "cctv", title: "CCTV Surveillance", description: "24×7 monitoring.", icon: "Cctv" },
      { id: "lift", title: "Private Lift", description: "Serving all floors.", icon: "MoveVertical" },
    ],
    specs: [{ id: "foundation", title: "Foundation", items: ["RCC framed structure"] }],
    quality: ["RCC framing", "Vastu-aligned planning"],
    location3d: { lat: 13.03, lng: 80.21, address: "Chennai" },
    cityCoord: { x: 3.4, z: -2.2, height: 2.6, width: 1.4, depth: 1.4, rotationY: 0.1 },
    contact: { phones: company.phones, email: company.email, whatsapp: company.whatsapp },
    accent: "oklch(0.68 0.08 40)",
  },
  {
    slug: "ayodaya",
    name: "Ayodaya",
    tagline: "Where Legacy Rises",
    location: "Chennai",
    status: "ongoing",
    configuration: "Stilt + 5 Floors",
    unitsCount: 10,
    bhk: "3 BHK",
    sizeRange: "Details on request",
    description:
      "A residence named after the eternal city — patient, layered, timeless.",
    overview:
      "Full architectural narrative arriving soon. Contact our lounge to schedule a private tour.",
    hero: { src: "/placeholders/ayodaya/hero.jpg", alt: "Ayodaya — architectural rendering (placeholder)" },
    gallery: [],
    floorPlans: [],
    amenities: [
      { id: "vdp", title: "Video Door Phone", description: "Smart entry security.", icon: "Video" },
      { id: "cctv", title: "CCTV Surveillance", description: "24×7 monitoring.", icon: "Cctv" },
    ],
    specs: [{ id: "foundation", title: "Foundation", items: ["RCC framed structure"] }],
    quality: ["RCC framing", "Vastu-aligned planning"],
    location3d: { lat: 13.01, lng: 80.22, address: "Chennai" },
    cityCoord: { x: -3.4, z: 2.6, height: 3.0, width: 1.4, depth: 1.4, rotationY: 0.2 },
    contact: { phones: company.phones, email: company.email, whatsapp: company.whatsapp },
    accent: "oklch(0.66 0.11 30)",
  },
  {
    slug: "elite",
    name: "Elite",
    tagline: "The Collector's Address",
    location: "Chennai",
    status: "upcoming",
    configuration: "Stilt + 5 Floors",
    unitsCount: 10,
    bhk: "3 & 4 BHK",
    sizeRange: "Details on request",
    description:
      "The Elite collection — reserved for the studio's most exacting compositions.",
    overview:
      "Full architectural narrative arriving soon. Register your interest through the lounge.",
    hero: { src: "/placeholders/elite/hero.jpg", alt: "Elite — architectural rendering (placeholder)" },
    gallery: [],
    floorPlans: [],
    amenities: [
      { id: "vdp", title: "Video Door Phone", description: "Smart entry security.", icon: "Video" },
      { id: "cctv", title: "CCTV Surveillance", description: "24×7 monitoring.", icon: "Cctv" },
    ],
    specs: [{ id: "foundation", title: "Foundation", items: ["RCC framed structure"] }],
    quality: ["RCC framing", "Vastu-aligned planning"],
    location3d: { lat: 13.02, lng: 80.23, address: "Chennai" },
    cityCoord: { x: 3.6, z: 2.4, height: 3.6, width: 1.6, depth: 1.6, rotationY: -0.15 },
    contact: { phones: company.phones, email: company.email, whatsapp: company.whatsapp },
    accent: "oklch(0.78 0.14 88)",
  },
];

export const getProject = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);

export const projectSlugs = projects.map((p) => p.slug);
