# Vercel setup — mit-bengaluru-research

Repo: **https://github.com/bnmitbsk2-collab/mit-bengaluru-research**  
Neon is already seeded. Follow these steps once.

---

## Step 1 — Import project

1. Open **[vercel.com/new](https://vercel.com/new)**
2. Sign in with GitHub (same account: `bnmitbsk2-collab`)
3. Select **`mit-bengaluru-research`**
4. Click **Import**

---

## Step 2 — Environment variables

Before clicking Deploy, expand **Environment Variables** and add:

| Name | Value |
|------|--------|
| `PORTAL_MODE` | `production` |
| `NEXT_PUBLIC_PORTAL_MODE` | `production` |
| `NEXT_PUBLIC_DEMO_BANNER` | `false` |
| `DATABASE_URI` | Neon connection string from [Neon Console](https://console.neon.tech) |
| `PAYLOAD_SECRET` | `mit-bengaluru-local-dev-secret-min-32-chars` |
| `ENQUIRY_NOTIFY_EMAIL` | `research.blr@manipal.edu` |
| `CMS_URL` | Leave empty for first deploy; set in Step 4 |

Apply to: **Production**, **Preview**, **Development**

---

## Step 3 — First deploy

- Framework: **Next.js** (auto)
- Root directory: **`.`** (project root)
- Click **Deploy**
- Wait ~3–5 minutes for build

---

## Step 4 — Set CMS_URL and redeploy

1. Copy your live URL, e.g. `https://mit-bengaluru-research.vercel.app`
2. Vercel → Project → **Settings** → **Environment Variables**
3. Add or edit **`CMS_URL`** = `https://mit-bengaluru-research.vercel.app` (no trailing slash)
4. **Deployments** → latest → **⋯** → **Redeploy**

---

## Step 5 — Verify

| URL | Expected |
|-----|----------|
| `/` | Portal home, no demo banner |
| `/researchers` | Dr. Gauri Kalnoor, Dr. Abhijit Das, etc. |
| `/admin` | Login: `admin@mit.mahe.edu` / `ChangeMe123!` |
| `/contact` | Enquiry form works |

---

## CLI alternative (after `npx vercel login`)

```powershell
cd c:\Users\abhijit.das\Downloads\Consultancy
npx vercel@latest link
npx vercel@latest env add DATABASE_URI
npx vercel@latest --prod
```

---

## Troubleshooting

- **Build fails** — Vercel uses `npm install --legacy-peer-deps` from `vercel.json`
- **Empty researchers** — confirm `DATABASE_URI` is the Neon URL (seed already run)
- **Admin login loops** — set `CMS_URL` to exact production URL and redeploy
