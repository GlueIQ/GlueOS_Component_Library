/**
 * GridView Layout
 *
 * A responsive grid layout with header, view toggle, and pagination.
 * Normalized: 2025-02 — relative imports, semantic tokens
 */

import { cn } from "../../lib/utils"

interface GridViewProps extends React.ComponentProps<"div"> {
  header?: React.ReactNode
  toolbar?: React.ReactNode
  pagination?: React.ReactNode
  columns?: 2 | 3 | 4
}

export function GridView({
  header,
  toolbar,
  pagination,
  columns = 3,
  children,
  className,
  ...props
}: GridViewProps) {
  return (
    <div className={cn("flex flex-1 flex-col gap-6 p-6", className)} {...props}>
      {header}
      {toolbar}
      <div
        className={cn(
          "grid gap-4",
          columns === 2 && "grid-cols-1 sm:grid-cols-2",
          columns === 3 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
          columns === 4 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        )}
      >
        {children}
      </div>
      {pagination}
    </div>
  )
}
