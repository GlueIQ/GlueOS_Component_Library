/**
 * DataTablePage Layout
 *
 * A page layout with header, filters, and a data table.
 * Normalized: 2025-02 — relative imports, semantic tokens
 */

import { cn } from "../../lib/utils"

interface DataTablePageProps extends React.ComponentProps<"div"> {
  header?: React.ReactNode
  filters?: React.ReactNode
}

export function DataTablePage({
  header,
  filters,
  children,
  className,
  ...props
}: DataTablePageProps) {
  return (
    <div className={cn("flex flex-1 flex-col gap-6 p-6", className)} {...props}>
      {header}
      {filters}
      <div className="flex-1">{children}</div>
    </div>
  )
}
