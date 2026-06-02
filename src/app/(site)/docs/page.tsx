import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/icon";
import { PageHeader, SectionHeading } from "@/components/ui";
import { portalConfig, isDemo } from "@/lib/config";

export const metadata: Metadata = {
  title: "Implementation Blueprint",
  description:
    "Architecture blueprint, feature matrix, admin modules, database schema, and development roadmap for the MIT Bengaluru Research & Consultancy portal.",
};

const docLinks = [
  {
    title: "Implementation Blueprint",
    file: "IMPLEMENTATION-BLUEPRINT.md",
    desc: "System architecture, demo vs production modes, deployment, cutover checklist.",
  },
  {
    title: "Feature Priority Matrix",
    file: "FEATURE-PRIORITY-MATRIX.md",
    desc: "MoSCoW priorities, impact/effort quadrant, phase sequencing.",
  },
  {
    title: "Admin Module List",
    file: "ADMIN-MODULES.md",
    desc: "15 CMS modules, screens, roles, workflows, notifications.",
  },
  {
    title: "Database Schema",
    file: "DATABASE-SCHEMA.md",
    desc: "25+ tables, fields, relationships, search indexes.",
  },
  {
    title: "Development Roadmap",
    file: "DEVELOPMENT-ROADMAP.md",
    desc: "Sprint plan for designers and developers, Phase 0–2.",
  },
  {
    title: "Demo → Production Guide",
    file: "DEMO-TO-PRODUCTION.md",
    desc: "Free Vercel deploy now; switch to real data after director approval.",
  },
];

const phases = [
  {
    phase: "Phase 0 — Demo (now)",
    status: "Complete",
    items: [
      "Public portal with sample data",
      "Enquiry API + reference numbers",
      "PDF brochures",
      "Free Vercel deployment",
      "Demo banner for director review",
    ],
  },
  {
    phase: "Phase 1 — Production (post-approval)",
    status: "Planned · 10–12 weeks",
    items: [
      "Payload CMS + PostgreSQL",
      "SSO + 6 role types",
      "Draft → Review → Publish workflow",
      "Real faculty/project data import",
      "Enquiry routing to CMS + email",
      "Postgres full-text search",
    ],
  },
  {
    phase: "Phase 2 — Advanced",
    status: "Planned · +3–6 months",
    items: [
      "Typesense semantic search",
      "Grounded RAG assistant",
      "AI enquiry classification",
      "Analytics dashboard",
      "ORCID/DOI import assist",
    ],
  },
];

const adminModules = [
  "Dashboard & review queue",
  "Users & roles (SSO)",
  "Departments & organisation",
  "Researchers (workflow)",
  "Research areas",
  "Labs & facilities",
  "Projects & grants",
  "Publications & patents",
  "Consultancy services",
  "Enquiry CRM inbox",
  "Collaborations / MoUs",
  "News & events",
  "Documents library",
  "Site settings & audit log",
];

const tables = [
  "users, roles",
  "departments, schools_units",
  "researchers, researcher_areas",
  "research_areas",
  "labs, facilities",
  "projects, project_researchers",
  "grants, funding_agencies",
  "publications, publication_researchers",
  "patents, patent_researchers",
  "consultancy_services",
  "consultancy_enquiries",
  "collaborations",
  "news_events",
  "documents",
  "contact_enquiries",
  "audit_log, site_settings",
];

export default function DocsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Implementation Blueprint"
        title="Future-ready platform plan"
        intro="This page summarises the architecture, priorities, admin design, database schema, and roadmap for moving from the current demo portal to a governed production platform with real institutional data — after director approval."
      />

      {/* Current mode banner */}
      <section className="container-prose py-8">
        <div
          className={`rounded-lg border p-5 ${
            isDemo
              ? "border-amber-200 bg-amber-50 text-amber-900"
              : "border-green-200 bg-green-50 text-green-900"
          }`}
        >
          <p className="font-semibold">
            Current mode:{" "}
            <span className="uppercase">{portalConfig.mode}</span>
          </p>
          <p className="mt-1 text-sm">
            {isDemo
              ? "Sample data from src/data/*. Enquiries logged locally. Deploy free on Vercel for director review."
              : "Connected to CMS. Real institutional data. Demo banner hidden."}
          </p>
        </div>
      </section>

      {/* 1. Executive recommendation */}
      <section className="container-prose border-t border-ink-100 py-14">
        <SectionHeading
          eyebrow="1. Executive Recommendation"
          title="Headless CMS + PostgreSQL + Next.js"
        />
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-ink-100 bg-white p-6">
            <h3 className="font-serif text-lg font-semibold text-ink-900">
              Demo (now)
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-ink-600">
              <li className="flex gap-2">
                <Icon name="check" size={16} className="mt-0.5 shrink-0 text-accent-600" />
                Next.js frontend — built and deployed
              </li>
              <li className="flex gap-2">
                <Icon name="check" size={16} className="mt-0.5 shrink-0 text-accent-600" />
                Sample data via @/lib/content
              </li>
              <li className="flex gap-2">
                <Icon name="check" size={16} className="mt-0.5 shrink-0 text-accent-600" />
                No database · no admin · zero cost
              </li>
            </ul>
          </div>
          <div className="rounded-lg border border-ink-100 bg-sand-50 p-6">
            <h3 className="font-serif text-lg font-semibold text-ink-900">
              Production (after approval)
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-ink-600">
              <li className="flex gap-2">
                <Icon name="arrow" size={16} className="mt-0.5 shrink-0 text-accent-600" />
                Same Next.js frontend
              </li>
              <li className="flex gap-2">
                <Icon name="arrow" size={16} className="mt-0.5 shrink-0 text-accent-600" />
                Payload CMS + PostgreSQL
              </li>
              <li className="flex gap-2">
                <Icon name="arrow" size={16} className="mt-0.5 shrink-0 text-accent-600" />
                SSO · workflow · real data · enquiry CRM
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 2–3 Database & login */}
      <section className="container-prose border-t border-ink-100 py-14">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="2. Database"
              title="Yes — PostgreSQL required for production"
            />
            <p className="mt-4 text-sm leading-relaxed text-ink-600">
              25+ related entities (researchers, projects, publications, enquiries)
              need relational storage, full-text search, and audit trails. Demo mode
              uses static files; production uses PostgreSQL via Payload CMS.
            </p>
          </div>
          <div>
            <SectionHeading
              eyebrow="3. Admin login"
              title="Yes — SSO + 6 roles"
            />
            <p className="mt-4 text-sm leading-relaxed text-ink-600">
              Super Admin · Research Office Admin · Department Coordinator · Faculty
              Contributor · Reviewer · Public User. Faculty draft content; coordinators
              review; research office publishes. No self-publish for faculty.
            </p>
          </div>
        </div>
      </section>

      {/* 4 Feature matrix summary */}
      <section className="container-prose border-t border-ink-100 py-14">
        <SectionHeading
          eyebrow="4. Feature Priority Matrix"
          title="What ships when"
        />
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {phases.map((p) => (
            <div key={p.phase} className="rounded-lg border border-ink-100 bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-accent-600">
                {p.status}
              </p>
              <h3 className="mt-2 font-serif text-base font-semibold text-ink-900">
                {p.phase}
              </h3>
              <ul className="mt-4 space-y-2">
                {p.items.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-ink-600">
                    <Icon name="check" size={14} className="mt-0.5 shrink-0 text-ink-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 5 Admin modules */}
      <section className="container-prose border-t border-ink-100 py-14">
        <SectionHeading
          eyebrow="5. Admin Modules"
          title="15 CMS modules (Payload)"
        />
        <div className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {adminModules.map((m) => (
            <div
              key={m}
              className="flex items-center gap-2 rounded-md border border-ink-100 bg-sand-50 px-4 py-3 text-sm text-ink-700"
            >
              <Icon name="facility" size={16} className="shrink-0 text-accent-600" />
              {m}
            </div>
          ))}
        </div>
      </section>

      {/* 6 Database tables */}
      <section className="container-prose border-t border-ink-100 py-14">
        <SectionHeading
          eyebrow="6. Database Schema"
          title="Core tables & relationships"
        />
        <div className="mt-8 grid gap-2 sm:grid-cols-2">
          {tables.map((t) => (
            <code
              key={t}
              className="rounded-md border border-ink-100 bg-white px-4 py-2.5 text-sm text-ink-700"
            >
              {t}
            </code>
          ))}
        </div>
        <p className="mt-6 text-sm text-ink-500">
          Full field definitions, ENUMs, indexes, and ER diagram in{" "}
          <strong>docs/DATABASE-SCHEMA.md</strong>
        </p>
      </section>

      {/* 7 Roadmap + doc links */}
      <section className="container-prose border-t border-ink-100 py-14">
        <SectionHeading
          eyebrow="7. Development Roadmap"
          title="Designer & developer sprints"
        />
        <div className="mt-6 overflow-x-auto rounded-lg border border-ink-100">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-ink-100 bg-sand-50">
              <tr>
                <th className="px-4 py-3 font-semibold text-ink-700">Sprint</th>
                <th className="px-4 py-3 font-semibold text-ink-700">Weeks</th>
                <th className="px-4 py-3 font-semibold text-ink-700">Focus</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {[
                ["0", "Done", "Demo portal + docs + Vercel deploy"],
                ["0.5", "1–4", "Director review + feedback"],
                ["1", "5–6", "Payload CMS + SSO + departments"],
                ["2", "7–8", "Researchers + workflow"],
                ["3", "9–10", "Labs, projects, publications"],
                ["4", "11–12", "Consultancy + enquiry CRM"],
                ["5", "13–14", "Search + real data migration"],
                ["6", "15–16", "UAT + go-live"],
              ].map(([s, w, f]) => (
                <tr key={s} className="bg-white">
                  <td className="px-4 py-3 font-medium text-ink-900">{s}</td>
                  <td className="px-4 py-3 text-ink-600">{w}</td>
                  <td className="px-4 py-3 text-ink-600">{f}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Full documentation files */}
      <section className="container-prose border-t border-ink-100 py-14 pb-20">
        <SectionHeading
          eyebrow="Full documentation"
          title="Repository docs (for developers)"
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {docLinks.map((d) => (
            <div
              key={d.file}
              className="rounded-lg border border-ink-100 bg-white p-5"
            >
              <h3 className="font-serif text-base font-semibold text-ink-900">
                {d.title}
              </h3>
              <p className="mt-2 text-sm text-ink-600">{d.desc}</p>
              <p className="mt-3 font-mono text-xs text-accent-700">docs/{d.file}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-md bg-accent-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-accent-700"
          >
            Back to portal
            <Icon name="arrow" size={16} />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-md border border-ink-200 px-4 py-2.5 text-sm font-semibold text-ink-700 hover:bg-ink-50"
          >
            Test enquiry form
          </Link>
        </div>
      </section>
    </>
  );
}
