// ---------------------------------------------------------------------------
// GlueOS Auth — TypeScript Types
// ---------------------------------------------------------------------------

export interface GlueAuthUser {
  id: string
  email: string
  firstName: string | null
  lastName: string | null
  imageUrl: string
  orgId: string | null
  orgSlug: string | null
  orgRole: string | null
  permissions: string[]
}

/**
 * Permission key format: `org:{module-slug}:access`
 * e.g. `org:forge:access`, `org:immersion:access`
 */
export type ModulePermission = `org:${string}:access`

export interface TenantContext {
  tenantId: string | null
  tenantName: string | null
  tenantSlug: string | null
  isLoaded: boolean
}

/**
 * Deployment mode — controls visibility of multi-tenant UI (OrgSwitcher, etc.)
 * - `internal`: GlueIQ operator workspace — org switcher visible, operators switch between clients
 * - `client`: Single-client deployment — org switcher hidden, single org set automatically
 */
export type DeploymentMode = 'internal' | 'client'
