"use client"

import { Palette, Clock, CheckCircle, RotateCcw, Trophy, TrendingUp, Eye } from "lucide-react"

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
import { SortableTable, type SortableColumn } from "@repo/ui/patterns/data-tables/sortable-table"

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

const stats = [
  {
    label: "In Production",
    value: "18",
    icon: <Palette className="size-4" />,
    description: "Across 6 campaigns",
  },
  {
    label: "Pending Review",
    value: "6",
    icon: <Clock className="size-4" />,
    description: "Awaiting stakeholder sign-off",
  },
  {
    label: "Approved This Week",
    value: "11",
    icon: <CheckCircle className="size-4" />,
    trend: { value: 22, label: "vs last week" },
  },
  {
    label: "Avg Revision Rounds",
    value: "2.3",
    icon: <RotateCcw className="size-4" />,
    description: "↓0.4 vs last month",
  },
]

interface KanbanItem {
  id: string
  name: string
  type: string
  campaign: string
  due: string
}

interface KanbanColumn {
  label: string
  color: string
  headerColor: string
  items: KanbanItem[]
}

const kanbanColumns: KanbanColumn[] = [
  {
    label: "Concepting",
    color: "bg-slate-50 dark:bg-slate-900",
    headerColor: "bg-slate-200 dark:bg-slate-700",
    items: [
      { id: "1", name: "Hero Banner Q1", type: "Display", campaign: "Brand Refresh", due: "Jan 20" },
      { id: "2", name: "Social Series — Founders", type: "Social", campaign: "Demand Gen", due: "Jan 22" },
    ],
  },
  {
    label: "In Design",
    color: "bg-blue-50 dark:bg-blue-950",
    headerColor: "bg-blue-200 dark:bg-blue-800",
    items: [
      { id: "3", name: "Email Header Refresh", type: "Email", campaign: "Nurture", due: "Jan 18" },
      { id: "4", name: "LinkedIn Carousel", type: "Social", campaign: "Product Launch", due: "Jan 19" },
      { id: "5", name: "Paid Search Creative", type: "Display", campaign: "Demand Gen", due: "Jan 21" },
    ],
  },
  {
    label: "In Review",
    color: "bg-amber-50 dark:bg-amber-950",
    headerColor: "bg-amber-200 dark:bg-amber-800",
    items: [
      { id: "6", name: "Landing Page Redesign", type: "Web", campaign: "Brand Refresh", due: "Jan 16" },
      { id: "7", name: "Q1 Manifesto Video", type: "Video", campaign: "Brand", due: "Jan 17" },
    ],
  },
  {
    label: "Approved",
    color: "bg-emerald-50 dark:bg-emerald-950",
    headerColor: "bg-emerald-200 dark:bg-emerald-800",
    items: [
      { id: "8", name: "Partner One-Pager", type: "Print", campaign: "Partner Program", due: "Jan 14" },
      { id: "9", name: "Trade Show Banners", type: "Print", campaign: "Events", due: "Jan 15" },
      { id: "10", name: "Meta Video Ad", type: "Video", campaign: "Paid Social", due: "Jan 15" },
    ],
  },
]

interface BriefRow extends Record<string, unknown> {
  brief: string
  campaign: string
  type: string
  requested: string
  due: string
  status: string
}

const briefs: BriefRow[] = [
  { brief: "Q2 Campaign Creative Package", campaign: "Demand Gen", type: "Creative", requested: "Jan 8", due: "Jan 25", status: "In Design" },
  { brief: "Product Apollo Launch Kit", campaign: "Product Launch", type: "Creative", requested: "Jan 10", due: "Feb 1", status: "Concepting" },
  { brief: "Partner Portal Refresh", campaign: "Partner", type: "Web", requested: "Jan 12", due: "Jan 30", status: "In Review" },
  { brief: "Events Booth Graphics", campaign: "Events", type: "Print", requested: "Jan 5", due: "Jan 18", status: "Approved" },
  { brief: "Email Template Overhaul", campaign: "Nurture", type: "Email", requested: "Jan 14", due: "Feb 5", status: "Concepting" },
]

const statusColors: Record<string, string> = {
  "Concepting": "bg-zinc-100 text-zinc-600 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700",
  "In Design": "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800",
  "In Review": "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800",
  "Approved": "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800",
}

const briefColumns: SortableColumn<BriefRow>[] = [
  {
    key: "brief",
    header: "Brief",
    sortable: true,
    render: (row: BriefRow) => <span className="font-medium">{row.brief as string}</span>,
  },
  { key: "campaign", header: "Campaign", sortable: true },
  { key: "type", header: "Type" },
  { key: "requested", header: "Requested" },
  { key: "due", header: "Due", sortable: true },
  {
    key: "status",
    header: "Status",
    render: (row: BriefRow) => (
      <Badge variant="outline" className={statusColors[row.status as string] ?? ""}>
        {row.status as string}
      </Badge>
    ),
  },
]

// ---------------------------------------------------------------------------
// Winners Circle
// ---------------------------------------------------------------------------

interface WinnerCreative {
  id: string
  rank: 1 | 2 | 3
  name: string
  type: string
  campaign: string
  channel: string
  seed: string
  ctr: string
  reach: string
  engagementRate: string
  trend: string
}

const winners: WinnerCreative[] = [
  {
    id: "1",
    rank: 1,
    name: "NFL Season Launch :30",
    type: "Video",
    campaign: "NFL Season Launch",
    channel: "Paid Social",
    seed: "stadium",
    ctr: "4.8%",
    reach: "2.1M",
    engagementRate: "9.2%",
    trend: "+31%",
  },
  {
    id: "2",
    rank: 2,
    name: "4K Upgrade — Living Room",
    type: "Display",
    campaign: "4K Upsell",
    channel: "Programmatic",
    seed: "electronics",
    ctr: "3.2%",
    reach: "890K",
    engagementRate: "6.1%",
    trend: "+18%",
  },
  {
    id: "3",
    rank: 3,
    name: "Streaming Bundle — 'More For Less'",
    type: "Social",
    campaign: "Bundle Offer",
    channel: "Meta",
    seed: "remote",
    ctr: "2.9%",
    reach: "1.4M",
    engagementRate: "5.7%",
    trend: "+12%",
  },
]

const rankStyles: Record<1 | 2 | 3, { badge: string; label: string }> = {
  1: { badge: "bg-yellow-400 text-yellow-900",  label: "#1" },
  2: { badge: "bg-zinc-300 text-zinc-700",       label: "#2" },
  3: { badge: "bg-amber-600 text-amber-50",      label: "#3" },
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function StudioPage() {
  return (
    <Container className="py-8 space-y-8">
      <PageHeader
        title="Production Board"
        description="Creative operations — asset production status and brief pipeline."
        actions={<Button>New Request</Button>}
      />

      {/* Creative Digest */}
      <div className="rounded-lg border border-pink-200 bg-pink-50 px-4 py-3 dark:border-pink-800 dark:bg-pink-950/40">
        <div className="flex items-start gap-3">
          <Palette className="mt-0.5 size-4 shrink-0 text-pink-600 dark:text-pink-400" />
          <div>
            <span className="text-xs font-semibold uppercase tracking-wide text-pink-600 dark:text-pink-400">
              Creative Digest
            </span>
            <p className="mt-0.5 text-sm leading-relaxed text-pink-900 dark:text-pink-200">
              18 assets are in active production across 6 campaigns, with the team averaging 2.3 revision rounds — down 0.4 vs. last month. 6 assets are pending stakeholder review, including the Landing Page Redesign and Q1 Manifesto Video, both past their original due dates. 11 assets were approved this week, a 22% increase vs. last week.
            </p>
          </div>
        </div>
      </div>

      <StatsGrid stats={stats} columns={4} />

      {/* Winners Circle */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="size-4 text-yellow-500" />
            <h2 className="text-lg font-semibold">Winners Circle</h2>
          </div>
          <Button variant="ghost" size="sm">View All Performers</Button>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {winners.map((w) => (
            <Card key={w.id} className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow group">
              {/* Thumbnail */}
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://picsum.photos/seed/${w.seed}/600/338`}
                  alt={w.name}
                  className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Rank badge */}
                <span className={`absolute top-3 left-3 inline-flex items-center justify-center size-8 rounded-full text-sm font-bold shadow-md ${rankStyles[w.rank].badge}`}>
                  {rankStyles[w.rank].label}
                </span>
                {/* Trend pill */}
                <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-xs font-semibold text-emerald-300 backdrop-blur-sm">
                  <TrendingUp className="size-3" />
                  {w.trend} CTR
                </span>
                {/* Channel overlay */}
                <span className="absolute bottom-3 left-3 rounded-full bg-black/60 px-2.5 py-1 text-xs text-white backdrop-blur-sm">
                  {w.channel}
                </span>
              </div>

              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold leading-snug">{w.name}</p>
                  <Badge variant="outline" className="shrink-0 text-xs">{w.type}</Badge>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">{w.campaign}</p>

                {/* Metrics row */}
                <div className="mt-3 grid grid-cols-3 divide-x rounded-lg border bg-muted/30">
                  <div className="px-3 py-2 text-center">
                    <p className="text-xs text-muted-foreground">CTR</p>
                    <p className="text-sm font-bold">{w.ctr}</p>
                  </div>
                  <div className="px-3 py-2 text-center">
                    <p className="text-xs text-muted-foreground flex items-center justify-center gap-1"><Eye className="size-3" />Reach</p>
                    <p className="text-sm font-bold">{w.reach}</p>
                  </div>
                  <div className="px-3 py-2 text-center">
                    <p className="text-xs text-muted-foreground">Eng.</p>
                    <p className="text-sm font-bold">{w.engagementRate}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Kanban board */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Active Production</h2>
          <Button variant="ghost" size="sm">Review Queue</Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {kanbanColumns.map((col) => (
            <Card key={col.label} className={col.color}>
              <CardHeader className="pb-3">
                <div className={`inline-flex items-center gap-2 rounded-md px-2.5 py-1 text-xs font-semibold w-fit ${col.headerColor}`}>
                  {col.label}
                  <span className="ml-1 tabular-nums">{col.items.length}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-2 pt-0">
                {col.items.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-lg border bg-background p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <p className="text-sm font-medium leading-tight">{item.name}</p>
                    <div className="mt-1.5 flex items-center justify-between gap-2">
                      <Badge variant="outline" className="text-xs px-1.5 py-0">{item.type}</Badge>
                      <span className="text-xs text-muted-foreground">{item.due}</span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground truncate">{item.campaign}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <div>
              <CardTitle>Brief Pipeline</CardTitle>
              <CardDescription>Active briefs feeding the production board</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="shrink-0">Manage Briefs</Button>
          </div>
        </CardHeader>
        <CardContent>
          <SortableTable columns={briefColumns} data={briefs} />
        </CardContent>
      </Card>
    </Container>
  )
}
