import type { Metadata } from "next";
import { PageHeader, SectionHeading } from "@/components/ui";
import { FacilityCard } from "@/components/cards";
import { getDomains, getFacilities } from "@/lib/content";

export const metadata: Metadata = {
  title: "Centres, Labs & Facilities",
  description:
    "Specialised centres, laboratories, and facilities at MIT Bengaluru offering equipment, testing, and development capability for research and industry.",
};

const types = ["Centre", "Laboratory", "Facility"] as const;

export default async function FacilitiesPage() {
  const [facilities, domains] = await Promise.all([getFacilities(), getDomains()]);
  const domainTitle = (slug: string) => domains.find((d) => d.slug === slug)?.title;

  return (
    <>
      <PageHeader
        eyebrow="Centres, Labs & Facilities"
        title="Research centres and laboratories"
        intro="Specialised infrastructure supporting applied research, testing, characterisation, and prototyping. Facilities are available to academic and industry partners through scheduled access and collaborative arrangements."
      />
      <section className="container-prose py-14 md:py-16">
        {types.map((type) => {
          const items = facilities.filter((f) => f.type === type);
          if (items.length === 0) return null;
          return (
            <div key={type} className="mb-14 last:mb-0">
              <SectionHeading
                eyebrow={`${items.length} ${type}${items.length > 1 ? "s" : ""}`}
                title={
                  type === "Centre"
                    ? "Research Centres"
                    : type === "Laboratory"
                      ? "Laboratories"
                      : "Facilities"
                }
              />
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((f) => (
                  <FacilityCard
                    key={f.slug}
                    facility={f}
                    domainTitle={domainTitle(f.domain)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
}
