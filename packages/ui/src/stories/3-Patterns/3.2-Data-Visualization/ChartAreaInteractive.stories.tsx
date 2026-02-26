import type { Meta, StoryObj } from "@storybook/react"
import { CHART_PALETTE_NAMES } from "../../../lib/colors/chart-palettes"
import { ChartAreaInteractive } from "../../../patterns/data-visualization/chart-area-interactive"

const meta = {
  title: "3-Patterns/3.2-Data Visualization/ChartAreaInteractive",
  component: ChartAreaInteractive,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
    stacked: { control: "boolean" },
    showGradient: { control: "boolean" },
    showTimeFilter: { control: "boolean" },
    showYAxis: { control: "boolean" },
    showGrid: { control: "boolean" },
    showLegend: { control: "boolean" },
    showCard: { control: "boolean" },
    curveType: {
      control: "radio",
      options: ["natural", "linear", "monotone", "step"],
      description: "Line interpolation curve type",
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
          "An interactive area chart with time range filtering (7d/30d/90d). Supports gradient fills, stacked areas, curve types, and custom series. Accepts configurable props for full Storybook exploration. Source: shadcn/ui chart-area-interactive (v4), extended with configurable API.",
      },
    },
  },
} satisfies Meta<typeof ChartAreaInteractive>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const NoGradient: Story = {
  args: {
    showGradient: false,
    title: "Flat Area Chart",
    description: "Without gradient fills",
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
    title: "Step Interpolation",
    description: "Stepped transitions between data points",
  },
}

export const WithYAxis: Story = {
  args: {
    showYAxis: true,
    title: "With Y Axis",
    description: "Showing value axis for precise readings",
  },
}

export const NoTimeFilter: Story = {
  args: {
    showTimeFilter: false,
    showLegend: true,
    title: "Static Area Chart",
    description: "Full dataset without time range selector",
  },
}

export const ThreeSeries: Story = {
  args: {
    title: "Traffic Sources",
    description: "Organic, direct, and referral traffic",
    series: [
      { dataKey: "organic", label: "Organic", color: "var(--chart-1)" },
      { dataKey: "direct", label: "Direct", color: "var(--chart-2)" },
      { dataKey: "referral", label: "Referral", color: "var(--chart-3)" },
    ],
    data: [
      { date: "2024-04-01", organic: 320, direct: 180, referral: 90 },
      { date: "2024-04-08", organic: 380, direct: 200, referral: 120 },
      { date: "2024-04-15", organic: 350, direct: 190, referral: 150 },
      { date: "2024-04-22", organic: 420, direct: 220, referral: 110 },
      { date: "2024-05-01", organic: 450, direct: 240, referral: 130 },
      { date: "2024-05-08", organic: 480, direct: 210, referral: 160 },
      { date: "2024-05-15", organic: 510, direct: 250, referral: 140 },
      { date: "2024-05-22", organic: 530, direct: 230, referral: 170 },
      { date: "2024-06-01", organic: 550, direct: 260, referral: 180 },
      { date: "2024-06-08", organic: 580, direct: 270, referral: 200 },
      { date: "2024-06-15", organic: 600, direct: 280, referral: 190 },
      { date: "2024-06-22", organic: 620, direct: 290, referral: 210 },
    ],
    showTimeFilter: false,
    showLegend: true,
  },
}

export const Unstacked: Story = {
  args: {
    stacked: false,
    title: "Overlapping Areas",
    description: "Non-stacked series for comparison",
  },
}

export const Compact: Story = {
  args: {
    height: 200,
    showCard: false,
    showTimeFilter: false,
  },
}
