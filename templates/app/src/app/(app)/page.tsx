import { BarChart3, Users, TrendingUp, Zap } from 'lucide-react'
import { Container } from '@repo/ui/components/ui/container'
import { Button } from '@repo/ui/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/ui/card'
import { PageHeader } from '@repo/ui/patterns/navigation/page-header'
import { StatsGrid } from '@repo/ui/patterns/data-visualization/stats-grid'
import { ChartBarInteractive } from '@repo/ui/patterns/data-visualization/chart-bar-interactive'

// ---------------------------------------------------------------------------
// Example data — replace with real data fetching
// ---------------------------------------------------------------------------

const stats = [
  {
    label: 'Active Records',
    value: '1,284',
    icon: <BarChart3 className="size-4" />,
    trend: { value: 12, label: 'vs last month' },
  },
  {
    label: 'Active Users',
    value: '48',
    icon: <Users className="size-4" />,
    description: 'Across 3 teams',
  },
  {
    label: 'This Week',
    value: '214',
    icon: <TrendingUp className="size-4" />,
    trend: { value: 8, label: 'vs last week' },
  },
  {
    label: 'Automations',
    value: '7',
    icon: <Zap className="size-4" />,
    description: 'Running now',
  },
]

const chartData = [
  { month: 'Aug', value: 186 },
  { month: 'Sep', value: 305 },
  { month: 'Oct', value: 237 },
  { month: 'Nov', value: 273 },
  { month: 'Dec', value: 209 },
  { month: 'Jan', value: 214 },
]

const chartSeries = [{ dataKey: 'value', label: 'Volume', color: 'var(--chart-1)' }]

// ---------------------------------------------------------------------------
// Example items list — replace with real data
// ---------------------------------------------------------------------------

const exampleItems = [
  { id: '1', name: 'Example Item Alpha', status: 'Active', updated: 'Jan 15' },
  { id: '2', name: 'Example Item Beta', status: 'Draft', updated: 'Jan 14' },
  { id: '3', name: 'Example Item Gamma', status: 'Active', updated: 'Jan 13' },
  { id: '4', name: 'Example Item Delta', status: 'Archived', updated: 'Jan 10' },
  { id: '5', name: 'Example Item Epsilon', status: 'Active', updated: 'Jan 9' },
]

const statusColors: Record<string, string> = {
  Active: 'text-emerald-600 dark:text-emerald-400',
  Draft: 'text-amber-600 dark:text-amber-400',
  Archived: 'text-zinc-500 dark:text-zinc-400',
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function DashboardPage() {
  return (
    <Container className="py-8 space-y-8">
      <PageHeader
        title="__APP_NAME__"
        description="__APP_DESCRIPTION__"
        actions={<Button>New Item</Button>}
      />

      <StatsGrid stats={stats} columns={4} />

      <ChartBarInteractive
        title="Monthly Volume"
        description="Activity volume over the last 6 months"
        data={chartData}
        series={chartSeries}
        xAxisKey="month"
      />

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <div>
              <CardTitle>Recent Items</CardTitle>
              <CardDescription>Latest activity in __APP_NAME__</CardDescription>
            </div>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {exampleItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-muted-foreground">Updated {item.updated}</p>
                </div>
                <span className={`text-xs font-medium ${statusColors[item.status] ?? ''}`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </Container>
  )
}
