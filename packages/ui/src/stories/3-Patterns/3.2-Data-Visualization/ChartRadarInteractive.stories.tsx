import type { Meta, StoryObj } from "@storybook/react"
import { CHART_PALETTE_NAMES } from "../../../lib/colors/chart-palettes"
import { ChartRadarInteractive } from "../../../patterns/data-visualization/chart-radar-interactive"

const meta = {
  title: "3-Patterns/3.2-Data Visualization/ChartRadarInteractive",
  component: ChartRadarInteractive,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
    fillArea: { control: "boolean" },
    fillOpacity: {
      control: { type: "range", min: 0, max: 1, step: 0.05 },
    },
    showGrid: { control: "boolean" },
    showRadiusAxis: { control: "boolean" },
    showLegend: { control: "boolean" },
    showCard: { control: "boolean" },
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
          "A radar/spider chart for comparing multiple dimensions across entities. Supports multiple overlapping series, configurable fill, and axis labels. Covers Immersion gap: VisibilityRadarChart, OpportunityRadar.",
      },
    },
  },
} satisfies Meta<typeof ChartRadarInteractive>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const SingleSeries: Story = {
  args: {
    title: "Brand Visibility",
    description: "Score across digital channels",
    series: [
      { dataKey: "brand", label: "Your Brand", color: "var(--chart-1)" },
    ],
    data: [
      { axis: "SEO", brand: 86 },
      { axis: "Paid Media", brand: 72 },
      { axis: "Social", brand: 91 },
      { axis: "Content", brand: 68 },
      { axis: "Email", brand: 77 },
      { axis: "Brand", brand: 84 },
    ],
  },
}

export const ThreeSeries: Story = {
  args: {
    title: "Competitive Comparison",
    description: "Your brand vs two competitors",
    series: [
      { dataKey: "brand", label: "Your Brand", color: "var(--chart-1)" },
      { dataKey: "compA", label: "Competitor A", color: "var(--chart-2)" },
      { dataKey: "compB", label: "Competitor B", color: "var(--chart-3)" },
    ],
    data: [
      { axis: "SEO", brand: 86, compA: 65, compB: 70 },
      { axis: "Paid", brand: 72, compA: 78, compB: 55 },
      { axis: "Social", brand: 91, compA: 55, compB: 82 },
      { axis: "Content", brand: 68, compA: 82, compB: 60 },
      { axis: "Email", brand: 77, compA: 48, compB: 90 },
      { axis: "Brand", brand: 84, compA: 70, compB: 65 },
    ],
  },
}

export const WithRadiusAxis: Story = {
  args: {
    showRadiusAxis: true,
    domainMax: 100,
    title: "Opportunity Assessment",
    description: "Scores out of 100 across dimensions",
  },
}

export const NoFill: Story = {
  args: {
    fillArea: false,
    title: "Channel Performance",
    description: "Line-only radar comparison",
  },
}

export const Compact: Story = {
  args: {
    height: 200,
    showCard: false,
    showLegend: false,
  },
}
