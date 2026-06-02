# MIT Bengaluru — Research & Consultancy Web Portal

A production-ready, content-rich research and consultancy portal for **Manipal Institute of Technology Bengaluru (MAHE)**. Built with **Next.js (App Router) + TypeScript + Tailwind CSS v4**, with a premium, scholarly design language, reusable components, and a CMS-ready content architecture.

> All content in this build is **illustrative sample data** for demonstration. It is structured to map cleanly onto a future CMS or institutional researcher database.

---

## 1. Project Vision

A premium academic digital experience that positions MIT Bengaluru as a credible applied-research and consultancy destination. The portal helps five audiences act:

- **Industry partners** → discover expertise and clear consultancy pathways.
- **Funding agencies / collaborators** → assess research credibility and funded-project track record.
- **Prospective scholars / interns** → find supervisors and research areas.
- **Faculty / internal researchers** → present profiles, output, and collaboration interests.
- **Startups & innovation partners** → access facilities and co-development models.

The experience is **research-first**: editorial layout, structured information hierarchy, and outcome-focused copy instead of marketing hype.

## 2. Design Direction

- **Tone:** professional, scholarly, trustworthy, modern, structured.
- **Typography:** `Source Serif 4` (editorial headings) + `Inter` (body/UI).
- **Palette:** deep institutional navy (`ink`), restrained burnt-amber accent (`accent`), warm paper neutrals (`sand`). No SaaS gradients, neon, or glow.
- **Layout:** generous whitespace, hairline borders, card-based modules, subtle shadows on hover, a fine "hairline grid" texture on dark institutional bands.
- **Accessibility:** semantic HTML, skip-to-content link, labelled form controls, focus-visible states, ARIA on navigation, keyboard-operable filters.

## 3. Information Architecture

```
Home
├── Research Areas (directory + search)
│   └── /research-areas/[slug]      → domain detail (experts, labs, projects)
├── Researchers (directory + filters)
│   └── /researchers/[slug]         → full faculty profile
├── Centres & Labs (grouped by type)
│   └── /facilities/[slug]          → facility detail + access request
├── Consultancy (services, models, process, partners)
├── Projects & Publications (tabs: projects / publications / patents)
└── Contact (category-routed enquiry form)
```

## 4. Homepage Structure (10 sections, in order)

1. **Hero** — institutional headline + quick "engage with us" actions.
2. **Research impact metrics strip** — researchers, funding, projects, patents, facilities, collaborations.
3. **Featured research domains** — top domains as cards.
4. **Centres & labs spotlight** — featured facilities.
5. **Faculty expert preview** — featured researchers.
6. **Consultancy & industry engagement** — eight service types on a dark band.
7. **Projects, grants, publications & IP highlights** — counts + recent highlights.
8. **Collaboration models & partner ecosystem** — four models + four partner categories.
9. **News, events & announcements** — dated cards.
10. **Final CTA & enquiry** — routes to the contact form + brochure placeholder.

## 5. Inner Pages

- **Research Areas:** searchable directory; each domain page lists overview, focus, applications, related researchers, labs, and funded projects.
- **Researchers:** searchable/filterable directory (by area + department); profile pages include photo (initials avatar), designation, department, interests, expertise keywords, publications, patents/IP, funded projects, consultancy areas, collaboration interests, and contact/enquiry CTAs.
- **Centres, Labs & Facilities:** grouped by Centre / Laboratory / Facility; detail pages cover capabilities, equipment, services, facility lead, and a pre-filled access-request CTA.
- **Consultancy:** all eight service categories with deliverables, engagement models, a four-step process, and partner ecosystem.
- **Projects & Publications:** tabbed explorer (Projects / Publications / Patents) with search + research-area filter, plus headline stats and a brochure placeholder.
- **Contact:** category-routed enquiry form with deep-link pre-fill (expert, category, facility).

## 6. Core Features

- Responsive (mobile / tablet / desktop) with a mobile nav drawer.
- Client-side search & filters for experts, areas, projects, publications, and patents.
- Category-based enquiry workflow backed by a real **`POST /api/enquiry`** route (server-side validation, returns a reference like `ENQ-XXXX`); deep links such as `/contact?category=Sponsored+Research` and `/contact?expert=Dr.%20Ananya%20Rao` auto-fill the form.
- Real downloadable **PDF brochures** generated at build time (`public/brochures/`).
- **Photo support**: researcher avatars render a real headshot when `photo` is set, with an initials fallback otherwise.
- News & event cards.
- SEO-ready: per-page metadata, title templates, Open Graph, semantic headings.
- Static generation (SSG) for all directory and detail pages.

## 7. Data / CMS Structure

All content lives in typed modules under `src/data/` and conforms to interfaces in `src/lib/types.ts`. These map directly to future CMS collections / DB tables:

| Collection      | Key fields |
|-----------------|------------|
| `ResearchDomain`| `slug, title, summary, description[], highlights[], applications[], icon` |
| `Researcher`    | `slug, name, designation, department, domains[], researchInterests[], expertiseKeywords[], publications[], patents[], projects[], consultancyAreas[], collaborationInterests[], email` |
| `Facility`      | `slug, name, type, domain, summary, capabilities[], equipment[], services[], leadSlug` |
| `Project`       | `title, piSlug, coInvestigators[], fundingAgency, amountLakh, status, startYear, endYear, domain` |
| `Publication`   | `title, authors[], venue, year, type, doi, domain` |
| `Patent`        | `title, inventors[], applicationNo, status, year, domain` |
| `ConsultancyService` | `title, icon, description, deliverables[]` |
| `NewsItem`      | `slug, title, date, type, summary` |

Relationships are by slug/id, so swapping the data layer for an API (e.g. Strapi, Sanity, Payload, or a Postgres/Prisma backend) only requires replacing the `getX()` helpers.

**Suggested enquiry submission schema** (for when you add a backend):
`category, name, role, organisation, orgType, email, phone, domain, expert, facility, timeline, message, consent, createdAt, status`.

## 8. Sample Hero Copy

> **Applied research and expertise, ready for industry collaboration.**
> MIT Bengaluru connects faculty researchers, specialised laboratories, and consultancy services with industry, funding agencies, and academic partners — across engineering and applied sciences.

## 9. Recommended Tech Stack

- **Framework:** Next.js 15 (App Router) + React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Fonts:** Source Serif 4 + Inter (Google Fonts)
- **Hosting:** Vercel (recommended), Netlify, or any static host (via `output: export`)
- **Future:** add a headless CMS or DB + an API route for enquiry submissions.

## 10. Final Notes

- **Replace sample data** in `src/data/*`.
- **Add researcher photos:** drop images into `public/researchers/` and set `photo: "/researchers/<file>.jpg"` on the researcher record. Without it, a styled initials avatar is used.
- **Enquiry submissions:** handled by `src/app/api/enquiry/route.ts`. It validates and logs each enquiry, and best-effort appends to `data/enquiries.json` in local/dev. For production, extend it to send email or write to a CRM/CMS (it already returns a reference number).
- **Brochures:** generated by `scripts/generate-brochures.mjs` (runs automatically via the `prebuild` script) into `public/brochures/`. Replace them with official PDFs anytime.
- The architecture is intentionally modular so content can scale to hundreds of researchers and projects.

---

## Project structure

```
src/
├── app/                      # routes (App Router)
│   ├── page.tsx              # homepage
│   ├── research-areas/       # directory + [slug]
│   ├── researchers/          # directory + [slug]
│   ├── facilities/           # listing + [slug]
│   ├── consultancy/
│   ├── projects/
│   ├── contact/
│   ├── layout.tsx, globals.css, not-found.tsx
├── components/               # header, footer, cards, ui, filters, form, icons
├── data/                     # demo sample content only
└── lib/
    ├── config.ts             # PORTAL_MODE demo | production
    └── content/              # unified data access (swap to CMS later)
docs/                         # implementation blueprint (see below)
```

## Implementation blueprint

Full architecture documentation for demo → production:

| Document | Description |
|----------|-------------|
| [docs/IMPLEMENTATION-BLUEPRINT.md](./docs/IMPLEMENTATION-BLUEPRINT.md) | System design, demo vs production, cutover |
| [docs/FEATURE-PRIORITY-MATRIX.md](./docs/FEATURE-PRIORITY-MATRIX.md) | MoSCoW priorities by phase |
| [docs/ADMIN-MODULES.md](./docs/ADMIN-MODULES.md) | 15 CMS admin modules + workflows |
| [docs/DATABASE-SCHEMA.md](./docs/DATABASE-SCHEMA.md) | Tables, fields, relationships |
| [docs/DEVELOPMENT-ROADMAP.md](./docs/DEVELOPMENT-ROADMAP.md) | Designer & developer sprint plan |
| [docs/DEMO-TO-PRODUCTION.md](./docs/DEMO-TO-PRODUCTION.md) | Free deploy now → real data after approval |

**In-app summary:** [http://localhost:3000/docs](/docs) (stakeholder-friendly blueprint page)

### Demo vs production modes

```bash
cp .env.example .env.local
# PORTAL_MODE=demo          ← default, sample data, demo banner
# PORTAL_MODE=production    ← after director approval + CMS setup
```

All pages import content via `@/lib/content` — switching to CMS is a single-layer change after approval.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

Requires Node.js 18.18+ (built and tested on Node 22).

---

## Free deployment

### Option A — Vercel (recommended, zero config)

1. Push this folder to a **GitHub** repository:
   ```bash
   git init
   git add .
   git commit -m "MIT Bengaluru research & consultancy portal"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo>.git
   git push -u origin main
   ```
2. Go to **https://vercel.com** → sign in with GitHub → **Add New → Project**.
3. Import the repository. Vercel auto-detects Next.js — leave defaults (Build: `next build`).
4. Click **Deploy**. You get a free `*.vercel.app` URL. Every push to `main` redeploys automatically.

### Option B — Netlify (free)

1. Push to GitHub (as above).
2. Go to **https://app.netlify.com** → **Add new site → Import an existing project** → pick the repo.
3. Build command: `npm run build`. Netlify's Next.js runtime handles the rest. Deploy.

### Option C — Fully static (GitHub Pages / any static host)

This portal has no server-side data, so it can export to static HTML.

1. Add to `next.config.mjs`:
   ```js
   const nextConfig = { reactStrictMode: true, output: "export", images: { unoptimized: true } };
   ```
2. Build and export:
   ```bash
   npm run build
   ```
   The static site is generated in the `out/` folder.
3. Deploy `out/` to GitHub Pages, Cloudflare Pages, or any static host. (For GitHub Pages under a sub-path, also set `basePath`/`assetPrefix` to your repo name.)

> Note: the enquiry form posts to the `/api/enquiry` route, which needs a server runtime — so **Vercel or Netlify is recommended**. If you choose the fully static export (Option C), the API route won't run; point the form at a third-party form service (e.g. Formspree) instead.

Set `PORTAL_MODE=demo` on Vercel for director review. See [docs/DEMO-TO-PRODUCTION.md](./docs/DEMO-TO-PRODUCTION.md) for the full cutover guide after approval.
