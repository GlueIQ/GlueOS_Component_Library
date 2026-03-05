"use client"

import { Megaphone, Calendar, CheckCircle, GitBranch, Zap } from "lucide-react"

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
import { ChartBarInteractive } from "@repo/ui/patterns/data-visualization/chart-bar-interactive"
import { SortableTable, type SortableColumn } from "@repo/ui/patterns/data-tables/sortable-table"

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

const stats = [
  {
    label: "Active Campaigns",
    value: "31",
    icon: <Megaphone className="size-4" />,
    description: "Across 8 channels",
  },
  {
    label: "Active Journeys",
    value: "8",
    icon: <GitBranch className="size-4" />,
    trend: { value: 3, label: "vs last month" },
  },
  {
    label: "Launching This Week",
    value: "7",
    icon: <Calendar className="size-4" />,
    description: "3 require review",
  },
  {
    label: "Launch Readiness",
    value: "78%",
    icon: <CheckCircle className="size-4" />,
    trend: { value: 5, label: "vs last week" },
  },
]

// ---------------------------------------------------------------------------
// Active journeys
// ---------------------------------------------------------------------------

type JourneyStatus = "active" | "paused" | "draft"

interface Journey {
  id: string
  name: string
  status: JourneyStatus
  channels: string[]
  stages: number
  contacts: number
  convRate: string
  description: string
}

const journeys: Journey[] = [
  {
    id: "1",
    name: "New Subscriber Welcome Series",
    status: "active",
    channels: ["Email", "Push", "In-App"],
    stages: 5,
    contacts: 2847,
    convRate: "34%",
    description: "Onboards new subscribers across three touchpoints to drive first package selection.",
  },
  {
    id: "2",
    name: "Channel Bundle Upsell",
    status: "active",
    channels: ["Email", "Paid Social", "Direct Mail"],
    stages: 4,
    contacts: 4302,
    convRate: "8%",
    description: "Targets base subscribers with personalized bundle offers based on viewing behavior.",
  },
  {
    id: "3",
    name: "Sports Package Reengagement",
    status: "paused",
    channels: ["Push", "Email"],
    stages: 3,
    contacts: 1204,
    convRate: "11%",
    description: "Reactivates lapsed sports add-on subscribers ahead of NFL season kickoff.",
  },
  {
    id: "4",
    name: "Churn Risk Intervention",
    status: "active",
    channels: ["Email", "SMS", "Call Center"],
    stages: 6,
    contacts: 567,
    convRate: "22%",
    description: "High-touch cross-channel flow for subscribers with 60+ day disengagement signals.",
  },
  {
    id: "5",
    name: "4K Upgrade Nurture",
    status: "active",
    channels: ["Email", "In-App", "Paid Search"],
    stages: 3,
    contacts: 3891,
    convRate: "6%",
    description: "Educates eligible subscribers on 4K equipment upgrades with personalized timing.",
  },
  {
    id: "6",
    name: "Premium Tier Conversion",
    status: "draft",
    channels: ["Email", "In-App", "Paid Social"],
    stages: 4,
    contacts: 0,
    convRate: "—",
    description: "Planned journey targeting mid-tier subscribers for premium package conversion.",
  },
]

const journeyStatusStyles: Record<JourneyStatus, string> = {
  active: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800",
  paused: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800",
  draft:  "bg-zinc-100 text-zinc-600 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700",
}

const journeyStatusLabel: Record<JourneyStatus, string> = {
  active: "Active",
  paused: "Paused",
  draft:  "Draft",
}

// ---------------------------------------------------------------------------
// Launch chart
// ---------------------------------------------------------------------------

const launchData = [
  { week: "Mar 3",  launches: 4 },
  { week: "Mar 10", launches: 7 },
  { week: "Mar 17", launches: 5 },
  { week: "Mar 24", launches: 9 },
  { week: "Mar 31", launches: 6 },
  { week: "Apr 7",  launches: 11 },
  { week: "Apr 14", launches: 8 },
  { week: "Apr 21", launches: 5 },
]

const launchSeries = [
  { dataKey: "launches", label: "Planned Launches", color: "var(--chart-1)" },
]

// ---------------------------------------------------------------------------
// Upcoming launches table
// ---------------------------------------------------------------------------

interface LaunchRow extends Record<string, unknown> {
  campaign: string
  type: string
  channel: string
  launchDate: string
  readiness: string
  owner: string
}

const launches: LaunchRow[] = [
  { campaign: "Q1 Brand Awareness Push",   type: "Brand",       channel: "Paid Social",  launchDate: "Mar 10", readiness: "Ready",        owner: "M. Torres"    },
  { campaign: "Product Apollo — Search",   type: "Demand Gen",  channel: "Paid Search",  launchDate: "Mar 12", readiness: "Ready",        owner: "J. Whitfield" },
  { campaign: "Enterprise ABM Wave 3",     type: "ABM",         channel: "LinkedIn",     launchDate: "Mar 17", readiness: "Needs Review", owner: "S. Chen"      },
  { campaign: "Partner Co-Marketing Kit", type: "Partner",     channel: "Email",        launchDate: "Mar 24", readiness: "Ready",        owner: "D. Park"      },
  { campaign: "Webinar — AI in Marketing", type: "Events",      channel: "Multi-channel",launchDate: "Mar 31", readiness: "Blocked",      owner: "L. Rodriguez" },
  { campaign: "Retargeting Refresh — Meta",type: "Retargeting", channel: "Paid Social",  launchDate: "Apr 7",  readiness: "Needs Review", owner: "M. Torres"    },
]

const readinessStyles: Record<string, string> = {
  Ready:         "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800",
  "Needs Review":"bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800",
  Blocked:       "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800",
}

const launchColumns: SortableColumn<LaunchRow>[] = [
  {
    key: "campaign",
    header: "Campaign",
    sortable: true,
    render: (row: LaunchRow) => <span className="font-medium">{row.campaign as string}</span>,
  },
  { key: "type",       header: "Type" },
  { key: "channel",    header: "Channel" },
  { key: "launchDate", header: "Launch Date", sortable: true },
  {
    key: "readiness",
    header: "Readiness",
    render: (row: LaunchRow) => (
      <Badge variant="outline" className={readinessStyles[row.readiness as string] ?? ""}>
        {row.readiness as string}
      </Badge>
    ),
  },
  { key: "owner", header: "Owner" },
]

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function OrchestratePage() {
  return (
    <Container className="py-8 space-y-8">
      <PageHeader
        title="Orchestrate"
        description="Campaign operations, customer journey design, and cross-channel personalization — in one canvas."
        actions={<Button>New Campaign</Button>}
      />

      {/* Campaign Signal */}
      <div className="rounded-lg border border-cyan-200 bg-cyan-50 px-4 py-3 dark:border-cyan-800 dark:bg-cyan-950/40">
        <div className="flex items-start gap-3">
          <Zap className="mt-0.5 size-4 shrink-0 text-cyan-600 dark:text-cyan-400" />
          <div>
            <span className="text-xs font-semibold uppercase tracking-wide text-cyan-600 dark:text-cyan-400">
              Campaign Signal
            </span>
            <p className="mt-0.5 text-sm leading-relaxed text-cyan-900 dark:text-cyan-200">
              31 campaigns are live across 8 channels with 7 scheduled to launch this week — 3 require final review before going live. The Churn Risk Intervention journey is performing at 22% conversion with 567 contacts enrolled. The Webinar — AI in Marketing campaign is currently blocked with no creative assets approved; escalation may be needed to hit the Mar 31 launch date.
            </p>
          </div>
        </div>
      </div>

      <StatsGrid stats={stats} columns={4} />

      {/* Active Customer Journeys */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Active Customer Journeys</h2>
            <p className="text-sm text-muted-foreground">Multi-step, cross-channel flows personalized by audience behavior</p>
          </div>
          <Button variant="ghost" size="sm">New Journey</Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {journeys.map((j) => (
            <Card key={j.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-sm font-semibold leading-snug">{j.name}</CardTitle>
                  <Badge variant="outline" className={`shrink-0 text-xs ${journeyStatusStyles[j.status]}`}>
                    {journeyStatusLabel[j.status]}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{j.description}</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-wrap gap-1">
                  {j.channels.map((ch) => (
                    <Badge key={ch} variant="secondary" className="text-xs">{ch}</Badge>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-2 border-t pt-3 text-center">
                  <div>
                    <div className="text-base font-bold">{j.stages}</div>
                    <div className="text-xs text-muted-foreground">Stages</div>
                  </div>
                  <div>
                    <div className="text-base font-bold">{j.contacts > 0 ? j.contacts.toLocaleString() : "—"}</div>
                    <div className="text-xs text-muted-foreground">Contacts</div>
                  </div>
                  <div>
                    <div className="text-base font-bold">{j.convRate}</div>
                    <div className="text-xs text-muted-foreground">Conv Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <ChartBarInteractive
        title="Planned Campaign Launches"
        description="Number of campaigns launching per week — next 8 weeks"
        data={launchData}
        series={launchSeries}
        xAxisKey="week"
        xAxisFormatter={(v) => v}
      />

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <div>
              <CardTitle>Upcoming Launches</CardTitle>
              <CardDescription>
                Campaigns scheduled to launch in the next 30 days
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="shrink-0">Review Pending</Button>
          </div>
        </CardHeader>
        <CardContent>
          <SortableTable columns={launchColumns} data={launches} />
        </CardContent>
      </Card>
    </Container>
  )
}
