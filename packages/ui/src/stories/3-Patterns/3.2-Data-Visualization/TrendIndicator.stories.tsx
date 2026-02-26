import type { Meta, StoryObj } from '@storybook/react'
import { TrendIndicator } from '../../../patterns/data-visualization/trend-indicator'

const meta = {
  title: '3-Patterns/3.2-Data-Visualization/TrendIndicator',
  component: TrendIndicator,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A color-coded trend indicator showing increase, decrease, or neutral changes with an icon and percentage value.',
      },
    },
  },
} satisfies Meta<typeof TrendIndicator>

export default meta
type Story = StoryObj<typeof meta>

export const Positive: Story = {
  args: { value: 12.5 },
}

export const Negative: Story = {
  args: { value: -3.2 },
}

export const Neutral: Story = {
  args: { value: 0 },
}

export const AllVariants: Story = {
  args: { value: 0 },
  render: () => (
    <div className="flex items-center gap-6">
      <TrendIndicator value={12.5} />
      <TrendIndicator value={-3.2} />
      <TrendIndicator value={0} />
      <TrendIndicator value={8} suffix=" pts" />
    </div>
  ),
}
