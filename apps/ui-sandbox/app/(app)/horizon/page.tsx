"use client"

import { AlertTriangle, Compass, DollarSign, TrendingUp } from "lucide-react"

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
import { ChartBarInteractive } from "@repo/ui/patterns/data-visualization/chart-bar-interactive"
import { SortableTable, type SortableColumn } from "@repo/ui/patterns/data-tables/sortable-table"

// ---------------------------------------------------------------------------
// Status style helpers — semantic palette ONLY
// ---------------------------------------------------------------------------

type InitiativeStatus = "On Track" | "At Risk" | "Blocked" | "Completed"

const statusBadge: Record<InitiativeStatus, string> = {
  "On Track":  "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800",
  "At Risk":   "bg-amber-50  text-amber-700  border-amber-200  dark:bg-amber-950  dark:text-amber-300  dark:border-amber-800",
  "Blocked":   "bg-red-50    text-red-700    border-red-200    dark:bg-red-950    dark:text-red-300    dark:border-red-800",
  "Completed": "bg-zinc-100  text-zinc-600   border-zinc-200   dark:bg-zinc-800   dark:text-zinc-400   dark:border-zinc-700",
}

const statusDot: Record<InitiativeStatus, string> = {
  "On Track":  "bg-emerald-500",
  "At Risk":   "bg-amber-500",
  "Blocked":   "bg-red-500",
  "Completed": "bg-zinc-400",
}

// ---------------------------------------------------------------------------
// Chart palette helpers — workstream identity ONLY (not status)
// ---------------------------------------------------------------------------

const workstreamColors = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
  "var(--chart-1)",
]

const workstreamBorderColors = [
  "border-l-[var(--chart-1)]",
  "border-l-[var(--chart-2)]",
  "border-l-[var(--chart-3)]",
  "border-l-[var(--chart-4)]",
  "border-l-[var(--chart-5)]",
  "border-l-[var(--chart-1)]",
]

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

const program = {
  name: "GlueOS Platform Transformation",
  subtitle: "20-month transformation program · Jan 2026 – Aug 2027",
  health: "At Risk" as InitiativeStatus,
  totalInitiatives: 15,
  completedInitiatives: 3,
  avgProgress: 40,
  budgetSpent: 1.4,
  budgetTotal: 4.8,
  monthsElapsed: 2,
  monthsTotal: 20,
  roiActual: 3.2,
  roiGoal: 5.0,
}

const initiativeStatus = [
  { label: "On Track",  count: 10, status: "On Track"  as InitiativeStatus },
  { label: "At Risk",   count: 2,  status: "At Risk"   as InitiativeStatus },
  { label: "Blocked",   count: 0,  status: "Blocked"   as InitiativeStatus },
  { label: "Completed", count: 3,  status: "Completed" as InitiativeStatus },
]

const phases = [
  { label: "Assess",     count: 3,  colorIdx: 0 },
  { label: "Plan",       count: 4,  colorIdx: 1 },
  { label: "Implement",  count: 5,  colorIdx: 2 },
  { label: "Optimize",   count: 3,  colorIdx: 3 },
]

interface Workstream {
  name: string
  initiatives: number
  onTrack: number
  avgProgress: number
  budgetUsed: number
  valueCreated: string
  status: InitiativeStatus
  colorIdx: number
}

const workstreams: Workstream[] = [
  { name: "GlueOS & Data Foundations",        initiatives: 2, onTrack: 100, avgProgress: 84, budgetUsed: 75, valueCreated: "$620K",  status: "On Track", colorIdx: 0 },
  { name: "Marketing Intelligence",           initiatives: 3, onTrack: 100, avgProgress: 57, budgetUsed: 45, valueCreated: "$1.1M",  status: "On Track", colorIdx: 1 },
  { name: "Creative & Content Supply Chain",  initiatives: 3, onTrack: 100, avgProgress: 17, budgetUsed: 18, valueCreated: "$180K",  status: "On Track", colorIdx: 2 },
  { name: "Campaign Operations",              initiatives: 2, onTrack: 100, avgProgress:  8, budgetUsed:  4, valueCreated: "$95K",   status: "On Track", colorIdx: 3 },
  { name: "Performance & Optimization",       initiatives: 2, onTrack: 100, avgProgress: 54, budgetUsed: 32, valueCreated: "$840K",  status: "On Track", colorIdx: 4 },
  { name: "Governance & Change Mgmt",         initiatives: 3, onTrack:  33, avgProgress: 30, budgetUsed: 31, valueCreated: "$210K",  status: "At Risk",  colorIdx: 5 },
]

const budgetData = [
  { initiative: "Brand Refresh",   allocated: 480, spent: 320, value_created: 610 },
  { initiative: "Demand Gen",      allocated: 350, spent: 290, value_created: 520 },
  { initiative: "Product Launch",  allocated: 520, spent: 180, value_created: 290 },
  { initiative: "Partner Prog.",   allocated: 220, spent: 195, value_created: 380 },
  { initiative: "SEO Expansion",   allocated: 180, spent: 142, value_created: 440 },
  { initiative: "Field Events",    allocated: 280, spent: 220, value_created: 310 },
]

const budgetSeries = [
  { dataKey: "allocated",     label: "Budget Allocated", color: "var(--chart-1)" },
  { dataKey: "spent",         label: "Spent to Date",    color: "var(--chart-2)" },
  { dataKey: "value_created", label: "Value Created",    color: "var(--chart-3)" },
]

interface Milestone {
  label: string
  workstream: string
  date: string
  status: "Done" | "Upcoming" | "At Risk"
}

const milestones: Milestone[] = [
  { label: "Production environment deployed",           workstream: "GlueOS Platform Deployment",          date: "Mar 14", status: "Done"     },
  { label: "Signal sources configured",                 workstream: "Glue Immersion Deployment",           date: "Mar 14", status: "Done"     },
  { label: "AI bidding agent deployed to pilot",        workstream: "Campaign Optimization & AI Bidding",  date: "Mar 14", status: "Done"     },
  { label: "Core data pipelines operational",           workstream: "Data Foundations & Marketing Data",   date: "Apr 14", status: "Upcoming" },
  { label: "Daily briefing workflow active",            workstream: "Glue Immersion Deployment",           date: "Apr 14", status: "Upcoming" },
  { label: "Channel data connectors live",              workstream: "Glue42 Marketing Performance",        date: "Apr 14", status: "Upcoming" },
  { label: "Brand guidelines digitized",                workstream: "Brand & IP Governance Framework",     date: "Apr 29", status: "At Risk"  },
  { label: "Leadership team fully onboarded",           workstream: "Glue Immersion Deployment",           date: "May 14", status: "Upcoming" },
]

const milestoneStatusStyle: Record<Milestone["status"], string> = {
  Done:     "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800",
  Upcoming: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800",
  "At Risk":"bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800",
}

const milestoneDot: Record<Milestone["status"], string> = {
  Done:     "bg-emerald-500",
  Upcoming: "bg-blue-500",
  "At Risk":"bg-amber-500",
}

interface AtRiskItem {
  title: string
  owner: string
  workstream: string
  workstreamColorIdx: number
  description: string
}

const atRiskItems: AtRiskItem[] = [
  {
    title: "Brand & IP Governance Framework",
    owner: "Josh Stern",
    workstream: "Governance & Change Mgmt",
    workstreamColorIdx: 5,
    description: "AT RISK: Partner IP protection framework negotiations taking longer than expected. Josh Stern is working through legal and partner alignment — milestone at risk of missing Apr 29 deadline.",
  },
  {
    title: "Accelerator-to-Core Convergence Program",
    owner: "Kelly Jo Sands",
    workstream: "Governance & Change Mgmt",
    workstreamColorIdx: 5,
    description: "AT RISK: This is the most complex initiative — merging two operating models while maintaining campaign continuity. Early planning underway but scope finalization delayed.",
  },
]

interface InitiativeRow extends Record<string, unknown> {
  initiative: string
  owner: string
  status: InitiativeStatus
  budget: string
  spent: string
  valueCreated: string
  roi: string
  due: string
}

const initiativeRows: InitiativeRow[] = [
  { initiative: "Q1 Brand Refresh",          owner: "Sarah Chen",     status: "On Track",  budget: "$480K", spent: "$320K", valueCreated: "$610K", roi: "91%",  due: "Mar 31, 2026" },
  { initiative: "Demand Gen Scale-Up",        owner: "James Whitfield",status: "On Track",  budget: "$350K", spent: "$290K", valueCreated: "$520K", roi: "79%",  due: "Jun 30, 2026" },
  { initiative: "Product Launch — Apollo",    owner: "Mia Torres",     status: "At Risk",   budget: "$520K", spent: "$180K", valueCreated: "$290K", roi: "61%",  due: "Apr 15, 2026" },
  { initiative: "Partner Program Launch",     owner: "David Park",     status: "On Track",  budget: "$220K", spent: "$195K", valueCreated: "$380K", roi: "95%",  due: "Feb 28, 2026" },
  { initiative: "SEO & Content Expansion",    owner: "Lisa Rodriguez", status: "On Track",  budget: "$180K", spent: "$142K", valueCreated: "$440K", roi: "210%", due: "Dec 31, 2026" },
  { initiative: "Events & Field Marketing",   owner: "Sarah Chen",     status: "At Risk",   budget: "$280K", spent: "$220K", valueCreated: "$310K", roi: "41%",  due: "May 31, 2026" },
]

const initiativeColumns: SortableColumn<InitiativeRow>[] = [
  {
    key: "initiative",
    header: "Initiative",
    sortable: true,
    render: (row) => <span className="font-medium">{row.initiative as string}</span>,
  },
  { key: "owner", header: "Owner", sortable: true },
  {
    key: "status",
    header: "Status",
    render: (row) => (
      <Badge variant="outline" className={statusBadge[row.status as InitiativeStatus] ?? ""}>
        {row.status as string}
      </Badge>
    ),
  },
  { key: "budget",       header: "Budget",        sortable: true },
  { key: "spent",        header: "Spent",         sortable: true },
  { key: "valueCreated", header: "Value Created", sortable: true },
  {
    key: "roi",
    header: "ROI",
    sortable: true,
    render: (row) => (
      <span className="font-semibold text-emerald-600 dark:text-emerald-400">
        {row.roi as string}
      </span>
    ),
  },
  { key: "due", header: "Due Date" },
]

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function HorizonPage() {
  const budgetPct = Math.round((program.budgetSpent / program.budgetTotal) * 100)
  const timelinePct = Math.round((program.monthsElapsed / program.monthsTotal) * 100)

  return (
    <Container className="py-8 space-y-8">
      <PageHeader
        title="Horizon"
        description="Strategic initiative portfolio — planning, budget, and value creation."
        actions={<Button>New Initiative</Button>}
      />

      {/* Strategic Pulse */}
      <div className="rounded-lg border border-teal-200 bg-teal-50 px-4 py-3 dark:border-teal-800 dark:bg-teal-950/40">
        <div className="flex items-start gap-3">
          <Compass className="mt-0.5 size-4 shrink-0 text-teal-600 dark:text-teal-400" />
          <div>
            <span className="text-xs font-semibold uppercase tracking-wide text-teal-600 dark:text-teal-400">
              Strategic Pulse
            </span>
            <p className="mt-0.5 text-sm leading-relaxed text-teal-900 dark:text-teal-200">
              The GlueOS Platform Transformation program is 10 months in with 40% average progress across 15 initiatives. Two initiatives in the Governance workstream are currently at risk — Brand & IP Governance Framework (Apr 29 deadline) and the Accelerator-to-Core Convergence Program. Budget is tracking at $1.4M of $4.8M total, with program ROI already at 3.2x against a 5.0x goal.
            </p>
          </div>
        </div>
      </div>

      {/* Program Header Card */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold">{program.name}</h2>
              <p className="mt-0.5 text-sm text-muted-foreground">{program.subtitle}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-sm text-muted-foreground">Program Health:</span>
              <Badge variant="outline" className={statusBadge[program.health]}>
                {program.health}
              </Badge>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {/* Initiatives */}
            <div className="space-y-1 rounded-lg border p-3">
              <div className="flex items-center gap-1.5">
                <Compass className="size-3.5 text-muted-foreground" />
                <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Initiatives</span>
              </div>
              <div className="text-3xl font-bold">{program.totalInitiatives}</div>
              <p className="text-xs text-muted-foreground">{program.completedInitiatives} completed</p>
            </div>

            {/* Avg Progress */}
            <div className="space-y-1 rounded-lg border p-3">
              <div className="flex items-center gap-1.5">
                <TrendingUp className="size-3.5 text-muted-foreground" />
                <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Avg. Progress</span>
              </div>
              <div className="text-3xl font-bold">{program.avgProgress}%</div>
              <div className="h-1.5 w-full rounded-full bg-muted">
                <div
                  className="h-1.5 rounded-full"
                  style={{ width: `${program.avgProgress}%`, backgroundColor: "var(--chart-1)" }}
                />
              </div>
            </div>

            {/* Budget */}
            <div className="space-y-1 rounded-lg border p-3">
              <div className="flex items-center gap-1.5">
                <DollarSign className="size-3.5 text-muted-foreground" />
                <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Budget</span>
              </div>
              <div className="text-3xl font-bold">
                ${program.budgetSpent}M
                <span className="ml-1 text-base font-normal text-muted-foreground">/ ${program.budgetTotal}M</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-muted">
                <div
                  className="h-1.5 rounded-full"
                  style={{ width: `${budgetPct}%`, backgroundColor: "var(--chart-2)" }}
                />
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-1 rounded-lg border p-3">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Timeline</span>
              </div>
              <div className="text-3xl font-bold">
                {program.monthsElapsed}
                <span className="ml-1 text-base font-normal text-muted-foreground">/ {program.monthsTotal} mo</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-muted">
                <div
                  className="h-1.5 rounded-full"
                  style={{ width: `${timelinePct}%`, backgroundColor: "var(--chart-3)" }}
                />
              </div>
            </div>

            {/* ROI vs Goal — key differentiator */}
            <div className="space-y-1 rounded-lg border border-emerald-200 bg-emerald-50 p-3 dark:border-emerald-800 dark:bg-emerald-950/40">
              <div className="flex items-center gap-1.5">
                <TrendingUp className="size-3.5 text-emerald-600 dark:text-emerald-400" />
                <span className="text-xs font-medium uppercase tracking-wide text-emerald-700 dark:text-emerald-400">ROI vs Goal</span>
              </div>
              <div className="text-3xl font-bold text-emerald-700 dark:text-emerald-300">
                {program.roiActual}x
                <span className="ml-1 text-base font-normal text-emerald-600/70 dark:text-emerald-500">/ {program.roiGoal}x goal</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-emerald-200 dark:bg-emerald-800">
                <div
                  className="h-1.5 rounded-full bg-emerald-500"
                  style={{ width: `${Math.round((program.roiActual / program.roiGoal) * 100)}%` }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Initiative Status + Phase Distribution */}
      <div className="grid gap-6 lg:grid-cols-2">

        {/* Initiative Status */}
        <Card>
          <CardHeader>
            <CardTitle>Initiative Status</CardTitle>
            <CardDescription>Health breakdown across all 15 initiatives</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {initiativeStatus.map((s) => (
                <div
                  key={s.label}
                  className="flex items-center gap-3 rounded-lg border p-4"
                >
                  <span className={`size-3 shrink-0 rounded-full ${statusDot[s.status]}`} />
                  <div>
                    <div className="text-2xl font-bold">{s.count}</div>
                    <div className="text-sm text-muted-foreground">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Phase Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Phase Distribution</CardTitle>
            <CardDescription>Initiatives by current phase of execution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {phases.map((phase) => (
                <div key={phase.label} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span
                        className="size-2 rounded-full"
                        style={{ backgroundColor: workstreamColors[phase.colorIdx] }}
                      />
                      <span className="font-medium">{phase.label}</span>
                    </div>
                    <span className="text-muted-foreground">{phase.count} initiatives</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: `${(phase.count / program.totalInitiatives) * 100}%`,
                        backgroundColor: workstreamColors[phase.colorIdx],
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Workstream Health */}
      <div>
        <h2 className="mb-4 text-lg font-semibold">Workstream Health</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {workstreams.map((ws, i) => (
            <Card key={ws.name} className={`border-l-4 ${workstreamBorderColors[i]}`}>
              <CardContent className="pt-4 pb-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="mt-0.5 size-2 shrink-0 rounded-full"
                      style={{ backgroundColor: workstreamColors[ws.colorIdx] }}
                    />
                    <span className="text-sm font-semibold leading-tight">{ws.name}</span>
                  </div>
                  <Badge variant="outline" className={`shrink-0 text-xs ${statusBadge[ws.status]}`}>
                    {ws.status}
                  </Badge>
                </div>
                <p className="mt-1 ml-4 text-xs text-muted-foreground">{ws.initiatives} initiatives</p>

                <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                  <div>
                    <div className="font-semibold text-sm">{ws.onTrack}%</div>
                    <div className="text-muted-foreground">On Track</div>
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{ws.avgProgress}%</div>
                    <div className="text-muted-foreground">Avg Progress</div>
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{ws.budgetUsed}%</div>
                    <div className="text-muted-foreground">Budget Used</div>
                  </div>
                </div>

                <div className="mt-3 h-1.5 w-full rounded-full bg-muted">
                  <div
                    className="h-1.5 rounded-full transition-all"
                    style={{
                      width: `${ws.avgProgress}%`,
                      backgroundColor: workstreamColors[ws.colorIdx],
                    }}
                  />
                </div>

                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Value Created</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">{ws.valueCreated}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Budget vs Spend vs Value Created */}
      <ChartBarInteractive
        title="Budget, Spend & Value Created"
        description="Budget allocated vs. spend-to-date vs. value created by initiative ($K) — Jan–Mar 2026"
        data={budgetData}
        series={budgetSeries}
        xAxisKey="initiative"
        xAxisFormatter={(v) => v}
        formatTotal={(v) => `$${v}K`}
      />

      {/* Milestones + Attention Required */}
      <div className="grid gap-6 lg:grid-cols-5">

        {/* Upcoming Milestones */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Upcoming Milestones</CardTitle>
            <CardDescription>Next 90 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {milestones.map((m, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className={`mt-1.5 size-2 shrink-0 rounded-full ${milestoneDot[m.status]}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium leading-snug">{m.label}</p>
                    <p className="text-xs text-muted-foreground truncate">{m.workstream}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-xs text-muted-foreground">{m.date}</p>
                    <Badge variant="outline" className={`mt-0.5 text-xs ${milestoneStatusStyle[m.status]}`}>
                      {m.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Attention Required */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between gap-4">
              <div>
                <CardTitle>Attention Required</CardTitle>
                <CardDescription>Initiatives needing immediate action</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="shrink-0">Schedule Reviews</Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {atRiskItems.map((item, i) => (
              <div key={i} className="rounded-lg border p-3 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold leading-snug">{item.title}</p>
                  <Badge variant="outline" className={`shrink-0 text-xs ${statusBadge["At Risk"]}`}>
                    At Risk
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{item.owner}</span>
                  <span>·</span>
                  <span
                    className="font-medium"
                    style={{ color: workstreamColors[item.workstreamColorIdx] }}
                  >
                    {item.workstream}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Initiative Portfolio Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <div>
              <CardTitle>Initiative Portfolio</CardTitle>
              <CardDescription>Full view: budget, spend, value created, and ROI per initiative</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="shrink-0">Export Portfolio</Button>
          </div>
        </CardHeader>
        <CardContent>
          <SortableTable columns={initiativeColumns} data={initiativeRows} />
        </CardContent>
      </Card>
    </Container>
  )
}
