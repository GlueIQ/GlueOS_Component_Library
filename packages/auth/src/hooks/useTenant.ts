'use client'

import { useOrganization, useOrganizationList } from '@clerk/nextjs'
import type { TenantContext } from '../types'

/**
 * Returns the active tenant (Clerk Organization) context and a helper to switch tenants.
 *
 * In internal deployments, operators can switch between client orgs via `switchTenant`.
 * In client deployments, the org is fixed and `switchTenant` is never surfaced in the UI.
 *
 * @example
 * const { tenantName, switchTenant } = useTenant()
 */
export function useTenant(): TenantContext & {
  switchTenant: (orgId: string) => Promise<void>
} {
  const { organization, isLoaded } = useOrganization()
  const { setActive } = useOrganizationList()

  return {
    tenantId: organization?.id ?? null,
    tenantName: organization?.name ?? null,
    tenantSlug: organization?.slug ?? null,
    isLoaded,
    switchTenant: async (orgId: string) => {
      await setActive?.({ organization: orgId })
    },
  }
}
