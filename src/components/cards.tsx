import Link from "next/link";
import { Icon, type IconName } from "@/components/icon";
import { Avatar, Badge, StatusBadge } from "@/components/ui";
import type {
  Facility,
  NewsItem,
  Project,
  Publication,
  Researcher,
  ResearchDomain,
} from "@/lib/types";

export function DomainCard({ domain }: { domain: ResearchDomain }) {
  return (
    <Link
      href={`/research-areas/${domain.slug}`}
      className="group flex flex-col rounded-lg border border-ink-100 bg-white p-6 transition-all hover:border-ink-300 hover:shadow-[0_8px_30px_-12px_rgba(15,29,48,0.18)]"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-md bg-ink-50 text-ink-700 transition-colors group-hover:bg-accent-50 group-hover:text-accent-700">
        <Icon name={domain.icon as IconName} size={24} />
      </span>
      <h3 className="mt-4 font-serif text-lg font-semibold text-ink-900">
        {domain.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">{domain.short}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-700">
        Explore area
        <Icon name="arrow" size={15} className="transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

export function ResearcherCard({ researcher }: { researcher: Researcher }) {
  return (
    <Link
      href={`/researchers/${researcher.slug}`}
      className="group flex flex-col rounded-lg border border-ink-100 bg-white p-6 transition-all hover:border-ink-300 hover:shadow-[0_8px_30px_-12px_rgba(15,29,48,0.18)]"
    >
      <div className="flex items-center gap-4">
        <Avatar name={researcher.name} src={researcher.photo} size={56} />
        <div>
          <h3 className="font-serif text-lg font-semibold text-ink-900">
            {researcher.name}
          </h3>
          <p className="text-sm text-ink-500">{researcher.department}</p>
        </div>
      </div>
      <p className="mt-3 text-sm font-medium text-ink-700">{researcher.designation}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {researcher.expertiseKeywords.slice(0, 3).map((k) => (
          <Badge key={k}>{k}</Badge>
        ))}
      </div>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-700">
        View profile
        <Icon name="arrow" size={15} className="transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

export function FacilityCard({
  facility,
  domainTitle,
}: {
  facility: Facility;
  domainTitle?: string;
}) {
  return (
    <Link
      href={`/facilities/${facility.slug}`}
      className="group flex flex-col rounded-lg border border-ink-100 bg-white p-6 transition-all hover:border-ink-300 hover:shadow-[0_8px_30px_-12px_rgba(15,29,48,0.18)]"
    >
      <div className="flex items-center justify-between">
        <span className="flex h-11 w-11 items-center justify-center rounded-md bg-ink-50 text-ink-700 transition-colors group-hover:bg-accent-50 group-hover:text-accent-700">
          <Icon name="facility" size={22} />
        </span>
        <Badge>{facility.type}</Badge>
      </div>
      <h3 className="mt-4 font-serif text-lg font-semibold text-ink-900">
        {facility.name}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">{facility.short}</p>
      {domainTitle && (
        <p className="mt-4 text-xs font-medium uppercase tracking-wide text-ink-400">
          {domainTitle}
        </p>
      )}
    </Link>
  );
}

export function ProjectRow({
  project,
  pi,
  domainTitle,
}: {
  project: Project;
  pi?: Researcher | null;
  domainTitle?: string;
}) {
  return (
    <article className="rounded-lg border border-ink-100 bg-white p-6">
      <div className="flex flex-wrap items-center gap-2">
        <StatusBadge status={project.status} />
        {domainTitle && <Badge>{domainTitle}</Badge>}
      </div>
      <h3 className="mt-3 font-serif text-lg font-semibold text-ink-900">
        {project.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-600">{project.summary}</p>
      <dl className="mt-4 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
        <div className="flex gap-2">
          <dt className="text-ink-400">Principal Investigator:</dt>
          <dd className="font-medium text-ink-700">
            {pi ? (
              <Link href={`/researchers/${pi.slug}`} className="hover:text-accent-700">
                {pi.name}
              </Link>
            ) : (
              "—"
            )}
          </dd>
        </div>
        <div className="flex gap-2">
          <dt className="text-ink-400">Funding:</dt>
          <dd className="font-medium text-ink-700">{project.fundingAgency}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="text-ink-400">Duration:</dt>
          <dd className="font-medium text-ink-700">
            {project.startYear}–{project.endYear}
          </dd>
        </div>
        <div className="flex gap-2">
          <dt className="text-ink-400">Sanctioned:</dt>
          <dd className="font-medium text-ink-700">₹{project.amountLakh} Lakh</dd>
        </div>
      </dl>
    </article>
  );
}

export function PublicationRow({ publication }: { publication: Publication }) {
  return (
    <article className="border-b border-ink-100 py-5">
      <div className="flex flex-wrap items-center gap-2">
        <Badge>{publication.type}</Badge>
        <span className="text-sm font-semibold text-ink-500">{publication.year}</span>
      </div>
      <h3 className="mt-2 font-serif text-base font-semibold text-ink-900">
        {publication.title}
      </h3>
      <p className="mt-1 text-sm text-ink-600">{publication.authors.join(", ")}</p>
      <p className="mt-1 text-sm italic text-ink-500">{publication.venue}</p>
      {publication.doi && (
        <p className="mt-1 text-xs text-ink-400">DOI: {publication.doi}</p>
      )}
    </article>
  );
}

export function NewsCard({ item }: { item: NewsItem }) {
  const date = new Date(item.date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  return (
    <article className="flex flex-col rounded-lg border border-ink-100 bg-white p-6">
      <div className="flex items-center justify-between">
        <Badge>{item.type}</Badge>
        <time className="text-xs font-medium text-ink-400" dateTime={item.date}>
          {date}
        </time>
      </div>
      <h3 className="mt-3 font-serif text-base font-semibold text-ink-900">
        {item.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">{item.summary}</p>
    </article>
  );
}
