'use client'

import { useModuleAccess } from '../hooks/usePermissions'

interface ProtectedRouteProps {
  moduleSlug: string
  children: React.ReactNode
  /** Rendered while permission check is in progress. Defaults to null. */
  fallbackLoading?: React.ReactNode
  /** Rendered when access is denied. Defaults to null. */
  fallbackUnauthorized?: React.ReactNode
}

/**
 * Client-side route guard that conditionally renders children based on module access.
 *
 * For server-side protection (stronger, preferred for layout-level guards),
 * use `requireModuleAccess()` from `@repo/auth` in a server component layout.
 *
 * @example
 * <ProtectedRoute moduleSlug="forge">
 *   <ForgeContent />
 * </ProtectedRoute>
 */
export function ProtectedRoute({
  moduleSlug,
  children,
  fallbackLoading = null,
  fallbackUnauthorized = null,
}: ProtectedRouteProps) {
  const { hasAccess, isLoading } = useModuleAccess(moduleSlug)

  if (isLoading) return <>{fallbackLoading}</>
  if (!hasAccess) return <>{fallbackUnauthorized}</>

  return <>{children}</>
}
