import type { Meta, StoryObj } from "@storybook/react"
import { CHART_PALETTE_NAMES } from "../../../lib/colors/chart-palettes"
import { ChartLineInteractive } from "../../../patterns/data-visualization/chart-line-interactive"

const meta = {
  title: "3-Patterns/3.2-Data Visualization/ChartLineInteractive",
  component: ChartLineInteractive,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
    showSeriesToggle: { control: "boolean" },
    showDots: { control: "boolean" },
    showYAxis: { control: "boolean" },
    showGrid: { control: "boolean" },
    showLegend: { control: "boolean" },
    showCard: { control: "boolean" },
    curveType: {
      control: "radio",
      options: ["natural", "linear", "monotone", "step"],
      description: "Line interpolation curve type",
    },
    strokeWidth: {
      control: { type: "range", min: 1, max: 5, step: 0.5 },
    },
    height: {
      control: { type: "range", min: 200, max: 500, step: 25 },
    },
    palette: {
      control: "select",
      options: [undefined, ...CHART_PALETTE_NAMES],
    },
  },
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "An interactive line chart with series toggle and summary totals. Supports curve types, dots, stroke width, and palette overrides. Covers Immersion gap: TrendLineChart, PerformanceTrend. Source: shadcn/ui chart-line-interactive (v4), extended with configurable API.",
      },
    },
  },
} satisfies Meta<typeof ChartLineInteractive>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const AllSeriesVisible: Story = {
  args: {
    showSeriesToggle: false,
    showLegend: true,
    title: "All Series Visible",
    description: "Desktop and mobile trends overlaid",
  },
}

export const WithDots: Story = {
  args: {
    showDots: true,
    title: "With Data Points",
    description: "Showing dots at each data point",
  },
}

export const LinearCurve: Story = {
  args: {
    curveType: "linear",
    title: "Linear Interpolation",
    description: "Straight-line segments between points",
  },
}

export const StepCurve: Story = {
  args: {
    curveType: "step",
    showDots: true,
    title: "Step Interpolation",
    description: "Stepped transitions with data points",
  },
}

export const ThickLines: Story = {
  args: {
    strokeWidth: 3,
    showSeriesToggle: false,
    showLegend: true,
    title: "Thick Lines",
    description: "Heavier stroke weight for emphasis",
  },
}

export const ThreeSeries: Story = {
  args: {
    title: "Keyword Rankings",
    description: "Position tracking across search engines",
    showSeriesToggle: true,
    series: [
      { dataKey: "google", label: "Google", color: "var(--chart-1)" },
      { dataKey: "bing", label: "Bing", color: "var(--chart-2)" },
      { dataKey: "yahoo", label: "Yahoo", color: "var(--chart-3)" },
    ],
    data: [
      { date: "2024-04-01", google: 12, bing: 8, yahoo: 15 },
      { date: "2024-04-08", google: 10, bing: 9, yahoo: 14 },
      { date: "2024-04-15", google: 8, bing: 7, yahoo: 12 },
      { date: "2024-04-22", google: 6, bing: 8, yahoo: 11 },
      { date: "2024-05-01", google: 5, bing: 6, yahoo: 10 },
      { date: "2024-05-08", google: 4, bing: 5, yahoo: 9 },
      { date: "2024-05-15", google: 3, bing: 5, yahoo: 8 },
      { date: "2024-05-22", google: 3, bing: 4, yahoo: 7 },
    ],
    formatTotal: (v: number) => `Avg: ${(v / 8).toFixed(0)}`,
  },
}

export const Compact: Story = {
  args: {
    height: 200,
    showCard: false,
    showSeriesToggle: false,
  },
}
