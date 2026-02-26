import type { Meta, StoryObj } from '@storybook/react'
import { DashboardLayout } from '../../layouts/dashboard'
import { StatsGrid } from '../../patterns/data-visualization/stats-grid'
import { PageHeader } from '../../patterns/navigation/page-header'
import { Button } from '../../components/ui/button'

const meta = {
  title: '4-Layouts/4.2-Dashboard/DashboardLayout',
  component: DashboardLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A dashboard page layout with page header, stats grid, and content area.',
      },
    },
  },
} satisfies Meta<typeof DashboardLayout>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <DashboardLayout
      header={
        <PageHeader
          title="Dashboard"
          description="Overview of your account activity."
          actions={<><Button variant="outline">Export</Button><Button>Create</Button></>}
        />
      }
      stats={
        <StatsGrid
          stats={[
            { label: 'Revenue', value: '$45,231', trend: { value: 20.1 } },
            { label: 'Users', value: '2,350', trend: { value: 12.5 } },
            { label: 'Sales', value: '12,234', trend: { value: -3.2 } },
            { label: 'Active', value: '573', trend: { value: 0 } },
          ]}
        />
      }
    >
      <div className="flex h-[300px] items-center justify-center rounded-lg border border-dashed text-muted-foreground">
        Charts and tables go here
      </div>
    </DashboardLayout>
  ),
}
