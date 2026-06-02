import type { Metadata } from "next";
import { ButtonLink, PageHeader } from "@/components/ui";
import { Icon } from "@/components/icon";
import { ResearchOutput } from "@/components/research-output";
import {
  getDomains,
  getPatents,
  getProjects,
  getPublications,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects, Grants & Publications",
  description:
    "Funded projects, sponsored research, peer-reviewed publications, and patents from MIT Bengaluru research groups.",
};

export default async function ProjectsPage() {
  const [projects, publications, patents, domains] = await Promise.all([
    getProjects(),
    getPublications(),
    getPatents(),
    getDomains(),
  ]);
  const totalFunding = projects.reduce((s, p) => s + p.amountLakh, 0);
  const stats = [
    { value: `${projects.length}`, label: "Funded projects" },
    { value: `₹${totalFunding.toFixed(1)}L`, label: "Sanctioned value" },
    { value: `${publications.length}`, label: "Publications" },
    { value: `${patents.length}`, label: "Patents & IP" },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Projects, Grants & Publications"
        title="Research output and intellectual property"
        intro="A repository of funded projects, peer-reviewed publications, and patents. Filter by research area or search across titles, authors, agencies, and inventors."
      />

      <section className="container-prose py-10">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-lg border border-ink-100 bg-sand-50 p-5"
            >
              <p className="font-serif text-2xl font-semibold text-ink-900 md:text-3xl">
                {s.value}
              </p>
              <p className="mt-1 text-sm text-ink-500">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3 rounded-lg border border-ink-100 bg-white p-4">
          <Icon name="doc" size={20} className="text-accent-600" />
          <p className="text-sm text-ink-600">
            Looking for the full research and consultancy report?
          </p>
          <a
            href="/brochures/mit-bengaluru-research-report.pdf"
            download
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-700 hover:text-accent-800"
          >
            Download research report (PDF)
            <Icon name="arrow" size={15} />
          </a>
        </div>
      </section>

      <section className="container-prose pb-16">
        <ResearchOutput
          projects={projects}
          publications={publications}
          patents={patents}
          domains={domains}
        />
      </section>

      <section className="container-prose pb-20">
        <div className="rounded-2xl border border-ink-100 bg-sand-50 p-8 text-center md:p-12">
          <h2 className="font-serif text-2xl font-semibold text-ink-900">
            Interested in sponsoring or collaborating on a project?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-ink-600">
            We welcome enquiries from funding agencies and industry partners
            for joint and sponsored research.
          </p>
          <div className="mt-6 flex justify-center">
            <ButtonLink href="/contact?category=Sponsored+Research">
              Propose a project
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
