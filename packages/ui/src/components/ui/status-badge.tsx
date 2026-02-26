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
    className: "bg-muted text-muted-foreground border-0",
  },
  pending: {
    label: "Pending",
    className: "border-muted-foreground/50 text-muted-foreground",
  },
  in_progress: {
    label: "In Progress",
    className: "bg-status-info/10 text-status-info-foreground border-status-info/20",
    animate: true,
  },
  in_review: {
    label: "In Review",
    className: "bg-status-warning/10 text-status-warning-foreground border-status-warning/20",
  },
  approved: {
    label: "Approved",
    className: "bg-status-success/10 text-status-success-foreground border-status-success/20",
  },
  active: {
    label: "Active",
    className: "bg-status-info/10 text-status-info-foreground border-status-info/20",
  },
  complete: {
    label: "Complete",
    className: "bg-status-success/10 text-status-success-foreground border-status-success/20",
  },
  error: {
    label: "Error",
    className: "bg-status-error/10 text-status-error-foreground border-status-error/20",
  },
  warning: {
    label: "Warning",
    className: "bg-status-warning/10 text-status-warning-foreground border-status-warning/20",
  },
  archived: {
    label: "Archived",
    className: "bg-muted text-muted-foreground/70 border-0",
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
