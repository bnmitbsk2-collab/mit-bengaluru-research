# Production go-live UAT checklist

Run after `npm run db:up`, `npm run seed`, and `npm run dev`.

> **Seed note:** `npm run seed` uses `payload.seed.config.ts` (no Lexical import) because Lexical’s top-level await breaks the Payload CLI on Node 22.

## Environment
- [ ] `PORTAL_MODE=production` in `.env.local`
- [ ] `NEXT_PUBLIC_DEMO_BANNER=false`
- [ ] `DATABASE_URI` points to PostgreSQL
- [ ] Demo banner is **not** visible on public site

## CMS admin (`/admin`)
- [ ] Login with `admin@mit.mahe.edu` / password from `ADMIN_PASSWORD`
- [ ] Researchers list shows **real MIT Bengaluru faculty names** (not demo names)
- [ ] Edit a researcher → save → visible on public profile after refresh

## Public portal
- [ ] `/researchers` lists real faculty
- [ ] `/researchers/gauri-kalnoor` profile loads from CMS
- [ ] `/research-areas` shows CMS research areas
- [ ] Search/filters work on directories
- [ ] Submit enquiry on `/contact` → reference number → record in CMS **Consultancy Enquiries**

## SSO (when MAHE IT provides credentials)
- [ ] Set `AZURE_AD_CLIENT_ID`, `AZURE_AD_CLIENT_SECRET`, `AZURE_AD_TENANT_ID`
- [ ] Follow [SSO-SETUP.md](./SSO-SETUP.md) to wire `payload-oauth2` on `/admin`

## Deploy (Vercel + Neon)
- [ ] Create Neon PostgreSQL database → set `DATABASE_URI` on Vercel
- [ ] Set `PORTAL_MODE=production`, `PAYLOAD_SECRET`, `CMS_URL=https://your-domain.vercel.app`
- [ ] Run `npm run seed` against production DB once
- [ ] Hide demo banner; verify go-live
