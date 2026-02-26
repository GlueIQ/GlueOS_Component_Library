import type { Meta, StoryObj } from "@storybook/react"
import { CHART_PALETTE_NAMES } from "../../../lib/colors/chart-palettes"
import { ChartBarInteractive } from "../../../patterns/data-visualization/chart-bar-interactive"

const meta = {
  title: "3-Patterns/3.2-Data Visualization/ChartBarInteractive",
  component: ChartBarInteractive,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
    showSeriesToggle: { control: "boolean" },
    showYAxis: { control: "boolean" },
    showGrid: { control: "boolean" },
    showLegend: { control: "boolean" },
    showCard: { control: "boolean" },
    barRadius: {
      control: { type: "range", min: 0, max: 12, step: 1 },
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
          "An interactive bar chart with series toggle and summary totals. Supports multiple series, rounded corners, Y axis, and palette overrides. Source: shadcn/ui chart-bar-interactive (v4), extended with configurable API.",
      },
    },
  },
} satisfies Meta<typeof ChartBarInteractive>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const AllSeriesVisible: Story = {
  args: {
    showSeriesToggle: false,
    showLegend: true,
    title: "All Series Visible",
    description: "Desktop and mobile shown simultaneously",
  },
}

export const RoundedBars: Story = {
  args: {
    barRadius: 6,
    title: "Rounded Bar Chart",
    description: "With corner radius applied",
  },
}

export const WithYAxis: Story = {
  args: {
    showYAxis: true,
    title: "With Value Axis",
    description: "Showing Y axis for precise readings",
  },
}

export const ThreeSeries: Story = {
  args: {
    title: "Revenue by Channel",
    description: "Monthly revenue across three channels",
    showSeriesToggle: true,
    series: [
      { dataKey: "organic", label: "Organic", color: "var(--chart-1)" },
      { dataKey: "paid", label: "Paid", color: "var(--chart-2)" },
      { dataKey: "referral", label: "Referral", color: "var(--chart-3)" },
    ],
    data: [
      { date: "2024-04-01", organic: 3200, paid: 1800, referral: 900 },
      { date: "2024-04-08", organic: 3800, paid: 2000, referral: 1200 },
      { date: "2024-04-15", organic: 3500, paid: 1900, referral: 1500 },
      { date: "2024-04-22", organic: 4200, paid: 2200, referral: 1100 },
      { date: "2024-05-01", organic: 4500, paid: 2400, referral: 1300 },
      { date: "2024-05-08", organic: 4800, paid: 2100, referral: 1600 },
      { date: "2024-05-15", organic: 5100, paid: 2500, referral: 1400 },
      { date: "2024-05-22", organic: 5300, paid: 2300, referral: 1700 },
    ],
    formatTotal: (v: number) => `$${(v / 1000).toFixed(1)}K`,
  },
}

export const NoGrid: Story = {
  args: {
    showGrid: false,
    title: "Clean Layout",
    description: "Without grid lines",
  },
}

export const Compact: Story = {
  args: {
    height: 200,
    showCard: false,
    showSeriesToggle: false,
  },
}
