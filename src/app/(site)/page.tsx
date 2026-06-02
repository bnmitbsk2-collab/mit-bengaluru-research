import Link from "next/link";
import { Icon, type IconName } from "@/components/icon";
import { ButtonLink, SectionHeading } from "@/components/ui";
import {
  DomainCard,
  FacilityCard,
  NewsCard,
  ResearcherCard,
} from "@/components/cards";
import {
  getCollaborationModels,
  getConsultancyServices,
  getDomains,
  getFacilities,
  getMetrics,
  getNews,
  getPartnerCategories,
  getPatents,
  getProjects,
  getPublications,
  getResearchers,
} from "@/lib/content";

export default async function HomePage() {
  const [
    domains,
    researchers,
    facilities,
    projects,
    publications,
    patents,
    metrics,
    consultancyServices,
    collaborationModels,
    partnerCategories,
    news,
  ] = await Promise.all([
    getDomains(),
    getResearchers(),
    getFacilities(),
    getProjects(),
    getPublications(),
    getPatents(),
    getMetrics(),
    getConsultancyServices(),
    getCollaborationModels(),
    getPartnerCategories(),
    getNews(),
  ]);

  const domainTitle = (slug: string) => domains.find((d) => d.slug === slug)?.title;
  return (
    <>
      {/* 1. Hero */}
      <section className="border-b border-ink-100 bg-ink-950 text-white">
        <div className="hairline-grid">
          <div className="container-prose grid gap-12 py-16 md:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-300">
                Manipal Academy of Higher Education &middot; MIT Bengaluru
              </p>
              <h1 className="mt-4 font-serif text-4xl font-semibold leading-[1.1] md:text-5xl lg:text-6xl">
                Applied research and expertise, ready for industry collaboration.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-200">
                MIT Bengaluru connects faculty researchers, specialised
                laboratories, and consultancy services with industry, funding
                agencies, and academic partners — across engineering and
                applied sciences.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/consultancy">Partner with us</ButtonLink>
                <Link
                  href="/research-areas"
                  className="inline-flex items-center gap-2 rounded-md border border-ink-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-ink-800"
                >
                  Explore research areas
                  <Icon name="arrow" size={16} />
                </Link>
              </div>
            </div>
            <div className="rounded-xl border border-ink-800 bg-ink-900/60 p-6">
              <p className="text-sm font-semibold uppercase tracking-wider text-ink-400">
                Engage with us
              </p>
              <ul className="mt-4 space-y-3">
                {[
                  { label: "Find an expert", href: "/researchers", icon: "expert" },
                  { label: "Request consultancy", href: "/consultancy", icon: "advisory" },
                  { label: "Access a laboratory", href: "/facilities", icon: "facility" },
                  { label: "Propose sponsored research", href: "/contact", icon: "research" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="group flex items-center justify-between rounded-md border border-ink-800 bg-ink-950/40 px-4 py-3 transition-colors hover:border-accent-500"
                    >
                      <span className="flex items-center gap-3 text-sm font-medium text-ink-100">
                        <Icon name={item.icon as IconName} size={18} className="text-accent-300" />
                        {item.label}
                      </span>
                      <Icon
                        name="arrow"
                        size={16}
                        className="text-ink-500 transition-transform group-hover:translate-x-0.5 group-hover:text-accent-300"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Research impact metrics strip */}
      <section className="border-b border-ink-100 bg-sand-50">
        <div className="container-prose grid grid-cols-2 gap-x-6 gap-y-8 py-12 md:grid-cols-3 lg:grid-cols-6">
          {metrics.map((m) => (
            <div key={m.label}>
              <p className="font-serif text-3xl font-semibold text-ink-900 md:text-4xl">
                {m.value}
              </p>
              <p className="mt-1 text-sm font-semibold text-ink-700">{m.label}</p>
              <p className="mt-1 text-xs leading-snug text-ink-500">{m.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Featured research domains */}
      <section className="container-prose py-16 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Research Areas"
            title="Research domains with applied depth"
            intro="Nine interdisciplinary domains where MIT Bengaluru combines fundamental research with industry-relevant outcomes."
          />
          <ButtonLink href="/research-areas" variant="ghost">
            View all areas
          </ButtonLink>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {domains.slice(0, 6).map((d) => (
            <DomainCard key={d.slug} domain={d} />
          ))}
        </div>
      </section>

      {/* 4. Centres and labs spotlight */}
      <section className="border-y border-ink-100 bg-sand-50">
        <div className="container-prose py-16 md:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Centres, Labs & Facilities"
              title="Specialised infrastructure for applied work"
              intro="Centres and laboratories offering equipment, testing, and development capability to research and industry partners."
            />
            <ButtonLink href="/facilities" variant="ghost">
              All facilities
            </ButtonLink>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {facilities.slice(0, 3).map((f) => (
              <FacilityCard key={f.slug} facility={f} domainTitle={domainTitle(f.domain)} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Faculty expert preview */}
      <section className="container-prose py-16 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Researchers & Faculty Experts"
            title="Experts available for collaboration"
            intro="Faculty researchers offering domain expertise for consultancy, sponsored research, and joint supervision."
          />
          <ButtonLink href="/researchers" variant="ghost">
            Browse directory
          </ButtonLink>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {researchers.slice(0, 3).map((r) => (
            <ResearcherCard key={r.slug} researcher={r} />
          ))}
        </div>
      </section>

      {/* 6. Consultancy and industry engagement */}
      <section className="border-y border-ink-100 bg-ink-950 text-white">
        <div className="container-prose py-16 md:py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-300">
              Consultancy &amp; Industry Collaboration
            </p>
            <h2 className="mt-2 font-serif text-2xl font-semibold md:text-3xl">
              Clear pathways to engage faculty expertise and facilities
            </h2>
            <p className="mt-3 text-base leading-relaxed text-ink-200">
              From short advisory engagements to multi-year sponsored research,
              partners can access expertise and infrastructure through defined,
              accountable arrangements.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {consultancyServices.slice(0, 8).map((s) => (
              <div
                key={s.id}
                className="rounded-lg border border-ink-800 bg-ink-900/50 p-5"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-md bg-ink-800 text-accent-300">
                  <Icon name={s.icon as IconName} size={20} />
                </span>
                <h3 className="mt-4 font-serif text-base font-semibold text-white">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-300">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <ButtonLink href="/consultancy">Explore consultancy services</ButtonLink>
          </div>
        </div>
      </section>

      {/* 7. Projects, grants, publications & IP highlights */}
      <section className="container-prose py-16 md:py-20">
        <SectionHeading
          eyebrow="Projects, Grants & Publications"
          title="Research output and intellectual property"
          intro="A snapshot of funded projects, peer-reviewed publications, and patents generated across research domains."
          align="center"
        />
        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { value: `${projects.length}`, label: "Featured projects" },
            { value: `${publications.length}`, label: "Publications" },
            { value: `${patents.length}`, label: "Patents" },
            {
              value: `₹${projects
                .reduce((s, p) => s + p.amountLakh, 0)
                .toFixed(0)}L`,
              label: "Sample funding",
            },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-lg border border-ink-100 bg-white p-5 text-center"
            >
              <p className="font-serif text-2xl font-semibold text-ink-900">
                {s.value}
              </p>
              <p className="mt-1 text-xs font-medium text-ink-500">{s.label}</p>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-8 max-w-3xl rounded-lg border border-ink-100 bg-white p-6">
          <h3 className="font-serif text-lg font-semibold text-ink-900">
            Recent highlights
          </h3>
          <ul className="mt-4 space-y-3">
            {publications.slice(0, 3).map((p) => (
              <li key={p.id} className="flex gap-3 text-sm">
                <Icon name="doc" size={18} className="mt-0.5 shrink-0 text-accent-600" />
                <span className="text-ink-700">
                  <span className="font-medium text-ink-900">{p.title}</span> —{" "}
                  {p.venue}, {p.year}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <ButtonLink href="/projects" variant="secondary">
              View projects &amp; publications
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* 8. Collaboration models & partner ecosystem */}
      <section className="border-y border-ink-100 bg-sand-50">
        <div className="container-prose py-16 md:py-20">
          <SectionHeading
            eyebrow="Collaboration Models"
            title="Ways to work with MIT Bengaluru"
            intro="Engagement models scoped to the needs of industry, agencies, academic institutions, and startups."
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {collaborationModels.map((m) => (
              <div
                key={m.title}
                className="rounded-lg border border-ink-100 bg-white p-6"
              >
                <h3 className="font-serif text-lg font-semibold text-ink-900">
                  {m.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">
                  {m.description}
                </p>
                <p className="mt-3 text-sm">
                  <span className="font-semibold text-accent-700">Best for: </span>
                  <span className="text-ink-600">{m.bestFor}</span>
                </p>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <h3 className="font-serif text-lg font-semibold text-ink-900">
              Partner ecosystem
            </h3>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {partnerCategories.map((p) => (
                <div
                  key={p.title}
                  className="rounded-lg border border-ink-100 bg-white p-5"
                >
                  <p className="font-semibold text-ink-900">{p.title}</p>
                  <p className="mt-1 text-sm text-ink-500">{p.examples}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 9. News, events & announcements */}
      <section className="container-prose py-16 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="News & Events"
            title="Latest updates and announcements"
            intro="Recent grants, facility launches, events, and faculty development programmes."
          />
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {news.map((n) => (
            <NewsCard key={n.id} item={n} />
          ))}
        </div>
      </section>

      {/* 10. Final CTA & enquiry */}
      <section className="container-prose pb-20">
        <div className="overflow-hidden rounded-2xl border border-ink-100 bg-ink-950 text-white">
          <div className="hairline-grid">
            <div className="grid gap-8 p-10 md:grid-cols-[1.2fr_0.8fr] md:items-center md:p-14">
              <div>
                <h2 className="font-serif text-2xl font-semibold md:text-3xl">
                  Have a problem statement, project, or collaboration in mind?
                </h2>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-200">
                  Send a structured enquiry and our research and consultancy team
                  will route it to the right experts. We respond to serious
                  collaboration and consultancy requests.
                </p>
              </div>
              <div className="flex flex-col gap-3 md:items-end">
                <ButtonLink href="/contact">Start an enquiry</ButtonLink>
                <a
                  href="/brochures/mit-bengaluru-capability-brochure.pdf"
                  download
                  className="inline-flex items-center gap-2 text-sm font-semibold text-ink-200 hover:text-white"
                >
                  Download capability brochure
                  <Icon name="doc" size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
