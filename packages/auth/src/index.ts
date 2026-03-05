// ---------------------------------------------------------------------------
// @repo/auth — GlueOS Authentication & Authorization
// ---------------------------------------------------------------------------
//
// This package wraps Clerk for GlueOS deployments. It handles:
// - Invitation-only authentication (no self-registration)
// - Multi-tenant organization context (Clerk Orgs = GlueOS clients)
// - Role-based module access via Clerk permissions (`org:{module}:access`)
// - Internal vs. client deployment mode switching
//
// See docs/AUTH-SETUP.md for Clerk Dashboard configuration instructions.

// Provider — wrap your root layout
export { GlueAuthProvider } from './provider'

// Middleware factory — used in each app's middleware.ts
export { createGlueMiddleware, createRouteMatcher } from './middleware'

// Hooks — client-side permission and tenant access
export { useModuleAccess, useIsAdmin } from './hooks/usePermissions'
export { useTenant } from './hooks/useTenant'

// Components — auth UI building blocks
export { GlueOrgSwitcher } from './components/OrgSwitcher'
export { ProtectedRoute } from './components/ProtectedRoute'

// Guards — server-side access enforcement
export { requireModuleAccess } from './guards/module-guard'

// Re-export frequently used Clerk primitives so app code imports from one place
export {
  useAuth,
  useUser,
  useOrganization,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

// Types
export type { GlueAuthUser, ModulePermission, TenantContext, DeploymentMode } from './types'
