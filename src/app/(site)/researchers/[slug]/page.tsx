import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/icon";
import { Avatar, Badge, Breadcrumbs, ButtonLink } from "@/components/ui";
import { ProjectRow, PublicationRow } from "@/components/cards";
import {
  getDomain,
  getDomains,
  getPatent,
  getProject,
  getPublication,
  getResearcher,
  getResearchers,
} from "@/lib/content";

export async function generateStaticParams() {
  try {
    const researchers = await getResearchers();
    return researchers.map((r) => ({ slug: r.slug }));
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
  const r = await getResearcher(slug);
  if (!r) return {};
  return {
    title: `${r.name} — ${r.designation}`,
    description: r.bio,
  };
}

function ProfileSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-ink-100 pt-8">
      <h2 className="font-serif text-xl font-semibold text-ink-900">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default async function ResearcherProfile({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const r = await getResearcher(slug);
  if (!r) notFound();

  const [allDomains, pubs, pats, projs] = await Promise.all([
    getDomains(),
    Promise.all(r.publications.map((id) => getPublication(id))),
    Promise.all(r.patents.map((id) => getPatent(id))),
    Promise.all(r.projects.map((id) => getProject(id))),
  ]);
  const domainMap = new Map(allDomains.map((d) => [d.slug, d]));
  const pubList = pubs.filter(Boolean);
  const patList = pats.filter(Boolean);
  const projList = projs.filter(Boolean);

  return (
    <>
      <section className="border-b border-ink-100 bg-ink-950 text-white">
        <div className="hairline-grid">
          <div className="container-prose py-12 md:py-16">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Researchers", href: "/researchers" },
                { label: r.name },
              ]}
            />
            <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center">
              <Avatar name={r.name} src={r.photo} size={96} />
              <div>
                <h1 className="font-serif text-3xl font-semibold md:text-4xl">
                  {r.name}
                </h1>
                <p className="mt-2 text-lg text-ink-200">{r.designation}</p>
                <p className="mt-1 text-sm text-ink-400">{r.department}</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href={`mailto:${r.email}`}
                    className="inline-flex items-center gap-2 rounded-md bg-accent-600 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-700"
                  >
                    <Icon name="mail" size={16} /> Contact
                  </a>
                  <Link
                    href={`/contact?expert=${encodeURIComponent(r.name)}`}
                    className="inline-flex items-center gap-2 rounded-md border border-ink-700 px-4 py-2 text-sm font-semibold text-white hover:bg-ink-800"
                  >
                    Enquire about collaboration
                    <Icon name="arrow" size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container-prose grid gap-12 py-14 md:py-16 lg:grid-cols-[1.5fr_0.5fr]">
        <div className="space-y-8">
          <section>
            <h2 className="font-serif text-xl font-semibold text-ink-900">Biography</h2>
            <p className="mt-4 text-base leading-relaxed text-ink-600">{r.bio}</p>
          </section>

          <ProfileSection title="Research interests">
            <ul className="grid gap-3 sm:grid-cols-2">
              {r.researchInterests.map((i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-ink-700">
                  <Icon name="check" size={18} className="mt-0.5 shrink-0 text-accent-600" />
                  {i}
                </li>
              ))}
            </ul>
          </ProfileSection>

          {projList.length > 0 && (
            <ProfileSection title="Funded projects">
              <div className="space-y-4">
                {projList.map((p) => (
                  <ProjectRow
                    key={p!.id}
                    project={p!}
                    pi={r}
                    domainTitle={domainMap.get(p!.domain)?.title}
                  />
                ))}
              </div>
            </ProfileSection>
          )}

          {pubList.length > 0 && (
            <ProfileSection title="Selected publications">
              <div>
                {pubList.map((p) => (
                  <PublicationRow key={p!.id} publication={p!} />
                ))}
              </div>
            </ProfileSection>
          )}

          {patList.length > 0 && (
            <ProfileSection title="Patents & intellectual property">
              <ul className="space-y-4">
                {patList.map((p) => (
                  <li key={p!.id} className="rounded-lg border border-ink-100 bg-white p-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge>{p!.status}</Badge>
                      <span className="text-sm font-semibold text-ink-500">{p!.year}</span>
                    </div>
                    <p className="mt-2 font-serif text-base font-semibold text-ink-900">
                      {p!.title}
                    </p>
                    <p className="mt-1 text-sm text-ink-500">
                      Application No: {p!.applicationNo} · Inventors:{" "}
                      {p!.inventors.join(", ")}
                    </p>
                  </li>
                ))}
              </ul>
            </ProfileSection>
          )}

          <ProfileSection title="Consultancy areas">
            <ul className="grid gap-3 sm:grid-cols-2">
              {r.consultancyAreas.map((c) => (
                <li key={c} className="flex items-start gap-2 text-sm text-ink-700">
                  <Icon name="advisory" size={18} className="mt-0.5 shrink-0 text-accent-600" />
                  {c}
                </li>
              ))}
            </ul>
          </ProfileSection>

          <ProfileSection title="Collaboration interests">
            <ul className="grid gap-3 sm:grid-cols-2">
              {r.collaborationInterests.map((c) => (
                <li key={c} className="flex items-start gap-2 text-sm text-ink-700">
                  <Icon name="research" size={18} className="mt-0.5 shrink-0 text-accent-600" />
                  {c}
                </li>
              ))}
            </ul>
          </ProfileSection>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-lg border border-ink-100 bg-sand-50 p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-500">
              Research areas
            </h3>
            <ul className="mt-3 space-y-2">
              {r.domains.map((d) => {
                const dom = domainMap.get(d);
                if (!dom) return null;
                return (
                  <li key={d}>
                    <Link
                      href={`/research-areas/${d}`}
                      className="flex items-center justify-between text-sm font-medium text-ink-700 hover:text-accent-700"
                    >
                      {dom.title}
                      <Icon name="arrow" size={14} />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="rounded-lg border border-ink-100 bg-white p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-500">
              Expertise
            </h3>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {r.expertiseKeywords.map((k) => (
                <Badge key={k}>{k}</Badge>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-ink-100 bg-white p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-500">
              Contact
            </h3>
            <a
              href={`mailto:${r.email}`}
              className="mt-3 flex items-center gap-2 break-all text-sm text-ink-700 hover:text-accent-700"
            >
              <Icon name="mail" size={16} className="shrink-0" />
              {r.email}
            </a>
            {r.scholar && (
              <a
                href={r.scholar}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center gap-2 text-sm text-ink-700 hover:text-accent-700"
              >
                <Icon name="external" size={16} className="shrink-0" />
                Google Scholar
              </a>
            )}
            <div className="mt-4">
              <ButtonLink href={`/contact?expert=${encodeURIComponent(r.name)}`}>
                Enquire
              </ButtonLink>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
