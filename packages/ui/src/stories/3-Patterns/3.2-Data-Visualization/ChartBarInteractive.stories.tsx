import type { Meta, StoryObj } from '@storybook/react'
import { CHART_PALETTE_NAMES } from '../../../lib/colors/chart-palettes'
import { ChartBarInteractive } from '../../../patterns/data-visualization/chart-bar-interactive'

const meta = {
  title: '3-Patterns/3.2-Data Visualization/ChartBarInteractive',
  component: ChartBarInteractive,
  tags: ['autodocs'],
  argTypes: {
    palette: {
      control: 'select',
      options: [undefined, ...CHART_PALETTE_NAMES],
      description: 'Tailwind color palette for chart colors',
    },
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'An interactive bar chart with series toggle (Desktop/Mobile) and summary totals. Accepts an optional `palette` prop to override chart colors. Source: shadcn/ui chart-bar-interactive (v4).',
      },
    },
  },
} satisfies Meta<typeof ChartBarInteractive>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const PinkPalette: Story = {
  args: { palette: 'pink' },
}

export const BluePalette: Story = {
  args: { palette: 'blue' },
}

export const EmeraldPalette: Story = {
  args: { palette: 'emerald' },
}
