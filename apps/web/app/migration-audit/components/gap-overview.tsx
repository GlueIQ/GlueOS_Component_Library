"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card"
import { Badge } from "@repo/ui/components/ui/badge"
import { type AuditComponent, type AppSource } from "../data"

interface GapGroup {
  type: string
  components: string[]
  description: string
  priority: 1 | 2 | 3
  effort: "Small" | "Medium" | "Large"
  apps: AppSource[]
}

const gapGroups: GapGroup[] = [
  // ─── Shared across multiple apps ──────────────────────────
  {
    type: "App Shell",
    components: ["Shell"],
    description: "Sidebar + top bar + content layout shell with responsive mobile menu. Used in all three apps.",
    priority: 1,
    effort: "Large",
    apps: ["immersion", "forge", "ledger"],
  },
  {
    type: "Status Badge",
    components: ["StatusBadge", "BriefStatusBadge"],
    description: "Extended Badge with color mapping for workflow states (draft, active, complete, error).",
    priority: 1,
    effort: "Small",
    apps: ["immersion", "forge"],
  },

  // ─── Immersion-specific gaps ──────────────────────────────
  {
    type: "Scorecard",
    components: ["AIPresenceScorecard", "DigitalScorecard", "CompetitiveScorecard"],
    description: "Grid of KPI metrics with scores, labels, and visual indicators.",
    priority: 1,
    effort: "Medium",
    apps: ["immersion"],
  },
  {
    type: "Feed",
    components: ["MentionFeed"],
    description: "Scrollable feed of items with metadata, icons, and action buttons.",
    priority: 1,
    effort: "Medium",
    apps: ["immersion"],
  },
  {
    type: "Data Card Grid",
    components: ["QuickWinCards", "ConsumerIntentCards", "AdPreviewCards", "QuestionMining", "RisingOpportunities"],
    description: "Responsive grid of structured data cards. Flexible slot-based layout.",
    priority: 1,
    effort: "Medium",
    apps: ["immersion"],
  },
  {
    type: "Status Banner",
    components: ["AnalysisStatusBanner"],
    description: "Colored banner with icon, message, and optional progress bar.",
    priority: 1,
    effort: "Small",
    apps: ["immersion"],
  },
  {
    type: "Tag Input",
    components: ["ToolKeywordInput"],
    description: "Multi-value input with chip/tag display and add/remove.",
    priority: 1,
    effort: "Small",
    apps: ["immersion"],
  },
  {
    type: "Chart – Venn",
    components: ["KeywordVenn"],
    description: "Venn diagram for showing overlap between two or three datasets.",
    priority: 2,
    effort: "Medium",
    apps: ["immersion"],
  },
  {
    type: "Preview Card",
    components: ["ToolPreview"],
    description: "Grayscale content card with CTA overlay for upsell/preview states.",
    priority: 3,
    effort: "Small",
    apps: ["immersion"],
  },
  {
    type: "Gallery",
    components: ["CreativeGallery"],
    description: "Image/creative asset gallery grid with lightbox.",
    priority: 3,
    effort: "Medium",
    apps: ["immersion"],
  },
  {
    type: "Hero Module",
    components: ["TrendsHeroModule"],
    description: "Featured content display with embedded chart and key stat.",
    priority: 3,
    effort: "Medium",
    apps: ["immersion"],
  },
  {
    type: "Data Grid",
    components: ["LocalCompetitorGrid", "PlatformDominanceGrid", "TopMarketsGrid"],
    description: "Structured grid for multi-attribute entity display.",
    priority: 3,
    effort: "Medium",
    apps: ["immersion"],
  },
  {
    type: "Ranking",
    components: ["MarketPodium", "LocalRankingCard"],
    description: "Ranked list / podium visualization for top items.",
    priority: 3,
    effort: "Small",
    apps: ["immersion"],
  },
  {
    type: "Feedback Form",
    components: ["FeedbackModal"],
    description: "Modal with type selector, text input, and submission handler.",
    priority: 3,
    effort: "Small",
    apps: ["immersion"],
  },
  {
    type: "Content Card",
    components: ["PromptCard"],
    description: "Card with metadata badges, hover actions, and selection state.",
    priority: 3,
    effort: "Small",
    apps: ["immersion"],
  },

  // ─── Forge-specific gaps ──────────────────────────────────
  {
    type: "Timeline",
    components: ["BriefTimeline"],
    description: "Activity timeline with icons, timestamps, and grouped entries.",
    priority: 1,
    effort: "Medium",
    apps: ["forge"],
  },
  {
    type: "Command Palette",
    components: ["CommandPalette"],
    description: "Global Cmd+K search/navigation overlay built on cmdk.",
    priority: 1,
    effort: "Medium",
    apps: ["forge"],
  },
  {
    type: "Form Section",
    components: ["FormSection"],
    description: "Grouped form section with title, description, and field slots.",
    priority: 2,
    effort: "Small",
    apps: ["forge"],
  },
  {
    type: "AI-Enhanced Field",
    components: ["TextField"],
    description: "Text input with inline AI suggestion trigger button.",
    priority: 2,
    effort: "Medium",
    apps: ["forge"],
  },

  // ─── Ledger-specific gaps ─────────────────────────────────
  {
    type: "Metric Card",
    components: ["ServiceLineCard"],
    description: "Card with title, key metrics, and optional mini-chart slot.",
    priority: 1,
    effort: "Small",
    apps: ["ledger"],
  },
  {
    type: "Data Source Indicator",
    components: ["DataSourceIndicator"],
    description: "Popover showing data attribution and sync status.",
    priority: 1,
    effort: "Small",
    apps: ["ledger"],
  },
  {
    type: "Chart – Composed",
    components: ["ProfitChart", "CostChart"],
    description: "Mixed bar + line chart with dual Y-axes.",
    priority: 2,
    effort: "Medium",
    apps: ["ledger"],
  },
]

const priorityLabels = {
  1: "High — Foundational",
  2: "Medium — Chart Patterns",
  3: "Lower — Specialized",
}

const priorityColors = {
  1: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  2: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  3: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
}

const effortColors = {
  Small: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  Medium: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  Large: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
}

const appBadgeColors: Record<AppSource, string> = {
  immersion: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
  forge: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  ledger: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400",
}

const appShortLabels: Record<AppSource, string> = {
  immersion: "Immersion",
  forge: "Forge",
  ledger: "Ledger",
}

export function GapOverview({
  components,
  selectedApp,
}: {
  components: AuditComponent[]
  selectedApp: AppSource | "all"
}) {
  const t2Count = components.filter((c) => c.tier === "T2").length

  const filteredGroups =
    selectedApp === "all"
      ? gapGroups
      : gapGroups.filter((g) => g.apps.includes(selectedApp))

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">
          T2 Gap Analysis — {filteredGroups.length} Component Types to Build
        </h3>
        <p className="text-sm text-muted-foreground">
          {t2Count} component instances across {filteredGroups.length} reusable
          patterns. Building these in @repo/ui will cover all presentational
          gaps.
        </p>
      </div>

      {([1, 2, 3] as const).map((priority) => {
        const priorityGroups = filteredGroups.filter(
          (g) => g.priority === priority,
        )
        if (priorityGroups.length === 0) return null
        return (
          <div key={priority} className="space-y-3">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Priority {priority}: {priorityLabels[priority]}
            </h4>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {priorityGroups.map((group) => (
                <Card key={group.type}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm">{group.type}</CardTitle>
                      <div className="flex gap-1.5">
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${priorityColors[group.priority]}`}
                        >
                          P{group.priority}
                        </span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${effortColors[group.effort]}`}
                        >
                          {group.effort}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-xs text-muted-foreground">
                      {group.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {group.components.map((name) => (
                        <Badge
                          key={name}
                          variant="secondary"
                          className="text-[10px]"
                        >
                          {name}
                        </Badge>
                      ))}
                    </div>
                    {selectedApp === "all" && group.apps.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {group.apps.map((app) => (
                          <span
                            key={app}
                            className={`rounded-full px-1.5 py-0.5 text-[9px] font-medium ${appBadgeColors[app]}`}
                          >
                            {appShortLabels[app]}
                          </span>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
