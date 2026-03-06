import * as React from "react"
import { cn } from "../../lib/utils"
import { Progress } from "./progress"

export type StatusBannerVariant = "info" | "success" | "warning" | "error"

export interface StatusBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: StatusBannerVariant
  icon?: React.ReactNode
  title: string
  message?: string
  progress?: number
  showProgress?: boolean
  action?: React.ReactNode
  animate?: boolean
}

const variantStyles: Record<StatusBannerVariant, { border: string; bg: string; icon: string; title: string }> = {
  info: {
    border: "border-status-info/30",
    bg: "bg-status-info/10",
    icon: "text-status-info",
    title: "text-status-info-foreground",
  },
  success: {
    border: "border-status-success/30",
    bg: "bg-status-success/10",
    icon: "text-status-success",
    title: "text-status-success-foreground",
  },
  warning: {
    border: "border-status-warning/30",
    bg: "bg-status-warning/10",
    icon: "text-status-warning",
    title: "text-status-warning-foreground",
  },
  error: {
    border: "border-status-error/30",
    bg: "bg-status-error/10",
    icon: "text-status-error",
    title: "text-status-error-foreground",
  },
}

const StatusBanner = React.forwardRef<HTMLDivElement, StatusBannerProps>(
  (
    {
      variant = "info",
      icon,
      title,
      message,
      progress,
      showProgress = false,
      action,
      animate = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const styles = variantStyles[variant]

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg border p-4",
          styles.border,
          styles.bg,
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-3">
          {icon && (
            <div className={cn("shrink-0", styles.icon, animate && "animate-pulse")}>
              {icon}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className={cn("font-semibold", styles.title)}>{title}</h3>
            {message && (
              <p className="text-sm text-muted-foreground mt-1">{message}</p>
            )}
            {children}
            {showProgress && progress !== undefined && (
              <div className="mt-3 space-y-1">
                <Progress value={progress} className="h-2" />
                <p className="text-xs text-muted-foreground">{progress}% complete</p>
              </div>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      </div>
    )
  }
)

StatusBanner.displayName = "StatusBanner"

export { StatusBanner }
