import type { Meta, StoryObj } from '@storybook/react'
import { NoResults } from '../../../patterns/empty-error-states/no-results'

const meta = {
  title: '3-Patterns/3.6-Empty-Error-States/NoResults',
  component: NoResults,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'An empty search results display with optional search query, suggestions, and clear action.',
      },
    },
  },
} satisfies Meta<typeof NoResults>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onClear: () => {},
  },
}

export const WithQuery: Story = {
  args: {
    query: 'dashboard components',
    onClear: () => {},
  },
}

export const WithoutClear: Story = {
  args: {
    title: 'No matching items',
    description: 'Try using different keywords or removing filters.',
  },
}
