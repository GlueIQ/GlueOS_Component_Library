import type { Meta, StoryObj } from '@storybook/react'
import { UserTable } from '../../../patterns/user-management/user-table'

const meta = {
  title: '3-Patterns/3.3-User-Management/UserTable',
  component: UserTable,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A table listing users with avatar, role, status badge, and action dropdown menu.',
      },
    },
  },
} satisfies Meta<typeof UserTable>

export default meta
type Story = StoryObj<typeof meta>

const sampleUsers = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'active' as const },
  { id: '2', name: 'Bob Williams', email: 'bob@example.com', role: 'Developer', status: 'active' as const },
  { id: '3', name: 'Carol Davis', email: 'carol@example.com', role: 'Designer', status: 'pending' as const },
  { id: '4', name: 'Dave Wilson', email: 'dave@example.com', role: 'Viewer', status: 'inactive' as const },
]

export const Default: Story = {
  args: { users: sampleUsers },
}
