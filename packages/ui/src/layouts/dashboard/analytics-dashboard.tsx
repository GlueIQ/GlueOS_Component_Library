/**
 * AnalyticsDashboard Layout
 *
 * A metrics-focused dashboard with stats, charts, and data tables.
 * Normalized: 2025-02 — relative imports, semantic tokens
 */

import { cn } from "../../lib/utils"

interface AnalyticsDashboardProps extends React.ComponentProps<"div"> {
  header?: React.ReactNode
  stats?: React.ReactNode
  charts?: React.ReactNode
}

export function AnalyticsDashboard({
  header,
  stats,
  charts,
  children,
  className,
  ...props
}: AnalyticsDashboardProps) {
  return (
    <div className={cn("flex flex-1 flex-col gap-6 p-6", className)} {...props}>
      {header}
      {stats}
      {charts && (
        <div className="grid gap-6 md:grid-cols-2">{charts}</div>
      )}
      {children && <div className="flex-1">{children}</div>}
    </div>
  )
}
