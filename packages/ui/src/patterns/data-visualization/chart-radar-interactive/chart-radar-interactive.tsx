"use client"

/**
 * ChartRadarInteractive Pattern
 *
 * A radar/spider chart for comparing multiple dimensions across entities.
 * Uses recharts RadarChart with the GlueOS Chart wrapper.
 *
 * Covers Immersion T2 gap: VisibilityRadarChart, OpportunityRadar
 *
 * Composed of: Card, Chart from our component library + recharts
 * Source: Custom
 */

import * as React from "react"
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
} from "recharts"

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

export interface RadarSeries {
  /** Key in the data objects for this series' values */
  dataKey: string
  /** Display label in legend/tooltip */
  label: string
  /** Color — CSS value or chart variable. Falls back to --chart-N */
  color?: string
}

export interface ChartRadarInteractiveProps {
  /**
   * Data array where each item represents one axis/dimension.
   * Must include a key for the axis label and a numeric value per series.
   *
   * @example
   * [
   *   { axis: "SEO", brand: 80, competitor: 65 },
   *   { axis: "Social", brand: 72, competitor: 58 },
   * ]
   */
  data?: Record<string, unknown>[]
  /**
   * Series definitions — one per line on the radar.
   */
  series?: RadarSeries[]
  /**
   * Key in each data object that holds the axis/dimension label.
   * @default "axis"
   */
  axisKey?: string
  /** Title rendered in the Card header */
  title?: string
  /** Description rendered below the title */
  description?: string
  /**
   * Whether to fill the radar area.
   * @default true
   */
  fillArea?: boolean
  /**
   * Fill opacity when fillArea is true.
   * @default 0.3
   */
  fillOpacity?: number
  /**
   * Whether to show the polar grid.
   * @default true
   */
  showGrid?: boolean
  /**
   * Whether to show the radius axis (concentric labels).
   * @default false
   */
  showRadiusAxis?: boolean
  /**
   * Whether to show the legend.
   * @default true
   */
  showLegend?: boolean
  /**
   * Domain max for the radius axis. If not set, recharts auto-calculates.
   */
  domainMax?: number
  /** Tailwind color palette override */
  palette?: ChromaticPaletteName
  /** Chart height in pixels
   * @default 300
   */
  height?: number
  /** Show the Card wrapper
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
  { axis: "SEO", brand: 86, competitor: 65 },
  { axis: "Paid Media", brand: 72, competitor: 78 },
  { axis: "Social", brand: 91, competitor: 55 },
  { axis: "Content", brand: 68, competitor: 82 },
  { axis: "Email", brand: 77, competitor: 48 },
  { axis: "Brand", brand: 84, competitor: 70 },
]

const defaultSeries: RadarSeries[] = [
  { dataKey: "brand", label: "Your Brand", color: "var(--chart-1)" },
  { dataKey: "competitor", label: "Competitor", color: "var(--chart-2)" },
]

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ChartRadarInteractive({
  data = defaultData,
  series = defaultSeries,
  axisKey = "axis",
  title = "Radar Chart",
  description = "Multi-dimensional comparison across key metrics",
  fillArea = true,
  fillOpacity = 0.3,
  showGrid = true,
  showRadiusAxis = false,
  showLegend = true,
  domainMax,
  palette,
  height = 300,
  showCard = true,
  className,
}: ChartRadarInteractiveProps) {
  const paletteId = React.useId().replace(/:/g, "")

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

  const chartContent = (
    <ChartContainer config={chartConfig} className={`mx-auto w-full`} style={{ height }}>
      <RadarChart data={data}>
        {showGrid && <PolarGrid />}
        <PolarAngleAxis
          dataKey={axisKey}
          tick={{ fontSize: 12 }}
          className="[&_.recharts-text]:fill-muted-foreground"
        />
        {showRadiusAxis && (
          <PolarRadiusAxis
            angle={90}
            domain={domainMax ? [0, domainMax] : undefined}
            tick={{ fontSize: 10 }}
            className="[&_.recharts-text]:fill-muted-foreground"
          />
        )}
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        {series.map((s, i) => (
          <Radar
            key={s.dataKey}
            name={s.label}
            dataKey={s.dataKey}
            stroke={`var(--color-${s.dataKey})`}
            fill={fillArea ? `var(--color-${s.dataKey})` : "none"}
            fillOpacity={fillArea ? fillOpacity : 0}
            strokeWidth={2}
            dot={{ r: 3, fill: `var(--color-${s.dataKey})` }}
          />
        ))}
        {showLegend && (
          // @ts-expect-error recharts v3 passes payload via render
          <ChartLegend content={<ChartLegendContent />} />
        )}
      </RadarChart>
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
