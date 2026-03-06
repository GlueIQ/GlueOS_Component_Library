import * as React from "react"
import { Badge } from "./badge"
import { cn } from "../../lib/utils"

export type StatusVariant =
  | "draft"
  | "pending"
  | "in_progress"
  | "in_review"
  | "approved"
  | "active"
  | "complete"
  | "error"
  | "warning"
  | "archived"

export interface StatusConfig {
  label: string
  className?: string
  animate?: boolean
}

const defaultStatusConfig: Record<StatusVariant, StatusConfig> = {
  draft: {
    label: "Draft",
    className: "bg-zinc-100 text-zinc-600 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700",
  },
  pending: {
    label: "Pending",
    className: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800",
  },
  in_progress: {
    label: "In Progress",
    className: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800",
    animate: true,
  },
  in_review: {
    label: "In Review",
    className: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800",
  },
  approved: {
    label: "Approved",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800",
  },
  active: {
    label: "Active",
    className: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800",
  },
  complete: {
    label: "Complete",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800",
  },
  error: {
    label: "Error",
    className: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800",
  },
  warning: {
    label: "Warning",
    className: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800",
  },
  archived: {
    label: "Archived",
    className: "bg-zinc-100 text-zinc-500 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-500 dark:border-zinc-700",
  },
}

export interface StatusBadgeProps extends Omit<React.ComponentProps<typeof Badge>, "variant"> {
  status: StatusVariant | string
  customConfig?: Record<string, StatusConfig>
  showDot?: boolean
}

const StatusBadge = React.forwardRef<HTMLSpanElement, StatusBadgeProps>(
  ({ status, customConfig, showDot = false, className, children, ...props }, ref) => {
    const config = customConfig?.[status] ?? defaultStatusConfig[status as StatusVariant] ?? {
      label: status,
      className: "border-muted-foreground/50 text-muted-foreground",
    }

    return (
      <Badge
        ref={ref}
        variant="outline"
        className={cn(
          "font-medium",
          config.animate && "animate-pulse",
          config.className,
          className
        )}
        {...props}
      >
        {showDot && (
          <span className="mr-1 size-1.5 rounded-full bg-current" aria-hidden="true" />
        )}
        {children ?? config.label}
      </Badge>
    )
  }
)

StatusBadge.displayName = "StatusBadge"

export { StatusBadge }
