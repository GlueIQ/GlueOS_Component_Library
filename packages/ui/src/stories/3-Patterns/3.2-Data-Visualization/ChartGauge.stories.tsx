import type { Meta, StoryObj } from "@storybook/react"
import { ChartGauge } from "../../../patterns/data-visualization/chart-gauge"

const meta = {
  title: "3-Patterns/3.2-Data Visualization/ChartGauge",
  component: ChartGauge,
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "Current gauge value",
    },
    min: { control: "number", description: "Minimum scale value" },
    max: { control: "number", description: "Maximum scale value" },
    title: { control: "text" },
    description: { control: "text" },
    label: { control: "text", description: "Label below the value" },
    unit: { control: "text", description: "Unit suffix (e.g. %, pts)" },
    arcAngle: {
      control: "radio",
      options: [180, 270],
      description: "Arc sweep angle",
    },
    size: {
      control: { type: "range", min: 120, max: 400, step: 10 },
      description: "Gauge size in pixels",
    },
    strokeWidth: {
      control: { type: "range", min: 8, max: 40, step: 2 },
      description: "Arc stroke width",
    },
    showTrack: { control: "boolean" },
    showTicks: { control: "boolean" },
    showMinMax: { control: "boolean" },
    showCard: { control: "boolean" },
  },
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A semicircular or three-quarter gauge for displaying scores, percentages, and KPI values. Pure SVG — no recharts dependency. Supports color thresholds, custom sizing, and both 180° and 270° arc modes. Covers Immersion gap: SentimentGauge, AuthorityGauge, PriceRangeGauge.",
      },
    },
  },
} satisfies Meta<typeof ChartGauge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: 72,
    title: "Sentiment Score",
    description: "Overall brand sentiment",
    label: "Score",
  },
}

export const LowScore: Story = {
  args: {
    value: 22,
    title: "Authority Score",
    description: "Domain authority rating",
    label: "Authority",
  },
}

export const HighScore: Story = {
  args: {
    value: 95,
    title: "SEO Health",
    description: "Technical SEO score",
    label: "Health",
    unit: "%",
  },
}

export const ThreeQuarterArc: Story = {
  args: {
    value: 68,
    title: "Performance Index",
    description: "Cross-channel performance",
    label: "Index",
    arcAngle: 270,
    size: 240,
  },
}

export const CustomThresholds: Story = {
  args: {
    value: 55,
    title: "Budget Utilization",
    description: "Monthly spend vs allocation",
    label: "Utilized",
    unit: "%",
    thresholds: [
      { value: 50, color: "var(--chart-2)", label: "Under" },
      { value: 80, color: "var(--chart-4)", label: "On Track" },
      { value: 100, color: "var(--destructive)", label: "Over" },
    ],
    showTicks: true,
  },
}

export const WithTickMarks: Story = {
  args: {
    value: 45,
    title: "Engagement Rate",
    label: "Rate",
    unit: "%",
    showTicks: true,
    strokeWidth: 24,
    size: 250,
  },
}

export const Compact: Story = {
  args: {
    value: 82,
    label: "Score",
    size: 140,
    strokeWidth: 12,
    showCard: false,
    showMinMax: false,
  },
}

export const PriceRange: Story = {
  args: {
    value: 142,
    min: 80,
    max: 220,
    title: "Stock Price",
    description: "52-week range",
    label: "Current",
    unit: "",
    formatValue: (v: number) => `$${v}`,
  },
}
