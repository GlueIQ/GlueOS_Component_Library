/**
 * AdminPanel Layout
 *
 * An admin dashboard with stats, user management, and system settings.
 * Normalized: 2025-02 — relative imports, semantic tokens
 */

import { cn } from "../../lib/utils"

interface AdminPanelProps extends React.ComponentProps<"div"> {
  header?: React.ReactNode
  stats?: React.ReactNode
  userManagement?: React.ReactNode
  systemSettings?: React.ReactNode
}

export function AdminPanel({
  header,
  stats,
  userManagement,
  systemSettings,
  children,
  className,
  ...props
}: AdminPanelProps) {
  return (
    <div className={cn("flex flex-1 flex-col gap-6 p-6", className)} {...props}>
      {header ?? (
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Admin Panel</h1>
          <p className="text-muted-foreground">
            System overview and administration tools.
          </p>
        </div>
      )}
      {stats}
      <div className="grid gap-6 lg:grid-cols-2">
        {userManagement && <div>{userManagement}</div>}
        {systemSettings && <div>{systemSettings}</div>}
      </div>
      {children}
    </div>
  )
}
