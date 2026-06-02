import type {
  CollaborationModel,
  ConsultancyService,
  Metric,
  NewsItem,
} from "@/lib/types";

export const metrics: Metric[] = [
  { value: "150+", label: "Active Researchers", detail: "Faculty and research staff across engineering disciplines" },
  { value: "₹42 Cr", label: "Sanctioned Research Funding", detail: "Cumulative funded research and consultancy value" },
  { value: "90+", label: "Sponsored Projects", detail: "Government, industry, and inter-institutional projects" },
  { value: "35+", label: "Patents Filed & Granted", detail: "Intellectual property generated from research" },
  { value: "20+", label: "Centres, Labs & Facilities", detail: "Specialised infrastructure for applied research" },
  { value: "60+", label: "Industry Collaborations", detail: "Active consultancy and R&D partnerships" },
];

export const consultancyServices: ConsultancyService[] = [
  {
    id: "c1",
    title: "Technical Advisory Services",
    icon: "advisory",
    description:
      "Structured advisory engagements drawing on faculty expertise to assess technology choices, review designs, and de-risk decisions.",
    deliverables: ["Technology assessment reports", "Design and architecture reviews", "Feasibility and roadmap studies"],
  },
  {
    id: "c2",
    title: "Faculty Expertise Engagement",
    icon: "expert",
    description:
      "Direct access to domain experts for short consultations, expert panels, or sustained advisory roles on technical problems.",
    deliverables: ["Expert consultations", "Technical review panels", "Long-term advisory retainers"],
  },
  {
    id: "c3",
    title: "Sponsored Research",
    icon: "research",
    description:
      "Collaborative research programmes funded by industry or agencies, scoped around defined outcomes and deliverables.",
    deliverables: ["Joint research proposals", "Milestone-based deliverables", "Co-developed IP arrangements"],
  },
  {
    id: "c4",
    title: "Product & Prototype Support",
    icon: "prototype",
    description:
      "Support for moving concepts toward working prototypes, including embedded, mechanical, and software development.",
    deliverables: ["Proof-of-concept prototypes", "Design and build support", "Technical documentation"],
  },
  {
    id: "c5",
    title: "Testing & Validation",
    icon: "test",
    description:
      "Independent testing, characterisation, and validation using institutional laboratory facilities and methodologies.",
    deliverables: ["Test plans and protocols", "Characterisation reports", "Independent validation studies"],
  },
  {
    id: "c6",
    title: "Executive Training, FDP & Workshops",
    icon: "training",
    description:
      "Custom training programmes, faculty development programmes, and workshops tailored to organisational needs.",
    deliverables: ["Custom curricula", "Hands-on workshops", "Certification-aligned programmes"],
  },
  {
    id: "c7",
    title: "Industry Problem-Statement Collaboration",
    icon: "problem",
    description:
      "Joint definition and solution of industry problem statements through student projects and faculty-led teams.",
    deliverables: ["Scoped problem statements", "Student / faculty project teams", "Solution prototypes"],
  },
  {
    id: "c8",
    title: "Facility & Lab Access",
    icon: "facility",
    description:
      "Scheduled access to specialised laboratories and equipment for testing, characterisation, and development.",
    deliverables: ["Equipment access scheduling", "Supervised facility use", "Usage and results reporting"],
  },
];

export const collaborationModels: CollaborationModel[] = [
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

export const partnerCategories: { title: string; examples: string }[] = [
  { title: "Industry & Enterprise", examples: "Manufacturing, IT, healthcare, energy, and mobility companies" },
  { title: "Government & Funding Agencies", examples: "SERB, DST, MeitY, MNRE, AICTE, and allied bodies" },
  { title: "Academic & Research Institutes", examples: "National and international universities and laboratories" },
  { title: "Startups & Incubators", examples: "Deep-tech startups and innovation ecosystems" },
];

export const news: NewsItem[] = [
  {
    id: "n1",
    slug: "serb-grant-explainable-ai",
    title: "SERB grant awarded for explainable AI in diagnostic imaging",
    date: "2026-05-18",
    type: "News",
    summary:
      "A multi-year project on interpretable deep learning for early detection has been sanctioned in collaboration with a partner hospital.",
  },
  {
    id: "n2",
    slug: "industry-roundtable-2026",
    title: "Industry roundtable on applied AI and automation",
    date: "2026-06-12",
    type: "Event",
    summary:
      "A half-day roundtable bringing together industry partners and faculty to scope collaborative problem statements.",
  },
  {
    id: "n3",
    slug: "cybersecurity-testbed-launch",
    title: "Industrial IoT security testbed inaugurated",
    date: "2026-04-29",
    type: "Announcement",
    summary:
      "The Cybersecurity & Digital Forensics Laboratory has commissioned an isolated testbed for OT and IoT security research.",
  },
  {
    id: "n4",
    slug: "fdp-edge-ai",
    title: "Faculty development programme on Edge AI",
    date: "2026-07-08",
    type: "Event",
    summary:
      "A hands-on FDP covering edge inference, embedded deployment, and IoT integration for academic and industry participants.",
  },
];
