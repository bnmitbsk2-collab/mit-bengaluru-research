import Link from "next/link";
import { Icon } from "@/components/icon";
import { getDomains } from "@/lib/content";
import { navItems } from "@/lib/nav";

export async function SiteFooter() {
  const domains = await getDomains();

  return (
    <footer className="mt-24 border-t border-ink-100 bg-ink-950 text-ink-200">
      <div className="container-prose grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-white font-serif text-lg font-bold text-ink-900">
              M
            </span>
            <span className="leading-tight">
              <span className="block font-serif text-base font-semibold text-white">
                MIT Bengaluru
              </span>
              <span className="block text-[11px] uppercase tracking-wider text-ink-400">
                Research &amp; Consultancy
              </span>
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-300">
            Manipal Institute of Technology Bengaluru, Manipal Academy of Higher
            Education (MAHE). Connecting industry, academia, and funding agencies
            with applied research and expertise.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-400">
            Explore
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-ink-300 hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-400">
            Research Areas
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {domains.slice(0, 6).map((d) => (
              <li key={d.slug}>
                <Link
                  href={`/research-areas/${d.slug}`}
                  className="text-ink-300 hover:text-white"
                >
                  {d.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-400">
            Contact
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-ink-300">
            <li className="flex items-start gap-2">
              <Icon name="pin" size={18} className="mt-0.5 shrink-0 text-ink-400" />
              <span>
                MIT Bengaluru Campus, Yelahanka,
                <br /> Bengaluru, Karnataka, India
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Icon name="mail" size={18} className="shrink-0 text-ink-400" />
              <a href="mailto:research.blr@manipal.edu" className="hover:text-white">
                research.blr@manipal.edu
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Icon name="phone" size={18} className="shrink-0 text-ink-400" />
              <span>+91 80 0000 0000</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ink-800">
        <div className="container-prose flex flex-col items-center justify-between gap-2 py-6 text-xs text-ink-400 md:flex-row">
          <p suppressHydrationWarning>
            &copy; {new Date().getFullYear()} Manipal Academy of Higher Education,
            Bengaluru.
          </p>
          <p>Research &amp; Consultancy Portal — MAHE MIT Bengaluru</p>
        </div>
      </div>
    </footer>
  );
}
