/**
 * ChartCard Pattern
 *
 * A card wrapper for charts with title, description, and optional time range selector.
 * Composed of: Card, Select from our component library
 * Normalized: 2025-02 — relative imports, semantic tokens
 */

import { cn } from "../../../lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select"

interface TimeRange {
  label: string
  value: string
}

interface ChartCardProps extends React.ComponentProps<"div"> {
  title: string
  description?: string
  timeRanges?: TimeRange[]
  defaultTimeRange?: string
  onTimeRangeChange?: (value: string) => void
  actions?: React.ReactNode
}

const defaultTimeRanges: TimeRange[] = [
  { label: "7 days", value: "7d" },
  { label: "30 days", value: "30d" },
  { label: "90 days", value: "90d" },
  { label: "1 year", value: "1y" },
]

export function ChartCard({
  title,
  description,
  timeRanges = defaultTimeRanges,
  defaultTimeRange = "30d",
  onTimeRangeChange,
  actions,
  children,
  className,
  ...props
}: ChartCardProps) {
  return (
    <Card className={cn(className)} {...props}>
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div className="space-y-1">
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        <div className="flex items-center gap-2">
          {actions}
          {timeRanges.length > 0 && (
            <Select
              defaultValue={defaultTimeRange}
              onValueChange={onTimeRangeChange}
            >
              <SelectTrigger className="h-8 w-[130px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {timeRanges.map((range) => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}
