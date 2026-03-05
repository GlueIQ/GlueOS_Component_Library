import type { Meta, StoryObj } from '@storybook/react'
import { MetricCard, Metric, MetricGrid, MetricItem, MetricFooter } from '../../components/ui/metric-card'
import { Users, TrendingUp, DollarSign, Clock, Briefcase, Target, Activity } from 'lucide-react'

const meta = {
  title: '2-Components/Metric Card',
  component: MetricCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A flexible card component for displaying key metrics and KPIs. Supports primary metrics with icons, metric grids for breakdowns, and optional footer content. Perfect for dashboards and analytics interfaces.',
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Card title',
    },
    description: {
      control: 'text',
      description: 'Optional card description',
    },
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'accent'],
      description: 'Visual variant with gradient backgrounds',
    },
  },
} satisfies Meta<typeof MetricCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { title: 'Total Revenue' },
  render: () => (
    <MetricCard title="Total Revenue" className="max-w-md">
      <Metric icon={<DollarSign className="h-5 w-5" />} value="$124,500" label="This Month" />
    </MetricCard>
  ),
}

export const WithDescription: Story = {
  args: { title: 'Active Users' },
  render: () => (
    <MetricCard title="Active Users" description="Last 30 days" className="max-w-md">
      <Metric icon={<Users className="h-5 w-5" />} value="2,543" label="Active Users" />
    </MetricCard>
  ),
}

export const WithBreakdown: Story = {
  args: { title: 'Team Headcount' },
  render: () => (
    <MetricCard title="Team Headcount" className="max-w-md">
      <Metric icon={<Users className="h-5 w-5" />} value={48} label="Total Headcount" />

      <MetricGrid columns={2}>
        <MetricItem icon={<Briefcase className="h-4 w-4" />} value={35} label="Full-time" />
        <MetricItem icon={<Users className="h-4 w-4" />} value={13} label="Contractors" />
      </MetricGrid>
    </MetricCard>
  ),
}

export const WithFooter: Story = {
  args: { title: 'Service Line Capacity' },
  render: () => (
    <MetricCard title="Service Line Capacity" className="max-w-md">
      <Metric icon={<Users className="h-5 w-5" />} value={48} label="Total Headcount" />

      <MetricGrid columns={2}>
        <MetricItem icon={<Briefcase className="h-4 w-4" />} value={35} label="Full-time" />
        <MetricItem icon={<Users className="h-4 w-4" />} value={13} label="Contractors" />
      </MetricGrid>

      <MetricFooter icon={<Clock className="h-4 w-4" />}>
        7,680 hrs/month capacity
      </MetricFooter>
    </MetricCard>
  ),
}

export const ColorVariants: Story = {
  args: { title: 'Revenue' },
  render: () => (
    <div className="grid grid-cols-2 gap-4 max-w-3xl">
      <MetricCard title="Revenue" variant="default">
        <Metric icon={<DollarSign className="h-5 w-5" />} value="$124.5K" label="This Month" />
      </MetricCard>

      <MetricCard title="Active Projects" variant="primary">
        <Metric icon={<Target className="h-5 w-5" />} value={23} label="In Progress" />
      </MetricCard>

      <MetricCard title="Team Size" variant="secondary">
        <Metric icon={<Users className="h-5 w-5" />} value={48} label="Total Members" />
      </MetricCard>

      <MetricCard title="Growth Rate" variant="accent">
        <Metric icon={<TrendingUp className="h-5 w-5" />} value="+24%" label="vs Last Month" />
      </MetricCard>
    </div>
  ),
}

export const ThreeColumnGrid: Story = {
  args: { title: 'Project Metrics' },
  render: () => (
    <MetricCard title="Project Metrics" description="Current quarter" className="max-w-2xl">
      <Metric icon={<Target className="h-5 w-5" />} value={156} label="Total Projects" />

      <MetricGrid columns={3}>
        <MetricItem icon={<Activity className="h-4 w-4" />} value={42} label="Active" />
        <MetricItem icon={<Clock className="h-4 w-4" />} value={18} label="On Hold" />
        <MetricItem icon={<TrendingUp className="h-4 w-4" />} value={96} label="Completed" />
      </MetricGrid>
    </MetricCard>
  ),
}

export const MultipleMetrics: Story = {
  args: { title: 'Department Overview' },
  render: () => (
    <MetricCard title="Department Overview" className="max-w-md">
      <Metric icon={<Users className="h-5 w-5" />} value={48} label="Team Members" />

      <div className="space-y-3 pt-4">
        <Metric icon={<DollarSign className="h-5 w-5" />} value="$1.2M" label="Budget" variant="muted" />
        <Metric icon={<Target className="h-5 w-5" />} value={12} label="Active Projects" variant="muted" />
      </div>
    </MetricCard>
  ),
}

export const CompactLayout: Story = {
  args: { title: 'Sales' },
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <MetricCard title="Sales" variant="primary">
        <Metric value="$45.2K" label="This Week" />
      </MetricCard>

      <MetricCard title="Leads" variant="secondary">
        <Metric value={128} label="New Leads" />
      </MetricCard>

      <MetricCard title="Conversion" variant="accent">
        <Metric value="32%" label="Close Rate" />
      </MetricCard>
    </div>
  ),
}

export const DashboardExample: Story = {
  args: { title: 'Revenue' },
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <MetricCard title="Revenue" variant="primary">
        <Metric icon={<DollarSign className="h-5 w-5" />} value="$124,500" label="This Month" />
        <MetricGrid columns={2}>
          <MetricItem value="$102K" label="Last Month" />
          <MetricItem value="+22%" label="Growth" />
        </MetricGrid>
      </MetricCard>

      <MetricCard title="Active Users" variant="secondary">
        <Metric icon={<Users className="h-5 w-5" />} value="2,543" label="Current" />
        <MetricGrid columns={2}>
          <MetricItem value="2,104" label="Last Period" />
          <MetricItem value="+439" label="New" />
        </MetricGrid>
      </MetricCard>

      <MetricCard title="Performance" variant="accent">
        <Metric icon={<TrendingUp className="h-5 w-5" />} value="94.2%" label="Uptime" />
        <MetricGrid columns={2}>
          <MetricItem value="1.2s" label="Avg Response" />
          <MetricItem value="99.1%" label="Success Rate" />
        </MetricGrid>
      </MetricCard>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of a dashboard layout with multiple metric cards.',
      },
    },
  },
}
