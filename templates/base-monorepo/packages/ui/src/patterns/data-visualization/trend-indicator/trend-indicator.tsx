/**
 * TrendIndicator Pattern
 *
 * Shows increase/decrease with color-coded icon and percentage.
 * Composed of: Badge from our component library
 * Normalized: 2025-02 — relative imports, semantic tokens
 */

import { cn } from "../../../lib/utils"

type TrendDirection = "up" | "down" | "neutral"

interface TrendIndicatorProps extends React.ComponentProps<"span"> {
  value: number
  direction?: TrendDirection
  showIcon?: boolean
  suffix?: string
}

function ArrowUpIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M8 14a.75.75 0 0 1-.75-.75V4.56L4.03 7.78a.75.75 0 0 1-1.06-1.06l4.5-4.5a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06L8.75 4.56v8.69A.75.75 0 0 1 8 14Z" clipRule="evenodd" />
    </svg>
  )
}

function ArrowDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M8 2a.75.75 0 0 1 .75.75v8.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.22 3.22V2.75A.75.75 0 0 1 8 2Z" clipRule="evenodd" />
    </svg>
  )
}

function MinusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" {...props}>
      <path d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z" />
    </svg>
  )
}

export function TrendIndicator({
  value,
  direction,
  showIcon = true,
  suffix = "%",
  className,
  ...props
}: TrendIndicatorProps) {
  const resolvedDirection: TrendDirection =
    direction ?? (value > 0 ? "up" : value < 0 ? "down" : "neutral")

  const Icon =
    resolvedDirection === "up"
      ? ArrowUpIcon
      : resolvedDirection === "down"
        ? ArrowDownIcon
        : MinusIcon

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-sm font-medium",
        resolvedDirection === "up" && "text-emerald-600 dark:text-emerald-400",
        resolvedDirection === "down" && "text-red-600 dark:text-red-400",
        resolvedDirection === "neutral" && "text-muted-foreground",
        className
      )}
      {...props}
    >
      {showIcon && <Icon className="size-3.5" />}
      {Math.abs(value)}
      {suffix}
    </span>
  )
}
