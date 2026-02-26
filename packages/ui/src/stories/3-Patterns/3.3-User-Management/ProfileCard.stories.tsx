import type { Meta, StoryObj } from '@storybook/react'
import { ProfileCard } from '../../../patterns/user-management/profile-card'

const meta = {
  title: '3-Patterns/3.3-User-Management/ProfileCard',
  component: ProfileCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A card displaying user profile information with avatar, role badge, stats, and edit action.',
      },
    },
  },
} satisfies Meta<typeof ProfileCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { name: 'John Doe', email: 'john@example.com', role: 'Admin', onEdit: () => {} },
  render: (args) => (
    <div className="w-full max-w-md">
      <ProfileCard {...args} />
    </div>
  ),
}

export const WithAvatar: Story = {
  args: { name: 'Jane Smith', email: 'jane@example.com', role: 'Developer', avatarUrl: '/avatars/shadcn.jpg', onEdit: () => {} },
  render: (args) => (
    <div className="w-full max-w-md">
      <ProfileCard {...args} />
    </div>
  ),
}
