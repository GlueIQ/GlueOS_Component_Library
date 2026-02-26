/**
 * OverviewDashboard Layout
 *
 * A mixed-content dashboard with stats, recent activity, and quick actions.
 * Normalized: 2025-02 — relative imports, semantic tokens
 */

import { cn } from "../../lib/utils"

interface OverviewDashboardProps extends React.ComponentProps<"div"> {
  header?: React.ReactNode
  stats?: React.ReactNode
  activity?: React.ReactNode
  actions?: React.ReactNode
}

export function OverviewDashboard({
  header,
  stats,
  activity,
  actions,
  children,
  className,
  ...props
}: OverviewDashboardProps) {
  return (
    <div className={cn("flex flex-1 flex-col gap-6 p-6", className)} {...props}>
      {header}
      {stats}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">{activity}</div>
        <div>{actions}</div>
      </div>
      {children}
    </div>
  )
}
