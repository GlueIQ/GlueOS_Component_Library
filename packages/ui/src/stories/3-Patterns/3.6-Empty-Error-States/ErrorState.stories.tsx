import type { Meta, StoryObj } from '@storybook/react'
import { ErrorState } from '../../../patterns/empty-error-states/error-state'

const meta = {
  title: '3-Patterns/3.6-Empty-Error-States/ErrorState',
  component: ErrorState,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'An error display with retry and fallback actions. Includes alert icon, title, description, and action buttons.',
      },
    },
  },
} satisfies Meta<typeof ErrorState>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    retryAction: { label: 'Try again' },
    fallbackAction: { label: 'Go home' },
  },
}

export const NotFound: Story = {
  args: {
    title: 'Page not found',
    description: "The page you're looking for doesn't exist or has been moved.",
    fallbackAction: { label: 'Go to dashboard' },
  },
}

export const Forbidden: Story = {
  args: {
    title: 'Access denied',
    description: "You don't have permission to view this resource. Contact your administrator for access.",
    fallbackAction: { label: 'Request access' },
  },
}
