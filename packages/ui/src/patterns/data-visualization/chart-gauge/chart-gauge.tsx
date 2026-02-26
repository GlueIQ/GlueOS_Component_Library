"use client"

/**
 * ChartGauge Pattern
 *
 * A semicircular gauge for displaying scores, percentages, and KPI values.
 * Pure SVG implementation — no recharts dependency.
 *
 * Covers Immersion T2 gap: SentimentGauge, AuthorityGauge, PriceRangeGauge
 *
 * Composed of: Card from our component library + custom SVG
 * Source: Custom
 */

import * as React from "react"
import { cn } from "../../../lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface GaugeThreshold {
  /** Upper bound of this range (inclusive) */
  value: number
  /** Color for this range — any CSS color value */
  color: string
  /** Optional label shown in the legend */
  label?: string
}

export interface ChartGaugeProps {
  /** Current value to display on the gauge */
  value: number
  /** Minimum value of the gauge scale
   * @default 0
   */
  min?: number
  /** Maximum value of the gauge scale
   * @default 100
   */
  max?: number
  /** Title rendered above the gauge */
  title?: string
  /** Description rendered below the title */
  description?: string
  /** Label rendered below the value (e.g. "Score", "Authority", "Sentiment") */
  label?: string
  /** Unit suffix shown after the value (e.g. "%", "pts")
   * @default ""
   */
  unit?: string
  /**
   * Color thresholds — define ranges with colors.
   * The gauge arc is painted according to which range the current value falls in.
   * If not provided, falls back to a default green/amber/red scale.
   */
  thresholds?: GaugeThreshold[]
  /**
   * Whether to show the full arc background track.
   * @default true
   */
  showTrack?: boolean
  /**
   * Whether to show threshold tick marks on the arc.
   * @default false
   */
  showTicks?: boolean
  /**
   * Whether to show the min/max labels at the arc ends.
   * @default true
   */
  showMinMax?: boolean
  /**
   * Arc sweep angle in degrees. 180 = semicircle, 270 = three-quarter.
   * @default 180
   */
  arcAngle?: 180 | 270
  /**
   * Size of the gauge in pixels.
   * @default 200
   */
  size?: number
  /**
   * Stroke width of the gauge arc.
   * @default 20
   */
  strokeWidth?: number
  /**
   * Format function for the displayed value.
   * @default (v) => v.toLocaleString()
   */
  formatValue?: (value: number) => string
  /** Show the Card wrapper with title/description
   * @default true
   */
  showCard?: boolean
  /** Additional CSS class */
  className?: string
}

// ---------------------------------------------------------------------------
// Defaults
// ---------------------------------------------------------------------------

const DEFAULT_THRESHOLDS: GaugeThreshold[] = [
  { value: 33, color: "var(--destructive)", label: "Low" },
  { value: 66, color: "var(--chart-4)", label: "Medium" },
  { value: 100, color: "var(--chart-2)", label: "High" },
]

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function polarToCartesian(
  cx: number,
  cy: number,
  radius: number,
  angleDeg: number
) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return {
    x: cx + radius * Math.cos(rad),
    y: cy + radius * Math.sin(rad),
  }
}

function describeArc(
  cx: number,
  cy: number,
  radius: number,
  startAngle: number,
  endAngle: number
) {
  const start = polarToCartesian(cx, cy, radius, endAngle)
  const end = polarToCartesian(cx, cy, radius, startAngle)
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1"
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`
}

function getColorForValue(
  value: number,
  min: number,
  max: number,
  thresholds: GaugeThreshold[]
): string {
  const pct = ((value - min) / (max - min)) * 100
  for (const t of thresholds) {
    if (pct <= t.value) return t.color
  }
  return thresholds[thresholds.length - 1]?.color ?? "currentColor"
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ChartGauge({
  value,
  min = 0,
  max = 100,
  title,
  description,
  label,
  unit = "",
  thresholds = DEFAULT_THRESHOLDS,
  showTrack = true,
  showTicks = false,
  showMinMax = true,
  arcAngle = 180,
  size = 200,
  strokeWidth = 20,
  formatValue = (v) => v.toLocaleString(),
  showCard = true,
  className,
}: ChartGaugeProps) {
  const clampedValue = Math.min(Math.max(value, min), max)
  const pct = (clampedValue - min) / (max - min)

  // Arc geometry
  const halfAngle = arcAngle / 2
  const startAngle = -halfAngle
  const endAngle = halfAngle

  const cx = size / 2
  const cy = arcAngle === 180 ? size / 2 + strokeWidth / 2 : size / 2
  const radius = (size - strokeWidth * 2) / 2

  const valueAngle = startAngle + pct * arcAngle

  const trackPath = describeArc(cx, cy, radius, startAngle, endAngle)
  const valuePath = describeArc(cx, cy, radius, startAngle, valueAngle)

  const activeColor = getColorForValue(clampedValue, min, max, thresholds)

  // Viewbox height: for semicircle, only need top half + padding
  const viewBoxHeight =
    arcAngle === 180 ? size / 2 + strokeWidth * 2 : size + strokeWidth

  const gaugeContent = (
    <div className={cn("flex flex-col items-center", !showCard && className)}>
      <svg
        width={size}
        height={viewBoxHeight}
        viewBox={`0 0 ${size} ${viewBoxHeight}`}
        className="overflow-visible"
        role="img"
        aria-label={`Gauge showing ${formatValue(clampedValue)}${unit} out of ${formatValue(max)}${unit}`}
      >
        {/* Background track */}
        {showTrack && (
          <path
            d={trackPath}
            fill="none"
            stroke="var(--border)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            opacity="0.3"
          />
        )}

        {/* Threshold tick marks */}
        {showTicks &&
          thresholds.slice(0, -1).map((t, i) => {
            const tickPct = t.value / 100
            const tickAngle = startAngle + tickPct * arcAngle
            const inner = polarToCartesian(
              cx,
              cy,
              radius - strokeWidth / 2 - 2,
              tickAngle
            )
            const outer = polarToCartesian(
              cx,
              cy,
              radius + strokeWidth / 2 + 2,
              tickAngle
            )
            return (
              <line
                key={i}
                x1={inner.x}
                y1={inner.y}
                x2={outer.x}
                y2={outer.y}
                stroke="var(--border)"
                strokeWidth={2}
              />
            )
          })}

        {/* Value arc */}
        {pct > 0 && (
          <path
            d={valuePath}
            fill="none"
            stroke={activeColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
        )}

        {/* Needle dot */}
        {pct > 0 && (
          <circle
            cx={polarToCartesian(cx, cy, radius, valueAngle).x}
            cy={polarToCartesian(cx, cy, radius, valueAngle).y}
            r={strokeWidth / 4}
            fill="var(--background)"
            stroke={activeColor}
            strokeWidth={2}
          />
        )}

        {/* Min/Max labels */}
        {showMinMax && (
          <>
            <text
              x={polarToCartesian(cx, cy, radius, startAngle).x}
              y={
                polarToCartesian(cx, cy, radius, startAngle).y +
                strokeWidth +
                4
              }
              textAnchor="middle"
              className="fill-muted-foreground text-[11px]"
            >
              {formatValue(min)}
            </text>
            <text
              x={polarToCartesian(cx, cy, radius, endAngle).x}
              y={
                polarToCartesian(cx, cy, radius, endAngle).y + strokeWidth + 4
              }
              textAnchor="middle"
              className="fill-muted-foreground text-[11px]"
            >
              {formatValue(max)}
            </text>
          </>
        )}

        {/* Center value */}
        <text
          x={cx}
          y={arcAngle === 180 ? cy - 8 : cy}
          textAnchor="middle"
          dominantBaseline="middle"
        >
          <tspan className="fill-foreground text-3xl font-bold">
            {formatValue(clampedValue)}
            {unit && (
              <tspan className="fill-muted-foreground text-lg font-normal">
                {unit}
              </tspan>
            )}
          </tspan>
        </text>

        {/* Label below value */}
        {label && (
          <text
            x={cx}
            y={arcAngle === 180 ? cy + 18 : cy + 26}
            textAnchor="middle"
            className="fill-muted-foreground text-sm"
          >
            {label}
          </text>
        )}
      </svg>
    </div>
  )

  if (!showCard) return gaugeContent

  return (
    <Card className={cn("flex flex-col", className)}>
      {(title || description) && (
        <CardHeader className="pb-2">
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent className="flex justify-center pb-4">
        {gaugeContent}
      </CardContent>
    </Card>
  )
}
