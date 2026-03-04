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
  TrendingUp,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { useActiveModule } from "@repo/ui/layouts/app-shell"
import { Container } from "@repo/ui/components/ui/container"
import { PageHeader } from "@repo/ui/patterns/navigation/page-header"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card"

interface ModuleCard {
  name: string
  description: string
  icon: LucideIcon
  href: string
}

const modules: ModuleCard[] = [
  { name: "Lumen", description: "Executive intelligence and strategic insights for leadership decision-making.", icon: Gem, href: "/lumen" },
  { name: "Horizon", description: "Strategic initiative planning, tracking, and alignment across the organization.", icon: Compass, href: "/horizon" },
  { name: "Immersion", description: "AI-powered competitive intelligence, market research, and client opportunity mapping.", icon: Eye, href: "/immersion" },
  { name: "Intelligence", description: "Performance analytics and reporting across campaigns, channels, and clients.", icon: TrendingUp, href: "/intelligence" },
  { name: "Zoltar", description: "Predictive forecasting and scenario planning powered by machine learning.", icon: BrainCircuit, href: "/zoltar" },
  { name: "Forge", description: "Create and manage strategic, campaign, creative, media, and project briefs.", icon: BookOpen, href: "/forge" },
  { name: "Ledger", description: "Executive financial dashboard with revenue tracking, profitability, and forecasting.", icon: TrendingUp, href: "/ledger" },
  { name: "Studio", description: "Creative operations hub for managing assets, reviews, and production workflows.", icon: Palette, href: "/studio" },
  { name: "Vault", description: "Centralized asset management for brand materials, templates, and media files.", icon: Archive, href: "/vault" },
  { name: "Orchestrate", description: "Campaign operations and workflow orchestration across teams and channels.", icon: Megaphone, href: "/orchestrate" },
  { name: "Optimize", description: "Performance optimization with A/B testing, budget allocation, and recommendations.", icon: SlidersHorizontal, href: "/optimize" },
  { name: "Connect", description: "Data integration hub connecting third-party platforms, APIs, and data sources.", icon: Link, href: "/connect" },
  { name: "Shield", description: "AI governance, compliance monitoring, and brand safety guardrails.", icon: ShieldCheck, href: "/shield" },
]

export default function LaunchpadPage() {
  const { setActiveModule } = useActiveModule()

  return (
    <Container className="py-8 space-y-8">
      <PageHeader
        title="Launchpad"
        description="Your GlueOS platform home. Select a module to get started."
      />

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
                  <div className="flex size-9 items-center justify-center rounded-lg bg-muted-foreground transition-colors group-hover:bg-primary">
                    <m.icon className="size-4 text-white" />
                  </div>
                  <CardTitle className="text-base">{m.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {m.description}
                </p>
              </CardContent>
            </Card>
          </NextLink>
        ))}
      </div>
    </Container>
  )
}
