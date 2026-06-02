import type { Metadata } from "next";
import { PageHeader } from "@/components/ui";
import { ResearcherDirectory } from "@/components/researcher-directory";
import { getDomains, getResearchers } from "@/lib/content";

export const metadata: Metadata = {
  title: "Researchers & Faculty Experts",
  description:
    "Browse and search MIT Bengaluru faculty researchers by name, research area, department, and expertise for consultancy and collaboration.",
};

export default async function ResearchersPage() {
  const [researchers, domains] = await Promise.all([getResearchers(), getDomains()]);
  return (
    <>
      <PageHeader
        eyebrow="Researchers & Faculty Experts"
        title="Faculty researcher directory"
        intro="Search faculty by expertise, research area, or department. Each profile lists publications, patents, funded projects, and consultancy areas, with a direct enquiry pathway."
      />
      <section className="container-prose py-14 md:py-16">
        <ResearcherDirectory researchers={researchers} domains={domains} />
      </section>
    </>
  );
}
