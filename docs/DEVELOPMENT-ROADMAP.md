# 5. Development Roadmap

Roadmap for **designers** and **developers** building the MIT Bengaluru Research & Consultancy portal from demo through production.

**Timeline assumption:** Director review (2–4 weeks) → Phase 1 production (10–12 weeks) → Phase 2 (12–16 weeks)

---

## 5.1 Team roles

| Role | Responsibility |
|------|----------------|
| **UX / UI Designer** | IA validation, component specs, admin UI patterns, accessibility |
| **Frontend Developer** | Next.js pages, components, CMS integration, search UI |
| **Backend / CMS Developer** | Payload collections, workflows, API, migrations |
| **Research Office SME** | Content rules, workflow approval, enquiry categories |
| **QA / UAT** | Test cases, accessibility audit, cross-browser |
| **DevOps** | Vercel, CMS hosting, DB, SSO, backups |

---

## 5.2 Phase 0 — Demo (COMPLETE ✅)

**Goal:** Stakeholder-ready demo on free hosting with sample data.

### Designer tasks ✅
- [x] Design system (typography, colour, spacing)
- [x] Homepage wireframe → hi-fi (10 sections)
- [x] Directory + detail page templates
- [x] Enquiry form UX + success state
- [x] Mobile navigation pattern
- [ ] *(Optional)* Admin UI moodboard for Phase 1 CMS screens

### Developer tasks ✅
- [x] Next.js scaffold + all public routes
- [x] Sample data layer (`src/data/*`)
- [x] Search/filter components
- [x] Enquiry API route
- [x] PDF brochure generation
- [x] Demo banner + `PORTAL_MODE` config
- [x] Content abstraction (`@/lib/content`)
- [x] Documentation blueprint set

### Deliverables ✅
- Live demo URL (Vercel)
- This docs folder
- Director review deck (use demo URL + screenshots)

### Designer specs to hand off for Phase 1
Document in Figma:
- Component library (match existing Tailwind tokens)
- Admin list/detail patterns for Payload
- Workflow status badges (draft, in review, published)
- Empty states for directories

---

## 5.3 Phase 0.5 — Director review (Weeks 1–4)

**Goal:** Collect approval and change requests before investing in CMS.

| Week | Designer | Developer | Stakeholder |
|------|----------|-----------|-------------|
| 1 | Fix visual feedback | Deploy demo to Vercel, share URL | Director + Research Office walkthrough |
| 2 | Revise copy/layout per feedback | Implement approved UI tweaks | Enquiry category validation |
| 3 | Finalise design tokens doc | Analytics stub (Plausible) | Confirm workflow roles |
| 4 | Sign-off design system v1 | Tag repo `demo-approved-v1` | **Director approval document** |

**Exit criteria:** Written approval to proceed to Phase 1 with real data.

---

## 5.4 Phase 1 — Production platform (Weeks 5–16)

**Goal:** CMS-backed portal with real institutional data, workflow, and enquiry routing.

### Sprint 1 (Weeks 5–6) — CMS foundation
**Developers:**
- [ ] Add `payload/` directory with Payload 3.x config
- [ ] PostgreSQL provision (Neon free → production instance)
- [ ] Collections: `users`, `roles`, `departments`, `research_areas`
- [ ] SSO plugin (Entra ID OIDC)
- [ ] Deploy CMS to Render/Railway

**Designers:**
- [ ] Admin dashboard wireframe
- [ ] Research area editor layout

### Sprint 2 (Weeks 7–8) — Researchers & workflow
**Developers:**
- [ ] `researchers` collection + `researcher_areas` relationship
- [ ] Workflow hooks: draft → in_review → published
- [ ] Field-level access (faculty vs coordinator)
- [ ] Media upload (photos → S3/R2)
- [ ] Migrate `@/lib/content` to CMS fetchers for researchers + areas

**Designers:**
- [ ] Researcher admin editor (tabbed UI spec)
- [ ] Review queue screen
- [ ] Profile page — verify with real photo aspect ratio

### Sprint 3 (Weeks 9–10) — Labs, projects, publications
**Developers:**
- [ ] Collections: `labs`, `projects`, `grants`, `publications`, `patents`
- [ ] Relationship fields + join tables
- [ ] Frontend pages wired to CMS (ISR + revalidation webhook)
- [ ] Migration script from demo data structure

**Designers:**
- [ ] Project/publication admin list filters
- [ ] Detail page updates for real data density

### Sprint 4 (Weeks 11–12) — Consultancy & enquiries
**Developers:**
- [ ] `consultancy_services`, `consultancy_enquiries` collections
- [ ] Update `/api/enquiry` → POST to Payload
- [ ] Email notification (Resend/SMTP)
- [ ] Enquiry inbox admin view + status transitions
- [ ] `news_events`, `documents`, `collaborations` collections

**Designers:**
- [ ] Enquiry triage board UI
- [ ] Email notification templates

### Sprint 5 (Weeks 13–14) — Search & content migration
**Developers:**
- [ ] Postgres FTS indexes
- [ ] Global `/search` page + API
- [ ] Import real faculty data (CSV template + manual QA)
- [ ] Import projects/publications (batch + review)
- [ ] Remove demo banner; `PORTAL_MODE=production`

**Designers:**
- [ ] Search results page (grouped by entity type)
- [ ] Loading/empty states

### Sprint 6 (Weeks 15–16) — UAT & go-live
**Developers:**
- [ ] Accessibility audit fixes
- [ ] Performance audit (Lighthouse)
- [ ] Backup/restore procedure
- [ ] Runbook documentation
- [ ] Production DNS + SSL

**All:**
- [ ] UAT with Research Office (test all workflows)
- [ ] Faculty pilot (5–10 profiles self-service)
- [ ] Go-live checklist sign-off

---

## 5.5 Phase 2 — Advanced (Weeks 17–32)

### Sprint 7–8 — Search upgrade
- [ ] Typesense/Meilisearch sync on publish
- [ ] Typo-tolerant search UI
- [ ] Related experts/labs/projects blocks

### Sprint 9–10 — AI layer (governed)
- [ ] pgvector embeddings for published content
- [ ] RAG assistant widget (cited, disclaimer, refuse rules)
- [ ] Enquiry auto-classification (suggestion only)
- [ ] Auto keyword tagging in draft mode
- [ ] AI audit logging

### Sprint 11–12 — Analytics & integrations
- [ ] Enquiry analytics dashboard
- [ ] ORCID/DOI import assist
- [ ] Duplicate detection for publications
- [ ] Leadership summary reports (aggregated)

---

## 5.6 Designer deliverables checklist

| Deliverable | Phase | Format |
|-------------|-------|--------|
| Design system doc | 0 ✅ | Figma + token table |
| Homepage hi-fi | 0 ✅ | Figma |
| Directory templates | 0 ✅ | Figma |
| Detail page templates | 0 ✅ | Figma |
| Mobile breakpoints | 0 ✅ | Figma |
| Admin dashboard | 1 | Figma |
| Workflow status UI | 1 | Figma components |
| Enquiry triage board | 1 | Figma |
| Search results page | 1 | Figma |
| Email templates | 1 | HTML mockups |
| AI assistant widget | 2 | Figma + copy doc |
| Accessibility audit report | 1 | Checklist |

---

## 5.7 Developer deliverables checklist

| Deliverable | Phase | Location |
|-------------|-------|----------|
| Public Next.js app | 0 ✅ | `src/app/` |
| Sample data | 0 ✅ | `src/data/` |
| Content abstraction | 0 ✅ | `src/lib/content/` |
| Enquiry API | 0 ✅ | `src/app/api/enquiry/` |
| Blueprint docs | 0 ✅ | `docs/` |
| Payload CMS | 1 | `payload/` |
| DB migrations | 1 | `payload/migrations/` |
| CMS → frontend fetchers | 1 | `src/lib/content/` |
| SSO config | 1 | Payload plugin |
| Search API | 1 | `src/app/api/search/` |
| Revalidation webhook | 1 | `src/app/api/revalidate/` |
| Migration scripts | 1 | `scripts/migrate-*.ts` |
| Typesense sync | 2 | `scripts/sync-search.ts` |
| RAG service | 2 | `src/lib/ai/` |

---

## 5.8 Testing strategy

| Layer | Phase 0 | Phase 1 | Phase 2 |
|-------|---------|---------|---------|
| Unit | Component tests | CMS hook tests | AI routing tests |
| Integration | Enquiry API | CMS API + frontend | Search sync |
| E2E | Playwright: submit enquiry | Playwright: full workflow | Playwright: AI assistant |
| Accessibility | axe on key pages | WCAG audit | Same |
| Performance | Lighthouse > 90 | Same + search latency | Vector query latency |
| Security | — | SSO, RBAC, pen test | AI prompt injection tests |

---

## 5.9 Definition of done

**User story done when:**
- [ ] Code reviewed and merged
- [ ] Responsive on mobile/tablet/desktop
- [ ] Accessible (keyboard, screen reader labels)
- [ ] Documented in relevant `docs/` file if architectural
- [ ] Deployed to staging and verified
- [ ] Research Office SME sign-off for workflow stories

---

## 5.10 Milestone calendar (Gantt summary)

```
Month 1    [Demo deploy ████████] [Director review ████████]
Month 2    [CMS setup ████] [Researchers/workflow ████████]
Month 3    [Labs/projects/pubs ████████] [Enquiries ████]
Month 4    [Search ████] [Data migration ████] [UAT ██] [Go-live ▲]
Month 5-6  [Typesense ████] [AI assistant ████████] [Analytics ████]
```

▲ = Production go-live target (end of Month 4, pending director approval date)
