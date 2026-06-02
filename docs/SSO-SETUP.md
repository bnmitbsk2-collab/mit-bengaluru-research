# SSO setup — Microsoft Entra ID (MAHE)

Admin SSO is scaffolded via environment variables. Wire the OAuth plugin once MAHE IT provides Entra ID credentials.

## 1. Azure app registration (MAHE IT)

1. Azure Portal → **Microsoft Entra ID** → **App registrations** → **New registration**
2. Redirect URI (Web): `{CMS_URL}/api/users/oauth/microsoft-entra-id/callback`
   - Local: `http://localhost:3000/api/users/oauth/microsoft-entra-id/callback`
   - Production: `https://your-domain.vercel.app/api/users/oauth/microsoft-entra-id/callback`
3. **API permissions** → Microsoft Graph → Delegated: `openid`, `email`, `profile`, `offline_access`, `User.Read`
4. **Certificates & secrets** → new client secret → copy to env
5. Optional: **Token configuration** → groups claim; set `AZURE_AD_ADMIN_GROUP_ID` to restrict access

## 2. Environment variables

```env
AZURE_AD_CLIENT_ID=...
AZURE_AD_CLIENT_SECRET=...
AZURE_AD_TENANT_ID=...
AZURE_AD_ADMIN_GROUP_ID=          # optional
CMS_URL=https://your-production-url
```

## 3. Enable Payload OAuth plugin

```bash
npm install payload-oauth2 --legacy-peer-deps
```

Add to `payload.config.ts` (see `src/payload/plugins/azure-sso.ts` for env helpers):

```ts
import { OAuth2Plugin } from "payload-oauth2/dist/plugin.js";
import { azureSsoEnv, azureSsoEnabled } from "./src/payload/plugins/azure-sso.ts";

// plugins: [
//   OAuth2Plugin({
//     enabled: azureSsoEnabled,
//     strategyName: "microsoft-entra-id",
//     ...
//   }),
// ],
```

Full plugin config: [payload-oauth2 Microsoft Entra example](https://github.com/WilsonLe/payload-oauth2/blob/main/examples/microsoft-entra-id.ts)

## 4. Admin login

- **Until SSO is wired:** email/password — `admin@mit.mahe.edu` (seeded)
- **After SSO:** `/admin` → **Sign in with Microsoft** → `/api/users/oauth/microsoft-entra-id`

## 5. UAT checklist

- [ ] Entra app redirect URI matches `CMS_URL`
- [ ] Research Office admin can sign in with `@manipal.edu` account
- [ ] Non-MAHE accounts rejected (if tenant-restricted)
- [ ] Optional group restriction works with `AZURE_AD_ADMIN_GROUP_ID`
