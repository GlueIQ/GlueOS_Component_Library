import type { Meta, StoryObj } from '@storybook/react'
import { ContentFilters } from '../../../patterns/content-management/content-filters'

const meta = {
  title: '3-Patterns/3.4-Content-Management/ContentFilters',
  component: ContentFilters,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'An inline filter bar with search input, status select, and clear action.',
      },
    },
  },
} satisfies Meta<typeof ContentFilters>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { onClear: () => {} },
}
