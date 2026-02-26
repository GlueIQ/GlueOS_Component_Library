import type { Meta, StoryObj } from '@storybook/react'
import { LoadingState } from '../../../patterns/empty-error-states/loading-state'

const meta = {
  title: '3-Patterns/3.6-Empty-Error-States/LoadingState',
  component: LoadingState,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Loading placeholders with skeleton components. Supports card, list, and inline variants.',
      },
    },
  },
} satisfies Meta<typeof LoadingState>

export default meta
type Story = StoryObj<typeof meta>

export const CardVariant: Story = {
  args: { variant: 'card', count: 2 },
}

export const ListVariant: Story = {
  args: { variant: 'list', count: 5 },
}

export const InlineVariant: Story = {
  args: { variant: 'inline' },
}
