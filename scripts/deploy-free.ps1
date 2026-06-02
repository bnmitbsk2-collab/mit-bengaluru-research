# MIT Bengaluru Research Portal — free deploy helper (Vercel + Neon)
# Run from project root:  powershell -ExecutionPolicy Bypass -File scripts/deploy-free.ps1

$ErrorActionPreference = "Stop"
Set-Location (Join-Path $PSScriptRoot "..")

Write-Host "`n=== MIT Bengaluru Research Portal — Free Deploy ===" -ForegroundColor Cyan

# ── 1. Git ───────────────────────────────────────────────────────────────────
if (-not (Test-Path ".git")) {
  git init
  git branch -M main
}
$status = git status --porcelain
if ($status) {
  git add .
  git commit -m "MIT Bengaluru research portal — deploy"
}

# ── 2. GitHub remote ─────────────────────────────────────────────────────────
$remote = git remote get-url origin 2>$null
if (-not $remote) {
  $user = Read-Host "GitHub username (e.g. abhijittec)"
  $repo = Read-Host "Repo name [mit-bengaluru-research]"
  if (-not $repo) { $repo = "mit-bengaluru-research" }
  Write-Host "`nCreate an EMPTY repo at: https://github.com/new?name=$repo" -ForegroundColor Yellow
  Read-Host "Press Enter after creating the repo on GitHub"
  git remote add origin "https://github.com/$user/$repo.git"
}
Write-Host "Pushing to GitHub..." -ForegroundColor Green
git push -u origin main

# ── 3. Neon DATABASE_URI ─────────────────────────────────────────────────────
Write-Host "`n--- Neon PostgreSQL ---" -ForegroundColor Cyan
Write-Host "Create free DB: https://console.neon.tech → New project → copy connection string"
$neon = Read-Host "Paste Neon DATABASE_URI (with ?sslmode=require)"
if (-not $neon) { throw "DATABASE_URI required" }

$secret = Read-Host "PAYLOAD_SECRET (32+ chars) [auto-generate]"
if (-not $secret) {
  $secret = -join ((48..57) + (65..90) + (97..122) | Get-Random -Count 40 | ForEach-Object { [char]$_ })
  Write-Host "Generated PAYLOAD_SECRET: $secret"
}

Write-Host "Seeding Neon database..." -ForegroundColor Green
$env:DATABASE_URI = $neon
$env:PAYLOAD_SECRET = $secret
$env:PORTAL_MODE = "production"
npm run seed

# ── 4. Vercel ────────────────────────────────────────────────────────────────
Write-Host "`n--- Vercel deploy ---" -ForegroundColor Cyan
Write-Host "Log in to Vercel when prompted (browser opens)."
npx vercel@latest login

Write-Host "Deploying (production)..." -ForegroundColor Green
npx vercel@latest --prod `
  -e PORTAL_MODE=production `
  -e NEXT_PUBLIC_PORTAL_MODE=production `
  -e NEXT_PUBLIC_DEMO_BANNER=false `
  -e DATABASE_URI="$neon" `
  -e PAYLOAD_SECRET="$secret" `
  -e ENQUIRY_NOTIFY_EMAIL=research.blr@manipal.edu `
  --yes

$deployUrl = (npx vercel@latest ls 2>$null | Select-Object -First 1)
Write-Host "`nSet CMS_URL to your production URL in Vercel dashboard, then redeploy." -ForegroundColor Yellow
Write-Host "Admin: https://YOUR-URL/admin  |  admin@mit.mahe.edu / ChangeMe123!" -ForegroundColor Green
Write-Host "Full guide: docs/DEPLOY-FREE.md`n"
