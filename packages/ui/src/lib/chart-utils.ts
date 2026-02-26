/**
 * Shared Chart Utilities
 *
 * Common utilities and helpers used across all chart pattern components.
 * Extracted to reduce code duplication across ChartAreaInteractive, ChartBarInteractive,
 * ChartLineInteractive, ChartPieInteractive, and other chart patterns.
 */

import { ChartConfig } from "../components/ui/chart"

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

export const DEFAULT_CHART_HEIGHT = 250
export const DEFAULT_ANIMATION_DURATION = 750

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface BaseSeries {
  dataKey: string
  label: string
  color?: string
  [key: string]: unknown
}

export type TimeRangeOption = "all" | "30d" | "7d" | "24h"

export interface TimeRangeFilter {
  label: string
  value: TimeRangeOption
  days?: number
}

// ---------------------------------------------------------------------------
// Time Range Filtering
// ---------------------------------------------------------------------------

export const TIME_RANGE_OPTIONS: TimeRangeFilter[] = [
  { label: "All Time", value: "all" },
  { label: "Last 30 Days", value: "30d", days: 30 },
  { label: "Last 7 Days", value: "7d", days: 7 },
  { label: "Last 24 Hours", value: "24h", days: 1 },
]

/**
 * Filter chart data by time range based on a date field
 */
export function filterDataByTimeRange<T extends Record<string, unknown>>(
  data: T[],
  timeRange: TimeRangeOption,
  dateKey: string
): T[] {
  if (timeRange === "all") return data

  const option = TIME_RANGE_OPTIONS.find((o) => o.value === timeRange)
  if (!option?.days) return data

  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - option.days)

  return data.filter((item) => {
    const dateValue = item[dateKey]
    if (typeof dateValue !== "string") return false

    try {
      const itemDate = new Date(dateValue)
      return itemDate >= cutoffDate
    } catch {
      return false
    }
  })
}

/**
 * Validate if a string is a valid date
 */
export function isValidDateString(value: string): boolean {
  try {
    const date = new Date(value)
    return !isNaN(date.getTime())
  } catch {
    return false
  }
}

// ---------------------------------------------------------------------------
// Chart Configuration
// ---------------------------------------------------------------------------

/**
 * Build ChartConfig from series array
 * Automatically assigns chart colors if not provided
 */
export function buildChartConfig(series: BaseSeries[]): ChartConfig {
  const config: ChartConfig = {}

  series.forEach((s, idx) => {
    config[s.dataKey] = {
      label: s.label,
      color: s.color || `var(--chart-${(idx % 5) + 1})`,
    }
  })

  return config
}

// ---------------------------------------------------------------------------
// Formatters
// ---------------------------------------------------------------------------

/**
 * Format currency value
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

/**
 * Format large numbers (e.g., 1500 → 1.5k)
 */
export function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
  }).format(value)
}

/**
 * Format percentage
 */
export function formatPercent(value: number, decimals: number = 0): string {
  return `${value.toFixed(decimals)}%`
}

/**
 * Format date for chart tick labels (e.g., "Jan 1")
 */
export function formatDateTick(dateString: string): string {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  } catch {
    return dateString
  }
}

/**
 * Format full date (e.g., "January 1, 2024")
 */
export function formatFullDate(dateString: string): string {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  } catch {
    return dateString
  }
}

// ---------------------------------------------------------------------------
// Sample Data Generators (for stories/demos)
// ---------------------------------------------------------------------------

/**
 * Generate sample time series data
 */
export function generateSampleTimeSeriesData(
  days: number = 30,
  series: string[] = ["desktop", "mobile"]
): Record<string, unknown>[] {
  const data: Record<string, unknown>[] = []
  const today = new Date()

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)

    const entry: Record<string, unknown> = {
      date: date.toISOString().split("T")[0],
    }

    series.forEach((s) => {
      entry[s] = Math.floor(Math.random() * 5000) + 1000
    })

    data.push(entry)
  }

  return data
}

/**
 * Default sample data matching the original chart patterns
 */
export const DEFAULT_SAMPLE_DATA = [
  { date: "2024-04-01", desktop: 2220, mobile: 1500 },
  { date: "2024-04-02", desktop: 970, mobile: 1800 },
  { date: "2024-04-03", desktop: 1670, mobile: 1200 },
  { date: "2024-04-04", desktop: 2240, mobile: 1700 },
  { date: "2024-04-05", desktop: 1730, mobile: 1600 },
  { date: "2024-04-06", desktop: 2190, mobile: 1400 },
  { date: "2024-04-07", desktop: 3200, mobile: 2100 },
  { date: "2024-04-08", desktop: 1820, mobile: 1650 },
  { date: "2024-04-09", desktop: 2480, mobile: 1900 },
  { date: "2024-04-10", desktop: 2100, mobile: 1750 },
  { date: "2024-04-11", desktop: 1900, mobile: 1600 },
  { date: "2024-04-12", desktop: 2600, mobile: 2000 },
  { date: "2024-04-13", desktop: 2350, mobile: 1850 },
  { date: "2024-04-14", desktop: 2900, mobile: 2200 },
  { date: "2024-04-15", desktop: 2150, mobile: 1700 },
  { date: "2024-04-16", desktop: 2400, mobile: 1900 },
  { date: "2024-04-17", desktop: 1980, mobile: 1650 },
  { date: "2024-04-18", desktop: 2700, mobile: 2050 },
  { date: "2024-04-19", desktop: 2250, mobile: 1800 },
  { date: "2024-04-20", desktop: 2500, mobile: 1950 },
  { date: "2024-04-21", desktop: 2100, mobile: 1700 },
  { date: "2024-04-22", desktop: 2800, mobile: 2150 },
  { date: "2024-04-23", desktop: 2300, mobile: 1850 },
  { date: "2024-04-24", desktop: 2650, mobile: 2000 },
  { date: "2024-04-25", desktop: 2200, mobile: 1750 },
  { date: "2024-04-26", desktop: 2950, mobile: 2250 },
  { date: "2024-04-27", desktop: 2400, mobile: 1900 },
  { date: "2024-04-28", desktop: 2750, mobile: 2100 },
  { date: "2024-04-29", desktop: 2500, mobile: 1950 },
  { date: "2024-04-30", desktop: 3100, mobile: 2350 },
]

// ---------------------------------------------------------------------------
// Color Utilities
// ---------------------------------------------------------------------------

/**
 * Get a chart color by index
 */
export function getChartColor(index: number): string {
  return `var(--chart-${(index % 5) + 1})`
}

/**
 * Generate gradient stops for area charts
 */
export function generateGradientStops(
  colorVar: string,
  topOpacity: number = 0.8,
  bottomOpacity: number = 0.1
): { offset: string; stopColor: string; stopOpacity: number }[] {
  return [
    { offset: "5%", stopColor: colorVar, stopOpacity: topOpacity },
    { offset: "95%", stopColor: colorVar, stopOpacity: bottomOpacity },
  ]
}
