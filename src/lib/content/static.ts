/** Re-exports of static demo data — used when PORTAL_MODE=demo or no DATABASE_URI */
export { domains, getDomain } from "@/data/domains";
export {
  researchers,
  getResearcher,
  researchersByDomain,
} from "@/data/researchers";
export { facilities, getFacility } from "@/data/facilities";
export { projects, getProject } from "@/data/projects";
export {
  publications,
  patents,
  getPublication,
  getPatent,
} from "@/data/publications";
export {
  metrics,
  consultancyServices,
  collaborationModels,
  partnerCategories,
  news,
} from "@/data/site";
