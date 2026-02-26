"use client"

/**
 * ChartLineInteractive Pattern
 *
 * An interactive line chart with series toggling and summary totals.
 * Accepts data, series, and display configuration as props.
 *
 * Composed of: Card, Chart from our component library + recharts
 * Source: shadcn/ui chart-line-interactive (v4), extended with configurable API
 * Normalized: 2025-02 — relative imports, semantic tokens
 */

import * as React from "react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

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

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface LineSeries {
  /** Key in data objects for this series' values */
  dataKey: string
  /** Display label in legend/tooltip */
  label: string
  /** Color — CSS value or chart variable. Falls back to --chart-N */
  color?: string
}

export interface ChartLineInteractiveProps {
  /** Data array */
  data?: Record<string, unknown>[]
  /** Series definitions — one per line */
  series?: LineSeries[]
  /** Key for X axis @default "date" */
  xAxisKey?: string
  /** Title */
  title?: string
  /** Description */
  description?: string
  /** X axis tick formatter */
  xAxisFormatter?: (value: string) => string
  /** Tooltip label formatter */
  tooltipLabelFormatter?: (value: React.ReactNode) => React.ReactNode
  /** Curve type @default "monotone" */
  curveType?: "monotone" | "natural" | "linear" | "step" | "basis"
  /** Stroke width @default 2 */
  strokeWidth?: number
  /** Show dots @default false */
  showDots?: boolean
  /** Show series toggle buttons @default true */
  showSeriesToggle?: boolean
  /** Format total values @default toLocaleString */
  formatTotal?: (value: number) => string
  /** Show Y axis @default false */
  showYAxis?: boolean
  /** Show grid @default true */
  showGrid?: boolean
  /** Show legend (when toggle hidden) @default false */
  showLegend?: boolean
  /** Chart height @default 250 */
  height?: number
  /** Palette override */
  palette?: ChromaticPaletteName
  /** Show Card wrapper @default true */
  showCard?: boolean
  /** CSS class */
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
  { date: "2024-04-30", desktop: 454, mobile: 380 },
  { date: "2024-05-15", desktop: 473, mobile: 380 },
  { date: "2024-05-30", desktop: 340, mobile: 280 },
  { date: "2024-06-15", desktop: 307, mobile: 350 },
  { date: "2024-06-30", desktop: 446, mobile: 400 },
]

const defaultSeries: LineSeries[] = [
  { dataKey: "desktop", label: "Desktop", color: "var(--chart-1)" },
  { dataKey: "mobile", label: "Mobile", color: "var(--chart-2)" },
]

const defaultXAxisFormatter = (value: string) => {
  const date = new Date(value)
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ChartLineInteractive({
  data = defaultData,
  series = defaultSeries,
  xAxisKey = "date",
  title = "Line Chart - Interactive",
  description = "Showing total visitors for the last 3 months",
  xAxisFormatter = defaultXAxisFormatter,
  tooltipLabelFormatter,
  curveType = "monotone",
  strokeWidth = 2,
  showDots = false,
  showSeriesToggle = true,
  formatTotal = (v) => v.toLocaleString(),
  showYAxis = false,
  showGrid = true,
  showLegend = false,
  height = 250,
  palette,
  showCard = true,
  className,
}: ChartLineInteractiveProps) {
  const paletteId = React.useId().replace(/:/g, "")

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

  const [activeChart, setActiveChart] = React.useState(series[0]?.dataKey ?? "")

  const totals = React.useMemo(() => {
    const result: Record<string, number> = {}
    series.forEach((s) => {
      result[s.dataKey] = data.reduce(
        (acc, curr) => acc + (Number(curr[s.dataKey]) || 0),
        0
      )
    })
    return result
  }, [data, series])

  const defaultTooltipFormatter =
    tooltipLabelFormatter ??
    ((value: React.ReactNode) =>
      new Date(String(value)).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }))

  const chartContent = (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto w-full"
      style={{ height }}
    >
      <LineChart accessibilityLayer data={data} margin={{ left: 12, right: 12 }}>
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
          content={
            <ChartTooltipContent
              className="w-[150px]"
              nameKey="views"
              labelFormatter={defaultTooltipFormatter}
            />
          }
        />
        {showSeriesToggle ? (
          <Line
            dataKey={activeChart}
            type={curveType}
            stroke={`var(--color-${activeChart})`}
            strokeWidth={strokeWidth}
            dot={showDots}
          />
        ) : (
          series.map((s) => (
            <Line
              key={s.dataKey}
              dataKey={s.dataKey}
              type={curveType}
              stroke={`var(--color-${s.dataKey})`}
              strokeWidth={strokeWidth}
              dot={showDots}
            />
          ))
        )}
        {showLegend && !showSeriesToggle && (
          // @ts-expect-error recharts v3 passes payload via render
          <ChartLegend content={<ChartLegendContent />} />
        )}
      </LineChart>
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

  if (!showCard) return <div className={className}>{wrapped}</div>

  return (
    <Card className={className}>
      <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-4 sm:py-6">
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        {showSeriesToggle && (
          <div className="flex">
            {series.map((s) => (
              <button
                key={s.dataKey}
                data-active={activeChart === s.dataKey}
                className="data-[active=true]:bg-muted/50 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
                onClick={() => setActiveChart(s.dataKey)}
              >
                <span className="text-muted-foreground text-xs">
                  {chartConfig[s.dataKey]?.label}
                </span>
                <span className="text-lg leading-none font-bold sm:text-3xl">
                  {formatTotal(totals[s.dataKey] ?? 0)}
                </span>
              </button>
            ))}
          </div>
        )}
      </CardHeader>
      <CardContent className="px-2 sm:p-6">{wrapped}</CardContent>
    </Card>
  )
}
