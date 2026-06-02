/**
 * Unified async content access.
 * Demo: static sample data. Production: Payload CMS + PostgreSQL.
 */

import { useCms } from "@/lib/config";
import * as cms from "./cms";
import * as staticData from "./static";

export type { ContentSource } from "./types";

export function getContentSource(): "static-demo" | "cms-api" {
  return useCms ? "cms-api" : "static-demo";
}

export async function getDomains() {
  return useCms ? cms.fetchDomains() : staticData.domains;
}

export async function getDomain(slug: string) {
  return useCms ? cms.fetchDomain(slug) : staticData.getDomain(slug);
}

export async function getResearchers() {
  return useCms ? cms.fetchResearchers() : staticData.researchers;
}

export async function getResearcher(slug: string) {
  return useCms ? cms.fetchResearcher(slug) : staticData.getResearcher(slug);
}

export async function getResearchersByDomain(domainSlug: string) {
  return useCms
    ? cms.fetchResearchersByDomain(domainSlug)
    : staticData.researchersByDomain(domainSlug);
}

export async function getFacilities() {
  return useCms ? cms.fetchFacilities() : staticData.facilities;
}

export async function getFacility(slug: string) {
  return useCms ? cms.fetchFacility(slug) : staticData.getFacility(slug);
}

export async function getProjects() {
  return useCms ? cms.fetchProjects() : staticData.projects;
}

export async function getProject(id: string) {
  return useCms ? cms.fetchProject(id) : staticData.getProject(id);
}

export async function getPublications() {
  return useCms ? cms.fetchPublications() : staticData.publications;
}

export async function getPublication(id: string) {
  return useCms ? cms.fetchPublication(id) : staticData.getPublication(id);
}

export async function getPatents() {
  return useCms ? cms.fetchPatents() : staticData.patents;
}

export async function getPatent(id: string) {
  return useCms ? cms.fetchPatent(id) : staticData.getPatent(id);
}

export async function getConsultancyServices() {
  return useCms ? cms.fetchConsultancyServices() : staticData.consultancyServices;
}

export async function getNews() {
  return useCms ? cms.fetchNews() : staticData.news;
}

export async function getMetrics() {
  return useCms ? cms.fetchMetrics() : staticData.metrics;
}

export async function getCollaborationModels() {
  return useCms ? cms.fetchCollaborationModels() : staticData.collaborationModels;
}

export async function getPartnerCategories() {
  return useCms ? cms.fetchPartnerCategories() : staticData.partnerCategories;
}

export { cms };
