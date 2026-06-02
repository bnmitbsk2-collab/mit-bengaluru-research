# Demo → Production Guide

How to run the portal **now** as a free demo for director review, and switch to **real institutional data** after approval — without rebuilding the frontend.

---

## Part A — Demo deployment (do this now)

### Step 1: Prepare repository

```bash
cd Consultancy
cp .env.example .env.local
# Keep PORTAL_MODE=demo (default)
npm install
npm run dev          # verify at http://localhost:3000
npm run build        # must pass before deploy
```

### Step 2: Push to GitHub

```bash
git init
git add .
git commit -m "MIT Bengaluru research portal — demo for director review"
git branch -M main
git remote add origin https://github.com/YOUR_ORG/mit-bengaluru-research.git
git push -u origin main
```

### Step 3: Deploy to Vercel (free)

1. Go to [vercel.com](https://vercel.com) → Sign in with GitHub
2. **Add New → Project** → import your repository
3. Framework: **Next.js** (auto-detected)
4. Environment variables:
   | Key | Value |
   |-----|-------|
   | `PORTAL_MODE` | `demo` |
   | `NEXT_PUBLIC_DEMO_BANNER` | `true` |
5. Click **Deploy**
6. Share the `https://your-project.vercel.app` URL with the Director and Research Office

### Step 4: What stakeholders see

- Full public portal with **sample data** (8 researchers, 9 areas, 6 labs, etc.)
- Amber **"Demonstration portal"** banner at top
- Working enquiry form → returns reference number (logged server-side)
- Downloadable PDF brochures
- All search/filter functionality

### Step 5: Collect feedback

Use GitHub Issues or a shared doc. Key questions for the director:

1. Is the tone institutional and credible?
2. Can an industry partner find an expert and enquire in under 3 minutes?
3. Are consultancy categories correct for the Research Office workflow?
4. Approve proceeding to Phase 1 (CMS + real data)?

---

## Part B — After director approval

### Prerequisites checklist

- [ ] Written approval from Director / Research Office
- [ ] Budget for hosting (CMS + DB ~$20–50/month on managed services, or institutional infra)
- [ ] SSO credentials from MAHE IT (Entra ID / Google OIDC)
- [ ] Real faculty data source identified (HR roster, existing spreadsheets, ORCID)
- [ ] Research Office assigns content owners (who approves what)

### Step 1: Provision infrastructure

| Service | Recommended (low cost) | Institutional alternative |
|---------|------------------------|---------------------------|
| Frontend | Vercel (existing) | On-prem nginx |
| CMS | Render / Railway / Fly.io | MAHE server |
| Database | Neon PostgreSQL (free tier → paid) | Institutional PostgreSQL |
| File storage | Cloudflare R2 / AWS S3 | Institutional MinIO |
| Email | Resend (free tier) | MAHE SMTP |

### Step 2: Deploy Payload CMS

Follow Phase 1 Sprint 1 in [DEVELOPMENT-ROADMAP.md](./DEVELOPMENT-ROADMAP.md):

1. Create `payload/` with collections from [DATABASE-SCHEMA.md](./DATABASE-SCHEMA.md)
2. Point Payload at PostgreSQL
3. Configure SSO
4. Deploy CMS to its own URL (e.g. `cms.mit-bengaluru.mahe.edu`)

### Step 3: Migrate content

**Do NOT copy sample fictional data to production.**

1. Create empty collections in CMS
2. Research Office enters real homepage metrics in `site_settings`
3. Import departments and research areas (one-time, Research Office)
4. Faculty profiles: CSV import template → coordinator review → publish
5. Projects/publications: batch import with reviewer QA
6. Upload real brochures to `documents` collection

Optional: run `scripts/migrate-demo-to-cms.ts` (Phase 1 deliverable) only to seed **structure**, not fictional names.

### Step 4: Connect frontend to CMS

1. Set Vercel environment variables:

   ```
   PORTAL_MODE=production
   CMS_URL=https://cms.mit-bengaluru.mahe.edu
   CMS_API_KEY=<server-side-read-key>
   ENQUIRY_NOTIFY_EMAIL=research.blr@mit.mahe.edu
   NEXT_PUBLIC_DEMO_BANNER=false
   ```

2. Update `src/lib/content/index.ts` — replace static re-exports with CMS fetchers:

   ```typescript
   export async function getResearchers() {
     if (getContentSource() === "cms-api") {
       const res = await fetch(
         `${portalConfig.cms.url}/api/researchers?where[status][equals]=published&limit=100`,
         { headers: { Authorization: `Bearer ${portalConfig.cms.apiKey}` }, next: { revalidate: 3600 } }
       );
       return res.json().then(r => r.docs);
     }
     return researchers; // fallback during migration
   }
   ```

3. Add revalidation webhook: CMS publish → `POST /api/revalidate` → Next.js ISR refresh

4. Redeploy frontend on Vercel

### Step 5: Switch enquiry handling

Update `src/app/api/enquiry/route.ts`:

```typescript
// After validation, POST to CMS:
await fetch(`${portalConfig.cms.url}/api/consultancy_enquiries`, {
  method: "POST",
  headers: { "Content-Type": "application/json", Authorization: `...` },
  body: JSON.stringify({ ...record, enquiry_status: "new" }),
});
// Send email notification to ENQUIRY_NOTIFY_EMAIL
```

### Step 6: Go-live verification

- [ ] Demo banner is hidden
- [ ] No sample/fictional researcher names visible
- [ ] All published content has gone through workflow
- [ ] Enquiry submits → appears in CMS inbox → email sent
- [ ] SSO login works for admin users
- [ ] Faculty pilot completed (5+ profiles self-submitted and approved)
- [ ] Lighthouse performance > 85
- [ ] Accessibility spot-check passed

### Step 7: Decommission demo data

- [ ] Archive `src/data/*` or move to `src/data/demo/` (keep for staging only)
- [ ] Staging environment keeps `PORTAL_MODE=demo` for UI testing
- [ ] Production never imports demo researcher names

---

## Environment reference

| Variable | Demo | Production |
|----------|------|------------|
| `PORTAL_MODE` | `demo` | `production` |
| `NEXT_PUBLIC_DEMO_BANNER` | `true` | `false` |
| `CMS_URL` | — | CMS base URL |
| `CMS_API_KEY` | — | Server-side read/write key |
| `ENQUIRY_NOTIFY_EMAIL` | optional | Research office email |
| `DATABASE_URL` | — | PostgreSQL (CMS only) |

---

## Cost estimate

| Phase | Monthly cost |
|-------|-------------|
| Demo (Vercel free) | **₹0** |
| Production (Vercel + Neon + Render + R2) | **~₹1,500–4,000** |
| Production (institutional infra) | Internal IT budget |

---

## Support contacts (fill in after approval)

| Role | Name | Email |
|------|------|-------|
| Research Office lead | | |
| IT / SSO admin | | |
| Frontend developer | | |
| CMS administrator | | |

---

## Related documents

- [IMPLEMENTATION-BLUEPRINT.md](./IMPLEMENTATION-BLUEPRINT.md) — full architecture
- [FEATURE-PRIORITY-MATRIX.md](./FEATURE-PRIORITY-MATRIX.md) — what to build when
- [ADMIN-MODULES.md](./ADMIN-MODULES.md) — CMS screens
- [DATABASE-SCHEMA.md](./DATABASE-SCHEMA.md) — tables and fields
- [DEVELOPMENT-ROADMAP.md](./DEVELOPMENT-ROADMAP.md) — sprint plan
