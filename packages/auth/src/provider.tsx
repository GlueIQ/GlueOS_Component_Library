'use client'

import { ClerkProvider } from '@clerk/nextjs'

interface GlueAuthProviderProps {
  children: React.ReactNode
}

/**
 * Wraps ClerkProvider with GlueOS configuration.
 *
 * - Sign-up attempts are redirected to sign-in (restricted mode — no self-registration)
 * - All auth state is available to client components via Clerk hooks
 *
 * Place at the root of your app layout:
 * ```tsx
 * // app/layout.tsx
 * import { GlueAuthProvider } from '@repo/auth'
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html><body>
 *       <GlueAuthProvider>{children}</GlueAuthProvider>
 *     </body></html>
 *   )
 * }
 * ```
 */
export function GlueAuthProvider({ children }: GlueAuthProviderProps) {
  return (
    <ClerkProvider
      signInUrl="/sign-in"
      signUpUrl="/sign-in"
      afterSignOutUrl="/sign-in"
    >
      {children}
    </ClerkProvider>
  )
}
