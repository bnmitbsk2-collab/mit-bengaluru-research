import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/icon";
import { Avatar, Badge, Breadcrumbs, ButtonLink } from "@/components/ui";
import {
  getDomain,
  getFacilities,
  getFacility,
  getResearcher,
} from "@/lib/content";

export async function generateStaticParams() {
  try {
    const facilities = await getFacilities();
    return facilities.map((f) => ({ slug: f.slug }));
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
  const f = await getFacility(slug);
  if (!f) return {};
  return { title: f.name, description: f.summary };
}

function ListBlock({
  title,
  icon,
  items,
}: {
  title: string;
  icon: "check" | "facility" | "advisory";
  items: string[];
}) {
  return (
    <div className="rounded-lg border border-ink-100 bg-white p-6">
      <h3 className="font-serif text-lg font-semibold text-ink-900">{title}</h3>
      <ul className="mt-4 space-y-3">
        {items.map((i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-ink-700">
            <Icon name={icon} size={18} className="mt-0.5 shrink-0 text-accent-600" />
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function FacilityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const f = await getFacility(slug);
  if (!f) notFound();

  const domain = await getDomain(f.domain);
  const lead = f.leadSlug ? await getResearcher(f.leadSlug) : undefined;

  return (
    <>
      <section className="border-b border-ink-100 bg-ink-950 text-white">
        <div className="hairline-grid">
          <div className="container-prose py-12 md:py-16">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Centres & Labs", href: "/facilities" },
                { label: f.name },
              ]}
            />
            <div className="mt-6 flex items-center gap-2">
              <Badge>{f.type}</Badge>
              {domain && (
                <Link
                  href={`/research-areas/${domain.slug}`}
                  className="text-sm font-medium text-accent-300 hover:text-accent-300"
                >
                  {domain.title}
                </Link>
              )}
            </div>
            <h1 className="mt-3 max-w-3xl font-serif text-3xl font-semibold leading-tight md:text-4xl">
              {f.name}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-200">
              {f.summary}
            </p>
          </div>
        </div>
      </section>

      <div className="container-prose grid gap-12 py-14 md:py-16 lg:grid-cols-[1.5fr_0.5fr]">
        <div>
          <h2 className="font-serif text-2xl font-semibold text-ink-900">About</h2>
          {f.description.map((p, i) => (
            <p key={i} className="mt-4 text-base leading-relaxed text-ink-600">
              {p}
            </p>
          ))}

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <ListBlock title="Capabilities" icon="check" items={f.capabilities} />
            <ListBlock title="Key equipment" icon="facility" items={f.equipment} />
          </div>

          <div className="mt-5">
            <ListBlock title="Services offered" icon="advisory" items={f.services} />
          </div>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          {lead && (
            <div className="rounded-lg border border-ink-100 bg-sand-50 p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-500">
                Facility lead
              </h3>
              <Link
                href={`/researchers/${lead.slug}`}
                className="group mt-4 flex items-center gap-3"
              >
                <Avatar name={lead.name} src={lead.photo} size={48} />
                <span>
                  <span className="block font-serif font-semibold text-ink-900 group-hover:text-accent-700">
                    {lead.name}
                  </span>
                  <span className="block text-xs text-ink-500">{lead.designation}</span>
                </span>
              </Link>
            </div>
          )}
          <div className="rounded-lg border border-ink-100 bg-white p-6">
            <h3 className="font-serif text-base font-semibold text-ink-900">
              Request facility access
            </h3>
            <p className="mt-2 text-sm text-ink-600">
              Submit a request to use this facility for testing, characterisation,
              or development.
            </p>
            <div className="mt-4">
              <ButtonLink
                href={`/contact?category=Facility+%26+Lab+Access&facility=${encodeURIComponent(f.name)}`}
              >
                Request access
              </ButtonLink>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
