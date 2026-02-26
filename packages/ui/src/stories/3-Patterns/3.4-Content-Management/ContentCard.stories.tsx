import type { Meta, StoryObj } from '@storybook/react'
import { ContentCard } from '../../../patterns/content-management/content-card'

const meta = {
  title: '3-Patterns/3.4-Content-Management/ContentCard',
  component: ContentCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A content preview card with title, excerpt, status badge, and action dropdown menu.',
      },
    },
  },
} satisfies Meta<typeof ContentCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { title: 'Getting Started with GlueOS' },
  render: () => (
    <div className="w-full max-w-md">
      <ContentCard
        title="Getting Started with GlueOS"
        excerpt="Learn how to set up your development environment and create your first GlueOS application."
        status="Published"
        meta="Updated 2 days ago"
        onEdit={() => {}}
        onDelete={() => {}}
        onView={() => {}}
      />
    </div>
  ),
}

export const Draft: Story = {
  args: { title: 'Advanced Patterns' },
  render: () => (
    <div className="w-full max-w-md">
      <ContentCard
        title="Advanced Patterns"
        excerpt="Deep dive into advanced UI patterns for enterprise applications."
        status="Draft"
        statusVariant="outline"
        meta="Last edited 5 hours ago"
        onEdit={() => {}}
        onView={() => {}}
      />
    </div>
  ),
}
