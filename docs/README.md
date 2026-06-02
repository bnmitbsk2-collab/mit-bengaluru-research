# MIT Bengaluru Research & Consultancy Portal — Documentation Index

| Document | Purpose | Audience |
|----------|---------|----------|
| [IMPLEMENTATION-BLUEPRINT.md](./IMPLEMENTATION-BLUEPRINT.md) | Final system design, demo vs production, deployment, cutover | Architects, tech leads |
| [FEATURE-PRIORITY-MATRIX.md](./FEATURE-PRIORITY-MATRIX.md) | MoSCoW + impact/effort prioritisation | Product, directors, PM |
| [ADMIN-MODULES.md](./ADMIN-MODULES.md) | CMS admin screens, roles, workflows | Research office, developers |
| [DATABASE-SCHEMA.md](./DATABASE-SCHEMA.md) | Tables, fields, relationships | DBAs, backend developers |
| [DEVELOPMENT-ROADMAP.md](./DEVELOPMENT-ROADMAP.md) | Sprint plan for designers & developers | Full project team |
| [DEMO-TO-PRODUCTION.md](./DEMO-TO-PRODUCTION.md) | Free demo deploy now → real data after approval | Everyone |

## Current build status

| Layer | Demo (now) | Production (post-approval) |
|-------|------------|----------------------------|
| Frontend | Next.js 15 — **live in this repo** | Same codebase |
| Content | `src/data/*` sample data via `@/lib/content` | Payload CMS API |
| Database | None (static) | PostgreSQL |
| Enquiries | `POST /api/enquiry` → local JSON log | CMS collection + email |
| Admin | Not yet | Payload admin UI + SSO |
| Hosting | Vercel / Netlify (free) | Institutional or managed cloud |
| AI | None | Phase 2 (grounded RAG) |

## Quick start

```bash
cp .env.example .env.local   # PORTAL_MODE=demo
npm install && npm run dev   # http://localhost:3000
```

See root [README.md](../README.md) for deployment steps.
