'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ShieldX } from 'lucide-react'
import { useUser } from '@repo/auth'

/**
 * Unauthorized page — shown when a signed-in user lacks access to this module.
 *
 * The "Request Access" button posts to /api/access-request which notifies admins.
 * Wire up the API route to your preferred notification method (email, Slack, etc.).
 */
export default function UnauthorizedPage() {
  const { user } = useUser()
  const router = useRouter()
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleRequestAccess = async () => {
    setLoading(true)
    try {
      await fetch('/api/access-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id,
          userEmail: user?.primaryEmailAddress?.emailAddress,
          module: '__APP_SLUG__',
        }),
      })
      setSent(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-8 text-center">
      <div className="flex size-16 items-center justify-center rounded-full bg-destructive/10">
        <ShieldX className="size-8 text-destructive" />
      </div>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Access Required</h1>
        <p className="max-w-md text-muted-foreground">
          You don&apos;t have access to <strong>__APP_NAME__</strong>. Contact your administrator
          or request access below.
        </p>
      </div>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted"
        >
          Go Back
        </button>
        {!sent ? (
          <button
            type="button"
            onClick={handleRequestAccess}
            disabled={loading}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            {loading ? 'Sending…' : 'Request Access'}
          </button>
        ) : (
          <span className="rounded-md bg-muted px-4 py-2 text-sm font-medium text-muted-foreground">
            Request sent — an admin will follow up.
          </span>
        )}
      </div>
    </div>
  )
}
