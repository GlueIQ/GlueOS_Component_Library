import * as React from "react"
import { cn } from "../../lib/utils"

export interface AppBrandingProps {
  /** Icon/logomark — visible in both expanded and collapsed sidebar states */
  icon?: React.ReactNode
  /** Wordmark or app name — hidden when the sidebar collapses to icon rail */
  name?: React.ReactNode
  /** If provided, wraps content in an anchor tag */
  href?: string
  className?: string
}

export function AppBranding({ icon, name, href, className }: AppBrandingProps) {
  const inner = (
    <>
      {icon && (
        <div className="shrink-0">
          {icon}
        </div>
      )}
      {name && (
        <div className="grid flex-1 overflow-hidden text-left leading-tight group-data-[collapsible=icon]:hidden">
          {name}
        </div>
      )}
    </>
  )

  const containerClass = cn(
    "flex h-12 w-full items-center gap-2 overflow-hidden px-2",
    "group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:w-8",
    "group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0 group-data-[collapsible=icon]:px-0",
    className
  )

  if (href) {
    return (
      <a href={href} className={containerClass}>
        {inner}
      </a>
    )
  }

  return <div className={containerClass}>{inner}</div>
}
