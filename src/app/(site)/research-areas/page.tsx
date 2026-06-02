import type { Metadata } from "next";
import { PageHeader } from "@/components/ui";
import { DomainDirectory } from "@/components/domain-directory";
import { getDomains } from "@/lib/content";

export const metadata: Metadata = {
  title: "Research Areas",
  description:
    "Explore interdisciplinary research domains at MIT Bengaluru — from AI and cybersecurity to sustainable energy and biomedical technology.",
};

export default async function ResearchAreasPage() {
  const domains = await getDomains();
  return (
    <>
      <PageHeader
        eyebrow="Research Areas"
        title="Interdisciplinary research domains"
        intro="MIT Bengaluru's research is organised around interconnected domains that combine fundamental enquiry with applied, industry-relevant outcomes. Use the search to find areas by application or capability."
      />
      <section className="container-prose py-14 md:py-16">
        <DomainDirectory domains={domains} />
      </section>
    </>
  );
}
