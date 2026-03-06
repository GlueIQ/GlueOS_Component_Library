/**
 * ProfilePage Layout
 *
 * A user/entity profile page with cover area, profile card, tabs, and sections.
 * Normalized: 2025-02 — relative imports, semantic tokens
 */

import { cn } from "../../lib/utils"

interface ProfilePageProps extends React.ComponentProps<"div"> {
  cover?: React.ReactNode
  profile?: React.ReactNode
  tabs?: React.ReactNode
}

export function ProfilePage({
  cover,
  profile,
  tabs,
  children,
  className,
  ...props
}: ProfilePageProps) {
  return (
    <div className={cn("flex flex-1 flex-col", className)} {...props}>
      {/* Cover area */}
      {cover ?? (
        <div className="h-32 bg-gradient-to-r from-primary/20 to-primary/5" />
      )}
      {/* Profile section - overlaps cover */}
      <div className="px-6 -mt-8">
        {profile}
      </div>
      {/* Tabs & content */}
      <div className="flex flex-1 flex-col gap-6 p-6">
        {tabs}
        <div className="flex-1">{children}</div>
      </div>
    </div>
  )
}
