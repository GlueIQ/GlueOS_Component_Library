import type { Meta, StoryObj } from '@storybook/react'
import { ChartCard } from '../../../patterns/data-visualization/chart-card'

const meta = {
  title: '3-Patterns/3.2-Data-Visualization/ChartCard',
  component: ChartCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A card wrapper for charts with title, description, and optional time range selector. Composed of Card and Select components.',
      },
    },
  },
} satisfies Meta<typeof ChartCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Revenue Overview',
    description: 'Monthly revenue for the current year',
  },
  render: (args) => (
    <div className="max-w-2xl">
      <ChartCard {...args}>
        <div className="flex h-[200px] items-center justify-center rounded-md border border-dashed text-muted-foreground">
          Chart placeholder
        </div>
      </ChartCard>
    </div>
  ),
}

export const WithoutTimeRange: Story = {
  args: {
    title: 'User Growth',
    description: 'Total active users over time',
    timeRanges: [],
  },
  render: (args) => (
    <div className="max-w-2xl">
      <ChartCard {...args}>
        <div className="flex h-[200px] items-center justify-center rounded-md border border-dashed text-muted-foreground">
          Chart placeholder
        </div>
      </ChartCard>
    </div>
  ),
}
