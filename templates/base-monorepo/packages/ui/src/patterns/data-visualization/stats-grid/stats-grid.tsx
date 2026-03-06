/**
 * StatsGrid Pattern
 *
 * A responsive grid of stat cards showing key metrics.
 * Composed of: Card from our component library + TrendIndicator pattern
 * Normalized: 2025-02 — relative imports, semantic tokens
 */

import { cn } from "../../../lib/utils"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card"

export interface StatItem {
  label: string
  value: string | number
  description?: string
  trend?: { value: number; label?: string }
  icon?: React.ReactNode
}

interface StatsGridProps extends React.ComponentProps<"div"> {
  stats: StatItem[]
  columns?: 2 | 3 | 4
}

function TrendBadge({ value, label }: { value: number; label?: string }) {
  const isPositive = value > 0
  const isNeutral = value === 0
  return (
    <span
      className={cn(
        "text-xs font-medium",
        isPositive && "text-emerald-600 dark:text-emerald-400",
        !isPositive && !isNeutral && "text-red-600 dark:text-red-400",
        isNeutral && "text-muted-foreground"
      )}
    >
      {isPositive ? "+" : ""}
      {value}%{label ? ` ${label}` : ""}
    </span>
  )
}

export function StatsGrid({
  stats,
  columns = 4,
  className,
  ...props
}: StatsGridProps) {
  return (
    <div
      className={cn(
        "grid gap-4",
        columns === 2 && "grid-cols-1 sm:grid-cols-2",
        columns === 3 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        columns === 4 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
        className
      )}
      {...props}
    >
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.label}
            </CardTitle>
            {stat.icon && (
              <div className="text-muted-foreground">{stat.icon}</div>
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            {(stat.description || stat.trend) && (
              <p className="mt-1 text-xs text-muted-foreground">
                {stat.trend && <TrendBadge value={stat.trend.value} label={stat.trend.label} />}
                {stat.trend && stat.description && " "}
                {stat.description}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
