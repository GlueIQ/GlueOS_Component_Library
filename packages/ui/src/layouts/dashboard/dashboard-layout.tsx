/**
 * DashboardLayout
 *
 * A dashboard page layout with page header, stats grid, and content area.
 * Normalized: 2025-02 — relative imports, semantic tokens
 */

import { cn } from "../../lib/utils"

interface DashboardLayoutProps extends React.ComponentProps<"div"> {
  header?: React.ReactNode
  stats?: React.ReactNode
}

export function DashboardLayout({
  header,
  stats,
  children,
  className,
  ...props
}: DashboardLayoutProps) {
  return (
    <div className={cn("flex flex-1 flex-col gap-6 p-6", className)} {...props}>
      {header}
      {stats}
      <div className="flex-1">{children}</div>
    </div>
  )
}
