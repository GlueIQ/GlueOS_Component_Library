import type { Meta, StoryObj } from '@storybook/react'
import { TeamMemberCard } from '../../../patterns/user-management/team-member-card'

const meta = {
  title: '3-Patterns/3.3-User-Management/TeamMemberCard',
  component: TeamMemberCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A compact card showing team member info with role badge and edit/remove actions.',
      },
    },
  },
} satisfies Meta<typeof TeamMemberCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', onEdit: () => {}, onRemove: () => {} },
  render: () => (
    <div className="w-full max-w-md space-y-2">
      <TeamMemberCard name="Alice Johnson" email="alice@example.com" role="Admin" onEdit={() => {}} onRemove={() => {}} />
      <TeamMemberCard name="Bob Williams" email="bob@example.com" role="Developer" onEdit={() => {}} onRemove={() => {}} />
      <TeamMemberCard name="Carol Davis" email="carol@example.com" role="Designer" onEdit={() => {}} />
    </div>
  ),
}
