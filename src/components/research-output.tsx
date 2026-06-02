"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/icon";
import { Badge, StatusBadge } from "@/components/ui";
import { ProjectRow, PublicationRow } from "@/components/cards";
import type {
  Patent,
  Project,
  Publication,
  ResearchDomain,
} from "@/lib/types";

type Tab = "projects" | "publications" | "patents";

export function ResearchOutput({
  projects,
  publications,
  patents,
  domains,
}: {
  projects: Project[];
  publications: Publication[];
  patents: Patent[];
  domains: ResearchDomain[];
}) {
  const [tab, setTab] = useState<Tab>("projects");
  const [domain, setDomain] = useState("all");
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const domainMatch = (d: string) => domain === "all" || d === domain;

  const filteredProjects = useMemo(
    () =>
      projects.filter(
        (p) =>
          domainMatch(p.domain) &&
          (!q ||
            p.title.toLowerCase().includes(q) ||
            p.fundingAgency.toLowerCase().includes(q)),
      ),
    [projects, domain, q],
  );

  const filteredPubs = useMemo(
    () =>
      publications.filter(
        (p) =>
          domainMatch(p.domain) &&
          (!q ||
            p.title.toLowerCase().includes(q) ||
            p.authors.join(" ").toLowerCase().includes(q) ||
            p.venue.toLowerCase().includes(q)),
      ),
    [publications, domain, q],
  );

  const filteredPatents = useMemo(
    () =>
      patents.filter(
        (p) =>
          domainMatch(p.domain) &&
          (!q ||
            p.title.toLowerCase().includes(q) ||
            p.inventors.join(" ").toLowerCase().includes(q)),
      ),
    [patents, domain, q],
  );

  const counts = {
    projects: filteredProjects.length,
    publications: filteredPubs.length,
    patents: filteredPatents.length,
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: "projects", label: "Projects & Grants" },
    { id: "publications", label: "Publications" },
    { id: "patents", label: "Patents & IP" },
  ];

  return (
    <div>
      <div className="flex flex-wrap gap-2 border-b border-ink-100">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`-mb-px border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
              tab === t.id
                ? "border-accent-600 text-accent-700"
                : "border-transparent text-ink-500 hover:text-ink-800"
            }`}
          >
            {t.label}
            <span className="ml-2 rounded-full bg-ink-100 px-2 py-0.5 text-xs text-ink-600">
              {counts[t.id]}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-[1.4fr_1fr]">
        <div className="relative">
          <Icon
            name="search"
            size={18}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-400"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, author, agency, or inventor"
            aria-label="Search research output"
            className="w-full rounded-md border border-ink-200 bg-white py-2.5 pl-10 pr-4 text-sm text-ink-800 outline-none placeholder:text-ink-400 focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
          />
        </div>
        <select
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          aria-label="Filter by research area"
          className="rounded-md border border-ink-200 bg-white px-3 py-2.5 text-sm text-ink-700 outline-none focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
        >
          <option value="all">All research areas</option>
          {domains.map((d) => (
            <option key={d.slug} value={d.slug}>
              {d.title}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-8">
        {tab === "projects" && (
          <div className="grid gap-5">
            {filteredProjects.map((p) => (
              <ProjectRow key={p.id} project={p} />
            ))}
            {filteredProjects.length === 0 && <Empty />}
          </div>
        )}

        {tab === "publications" && (
          <div className="rounded-lg border border-ink-100 bg-white px-6">
            {filteredPubs.map((p) => (
              <PublicationRow key={p.id} publication={p} />
            ))}
            {filteredPubs.length === 0 && (
              <div className="py-6">
                <Empty />
              </div>
            )}
          </div>
        )}

        {tab === "patents" && (
          <div className="grid gap-4">
            {filteredPatents.map((p) => (
              <article
                key={p.id}
                className="rounded-lg border border-ink-100 bg-white p-6"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <StatusBadge status={p.status} />
                  <Badge>{p.year}</Badge>
                </div>
                <h3 className="mt-2 font-serif text-base font-semibold text-ink-900">
                  {p.title}
                </h3>
                <p className="mt-1 text-sm text-ink-500">
                  Application No: {p.applicationNo} · Inventors:{" "}
                  {p.inventors.join(", ")}
                </p>
              </article>
            ))}
            {filteredPatents.length === 0 && <Empty />}
          </div>
        )}
      </div>
    </div>
  );
}

function Empty() {
  return (
    <p className="py-8 text-center text-ink-500">
      No results match the selected filters.
    </p>
  );
}
