"use client"

/**
 * ChartPieInteractive Pattern
 *
 * An interactive donut/pie chart with active sector highlighting and
 * a selector dropdown. Accepts data and display configuration as props.
 *
 * Composed of: Card, Chart, Select from our component library + recharts
 * Source: shadcn/ui chart-pie-interactive (v4), extended with configurable API
 * Normalized: 2025-02 — relative imports, semantic tokens
 */

import * as React from "react"
import { Label, Pie, PieChart, Sector } from "recharts"
import { type PieSectorDataItem } from "recharts/types/polar/Pie"

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
  ChartStyle,
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

export interface PieSlice {
  /** Unique key identifying this slice (used in config + select) */
  key: string
  /** Numeric value for this slice */
  value: number
  /** Display label */
  label: string
  /** Color — falls back to --chart-N */
  color?: string
}

export interface ChartPieInteractiveProps {
  /**
   * Slices to render. Each slice becomes a sector of the pie.
   */
  slices?: PieSlice[]
  /** Title */
  title?: string
  /** Description */
  description?: string
  /**
   * Inner radius for donut style. 0 = full pie.
   * @default 60
   */
  innerRadius?: number
  /**
   * Show the selector dropdown for highlighting a slice.
   * @default true
   */
  showSelector?: boolean
  /**
   * Label shown in the center of the donut (below the value).
   * @default "Total"
   */
  centerLabel?: string
  /**
   * Format function for the center value.
   * @default toLocaleString
   */
  formatValue?: (value: number) => string
  /** Chart size @default 300 */
  size?: number
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

const defaultSlices: PieSlice[] = [
  { key: "january", value: 186, label: "January", color: "var(--chart-1)" },
  { key: "february", value: 305, label: "February", color: "var(--chart-2)" },
  { key: "march", value: 237, label: "March", color: "var(--chart-3)" },
  { key: "april", value: 173, label: "April", color: "var(--chart-4)" },
  { key: "may", value: 209, label: "May", color: "var(--chart-5)" },
]

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ChartPieInteractive({
  slices = defaultSlices,
  title = "Pie Chart - Interactive",
  description = "Distribution by category",
  innerRadius = 60,
  showSelector = true,
  centerLabel = "Total",
  formatValue = (v) => v.toLocaleString(),
  size = 300,
  palette,
  showCard = true,
  className,
}: ChartPieInteractiveProps) {
  const id = React.useId().replace(/:/g, "")
  const paletteId = React.useId().replace(/:/g, "")

  // Build chart config
  const chartConfig = React.useMemo(() => {
    const config: ChartConfig = {}
    slices.forEach((s, i) => {
      config[s.key] = {
        label: s.label,
        color: s.color ?? `var(--chart-${(i % 5) + 1})`,
      }
    })
    return config
  }, [slices])

  // Build recharts-compatible data
  const pieData = React.useMemo(
    () =>
      slices.map((s) => ({
        name: s.key,
        value: s.value,
        fill: `var(--color-${s.key})`,
      })),
    [slices]
  )

  const [activeKey, setActiveKey] = React.useState(slices[0]?.key ?? "")
  const activeIndex = pieData.findIndex((d) => d.name === activeKey)

  const pieExtras = {
    activeIndex,
    activeShape: ({ outerRadius = 0, ...props }: PieSectorDataItem) => (
      <g>
        <Sector {...props} outerRadius={outerRadius + 10} />
        <Sector
          {...props}
          outerRadius={outerRadius + 25}
          innerRadius={outerRadius + 12}
        />
      </g>
    ),
  }

  const chartContent = (
    <>
      <ChartStyle id={`pie-${id}`} config={chartConfig} />
      <ChartContainer
        id={`pie-${id}`}
        config={chartConfig}
        className="mx-auto aspect-square w-full"
        style={{ maxWidth: size, maxHeight: size }}
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            innerRadius={innerRadius}
            strokeWidth={5}
            {...(pieExtras as Record<string, unknown>)}
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  const activeSlice = slices[activeIndex >= 0 ? activeIndex : 0]
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-3xl font-bold"
                      >
                        {formatValue(activeSlice?.value ?? 0)}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground"
                      >
                        {centerLabel}
                      </tspan>
                    </text>
                  )
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
    </>
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
    <Card data-chart={`pie-${id}`} className={className}>
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        {showSelector && (
          <Select value={activeKey} onValueChange={setActiveKey}>
            <SelectTrigger
              className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent align="end" className="rounded-xl">
              {slices.map((s) => (
                <SelectItem
                  key={s.key}
                  value={s.key}
                  className="rounded-lg [&_span]:flex"
                >
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className="flex h-3 w-3 shrink-0 rounded-xs"
                      style={{ backgroundColor: `var(--color-${s.key})` }}
                    />
                    {s.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </CardHeader>
      <CardContent className="flex flex-1 justify-center pb-0">
        {wrapped}
      </CardContent>
    </Card>
  )
}
