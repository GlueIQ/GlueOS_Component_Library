"use client"

/**
 * ChartComposedInteractive Pattern
 *
 * An interactive composed chart (bars + lines) with dual Y-axes support.
 * Accepts data, series configuration, and display options as props.
 *
 * Composed of: Card, Chart from our component library + recharts
 * Use case: Financial charts with revenue/costs (bars) and margins (line)
 * Normalized: 2026-02 — relative imports, semantic tokens
 */

import * as React from "react"
import { Bar, Line, ComposedChart, CartesianGrid, XAxis, YAxis, ReferenceLine } from "recharts"

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

export interface ComposedSeries {
  /** Key in data objects for this series' values */
  dataKey: string
  /** Display label in legend/tooltip */
  label: string
  /** Type of chart element */
  type: "bar" | "line"
  /** Which Y-axis to use */
  yAxisId?: "left" | "right"
  /** Color — CSS value or chart variable. Falls back to --chart-N */
  color?: string
  /** Value formatter function */
  formatter?: (value: number) => string
}

export interface ChartComposedInteractiveProps {
  /** Data array */
  data?: Record<string, unknown>[]
  /** Series configuration */
  series?: ComposedSeries[]
  /** X-axis data key */
  xAxisKey?: string
  /** Left Y-axis label */
  leftAxisLabel?: string
  /** Right Y-axis label */
  rightAxisLabel?: string
  /** Left Y-axis formatter */
  leftAxisFormatter?: (value: number) => string
  /** Right Y-axis formatter */
  rightAxisFormatter?: (value: number) => string
  /** Show zero reference line */
  showReferenceLine?: boolean
  /** Card title */
  title?: string
  /** Card description */
  description?: string
  /** Color palette */
  palette?: ChromaticPaletteName
  /** Custom height (default: 350px) */
  height?: number
}

// ---------------------------------------------------------------------------
// Default Configuration
// ---------------------------------------------------------------------------

const defaultData = [
  { name: "Jan", revenue: 120000, costs: 85000, margin: 29 },
  { name: "Feb", revenue: 135000, costs: 92000, margin: 32 },
  { name: "Mar", revenue: 145000, costs: 98000, margin: 32 },
  { name: "Apr", revenue: 128000, costs: 88000, margin: 31 },
  { name: "May", revenue: 152000, costs: 102000, margin: 33 },
  { name: "Jun", revenue: 168000, costs: 110000, margin: 35 },
]

const defaultSeries: ComposedSeries[] = [
  {
    dataKey: "revenue",
    label: "Revenue",
    type: "bar",
    yAxisId: "left",
    color: "var(--chart-1))",
    formatter: (value) => `$${(value / 1000).toFixed(0)}k`,
  },
  {
    dataKey: "costs",
    label: "Costs",
    type: "bar",
    yAxisId: "left",
    color: "var(--chart-2))",
    formatter: (value) => `$${(value / 1000).toFixed(0)}k`,
  },
  {
    dataKey: "margin",
    label: "Margin %",
    type: "line",
    yAxisId: "right",
    color: "var(--chart-3))",
    formatter: (value) => `${value}%`,
  },
]

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ChartComposedInteractive({
  data = defaultData,
  series = defaultSeries,
  xAxisKey = "name",
  leftAxisLabel,
  rightAxisLabel,
  leftAxisFormatter = (value) => `$${(value / 1000).toFixed(0)}k`,
  rightAxisFormatter = (value) => `${value}%`,
  showReferenceLine = true,
  title,
  description,
  palette = "blue",
  height = 350,
}: ChartComposedInteractiveProps) {
  // Build chart config
  const chartConfig = React.useMemo(() => {
    const config: ChartConfig = {}
    series.forEach((s, idx) => {
      config[s.dataKey] = {
        label: s.label,
        color: s.color || `var(--chart-${idx + 1})`,
      }
    })
    return config
  }, [series])

  const content = (
    <ChartContainer config={chartConfig} style={{ height: `${height}px` }}>
      <ComposedChart
        data={data}
        margin={{
          top: 20,
          right: 20,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey={xAxisKey}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          fontSize={12}
        />
        <YAxis
          yAxisId="left"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          fontSize={12}
          tickFormatter={leftAxisFormatter}
          label={leftAxisLabel ? { value: leftAxisLabel, angle: -90, position: "insideLeft" } : undefined}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          fontSize={12}
          tickFormatter={rightAxisFormatter}
          label={rightAxisLabel ? { value: rightAxisLabel, angle: 90, position: "insideRight" } : undefined}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              formatter={(value, name) => {
                const seriesConfig = series.find((s) => s.dataKey === name)
                const formattedValue = seriesConfig?.formatter
                  ? seriesConfig.formatter(value as number)
                  : value
                return [formattedValue, seriesConfig?.label || name]
              }}
            />
          }
        />
        <ChartLegend content={<ChartLegendContent />} />

        {showReferenceLine && <ReferenceLine y={0} stroke="var(--muted-foreground)" opacity={0.3} />}

        {series.map((s, idx) => {
          if (s.type === "bar") {
            return (
              <Bar
                key={s.dataKey}
                yAxisId={s.yAxisId || "left"}
                dataKey={s.dataKey}
                fill={s.color || `var(--chart-${idx + 1}))`}
                radius={[4, 4, 0, 0]}
                barSize={20}
              />
            )
          } else {
            return (
              <Line
                key={s.dataKey}
                yAxisId={s.yAxisId || "right"}
                type="monotone"
                dataKey={s.dataKey}
                stroke={s.color || `var(--chart-${idx + 1}))`}
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            )
          }
        })}
      </ComposedChart>
    </ChartContainer>
  )

  if (title || description) {
    return (
      <Card>
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent>
          {palette && <ChartPaletteStyle palette={palette} />}
          {content}
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      {palette && <ChartPaletteStyle palette={palette} />}
      {content}
    </>
  )
}
