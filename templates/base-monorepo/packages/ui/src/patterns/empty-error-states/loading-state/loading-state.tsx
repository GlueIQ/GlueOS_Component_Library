/**
 * LoadingState Pattern
 *
 * A loading placeholder with skeleton components.
 * Composed of: Skeleton, Card from our component library
 * Normalized: 2025-02 — relative imports, semantic tokens
 */

import { cn } from "../../../lib/utils"
import { Skeleton } from "../../../components/ui/skeleton"
import { Card, CardContent, CardHeader } from "../../../components/ui/card"

interface LoadingStateProps extends React.ComponentProps<"div"> {
  variant?: "card" | "list" | "inline"
  count?: number
}

function CardSkeleton() {
  return (
    <Card>
      <CardHeader className="space-y-2">
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="h-4 w-2/3" />
      </CardHeader>
      <CardContent className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-3/5" />
      </CardContent>
    </Card>
  )
}

function ListSkeleton() {
  return (
    <div className="flex items-center gap-4 py-3">
      <Skeleton className="size-10 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
      <Skeleton className="h-8 w-16" />
    </div>
  )
}

function InlineSkeleton() {
  return (
    <div className="flex items-center justify-center gap-2 py-8">
      <div className="size-4 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
      <span className="text-sm text-muted-foreground">Loading...</span>
    </div>
  )
}

export function LoadingState({
  variant = "card",
  count = 3,
  className,
  ...props
}: LoadingStateProps) {
  if (variant === "inline") {
    return (
      <div className={cn(className)} {...props}>
        <InlineSkeleton />
      </div>
    )
  }

  return (
    <div className={cn("space-y-4", className)} {...props}>
      {Array.from({ length: count }, (_, i) => (
        <div key={i}>
          {variant === "card" && <CardSkeleton />}
          {variant === "list" && <ListSkeleton />}
        </div>
      ))}
    </div>
  )
}
