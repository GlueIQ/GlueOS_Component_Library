import type { Meta, StoryObj } from '@storybook/react'
import { CHART_PALETTE_NAMES } from '../../../lib/colors/chart-palettes'
import { ChartPieInteractive } from '../../../patterns/data-visualization/chart-pie-interactive'

const meta = {
  title: '3-Patterns/3.2-Data Visualization/ChartPieInteractive',
  component: ChartPieInteractive,
  tags: ['autodocs'],
  argTypes: {
    palette: {
      control: 'select',
      options: [undefined, ...CHART_PALETTE_NAMES],
      description: 'Tailwind color palette for chart colors',
    },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'An interactive donut pie chart with month selector and active segment highlight. Accepts an optional `palette` prop to override chart colors. Source: shadcn/ui chart-pie-interactive (v4).',
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

export const PinkPalette: Story = {
  args: { palette: 'pink' },
  render: (args) => (
    <div className="w-full max-w-sm">
      <ChartPieInteractive {...args} />
    </div>
  ),
}

export const BluePalette: Story = {
  args: { palette: 'blue' },
  render: (args) => (
    <div className="w-full max-w-sm">
      <ChartPieInteractive {...args} />
    </div>
  ),
}

export const EmeraldPalette: Story = {
  args: { palette: 'emerald' },
  render: (args) => (
    <div className="w-full max-w-sm">
      <ChartPieInteractive {...args} />
    </div>
  ),
}
