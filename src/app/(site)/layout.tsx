import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { DemoBanner } from "@/components/demo-banner";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.CMS_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"),
  ),
  title: {
    default: "MIT Bengaluru — Research & Consultancy Portal | MAHE",
    template: "%s | MIT Bengaluru Research & Consultancy",
  },
  description:
    "Research excellence, faculty expertise, laboratories, consultancy, and industry collaboration at Manipal Institute of Technology Bengaluru, MAHE.",
  keywords: [
    "MIT Bengaluru research",
    "MAHE consultancy",
    "sponsored research",
    "industry collaboration",
    "faculty experts",
    "research laboratories",
  ],
  openGraph: {
    title: "MIT Bengaluru — Research & Consultancy Portal",
    description:
      "Discover research strengths, experts, facilities, and consultancy pathways at MIT Bengaluru, MAHE.",
    type: "website",
  },
};

export const revalidate = 60;
export const dynamic = "force-dynamic";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-ink-900 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <SiteHeader />
        <DemoBanner />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
