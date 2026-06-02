import type { Metadata } from "next";
import { Suspense } from "react";
import { Icon } from "@/components/icon";
import { PageHeader } from "@/components/ui";
import { EnquiryForm } from "@/components/enquiry-form";
import { getDomains } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact & Enquiry",
  description:
    "Submit a structured consultancy, sponsored research, facility access, or collaboration enquiry to MIT Bengaluru's research office.",
};

const contactPoints = [
  {
    icon: "mail" as const,
    title: "Research & Consultancy Office",
    lines: ["research.blr@manipal.edu"],
  },
  {
    icon: "phone" as const,
    title: "Phone",
    lines: ["+91 80 0000 0000", "Mon–Fri, 9:30–17:30 IST"],
  },
  {
    icon: "pin" as const,
    title: "Address",
    lines: [
      "MIT Bengaluru Campus,",
      "Yelahanka, Bengaluru,",
      "Karnataka 560064, India",
    ],
  },
];

const enquiryReasons = [
  "Consultancy and technical advisory",
  "Sponsored and collaborative research",
  "Facility and laboratory access",
  "Training, FDP, and workshops",
  "PhD, internship, and research positions",
  "Partnership and MoU discussions",
];

export default async function ContactPage() {
  const domains = await getDomains();
  return (
    <>
      <PageHeader
        eyebrow="Contact & Enquiry"
        title="Start a collaboration or consultancy enquiry"
        intro="Tell us about your problem statement or collaboration interest. Select a category so we can route your enquiry to the right experts and respond with a scoping discussion."
      />

      <section className="container-prose grid gap-12 py-14 md:py-16 lg:grid-cols-[1.5fr_0.5fr]">
        <div className="rounded-lg border border-ink-100 bg-white p-6 md:p-8">
          <h2 className="font-serif text-2xl font-semibold text-ink-900">
            Enquiry form
          </h2>
          <p className="mt-2 text-sm text-ink-500">
            Fields marked with <span className="text-accent-600">*</span> are
            required.
          </p>
          <div className="mt-6">
            <Suspense fallback={<p className="text-sm text-ink-500">Loading form…</p>}>
              <EnquiryForm domains={domains} />
            </Suspense>
          </div>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          {contactPoints.map((c) => (
            <div key={c.title} className="rounded-lg border border-ink-100 bg-sand-50 p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-md bg-white text-accent-600">
                <Icon name={c.icon} size={20} />
              </span>
              <h3 className="mt-3 font-serif text-base font-semibold text-ink-900">
                {c.title}
              </h3>
              {c.lines.map((l) => (
                <p key={l} className="text-sm text-ink-600">
                  {l}
                </p>
              ))}
            </div>
          ))}

          <div className="rounded-lg border border-ink-100 bg-white p-6">
            <h3 className="font-serif text-base font-semibold text-ink-900">
              We respond to enquiries on
            </h3>
            <ul className="mt-3 space-y-2">
              {enquiryReasons.map((r) => (
                <li key={r} className="flex items-start gap-2 text-sm text-ink-600">
                  <Icon name="check" size={16} className="mt-0.5 shrink-0 text-accent-600" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>
    </>
  );
}
