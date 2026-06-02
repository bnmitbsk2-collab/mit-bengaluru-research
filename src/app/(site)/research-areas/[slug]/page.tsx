import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Icon, type IconName } from "@/components/icon";
import { Breadcrumbs, ButtonLink, SectionHeading } from "@/components/ui";
import { FacilityCard, ProjectRow, ResearcherCard } from "@/components/cards";
import {
  getDomain,
  getDomains,
  getFacilities,
  getProjects,
  getResearchers,
  getResearchersByDomain,
} from "@/lib/content";

export async function generateStaticParams() {
  try {
    const domains = await getDomains();
    return domains.map((d) => ({ slug: d.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const domain = await getDomain(slug);
  if (!domain) return {};
  return { title: domain.title, description: domain.summary };
}

export default async function DomainPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const domain = await getDomain(slug);
  if (!domain) notFound();

  const [people, allFacilities, allProjects, researchers] = await Promise.all([
    getResearchersByDomain(domain.slug),
    getFacilities(),
    getProjects(),
    getResearchers(),
  ]);
  const labs = allFacilities.filter((f) => f.domain === domain.slug);
  const domainProjects = allProjects.filter((p) => p.domain === domain.slug);
  const piFor = (piSlug: string) => researchers.find((r) => r.slug === piSlug);

  return (
    <>
      <section className="border-b border-ink-100 bg-ink-950 text-white">
        <div className="hairline-grid">
          <div className="container-prose py-12 md:py-16">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Research Areas", href: "/research-areas" },
                { label: domain.title },
              ]}
            />
            <div className="mt-6 flex items-start gap-5">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-ink-800 text-accent-300">
                <Icon name={domain.icon as IconName} size={28} />
              </span>
              <div>
                <h1 className="font-serif text-3xl font-semibold leading-tight md:text-4xl">
                  {domain.title}
                </h1>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-200">
                  {domain.summary}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-prose grid gap-12 py-14 md:py-16 lg:grid-cols-[1.4fr_0.6fr]">
        <div>
          <h2 className="font-serif text-2xl font-semibold text-ink-900">Overview</h2>
          {domain.description.map((p, i) => (
            <p key={i} className="mt-4 text-base leading-relaxed text-ink-600">
              {p}
            </p>
          ))}

          <h3 className="mt-10 font-serif text-xl font-semibold text-ink-900">
            Research focus
          </h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {domain.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-sm text-ink-700">
                <Icon name="check" size={18} className="mt-0.5 shrink-0 text-accent-600" />
                {h}
              </li>
            ))}
          </ul>
        </div>

        <aside className="rounded-lg border border-ink-100 bg-sand-50 p-6">
          <h3 className="font-serif text-lg font-semibold text-ink-900">
            Industry applications
          </h3>
          <ul className="mt-4 space-y-3">
            {domain.applications.map((a) => (
              <li key={a} className="flex items-start gap-2 text-sm text-ink-700">
                <Icon name="arrow" size={16} className="mt-0.5 shrink-0 text-accent-600" />
                {a}
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <ButtonLink href="/contact">Discuss a collaboration</ButtonLink>
          </div>
        </aside>
      </section>

      {people.length > 0 && (
        <section className="border-t border-ink-100 bg-sand-50">
          <div className="container-prose py-14">
            <SectionHeading eyebrow="Experts" title="Researchers in this area" />
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {people.map((r) => (
                <ResearcherCard key={r.slug} researcher={r} />
              ))}
            </div>
          </div>
        </section>
      )}

      {labs.length > 0 && (
        <section className="container-prose py-14">
          <SectionHeading eyebrow="Facilities" title="Related centres & labs" />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {labs.map((f) => (
              <FacilityCard key={f.slug} facility={f} domainTitle={domain.title} />
            ))}
          </div>
        </section>
      )}

      {domainProjects.length > 0 && (
        <section className="border-t border-ink-100 bg-sand-50">
          <div className="container-prose py-14">
            <SectionHeading eyebrow="Projects" title="Funded projects in this area" />
            <div className="mt-8 grid gap-5">
              {domainProjects.map((p) => (
                <ProjectRow
                  key={p.id}
                  project={p}
                  pi={piFor(p.piSlug)}
                  domainTitle={domain.title}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
