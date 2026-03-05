"use client"

import NextLink from "next/link"
import {
  Archive,
  BookOpen,
  BrainCircuit,
  Compass,
  Eye,
  Gem,
  Link,
  Megaphone,
  Palette,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  TrendingUp,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { useActiveModule } from "@__SCOPE__/ui/layouts/app-shell"
import { Container } from "@__SCOPE__/ui/components/ui/container"
import { PageHeader } from "@__SCOPE__/ui/patterns/navigation/page-header"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@__SCOPE__/ui/components/ui/card"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type SignalType = "critical" | "caution" | "info"

interface ModuleSignal {
  text: string
  type: SignalType
}

interface ModuleCard {
  name: string
  description: string
  icon: LucideIcon
  href: string
  signal?: ModuleSignal
}

// ---------------------------------------------------------------------------
// Signal styles (aligned with semantic status palette)
// ---------------------------------------------------------------------------

const signalBg: Record<SignalType, string> = {
  critical: "bg-red-50 text-red-700 border border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800",
  caution:  "bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800",
  info:     "bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800",
}

const signalDot: Record<SignalType, string> = {
  critical: "bg-red-500",
  caution:  "bg-amber-500",
  info:     "bg-blue-500",
}

// ---------------------------------------------------------------------------
// Module data with contextual signals
// ---------------------------------------------------------------------------

const modules: ModuleCard[] = [
  {
    name: "Lumen",
    description: "Executive intelligence and strategic insights for leadership decision-making.",
    icon: Gem,
    href: "/lumen",
    signal: { text: "2 new anomalies detected this week", type: "caution" },
  },
  {
    name: "Horizon",
    description: "Strategic initiative planning, tracking, and alignment across the organization.",
    icon: Compass,
    href: "/horizon",
    signal: { text: "1 initiative at risk — deadline in 5 days", type: "caution" },
  },
  {
    name: "Immersion",
    description: "AI-powered competitive intelligence, market research, and client opportunity mapping.",
    icon: Eye,
    href: "/immersion",
    signal: { text: "New competitive analysis ready to review", type: "info" },
  },
  {
    name: "Intelligence",
    description: "Performance analytics and reporting across campaigns, channels, and clients.",
    icon: TrendingUp,
    href: "/intelligence",
    signal: { text: "LinkedIn CPL up 34% vs 14-day average", type: "caution" },
  },
  {
    name: "Zoltar",
    description: "Predictive forecasting and scenario planning powered by machine learning.",
    icon: BrainCircuit,
    href: "/zoltar",
    signal: { text: "Forecast updated — model confidence high", type: "info" },
  },
  {
    name: "Forge",
    description: "Create and manage strategic, campaign, creative, media, and project briefs.",
    icon: BookOpen,
    href: "/forge",
    signal: { text: "3 briefs awaiting your review", type: "caution" },
  },
  {
    name: "Ledger",
    description: "Executive financial dashboard with revenue tracking, profitability, and forecasting.",
    icon: TrendingUp,
    href: "/ledger",
    signal: { text: "Revenue tracking 8% below monthly target", type: "critical" },
  },
  {
    name: "Studio",
    description: "Creative operations hub for managing assets, reviews, and production workflows.",
    icon: Palette,
    href: "/studio",
    signal: { text: "5 assets in review — 2 past due date", type: "caution" },
  },
  {
    name: "Vault",
    description: "Centralized asset management for brand materials, templates, and media files.",
    icon: Archive,
    href: "/vault",
    signal: { text: "14 assets expiring in the next 30 days", type: "caution" },
  },
  {
    name: "Orchestrate",
    description: "Campaign operations and workflow orchestration across teams and channels.",
    icon: Megaphone,
    href: "/orchestrate",
    signal: { text: "Campaign launching tomorrow not yet ready", type: "critical" },
  },
  {
    name: "Optimize",
    description: "Performance optimization with A/B testing, budget allocation, and recommendations.",
    icon: SlidersHorizontal,
    href: "/optimize",
    signal: { text: "3 tests reached statistical significance", type: "info" },
  },
  {
    name: "Connect",
    description: "Integration hub for connected platforms — data pipelines in, action execution out, health monitoring across both.",
    icon: Link,
    href: "/connect",
    signal: { text: "3 actions pending approval — 2 budget, 1 creative", type: "caution" },
  },
  {
    name: "Shield",
    description: "AI governance, compliance monitoring, and brand safety guardrails.",
    icon: ShieldCheck,
    href: "/shield",
    signal: { text: "11 AI outputs flagged for review this week", type: "caution" },
  },
]

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function LaunchpadPage() {
  const { setActiveModule } = useActiveModule()

  return (
    <Container className="py-8 space-y-8">
      <PageHeader
        title="Launchpad"
        description="Your GlueOS platform home. Select a module to get started."
      />

      {/* Daily Briefing */}
      <div className="rounded-lg border border-indigo-200 bg-indigo-50 px-4 py-3 dark:border-indigo-800 dark:bg-indigo-950/40">
        <div className="flex items-start gap-3">
          <Sparkles className="mt-0.5 size-4 shrink-0 text-indigo-600 dark:text-indigo-400" />
          <div>
            <span className="text-xs font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
              Daily Briefing
            </span>
            <p className="mt-0.5 text-sm leading-relaxed text-indigo-900 dark:text-indigo-200">
              3 modules are surfacing signals that need your attention today. Optimize flagged 12 pending recommendations — 2 require urgent action before budget cycles close. Intelligence detected LinkedIn CPL up 34% vs. 14-day average. Zoltar's pipeline forecast was updated this morning with model confidence rated high and Q1 on track at $8.1M.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {modules.map((m) => (
          <NextLink
            key={m.name}
            href={m.href}
            onClick={() => setActiveModule({ name: m.name, description: m.description })}
            className="group"
          >
            <Card className="h-full transition-all hover:shadow-md hover:border-primary">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-muted-foreground transition-colors group-hover:bg-primary">
                      <m.icon className="size-4 text-white" />
                    </div>
                    {m.signal && (
                      <span
                        className={`absolute -top-0.5 -right-0.5 size-2 rounded-full border-2 border-background ${signalDot[m.signal.type]}`}
                      />
                    )}
                  </div>
                  <CardTitle className="text-base">{m.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {m.description}
                </p>
                {m.signal && (
                  <div className={`flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium ${signalBg[m.signal.type]}`}>
                    <span className={`size-1.5 rounded-full shrink-0 ${signalDot[m.signal.type]}`} />
                    {m.signal.text}
                  </div>
                )}
              </CardContent>
            </Card>
          </NextLink>
        ))}
      </div>
    </Container>
  )
}
