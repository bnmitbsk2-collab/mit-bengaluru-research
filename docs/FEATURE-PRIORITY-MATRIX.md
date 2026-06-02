# 2. Feature Priority Matrix

**Legend:**  
- **P0** = Must have (blocks launch)  
- **P1** = Should have (launch quality)  
- **P2** = Could have (Phase 2)  
- **P3** = Won't have now (future/backlog)

**Impact:** H = High institutional value · M = Medium · L = Low  
**Effort:** S = Small · M = Medium · L = Large

---

## 2.1 Master matrix

| # | Feature | Phase | Priority | Impact | Effort | Demo | Prod P1 | Prod P2 |
|---|---------|-------|----------|--------|--------|------|---------|---------|
| **Public portal** |
| 1 | Homepage (10 sections) | 0-Demo | P0 | H | M | ✅ | ✅ | ✅ |
| 2 | Research areas directory + detail | 0-Demo | P0 | H | M | ✅ | ✅ | ✅ |
| 3 | Researcher directory + profile | 0-Demo | P0 | H | M | ✅ | ✅ | ✅ |
| 4 | Centres/labs directory + detail | 0-Demo | P0 | H | M | ✅ | ✅ | ✅ |
| 5 | Consultancy services page | 0-Demo | P0 | H | S | ✅ | ✅ | ✅ |
| 6 | Projects/publications/patents explorer | 0-Demo | P0 | H | M | ✅ | ✅ | ✅ |
| 7 | Contact/enquiry form | 0-Demo | P0 | H | S | ✅ | ✅ | ✅ |
| 8 | PDF brochure downloads | 0-Demo | P1 | M | S | ✅ | ✅ | ✅ |
| 9 | Client-side search & filters | 0-Demo | P0 | H | M | ✅ | ✅ | ✅ |
| 10 | Responsive + accessible UI | 0-Demo | P0 | H | M | ✅ | ✅ | ✅ |
| 11 | SEO metadata | 0-Demo | P1 | M | S | ✅ | ✅ | ✅ |
| 12 | Demo banner + sample data label | 0-Demo | P0 | H | S | ✅ | — | — |
| **Content management** |
| 13 | Headless CMS (Payload) | 1 | P0 | H | L | — | ✅ | ✅ |
| 14 | PostgreSQL database | 1 | P0 | H | M | — | ✅ | ✅ |
| 15 | SSO admin login | 1 | P0 | H | M | — | ✅ | ✅ |
| 16 | Role-based access (6 roles) | 1 | P0 | H | M | — | ✅ | ✅ |
| 17 | Draft → Review → Publish workflow | 1 | P0 | H | M | — | ✅ | ✅ |
| 18 | Version history + audit log | 1 | P1 | H | M | — | ✅ | ✅ |
| 19 | Media library (photos, PDFs) | 1 | P0 | H | M | — | ✅ | ✅ |
| 20 | Faculty self-service profile draft | 1 | P1 | H | M | — | ✅ | ✅ |
| 21 | Scheduled publish (news/events) | 1 | P2 | M | S | — | ○ | ✅ |
| **Enquiries & operations** |
| 22 | Enquiry API + reference number | 0-Demo | P0 | H | S | ✅ | ✅ | ✅ |
| 23 | Enquiry → CMS collection | 1 | P0 | H | M | — | ✅ | ✅ |
| 24 | Email/Teams notification on enquiry | 1 | P0 | H | S | — | ✅ | ✅ |
| 25 | Enquiry triage board (statuses) | 1 | P1 | H | M | — | ✅ | ✅ |
| 26 | Assignment to faculty/dept owner | 1 | P1 | H | M | — | ✅ | ✅ |
| 27 | SLA tracking | 2 | P2 | M | M | — | — | ✅ |
| **Search & discovery** |
| 28 | Postgres full-text search | 1 | P1 | H | M | — | ✅ | ✅ |
| 29 | Global unified search page | 1 | P1 | H | M | — | ✅ | ✅ |
| 30 | Typesense/Meilisearch | 2 | P1 | H | M | — | — | ✅ |
| 31 | Semantic / AI expert discovery | 2 | P1 | H | L | — | — | ✅ |
| 32 | Related experts/labs/projects | 2 | P2 | M | M | — | ○ | ✅ |
| **Integrations** |
| 33 | ORCID / DOI publication import | 2 | P2 | M | M | — | — | ✅ |
| 34 | HR/faculty roster sync | 2 | P2 | M | L | — | — | ○ |
| 35 | Facility booking | 2 | P3 | M | L | — | — | ○ |
| **Analytics** |
| 36 | Privacy-friendly web analytics | 1 | P1 | M | S | — | ✅ | ✅ |
| 37 | Enquiry analytics dashboard | 2 | P1 | H | M | — | — | ✅ |
| **AI (governed)** |
| 38 | RAG navigation assistant | 2 | P1 | H | L | — | — | ✅ |
| 39 | Enquiry auto-classification | 2 | P1 | H | M | — | — | ✅ |
| 40 | Auto keyword tagging (draft) | 2 | P2 | M | M | — | — | ✅ |
| 41 | Profile/summary drafting assist | 2 | P2 | M | M | — | — | ✅ |
| 42 | Duplicate publication detection | 2 | P2 | M | M | — | — | ✅ |

✅ = included · ○ = optional · — = not in scope

---

## 2.2 MoSCoW by phase

### Phase 0 — Demo (current, free deploy)
**Must:** Public portal (items 1–11), enquiry form (22), demo labelling (12)  
**Should:** PDF brochures (8)  
**Won't:** CMS, SSO, real data, AI

### Phase 1 — Production launch (post director approval, ~8–12 weeks)
**Must:** CMS + DB (13–14), SSO + RBAC (15–16), workflow (17), media (19), enquiry CMS routing (23–24), Postgres search (28–29), analytics (36)  
**Should:** Version/audit (18), faculty self-service (20), triage board (25–26)  
**Could:** Scheduled publish (21)

### Phase 2 — Advanced (~3–6 months after P1)
**Must:** Typesense (30), RAG assistant (38), enquiry AI routing (39), enquiry analytics (37)  
**Should:** Semantic search (31), related recommendations (32), auto-tagging (40), duplicate detection (42)  
**Could:** ORCID import (33), profile assist (41), HR sync (34)

---

## 2.3 Impact vs effort quadrant

```
High Impact, Low Effort (DO FIRST in Phase 1)
├── Enquiry → CMS + email notifications
├── SSO login
├── Postgres FTS + global search page
└── Privacy analytics

High Impact, High Effort (PLAN CAREFULLY)
├── Payload CMS + full schema migration
├── Workflow engine (draft/review/publish)
├── RAG assistant (Phase 2)
└── Semantic expert discovery (Phase 2)

Low Impact, Low Effort (FILL GAPS)
├── Scheduled news publish
├── Brochure CMS upload
└── Testimonials module

Low Impact, High Effort (DEFER)
├── Facility booking system
├── HR ERP sync
└── Custom analytics BI warehouse
```

---

## 2.4 Stakeholder priority alignment

| Stakeholder | Top 3 priorities |
|-------------|------------------|
| **Director** | Credible design, clear consultancy pathways, demo without data risk |
| **Research Office** | Enquiry routing, workflow, accurate metrics, admin control |
| **Faculty** | Easy profile updates, no self-publish errors, publication linking |
| **Industry partner** | Find expert fast, understand services, submit enquiry easily |
| **IT / MAHE** | SSO, data residency, maintainability, no custom admin debt |

---

## 2.5 Risk-adjusted sequencing

1. **Never launch production without workflow** — unapproved faculty data is a reputational risk.  
2. **Enquiry routing before AI routing** — manual process first, then automate suggestions.  
3. **Search before RAG** — keyword search must work before semantic layer.  
4. **Real data import before go-live** — plan 2-week content migration window with Research Office.
