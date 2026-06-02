import { getPayload, type Payload } from "payload";
import config from "@payload-config";
import type {
  ConsultancyService,
  Facility,
  NewsItem,
  Patent,
  Project,
  Publication,
  ResearchDomain,
  Researcher,
} from "@/lib/types";
import type { CollaborationModel, Metric } from "@/lib/types";

type RelDoc = { id: string; slug?: string; title?: string; name?: string } | string;

let payload: Payload | null = null;

async function db(): Promise<Payload> {
  if (!payload) payload = await getPayload({ config });
  return payload;
}

function idStr(v: string | number): string {
  return String(v);
}

function relId(v: RelDoc | null | undefined): string {
  if (!v) return "";
  return typeof v === "string" ? v : idStr(v.id);
}

function relSlug(v: RelDoc | null | undefined): string {
  if (!v || typeof v === "string") return "";
  return v.slug ?? "";
}

function relName(v: RelDoc | null | undefined): string {
  if (!v || typeof v === "string") return "";
  return v.name ?? v.title ?? "";
}

function arr(v: unknown): string[] {
  if (Array.isArray(v)) return v as string[];
  return [];
}

function paragraphs(v: unknown): string[] {
  if (!Array.isArray(v)) return [];
  return v.map((x: { paragraph?: string }) => x.paragraph ?? "").filter(Boolean);
}

export async function fetchDomains(): Promise<ResearchDomain[]> {
  const p = await db();
  const { docs } = await p.find({
    collection: "research-areas",
    where: { status: { equals: "published" } },
    sort: "sortOrder",
    limit: 100,
  });
  return docs.map((d) => ({
    id: idStr(d.id),
    slug: d.slug as string,
    title: d.title as string,
    short: d.short as string,
    summary: d.summary as string,
    description: paragraphs(d.description),
    highlights: arr(d.highlights),
    applications: arr(d.applications),
    icon: d.icon as string,
  }));
}

export async function fetchDomain(slug: string): Promise<ResearchDomain | undefined> {
  const all = await fetchDomains();
  return all.find((d) => d.slug === slug);
}

export async function fetchResearchers(): Promise<Researcher[]> {
  const p = await db();
  const { docs } = await p.find({
    collection: "researchers",
    where: { status: { equals: "published" } },
    depth: 2,
    limit: 200,
  });
  return docs.map((d) => mapResearcher(d as unknown as Record<string, unknown>));
}

function mapResearcher(d: Record<string, unknown>): Researcher {
  const domains = Array.isArray(d.domains)
    ? (d.domains as RelDoc[]).map(relSlug).filter(Boolean)
    : [];
  const pubs = Array.isArray(d.publications)
    ? (d.publications as RelDoc[]).map(relId).filter(Boolean)
    : [];
  const pats = Array.isArray(d.patents)
    ? (d.patents as RelDoc[]).map(relId).filter(Boolean)
    : [];
  const projs = Array.isArray(d.projects)
    ? (d.projects as RelDoc[]).map(relId).filter(Boolean)
    : [];
  const photo = d.photo as { url?: string } | string | null | undefined;
  const photoUrl =
    photo && typeof photo === "object" && photo.url ? photo.url : undefined;

  return {
    id: idStr(d.id as string | number),
    slug: d.slug as string,
    name: d.name as string,
    photo: photoUrl,
    designation: d.designation as string,
    department: relName(d.department as RelDoc) || "MIT Bengaluru",
    domains,
    researchInterests: arr(d.researchInterests),
    expertiseKeywords: arr(d.expertiseKeywords),
    publications: pubs,
    patents: pats,
    projects: projs,
    consultancyAreas: arr(d.consultancyAreas),
    collaborationInterests: arr(d.collaborationInterests),
    email: d.email as string,
    scholar: (d.scholar as string) || undefined,
    bio: d.bio as string,
  };
}

export async function fetchResearcher(slug: string): Promise<Researcher | undefined> {
  const p = await db();
  const { docs } = await p.find({
    collection: "researchers",
    where: {
      and: [{ slug: { equals: slug } }, { status: { equals: "published" } }],
    },
    depth: 2,
    limit: 1,
  });
  return docs[0] ? mapResearcher(docs[0] as Record<string, unknown>) : undefined;
}

export async function fetchResearchersByDomain(domainSlug: string): Promise<Researcher[]> {
  const all = await fetchResearchers();
  return all.filter((r) => r.domains.includes(domainSlug));
}

export async function fetchFacilities(): Promise<Facility[]> {
  const p = await db();
  const { docs } = await p.find({
    collection: "labs",
    where: { status: { equals: "published" } },
    depth: 2,
    limit: 100,
  });
  return docs.map((d) => ({
    id: idStr(d.id),
    slug: d.slug as string,
    name: d.name as string,
    type: d.type as Facility["type"],
    domain: relSlug(d.domain as RelDoc),
    short: d.short as string,
    summary: d.summary as string,
    description: paragraphs(d.description),
    capabilities: arr(d.capabilities),
    equipment: arr(d.equipment),
    services: arr(d.services),
    leadSlug: relSlug(d.lead as RelDoc) || undefined,
  }));
}

export async function fetchFacility(slug: string): Promise<Facility | undefined> {
  const all = await fetchFacilities();
  return all.find((f) => f.slug === slug);
}

export async function fetchProjects(): Promise<Project[]> {
  const p = await db();
  const { docs } = await p.find({
    collection: "projects",
    where: { status: { equals: "published" } },
    depth: 2,
    limit: 200,
  });
  return docs.map((d) => ({
    id: idStr(d.id),
    title: d.title as string,
    piSlug: relSlug(d.pi as RelDoc),
    coInvestigators: Array.isArray(d.coInvestigators)
      ? (d.coInvestigators as RelDoc[]).map(relSlug).filter(Boolean)
      : [],
    fundingAgency: d.fundingAgency as string,
    amountLakh: d.amountLakh as number,
    status: d.projectStatus as Project["status"],
    startYear: d.startYear as number,
    endYear: d.endYear as number,
    domain: relSlug(d.domain as RelDoc),
    summary: d.summary as string,
  }));
}

export async function fetchProject(id: string): Promise<Project | undefined> {
  const all = await fetchProjects();
  return all.find((p) => p.id === id);
}

export async function fetchPublications(): Promise<Publication[]> {
  const p = await db();
  const { docs } = await p.find({
    collection: "publications",
    where: { status: { equals: "published" } },
    depth: 1,
    limit: 500,
  });
  return docs.map((d) => ({
    id: idStr(d.id),
    title: d.title as string,
    authors: arr(d.authors),
    venue: d.venue as string,
    year: d.year as number,
    type: d.pubType as Publication["type"],
    doi: (d.doi as string) || undefined,
    domain: relSlug(d.domain as RelDoc),
  }));
}

export async function fetchPublication(id: string): Promise<Publication | undefined> {
  const all = await fetchPublications();
  return all.find((p) => p.id === id);
}

export async function fetchPatents(): Promise<Patent[]> {
  const p = await db();
  const { docs } = await p.find({
    collection: "patents",
    where: { status: { equals: "published" } },
    depth: 1,
    limit: 200,
  });
  return docs.map((d) => ({
    id: idStr(d.id),
    title: d.title as string,
    inventors: arr(d.inventors),
    applicationNo: d.applicationNo as string,
    status: d.patentStatus as Patent["status"],
    year: d.year as number,
    domain: relSlug(d.domain as RelDoc),
  }));
}

export async function fetchPatent(id: string): Promise<Patent | undefined> {
  const all = await fetchPatents();
  return all.find((p) => p.id === id);
}

export async function fetchConsultancyServices(): Promise<ConsultancyService[]> {
  const p = await db();
  const { docs } = await p.find({
    collection: "consultancy-services",
    where: { status: { equals: "published" } },
    limit: 50,
  });
  return docs.map((d) => ({
    id: idStr(d.id),
    title: d.title as string,
    icon: d.icon as string,
    description: d.description as string,
    deliverables: arr(d.deliverables),
  }));
}

export async function fetchNews(): Promise<NewsItem[]> {
  const p = await db();
  const { docs } = await p.find({
    collection: "news-events",
    where: { status: { equals: "published" } },
    sort: "-date",
    limit: 50,
  });
  return docs.map((d) => ({
    id: idStr(d.id),
    slug: d.slug as string,
    title: d.title as string,
    date: d.date as string,
    type: d.contentType as NewsItem["type"],
    summary: d.summary as string,
  }));
}

export async function fetchMetrics(): Promise<Metric[]> {
  const p = await db();
  const settings = await p.findGlobal({ slug: "site-settings" });
  const m = settings?.metrics;
  if (Array.isArray(m)) return m as Metric[];
  return [];
}

export async function fetchCollaborationModels(): Promise<CollaborationModel[]> {
  return staticModelsFallback;
}

export async function fetchPartnerCategories(): Promise<
  { title: string; examples: string }[]
> {
  return staticPartnersFallback;
}

const staticModelsFallback: CollaborationModel[] = [
  {
    title: "Sponsored Research Project",
    description:
      "A defined research programme funded by the partner, with milestones, deliverables, and agreed intellectual-property terms.",
    bestFor: "Industry and funding agencies pursuing applied research outcomes",
  },
  {
    title: "Consultancy Engagement",
    description:
      "Time-bound technical advisory, testing, or development work delivered by faculty and research staff.",
    bestFor: "Organisations needing expert input on a specific problem",
  },
  {
    title: "Joint Research & MoU",
    description:
      "A formal memorandum of understanding establishing ongoing collaboration, shared facilities, and joint supervision.",
    bestFor: "Academic and institutional partners seeking long-term collaboration",
  },
  {
    title: "Startup & Innovation Partnership",
    description:
      "Co-development, mentoring, and facility access for startups working on technology-intensive products.",
    bestFor: "Startups and innovation partners building deep-tech products",
  },
];

const staticPartnersFallback = [
  {
    title: "Industry & Enterprise",
    examples: "Manufacturing, IT, healthcare, energy, and mobility companies",
  },
  {
    title: "Government & Funding Agencies",
    examples: "SERB, DST, MeitY, MNRE, AICTE, and allied bodies",
  },
  {
    title: "Academic & Research Institutes",
    examples: "National and international universities and laboratories",
  },
  {
    title: "Startups & Incubators",
    examples: "Deep-tech startups and innovation ecosystems",
  },
];

export async function createConsultancyEnquiry(
  data: Record<string, unknown>,
): Promise<{ referenceNo: string }> {
  const p = await db();
  const doc = await p.create({
    collection: "consultancy-enquiries",
    data: data as never,
  });
  return { referenceNo: doc.referenceNo as string };
}
