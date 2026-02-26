import type { Meta, StoryObj } from '@storybook/react'
import { SelectableTable } from '../../../patterns/data-tables/selectable-table'

const meta = {
  title: '3-Patterns/3.8-Data-Tables/SelectableTable',
  component: SelectableTable,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A table with checkbox row selection, select all, and bulk action bar.',
      },
    },
  },
} satisfies Meta<typeof SelectableTable>

export default meta
type Story = StoryObj<typeof meta>

const data = [
  { id: '1', name: 'Project Alpha', owner: 'Alice', status: 'Active' },
  { id: '2', name: 'Project Beta', owner: 'Bob', status: 'Pending' },
  { id: '3', name: 'Project Gamma', owner: 'Carol', status: 'Active' },
  { id: '4', name: 'Project Delta', owner: 'Dave', status: 'Archived' },
]

export const Default: Story = {
  args: {
    columns: [
      { key: 'name', header: 'Name' },
      { key: 'owner', header: 'Owner' },
      { key: 'status', header: 'Status' },
    ],
    data,
    getRowId: (row: Record<string, unknown>) => row.id as string,
    bulkActions: [
      { label: 'Archive', onClick: () => {} },
      { label: 'Delete', onClick: () => {}, variant: 'destructive' as const },
    ],
  },
}
