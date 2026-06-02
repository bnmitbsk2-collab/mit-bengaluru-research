"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/icon";
import { DomainCard } from "@/components/cards";
import type { ResearchDomain } from "@/lib/types";

export function DomainDirectory({ domains }: { domains: ResearchDomain[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return domains;
    return domains.filter(
      (d) =>
        d.title.toLowerCase().includes(q) ||
        d.short.toLowerCase().includes(q) ||
        d.applications.some((a) => a.toLowerCase().includes(q)) ||
        d.highlights.some((h) => h.toLowerCase().includes(q)),
    );
  }, [domains, query]);

  return (
    <div>
      <div className="relative max-w-md">
        <Icon
          name="search"
          size={18}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-400"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search domains, applications, or capabilities"
          aria-label="Search research areas"
          className="w-full rounded-md border border-ink-200 bg-white py-2.5 pl-10 pr-4 text-sm text-ink-800 outline-none placeholder:text-ink-400 focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
        />
      </div>
      <p className="mt-4 text-sm text-ink-500">
        {filtered.length} research {filtered.length === 1 ? "area" : "areas"}
      </p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((d) => (
          <DomainCard key={d.slug} domain={d} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="mt-10 text-center text-ink-500">
          No research areas match your search.
        </p>
      )}
    </div>
  );
}
