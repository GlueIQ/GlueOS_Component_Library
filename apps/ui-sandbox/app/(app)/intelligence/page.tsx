"use client"

import { BarChart3, TrendingUp, Target, DollarSign, Zap } from "lucide-react"

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
import { PageHeader } from "@repo/ui/patterns/navigation/page-header"
import { StatsGrid } from "@repo/ui/patterns/data-visualization/stats-grid"
import { ChartAreaInteractive } from "@repo/ui/patterns/data-visualization/chart-area-interactive"
import { SortableTable, type SortableColumn } from "@repo/ui/patterns/data-tables/sortable-table"

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

const pulse =
  "Blended ROAS climbed to 2.8x this period, up 8% from last month — driven by Paid Search efficiency gains and a strong Email nurture rebound. Paid Social continues to underperform target CPL benchmarks by 18%, with Display showing fatigue signals after 9 days of delivery. Southeast regional locations are seeing rising CPAs across programmatic — recommend pausing bottom ad sets and refreshing creative for Atlanta and Charlotte markets."

const stats = [
  {
    label: "Blended ROAS",
    value: "2.8x",
    icon: <TrendingUp className="size-4" />,
    trend: { value: 8, label: "vs prev month" },
  },
  {
    label: "Revenue Influenced",
    value: "$4.2M",
    icon: <DollarSign className="size-4" />,
    trend: { value: 22, label: "vs prev quarter" },
  },
  {
    label: "Total Spend",
    value: "$412K",
    icon: <BarChart3 className="size-4" />,
    description: "Across 6 channels",
  },
  {
    label: "Blended CPL",
    value: "$118",
    icon: <Target className="size-4" />,
    description: "↓14% vs prev month",
  },
]

interface ChannelCard {
  name: string
  colorVar: string
  spend: string
  roas: string
  cpl: string
  wow: string
  wowPositive: boolean
  insight: string
}

const channelCards: ChannelCard[] = [
  {
    name: "Paid Search",
    colorVar: "var(--chart-1)",
    spend: "$142K",
    roas: "3.4x",
    cpl: "$118",
    wow: "+8%",
    wowPositive: true,
    insight: "Brand search carrying load — test PMax expansion to non-brand terms this week.",
  },
  {
    name: "Paid Social",
    colorVar: "var(--chart-2)",
    spend: "$98K",
    roas: "2.1x",
    cpl: "$205",
    wow: "-3%",
    wowPositive: false,
    insight: "Creative fatigue detected — rotate top 3 ad sets. Prospecting underperforming target CPL by 18%.",
  },
  {
    name: "Organic & Email",
    colorVar: "var(--chart-3)",
    spend: "$46K",
    roas: "7.4x",
    cpl: "$53",
    wow: "+12%",
    wowPositive: true,
    insight: "Email nurture driving strong pipeline contribution. Scale send cadence from bi-weekly to weekly.",
  },
]

const spendData = [
  { week: "W1",  paid_search: 128, paid_social: 105, organic_email: 38 },
  { week: "W2",  paid_search: 131, paid_social: 102, organic_email: 40 },
  { week: "W3",  paid_search: 135, paid_social: 110, organic_email: 41 },
  { week: "W4",  paid_search: 129, paid_social: 108, organic_email: 43 },
  { week: "W5",  paid_search: 138, paid_social: 106, organic_email: 44 },
  { week: "W6",  paid_search: 140, paid_social: 103, organic_email: 43 },
  { week: "W7",  paid_search: 136, paid_social: 100, organic_email: 45 },
  { week: "W8",  paid_search: 142, paid_social:  99, organic_email: 44 },
  { week: "W9",  paid_search: 139, paid_social:  98, organic_email: 45 },
  { week: "W10", paid_search: 142, paid_social:  98, organic_email: 46 },
  { week: "W11", paid_search: 144, paid_social:  97, organic_email: 46 },
  { week: "W12", paid_search: 142, paid_social:  98, organic_email: 46 },
]

const spendSeries = [
  { dataKey: "paid_search",   label: "Paid Search",      color: "var(--chart-1)" },
  { dataKey: "paid_social",   label: "Paid Social",      color: "var(--chart-2)" },
  { dataKey: "organic_email", label: "Organic & Email",  color: "var(--chart-3)" },
]

const roiProof = [
  {
    label: "ROAS Improvement YoY",
    value: "+34%",
    description: "vs. same period last year",
  },
  {
    label: "Pipeline Generated",
    value: "$4.2M",
    description: "Marketing-influenced this period",
  },
  {
    label: "Recovered Wasted Spend",
    value: "$284K",
    description: "Via optimization recommendations",
  },
]

type AlertSeverity = "critical" | "caution" | "info"

interface LiveAlert {
  title: string
  detail: string
  severity: AlertSeverity
}

const alerts: LiveAlert[] = [
  {
    title: "Paid Social CPL Spike",
    detail: "CPL jumped 34% in Social Prospecting over last 7 days vs. 14-day avg.",
    severity: "critical",
  },
  {
    title: "Budget Pacing Alert",
    detail: "Display/Programmatic underspending by 22% against daily target.",
    severity: "caution",
  },
  {
    title: "Creative Fatigue Warning",
    detail: "Top 5 Paid Social ads showing declining CTR over 7 consecutive days.",
    severity: "caution",
  },
  {
    title: "Attribution Window Mismatch",
    detail: "Google 7-day click and Meta 1-day view showing 18% revenue overlap.",
    severity: "caution",
  },
  {
    title: "New Lookalike Audience Winning",
    detail: "LAL 2% seed from top purchasers outperforming by 41% — scale budget.",
    severity: "info",
  },
]

const alertDot: Record<AlertSeverity, string> = {
  critical: "bg-red-500",
  caution:  "bg-amber-500",
  info:     "bg-blue-500",
}

interface ChannelRow extends Record<string, unknown> {
  channel: string
  spend: string
  cpl: string
  roas: string
  cvr: string
  pipeline: string
  wow: string
}

const channels: ChannelRow[] = [
  { channel: "Paid Search",           spend: "$142K", cpl: "$118", roas: "3.4x", cvr: "4.2%",  pipeline: "$1.2M", wow: "+8%"  },
  { channel: "Paid Social",           spend: "$98K",  cpl: "$205", roas: "2.1x", cvr: "2.8%",  pipeline: "$680K", wow: "-3%"  },
  { channel: "Organic Search",        spend: "$28K",  cpl: "$62",  roas: "6.8x", cvr: "5.1%",  pipeline: "$920K", wow: "+12%" },
  { channel: "Email / Nurture",       spend: "$18K",  cpl: "$44",  roas: "9.2x", cvr: "7.4%",  pipeline: "$640K", wow: "+5%"  },
  { channel: "Display / Programmatic",spend: "$54K",  cpl: "$340", roas: "1.2x", cvr: "0.9%",  pipeline: "$380K", wow: "-7%"  },
  { channel: "Events & Webinars",     spend: "$72K",  cpl: "$280", roas: "2.8x", cvr: "11.2%", pipeline: "$420K", wow: "+22%" },
]

const channelColumns: SortableColumn<ChannelRow>[] = [
  {
    key: "channel",
    header: "Channel",
    sortable: true,
    render: (row) => <span className="font-medium">{row.channel as string}</span>,
  },
  { key: "spend",    header: "Spend",    sortable: true },
  { key: "cpl",      header: "CPL",      sortable: true },
  { key: "roas",     header: "ROAS",     sortable: true },
  { key: "cvr",      header: "CVR",      sortable: true },
  { key: "pipeline", header: "Pipeline", sortable: true },
  {
    key: "wow",
    header: "WoW",
    render: (row) => {
      const val = row.wow as string
      const pos = val.startsWith("+")
      return (
        <Badge
          variant="outline"
          className={
            pos
              ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800"
              : "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800"
          }
        >
          {val}
        </Badge>
      )
    },
  },
]

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function IntelligencePage() {
  return (
    <Container className="py-8 space-y-8">
      <PageHeader
        title="Performance Intelligence"
        description="Campaign analytics, ROI proof, and live anomaly detection."
        actions={<Button variant="outline">Export Report</Button>}
      />

      {/* AI Performance Pulse */}
      <div className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 dark:border-blue-800 dark:bg-blue-950/40">
        <div className="flex items-start gap-3">
          <Zap className="mt-0.5 size-4 shrink-0 text-blue-600 dark:text-blue-400" />
          <div>
            <span className="text-xs font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
              AI Performance Pulse
            </span>
            <p className="mt-0.5 text-sm leading-relaxed text-blue-900 dark:text-blue-200">
              {pulse}
            </p>
          </div>
        </div>
      </div>

      <StatsGrid stats={stats} columns={4} />

      {/* Channel Performance Cards */}
      <div className="grid gap-4 lg:grid-cols-3">
        {channelCards.map((ch) => (
          <Card key={ch.name}>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <span
                  className="size-2.5 rounded-full"
                  style={{ backgroundColor: ch.colorVar }}
                />
                <CardTitle className="text-sm font-semibold">{ch.name}</CardTitle>
                <Badge
                  variant="outline"
                  className={`ml-auto text-xs ${
                    ch.wowPositive
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800"
                      : "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800"
                  }`}
                >
                  {ch.wow} WoW
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-lg font-bold">{ch.spend}</div>
                  <div className="text-xs text-muted-foreground">Spend</div>
                </div>
                <div>
                  <div className="text-lg font-bold">{ch.roas}</div>
                  <div className="text-xs text-muted-foreground">ROAS</div>
                </div>
                <div>
                  <div className="text-lg font-bold">{ch.cpl}</div>
                  <div className="text-xs text-muted-foreground">CPL</div>
                </div>
              </div>
              <p className="border-t pt-2 text-xs leading-relaxed text-muted-foreground">
                {ch.insight}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Spend by Channel */}
      <ChartAreaInteractive
        title="Spend by Channel"
        description="Weekly spend across top channels — last 12 weeks ($K)"
        data={spendData}
        series={spendSeries}
        xAxisKey="week"
      />

      {/* ROI Proof + Live Alerts */}
      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>ROI Proof</CardTitle>
            <CardDescription>Value created beyond spend — current period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              {roiProof.map((item) => (
                <div key={item.label} className="rounded-lg bg-muted/50 p-4 text-center">
                  <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                    {item.value}
                  </div>
                  <div className="mt-1 text-sm font-medium">{item.label}</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">{item.description}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between gap-4">
              <div>
                <CardTitle>Live Alerts</CardTitle>
                <CardDescription>Active anomalies requiring attention</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="shrink-0">
                Review All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.map((alert, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <span
                    className={`mt-1.5 size-2 shrink-0 rounded-full ${alertDot[alert.severity]}`}
                  />
                  <div>
                    <p className="text-sm font-medium leading-snug">{alert.title}</p>
                    <p className="text-xs leading-snug text-muted-foreground">{alert.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Channel Scorecard */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <div>
              <CardTitle>Channel Scorecard</CardTitle>
              <CardDescription>
                Spend efficiency and pipeline contribution by channel — current period
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="shrink-0">
              Optimize Budget Mix
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <SortableTable columns={channelColumns} data={channels} />
        </CardContent>
      </Card>
    </Container>
  )
}
