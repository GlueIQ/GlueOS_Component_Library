/**
 * DetailPage Layout
 *
 * A single item detail page with breadcrumb, header, tabs, and content sections.
 * Normalized: 2025-02 — relative imports, semantic tokens
 */

import { cn } from "../../lib/utils"
import { Separator } from "../../components/ui/separator"

interface DetailPageProps extends React.ComponentProps<"div"> {
  breadcrumb?: React.ReactNode
  header?: React.ReactNode
  tabs?: React.ReactNode
  actions?: React.ReactNode
}

export function DetailPage({
  breadcrumb,
  header,
  tabs,
  actions,
  children,
  className,
  ...props
}: DetailPageProps) {
  return (
    <div className={cn("flex flex-1 flex-col gap-6 p-6", className)} {...props}>
      {breadcrumb}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">{header}</div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
      <Separator />
      {tabs}
      <div className="flex-1">{children}</div>
    </div>
  )
}
