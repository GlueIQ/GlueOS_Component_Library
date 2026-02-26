import type { Meta, StoryObj } from "@storybook/react"
import { CHART_PALETTE_NAMES } from "../../../lib/colors/chart-palettes"
import { ChartScatterInteractive } from "../../../patterns/data-visualization/chart-scatter-interactive"

const meta = {
  title: "3-Patterns/3.2-Data Visualization/ChartScatterInteractive",
  component: ChartScatterInteractive,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
    xLabel: { control: "text" },
    yLabel: { control: "text" },
    showGrid: { control: "boolean" },
    showLegend: { control: "boolean" },
    showCard: { control: "boolean" },
    dotRadius: {
      control: { type: "range", min: 3, max: 15, step: 1 },
    },
    height: {
      control: { type: "range", min: 250, max: 500, step: 25 },
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
          "A scatter/bubble chart with optional quadrant lines for matrix-style visualizations. Supports multiple series, bubble sizing via zKey, and quadrant reference lines. Covers Immersion gap: CompetitiveMatrix, OpportunityMatrix, KeywordROIMatrix.",
      },
    },
  },
} satisfies Meta<typeof ChartScatterInteractive>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithQuadrants: Story = {
  args: {
    title: "Competitive Matrix",
    description: "Market share vs growth rate positioning",
    quadrants: { x: 60, y: 65 },
    xLabel: "Market Share",
    yLabel: "Growth Rate",
  },
}

export const BubbleChart: Story = {
  args: {
    title: "Keyword Opportunity Matrix",
    description: "Volume vs difficulty with search volume sizing",
    xLabel: "Search Volume",
    yLabel: "Keyword Difficulty",
    zKey: "z",
    sizeRange: [40, 400] as [number, number],
    series: [
      {
        key: "highIntent",
        label: "High Intent",
        data: [
          { x: 8500, y: 35, z: 120, name: "buy running shoes" },
          { x: 5200, y: 28, z: 85, name: "best running shoes" },
          { x: 3100, y: 42, z: 60, name: "running shoe reviews" },
        ],
      },
      {
        key: "informational",
        label: "Informational",
        data: [
          { x: 22000, y: 55, z: 200, name: "how to start running" },
          { x: 15000, y: 48, z: 150, name: "running benefits" },
          { x: 9000, y: 62, z: 100, name: "running form" },
        ],
      },
    ],
  },
}

export const SingleSeries: Story = {
  args: {
    title: "ROI Analysis",
    description: "Cost vs return per channel",
    xLabel: "Cost ($K)",
    yLabel: "Return ($K)",
    dotRadius: 8,
    series: [
      {
        key: "channels",
        label: "Marketing Channels",
        data: [
          { x: 15, y: 45, name: "SEO" },
          { x: 35, y: 60, name: "Paid Search" },
          { x: 25, y: 30, name: "Social" },
          { x: 10, y: 20, name: "Email" },
          { x: 50, y: 70, name: "Content" },
          { x: 40, y: 35, name: "Display" },
        ],
      },
    ],
  },
}
