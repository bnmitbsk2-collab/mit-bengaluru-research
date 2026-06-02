"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navItems, demoNavItems } from "@/lib/nav";
import { isDemo } from "@/lib/config";
import { Icon } from "@/components/icon";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-ink-100 bg-white/90 backdrop-blur">
      <div className="container-prose flex h-16 items-center justify-between gap-4 md:h-20">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-ink-900 font-serif text-lg font-bold text-white">
            M
          </span>
          <span className="leading-tight">
            <span className="block font-serif text-base font-semibold text-ink-900 md:text-lg">
              MIT Bengaluru
            </span>
            <span className="block text-[11px] font-medium uppercase tracking-wider text-ink-500">
              Research &amp; Consultancy
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? "text-accent-700"
                  : "text-ink-600 hover:text-ink-900"
              }`}
            >
              {item.label}
            </Link>
          ))}
          {isDemo &&
            demoNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "text-accent-700"
                    : "text-ink-500 hover:text-ink-800"
                }`}
              >
                {item.label}
              </Link>
            ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-md bg-accent-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-700"
          >
            Start an Enquiry
            <Icon name="arrow" size={16} />
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-ink-700 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? "close" : "menu"} size={24} />
        </button>
      </div>

      {open && (
        <div className="border-t border-ink-100 bg-white lg:hidden">
          <nav className="container-prose flex flex-col py-3" aria-label="Mobile">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-md px-3 py-3 text-sm font-medium ${
                  isActive(item.href)
                    ? "bg-ink-50 text-accent-700"
                    : "text-ink-700 hover:bg-ink-50"
                }`}
              >
                {item.label}
              </Link>
            ))}
            {isDemo &&
              demoNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-md px-3 py-3 text-sm font-medium ${
                    isActive(item.href)
                      ? "bg-ink-50 text-accent-700"
                      : "text-ink-500 hover:bg-ink-50"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-accent-600 px-4 py-3 text-sm font-semibold text-white"
            >
              Start an Enquiry
              <Icon name="arrow" size={16} />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
