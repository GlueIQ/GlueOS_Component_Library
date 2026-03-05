'use client'

import { useAuth } from '@clerk/nextjs'

/**
 * Checks whether the current user has access to a specific module.
 *
 * Access is granted if:
 * - The user has the `org:admin` role (admins always have full access), OR
 * - The user has the `org:{moduleSlug}:access` permission
 *
 * @example
 * const { hasAccess, isLoading } = useModuleAccess('forge')
 */
export function useModuleAccess(moduleSlug: string): {
  hasAccess: boolean
  isLoading: boolean
} {
  const { has, isLoaded } = useAuth()

  if (!isLoaded) {
    return { hasAccess: false, isLoading: true }
  }

  const isAdmin = has?.({ role: 'org:admin' })
  const hasModulePermission = has?.({ permission: `org:${moduleSlug}:access` })

  return {
    hasAccess: Boolean(isAdmin || hasModulePermission),
    isLoading: false,
  }
}

/**
 * Returns true if the current user is an org admin.
 */
export function useIsAdmin(): boolean {
  const { has, isLoaded } = useAuth()
  if (!isLoaded) return false
  return Boolean(has?.({ role: 'org:admin' }))
}
