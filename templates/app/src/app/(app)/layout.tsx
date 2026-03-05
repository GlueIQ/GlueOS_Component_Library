import { requireModuleAccess } from '@repo/auth'
import type { ReactNode } from 'react'

/**
 * App layout — enforces module access server-side before rendering any content.
 *
 * The Shell (sidebar, topbar) is managed at the platform level. This layout
 * only needs to enforce auth and render children into the Shell's content area.
 *
 * To add this app to the Shell's navigation, register it in the platform's
 * app registry (see the Shell repo or the platform's app-registry.ts).
 */
export default async function AppLayout({ children }: { children: ReactNode }) {
  // Server-side access check — redirects to /unauthorized if access is denied
  await requireModuleAccess('__APP_SLUG__')

  return <>{children}</>
}
