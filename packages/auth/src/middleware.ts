import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Routes that bypass authentication
const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/api/webhooks(.*)',
])

/**
 * Creates the Clerk middleware with GlueOS route protection.
 *
 * Usage in each app's middleware.ts:
 * ```ts
 * import { createGlueMiddleware } from '@repo/auth'
 * export default createGlueMiddleware()
 *
 * export const config = {
 *   matcher: [
 *     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
 *     '/(api|trpc)(.*)',
 *   ],
 * }
 * ```
 */
export function createGlueMiddleware() {
  return clerkMiddleware(async (auth, request) => {
    if (!isPublicRoute(request)) {
      await auth.protect()
    }
  })
}

export { createRouteMatcher }
