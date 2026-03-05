'use client'

import { OrganizationSwitcher } from '@clerk/nextjs'

interface GlueOrgSwitcherProps {
  /**
   * Whether to hide the "Personal account" option. Default: true.
   * GlueOS uses organizations as the primary context — personal accounts are not surfaced.
   */
  hidePersonal?: boolean
}

/**
 * Clerk OrganizationSwitcher styled for the GlueOS Shell sidebar.
 *
 * Only render this in `internal` deployment mode — in client deployments,
 * the organization is fixed and should not be surfaced.
 *
 * @example
 * // In the Shell sidebar, conditional on deployment mode
 * {deploymentMode === 'internal' && <GlueOrgSwitcher />}
 */
export function GlueOrgSwitcher({ hidePersonal = true }: GlueOrgSwitcherProps) {
  return (
    <OrganizationSwitcher
      hidePersonal={hidePersonal}
      afterSelectOrganizationUrl="/"
      appearance={{
        elements: {
          rootBox: 'w-full',
          organizationSwitcherTrigger: 'px-3 py-2 rounded-md w-full justify-start',
        },
      }}
    />
  )
}
