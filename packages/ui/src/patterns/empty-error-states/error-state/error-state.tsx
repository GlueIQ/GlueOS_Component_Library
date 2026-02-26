/**
 * ErrorState Pattern
 *
 * A display for errors with retry and fallback actions.
 * Composed of: Button from our component library
 * Normalized: 2025-02 — relative imports, semantic tokens
 */

import { cn } from "../../../lib/utils"
import { Button } from "../../../components/ui/button"

interface ErrorStateProps extends React.ComponentProps<"div"> {
  icon?: React.ReactNode
  title?: string
  description?: string
  retryAction?: { label: string; onClick?: () => void }
  fallbackAction?: { label: string; onClick?: () => void }
}

function AlertCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  )
}

export function ErrorState({
  icon,
  title = "Something went wrong",
  description = "An unexpected error occurred. Please try again or contact support if the problem persists.",
  retryAction,
  fallbackAction,
  className,
  ...props
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-lg border p-8 text-center",
        className
      )}
      {...props}
    >
      <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        {icon ?? <AlertCircleIcon className="size-6" />}
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      {description && (
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          {description}
        </p>
      )}
      <div className="mt-4 flex gap-2">
        {retryAction && (
          <Button onClick={retryAction.onClick}>{retryAction.label}</Button>
        )}
        {fallbackAction && (
          <Button variant="outline" onClick={fallbackAction.onClick}>
            {fallbackAction.label}
          </Button>
        )}
      </div>
    </div>
  )
}
