# Free online deployment (Vercel + Neon)

Host the full portal — Next.js, Payload CMS admin, and PostgreSQL — on **free tiers**:

| Service | Free tier | Purpose |
|---------|-----------|---------|
| [Vercel](https://vercel.com) | Hobby | Next.js app + Payload `/admin` |
| [Neon](https://neon.tech) | Free | PostgreSQL for CMS data |
| [GitHub](https://github.com) | Free | Source code + Vercel auto-deploy |

Estimated cost: **$0/month** for director review / low traffic.

---

## Step 1 — Push code to GitHub

From the project folder (`Consultancy`):

```bash
git init
git add .
git commit -m "MIT Bengaluru research portal — production CMS"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/mit-bengaluru-research.git
git push -u origin main
```

Create an empty repo on GitHub first (no README), then push.

---

## Step 2 — Create Neon PostgreSQL (free)

1. Sign in at [neon.tech](https://neon.tech) → **New project**
2. Name: `mit-research-portal`, region: **Asia (Singapore)** or closest to Bengaluru
3. Copy the connection string — it looks like:
   ```
   postgresql://user:pass@ep-xxx.region.aws.neon.tech/neondb?sslmode=require
   ```
4. Keep this for Vercel env vars and local seeding

---

## Step 3 — Seed the cloud database (once)

On your PC, with Docker **not** required — point at Neon:

```bash
# Windows PowerShell — paste your Neon URL
$env:DATABASE_URI="postgresql://...@ep-xxx.neon.tech/neondb?sslmode=require"
$env:PAYLOAD_SECRET="your-random-secret-min-32-characters-long"
$env:PORTAL_MODE="production"
npm run seed
```

You should see `Seed complete` and 8 real faculty rows.

---

## Step 4 — Deploy on Vercel

1. [vercel.com](https://vercel.com) → **Add New → Project** → import your GitHub repo
2. **Root directory:** `Consultancy` (if repo root is parent) or `.` if repo is the project root
3. Framework: **Next.js** (auto-detected)
4. Add **Environment variables** (Production + Preview):

| Variable | Value |
|----------|-------|
| `PORTAL_MODE` | `production` |
| `NEXT_PUBLIC_PORTAL_MODE` | `production` |
| `NEXT_PUBLIC_DEMO_BANNER` | `false` |
| `DATABASE_URI` | Neon connection string (with `?sslmode=require`) |
| `PAYLOAD_SECRET` | Random 32+ char secret (same as seed step) |
| `CMS_URL` | `https://YOUR-PROJECT.vercel.app` (update after first deploy) |
| `ADMIN_PASSWORD` | Strong password (for re-seeding only) |
| `ENQUIRY_NOTIFY_EMAIL` | `research.blr@manipal.edu` |

5. Click **Deploy**

### After first deploy

1. Copy your live URL (e.g. `https://mit-bengaluru-research.vercel.app`)
2. Vercel → **Settings → Environment Variables** → set `CMS_URL` to that URL
3. **Redeploy** (Deployments → ⋮ → Redeploy)

This fixes Payload admin login redirects and cookies.

---

## Step 5 — Verify go-live

| URL | Expected |
|-----|----------|
| `/` | Portal home, **no** demo banner |
| `/researchers` | Real faculty (Dr. Gauri Kalnoor, etc.) |
| `/admin` | Payload login → `admin@mit.mahe.edu` / your `ADMIN_PASSWORD` |
| `/contact` | Enquiry form → reference number → row in CMS **Consultancy Enquiries** |

---

## Troubleshooting

### Build fails on Vercel

- Ensure `installCommand` uses `--legacy-peer-deps` (see `vercel.json`)
- All env vars above must be set **before** build if using production CMS

### Admin login loops or 500

- `CMS_URL` must exactly match the public site URL (https, no trailing slash)
- `PAYLOAD_SECRET` must match what you used when seeding
- Redeploy after changing `CMS_URL`

### Empty researchers on live site

- Run `npm run seed` locally with the **Neon** `DATABASE_URI` (Step 3)
- Check Vercel logs: **Functions** tab for DB connection errors

### Hydration warning in browser

- Set both `PORTAL_MODE` and `NEXT_PUBLIC_PORTAL_MODE` to `production`

---

## Optional upgrades (still low cost)

| Need | Service |
|------|---------|
| Custom domain | Vercel → Domains (free SSL) |
| Email notifications | [Resend](https://resend.com) free tier |
| Media uploads in CMS | Vercel Blob or Cloudflare R2 |
| SSO | Microsoft Entra — see [SSO-SETUP.md](./SSO-SETUP.md) |

---

## Quick redeploy after content changes

Edit content in `/admin` — changes appear on the public site immediately (no redeploy needed).

Redeploy only when you change code or environment variables.
