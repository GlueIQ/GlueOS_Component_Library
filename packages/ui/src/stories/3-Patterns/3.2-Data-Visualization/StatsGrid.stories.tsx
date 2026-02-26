import type { Meta, StoryObj } from '@storybook/react'
import { StatsGrid } from '../../../patterns/data-visualization/stats-grid'

const meta = {
  title: '3-Patterns/3.2-Data-Visualization/StatsGrid',
  component: StatsGrid,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A responsive grid of stat cards showing key metrics with optional trend indicators and icons.',
      },
    },
  },
} satisfies Meta<typeof StatsGrid>

export default meta
type Story = StoryObj<typeof meta>

const sampleStats = [
  { label: 'Total Revenue', value: '$45,231.89', trend: { value: 20.1, label: 'from last month' } },
  { label: 'Subscriptions', value: '+2,350', trend: { value: 180.1, label: 'from last month' } },
  { label: 'Sales', value: '+12,234', trend: { value: 19, label: 'from last month' } },
  { label: 'Active Now', value: '+573', trend: { value: -2, label: 'since last hour' } },
]

export const Default: Story = {
  args: {
    stats: sampleStats,
    columns: 4,
  },
}

export const TwoColumns: Story = {
  args: {
    stats: sampleStats.slice(0, 2),
    columns: 2,
  },
}

export const ThreeColumns: Story = {
  args: {
    stats: sampleStats.slice(0, 3),
    columns: 3,
  },
}
