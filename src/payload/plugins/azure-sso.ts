/**
 * Microsoft Entra ID (Azure AD) SSO scaffold for Payload admin.
 *
 * When MAHE IT provides credentials, set in `.env.local`:
 *   AZURE_AD_CLIENT_ID
 *   AZURE_AD_CLIENT_SECRET
 *   AZURE_AD_TENANT_ID
 *   AZURE_AD_ADMIN_GROUP_ID  (optional — restrict to an Entra security group)
 *
 * Then install and wire the OAuth plugin (see docs/SSO-SETUP.md):
 *   npm install payload-oauth2 --legacy-peer-deps
 *
 * Azure app registration redirect URI:
 *   {CMS_URL}/api/users/oauth/microsoft-entra-id/callback
 */

export const azureSsoEnv = {
  clientId: process.env.AZURE_AD_CLIENT_ID ?? "",
  clientSecret: process.env.AZURE_AD_CLIENT_SECRET ?? "",
  tenantId: process.env.AZURE_AD_TENANT_ID ?? "",
  adminGroupId: process.env.AZURE_AD_ADMIN_GROUP_ID ?? "",
  serverUrl:
    process.env.CMS_URL || process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000",
};

export const azureSsoEnabled =
  azureSsoEnv.clientId.length > 0 &&
  azureSsoEnv.clientSecret.length > 0 &&
  azureSsoEnv.tenantId.length > 0;

/** OAuth authorize URL once plugin is enabled */
export function azureSsoLoginUrl(): string | null {
  if (!azureSsoEnabled) return null;
  return `${azureSsoEnv.serverUrl}/api/users/oauth/microsoft-entra-id`;
}
