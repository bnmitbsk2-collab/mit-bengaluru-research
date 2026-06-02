# 1. Final Implementation Blueprint

**Project:** MAHE / MIT Bengaluru Research & Consultancy Web Portal  
**Version:** 1.0 — Demo → Production path  
**Status:** Demo build complete; awaiting director approval for CMS + real data

---

## 1.1 Purpose

This blueprint defines how to operate the portal in **two modes**:

| Mode | When | Content | Admin | Database |
|------|------|---------|-------|----------|
| **Demo** | Now — director review | Sample data in `src/data/*` | None | None |
| **Production** | After approval | Payload CMS + PostgreSQL | Full RBAC admin | PostgreSQL |

The demo proves UX, information architecture, and collaboration pathways **without** institutional data risk. Production swaps the data layer only — the frontend and design system remain unchanged.

---

## 1.2 System context

```mermaid
flowchart TB
  subgraph public [Public Layer]
    WEB[Next.js Frontend]
    VIS[Industry / Agencies / Students / Visitors]
  end

  subgraph demo [Demo Mode — Current]
    STATIC[src/data sample JSON]
    ENQ1[/api/enquiry → local log]
  end

  subgraph prod [Production Mode — Post Approval]
    CMS[Payload CMS Admin]
    PG[(PostgreSQL)]
    S3[Object Storage]
    SSO[MAHE SSO]
    ENQ2[Enquiry Collection + Email]
    SEARCH[Typesense / Postgres FTS]
  end

  VIS --> WEB
  WEB -->|demo| STATIC
  WEB -->|demo| ENQ1
  WEB -->|production| CMS
  CMS --> PG
  CMS --> S3
  CMS --> SSO
  WEB -->|production| ENQ2
  WEB --> SEARCH
  PG --> SEARCH
```

---

## 1.3 Layered architecture

### Layer 1 — Presentation (built ✅)
- **Next.js 15** App Router, TypeScript, Tailwind v4
- Reusable components: header, footer, cards, filters, forms, icons
- 33+ static pages: home, directories, detail pages, consultancy, contact
- SEO metadata, accessibility, responsive layout
- Demo banner when `PORTAL_MODE=demo`

### Layer 2 — Content access (built ✅, extensible)
- **`@/lib/content`** — single import point for all pages
- **`@/lib/config`** — `PORTAL_MODE`, CMS URL, feature flags
- Demo: re-exports from `src/data/*`
- Production: replace with CMS API fetchers (same function signatures)

### Layer 3 — Application services (partial ✅)
- **`POST /api/enquiry`** — validation, reference number, logging
- Production: write to CMS `consultancy_enquiries` + notify research office

### Layer 4 — CMS & data (Phase 1 post-approval)
- **Payload CMS** on Node.js
- **PostgreSQL** (Neon / Supabase / institutional)
- **S3-compatible storage** for PDFs, photos, reports
- Draft → Review → Publish workflow
- SSO via MAHE Entra ID / Google Workspace

### Layer 5 — Search & AI (Phase 2)
- Typesense or Meilisearch + pgvector
- Grounded RAG assistant (published content only)
- Enquiry classification & routing suggestions

---

## 1.4 Demo deployment architecture (free, now)

```
GitHub repo
    │
    ▼
Vercel (free tier)
    ├── Build: npm run build (generates PDF brochures via prebuild)
    ├── Env: PORTAL_MODE=demo
    ├── Output: *.vercel.app URL for director/stakeholders
    └── API route: /api/enquiry (works on Vercel serverless)
```

**No database cost. No CMS cost. No SSO.** Suitable for 2–8 weeks of review.

### Demo deployment checklist
- [ ] Push repo to GitHub
- [ ] Import to Vercel → set `PORTAL_MODE=demo`
- [ ] Share URL with Research Office + Director
- [ ] Collect feedback on IA, copy tone, enquiry flow, consultancy pathways
- [ ] Document change requests in GitHub Issues

---

## 1.5 Production deployment architecture (post-approval)

```
                    ┌─────────────────┐
                    │  MAHE SSO       │
                    └────────┬────────┘
                             │
┌──────────────┐    ┌────────▼────────┐    ┌──────────────┐
│ Vercel       │◄──►│ Payload CMS     │◄──►│ PostgreSQL   │
│ Next.js      │    │ (Render/Fly/VPC)│    │ (Neon/RDS)   │
└──────────────┘    └────────┬────────┘    └──────────────┘
                             │
                    ┌────────▼────────┐
                    │ S3 / R2         │
                    │ photos, PDFs    │
                    └─────────────────┘
```

### Production cutover checklist
- [ ] Director approval documented
- [ ] Provision PostgreSQL + Payload CMS
- [ ] Define Payload collections matching [DATABASE-SCHEMA.md](./DATABASE-SCHEMA.md)
- [ ] Migrate sample schema → empty production collections
- [ ] Import real faculty data (CSV/ORCID-assisted + manual review)
- [ ] Configure SSO for admin users
- [ ] Set `PORTAL_MODE=production`, `CMS_URL`, `CMS_API_KEY` on Vercel
- [ ] Update `@/lib/content` fetchers to CMS API
- [ ] Wire enquiries to CMS + email notifications
- [ ] Remove demo banner (`NEXT_PUBLIC_DEMO_BANNER=false`)
- [ ] UAT with Research Office → go-live

---

## 1.6 Integration points

| Integration | Demo | Production |
|-------------|------|------------|
| Content | Static TS modules | Payload REST/GraphQL |
| Media | `/public/*` | S3 + CDN URLs |
| Enquiries | `data/enquiries.json` (local) | CMS collection + SMTP/Teams |
| Auth (public) | None | None |
| Auth (admin) | N/A | SSO + Payload roles |
| Revalidation | Static at build | On-demand ISR webhook on publish |
| Analytics | Optional Plausible | Plausible + enquiry dashboard |

---

## 1.7 Security model

| Surface | Control |
|---------|---------|
| Public site | Read-only; rate-limited forms; hCaptcha (Phase 1 prod) |
| Admin CMS | SSO + MFA; RBAC; audit log |
| API keys | Server-only env vars; never `NEXT_PUBLIC_*` |
| Enquiry PII | Encrypted at rest (DB); not indexed for AI |
| Draft content | Never exposed to public API or search index |

---

## 1.8 Non-functional requirements

| Requirement | Target |
|-------------|--------|
| Page load (LCP) | < 2.5s on 4G |
| Uptime | 99.5% (managed hosting) |
| Accessibility | WCAG 2.1 AA |
| Data backup | Daily DB snapshots (production) |
| Audit retention | 3 years for content changes |
| Concurrent editors | 20+ (CMS handles) |

---

## 1.9 Repository structure (target)

```
Consultancy/
├── docs/                    ← this blueprint set
├── public/
│   ├── brochures/           ← generated PDFs
│   └── researchers/         ← faculty photos (production)
├── scripts/
│   └── generate-brochures.mjs
├── src/
│   ├── app/                 ← routes
│   ├── components/
│   ├── data/                ← demo sample data only
│   └── lib/
│       ├── config.ts        ← PORTAL_MODE
│       └── content/         ← unified data access
├── payload/                 ← Phase 1: CMS schema (new)
│   └── collections/
└── .env.example
```

---

## 1.10 Decision log

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Frontend | Next.js | Already built; ISR; SEO; team familiarity |
| CMS | Payload CMS | Schema-as-code; RBAC; self-hostable; TypeScript |
| Database | PostgreSQL | Relational model; FTS; pgvector for Phase 2 |
| Demo hosting | Vercel free | Zero cost; instant preview URLs |
| Custom admin | No (Phase 1) | CMS admin covers 90% of needs |
| AI | Phase 2 only | Governance requires approved content first |

---

## 1.11 Success criteria

### Demo success (director review)
- Stakeholders can navigate all 7 primary sections without guidance
- Industry partner persona finds an expert and submits enquiry in < 3 minutes
- Research Office confirms enquiry categories match their workflow
- Design approved as "institutional, not startup"

### Production success (6 months post go-live)
- 80%+ faculty profiles published via workflow (not developer edits)
- Enquiry response SLA tracked in CMS
- Zero draft/sensitive data leaks to public site
- Search returns relevant expert for test queries in top 3 results
