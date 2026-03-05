import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

/**
 * Server-side guard — call in a layout or page to enforce module access.
 *
 * Redirects to `/sign-in` if unauthenticated, `/select-organization` if no active
 * org, or `/unauthorized` if the user lacks the required permission.
 *
 * @example
 * // apps/forge/src/app/layout.tsx
 * import { requireModuleAccess } from '@repo/auth'
 *
 * export default async function ForgeLayout({ children }) {
 *   await requireModuleAccess('forge')
 *   return <>{children}</>
 * }
 */
export async function requireModuleAccess(moduleSlug: string): Promise<void> {
  const { userId, orgId, has } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  if (!orgId) {
    redirect('/select-organization')
  }

  const isAdmin = has({ role: 'org:admin' })
  const hasAccess = has({ permission: `org:${moduleSlug}:access` })

  if (!isAdmin && !hasAccess) {
    redirect('/unauthorized')
  }
}
