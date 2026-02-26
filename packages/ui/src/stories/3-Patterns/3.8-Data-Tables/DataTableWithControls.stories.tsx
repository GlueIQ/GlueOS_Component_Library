import type { Meta, StoryObj } from '@storybook/react'
import { DataTableWithControls } from '../../../patterns/data-tables/data-table-with-controls'

const meta = {
  title: '3-Patterns/3.8-Data-Tables/DataTableWithControls',
  component: DataTableWithControls,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A full-featured data table with search, pagination, and page size controls.',
      },
    },
  },
} satisfies Meta<typeof DataTableWithControls>

export default meta
type Story = StoryObj<typeof meta>

const sampleData = Array.from({ length: 25 }, (_, i) => ({
  id: String(i + 1),
  name: `Item ${i + 1}`,
  category: ['Engineering', 'Design', 'Marketing', 'Sales'][i % 4],
  status: ['Active', 'Pending', 'Archived'][i % 3],
}))

export const Default: Story = {
  args: {
    columns: [
      { key: 'id', header: 'ID' },
      { key: 'name', header: 'Name' },
      { key: 'category', header: 'Category' },
      { key: 'status', header: 'Status' },
    ],
    data: sampleData,
    searchKey: 'name',
    pageSize: 5,
  },
}
