"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/icon";
import { ResearcherCard } from "@/components/cards";
import type { Researcher, ResearchDomain } from "@/lib/types";

export function ResearcherDirectory({
  researchers,
  domains,
}: {
  researchers: Researcher[];
  domains: ResearchDomain[];
}) {
  const [query, setQuery] = useState("");
  const [domain, setDomain] = useState("all");

  const departments = useMemo(
    () => Array.from(new Set(researchers.map((r) => r.department))).sort(),
    [researchers],
  );
  const [department, setDepartment] = useState("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return researchers.filter((r) => {
      const matchesDomain = domain === "all" || r.domains.includes(domain);
      const matchesDept = department === "all" || r.department === department;
      const matchesQuery =
        !q ||
        r.name.toLowerCase().includes(q) ||
        r.designation.toLowerCase().includes(q) ||
        r.expertiseKeywords.some((k) => k.toLowerCase().includes(q)) ||
        r.researchInterests.some((k) => k.toLowerCase().includes(q));
      return matchesDomain && matchesDept && matchesQuery;
    });
  }, [researchers, query, domain, department]);

  const selectClass =
    "rounded-md border border-ink-200 bg-white px-3 py-2.5 text-sm text-ink-700 outline-none focus:border-accent-400 focus:ring-2 focus:ring-accent-100";

  return (
    <div>
      <div className="grid gap-3 md:grid-cols-[1.4fr_1fr_1fr]">
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
            placeholder="Search by name, keyword, or interest"
            aria-label="Search researchers"
            className="w-full rounded-md border border-ink-200 bg-white py-2.5 pl-10 pr-4 text-sm text-ink-800 outline-none placeholder:text-ink-400 focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
          />
        </div>
        <select
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          aria-label="Filter by research area"
          className={selectClass}
        >
          <option value="all">All research areas</option>
          {domains.map((d) => (
            <option key={d.slug} value={d.slug}>
              {d.title}
            </option>
          ))}
        </select>
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          aria-label="Filter by department"
          className={selectClass}
        >
          <option value="all">All departments</option>
          {departments.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      <p className="mt-4 text-sm text-ink-500">
        {filtered.length} {filtered.length === 1 ? "researcher" : "researchers"}
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((r) => (
          <ResearcherCard key={r.slug} researcher={r} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="mt-10 text-center text-ink-500">
          No researchers match the selected filters.
        </p>
      )}
    </div>
  );
}
