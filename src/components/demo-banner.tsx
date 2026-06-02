import { portalConfig } from "@/lib/config";

export function DemoBanner() {
  if (!portalConfig.demoBanner) return null;

  return (
    <div
      role="status"
      className="border-b border-amber-200 bg-amber-50 px-4 py-2 text-center text-xs text-amber-900 md:text-sm"
    >
      <strong>Demonstration portal</strong> — content is illustrative sample data for
      director review. After approval, this site will connect to the institutional CMS
      and real faculty/project data.{" "}
      <a href="/docs" className="font-semibold underline hover:text-amber-950">
        View implementation blueprint
      </a>
    </div>
  );
}
