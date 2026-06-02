import type { Metadata } from "next";
import Link from "next/link";
import { Icon, type IconName } from "@/components/icon";
import { ButtonLink, PageHeader, SectionHeading } from "@/components/ui";
import {
  getCollaborationModels,
  getConsultancyServices,
  getPartnerCategories,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Consultancy & Industry Collaboration",
  description:
    "Technical advisory, sponsored research, prototyping, testing, training, and facility access from MIT Bengaluru faculty and laboratories.",
};

const process = [
  {
    step: "01",
    title: "Submit an enquiry",
    text: "Describe your problem statement, objectives, and timeline through the enquiry form.",
  },
  {
    step: "02",
    title: "Scoping discussion",
    text: "Our team routes the enquiry to relevant faculty and arranges a scoping conversation.",
  },
  {
    step: "03",
    title: "Proposal & agreement",
    text: "We define deliverables, timelines, costs, and IP terms in a formal proposal.",
  },
  {
    step: "04",
    title: "Delivery & handover",
    text: "Work is delivered against agreed milestones, with documentation and review.",
  },
];

export default async function ConsultancyPage() {
  const [consultancyServices, collaborationModels, partnerCategories] =
    await Promise.all([
      getConsultancyServices(),
      getCollaborationModels(),
      getPartnerCategories(),
    ]);

  return (
    <>
      <PageHeader
        eyebrow="Consultancy & Industry Collaboration"
        title="Engage faculty expertise and research infrastructure"
        intro="MIT Bengaluru offers structured consultancy and collaboration pathways for industry, agencies, and startups — from short advisory engagements to multi-year sponsored research."
      />

      <section className="container-prose py-14 md:py-16">
        <SectionHeading
          eyebrow="Services"
          title="What we offer"
          intro="Each engagement is scoped around defined deliverables and accountable timelines."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
          {consultancyServices.map((s) => (
            <div
              key={s.id}
              className="flex flex-col rounded-lg border border-ink-100 bg-white p-6"
            >
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-ink-50 text-ink-700">
                  <Icon name={s.icon as IconName} size={22} />
                </span>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-ink-900">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">
                    {s.description}
                  </p>
                </div>
              </div>
              <div className="mt-4 border-t border-ink-100 pt-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-ink-400">
                  Typical deliverables
                </p>
                <ul className="mt-2 space-y-1.5">
                  {s.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-2 text-sm text-ink-700">
                      <Icon name="check" size={16} className="mt-0.5 shrink-0 text-accent-600" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-5">
                <Link
                  href={`/contact?category=${encodeURIComponent(s.title)}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-700 hover:text-accent-800"
                >
                  Enquire about this service
                  <Icon name="arrow" size={15} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-ink-100 bg-sand-50">
        <div className="container-prose py-14 md:py-16">
          <SectionHeading
            eyebrow="Engagement Models"
            title="How collaborations are structured"
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {collaborationModels.map((m) => (
              <div key={m.title} className="rounded-lg border border-ink-100 bg-white p-6">
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
        </div>
      </section>

      <section className="container-prose py-14 md:py-16">
        <SectionHeading eyebrow="Process" title="From enquiry to delivery" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((p) => (
            <div key={p.step} className="rounded-lg border border-ink-100 bg-white p-6">
              <span className="font-serif text-3xl font-semibold text-accent-500">
                {p.step}
              </span>
              <h3 className="mt-3 font-serif text-lg font-semibold text-ink-900">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-ink-100 bg-sand-50">
        <div className="container-prose py-14 md:py-16">
          <SectionHeading eyebrow="Partners" title="Who we work with" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {partnerCategories.map((p) => (
              <div key={p.title} className="rounded-lg border border-ink-100 bg-white p-5">
                <p className="font-semibold text-ink-900">{p.title}</p>
                <p className="mt-1 text-sm text-ink-500">{p.examples}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-prose py-16">
        <div className="overflow-hidden rounded-2xl border border-ink-100 bg-ink-950 text-white">
          <div className="hairline-grid">
            <div className="grid gap-8 p-10 md:grid-cols-[1.2fr_0.8fr] md:items-center md:p-14">
              <div>
                <h2 className="font-serif text-2xl font-semibold md:text-3xl">
                  Ready to scope a consultancy or research engagement?
                </h2>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-200">
                  Submit a structured enquiry. We respond to serious consultancy
                  and collaboration requests with a scoping discussion.
                </p>
              </div>
              <div className="md:justify-self-end">
                <ButtonLink href="/contact">Start an enquiry</ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
