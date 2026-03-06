/**
 * ListPage Layout
 *
 * A card-based list page with header, search/filters, and content list.
 * Normalized: 2025-02 — relative imports, semantic tokens
 */

import { cn } from "../../lib/utils"

interface ListPageProps extends React.ComponentProps<"div"> {
  header?: React.ReactNode
  filters?: React.ReactNode
}

export function ListPage({
  header,
  filters,
  children,
  className,
  ...props
}: ListPageProps) {
  return (
    <div className={cn("flex flex-1 flex-col gap-6 p-6", className)} {...props}>
      {header}
      {filters}
      <div className="flex-1">{children}</div>
    </div>
  )
}
