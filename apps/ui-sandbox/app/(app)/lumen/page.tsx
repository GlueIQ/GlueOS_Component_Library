"use client"

import {
  BarChart2,
  BrainCircuit,
  Globe,
  Heart,
  TrendingUp,
  Users,
} from "lucide-react"

import { Container } from "@repo/ui/components/ui/container"
import { Button } from "@repo/ui/components/ui/button"
import { Badge } from "@repo/ui/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card"
import { Separator } from "@repo/ui/components/ui/separator"
import { PageHeader } from "@repo/ui/patterns/navigation/page-header"
import { StatsGrid } from "@repo/ui/patterns/data-visualization/stats-grid"
import { SortableTable, type SortableColumn } from "@repo/ui/patterns/data-tables/sortable-table"

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

const stats = [
  {
    label: "Marketing Pipeline",
    value: "$8.1M",
    icon: <TrendingUp className="size-4" />,
    trend: { value: 12, label: "vs last quarter" },
  },
  {
    label: "Brand Health Score",
    value: "74 / 100",
    icon: <Heart className="size-4" />,
    trend: { value: 6, label: "vs last audit" },
  },
  {
    label: "Blended Marketing ROI",
    value: "3.2x",
    icon: <BarChart2 className="size-4" />,
    description: "Marketing-attributed revenue",
  },
  {
    label: "Team Utilization",
    value: "87%",
    icon: <Users className="size-4" />,
    trend: { value: -3, label: "vs last month" },
  },
]

// ---------------------------------------------------------------------------
// Priority Actions — decisions requiring the CMO today
// ---------------------------------------------------------------------------

interface ActionItem {
  id: string
  module: string
  title: string
  context: string
  severity: "critical" | "caution"
  cta: string
}

const actionItems: ActionItem[] = [
  {
    id: "1",
    module: "Forge",
    title: "Product Apollo launch brief awaiting your approval",
    context: "Submitted by M. Torres · Due Jan 16",
    severity: "caution",
    cta: "Review Brief",
  },
  {
    id: "2",
    module: "Finance",
    title: "Q2 budget reallocation proposal requires sign-off",
    context: "Board review in 3 days · $340K shift from Events to Demand Gen",
    severity: "critical",
    cta: "Review Proposal",
  },
  {
    id: "3",
    module: "Horizon",
    title: "Events & Field initiative at risk — resource decision needed",
    context: "15% complete · May 31 deadline · Owner: S. Chen",
    severity: "critical",
    cta: "View Initiative",
  },
]

const severityStyles: Record<string, string> = {
  critical: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800",
  caution:  "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800",
}

const severityDot: Record<string, string> = {
  critical: "bg-red-500",
  caution:  "bg-amber-500",
}

// ---------------------------------------------------------------------------
// Strategic Portfolio — summarized from Horizon
// ---------------------------------------------------------------------------

interface PortfolioRow extends Record<string, unknown> {
  initiative: string
  owner: string
  status: string
  progress: string
  due: string
}

const portfolio: PortfolioRow[] = [
  { initiative: "Q1 Brand Refresh", owner: "S. Chen", status: "On Track", progress: "67%", due: "Mar 31" },
  { initiative: "Demand Gen Scale-Up", owner: "J. Whitfield", status: "On Track", progress: "45%", due: "Jun 30" },
  { initiative: "Product Launch — Apollo", owner: "M. Torres", status: "At Risk", progress: "28%", due: "Apr 15" },
  { initiative: "Partner Program Launch", owner: "D. Park", status: "On Track", progress: "72%", due: "Feb 28" },
  { initiative: "Events & Field Marketing", owner: "S. Chen", status: "At Risk", progress: "15%", due: "May 31" },
]

const portfolioStatusStyles: Record<string, string> = {
  "On Track": "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800",
  "At Risk":  "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800",
  "Behind":   "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800",
}

const portfolioColumns: SortableColumn<PortfolioRow>[] = [
  {
    key: "initiative",
    header: "Initiative",
    render: (row: PortfolioRow) => <span className="font-medium">{row.initiative as string}</span>,
  },
  { key: "owner", header: "Owner" },
  {
    key: "status",
    header: "Status",
    render: (row: PortfolioRow) => (
      <Badge variant="outline" className={portfolioStatusStyles[row.status as string] ?? ""}>
        {row.status as string}
      </Badge>
    ),
  },
  { key: "progress", header: "Progress" },
  { key: "due", header: "Due" },
]

// ---------------------------------------------------------------------------
// Market Intelligence — external signals from Immersion
// ---------------------------------------------------------------------------

interface MarketSignal {
  id: string
  headline: string
  source: string
  type: "info" | "caution"
}

const marketSignals: MarketSignal[] = [
  {
    id: "1",
    headline: "Competitor A launched AI content platform — potential positioning impact",
    source: "Immersion · Competitive Intel",
    type: "caution",
  },
  {
    id: "2",
    headline: "Industry event driving 40% spike in category search intent this week",
    source: "Immersion · Market Signals",
    type: "info",
  },
  {
    id: "3",
    headline: "Brand sentiment down 8pts in social — negative press cycle detected",
    source: "Immersion · Brand Monitor",
    type: "caution",
  },
  {
    id: "4",
    headline: "New GDPR guidance affects data collection across EU campaigns",
    source: "Immersion · Regulatory Watch",
    type: "caution",
  },
]

const signalDot: Record<string, string> = {
  caution: "bg-amber-500",
  info:    "bg-blue-500",
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function LumenPage() {
  return (
    <Container className="py-8 space-y-8">
      <PageHeader
        title="CMO Daily Brief"
        description="Your executive command center — decisions, business health, and market intelligence."
        actions={<Button>Generate Board Pack</Button>}
      />

      {/* Executive Signal */}
      <div className="rounded-lg border border-sky-200 bg-sky-50 px-4 py-3 dark:border-sky-800 dark:bg-sky-950/40">
        <div className="flex items-start gap-3">
          <BrainCircuit className="mt-0.5 size-4 shrink-0 text-sky-600 dark:text-sky-400" />
          <div>
            <span className="text-xs font-semibold uppercase tracking-wide text-sky-600 dark:text-sky-400">
              Executive Signal
            </span>
            <p className="mt-0.5 text-sm leading-relaxed text-sky-900 dark:text-sky-200">
              Pipeline is trending 12% above last quarter at $8.1M, with blended marketing ROI holding at 3.2x. Two strategic initiatives require your decision today — the Product Apollo launch brief and a Q2 budget reallocation proposal going to the board in 3 days. Brand sentiment declined 8 points following a negative press cycle; Immersion is monitoring closely.
            </p>
          </div>
        </div>
      </div>

      <StatsGrid stats={stats} columns={4} />

      {/* Priority Actions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <div>
              <CardTitle>Priority Actions</CardTitle>
              <CardDescription>Items requiring your decision today</CardDescription>
            </div>
            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800 shrink-0">
              3 pending
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            {actionItems.map((item, i) => (
              <div key={item.id}>
                <div className="flex items-center justify-between gap-4 py-3 px-2 -mx-2 rounded-md hover:bg-muted/50 transition-colors">
                  <div className="flex items-start gap-3 min-w-0">
                    <span className={`mt-1.5 size-2 rounded-full shrink-0 ${severityDot[item.severity]}`} />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-medium">{item.title}</p>
                        <Badge variant="outline" className={`text-[10px] shrink-0 ${severityStyles[item.severity]}`}>
                          {item.module}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.context}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="shrink-0">{item.cta}</Button>
                </div>
                {i < actionItems.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Strategic Portfolio + Market Intelligence */}
      <div className="grid gap-6 lg:grid-cols-5">

        <Card className="lg:col-span-3">
          <CardHeader>
            <div className="flex items-center justify-between gap-4">
              <div>
                <CardTitle>Strategic Portfolio</CardTitle>
                <CardDescription>Health of active strategic initiatives</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="shrink-0">Open Horizon</Button>
            </div>
          </CardHeader>
          <CardContent>
            <SortableTable columns={portfolioColumns} data={portfolio} />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between gap-4">
              <div>
                <CardTitle>Market Intelligence</CardTitle>
                <CardDescription>External signals from Immersion</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="shrink-0">
                <Globe className="size-3.5 mr-1" />
                Open Immersion
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {marketSignals.map((s, i) => (
                <div key={s.id}>
                  <div className="py-3 px-2 -mx-2 rounded-md hover:bg-muted/50 transition-colors">
                    <div className="flex items-start gap-2.5">
                      <span className={`mt-1.5 size-2 rounded-full shrink-0 ${signalDot[s.type]}`} />
                      <div className="min-w-0">
                        <p className="text-sm leading-snug">{s.headline}</p>
                        <p className="text-xs text-muted-foreground mt-1">{s.source}</p>
                      </div>
                    </div>
                  </div>
                  {i < marketSignals.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

      </div>
    </Container>
  )
}
