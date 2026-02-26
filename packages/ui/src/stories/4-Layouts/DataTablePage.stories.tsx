import type { Meta, StoryObj } from '@storybook/react'
import { DataTablePage } from '../../layouts/data-lists'
import { PageHeader } from '../../patterns/navigation/page-header'
import { FilterForm } from '../../patterns/forms/filter-form'
import { DataTableWithControls } from '../../patterns/data-tables/data-table-with-controls'
import { Button } from '../../components/ui/button'

const meta = {
  title: '4-Layouts/4.4-Data-Lists/DataTablePage',
  component: DataTablePage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A page layout with header, filters, and a full-featured data table.',
      },
    },
  },
} satisfies Meta<typeof DataTablePage>

export default meta
type Story = StoryObj<typeof meta>

const sampleData = Array.from({ length: 15 }, (_, i) => ({
  id: String(i + 1),
  name: `Project ${String.fromCharCode(65 + i)}`,
  owner: ['Alice', 'Bob', 'Carol', 'Dave'][i % 4],
  status: ['Active', 'Pending', 'Archived'][i % 3],
}))

export const Default: Story = {
  render: () => (
    <DataTablePage
      header={
        <PageHeader
          title="Projects"
          description="Manage all projects in your organization."
          actions={<Button>New Project</Button>}
        />
      }
      filters={<FilterForm />}
    >
      <DataTableWithControls
        columns={[
          { key: 'id', header: 'ID' },
          { key: 'name', header: 'Name' },
          { key: 'owner', header: 'Owner' },
          { key: 'status', header: 'Status' },
        ]}
        data={sampleData}
        searchKey="name"
        pageSize={5}
      />
    </DataTablePage>
  ),
}
