"use client"

import { AlertTriangle, BrainCircuit, CheckCircle2, ShieldCheck } from "lucide-react"

import { Container } from "@__SCOPE__/ui/components/ui/container"
import { Button } from "@__SCOPE__/ui/components/ui/button"
import { Badge } from "@__SCOPE__/ui/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@__SCOPE__/ui/components/ui/card"
import { Separator } from "@__SCOPE__/ui/components/ui/separator"
import { PageHeader } from "@__SCOPE__/ui/patterns/navigation/page-header"
import { StatsGrid } from "@__SCOPE__/ui/patterns/data-visualization/stats-grid"
import { ChartLineInteractive } from "@__SCOPE__/ui/patterns/data-visualization/chart-line-interactive"
import { SortableTable, type SortableColumn } from "@__SCOPE__/ui/patterns/data-tables/sortable-table"

// ---------------------------------------------------------------------------
// LLM Gateway Monitor data
// ---------------------------------------------------------------------------

const routingRules = [
  { task: "Text Generation",     model: "GPT-4 Turbo",      color: "#3b82f6" },
  { task: "Code Completion",     model: "Claude 3.5 Sonnet", color: "#8b5cf6" },
  { task: "Summarization",       model: "Gemini 1.5 Pro",   color: "#f97316" },
  { task: "Sentiment Analysis",  model: "Claude 3 Haiku",   color: "#8b5cf6" },
  { task: "Content Moderation",  model: "GPT-4o Mini",      color: "#3b82f6" },
]

const modelDistribution = [
  { model: "GPT-4 Turbo",      pct: 40, color: "#3b82f6" },
  { model: "Claude 3.5",       pct: 35, color: "#8b5cf6" },
  { model: "Gemini 1.5 Pro",   pct: 25, color: "#f97316" },
]

// SVG donut chart — pure SVG, no library
function DonutChart() {
  const r = 44, cx = 60, cy = 60
  const C = 2 * Math.PI * r // ≈ 276.46
  const GAP = 2.5            // px gap between segments
  let cumPct = 0

  return (
    <svg viewBox="0 0 120 120" className="size-[120px] shrink-0" aria-hidden="true">
      {modelDistribution.map((seg, i) => {
        const startAngle = -90 + cumPct * 3.6
        const arcLen     = Math.max(0, C * (seg.pct / 100) - GAP)
        cumPct += seg.pct
        return (
          <circle
            key={i}
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke={seg.color}
            strokeWidth={18}
            strokeDasharray={`${arcLen} ${C}`}
            transform={`rotate(${startAngle} ${cx} ${cy})`}
          />
        )
      })}
      {/* Center label */}
      <text x={cx} y={cy - 6} textAnchor="middle" dominantBaseline="middle" fontSize={10} fill="currentColor" opacity={0.45} style={{ userSelect: "none" }}>Model</text>
      <text x={cx} y={cy + 7} textAnchor="middle" dominantBaseline="middle" fontSize={10} fill="currentColor" opacity={0.45} style={{ userSelect: "none" }}>Mix</text>
    </svg>
  )
}

// ---------------------------------------------------------------------------
// AI governance data
// ---------------------------------------------------------------------------

const stats = [
  { label: "AI Outputs Reviewed", value: "1,847", icon: <BrainCircuit className="size-4" />, trend: { value: 8, label: "vs last week" } },
  { label: "Compliance Rate",      value: "98.4%", icon: <ShieldCheck  className="size-4" />, trend: { value: 1, label: "vs last month" } },
  { label: "Violations (7d)",      value: "11",    icon: <AlertTriangle className="size-4" />, description: "3 high-severity" },
  { label: "Active Guardrails",    value: "23",    icon: <CheckCircle2  className="size-4" />, description: "Across 6 modules" },
]

const complianceData = [
  { week: "Oct W1", compliance: 96.1, target: 95 },
  { week: "Oct W2", compliance: 97.2, target: 95 },
  { week: "Oct W3", compliance: 96.8, target: 95 },
  { week: "Oct W4", compliance: 97.5, target: 95 },
  { week: "Nov W1", compliance: 97.1, target: 95 },
  { week: "Nov W2", compliance: 98.0, target: 95 },
  { week: "Nov W3", compliance: 97.8, target: 95 },
  { week: "Nov W4", compliance: 98.3, target: 95 },
  { week: "Dec W1", compliance: 97.9, target: 95 },
  { week: "Dec W2", compliance: 98.4, target: 95 },
  { week: "Dec W3", compliance: 98.6, target: 95 },
  { week: "Dec W4", compliance: 98.4, target: 95 },
]

const complianceSeries = [
  { dataKey: "compliance", label: "Compliance Rate (%)", color: "var(--chart-1)" },
  { dataKey: "target",     label: "Target (95%)",        color: "var(--chart-2)" },
]

interface AuditRow extends Record<string, unknown> {
  timestamp: string; module: string; action: string; status: string; reviewer: string
}

const auditLog: AuditRow[] = [
  { timestamp: "Mar 5, 9:41am",  module: "Forge",        action: "Campaign brief generated",      status: "Approved", reviewer: "S. Chen"      },
  { timestamp: "Mar 5, 9:12am",  module: "Studio",       action: "Ad copy variant — Meta",         status: "Flagged",  reviewer: "Auto"         },
  { timestamp: "Mar 5, 8:55am",  module: "Lumen",        action: "Board pack summary drafted",     status: "Approved", reviewer: "M. Torres"    },
  { timestamp: "Mar 5, 8:30am",  module: "Forge",        action: "Email sequence generated",       status: "Approved", reviewer: "D. Park"      },
  { timestamp: "Mar 4, 5:02pm",  module: "Optimize",     action: "Recommendation surfaced",        status: "Flagged",  reviewer: "Auto"         },
  { timestamp: "Mar 4, 4:18pm",  module: "Intelligence", action: "Anomaly narrative written",      status: "Approved", reviewer: "J. Whitfield" },
  { timestamp: "Mar 4, 3:44pm",  module: "Forge",        action: "Landing page copy variant",      status: "Rejected", reviewer: "L. Rodriguez" },
]

const auditStatusStyles: Record<string, string> = {
  Approved: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800",
  Flagged:  "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800",
  Rejected: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800",
}

const auditColumns: SortableColumn<AuditRow>[] = [
  { key: "timestamp", header: "Timestamp", sortable: true },
  { key: "module",    header: "Module" },
  { key: "action",    header: "AI Action",  render: (row) => <span className="font-medium">{row.action as string}</span> },
  {
    key: "status", header: "Status",
    render: (row) => (
      <Badge variant="outline" className={auditStatusStyles[row.status as string] ?? ""}>{row.status as string}</Badge>
    ),
  },
  { key: "reviewer", header: "Reviewer" },
]

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function ShieldPage() {
  return (
    <Container className="py-8 space-y-8">
      <PageHeader
        title="Shield"
        description="AI governance, LLM gateway monitoring, compliance tracking, and brand safety guardrails."
        actions={
          <Button>
            Review Queue
            <Badge variant="secondary" className="ml-1.5 text-xs">11</Badge>
          </Button>
        }
      />

      {/* Governance Alert */}
      <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 dark:border-red-800 dark:bg-red-950/40">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 size-4 shrink-0 text-red-600 dark:text-red-400" />
          <div>
            <span className="text-xs font-semibold uppercase tracking-wide text-red-600 dark:text-red-400">
              Governance Alert
            </span>
            <p className="mt-0.5 text-sm leading-relaxed text-red-900 dark:text-red-200">
              11 AI outputs were flagged for review this week — 3 high-severity violations requiring immediate attention. Overall compliance rate is holding at 98.4% against the 95% policy target. The LLM gateway processed 8,920 requests today across OpenAI, Anthropic, and Google AI, with average response time down 12%. Review the queue to clear pending items before the weekly governance report.
            </p>
          </div>
        </div>
      </div>

      {/* LLM Gateway Monitor */}
      <div className="grid gap-6 lg:grid-cols-2">

        {/* Model Routing */}
        <Card>
          <CardHeader>
            <CardTitle>Model Routing</CardTitle>
            <CardDescription>Dynamic model selection across active task types</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {routingRules.map((rule, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg border bg-muted/30 px-3 py-2 text-sm"
              >
                <span className="text-muted-foreground">
                  Task: <span className="font-medium text-foreground">{rule.task}</span>
                </span>
                <span className="font-semibold" style={{ color: rule.color }}>
                  {rule.model}
                </span>
              </div>
            ))}

            <Separator className="my-3" />

            {/* APIs in use */}
            <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm px-1">
              <span className="text-muted-foreground">APIs in use:</span>
              <span className="font-semibold text-blue-600 dark:text-blue-400">OpenAI</span>
              <span className="text-muted-foreground">·</span>
              <span className="font-semibold text-purple-600 dark:text-purple-400">Anthropic</span>
              <span className="text-muted-foreground">·</span>
              <span className="font-semibold text-orange-500 dark:text-orange-400">Google AI</span>
            </div>

            {/* Status */}
            <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2.5 dark:bg-emerald-950/40">
              <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
              <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                Current Status: Running Optimally
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Usage Overview */}
        <Card>
          <CardHeader>
            <CardTitle>LLM Usage Overview</CardTitle>
            <CardDescription>Gateway activity and model distribution — last 24 hours</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Mini stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-lg border bg-muted/30 p-3">
                <p className="text-xs text-muted-foreground">Requests Today</p>
                <p className="mt-1 text-xl font-bold tabular-nums">8,920</p>
              </div>
              <div className="rounded-lg border bg-muted/30 p-3">
                <p className="text-xs text-muted-foreground">Tokens Used</p>
                <p className="mt-1 text-xl font-bold tabular-nums">2.3M</p>
              </div>
              <div className="rounded-lg border bg-muted/30 p-3">
                <p className="text-xs text-muted-foreground">Avg Response</p>
                <div className="mt-1 flex items-baseline gap-1.5">
                  <p className="text-xl font-bold tabular-nums">1.4s</p>
                  <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">↓ 12%</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Model distribution */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-4">
                Model Distribution
              </p>
              <div className="flex items-center gap-6">
                <DonutChart />
                <div className="flex-1 space-y-2.5">
                  {modelDistribution.map((m) => (
                    <div key={m.model} className="flex items-center gap-2.5">
                      <span className="size-2.5 rounded-full shrink-0" style={{ backgroundColor: m.color }} />
                      <span className="text-sm flex-1 leading-none">{m.model}</span>
                      <span className="text-sm font-bold tabular-nums">{m.pct}%</span>
                    </div>
                  ))}
                  <div className="pt-1 border-t text-xs text-muted-foreground">
                    8,920 total requests · $152.40 today
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <StatsGrid stats={stats} columns={4} />

      <ChartLineInteractive
        title="Compliance Rate vs. Target"
        description="Weekly AI output compliance rate — 12-week trend vs. 95% policy target"
        data={complianceData}
        series={complianceSeries}
        xAxisKey="week"
      />

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <div>
              <CardTitle>Recent AI Output Log</CardTitle>
              <CardDescription>All AI-generated content reviewed in the last 48 hours</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="shrink-0">Export Audit Log</Button>
          </div>
        </CardHeader>
        <CardContent>
          <SortableTable columns={auditColumns} data={auditLog} />
        </CardContent>
      </Card>
    </Container>
  )
}
