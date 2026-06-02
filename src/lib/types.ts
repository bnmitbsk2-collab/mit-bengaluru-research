// Shared content types for the MIT Bengaluru Research & Consultancy portal.
// These mirror a future CMS / institutional database schema so content can be
// migrated from static files to an API with minimal component changes.

export interface ResearchDomain {
  id: string;
  slug: string;
  title: string;
  short: string;
  summary: string;
  description: string[];
  highlights: string[];
  applications: string[];
  icon: string; // key into the Icon component
}

export interface Researcher {
  id: string;
  slug: string;
  name: string;
  /** Optional path/URL to a headshot in /public (e.g. "/researchers/ananya-rao.jpg").
   *  When omitted, an initials avatar is rendered as a graceful fallback. */
  photo?: string;
  designation: string;
  department: string;
  domains: string[]; // domain slugs
  researchInterests: string[];
  expertiseKeywords: string[];
  publications: string[]; // publication ids
  patents: string[]; // patent ids
  projects: string[]; // project ids
  consultancyAreas: string[];
  collaborationInterests: string[];
  email: string;
  scholar?: string;
  bio: string;
}

export type FacilityType = "Centre" | "Laboratory" | "Facility";

export interface Facility {
  id: string;
  slug: string;
  name: string;
  type: FacilityType;
  domain: string; // domain slug
  short: string;
  summary: string;
  description: string[];
  capabilities: string[];
  equipment: string[];
  services: string[];
  leadSlug?: string; // researcher slug
}

export type ProjectStatus = "Ongoing" | "Completed" | "Sanctioned";

export interface Project {
  id: string;
  title: string;
  piSlug: string;
  coInvestigators: string[];
  fundingAgency: string;
  amountLakh: number;
  status: ProjectStatus;
  startYear: number;
  endYear: number;
  domain: string; // domain slug
  summary: string;
}

export type PublicationType = "Journal" | "Conference" | "Book Chapter" | "Patent";

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  type: Exclude<PublicationType, "Patent">;
  doi?: string;
  domain: string;
}

export interface Patent {
  id: string;
  title: string;
  inventors: string[];
  applicationNo: string;
  status: "Granted" | "Published" | "Filed";
  year: number;
  domain: string;
}

export interface ConsultancyService {
  id: string;
  title: string;
  icon: string;
  description: string;
  deliverables: string[];
}

export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  date: string; // ISO
  type: "News" | "Event" | "Announcement";
  summary: string;
}

export interface Metric {
  value: string;
  label: string;
  detail: string;
}

export interface CollaborationModel {
  title: string;
  description: string;
  bestFor: string;
}
