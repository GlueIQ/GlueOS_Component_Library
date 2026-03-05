import { SignIn } from '@clerk/nextjs'

/**
 * Sign-in page.
 *
 * Sign-up is disabled (restricted mode) — users must be invited by an admin.
 * The ClerkProvider is configured to redirect sign-up attempts here.
 *
 * See docs/AUTH-SETUP.md → Step 2 for configuring restricted sign-up in the Clerk dashboard.
 */
export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <SignIn
        appearance={{
          elements: {
            card: 'shadow-xl rounded-xl',
            headerTitle: 'text-xl font-bold',
          },
        }}
      />
    </div>
  )
}
