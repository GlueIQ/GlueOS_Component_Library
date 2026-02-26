import type { Meta, StoryObj } from "@storybook/react"
import { CHART_PALETTE_NAMES } from "../../../lib/colors/chart-palettes"
import { ChartBarStackedInteractive } from "../../../patterns/data-visualization/chart-bar-stacked-interactive"

const meta = {
  title: "3-Patterns/3.2-Data Visualization/ChartBarStackedInteractive",
  component: ChartBarStackedInteractive,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
    mode: {
      control: "radio",
      options: ["stacked", "grouped"],
      description: "Stacked vs side-by-side bars",
    },
    orientation: {
      control: "radio",
      options: ["vertical", "horizontal"],
      description: "Bar orientation",
    },
    showGrid: { control: "boolean" },
    showLegend: { control: "boolean" },
    showCard: { control: "boolean" },
    barRadius: {
      control: { type: "range", min: 0, max: 12, step: 1 },
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
          "A stacked or grouped bar chart for comparing composition across categories. Supports horizontal/vertical orientation, custom series colors, and rounded corners. Covers Immersion gap: LinkQualityBars, SpendComparison, VoiceBreakdown, RatingDistribution, RegionalBreakdown.",
      },
    },
  },
} satisfies Meta<typeof ChartBarStackedInteractive>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Grouped: Story = {
  args: {
    mode: "grouped",
    title: "Traffic by Channel — Grouped",
    description: "DoFollow vs NoFollow side-by-side comparison",
  },
}

export const Horizontal: Story = {
  args: {
    orientation: "horizontal",
    title: "Link Quality by Source",
    description: "Horizontal stacked bars",
    height: 400,
  },
}

export const HorizontalGrouped: Story = {
  args: {
    mode: "grouped",
    orientation: "horizontal",
    title: "Channel Comparison",
    description: "Side-by-side horizontal layout",
    height: 400,
  },
}

export const ThreeSeries: Story = {
  args: {
    title: "Share of Voice Breakdown",
    description: "Organic, paid, and social by channel",
    series: [
      { dataKey: "organic", label: "Organic", color: "var(--chart-1)" },
      { dataKey: "paid", label: "Paid", color: "var(--chart-2)" },
      { dataKey: "social", label: "Social", color: "var(--chart-3)" },
    ],
    data: [
      { category: "Google", organic: 450, paid: 280, social: 120 },
      { category: "Bing", organic: 120, paid: 180, social: 40 },
      { category: "YouTube", organic: 280, paid: 150, social: 320 },
      { category: "LinkedIn", organic: 90, paid: 200, social: 280 },
      { category: "TikTok", organic: 30, paid: 120, social: 450 },
    ],
  },
}

export const RoundedBars: Story = {
  args: {
    barRadius: 8,
    title: "Rounded Stacked Bars",
  },
}
