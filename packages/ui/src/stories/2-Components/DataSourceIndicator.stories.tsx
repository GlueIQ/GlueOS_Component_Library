import type { Meta, StoryObj } from '@storybook/react'
import { DataSourceIndicator } from '../../components/ui/data-source-indicator'
import { Database, Cloud, Server } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'

const meta = {
  title: '2-Components/Data Source Indicator',
  component: DataSourceIndicator,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A compact popover indicator that displays data source attribution and sync status. Perfect for showing where data comes from in dashboards, reports, and analytics views.',
      },
    },
  },
  argTypes: {
    source: {
      control: 'text',
      description: 'The data source name (e.g., database table, API endpoint)',
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: 'Popover alignment',
    },
  },
} satisfies Meta<typeof DataSourceIndicator>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    source: 'Airtable: Client Forecast',
  },
}

export const WithFields: Story = {
  args: {
    source: 'Airtable: Client Forecast',
    fields: [
      { label: 'View', value: 'All Budgets' },
      { label: 'Updated', value: '2 minutes ago' },
    ],
  },
}

export const WithCustomStatus: Story = {
  args: { source: 'Production DB' },
  render: () => (
    <div className="flex gap-8">
      <DataSourceIndicator
        source="Production DB"
        status={{ label: 'Live Connection', variant: 'success' }}
      />
      <DataSourceIndicator
        source="Staging API"
        status={{ label: 'Syncing...', variant: 'warning' }}
      />
      <DataSourceIndicator
        source="Legacy System"
        status={{ label: 'Connection Error', variant: 'error' }}
      />
      <DataSourceIndicator
        source="Cache"
        status={{ label: 'Cached Data', variant: 'default' }}
      />
    </div>
  ),
}

export const WithCustomIcon: Story = {
  args: { source: 'PostgreSQL' },
  render: () => (
    <div className="flex gap-8">
      <DataSourceIndicator icon={<Database className="h-4 w-4" />} source="PostgreSQL" />
      <DataSourceIndicator icon={<Cloud className="h-4 w-4" />} source="AWS S3" />
      <DataSourceIndicator icon={<Server className="h-4 w-4" />} source="Internal API" />
    </div>
  ),
}

export const DatabaseExample: Story = {
  args: {
    source: 'PostgreSQL',
    fields: [
      { label: 'Table', value: 'users' },
      { label: 'Schema', value: 'public' },
      { label: 'Last Sync', value: '5 min ago' },
    ],
    status: { label: 'Connected', variant: 'success' },
    icon: <Database className="h-4 w-4" />,
  },
}

export const APIExample: Story = {
  args: {
    source: 'Productive API',
    fields: [
      { label: 'Endpoint', value: '/deals' },
      { label: 'Rate Limit', value: '100/min' },
    ],
    status: { label: 'Active', variant: 'success' },
    icon: <Cloud className="h-4 w-4" />,
  },
}

export const InContextDashboard: Story = {
  args: { source: 'Airtable: Forecasts' },
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Revenue Forecast</CardTitle>
          <DataSourceIndicator
            source="Airtable: Forecasts"
            fields={[
              { label: 'View', value: 'Q1 2026' },
              { label: 'Updated', value: 'Live' },
            ]}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Contracted</span>
            <span className="font-semibold">$124,500</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Pipeline</span>
            <span className="font-semibold">$85,200</span>
          </div>
          <div className="flex justify-between text-sm border-t pt-2">
            <span className="text-muted-foreground">Total</span>
            <span className="font-bold">$209,700</span>
          </div>
        </div>
      </CardContent>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example showing the data source indicator in a dashboard card header.',
      },
    },
  },
}

export const MultipleSourcesExample: Story = {
  args: { source: 'Airtable: Projects' },
  render: () => (
    <div className="space-y-4 w-96">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Project Forecast</CardTitle>
            <DataSourceIndicator
              source="Airtable: Projects"
              fields={[{ label: 'View', value: 'Active' }]}
              icon={<Database className="h-4 w-4" />}
            />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">23 active projects tracked</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Client Data</CardTitle>
            <DataSourceIndicator
              source="Productive API"
              fields={[
                { label: 'Endpoint', value: '/companies' },
                { label: 'Synced', value: '1 hour ago' },
              ]}
              icon={<Cloud className="h-4 w-4" />}
            />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">156 client records synced</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Analytics</CardTitle>
            <DataSourceIndicator
              source="Cached Report"
              status={{ label: 'Updated hourly', variant: 'default' }}
              icon={<Server className="h-4 w-4" />}
            />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Performance metrics dashboard</p>
        </CardContent>
      </Card>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Multiple cards each showing their data source provenance.',
      },
    },
  },
}
