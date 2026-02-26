import type { Meta, StoryObj } from "@storybook/react"
import { CHART_PALETTE_NAMES } from "../../../lib/colors/chart-palettes"
import { ChartPieInteractive } from "../../../patterns/data-visualization/chart-pie-interactive"

const meta = {
  title: "3-Patterns/3.2-Data Visualization/ChartPieInteractive",
  component: ChartPieInteractive,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
    showSelector: { control: "boolean" },
    showCard: { control: "boolean" },
    innerRadius: {
      control: { type: "range", min: 0, max: 100, step: 5 },
      description: "Inner radius for donut style (0 = solid pie)",
    },
    size: {
      control: { type: "range", min: 200, max: 400, step: 25 },
      description: "Chart diameter in pixels",
    },
    palette: {
      control: "select",
      options: [undefined, ...CHART_PALETTE_NAMES],
    },
  },
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "An interactive donut/pie chart with segment selector and active highlight. Supports configurable slices, inner radius, center label, and palette overrides. Covers Immersion gap: TrafficSharePie, ChannelDistribution. Source: shadcn/ui chart-pie-interactive (v4), extended with configurable API.",
      },
    },
  },
} satisfies Meta<typeof ChartPieInteractive>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <div className="w-full max-w-sm">
      <ChartPieInteractive {...args} />
    </div>
  ),
}

export const SolidPie: Story = {
  args: {
    innerRadius: 0,
    title: "Solid Pie Chart",
    description: "Without donut hole",
  },
  render: (args) => (
    <div className="w-full max-w-sm">
      <ChartPieInteractive {...args} />
    </div>
  ),
}

export const NoSelector: Story = {
  args: {
    showSelector: false,
    title: "Static Donut",
    description: "Without segment selector dropdown",
  },
  render: (args) => (
    <div className="w-full max-w-sm">
      <ChartPieInteractive {...args} />
    </div>
  ),
}

export const CustomSlices: Story = {
  args: {
    title: "Traffic Sources",
    description: "Distribution by channel",
    showSelector: false,
    centerLabel: "Traffic",
    slices: [
      { key: "organic", value: 45200, label: "Organic" },
      { key: "direct", value: 28100, label: "Direct" },
      { key: "referral", value: 15800, label: "Referral" },
      { key: "social", value: 8400, label: "Social" },
      { key: "email", value: 5100, label: "Email" },
    ],
  },
  render: (args) => (
    <div className="w-full max-w-sm">
      <ChartPieInteractive {...args} />
    </div>
  ),
}

export const ThreeSlices: Story = {
  args: {
    title: "Revenue Mix",
    description: "By business line",
    showSelector: false,
    centerLabel: "Revenue",
    slices: [
      { key: "saas", value: 680000, label: "SaaS" },
      { key: "services", value: 320000, label: "Services" },
      { key: "licensing", value: 120000, label: "Licensing" },
    ],
    formatValue: (v: number) => `$${(v / 1000).toFixed(0)}K`,
  },
  render: (args) => (
    <div className="w-full max-w-sm">
      <ChartPieInteractive {...args} />
    </div>
  ),
}

export const LargeDonut: Story = {
  args: {
    size: 350,
    innerRadius: 90,
    title: "Large Donut",
    description: "Bigger chart with wider donut",
  },
  render: (args) => (
    <div className="w-full max-w-md">
      <ChartPieInteractive {...args} />
    </div>
  ),
}

export const Compact: Story = {
  args: {
    size: 200,
    showCard: false,
    showSelector: false,
  },
  render: (args) => (
    <div className="w-full max-w-xs">
      <ChartPieInteractive {...args} />
    </div>
  ),
}
