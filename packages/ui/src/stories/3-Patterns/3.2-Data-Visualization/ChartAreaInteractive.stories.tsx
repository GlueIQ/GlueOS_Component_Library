import type { Meta, StoryObj } from '@storybook/react'
import { CHART_PALETTE_NAMES } from '../../../lib/colors/chart-palettes'
import { ChartAreaInteractive } from '../../../patterns/data-visualization/chart-area-interactive'

const meta = {
  title: '3-Patterns/3.2-Data Visualization/ChartAreaInteractive',
  component: ChartAreaInteractive,
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
          'An interactive area chart with time range filtering (7d/30d/90d). Uses gradient fills and stacked areas. Accepts an optional `palette` prop to override chart colors. Source: shadcn/ui chart-area-interactive (v4).',
      },
    },
  },
} satisfies Meta<typeof ChartAreaInteractive>

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
