/**
 * Portal runtime configuration.
 *
 * DEMO (default): sample data from src/data/*, enquiries logged locally,
 *                 demo banner visible, free Vercel/Netlify deployment.
 *
 * PRODUCTION (after director approval): set PORTAL_MODE=production and
 *                 CMS_* env vars; content loads from Payload CMS + PostgreSQL.
 */

export type PortalMode = "demo" | "production";

/** Server-only mode (DATABASE_URI, CMS routing) */
const serverPortalMode = (process.env.PORTAL_MODE ?? "demo") as PortalMode;

/** Client-safe mode — must match server HTML in "use client" components */
const clientPortalMode = (
  process.env.NEXT_PUBLIC_PORTAL_MODE ?? serverPortalMode
) as PortalMode;

export const portalConfig = {
  mode: serverPortalMode,
  siteName: "MIT Bengaluru — Research & Consultancy",
  institution: "Manipal Academy of Higher Education (MAHE)",

  /** Shown when mode === "demo" */
  demoBanner:
    process.env.NEXT_PUBLIC_DEMO_BANNER !== "false" &&
    clientPortalMode === "demo",

  cms: {
    url: process.env.CMS_URL ?? "",
    apiKey: process.env.CMS_API_KEY ?? "",
  },

  enquiry: {
    /** demo: file log; production: CMS collection + email */
    notifyEmail: process.env.ENQUIRY_NOTIFY_EMAIL ?? "research.blr@example.mit.mahe.edu",
  },
} as const;

/** Use in client components — reads NEXT_PUBLIC_PORTAL_MODE */
export const isDemo = clientPortalMode === "demo";
export const isProduction = serverPortalMode === "production";

/** True when PostgreSQL + Payload should serve content */
export const useCms =
  isProduction && Boolean(process.env.DATABASE_URI?.trim());
