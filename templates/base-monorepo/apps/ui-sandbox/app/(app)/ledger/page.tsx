"use client"

import {
  DollarSign,
  FolderOpen,
  Percent,
  TrendingUp,
  Download,
} from "lucide-react"

import { Container } from "@__SCOPE__/ui/components/ui/container"
import { Button } from "@__SCOPE__/ui/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@__SCOPE__/ui/components/ui/card"
import { Badge } from "@__SCOPE__/ui/components/ui/badge"
import { PageHeader } from "@__SCOPE__/ui/patterns/navigation/page-header"
import { StatsGrid } from "@__SCOPE__/ui/patterns/data-visualization/stats-grid"
import { ChartLineInteractive } from "@__SCOPE__/ui/patterns/data-visualization/chart-line-interactive"
import { SortableTable, type SortableColumn } from "@__SCOPE__/ui/patterns/data-tables/sortable-table"

// ---------------------------------------------------------------------------
// Static mock data — mirrors GlueIQ Ledger executive dashboard
// ---------------------------------------------------------------------------

const stats = [
  {
    label: "Total Revenue",
    value: "$2.4M",
    icon: <DollarSign className="size-4" />,
    trend: { value: 12, label: "vs last year" },
  },
  {
    label: "Active Projects",
    value: 18,
    icon: <FolderOpen className="size-4" />,
    trend: { value: 8, label: "vs last quarter" },
  },
  {
    label: "Profit Margin",
    value: "32%",
    icon: <Percent className="size-4" />,
    trend: { value: 3, label: "vs last year" },
  },
  {
    label: "Total Profit",
    value: "$768K",
    icon: <TrendingUp className="size-4" />,
    trend: { value: 15, label: "vs last year" },
  },
]

// Financial trend data — monthly for current year
const financialData = [
  { month: "Jan", revenue: 180, payroll: 85, contractors: 30, overhead: 20 },
  { month: "Feb", revenue: 195, payroll: 88, contractors: 28, overhead: 21 },
  { month: "Mar", revenue: 220, payroll: 90, contractors: 35, overhead: 22 },
  { month: "Apr", revenue: 210, payroll: 92, contractors: 32, overhead: 20 },
  { month: "May", revenue: 240, payroll: 95, contractors: 38, overhead: 23 },
  { month: "Jun", revenue: 235, payroll: 93, contractors: 36, overhead: 22 },
  { month: "Jul", revenue: 250, payroll: 96, contractors: 40, overhead: 24 },
  { month: "Aug", revenue: 260, payroll: 98, contractors: 42, overhead: 25 },
  { month: "Sep", revenue: 245, payroll: 97, contractors: 38, overhead: 23 },
  { month: "Oct", revenue: 270, payroll: 100, contractors: 44, overhead: 26 },
  { month: "Nov", revenue: 255, payroll: 99, contractors: 41, overhead: 24 },
  { month: "Dec", revenue: 280, payroll: 102, contractors: 46, overhead: 27 },
]

const financialSeries = [
  { dataKey: "revenue", label: "Services Revenue", color: "var(--chart-1)" },
  { dataKey: "payroll", label: "Payroll", color: "var(--chart-2)" },
  { dataKey: "contractors", label: "Contractors", color: "var(--chart-3)" },
  { dataKey: "overhead", label: "Overhead", color: "var(--chart-4)" },
]

// Active projects table data
interface Project extends Record<string, unknown> {
  project: string
  status: string
  timeEntries: string
  client: string
  value: string
  manager: string
}

const projects: Project[] = [
  {
    project: "Brand Refresh 2026",
    status: "Active",
    timeEntries: "142.5 hrs",
    client: "Meridian Health",
    value: "$85,000",
    manager: "Sarah Chen",
  },
  {
    project: "Digital Transformation",
    status: "Active",
    timeEntries: "98.0 hrs",
    client: "TerraVerde",
    value: "$120,000",
    manager: "James Whitfield",
  },
  {
    project: "Performance Marketing",
    status: "Active",
    timeEntries: "67.5 hrs",
    client: "NovaCraft",
    value: "$45,000",
    manager: "Mia Torres",
  },
  {
    project: "Website Redesign",
    status: "Active",
    timeEntries: "215.0 hrs",
    client: "Apex Financial",
    value: "$150,000",
    manager: "David Park",
  },
  {
    project: "Market Entry Strategy",
    status: "Active",
    timeEntries: "34.5 hrs",
    client: "Stratos Aerospace",
    value: "$75,000",
    manager: "Lisa Rodriguez",
  },
  {
    project: "Content Platform Build",
    status: "Active",
    timeEntries: "156.0 hrs",
    client: "Luminos Education",
    value: "$95,000",
    manager: "Sarah Chen",
  },
]

const projectColumns: SortableColumn<Project>[] = [
  {
    key: "project",
    header: "Project",
    sortable: true,
    render: (row: Project) => (
      <span className="font-medium">{row.project}</span>
    ),
  },
  {
    key: "status",
    header: "Status",
    render: () => (
      <Badge
        variant="outline"
        className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800"
      >
        Active
      </Badge>
    ),
  },
  {
    key: "timeEntries",
    header: "Time Logged",
    sortable: true,
  },
  {
    key: "client",
    header: "Client",
    sortable: true,
    render: (row: Project) => (
      <div>
        <span>{row.client}</span>
        <p className="text-xs text-muted-foreground">Value: {row.value}</p>
      </div>
    ),
  },
  {
    key: "manager",
    header: "Project Manager",
    sortable: true,
  },
]

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function LedgerPage() {
  return (
    <Container className="py-8 space-y-8">
      <PageHeader
        title="Executive Overview"
        description="Financial performance and operational metrics"
        actions={
          <Button variant="outline">
            <Download className="size-4 mr-2" />
            Download Report
          </Button>
        }
      />

      {/* Financial Signal */}
      <div className="rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-3 dark:border-yellow-800 dark:bg-yellow-950/40">
        <div className="flex items-start gap-3">
          <TrendingUp className="mt-0.5 size-4 shrink-0 text-yellow-600 dark:text-yellow-400" />
          <div>
            <span className="text-xs font-semibold uppercase tracking-wide text-yellow-600 dark:text-yellow-400">
              Financial Signal
            </span>
            <p className="mt-0.5 text-sm leading-relaxed text-yellow-900 dark:text-yellow-200">
              Revenue is tracking 8% below monthly target — the Performance Marketing service line is the primary drag, with profitability down 3 points vs. last month. Team utilization is at 87% and holding. Q1 forecast remains achievable if the two at-risk accounts are retained; a scenario plan is recommended before the monthly review.
            </p>
          </div>
        </div>
      </div>

      <StatsGrid stats={stats} columns={4} />

      {/* Financial Trends Chart */}
      <ChartLineInteractive
        title="Financial Trends"
        description="Monthly breakdown of revenue and costs for 2026"
        data={financialData}
        series={financialSeries}
        xAxisKey="month"
      />

      {/* Active Projects Table */}
      <Card>
        <CardHeader>
          <CardTitle>Active Projects</CardTitle>
          <CardDescription>
            Ongoing projects and their current status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SortableTable columns={projectColumns} data={projects} />
        </CardContent>
      </Card>
    </Container>
  )
}
