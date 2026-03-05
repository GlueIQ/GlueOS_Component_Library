"use client"

import {
  FileText,
  Clock,
  CheckCircle,
  AlertTriangle,
  Plus,
  Megaphone,
  Compass,
  Palette,
  Radio,
  FolderKanban,
  Sparkles,
} from "lucide-react"

import { Container } from "@repo/ui/components/ui/container"
import { Button } from "@repo/ui/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card"
import { StatusBadge } from "@repo/ui/components/ui/status-badge"
import { PageHeader } from "@repo/ui/patterns/navigation/page-header"
import { StatsGrid } from "@repo/ui/patterns/data-visualization/stats-grid"
import { Separator } from "@repo/ui/components/ui/separator"

// ---------------------------------------------------------------------------
// Static mock data — mirrors GlueIQ Forge (Briefs) dashboard
// ---------------------------------------------------------------------------

const stats = [
  {
    label: "Total Briefs",
    value: 28,
    icon: <FileText className="size-4" />,
    description: "Across all brief types",
  },
  {
    label: "In Progress",
    value: 8,
    icon: <Clock className="size-4" />,
    description: "Drafts and in review",
  },
  {
    label: "Approved",
    value: 15,
    icon: <CheckCircle className="size-4" />,
    trend: { value: 25, label: "vs last month" },
  },
  {
    label: "Pending Review",
    value: 5,
    icon: <AlertTriangle className="size-4" />,
    description: "Awaiting approval",
  },
]

const briefTypes = [
  {
    name: "Campaign Brief",
    description: "Plan and execute integrated marketing campaigns with clear objectives and KPIs.",
    icon: Megaphone,
    color: "bg-purple-500",
  },
  {
    name: "Strategy Brief",
    description: "Define strategic engagement frameworks for client partnerships and growth initiatives.",
    icon: Compass,
    color: "bg-indigo-500",
  },
  {
    name: "Creative Brief",
    description: "Guide creative development with clear direction on messaging, tone, and visual identity.",
    icon: Palette,
    color: "bg-pink-500",
  },
  {
    name: "Media Brief",
    description: "Outline media planning and buying strategy across channels and audiences.",
    icon: Radio,
    color: "bg-cyan-500",
  },
  {
    name: "Project Brief",
    description: "Scope and plan deliverables, timelines, and resource allocation for client projects.",
    icon: FolderKanban,
    color: "bg-blue-500",
  },
]

interface RecentBrief {
  id: string
  title: string
  client: string
  type: string
  typeColor: string
  status: string
  updatedAt: string
}

const recentBriefs: RecentBrief[] = [
  {
    id: "brief-001",
    title: "Q2 Brand Refresh Campaign",
    client: "Meridian Health",
    type: "Campaign",
    typeColor: "bg-purple-500",
    status: "in_review",
    updatedAt: "Jan 15, 2026",
  },
  {
    id: "brief-002",
    title: "Growth Strategy 2026",
    client: "TerraVerde",
    type: "Strategy",
    typeColor: "bg-indigo-500",
    status: "approved",
    updatedAt: "Jan 14, 2026",
  },
  {
    id: "brief-003",
    title: "Product Launch Creative",
    client: "NovaCraft",
    type: "Creative",
    typeColor: "bg-pink-500",
    status: "draft",
    updatedAt: "Jan 13, 2026",
  },
  {
    id: "brief-004",
    title: "Paid Media Plan Q1",
    client: "Apex Financial",
    type: "Media",
    typeColor: "bg-cyan-500",
    status: "in_progress",
    updatedAt: "Jan 12, 2026",
  },
  {
    id: "brief-005",
    title: "Website Redesign Scope",
    client: "Stratos Aerospace",
    type: "Project",
    typeColor: "bg-blue-500",
    status: "approved",
    updatedAt: "Jan 10, 2026",
  },
]

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function ForgePage() {
  return (
    <Container className="py-8 space-y-8">
      <PageHeader
        title="Dashboard"
        description="Welcome to GlueIQ Briefs. Create and manage your strategic briefs."
        actions={
          <Button>
            <Plus className="size-4 mr-2" />
            New Brief
          </Button>
        }
      />

      {/* Brief Signal */}
      <div className="rounded-lg border border-orange-200 bg-orange-50 px-4 py-3 dark:border-orange-800 dark:bg-orange-950/40">
        <div className="flex items-start gap-3">
          <Sparkles className="mt-0.5 size-4 shrink-0 text-orange-600 dark:text-orange-400" />
          <div>
            <span className="text-xs font-semibold uppercase tracking-wide text-orange-600 dark:text-orange-400">
              Brief Signal
            </span>
            <p className="mt-0.5 text-sm leading-relaxed text-orange-900 dark:text-orange-200">
              3 briefs are awaiting your review — including the Product Apollo launch brief which is due today. 2 new briefs were submitted this week across Campaign and Creative types. Forge has generated 12 AI-assisted drafts this month, with an average review-to-approval time of 1.4 days.
            </p>
          </div>
        </div>
      </div>

      <StatsGrid stats={stats} columns={4} />

      {/* Quick Actions */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Quick Actions</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {briefTypes.map((bt) => (
            <Card
              key={bt.name}
              className="cursor-pointer hover:shadow-md transition-shadow"
            >
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <div className={`flex size-8 items-center justify-center rounded-lg ${bt.color} text-white`}>
                    <bt.icon className="size-4" />
                  </div>
                  <CardTitle className="text-sm">{bt.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {bt.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your most recently updated briefs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            {recentBriefs.map((brief, i) => (
              <div key={brief.id}>
                <div className="flex items-center justify-between py-3 hover:bg-muted/50 rounded-md px-2 -mx-2 cursor-pointer transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`size-2 rounded-full shrink-0 ${brief.typeColor}`} />
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{brief.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {brief.client} &middot; {brief.type}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 ml-4">
                    <StatusBadge status={brief.status} />
                    <span className="text-xs text-muted-foreground hidden sm:block">
                      {brief.updatedAt}
                    </span>
                  </div>
                </div>
                {i < recentBriefs.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </Container>
  )
}
