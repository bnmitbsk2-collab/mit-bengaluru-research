import type { CollectionConfig } from "payload";
import { slugField, statusField } from "../fields/lifecycle";

export const Users: CollectionConfig = {
  slug: "users",
  auth: {
    tokenExpiration: 7200,
    verify: false,
  },
  admin: {
    useAsTitle: "email",
    defaultColumns: ["email", "name", "role", "department"],
  },
  fields: [
    { name: "name", type: "text", required: true },
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "faculty",
      options: [
        { label: "Super Admin", value: "super_admin" },
        { label: "Research Office Admin", value: "research_office" },
        { label: "Department Coordinator", value: "coordinator" },
        { label: "Faculty Contributor", value: "faculty" },
        { label: "Reviewer / Approver", value: "reviewer" },
      ],
    },
    {
      name: "department",
      type: "relationship",
      relationTo: "departments",
    },
  ],
};

export const Departments: CollectionConfig = {
  slug: "departments",
  admin: { useAsTitle: "name" },
  fields: [
    { name: "name", type: "text", required: true },
    slugField(),
    { name: "description", type: "textarea" },
    statusField,
  ],
};

export const ResearchAreas: CollectionConfig = {
  slug: "research-areas",
  admin: { useAsTitle: "title" },
  fields: [
    { name: "title", type: "text", required: true },
    slugField(),
    { name: "short", type: "text", required: true },
    { name: "summary", type: "textarea", required: true },
    {
      name: "description",
      type: "array",
      fields: [{ name: "paragraph", type: "textarea" }],
    },
    { name: "highlights", type: "json" },
    { name: "applications", type: "json" },
    { name: "icon", type: "text", required: true },
    { name: "sortOrder", type: "number", defaultValue: 0 },
    statusField,
  ],
};

export const Researchers: CollectionConfig = {
  slug: "researchers",
  admin: { useAsTitle: "name" },
  fields: [
    { name: "name", type: "text", required: true },
    slugField(),
    { name: "photo", type: "upload", relationTo: "media" },
    { name: "designation", type: "text", required: true },
    {
      name: "department",
      type: "relationship",
      relationTo: "departments",
      required: true,
    },
    {
      name: "domains",
      type: "relationship",
      relationTo: "research-areas",
      hasMany: true,
    },
    { name: "researchInterests", type: "json" },
    { name: "expertiseKeywords", type: "json" },
    { name: "consultancyAreas", type: "json" },
    { name: "collaborationInterests", type: "json" },
    { name: "email", type: "email", required: true },
    { name: "scholar", type: "text" },
    { name: "bio", type: "textarea", required: true },
    {
      name: "publications",
      type: "relationship",
      relationTo: "publications",
      hasMany: true,
    },
    {
      name: "patents",
      type: "relationship",
      relationTo: "patents",
      hasMany: true,
    },
    {
      name: "projects",
      type: "relationship",
      relationTo: "projects",
      hasMany: true,
    },
    {
      name: "owner",
      type: "relationship",
      relationTo: "users",
    },
    statusField,
  ],
};

export const Media: CollectionConfig = {
  slug: "media",
  upload: {
    staticDir: "media",
    mimeTypes: ["image/*", "application/pdf"],
  },
  fields: [{ name: "alt", type: "text" }],
};

export const Labs: CollectionConfig = {
  slug: "labs",
  admin: { useAsTitle: "name" },
  fields: [
    { name: "name", type: "text", required: true },
    slugField(),
    {
      name: "type",
      type: "select",
      required: true,
      options: [
        { label: "Centre", value: "Centre" },
        { label: "Laboratory", value: "Laboratory" },
        { label: "Facility", value: "Facility" },
      ],
    },
    {
      name: "domain",
      type: "relationship",
      relationTo: "research-areas",
      required: true,
    },
    { name: "short", type: "text", required: true },
    { name: "summary", type: "textarea", required: true },
    {
      name: "description",
      type: "array",
      fields: [{ name: "paragraph", type: "textarea" }],
    },
    { name: "capabilities", type: "json" },
    { name: "equipment", type: "json" },
    { name: "services", type: "json" },
    {
      name: "lead",
      type: "relationship",
      relationTo: "researchers",
    },
    {
      name: "department",
      type: "relationship",
      relationTo: "departments",
    },
    statusField,
  ],
};

export const Projects: CollectionConfig = {
  slug: "projects",
  admin: { useAsTitle: "title" },
  fields: [
    { name: "title", type: "text", required: true },
    slugField("slug"),
    {
      name: "pi",
      type: "relationship",
      relationTo: "researchers",
      required: true,
    },
    {
      name: "coInvestigators",
      type: "relationship",
      relationTo: "researchers",
      hasMany: true,
    },
    { name: "fundingAgency", type: "text", required: true },
    { name: "amountLakh", type: "number", required: true },
    {
      name: "projectStatus",
      type: "select",
      required: true,
      options: [
        { label: "Ongoing", value: "Ongoing" },
        { label: "Completed", value: "Completed" },
        { label: "Sanctioned", value: "Sanctioned" },
      ],
    },
    { name: "startYear", type: "number", required: true },
    { name: "endYear", type: "number", required: true },
    {
      name: "domain",
      type: "relationship",
      relationTo: "research-areas",
      required: true,
    },
    { name: "summary", type: "textarea", required: true },
    statusField,
  ],
};

export const Publications: CollectionConfig = {
  slug: "publications",
  admin: { useAsTitle: "title" },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "authors", type: "json", required: true },
    { name: "venue", type: "text", required: true },
    { name: "year", type: "number", required: true },
    {
      name: "pubType",
      type: "select",
      required: true,
      options: [
        { label: "Journal", value: "Journal" },
        { label: "Conference", value: "Conference" },
        { label: "Book Chapter", value: "Book Chapter" },
      ],
    },
    { name: "doi", type: "text" },
    {
      name: "domain",
      type: "relationship",
      relationTo: "research-areas",
    },
    statusField,
  ],
};

export const Patents: CollectionConfig = {
  slug: "patents",
  admin: { useAsTitle: "title" },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "inventors", type: "json", required: true },
    { name: "applicationNo", type: "text", required: true },
    {
      name: "patentStatus",
      type: "select",
      required: true,
      options: [
        { label: "Granted", value: "Granted" },
        { label: "Published", value: "Published" },
        { label: "Filed", value: "Filed" },
      ],
    },
    { name: "year", type: "number", required: true },
    {
      name: "domain",
      type: "relationship",
      relationTo: "research-areas",
    },
    statusField,
  ],
};

export const ConsultancyServices: CollectionConfig = {
  slug: "consultancy-services",
  admin: { useAsTitle: "title" },
  fields: [
    { name: "title", type: "text", required: true },
    slugField("slug"),
    { name: "icon", type: "text", required: true },
    { name: "description", type: "textarea", required: true },
    { name: "deliverables", type: "json" },
    {
      name: "department",
      type: "relationship",
      relationTo: "departments",
    },
    statusField,
  ],
};

export const NewsEvents: CollectionConfig = {
  slug: "news-events",
  admin: { useAsTitle: "title" },
  fields: [
    { name: "title", type: "text", required: true },
    slugField(),
    {
      name: "contentType",
      type: "select",
      required: true,
      options: [
        { label: "News", value: "News" },
        { label: "Event", value: "Event" },
        { label: "Announcement", value: "Announcement" },
      ],
    },
    { name: "date", type: "date", required: true },
    { name: "summary", type: "textarea", required: true },
    statusField,
  ],
};

export const ConsultancyEnquiries: CollectionConfig = {
  slug: "consultancy-enquiries",
  admin: {
    useAsTitle: "referenceNo",
    defaultColumns: ["referenceNo", "category", "name", "enquiryStatus", "createdAt"],
  },
  access: {
    create: () => true,
    read: ({ req }) => !!req.user,
  },
  fields: [
    { name: "referenceNo", type: "text", required: true, unique: true },
    { name: "category", type: "text", required: true },
    { name: "name", type: "text", required: true },
    { name: "role", type: "text" },
    { name: "organisation", type: "text", required: true },
    { name: "orgType", type: "text" },
    { name: "email", type: "email", required: true },
    { name: "phone", type: "text" },
    { name: "domain", type: "text" },
    { name: "expert", type: "text" },
    { name: "facility", type: "text" },
    { name: "timeline", type: "text" },
    { name: "message", type: "textarea", required: true },
    { name: "consent", type: "checkbox", required: true },
    {
      name: "enquiryStatus",
      type: "select",
      defaultValue: "new",
      options: [
        { label: "New", value: "new" },
        { label: "Routed", value: "routed" },
        { label: "In Discussion", value: "in_discussion" },
        { label: "Closed", value: "closed" },
        { label: "Spam", value: "spam" },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "routedOwner",
      type: "relationship",
      relationTo: "users",
    },
    { name: "internalNotes", type: "textarea" },
  ],
};

export const collections = [
  Users,
  Departments,
  ResearchAreas,
  Researchers,
  Media,
  Labs,
  Projects,
  Publications,
  Patents,
  ConsultancyServices,
  NewsEvents,
  ConsultancyEnquiries,
];
