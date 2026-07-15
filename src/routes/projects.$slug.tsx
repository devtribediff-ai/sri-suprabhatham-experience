import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { Phone, MessageCircle, Calendar, FileDown, MapPin } from "lucide-react";
import { getProject, projectSlugs } from "@/lib/projects.data";
import { ProjectHero } from "@/components/project/ProjectHero";
import { ProjectOverview, ProjectGallery } from "@/components/project/ProjectOverview";
import { ProjectAmenities } from "@/components/project/ProjectAmenities";
import { ProjectFloorPlans } from "@/components/project/ProjectFloorPlans";
import { ProjectSpecs, ProjectQuality, ProjectLocation } from "@/components/project/ProjectMeta";
import { ConsultationLounge, type LoungeAction } from "@/components/lounge/ConsultationLounge";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Residence not found — Sri Suprabatham" }, { name: "robots", content: "noindex" }] };
    }
    const p = loaderData.project;
    return {
      meta: [
        { title: `${p.name} — ${p.tagline} · Sri Suprabatham` },
        { name: "description", content: p.description },
        { property: "og:title", content: `${p.name} — Sri Suprabatham` },
        { property: "og:description", content: p.description },
        { property: "og:type", content: "product" },
        { property: "og:url", content: `/projects/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/projects/${params.slug}` }],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Residence",
          name: p.name,
          description: p.description,
          numberOfRooms: p.bhk,
          address: {
            "@type": "PostalAddress",
            addressLocality: p.location,
            addressCountry: "IN",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: p.location3d.lat,
            longitude: p.location3d.lng,
          },
        }),
      }],
    };
  },
  notFoundComponent: () => (
    <div className="grid min-h-dvh place-items-center bg-ivory px-6 text-center text-obsidian">
      <div>
        <p className="eyebrow text-brass-deep">Residence unavailable</p>
        <h1 className="mt-4 font-display text-5xl">This project is not yet in the city.</h1>
        <Link to="/projects" className="mt-8 inline-block border border-obsidian/25 px-6 py-3 text-[11px] uppercase tracking-[0.28em] hover:border-brass hover:text-brass">
          Return to projects
        </Link>
      </div>
    </div>
  ),
  component: ProjectPage,
});

function ProjectPage() {
  const { project } = Route.useLoaderData();

  const waLink = `https://wa.me/${project.contact.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hello, I would like to know more about ${project.name}.`)}`;
  const telLink = `tel:${project.contact.phones[0].replace(/\s+/g, "")}`;
  const mailLink = `mailto:${project.contact.email}?subject=${encodeURIComponent(`Enquiry — ${project.name}`)}`;

  const actions: LoungeAction[] = [
    { id: "visit", title: "Book a Site Visit", hint: "Private walkthrough at the residence", primary: true, to: "/lounge", icon: <MapPin size={22} strokeWidth={1.25} /> },
    { id: "meeting", title: "Schedule a Meeting", hint: "Consult with our design lead", href: mailLink, icon: <Calendar size={22} strokeWidth={1.25} /> },
    { id: "whatsapp", title: "Chat on WhatsApp", hint: project.contact.whatsapp, href: waLink, icon: <MessageCircle size={22} strokeWidth={1.25} /> },
    { id: "call", title: "Call the Studio", hint: project.contact.phones[0], href: telLink, icon: <Phone size={22} strokeWidth={1.25} /> },
    { id: "brochure", title: "Request the Brochure", hint: "PDF via email", href: mailLink, icon: <FileDown size={22} strokeWidth={1.25} /> },
  ];

  return (
    <>
      <ProjectHero project={project} />
      <ProjectOverview project={project} />
      <ProjectGallery project={project} />
      <ProjectAmenities project={project} />
      <ProjectFloorPlans project={project} />
      <ProjectSpecs project={project} />
      <ProjectQuality project={project} />
      <ProjectLocation project={project} />
      <ConsultationLounge
        eyebrow="Book your visit"
        title={<>A quiet <span className="text-brass-gradient">consultation</span>.</>}
        subtitle="Choose a private walkthrough, or begin the conversation on WhatsApp. Every enquiry is met personally by the studio."
        project={project}
        actions={actions}
      />
    </>
  );
}

// Advertise concrete slugs to preloader / future SSG
export const validSlugs = projectSlugs;
