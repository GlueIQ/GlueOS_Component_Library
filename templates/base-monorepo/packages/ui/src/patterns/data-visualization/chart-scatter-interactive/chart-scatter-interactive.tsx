"use client"

/**
 * ChartScatterInteractive Pattern
 *
 * A scatter/bubble chart with optional quadrant lines for matrix-style
 * visualizations. Supports bubble sizing and color-coded categories.
 *
 * Covers Immersion T2 gap: CompetitiveMatrix, OpportunityMatrix,
 * KeywordROIMatrix, KeywordVenn (as scatter approximation)
 *
 * Composed of: Card, Chart from our component library + recharts
 * Source: Custom
 */

import * as React from "react"
import {
  CartesianGrid,
  Cell,
  ReferenceLine,
  Scatter,
  ScatterChart,
  XAxis,
  YAxis,
  ZAxis,
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

export interface ScatterSeries {
  /** Unique key for this scatter group */
  key: string
  /** Display label in legend/tooltip */
  label: string
  /** Data points for this series */
  data: Record<string, unknown>[]
  /** Color — CSS value or chart variable */
  color?: string
}

export interface QuadrantConfig {
  /** X-axis value for the vertical divider */
  x: number
  /** Y-axis value for the horizontal divider */
  y: number
  /** Optional labels for each quadrant [topLeft, topRight, bottomLeft, bottomRight] */
  labels?: [string?, string?, string?, string?]
}

export interface ChartScatterInteractiveProps {
  /**
   * Series of scatter groups. Each series renders as a distinct color.
   */
  series?: ScatterSeries[]
  /**
   * Key in data objects for the X axis value.
   * @default "x"
   */
  xKey?: string
  /**
   * Key in data objects for the Y axis value.
   * @default "y"
   */
  yKey?: string
  /**
   * Optional key in data objects for bubble size (Z axis).
   * When provided, dot radius scales with this value.
   */
  zKey?: string
  /**
   * Label for the X axis.
   */
  xLabel?: string
  /**
   * Label for the Y axis.
   */
  yLabel?: string
  /** Title */
  title?: string
  /** Description */
  description?: string
  /**
   * Quadrant configuration — draws crosshair reference lines and optional labels.
   */
  quadrants?: QuadrantConfig
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
   * Dot size range [min, max] in pixels. Used when zKey is provided.
   * @default [40, 400]
   */
  sizeRange?: [number, number]
  /**
   * Static dot radius when zKey is NOT provided.
   * @default 6
   */
  dotRadius?: number
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

const defaultSeries: ScatterSeries[] = [
  {
    key: "brand",
    label: "Your Brand",
    data: [
      { x: 78, y: 85, z: 120, name: "SEO" },
      { x: 62, y: 70, z: 80, name: "Paid" },
      { x: 91, y: 55, z: 150, name: "Social" },
      { x: 45, y: 92, z: 60, name: "Content" },
    ],
  },
  {
    key: "competitor",
    label: "Competitor A",
    data: [
      { x: 65, y: 72, z: 100, name: "SEO" },
      { x: 82, y: 60, z: 90, name: "Paid" },
      { x: 40, y: 85, z: 70, name: "Social" },
      { x: 70, y: 45, z: 110, name: "Content" },
    ],
  },
]

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ChartScatterInteractive({
  series = defaultSeries,
  xKey = "x",
  yKey = "y",
  zKey,
  xLabel = "Market Share",
  yLabel = "Growth Rate",
  title = "Scatter Chart",
  description = "Competitive positioning across key dimensions",
  quadrants,
  showGrid = true,
  showLegend = true,
  sizeRange = [40, 400],
  dotRadius = 6,
  palette,
  height = 350,
  showCard = true,
  className,
}: ChartScatterInteractiveProps) {
  const paletteId = React.useId().replace(/:/g, "")

  // Build chart config
  const chartConfig = React.useMemo(() => {
    const config: ChartConfig = {}
    series.forEach((s, i) => {
      config[s.key] = {
        label: s.label,
        color: s.color ?? `var(--chart-${i + 1})`,
      }
    })
    return config
  }, [series])

  const chartContent = (
    <ChartContainer config={chartConfig} className="w-full" style={{ height }}>
      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        {showGrid && <CartesianGrid strokeDasharray="3 3" />}
        <XAxis
          type="number"
          dataKey={xKey}
          name={xLabel}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          label={
            xLabel
              ? {
                  value: xLabel,
                  position: "insideBottom",
                  offset: -10,
                  className: "fill-muted-foreground text-xs",
                }
              : undefined
          }
        />
        <YAxis
          type="number"
          dataKey={yKey}
          name={yLabel}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          label={
            yLabel
              ? {
                  value: yLabel,
                  angle: -90,
                  position: "insideLeft",
                  offset: 0,
                  className: "fill-muted-foreground text-xs",
                }
              : undefined
          }
        />
        {zKey && (
          <ZAxis
            type="number"
            dataKey={zKey}
            range={sizeRange}
            name="Size"
          />
        )}

        {/* Quadrant reference lines */}
        {quadrants && (
          <>
            <ReferenceLine
              x={quadrants.x}
              stroke="var(--border)"
              strokeDasharray="4 4"
            />
            <ReferenceLine
              y={quadrants.y}
              stroke="var(--border)"
              strokeDasharray="4 4"
            />
          </>
        )}

        <ChartTooltip
          cursor={{ strokeDasharray: "3 3" }}
          content={
            <ChartTooltipContent
              indicator="dot"
              labelFormatter={(_, payload) => {
                if (payload?.[0]?.payload?.name) {
                  return payload[0].payload.name as string
                }
                return ""
              }}
            />
          }
        />

        {series.map((s, i) => (
          <Scatter
            key={s.key}
            name={s.label}
            data={s.data}
            fill={`var(--color-${s.key})`}
          >
            {s.data.map((_, idx) => (
              <Cell
                key={idx}
                fill={`var(--color-${s.key})`}
                fillOpacity={0.7}
                stroke={`var(--color-${s.key})`}
                strokeWidth={1}
                r={zKey ? undefined : dotRadius}
              />
            ))}
          </Scatter>
        ))}

        {showLegend && (
          <ChartLegend content={<ChartLegendContent />} />
        )}
      </ScatterChart>
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
