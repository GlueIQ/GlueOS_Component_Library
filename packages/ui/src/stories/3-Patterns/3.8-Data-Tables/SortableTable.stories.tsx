import type { Meta, StoryObj } from '@storybook/react'
import { SortableTable } from '../../../patterns/data-tables/sortable-table'

const meta = {
  title: '3-Patterns/3.8-Data-Tables/SortableTable',
  component: SortableTable,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A table with clickable column headers for ascending/descending sort.',
      },
    },
  },
} satisfies Meta<typeof SortableTable>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    columns: [
      { key: 'name', header: 'Name' },
      { key: 'email', header: 'Email' },
      { key: 'role', header: 'Role' },
      { key: 'joined', header: 'Joined' },
    ],
    data: [
      { name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', joined: '2024-01-15' },
      { name: 'Bob Williams', email: 'bob@example.com', role: 'Developer', joined: '2024-03-22' },
      { name: 'Carol Davis', email: 'carol@example.com', role: 'Designer', joined: '2024-02-10' },
      { name: 'Dave Wilson', email: 'dave@example.com', role: 'Developer', joined: '2024-04-01' },
      { name: 'Eve Brown', email: 'eve@example.com', role: 'Manager', joined: '2023-11-05' },
    ],
  },
}
