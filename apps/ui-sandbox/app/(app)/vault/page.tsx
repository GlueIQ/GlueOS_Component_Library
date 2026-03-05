"use client"

import {
  Archive,
  AlertTriangle,
  ShieldCheck,
  Sparkles,
  Tag,
  Copy,
  Clock,
  TrendingUp,
  Target,
  Megaphone,
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

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

const digest =
  "In the past 24 hours, Vault auto-tagged 47 new assets across 3 active campaigns, identified 3 duplicate groups for consolidation, flagged 2 talent releases approaching expiry, and matched 6 high-performing assets to open Studio briefs. Brand compliance scan is current — 96% of assets meet updated guidelines."

const stats = [
  {
    label: "Total Assets",
    value: "1,247",
    icon: <Archive className="size-4" />,
    description: "Across all campaigns",
  },
  {
    label: "Auto-Tagged (7d)",
    value: "234",
    icon: <Tag className="size-4" />,
    trend: { value: 18, label: "vs prev 7 days" },
  },
  {
    label: "Rights Expiring (30d)",
    value: "14",
    icon: <AlertTriangle className="size-4" />,
    description: "2 require urgent action",
  },
  {
    label: "Brand Compliant",
    value: "96%",
    icon: <ShieldCheck className="size-4" />,
    trend: { value: 2, label: "vs last audit" },
  },
]

type TaskType = "tagged" | "duplicate" | "rights" | "match" | "compliance"

interface LibrarianTask {
  type: TaskType
  description: string
  time: string
}

const librarianActivity: LibrarianTask[] = [
  {
    type: "tagged",
    description:
      "47 assets auto-tagged across NFL Season Launch, Bundle Offer, and 4K Upsell campaigns",
    time: "2 hours ago",
  },
  {
    type: "duplicate",
    description:
      "3 duplicate groups identified — 12 redundant files flagged for consolidation",
    time: "4 hours ago",
  },
  {
    type: "rights",
    description:
      "Talent releases for Gonzalez shoot expiring in 11 days — renewal workflow triggered",
    time: "6 hours ago",
  },
  {
    type: "match",
    description:
      "6 top-performing hero assets from Q4 surfaced for active Studio briefs",
    time: "Yesterday",
  },
  {
    type: "compliance",
    description:
      "14 assets flagged for logo lockup update following brand refresh — 2 in active campaigns",
    time: "Yesterday",
  },
]

const taskIcon = {
  tagged:     <Tag        className="size-3.5 shrink-0 mt-0.5 text-blue-500" />,
  duplicate:  <Copy       className="size-3.5 shrink-0 mt-0.5 text-amber-500" />,
  rights:     <Clock      className="size-3.5 shrink-0 mt-0.5 text-red-500" />,
  match:      <Target     className="size-3.5 shrink-0 mt-0.5 text-emerald-500" />,
  compliance: <ShieldCheck className="size-3.5 shrink-0 mt-0.5 text-purple-500" />,
}

interface AssetCard {
  id: string
  name: string
  type: string
  campaign: string
  status: "active" | "expiring" | "expired"
  seed: string
}

const assets: AssetCard[] = [
  { id: "1", name: "NFL Season Launch :30",    type: "Video",   campaign: "NFL Season Launch", status: "active",   seed: "stadium"     },
  { id: "2", name: "Streaming Bundle CTA",     type: "Banner",  campaign: "Bundle Offer",      status: "active",   seed: "television"  },
  { id: "3", name: "4K Upgrade Hero",          type: "Image",   campaign: "4K Upsell",         status: "active",   seed: "screen"      },
  { id: "4", name: "Talent Shoot — Gonzalez",  type: "Image",   campaign: "Brand Refresh",     status: "expiring", seed: "portrait"    },
  { id: "5", name: "Self-Install Explainer",   type: "Video",   campaign: "Onboarding",        status: "active",   seed: "technology"  },
  { id: "6", name: "Regional OOH — Phoenix",   type: "Print",   campaign: "Regional Q2",       status: "expiring", seed: "outdoor"     },
  { id: "7", name: "Holiday Bundle Email",     type: "Email",   campaign: "Holiday Promo",     status: "active",   seed: "celebration" },
  { id: "8", name: "Brand Anthem :60",         type: "Video",   campaign: "Brand",             status: "active",   seed: "broadcast"   },
]

const statusDot: Record<string, string> = {
  active:   "bg-emerald-500",
  expiring: "bg-amber-500",
  expired:  "bg-red-500",
}

const statusLabel: Record<string, string> = {
  active:   "Active",
  expiring: "Expiring",
  expired:  "Expired",
}

interface ExpiringAsset {
  id: string
  name: string
  expiry: string
  campaign: string
  rightsType: string
  urgent: boolean
}

const expiringAssets: ExpiringAsset[] = [
  { id: "1", name: "Talent Shoot — Gonzalez",  expiry: "Mar 14, 2026", campaign: "Brand Refresh",  rightsType: "Talent Release",   urgent: true  },
  { id: "2", name: "Regional OOH — Phoenix",   expiry: "Mar 21, 2026", campaign: "Regional Q2",    rightsType: "Media Placement",  urgent: false },
  { id: "3", name: "Stock Music Pack Vol. 3",  expiry: "Mar 28, 2026", campaign: "NFL Season",     rightsType: "Music License",    urgent: false },
  { id: "4", name: "Sports Footage — Batch B", expiry: "Apr 2, 2026",  campaign: "NFL Season",     rightsType: "Content License",  urgent: false },
  { id: "5", name: "Partner Logo — Apex Net",  expiry: "Apr 14, 2026", campaign: "Partner Bundle", rightsType: "Trademark",        urgent: false },
]

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function VaultPage() {
  return (
    <Container className="py-8 space-y-8">
      <PageHeader
        title="Vault"
        description="Your AI Librarian — organizing, monitoring, and activating your creative library so your team doesn't have to."
        actions={<Button>Upload Assets</Button>}
      />

      {/* AI Librarian Digest */}
      <div className="rounded-lg border border-purple-200 bg-purple-50 px-4 py-3 dark:border-purple-800 dark:bg-purple-950/40">
        <div className="flex items-start gap-3">
          <Sparkles className="mt-0.5 size-4 shrink-0 text-purple-600 dark:text-purple-400" />
          <div>
            <span className="text-xs font-semibold uppercase tracking-wide text-purple-600 dark:text-purple-400">
              Librarian Daily Digest
            </span>
            <p className="mt-0.5 text-sm leading-relaxed text-purple-900 dark:text-purple-200">
              {digest}
            </p>
          </div>
        </div>
      </div>

      <StatsGrid stats={stats} columns={4} />

      {/* Recent Assets */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent Assets</h2>
          <Button variant="ghost" size="sm">Browse All</Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {assets.map((asset) => (
            <Card key={asset.id} className="cursor-pointer hover:shadow-md transition-shadow overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://picsum.photos/seed/${asset.seed}/400/225`}
                alt={asset.name}
                className="h-32 w-full object-cover"
              />
              <CardContent className="p-3">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium leading-snug">{asset.name}</p>
                  <Badge variant="outline" className="shrink-0 text-xs">{asset.type}</Badge>
                </div>
                <div className="mt-2 flex items-center justify-between gap-2">
                  <span className="text-xs text-muted-foreground truncate">{asset.campaign}</span>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className={`size-1.5 rounded-full ${statusDot[asset.status]}`} />
                    <span className="text-xs text-muted-foreground">{statusLabel[asset.status]}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Librarian Activity + Rights Monitor */}
      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Librarian Activity</CardTitle>
            <CardDescription>Automated tasks completed in the last 24 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {librarianActivity.map((task, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  {taskIcon[task.type]}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm leading-snug">{task.description}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{task.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <div className="flex items-center justify-between gap-4">
              <div>
                <CardTitle>Rights Monitor</CardTitle>
                <CardDescription>Assets with expiring rights or licenses in the next 45 days</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="shrink-0">Start Renewals</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {expiringAssets.map((a, i) => (
                <div key={a.id}>
                  <div className="flex items-center justify-between py-3 px-2 -mx-2 rounded-md hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`size-2 rounded-full shrink-0 ${a.urgent ? "bg-red-500" : "bg-amber-500"}`} />
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{a.name}</p>
                        <p className="text-xs text-muted-foreground">{a.campaign} · {a.rightsType}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0 ml-4">
                      <span className="text-xs text-muted-foreground">{a.expiry}</span>
                      <span className="text-xs text-primary cursor-pointer hover:underline">Renew</span>
                    </div>
                  </div>
                  {i < expiringAssets.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Container>
  )
}
