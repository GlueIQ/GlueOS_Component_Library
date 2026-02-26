"use client"

/**
 * ChartBarStackedInteractive Pattern
 *
 * A stacked (or grouped) bar chart for comparing composition across categories.
 * Supports horizontal orientation, custom series, and interactive tooltips.
 *
 * Covers Immersion T2 gap: LinkQualityBars, SpendComparison, VoiceBreakdown,
 * RatingDistribution, RegionalBreakdown, ThemeAnalysis
 *
 * Composed of: Card, Chart from our component library + recharts
 * Source: Custom
 */

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

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

export interface StackedBarSeries {
  /** Key in the data objects for this series' values */
  dataKey: string
  /** Display label in legend/tooltip */
  label: string
  /** Color — CSS value or chart variable. Falls back to --chart-N */
  color?: string
  /** Stack ID — bars with the same stackId stack on top of each other.
   * Leave undefined for grouped (side-by-side) bars.
   * @default "stack"
   */
  stackId?: string
}

export interface ChartBarStackedInteractiveProps {
  /**
   * Data array. Each object represents one category/bar group.
   *
   * @example
   * [
   *   { category: "SEO", doFollow: 450, noFollow: 120 },
   *   { category: "Social", doFollow: 320, noFollow: 280 },
   * ]
   */
  data?: Record<string, unknown>[]
  /**
   * Series definitions — one per stacked segment.
   */
  series?: StackedBarSeries[]
  /**
   * Key in each data object for the category axis (X or Y depending on orientation).
   * @default "category"
   */
  categoryKey?: string
  /** Title */
  title?: string
  /** Description */
  description?: string
  /**
   * Whether bars stack or sit side-by-side.
   * @default "stacked"
   */
  mode?: "stacked" | "grouped"
  /**
   * Orientation of the bars.
   * @default "vertical"
   */
  orientation?: "vertical" | "horizontal"
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
  /**
   * Bar corner radius.
   * @default 4
   */
  barRadius?: number
  /**
   * Bar size in pixels. If not set, recharts auto-sizes.
   */
  barSize?: number
  /** Tailwind color palette override */
  palette?: ChromaticPaletteName
  /** Chart height
   * @default 350
   */
  height?: number
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
  { category: "SEO", doFollow: 450, noFollow: 120 },
  { category: "Social", doFollow: 320, noFollow: 280 },
  { category: "Referral", doFollow: 190, noFollow: 90 },
  { category: "Direct", doFollow: 520, noFollow: 60 },
  { category: "Email", doFollow: 280, noFollow: 40 },
]

const defaultSeries: StackedBarSeries[] = [
  { dataKey: "doFollow", label: "DoFollow", color: "var(--chart-1)" },
  { dataKey: "noFollow", label: "NoFollow", color: "var(--chart-2)" },
]

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ChartBarStackedInteractive({
  data = defaultData,
  series = defaultSeries,
  categoryKey = "category",
  title = "Stacked Bar Chart",
  description = "Composition breakdown across categories",
  mode = "stacked",
  orientation = "vertical",
  showGrid = true,
  showLegend = true,
  barRadius = 4,
  barSize,
  palette,
  height = 350,
  showCard = true,
  className,
}: ChartBarStackedInteractiveProps) {
  const paletteId = React.useId().replace(/:/g, "")
  const isHorizontal = orientation === "horizontal"

  // Build chart config
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

  const chartContent = (
    <ChartContainer config={chartConfig} className="w-full" style={{ height }}>
      <BarChart
        data={data}
        layout={isHorizontal ? "vertical" : "horizontal"}
        margin={{ top: 8, right: 8, bottom: 8, left: 8 }}
      >
        {showGrid && <CartesianGrid vertical={!isHorizontal} horizontal={isHorizontal} strokeDasharray="3 3" />}

        {isHorizontal ? (
          <>
            <YAxis
              type="category"
              dataKey={categoryKey}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              width={80}
            />
            <XAxis type="number" tickLine={false} axisLine={false} />
          </>
        ) : (
          <>
            <XAxis
              dataKey={categoryKey}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis tickLine={false} axisLine={false} />
          </>
        )}

        <ChartTooltip content={<ChartTooltipContent />} />

        {series.map((s, i) => {
          const stackId =
            mode === "stacked" ? (s.stackId ?? "stack") : undefined
          return (
            <Bar
              key={s.dataKey}
              dataKey={s.dataKey}
              name={s.label}
              fill={`var(--color-${s.dataKey})`}
              stackId={stackId}
              radius={
                // Apply radius to top bar in stack or all bars in grouped mode
                mode === "grouped" || i === series.length - 1
                  ? [barRadius, barRadius, 0, 0]
                  : i === 0
                    ? [0, 0, barRadius, barRadius]
                    : undefined
              }
              barSize={barSize}
            />
          )
        })}

        {showLegend && (
          <ChartLegend content={<ChartLegendContent />} />
        )}
      </BarChart>
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
      {(title || description) && (
        <CardHeader className="pb-2">
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent className="pb-4">{wrapped}</CardContent>
    </Card>
  )
}
