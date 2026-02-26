import type { Meta, StoryObj } from '@storybook/react'
import { ChartComposedInteractive } from '../../../patterns/data-visualization/chart-composed-interactive'

const meta = {
  title: '3-Patterns/3.2-Data Visualization/Chart Composed Interactive',
  component: ChartComposedInteractive,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'An interactive composed chart combining bars and lines with dual Y-axes. Perfect for financial visualizations showing revenue/costs (bars) and margins/percentages (line). Supports custom formatters, series configuration, and reference lines.',
      },
    },
  },
  argTypes: {
    palette: {
      control: 'select',
      options: [
        'blue',
        'green',
        'red',
        'orange',
        'purple',
        'pink',
        'cyan',
        'emerald',
        'amber',
        'violet',
        'rose',
        'indigo',
        'teal',
        'lime',
        'fuchsia',
        'sky',
        'slate',
      ],
      description: 'Color palette for chart series',
    },
    height: {
      control: { type: 'range', min: 200, max: 600, step: 50 },
      description: 'Chart height in pixels',
    },
    showReferenceLine: {
      control: 'boolean',
      description: 'Show zero reference line',
    },
  },
} satisfies Meta<typeof ChartComposedInteractive>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const ProfitabilityChart: Story = {
  args: {
    title: 'Project Profitability',
    description: 'Revenue vs costs with margin percentage',
    data: [
      { month: 'Jan', revenue: 120000, costs: 85000, margin: 29 },
      { month: 'Feb', revenue: 135000, costs: 92000, margin: 32 },
      { month: 'Mar', revenue: 145000, costs: 98000, margin: 32 },
      { month: 'Apr', revenue: 128000, costs: 88000, margin: 31 },
      { month: 'May', revenue: 152000, costs: 102000, margin: 33 },
      { month: 'Jun', revenue: 168000, costs: 110000, margin: 35 },
    ],
    series: [
      {
        dataKey: 'revenue',
        label: 'Revenue',
        type: 'bar',
        yAxisId: 'left',
        color: 'hsl(var(--chart-1))',
        formatter: (value) => `$${(value / 1000).toFixed(0)}k`,
      },
      {
        dataKey: 'costs',
        label: 'Costs',
        type: 'bar',
        yAxisId: 'left',
        color: 'hsl(var(--chart-2))',
        formatter: (value) => `$${(value / 1000).toFixed(0)}k`,
      },
      {
        dataKey: 'margin',
        label: 'Margin %',
        type: 'line',
        yAxisId: 'right',
        color: 'hsl(var(--chart-3))',
        formatter: (value) => `${value}%`,
      },
    ],
    xAxisKey: 'month',
    palette: 'blue',
  },
}

export const SalesPerformance: Story = {
  args: {
    title: 'Sales Performance',
    description: 'Units sold vs conversion rate',
    data: [
      { week: 'Week 1', units: 245, leads: 1200, conversion: 20.4 },
      { week: 'Week 2', units: 312, leads: 1450, conversion: 21.5 },
      { week: 'Week 3', units: 198, leads: 1100, conversion: 18.0 },
      { week: 'Week 4', units: 385, leads: 1680, conversion: 22.9 },
    ],
    series: [
      {
        dataKey: 'units',
        label: 'Units Sold',
        type: 'bar',
        yAxisId: 'left',
        color: 'hsl(var(--chart-1))',
        formatter: (value) => value.toLocaleString(),
      },
      {
        dataKey: 'leads',
        label: 'Leads',
        type: 'bar',
        yAxisId: 'left',
        color: 'hsl(var(--chart-2))',
        formatter: (value) => value.toLocaleString(),
      },
      {
        dataKey: 'conversion',
        label: 'Conversion Rate',
        type: 'line',
        yAxisId: 'right',
        color: 'hsl(var(--chart-3))',
        formatter: (value) => `${value.toFixed(1)}%`,
      },
    ],
    xAxisKey: 'week',
    palette: 'green',
  },
}

export const TrafficAndEngagement: Story = {
  args: {
    title: 'Website Analytics',
    description: 'Page views vs engagement metrics',
    data: [
      { date: 'Mon', pageViews: 5200, uniqueVisitors: 3800, bounceRate: 42 },
      { date: 'Tue', pageViews: 6100, uniqueVisitors: 4200, bounceRate: 38 },
      { date: 'Wed', pageViews: 5800, uniqueVisitors: 4000, bounceRate: 40 },
      { date: 'Thu', pageViews: 7200, uniqueVisitors: 4900, bounceRate: 35 },
      { date: 'Fri', pageViews: 6800, uniqueVisitors: 4600, bounceRate: 37 },
      { date: 'Sat', pageViews: 4100, uniqueVisitors: 3200, bounceRate: 48 },
      { date: 'Sun', pageViews: 3800, uniqueVisitors: 2900, bounceRate: 52 },
    ],
    series: [
      {
        dataKey: 'pageViews',
        label: 'Page Views',
        type: 'bar',
        yAxisId: 'left',
        color: 'hsl(var(--chart-1))',
        formatter: (value) => value.toLocaleString(),
      },
      {
        dataKey: 'uniqueVisitors',
        label: 'Unique Visitors',
        type: 'bar',
        yAxisId: 'left',
        color: 'hsl(var(--chart-2))',
        formatter: (value) => value.toLocaleString(),
      },
      {
        dataKey: 'bounceRate',
        label: 'Bounce Rate',
        type: 'line',
        yAxisId: 'right',
        color: 'hsl(var(--chart-3))',
        formatter: (value) => `${value}%`,
      },
    ],
    xAxisKey: 'date',
    palette: 'purple',
  },
}

export const CustomHeight: Story = {
  args: {
    title: 'Quarterly Revenue',
    height: 500,
    data: [
      { quarter: 'Q1 2025', revenue: 450000, costs: 320000, margin: 29 },
      { quarter: 'Q2 2025', revenue: 520000, costs: 350000, margin: 33 },
      { quarter: 'Q3 2025', revenue: 580000, costs: 385000, margin: 34 },
      { quarter: 'Q4 2025', revenue: 620000, costs: 410000, margin: 34 },
    ],
    series: [
      {
        dataKey: 'revenue',
        label: 'Revenue',
        type: 'bar',
        yAxisId: 'left',
        color: 'hsl(var(--chart-1))',
        formatter: (value) => `$${(value / 1000).toFixed(0)}k`,
      },
      {
        dataKey: 'costs',
        label: 'Costs',
        type: 'bar',
        yAxisId: 'left',
        color: 'hsl(var(--chart-2))',
        formatter: (value) => `$${(value / 1000).toFixed(0)}k`,
      },
      {
        dataKey: 'margin',
        label: 'Margin %',
        type: 'line',
        yAxisId: 'right',
        color: 'hsl(var(--chart-3))',
        formatter: (value) => `${value}%`,
      },
    ],
    xAxisKey: 'quarter',
    palette: 'orange',
  },
}

export const WithoutReferenceLine: Story = {
  args: {
    title: 'Positive Metrics Only',
    showReferenceLine: false,
    data: [
      { month: 'Jan', active: 1200, premium: 450, retention: 87 },
      { month: 'Feb', active: 1350, premium: 520, retention: 89 },
      { month: 'Mar', active: 1480, premium: 580, retention: 91 },
      { month: 'Apr', active: 1620, premium: 640, retention: 92 },
    ],
    series: [
      {
        dataKey: 'active',
        label: 'Active Users',
        type: 'bar',
        yAxisId: 'left',
        color: 'hsl(var(--chart-1))',
        formatter: (value) => value.toLocaleString(),
      },
      {
        dataKey: 'premium',
        label: 'Premium Users',
        type: 'bar',
        yAxisId: 'left',
        color: 'hsl(var(--chart-2))',
        formatter: (value) => value.toLocaleString(),
      },
      {
        dataKey: 'retention',
        label: 'Retention Rate',
        type: 'line',
        yAxisId: 'right',
        color: 'hsl(var(--chart-3))',
        formatter: (value) => `${value}%`,
      },
    ],
    xAxisKey: 'month',
    palette: 'emerald',
  },
}

export const MultipleLines: Story = {
  args: {
    title: 'Product Metrics',
    description: 'Sales volume with quality scores',
    data: [
      { product: 'Product A', sales: 1200, defects: 45, satisfaction: 4.2, nps: 67 },
      { product: 'Product B', sales: 980, defects: 28, satisfaction: 4.5, nps: 72 },
      { product: 'Product C', sales: 1450, defects: 62, satisfaction: 3.8, nps: 58 },
      { product: 'Product D', sales: 820, defects: 18, satisfaction: 4.7, nps: 78 },
    ],
    series: [
      {
        dataKey: 'sales',
        label: 'Units Sold',
        type: 'bar',
        yAxisId: 'left',
        color: 'hsl(var(--chart-1))',
        formatter: (value) => value.toLocaleString(),
      },
      {
        dataKey: 'defects',
        label: 'Defects',
        type: 'bar',
        yAxisId: 'left',
        color: 'hsl(var(--chart-2))',
        formatter: (value) => value.toLocaleString(),
      },
      {
        dataKey: 'satisfaction',
        label: 'Satisfaction',
        type: 'line',
        yAxisId: 'right',
        color: 'hsl(var(--chart-3))',
        formatter: (value) => value.toFixed(1),
      },
      {
        dataKey: 'nps',
        label: 'NPS Score',
        type: 'line',
        yAxisId: 'right',
        color: 'hsl(var(--chart-4))',
        formatter: (value) => value.toString(),
      },
    ],
    xAxisKey: 'product',
    palette: 'violet',
  },
}
