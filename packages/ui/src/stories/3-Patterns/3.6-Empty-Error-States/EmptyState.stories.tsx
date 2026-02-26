import type { Meta, StoryObj } from '@storybook/react'
import { EmptyState } from '../../../patterns/empty-error-states/empty-state'

const meta = {
  title: '3-Patterns/3.6-Empty-Error-States/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A placeholder display for when there is no data to show. Includes icon, title, description, and optional call-to-action.',
      },
    },
  },
} satisfies Meta<typeof EmptyState>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'No projects yet',
    description: 'Get started by creating your first project.',
    action: { label: 'Create project' },
  },
}

export const WithIcon: Story = {
  args: {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    ),
    title: 'No documents',
    description: 'Upload or create a new document to get started.',
    action: { label: 'Upload document' },
  },
}

export const WithoutAction: Story = {
  args: {
    title: 'No notifications',
    description: "You're all caught up! Check back later for updates.",
  },
}
