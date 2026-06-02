import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "@/components/icon";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-2 font-serif text-2xl font-semibold text-ink-900 md:text-3xl">
        {title}
      </h2>
      {intro && <p className="mt-3 text-base leading-relaxed text-ink-600">{intro}</p>}
    </div>
  );
}

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-ink-200 bg-ink-50 px-2.5 py-0.5 text-xs font-medium text-ink-600">
      {children}
    </span>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const tone =
    status === "Ongoing" || status === "Granted"
      ? "border-accent-200 bg-accent-50 text-accent-700"
      : status === "Completed"
        ? "border-ink-200 bg-ink-50 text-ink-600"
        : "border-ink-200 bg-white text-ink-600";
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${tone}`}>
      {status}
    </span>
  );
}

const avatarColors = [
  "bg-ink-700",
  "bg-accent-700",
  "bg-ink-800",
  "bg-accent-600",
  "bg-ink-600",
];

export function Avatar({
  name,
  src,
  size = 56,
}: {
  name: string;
  src?: string;
  size?: number;
}) {
  if (src) {
    return (
      <Image
        src={src}
        alt={name}
        width={size}
        height={size}
        className="shrink-0 rounded-full object-cover"
        style={{ width: size, height: size }}
      />
    );
  }
  const initials = name
    .replace(/^Dr\.?\s+/i, "")
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const colorIndex =
    name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % avatarColors.length;
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full font-serif font-semibold text-white ${avatarColors[colorIndex]}`}
      style={{ width: size, height: size, fontSize: size * 0.38 }}
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
}) {
  const styles = {
    primary: "bg-accent-600 text-white hover:bg-accent-700",
    secondary: "border border-ink-200 bg-white text-ink-800 hover:border-ink-300 hover:bg-ink-50",
    ghost: "text-accent-700 hover:text-accent-800",
  }[variant];
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold transition-colors ${styles}`}
    >
      {children}
      <Icon name="arrow" size={16} />
    </Link>
  );
}

export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <section className="border-b border-ink-100 bg-ink-950 text-white">
      <div className="hairline-grid">
        <div className="container-prose py-14 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-300">
            {eyebrow}
          </p>
          <h1 className="mt-3 max-w-3xl font-serif text-3xl font-semibold leading-tight md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-200 md:text-lg">
            {intro}
          </p>
        </div>
      </div>
    </section>
  );
}

export function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-ink-500">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            {item.href ? (
              <Link href={item.href} className="hover:text-ink-800">
                {item.label}
              </Link>
            ) : (
              <span className="text-ink-700">{item.label}</span>
            )}
            {i < items.length - 1 && <span className="text-ink-300">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
