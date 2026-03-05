"use client"

import { FlaskConical, CheckCircle, TrendingUp, Lightbulb, Zap, SlidersHorizontal } from "lucide-react"

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

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

const signal =
  "Based on Intelligence signals, Paid Search ROAS is running 28% above target — budget expansion recommended. Paid Social creative fatigue is detected across 3 ad sets, with CTR declining for 9+ days. Immersion surfaced 4 high-intent query clusters not yet covered by active campaigns. 12 optimization actions are pending review, with 2 requiring immediate attention to prevent budget waste."

const stats = [
  {
    label: "Active Tests",
    value: "9",
    icon: <FlaskConical className="size-4" />,
    description: "Across 4 campaigns",
  },
  {
    label: "Campaigns Optimizing",
    value: "14",
    icon: <SlidersHorizontal className="size-4" />,
    trend: { value: 6, label: "vs last month" },
  },
  {
    label: "Avg Test Lift",
    value: "+14%",
    icon: <TrendingUp className="size-4" />,
    trend: { value: 4, label: "vs prev cohort" },
  },
  {
    label: "Actions Pending",
    value: "12",
    icon: <Lightbulb className="size-4" />,
    description: "2 require urgent action",
  },
]

// ---------------------------------------------------------------------------
// In-market campaign optimization
// ---------------------------------------------------------------------------

type OptStatus = "Optimizing" | "Monitoring" | "Needs Action"
type SignalSource = "Intelligence" | "Immersion"

interface CampaignOpt {
  id: string
  campaign: string
  channel: string
  signal: string
  source: SignalSource
  action: string
  impact: string
  status: OptStatus
}

const campaignOpts: CampaignOpt[] = [
  {
    id: "1",
    campaign: "NFL Season Search",
    channel: "Paid Search",
    signal: "ROAS 4.1x ↑ — trending 28% above target for 5 days",
    source: "Intelligence",
    action: "Budget increased +12% to capture demand surge",
    impact: "+$28K projected pipeline",
    status: "Optimizing",
  },
  {
    id: "2",
    campaign: "Brand Awareness — Social",
    channel: "Paid Social",
    signal: "Creative fatigue: CTR down 31% over 9 consecutive days",
    source: "Intelligence",
    action: "Creative rotation queued — 3 new variants ready",
    impact: "Est. 15% CTR recovery",
    status: "Needs Action",
  },
  {
    id: "3",
    campaign: "Tech Bundle Display",
    channel: "Display / Programmatic",
    signal: "CPM trending down 18% — below floor efficiency threshold",
    source: "Intelligence",
    action: "Bid floor raised, bottom placements paused",
    impact: "-$8K projected wasted spend",
    status: "Optimizing",
  },
  {
    id: "4",
    campaign: "SEO Content Hub",
    channel: "Organic Search",
    signal: "4 high-intent query clusters surfaced with rising share of voice",
    source: "Immersion",
    action: "2 content pages queued for update in Studio",
    impact: "Est. top-5 position on 3 terms",
    status: "Monitoring",
  },
  {
    id: "5",
    campaign: "Email Nurture — Q2",
    channel: "Email",
    signal: "Engagement rate up 22% — above threshold for cadence expansion",
    source: "Intelligence",
    action: "Send cadence expanded from bi-weekly to weekly",
    impact: "+$180K pipeline influence est.",
    status: "Optimizing",
  },
  {
    id: "6",
    campaign: "Enterprise ABM Wave 3",
    channel: "LinkedIn",
    signal: "34% audience overlap with Demand Gen campaign detected",
    source: "Intelligence",
    action: "Audience exclusions applied to reduce duplication",
    impact: "Est. 28% CPL reduction",
    status: "Needs Action",
  },
]

const optStatusStyles: Record<OptStatus, string> = {
  Optimizing:    "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800",
  Monitoring:    "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800",
  "Needs Action":"bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800",
}

const sourceStyles: Record<SignalSource, string> = {
  Intelligence: "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800",
  Immersion:    "bg-purple-50 text-purple-600 border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800",
}

// ---------------------------------------------------------------------------
// Experimentation
// ---------------------------------------------------------------------------

interface TestCard {
  id: string
  name: string
  hypothesis: string
  variants: number
  lift: number
  confidence: number
  status: "Running" | "Significant" | "Inconclusive"
}

const activeTests: TestCard[] = [
  {
    id: "1",
    name: "Homepage Hero CTA",
    hypothesis: "Replacing 'Get Started' with 'See a Demo' will increase demo requests.",
    variants: 2,
    lift: 12.4,
    confidence: 87,
    status: "Running",
  },
  {
    id: "2",
    name: "Email Subject — Urgency",
    hypothesis: "Adding urgency language will increase open rates by 15%.",
    variants: 3,
    lift: 8.1,
    confidence: 94,
    status: "Significant",
  },
  {
    id: "3",
    name: "LinkedIn Form Length",
    hypothesis: "Reducing form from 6 to 3 fields will improve lead volume.",
    variants: 2,
    lift: 22.7,
    confidence: 71,
    status: "Running",
  },
]

const testStatusStyles: Record<string, string> = {
  Running:      "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800",
  Significant:  "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800",
  Inconclusive: "bg-zinc-100 text-zinc-600 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700",
}

// ---------------------------------------------------------------------------
// Recommendations
// ---------------------------------------------------------------------------

interface Recommendation {
  id: string
  text: string
  impact: "High" | "Medium" | "Low"
  module: string
}

const recommendations: Recommendation[] = [
  { id: "1", text: "Pause LinkedIn prospecting ad set — CTR 42% below 30-day average",          impact: "High",   module: "Paid Social" },
  { id: "2", text: "Increase Google Search budget 15% — ROAS trending above 4x this week",      impact: "High",   module: "Paid Search" },
  { id: "3", text: "Refresh Meta carousel creative — running 28 days, engagement dropping",      impact: "Medium", module: "Paid Social" },
  { id: "4", text: "Add proof point to demo page — similar pages see +11% CVR uplift",           impact: "Medium", module: "Web"         },
  { id: "5", text: "Test email send-time at 10am vs 2pm — 40% of audience in EST",               impact: "Low",    module: "Email"       },
]

const impactStyles: Record<string, string> = {
  High:   "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800",
  Medium: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800",
  Low:    "bg-zinc-100 text-zinc-600 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700",
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function OptimizePage() {
  return (
    <Container className="py-8 space-y-8">
      <PageHeader
        title="Optimize"
        description="Experimentation, in-market campaign optimization, and AI-driven recommendations — powered by Intelligence and Immersion signals."
        actions={<Button>New Test</Button>}
      />

      {/* Optimization Signal */}
      <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 dark:border-amber-800 dark:bg-amber-950/40">
        <div className="flex items-start gap-3">
          <Zap className="mt-0.5 size-4 shrink-0 text-amber-600 dark:text-amber-400" />
          <div>
            <span className="text-xs font-semibold uppercase tracking-wide text-amber-600 dark:text-amber-400">
              Optimization Signal
            </span>
            <p className="mt-0.5 text-sm leading-relaxed text-amber-900 dark:text-amber-200">
              {signal}
            </p>
          </div>
        </div>
      </div>

      <StatsGrid stats={stats} columns={4} />

      {/* In-Market Campaign Optimization */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <div>
              <CardTitle>In-Market Campaign Optimization</CardTitle>
              <CardDescription>
                AI-driven actions applied to live campaigns based on Intelligence and Immersion signals
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="shrink-0">Review All</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            {campaignOpts.map((c, i) => (
              <div key={c.id}>
                <div className="grid grid-cols-1 gap-2 py-3 px-2 -mx-2 rounded-md hover:bg-muted/50 transition-colors lg:grid-cols-[1fr_2fr_auto]">
                  {/* Campaign + channel */}
                  <div className="flex flex-col gap-0.5">
                    <p className="text-sm font-medium">{c.campaign}</p>
                    <span className="text-xs text-muted-foreground">{c.channel}</span>
                  </div>
                  {/* Signal + action */}
                  <div className="flex flex-col gap-1 min-w-0">
                    <div className="flex items-start gap-2">
                      <Badge variant="outline" className={`shrink-0 text-xs ${sourceStyles[c.source]}`}>
                        {c.source}
                      </Badge>
                      <p className="text-xs text-muted-foreground leading-snug">{c.signal}</p>
                    </div>
                    <p className="text-xs leading-snug">
                      <span className="font-medium">Action:</span> {c.action}
                    </p>
                    <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">{c.impact}</p>
                  </div>
                  {/* Status */}
                  <div className="flex items-center lg:justify-end">
                    <Badge variant="outline" className={`text-xs ${optStatusStyles[c.status]}`}>
                      {c.status}
                    </Badge>
                  </div>
                </div>
                {i < campaignOpts.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Running Experiments */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Running Experiments</h2>
          <Button variant="ghost" size="sm">Call Winner</Button>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {activeTests.map((test) => (
            <Card key={test.id} className="flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-sm leading-snug">{test.name}</CardTitle>
                  <Badge variant="outline" className={`shrink-0 ${testStatusStyles[test.status]}`}>
                    {test.status}
                  </Badge>
                </div>
                <CardDescription className="text-xs leading-relaxed line-clamp-2 mt-1">
                  {test.hypothesis}
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto pt-0">
                <div className="grid grid-cols-3 gap-2 rounded-lg bg-muted/50 p-3">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Variants</p>
                    <p className="text-sm font-semibold">{test.variants}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Lift</p>
                    <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">+{test.lift}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Confidence</p>
                    <p className="text-sm font-semibold">{test.confidence}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Top Recommendations */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <div>
              <CardTitle>Top Recommendations</CardTitle>
              <CardDescription>
                AI-generated optimization opportunities ranked by estimated impact
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="shrink-0">Create Action Plan</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            {recommendations.map((r, i) => (
              <div key={r.id}>
                <div className="flex items-center justify-between gap-4 py-3 px-2 -mx-2 rounded-md hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <Lightbulb className="size-4 text-muted-foreground shrink-0" />
                    <p className="text-sm">{r.text}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs text-muted-foreground">{r.module}</span>
                    <Badge variant="outline" className={impactStyles[r.impact]}>{r.impact}</Badge>
                  </div>
                </div>
                {i < recommendations.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </Container>
  )
}
