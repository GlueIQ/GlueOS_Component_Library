"use client"

/**
 * ChartAreaInteractive Pattern
 *
 * An interactive area chart with time-range filtering, gradient fills,
 * and stacked areas. Accepts data, series, and display configuration
 * as props for reuse across applications.
 *
 * Composed of: Card, Chart, Select from our component library + recharts
 * Source: shadcn/ui chart-area-interactive (v4), extended with configurable API
 * Normalized: 2025-02 — relative imports, semantic tokens
 */

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { ChartPaletteStyle } from "../../../lib/chart-palette-utils"
import type { ChromaticPaletteName } from "../../../lib/colors/chart-palettes"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "../../../components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface AreaSeries {
  /** Key in data objects for this series' values */
  dataKey: string
  /** Display label in legend/tooltip */
  label: string
  /** Color — CSS value or chart variable. Falls back to --chart-N */
  color?: string
}

export interface TimeRangeOption {
  /** Value identifier, e.g. "7d", "30d", "90d" */
  value: string
  /** Display label, e.g. "Last 7 days" */
  label: string
  /** Number of days to filter from the end of the dataset */
  days: number
}

export interface ChartAreaInteractiveProps {
  /**
   * Data array. Each object must include the xAxisKey and one numeric value
   * per series.
   */
  data?: Record<string, unknown>[]
  /**
   * Series definitions — one per area layer.
   */
  series?: AreaSeries[]
  /**
   * Key in each data object used for the X axis.
   * @default "date"
   */
  xAxisKey?: string
  /** Title */
  title?: string
  /** Description */
  description?: string
  /**
   * Format function for X axis tick labels.
   * @default formats dates as "Mon DD"
   */
  xAxisFormatter?: (value: string) => string
  /**
   * Format function for tooltip label.
   */
  tooltipLabelFormatter?: (value: React.ReactNode) => React.ReactNode
  /**
   * Whether areas are stacked.
   * @default true
   */
  stacked?: boolean
  /**
   * Whether to show gradient fills below the area lines.
   * @default true
   */
  showGradient?: boolean
  /**
   * Curve interpolation type.
   * @default "natural"
   */
  curveType?: "natural" | "monotone" | "linear" | "step" | "basis"
  /**
   * Whether to show the time-range filter.
   * When true, provide timeRangeOptions and a dateKey for filtering.
   * @default true
   */
  showTimeFilter?: boolean
  /**
   * Options for the time-range filter dropdown.
   */
  timeRangeOptions?: TimeRangeOption[]
  /**
   * Default selected time range value.
   * @default "90d"
   */
  defaultTimeRange?: string
  /**
   * Whether to show the Y axis.
   * @default false
   */
  showYAxis?: boolean
  /**
   * Whether to show the grid.
   * @default true
   */
  showGrid?: boolean
  /**
   * Whether to show the legend.
   * @default true
   */
  showLegend?: boolean
  /** Chart height
   * @default 250
   */
  height?: number
  /** Tailwind color palette override */
  palette?: ChromaticPaletteName
  /** Show Card wrapper
   * @default true
   */
  showCard?: boolean
  /** Additional CSS class */
  className?: string
}

// ---------------------------------------------------------------------------
// Demo data
// ---------------------------------------------------------------------------

const defaultData = [
  { date: "2024-04-01", desktop: 222, mobile: 150 },
  { date: "2024-04-02", desktop: 97, mobile: 180 },
  { date: "2024-04-03", desktop: 167, mobile: 120 },
  { date: "2024-04-04", desktop: 242, mobile: 260 },
  { date: "2024-04-05", desktop: 373, mobile: 290 },
  { date: "2024-04-06", desktop: 301, mobile: 340 },
  { date: "2024-04-07", desktop: 245, mobile: 180 },
  { date: "2024-04-08", desktop: 409, mobile: 320 },
  { date: "2024-04-09", desktop: 59, mobile: 110 },
  { date: "2024-04-10", desktop: 261, mobile: 190 },
  { date: "2024-04-11", desktop: 327, mobile: 350 },
  { date: "2024-04-12", desktop: 292, mobile: 210 },
  { date: "2024-04-13", desktop: 342, mobile: 380 },
  { date: "2024-04-14", desktop: 137, mobile: 220 },
  { date: "2024-04-15", desktop: 120, mobile: 170 },
  { date: "2024-04-16", desktop: 138, mobile: 190 },
  { date: "2024-04-17", desktop: 446, mobile: 360 },
  { date: "2024-04-18", desktop: 364, mobile: 410 },
  { date: "2024-04-19", desktop: 243, mobile: 180 },
  { date: "2024-04-20", desktop: 89, mobile: 150 },
  { date: "2024-04-21", desktop: 137, mobile: 200 },
  { date: "2024-04-22", desktop: 224, mobile: 170 },
  { date: "2024-04-23", desktop: 138, mobile: 230 },
  { date: "2024-04-24", desktop: 387, mobile: 290 },
  { date: "2024-04-25", desktop: 215, mobile: 250 },
  { date: "2024-04-26", desktop: 75, mobile: 130 },
  { date: "2024-04-27", desktop: 383, mobile: 420 },
  { date: "2024-04-28", desktop: 122, mobile: 180 },
  { date: "2024-04-29", desktop: 315, mobile: 240 },
  { date: "2024-04-30", desktop: 454, mobile: 380 },
  { date: "2024-05-01", desktop: 165, mobile: 220 },
  { date: "2024-05-02", desktop: 293, mobile: 310 },
  { date: "2024-05-03", desktop: 247, mobile: 190 },
  { date: "2024-05-04", desktop: 385, mobile: 420 },
  { date: "2024-05-05", desktop: 481, mobile: 390 },
  { date: "2024-05-06", desktop: 498, mobile: 520 },
  { date: "2024-05-07", desktop: 388, mobile: 300 },
  { date: "2024-05-08", desktop: 149, mobile: 210 },
  { date: "2024-05-09", desktop: 227, mobile: 180 },
  { date: "2024-05-10", desktop: 293, mobile: 330 },
  { date: "2024-05-11", desktop: 335, mobile: 270 },
  { date: "2024-05-12", desktop: 197, mobile: 240 },
  { date: "2024-05-13", desktop: 197, mobile: 160 },
  { date: "2024-05-14", desktop: 448, mobile: 490 },
  { date: "2024-05-15", desktop: 473, mobile: 380 },
  { date: "2024-05-16", desktop: 338, mobile: 400 },
  { date: "2024-05-17", desktop: 499, mobile: 420 },
  { date: "2024-05-18", desktop: 315, mobile: 350 },
  { date: "2024-05-19", desktop: 235, mobile: 180 },
  { date: "2024-05-20", desktop: 177, mobile: 230 },
  { date: "2024-05-21", desktop: 82, mobile: 140 },
  { date: "2024-05-22", desktop: 81, mobile: 120 },
  { date: "2024-05-23", desktop: 252, mobile: 290 },
  { date: "2024-05-24", desktop: 294, mobile: 220 },
  { date: "2024-05-25", desktop: 201, mobile: 250 },
  { date: "2024-05-26", desktop: 213, mobile: 170 },
  { date: "2024-05-27", desktop: 420, mobile: 460 },
  { date: "2024-05-28", desktop: 233, mobile: 190 },
  { date: "2024-05-29", desktop: 78, mobile: 130 },
  { date: "2024-05-30", desktop: 340, mobile: 280 },
  { date: "2024-05-31", desktop: 178, mobile: 230 },
  { date: "2024-06-01", desktop: 178, mobile: 200 },
  { date: "2024-06-02", desktop: 470, mobile: 410 },
  { date: "2024-06-03", desktop: 103, mobile: 160 },
  { date: "2024-06-04", desktop: 439, mobile: 380 },
  { date: "2024-06-05", desktop: 88, mobile: 140 },
  { date: "2024-06-06", desktop: 294, mobile: 250 },
  { date: "2024-06-07", desktop: 323, mobile: 370 },
  { date: "2024-06-08", desktop: 385, mobile: 320 },
  { date: "2024-06-09", desktop: 438, mobile: 480 },
  { date: "2024-06-10", desktop: 155, mobile: 200 },
  { date: "2024-06-11", desktop: 92, mobile: 150 },
  { date: "2024-06-12", desktop: 492, mobile: 420 },
  { date: "2024-06-13", desktop: 81, mobile: 130 },
  { date: "2024-06-14", desktop: 426, mobile: 380 },
  { date: "2024-06-15", desktop: 307, mobile: 350 },
  { date: "2024-06-16", desktop: 371, mobile: 310 },
  { date: "2024-06-17", desktop: 475, mobile: 520 },
  { date: "2024-06-18", desktop: 107, mobile: 170 },
  { date: "2024-06-19", desktop: 341, mobile: 290 },
  { date: "2024-06-20", desktop: 408, mobile: 450 },
  { date: "2024-06-21", desktop: 169, mobile: 210 },
  { date: "2024-06-22", desktop: 317, mobile: 270 },
  { date: "2024-06-23", desktop: 480, mobile: 530 },
  { date: "2024-06-24", desktop: 132, mobile: 180 },
  { date: "2024-06-25", desktop: 141, mobile: 190 },
  { date: "2024-06-26", desktop: 434, mobile: 380 },
  { date: "2024-06-27", desktop: 448, mobile: 490 },
  { date: "2024-06-28", desktop: 149, mobile: 200 },
  { date: "2024-06-29", desktop: 103, mobile: 160 },
  { date: "2024-06-30", desktop: 446, mobile: 400 },
]

const defaultSeries: AreaSeries[] = [
  { dataKey: "desktop", label: "Desktop", color: "var(--chart-1)" },
  { dataKey: "mobile", label: "Mobile", color: "var(--chart-2)" },
]

const defaultTimeRangeOptions: TimeRangeOption[] = [
  { value: "90d", label: "Last 3 months", days: 90 },
  { value: "30d", label: "Last 30 days", days: 30 },
  { value: "7d", label: "Last 7 days", days: 7 },
]

const defaultXAxisFormatter = (value: string) => {
  const date = new Date(value)
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ChartAreaInteractive({
  data = defaultData,
  series = defaultSeries,
  xAxisKey = "date",
  title = "Area Chart - Interactive",
  description = "Showing total visitors for the last 3 months",
  xAxisFormatter = defaultXAxisFormatter,
  tooltipLabelFormatter,
  stacked = true,
  showGradient = true,
  curveType = "natural",
  showTimeFilter = true,
  timeRangeOptions = defaultTimeRangeOptions,
  defaultTimeRange = "90d",
  showYAxis = false,
  showGrid = true,
  showLegend = true,
  height = 250,
  palette,
  showCard = true,
  className,
}: ChartAreaInteractiveProps) {
  const paletteId = React.useId().replace(/:/g, "")
  const [timeRange, setTimeRange] = React.useState(defaultTimeRange)

  // Build chart config from series
  const chartConfig = React.useMemo(() => {
    const config: ChartConfig = {}
    series.forEach((s, i) => {
      config[s.dataKey] = {
        label: s.label,
        color: s.color ?? `var(--chart-${i + 1})`,
      }
    })
    return config
  }, [series])

  // Time-range filtering
  const filteredData = React.useMemo(() => {
    if (!showTimeFilter || !data.length) return data

    const option = timeRangeOptions.find((o) => o.value === timeRange)
    if (!option) return data

    // Find the max date in the data
    const dates = data
      .map((d) => new Date(d[xAxisKey] as string))
      .filter((d) => !isNaN(d.getTime()))

    if (!dates.length) return data

    const maxDate = new Date(Math.max(...dates.map((d) => d.getTime())))
    const startDate = new Date(maxDate)
    startDate.setDate(startDate.getDate() - option.days)

    return data.filter((item) => {
      const date = new Date(item[xAxisKey] as string)
      return date >= startDate
    })
  }, [data, timeRange, showTimeFilter, timeRangeOptions, xAxisKey])

  const defaultTooltipFormatter =
    tooltipLabelFormatter ??
    ((value: React.ReactNode) =>
      new Date(String(value)).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }))

  const gradientId = React.useId().replace(/:/g, "")

  const chartContent = (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto w-full"
      style={{ height }}
    >
      <AreaChart data={filteredData}>
        {showGradient && (
          <defs>
            {series.map((s) => (
              <linearGradient
                key={s.dataKey}
                id={`fill-${s.dataKey}-${gradientId}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor={`var(--color-${s.dataKey})`}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={`var(--color-${s.dataKey})`}
                  stopOpacity={0.1}
                />
              </linearGradient>
            ))}
          </defs>
        )}
        {showGrid && <CartesianGrid vertical={false} />}
        <XAxis
          dataKey={xAxisKey}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={32}
          tickFormatter={xAxisFormatter}
        />
        {showYAxis && <YAxis tickLine={false} axisLine={false} />}
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              labelFormatter={defaultTooltipFormatter}
              indicator="dot"
            />
          }
        />
        {series.map((s) => (
          <Area
            key={s.dataKey}
            dataKey={s.dataKey}
            type={curveType}
            fill={
              showGradient
                ? `url(#fill-${s.dataKey}-${gradientId})`
                : `var(--color-${s.dataKey})`
            }
            stroke={`var(--color-${s.dataKey})`}
            stackId={stacked ? "a" : undefined}
          />
        ))}
        {showLegend && (
          // @ts-expect-error recharts v3 passes payload via render
          <ChartLegend content={<ChartLegendContent />} />
        )}
      </AreaChart>
    </ChartContainer>
  )

  const wrapped = palette ? (
    <div data-chart-palette={paletteId}>
      <ChartPaletteStyle palette={palette} scopeId={paletteId} />
      {chartContent}
    </div>
  ) : (
    chartContent
  )

  if (!showCard)
    return <div className={className}>{wrapped}</div>

  return (
    <Card className={className}>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        {showTimeFilter && (
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
              aria-label="Select a value"
            >
              <SelectValue placeholder={timeRangeOptions[0]?.label} />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              {timeRangeOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value} className="rounded-lg">
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        {wrapped}
      </CardContent>
    </Card>
  )
}
