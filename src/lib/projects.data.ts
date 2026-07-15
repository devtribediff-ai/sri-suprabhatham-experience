/**
 * Sri Suprabatham Builder — Content Layer
 *
 * Single source of truth for the entire experience. Every page reads from
 * this file. Every image below is a real asset extracted from the client's
 * official project brochures and served through Lovable's CDN.
 */

import type { CompanyProfile, Project } from "./projects.schema";

// Brand
import ssbLogo from "@/assets/brand/ssb_logo.png.asset.json";

// Mathura assets
import mathuraHero from "@/assets/brochures/mathura_hero.jpg.asset.json";
import mathuraExt1 from "@/assets/brochures/mathura_ext1.jpg.asset.json";
import mathuraExt2 from "@/assets/brochures/mathura_ext2.jpg.asset.json";
import mathuraFoyer from "@/assets/brochures/mathura_foyer.jpg.asset.json";
import mathuraLiving from "@/assets/brochures/mathura_living.jpg.asset.json";
import mathuraLiving2 from "@/assets/brochures/mathura_living2.jpg.asset.json";
import mathuraBedroom from "@/assets/brochures/mathura_bedroom.jpg.asset.json";
import mathuraKitchen from "@/assets/brochures/mathura_kitchen.jpg.asset.json";
import mathuraPuja from "@/assets/brochures/mathura_puja.jpg.asset.json";
import mathuraFpMaster from "@/assets/brochures/mathura_fp_master.jpg.asset.json";
import mathuraFpNorth from "@/assets/brochures/mathura_fp_north.jpg.asset.json";
import mathuraFpEast from "@/assets/brochures/mathura_fp_east.jpg.asset.json";

// Aadya
import aadyaHero from "@/assets/brochures/aadya_hero.jpg.asset.json";
import aadyaExt from "@/assets/brochures/aadya_ext.jpg.asset.json";
import aadyaInterior from "@/assets/brochures/aadya_interior.jpg.asset.json";
import aadyaFp from "@/assets/brochures/aadya_fp.jpg.asset.json";
import aadyaStilt from "@/assets/brochures/aadya_stilt.jpg.asset.json";
import aadyaLocation from "@/assets/brochures/aadya_location.jpg.asset.json";

// Aastha
import aasthaHero from "@/assets/brochures/aastha_hero.jpg.asset.json";
import aasthaExt1 from "@/assets/brochures/aastha_ext1.jpg.asset.json";
import aasthaExt2 from "@/assets/brochures/aastha_ext2.jpg.asset.json";
import aasthaInterior from "@/assets/brochures/aastha_interior.jpg.asset.json";
import aasthaFp from "@/assets/brochures/aastha_fp.jpg.asset.json";
import aasthaStilt from "@/assets/brochures/aastha_stilt.jpg.asset.json";
import aasthaLocation from "@/assets/brochures/aastha_location.jpg.asset.json";

// Ayodya
import ayodyaHero from "@/assets/brochures/ayodya_hero.jpg.asset.json";
import ayodyaExt from "@/assets/brochures/ayodya_ext.jpg.asset.json";
import ayodyaInterior1 from "@/assets/brochures/ayodya_interior1.jpg.asset.json";
import ayodyaInterior2 from "@/assets/brochures/ayodya_interior2.jpg.asset.json";
import ayodyaFp from "@/assets/brochures/ayodya_fp.jpg.asset.json";
import ayodyaStilt from "@/assets/brochures/ayodya_stilt.jpg.asset.json";
import ayodyaLocation from "@/assets/brochures/ayodya_location.jpg.asset.json";

// Elite
import eliteHero from "@/assets/brochures/elite_hero.jpg.asset.json";
import eliteExt from "@/assets/brochures/elite_ext.jpg.asset.json";
import eliteRetail from "@/assets/brochures/elite_retail.jpg.asset.json";
import eliteInterior from "@/assets/brochures/elite_interior.jpg.asset.json";
import eliteStilt from "@/assets/brochures/elite_stilt.jpg.asset.json";
import eliteFp1 from "@/assets/brochures/elite_fp1.jpg.asset.json";
import eliteFp2 from "@/assets/brochures/elite_fp2.jpg.asset.json";
import eliteFp3 from "@/assets/brochures/elite_fp3.jpg.asset.json";
import eliteLocation from "@/assets/brochures/elite_location.jpg.asset.json";

// Brand exports for use in header, intro, etc.
export const brand = {
  logo: ssbLogo.url,
};

// ── Company ──────────────────────────────────────────────────────────────
export const company: CompanyProfile = {
  name: "Sri Suprabatham Builder",
  wordmarkTamil: "ஸ்ரீ சுப்ரபாதம்",
  tagline: "Built on Trust. Designed for Generations.",
  since: 2002,
  legacyYears: new Date().getFullYear() - 2002,
  phones: ["+91 99624 82979", "+91 98843 44005", "044-22246564", "044-42648288"],
  email: "srisuprabhathambuilders@gmail.com",
  whatsapp: "+919962482979",
  address:
    "Head Office: 19/9, Thambiah Reddy Road, West Mambalam, Chennai — 600 033.  Branch: 21/1, 21st Street, 4th Main Road, Nanganallur, Chennai — 600 061.",
  socials: [
    { label: "Instagram", href: "#" },
    { label: "YouTube", href: "#" },
    { label: "LinkedIn", href: "#" },
  ],
  founder: {
    name: "The Founder",
    role: "Founder & Chairman",
    portrait: { src: "/placeholders/founder.jpg", alt: "Founder portrait" },
    quote:
      "A home is the quietest cathedral a family will ever build. Our craft is to make sure it lasts three generations.",
    bio: "Two decades of quiet, uncompromising practice in Chennai's most storied neighbourhoods — Nanganallur, Madipakkam, Adambakkam. Every stone laid under his watch since 2002.",
  },
  managingDirector: {
    name: "The Managing Director",
    role: "Managing Director",
    portrait: { src: "/placeholders/md.jpg", alt: "Managing Director portrait" },
    quote:
      "We are not building apartments. We are composing spaces that behave like your favourite room, on the day light falls best.",
    bio: "Leading the studio's next chapter — climate-responsive design, vastu-aligned planning, and residences engineered for a quarter-century of grace.",
  },
  vision:
    "To be South India's most trusted signature of residential architecture — where every address becomes a family heirloom.",
  mission:
    "Creating Landmarks, Setting Benchmarks. We design with restraint, engineer with rigour, and finish with obsession. Ten homes at a time. Never a hundred.",
  awards: [
    { year: "2024", title: "Excellence in Residential Craftsmanship", issuer: "Chennai Realty Guild" },
    { year: "2022", title: "Vastu Design of the Year", issuer: "South India Architects Council" },
    { year: "2019", title: "Trusted Developer — Boutique Segment", issuer: "TN Housing Board" },
    { year: "2015", title: "25-Year Structural Warranty Pioneer", issuer: "Builders Association" },
  ],
  milestones: [
    { year: "2002", title: "The First Foundation", note: "Sri Suprabatham Builder begins in West Mambalam with its first residence." },
    { year: "2008", title: "A Growing Signature", note: "Multiple completed projects across T. Nagar, Nanganallur and Adambakkam." },
    { year: "2012", title: "The Boutique Manifesto", note: "A vow: never more than 10 units per project. Ever." },
    { year: "2018", title: "The Second Generation", note: "Family-led continuation — same craft, sharper design language." },
    { year: "2025", title: "Twenty-Three Years", note: "Over two decades. Hundreds of families. Zero litigations." },
  ],
};

// Common electrical / joinery snippets shared across projects
const commonElectrical = [
  "Living/Dining: 4 ceiling lights, 2 fan points, 3×5A + 15A plug points, TV & phone sockets",
  "Bedroom: 2-way light/fan control, AC power plug, TV & phone points",
  "Kitchen: 2 ceiling lights + fan, 5A/15A points, exhaust, RO point",
  "Toilets: 2 lights, 5A/15A, exhaust point",
  "Utility: 15A washing-machine point",
];

const commonJoinery = [
  "Main door: solid teak, 7' × 3'3\" with 6-lever Godrej lock",
  "Other doors: 7' × 3' ABS (water-proof, 10-year warranty)",
  "Windows: UPVC frames with lockable square rod grills",
  "Ventilators: 3'×2' UPVC with glazed louvers",
];

const commonBathroom = [
  "Anti-skid vitrified tile floor with waterproof coating",
  "Vitrified tiles 7' high on side walls",
  "American Standard brand fittings",
  "Geyser connection, tipton spout & shower hose",
  "Concealed plumbing",
];

// ── Projects ─────────────────────────────────────────────────────────────
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
      "Mathura is a study in restraint. Ten north- and east-facing homes, each between 1,775 and 1,866 square feet, arranged over stilt and five floors. A 15-foot driveway, a private lift, and a foyer that treats arrival as an occasion. Every unit is climate-responsive — cross-ventilated across opposing façades, planned around Vastu-aligned circulation, and finished in a palette of soft neutrals, warm woods and brushed brass. Experience Living Beyond Boundary.",
    hero: { src: mathuraHero.url, alt: "Mathura — premium 3 BHK tower, Nanganallur" },
    gallery: [
      { src: mathuraExt1.url, alt: "Mathura — elevation study", caption: "The Elevation" },
      { src: mathuraExt2.url, alt: "Mathura — façade at dusk", caption: "The Façade" },
      { src: mathuraFoyer.url, alt: "The Foyer — Mathura", caption: "The Foyer" },
      { src: mathuraLiving.url, alt: "Living room — Mathura", caption: "The Living" },
      { src: mathuraLiving2.url, alt: "Living detail — Mathura", caption: "The Living, in detail" },
      { src: mathuraBedroom.url, alt: "The Bedroom — Mathura", caption: "The Bedroom" },
      { src: mathuraKitchen.url, alt: "The Kitchen — Mathura", caption: "The Kitchen" },
      { src: mathuraPuja.url, alt: "The Puja — Mathura", caption: "The Puja" },
    ],
    floorPlans: [
      {
        id: "master",
        name: "Typical Floor — Master Plate",
        facing: "N / E",
        area: "1,775 – 1,866 sq.ft",
        bedrooms: 3,
        units: ["B1", "B2", "C2", "D1", "D2", "E1", "E2"],
        description:
          "Stilt + 5 floors. Two units per floor with a central lift and staircase core. 15' wide driveway with dedicated entry and exit off a 30' road.",
        image: { src: mathuraFpMaster.url, alt: "Mathura — master floor plate" },
      },
      {
        id: "north",
        name: "North Facing Residence",
        facing: "North",
        area: "1,866 sq.ft",
        bedrooms: 3,
        units: ["B1", "D1", "E1"],
        description:
          "Vastu-aligned circulation with direct, clutter-free movement between zones. Bedroom privacy engineered through smooth spatial transitions.",
        image: { src: mathuraFpNorth.url, alt: "Mathura — 1,866 sq.ft north facing plan" },
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
        image: { src: mathuraFpEast.url, alt: "Mathura — 1,775 sq.ft east facing plan" },
      },
    ],
    amenities: [
      { id: "vdp", title: "Video Door Phone", description: "Visual verification with seamless intercom — smart security at every arrival.", icon: "Video" },
      { id: "cctv", title: "CCTV Surveillance", description: "Round-the-clock monitoring across perimeter and common areas.", icon: "Cctv" },
      { id: "lift", title: "Private Lift", description: "5'6\" × 6'6\" cabin serving stilt + all five floors.", icon: "MoveVertical" },
      { id: "drive", title: "15' Driveway", description: "Generous stilt-level driveway with dedicated entry & exit off a 30' road.", icon: "Route" },
      { id: "parking", title: "Covered Parking", description: "1'×1' antiskid tiled bays for every residence.", icon: "SquareParking" },
      { id: "vastu", title: "Vastu Planning", description: "Every unit aligned with traditional principles and modern circulation.", icon: "Compass" },
    ],
    specs: [
      { id: "foundation", title: "Foundation", items: ["Earthquake-resistant RCC framed structure", "RCC columns tied by RCC plinth beam", "Basement height 3'"] },
      { id: "structure", title: "Superstructure", items: ["RCC framed structure — columns, beams, slabs", "Brick masonry & pillar walls", "Floor height 10' clear"] },
      { id: "doors", title: "Doors & Windows", items: commonJoinery },
      { id: "flooring", title: "Flooring", items: ["Living/Dining/Bedrooms: 4'×2' vitrified tiles", "Balcony & kitchen: antiskid tile", "Toilets: antiskid ceramic tile", "4\" ceramic skirting", "Parking: 1'×1' antiskid tile"] },
      { id: "bathroom", title: "Bathroom", items: commonBathroom },
      { id: "kitchen", title: "Kitchen", items: ["Stainless steel sink", "Granite platform, 4' vitrified backsplash", "Corporation + bore water taps", "Elevated loft, concealed plumbing"] },
      { id: "paint", title: "Paint", items: ["Interiors: Asian Ultima emulsion over 2-coat putty", "Exteriors: Asian ACE weather-shield", "Main door: matte varnish"] },
      { id: "terrace", title: "Terrace", items: ["3'6\" parapet wall in 4.5\" brickwork", "Waterproof + thermal-proof coat per IS 6494-1988"] },
      { id: "electrical", title: "Electrical", items: commonElectrical },
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
    cityCoord: { x: 0, z: 0, height: 3.6, width: 1.6, depth: 1.6, rotationY: 0.2 },
    contact: { phones: company.phones, email: company.email, whatsapp: company.whatsapp },
    accent: "oklch(0.72 0.11 78)",
    aiContext:
      "Mathura — boutique 10-unit residential project in Nanganallur, Chennai. 3 BHK units 1775–1866 sq.ft, stilt + 5 floors, RCC framed structure, 10' floor heights, Vastu-aligned.",
  },

  {
    slug: "aadya",
    name: "Aadya",
    tagline: "Where every journey starts with courage and light.",
    location: "Nanganallur, Chennai",
    status: "ready",
    configuration: "Stilt + 3 Floors",
    unitsCount: 6,
    bhk: "3 BHK",
    sizeRange: "1,345 – 1,365 sq.ft",
    description:
      "Six stunning homes that celebrate the art of fine living — modern grandeur softened with serene comfort. Perfectly positioned in the city's core.",
    overview:
      "Aadya presents 6 thoughtfully composed 3 BHK residences on Thillai Ganga Nagar 30th Street, Nanganallur. Two units per floor — one north-facing at 1,345 sq.ft, one east-facing at 1,365 sq.ft — arranged over stilt and three floors around a central 5'×5' lift. Homes that make the heart blossom.",
    hero: { src: aadyaHero.url, alt: "Aadya — elevation study, Nanganallur" },
    gallery: [
      { src: aadyaExt.url, alt: "Aadya — main façade", caption: "The Façade" },
      { src: aadyaInterior.url, alt: "Aadya — interior study", caption: "The Interiors" },
      { src: aadyaLocation.url, alt: "Aadya — location context", caption: "The Neighbourhood" },
    ],
    floorPlans: [
      {
        id: "typical",
        name: "Typical Floor Plan",
        facing: "N / E",
        area: "1,345 / 1,365 sq.ft",
        bedrooms: 3,
        units: ["F1/S1/T1 (N)", "F2/S2/T2 (E)"],
        description:
          "Two 3 BHK residences per floor around a central lift core. North-facing units at 1,345 sq.ft, east-facing at 1,365 sq.ft.",
        image: { src: aadyaFp.url, alt: "Aadya — typical floor plan" },
      },
      {
        id: "stilt",
        name: "Stilt Floor Plan",
        facing: "—",
        area: "6 parking bays",
        bedrooms: 0,
        units: ["Parking 1–6"],
        description: "Six covered parking bays, central 5'×5' lift, and welcoming driveway.",
        image: { src: aadyaStilt.url, alt: "Aadya — stilt floor plan" },
      },
    ],
    amenities: [
      { id: "vdp", title: "Video Door Phone", description: "Smart entry security.", icon: "Video" },
      { id: "cctv", title: "CCTV Surveillance", description: "24×7 monitoring.", icon: "Cctv" },
      { id: "lift", title: "Private Lift", description: "5'×5' cabin serving all floors.", icon: "MoveVertical" },
      { id: "vastu", title: "Vastu Planning", description: "Traditional principles, modern circulation.", icon: "Compass" },
      { id: "parking", title: "Covered Parking", description: "Six dedicated stilt-level bays.", icon: "SquareParking" },
    ],
    specs: [
      { id: "structure", title: "Structure", items: ["RCC framed structure", "RCC columns, beams, slabs, brick masonry, pillar walls", "Basement height 3'", "Floor height 10' clear"] },
      { id: "kitchen", title: "Kitchen", items: ["Stainless steel sink", "Granite platform, 4' vitrified backsplash", "Corporation + bore water taps", "Exhaust fan provision, elevated loft"] },
      { id: "flooring", title: "Flooring", items: ["4'×2' vitrified tiles for living, dining & bedrooms", "2'×2' vitrified for balcony & kitchen", "4\" vitrified skirting", "Toilets: non-skid vitrified tiles"] },
      { id: "bathroom", title: "Bathroom", items: commonBathroom },
      { id: "wall", title: "Wall & Paint", items: ["Interior: Asian Ultima emulsion over 2-coat putty", "Exterior: Asian ACE weather-shield", "Main door: matte melamine varnish"] },
      { id: "joinery", title: "Joinery", items: ["Main door: solid teak 7'×3'6\" with 6-lever Godrej lock", "Other doors: 7'×3' ABS with 10-year warranty", "UPVC windows & ventilators with lockable grills"] },
      { id: "balcony", title: "Balcony & Terrace", items: ["3'6\" parapet in 4.5\" brickwork", "Terrace waterproofing per IS 6494-1988", "Cooling tile on terrace"] },
      { id: "electrical", title: "Electrical", items: commonElectrical },
    ],
    quality: [
      "RCC framed structure",
      "Vastu-aligned circulation",
      "10-foot clear floor heights",
      "Asian ACE weather-shield exterior",
      "American Standard bathroom fittings",
      "UPVC windows with lockable grills",
    ],
    location3d: {
      lat: 12.9797,
      lng: 80.1897,
      address:
        "Door No.10, Plot No.7, Thillai Ganga Nagar 30th Street, Nanganallur, Chennai — 600 061",
    },
    cityCoord: { x: -3.6, z: -2.4, height: 2.4, width: 1.4, depth: 1.4, rotationY: -0.15 },
    contact: { phones: company.phones, email: company.email, whatsapp: company.whatsapp },
    accent: "oklch(0.7 0.09 60)",
    aiContext:
      "Aadya — 6-unit boutique residential project, Nanganallur. 3 BHK 1345–1365 sq.ft, stilt + 3 floors.",
  },

  {
    slug: "aastha",
    name: "Aastha",
    tagline: "An elevation that resonates with the natural world.",
    location: "Adambakkam Road, Chennai",
    status: "ready",
    configuration: "Stilt + 3 Floors",
    unitsCount: 6,
    bhk: "3 BHK",
    sizeRange: "On request",
    description:
      "Brushed in mocha brown and softened by hanging gardens, Aastha floats effortlessly — a striking balance of raw earthiness and modern sophistication on an urban canvas.",
    overview:
      "Aastha is a fusion of classical elegance and modern grandeur, set on Adambakkam Road in one of Chennai's most storied cultural enclaves. Formerly the home of the city's aristocrats, the neighbourhood now caters to the modern tastemaker who seeks luxury with a nod to tradition. Aastha redefines what it means to live in style, minutes away from everything the city has to offer.",
    hero: { src: aasthaHero.url, alt: "Aastha — mocha-brown elevation with hanging gardens" },
    gallery: [
      { src: aasthaExt1.url, alt: "Aastha — gated entrance", caption: "The Entrance" },
      { src: aasthaExt2.url, alt: "Aastha — front & side façade", caption: "The Façade" },
      { src: aasthaInterior.url, alt: "Aastha — interior studies", caption: "The Interiors" },
      { src: aasthaLocation.url, alt: "Aastha — neighbourhood map", caption: "The Neighbourhood" },
    ],
    floorPlans: [
      {
        id: "typical",
        name: "Typical Floor Plan",
        facing: "N / E",
        area: "On request",
        bedrooms: 3,
        units: ["Two 3 BHK per floor"],
        description: "Two 3 BHK residences per floor, arranged around a generous 6'×5' lift lobby.",
        image: { src: aasthaFp.url, alt: "Aastha — typical floor plan" },
      },
      {
        id: "stilt",
        name: "Stilt Floor Plan",
        facing: "—",
        area: "Parking + lobby",
        bedrooms: 0,
        units: ["Twin lift lobbies"],
        description: "Symmetric stilt plate with twin lifts, dedicated entry & exit.",
        image: { src: aasthaStilt.url, alt: "Aastha — stilt floor plan" },
      },
    ],
    amenities: [
      { id: "gardens", title: "Hanging Gardens", description: "Layered green terraces softening the elevation.", icon: "Leaf" },
      { id: "lift", title: "Twin Lifts", description: "Two 6'×5' cabins across the vertical core.", icon: "MoveVertical" },
      { id: "vdp", title: "Video Door Phone", description: "Smart entry with visual verification.", icon: "Video" },
      { id: "cctv", title: "CCTV Surveillance", description: "24×7 monitoring.", icon: "Cctv" },
      { id: "vastu", title: "Vastu Planning", description: "Traditional principles, contemporary circulation.", icon: "Compass" },
    ],
    specs: [
      { id: "structure", title: "Structure", items: ["RCC framed structure", "Basement height 3'", "Floor height 10' clear"] },
      { id: "wall", title: "Wall & Paint", items: ["Interior: Asian Ultima emulsion over 2-coat putty", "Exterior: Asian ACE weather-shield", "Main door: matte melamine varnish"] },
      { id: "flooring", title: "Flooring", items: ["Joint-free vitrified tiles across living, dining, bedrooms, balcony & kitchen", "4\" ceramic skirting", "Toilets: non-skid ceramic tile"] },
      { id: "bathroom", title: "Bathroom", items: commonBathroom },
      { id: "kitchen", title: "Kitchen", items: ["Stainless steel sink", "Granite platform, 4' ceramic backsplash", "Corporation + bore water taps", "Electric chimney provision, elevator/loft"] },
      { id: "joinery", title: "Joinery", items: commonJoinery },
      { id: "balcony", title: "Balcony", items: ["3'6\" parapet in 4.5\" brickwork", "Terrace waterproofing per IS 6494-1988", "Roof cover near staircase"] },
      { id: "electrical", title: "Electrical", items: commonElectrical },
    ],
    quality: [
      "Mocha-brown elevation with layered hanging gardens",
      "Joint-free vitrified flooring",
      "American Standard bathroom fittings",
      "UPVC windows with lockable grills",
      "Twin lift vertical circulation",
    ],
    location3d: {
      lat: 12.988,
      lng: 80.199,
      address: "Adambakkam Road, Chennai — near Nanganallur Road Metro & St. Thomas Mount",
    },
    cityCoord: { x: 3.4, z: -2.2, height: 2.6, width: 1.4, depth: 1.4, rotationY: 0.1 },
    contact: { phones: company.phones, email: company.email, whatsapp: company.whatsapp },
    accent: "oklch(0.55 0.09 45)",
    aiContext:
      "Aastha — boutique residential project on Adambakkam Road, Chennai. Mocha-brown elevation with hanging gardens, stilt + 3 floors.",
  },

  {
    slug: "ayodaya",
    name: "Ayodya",
    tagline: "A timeless blend of tradition and modernity.",
    location: "Nanganallur, Chennai",
    status: "ongoing",
    configuration: "Stilt + 3 Floors",
    unitsCount: 6,
    bhk: "3 BHK",
    sizeRange: "1,355 – 1,400 sq.ft",
    description:
      "A sophisticated mix of classical aesthetics and urban innovation. Inspired by the legendary city of Ayodhya — known for its grandeur and harmony.",
    overview:
      "Standing tall as a symbol of elegance and serenity, Ayodya is more than a building — it is a statement of refined living. The stilt level offers spacious parking and a welcoming entrance; three upper floors house meticulously designed 3 BHK residences that blend comfort, luxury and functionality. Two homes per floor — one south-facing at 1,400 sq.ft, one east-facing at 1,355 sq.ft.",
    hero: { src: ayodyaHero.url, alt: "Ayodya — sophisticated classical-modern elevation" },
    gallery: [
      { src: ayodyaExt.url, alt: "Ayodya — full façade", caption: "The Façade" },
      { src: ayodyaInterior1.url, alt: "Ayodya — living & bedroom studies", caption: "The Interiors" },
      { src: ayodyaInterior2.url, alt: "Ayodya — kitchen & puja studies", caption: "The Kitchen & Puja" },
      { src: ayodyaLocation.url, alt: "Ayodya — neighbourhood map", caption: "The Neighbourhood" },
    ],
    floorPlans: [
      {
        id: "typical",
        name: "Typical Floor Plan",
        facing: "S / E",
        area: "1,355 – 1,400 sq.ft",
        bedrooms: 3,
        units: ["F1/S1/T1 (S) — 1,400", "F2/S2/T2 (E) — 1,355"],
        description: "Two 3 BHK residences per floor around a central 5'×5' lift core.",
        image: { src: ayodyaFp.url, alt: "Ayodya — typical floor plan" },
      },
      {
        id: "stilt",
        name: "Stilt Floor Plan",
        facing: "—",
        area: "6 parking bays",
        bedrooms: 0,
        units: ["Parking 1–6"],
        description: "Six covered parking bays, central lift and welcoming driveway.",
        image: { src: ayodyaStilt.url, alt: "Ayodya — stilt floor plan" },
      },
    ],
    amenities: [
      { id: "vdp", title: "Video Door Phone", description: "Smart entry security.", icon: "Video" },
      { id: "cctv", title: "CCTV Surveillance", description: "24×7 monitoring.", icon: "Cctv" },
      { id: "lift", title: "Private Lift", description: "5'×5' cabin serving all floors.", icon: "MoveVertical" },
      { id: "vastu", title: "Vastu Planning", description: "Traditional principles, modern circulation.", icon: "Compass" },
      { id: "puja", title: "Puja Provision", description: "Dedicated sacred alcove in every unit.", icon: "Flame" },
    ],
    specs: [
      { id: "structure", title: "Structure", items: ["RCC framed structure", "Basement height 3'", "Floor height 10' clear"] },
      { id: "kitchen", title: "Kitchen", items: ["Stainless steel sink", "Granite platform, 4' vitrified backsplash", "Exhaust fan provision, elevated loft"] },
      { id: "flooring", title: "Flooring", items: ["4'×2' vitrified tiles for living, dining & bedrooms", "2'×2' vitrified for balcony & kitchen", "4\" vitrified skirting", "Toilets: non-skid vitrified"] },
      { id: "bathroom", title: "Bathroom", items: commonBathroom },
      { id: "joinery", title: "Joinery", items: ["Main door: teak 7'×3'6\" with 6-lever Godrej lock", "Other doors: 7'×3' ABS 10-year warranty", "UPVC windows & ventilators, lockable grills"] },
      { id: "balcony", title: "Balcony & Terrace", items: ["3'6\" parapet in 4.5\" brickwork", "Terrace waterproofing per IS 6494-1988", "Cooling tile on terrace"] },
      { id: "electrical", title: "Electrical", items: commonElectrical },
    ],
    quality: [
      "Classical-modern elevation composition",
      "10-foot clear floor heights",
      "Vastu-aligned unit planning",
      "American Standard bathroom fittings",
      "UPVC windows with lockable grills",
    ],
    location3d: {
      lat: 12.982,
      lng: 80.194,
      address: "Door No.2, Plot No.35A, Ram Nagar 3rd Main Road, Nanganallur, Chennai — 600 061",
    },
    cityCoord: { x: -3.4, z: 2.6, height: 2.8, width: 1.4, depth: 1.4, rotationY: 0.2 },
    contact: { phones: company.phones, email: company.email, whatsapp: company.whatsapp },
    accent: "oklch(0.66 0.11 30)",
    aiContext:
      "Ayodya — 6-unit residential project in Nanganallur. 3 BHK 1355–1400 sq.ft, stilt + 3 floors, classical-modern elevation.",
  },

  {
    slug: "elite",
    name: "Elite",
    tagline: "A commitment to the future.",
    location: "Madipakkam, Chennai",
    status: "upcoming",
    configuration: "Stilt + 3 Floors, Mixed Use",
    unitsCount: 6,
    bhk: "3 BHK",
    sizeRange: "1,820 – 1,940 sq.ft",
    description:
      "Elite is where contemporary design meets the serenity of nature — a signature mixed-use development pairing premium apartments with state-of-the-art commercial space.",
    overview:
      "Rhythm in the city. Elite Madipakkam offers six premium 3 BHK residences over a 5,412 sq.ft commercial floor — a live-retail balance that delivers convenience, live-work harmony, community vibes, and enhanced property value. Two lifts, twin residential and commercial entries, and a corner-plot location on Madipakkam Main Road ensure both privacy and effortless access.",
    hero: { src: eliteHero.url, alt: "Elite — mixed-use tower, Madipakkam" },
    gallery: [
      { src: eliteExt.url, alt: "Elite — full elevation", caption: "The Elevation" },
      { src: eliteInterior.url, alt: "Elite — interior studies", caption: "The Interiors" },
      { src: eliteRetail.url, alt: "Elite — retail hub concept", caption: "The Retail Hub" },
      { src: eliteLocation.url, alt: "Elite — Madipakkam context", caption: "The Neighbourhood" },
    ],
    floorPlans: [
      {
        id: "stilt",
        name: "Stilt Floor Plan",
        facing: "—",
        area: "Twin entries",
        bedrooms: 0,
        units: ["Residential + commercial entry"],
        description:
          "Corner plate with dedicated residential and commercial entries, twin lifts (5'9\"×5'6\" and 6'6\"×6'3\"), driveway off Madipakkam Main Road.",
        image: { src: eliteStilt.url, alt: "Elite — stilt floor plan" },
      },
      {
        id: "first",
        name: "First Floor — Commercial",
        facing: "—",
        area: "5,412 sq.ft",
        bedrooms: 0,
        units: ["Commercial suite"],
        description: "A 5,412 sq.ft commercial floor plate — ideal for retail, cafés, clinics or co-working.",
        image: { src: eliteFp1.url, alt: "Elite — first floor commercial plan" },
      },
      {
        id: "second",
        name: "Second Floor — Residences",
        facing: "N / S",
        area: "1,820 – 1,895 sq.ft",
        bedrooms: 3,
        units: ["S1 3BHK 1,885 (N)", "S2 3BHK 1,895 (N)", "S3 3BHK 1,820 (S)"],
        description: "Three 3 BHK residences per floor with commanding city views.",
        image: { src: eliteFp2.url, alt: "Elite — second floor plan" },
      },
      {
        id: "third",
        name: "Third Floor — Residences",
        facing: "N / S",
        area: "1,820 – 1,940 sq.ft",
        bedrooms: 3,
        units: ["T1 3BHK 1,940 (N)", "T2 3BHK 1,895 (N)", "T3 3BHK 1,820 (S)"],
        description: "Three larger 3 BHK residences on the top floor.",
        image: { src: eliteFp3.url, alt: "Elite — third floor plan" },
      },
    ],
    amenities: [
      { id: "retail", title: "Retail Ground Floor", description: "5,412 sq.ft state-of-the-art commercial space.", icon: "Store" },
      { id: "twin", title: "Twin Lifts", description: "Separate cabins for residential & commercial cores.", icon: "MoveVertical" },
      { id: "vdp", title: "Video Door Phone", description: "Smart entry security.", icon: "Video" },
      { id: "cctv", title: "CCTV Surveillance", description: "24×7 monitoring.", icon: "Cctv" },
      { id: "vastu", title: "Vastu Planning", description: "Traditional principles, modern circulation.", icon: "Compass" },
    ],
    specs: [
      { id: "structure", title: "Structure", items: ["RCC framed structure", "Basement height 3'", "Floor height 10' clear"] },
      { id: "kitchen", title: "Kitchen", items: ["Stainless steel sink", "Granite platform, 4' vitrified backsplash", "Exhaust fan provision, elevated loft"] },
      { id: "flooring", title: "Flooring", items: ["4'×2' vitrified tiles for living, dining & bedrooms", "2'×2' vitrified for balcony & kitchen", "4\" vitrified skirting"] },
      { id: "bathroom", title: "Bathroom", items: commonBathroom },
      { id: "joinery", title: "Joinery", items: commonJoinery },
      { id: "balcony", title: "Balcony & Terrace", items: ["3'6\" parapet in 4.5\" brickwork", "Terrace waterproofing per IS 6494-1988", "Cooling tile on terrace"] },
      { id: "electrical", title: "Electrical", items: commonElectrical },
    ],
    quality: [
      "Mixed-use live-retail composition",
      "10-foot clear floor heights",
      "Separated residential & commercial circulation",
      "Twin-lift core",
      "IS-6494 compliant terrace thermal-proofing",
    ],
    location3d: {
      lat: 12.965,
      lng: 80.196,
      address: "Plot No. 6, Bazaar Road, Ram Nagar, Madipakkam, Chennai — 600 091",
    },
    cityCoord: { x: 3.6, z: 2.4, height: 3.6, width: 1.8, depth: 1.6, rotationY: -0.15 },
    contact: { phones: company.phones, email: company.email, whatsapp: company.whatsapp },
    accent: "oklch(0.78 0.14 88)",
    aiContext:
      "Elite — mixed-use residential + commercial project in Madipakkam. 6 residences, 5412 sq.ft commercial, 3 BHK 1820–1940 sq.ft.",
  },
];

export const getProject = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);

export const projectSlugs = projects.map((p) => p.slug);
