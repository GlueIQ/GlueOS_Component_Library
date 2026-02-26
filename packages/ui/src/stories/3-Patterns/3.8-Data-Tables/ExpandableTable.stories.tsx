import type { Meta, StoryObj } from '@storybook/react'
import { ExpandableTable } from '../../../patterns/data-tables/expandable-table'

const meta = {
  title: '3-Patterns/3.8-Data-Tables/ExpandableTable',
  component: ExpandableTable,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A table with expandable detail rows showing additional content.',
      },
    },
  },
} satisfies Meta<typeof ExpandableTable>

export default meta
type Story = StoryObj<typeof meta>

const data = [
  { id: '1', name: 'Order #1001', customer: 'Alice', total: '$125.00', date: '2024-01-15' },
  { id: '2', name: 'Order #1002', customer: 'Bob', total: '$340.50', date: '2024-01-16' },
  { id: '3', name: 'Order #1003', customer: 'Carol', total: '$89.99', date: '2024-01-17' },
]

export const Default: Story = {
  args: {
    columns: [
      { key: 'name', header: 'Order' },
      { key: 'customer', header: 'Customer' },
      { key: 'total', header: 'Total' },
      { key: 'date', header: 'Date' },
    ],
    data,
    getRowId: (row: Record<string, unknown>) => row.id as string,
    renderExpanded: (row: Record<string, unknown>) => (
      <div className="space-y-2">
        <p className="text-sm font-medium">Order Details</p>
        <p className="text-sm text-muted-foreground">
          Customer: {row.customer as string} | Total: {row.total as string} | Date: {row.date as string}
        </p>
        <p className="text-sm text-muted-foreground">
          Additional order information, shipping details, and line items would appear here.
        </p>
      </div>
    ),
  },
}
