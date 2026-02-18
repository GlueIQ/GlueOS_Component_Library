"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card"
import { Badge } from "@repo/ui/components/ui/badge"
import { auditComponents } from "../data"

interface GapGroup {
  type: string
  components: string[]
  description: string
  priority: 1 | 2 | 3
  effort: "Small" | "Medium" | "Large"
}

const gapGroups: GapGroup[] = [
  {
    type: "Gauge",
    components: ["SentimentGauge", "AuthorityGauge", "PriceRangeGauge"],
    description: "Semicircular/arc SVG score gauge with color thresholds. Single configurable component covers all three.",
    priority: 1,
    effort: "Medium",
  },
  {
    type: "Scorecard",
    components: ["AIPresenceScorecard", "DigitalScorecard", "CompetitiveScorecard"],
    description: "Grid of KPI metrics with scores, labels, and visual indicators.",
    priority: 1,
    effort: "Medium",
  },
  {
    type: "Feed",
    components: ["MentionFeed"],
    description: "Scrollable feed of items with metadata, icons, and action buttons.",
    priority: 1,
    effort: "Medium",
  },
  {
    type: "Data Card Grid",
    components: ["QuickWinCards", "ConsumerIntentCards", "AdPreviewCards", "QuestionMining", "RisingOpportunities"],
    description: "Responsive grid of structured data cards. Flexible slot-based layout.",
    priority: 1,
    effort: "Medium",
  },
  {
    type: "Status Banner",
    components: ["AnalysisStatusBanner"],
    description: "Colored banner with icon, message, and optional progress bar.",
    priority: 1,
    effort: "Small",
  },
  {
    type: "Status Badge",
    components: ["StatusBadge"],
    description: "Extended Badge with color mapping for workflow states (draft, active, complete, error).",
    priority: 1,
    effort: "Small",
  },
  {
    type: "Tag Input",
    components: ["ToolKeywordInput"],
    description: "Multi-value input with chip/tag display and add/remove.",
    priority: 1,
    effort: "Small",
  },
  {
    type: "App Shell",
    components: ["Shell"],
    description: "Sidebar + top bar + content layout shell with responsive mobile menu.",
    priority: 1,
    effort: "Large",
  },
  {
    type: "Chart – Radar",
    components: ["VisibilityRadarChart", "OpportunityRadar"],
    description: "Radar/spider chart pattern extending the existing recharts foundation.",
    priority: 2,
    effort: "Small",
  },
  {
    type: "Chart – Scatter/Matrix",
    components: ["CompetitiveMatrix", "OpportunityMatrix", "KeywordROIMatrix"],
    description: "Scatter plot with quadrant reference lines and bubble sizing.",
    priority: 2,
    effort: "Medium",
  },
  {
    type: "Chart – Stacked Bar",
    components: ["LinkQualityBars"],
    description: "Stacked bar chart variant of the existing bar chart pattern.",
    priority: 2,
    effort: "Small",
  },
  {
    type: "Chart – Venn",
    components: ["KeywordVenn"],
    description: "Venn diagram for showing overlap between two or three datasets.",
    priority: 2,
    effort: "Medium",
  },
  {
    type: "Preview Card",
    components: ["ToolPreview"],
    description: "Grayscale content card with CTA overlay for upsell/preview states.",
    priority: 3,
    effort: "Small",
  },
  {
    type: "Gallery",
    components: ["CreativeGallery"],
    description: "Image/creative asset gallery grid with lightbox.",
    priority: 3,
    effort: "Medium",
  },
  {
    type: "Hero Module",
    components: ["TrendsHeroModule"],
    description: "Featured content display with embedded chart and key stat.",
    priority: 3,
    effort: "Medium",
  },
  {
    type: "Data Grid",
    components: ["LocalCompetitorGrid", "PlatformDominanceGrid", "TopMarketsGrid"],
    description: "Structured grid for multi-attribute entity display.",
    priority: 3,
    effort: "Medium",
  },
  {
    type: "Ranking",
    components: ["MarketPodium", "LocalRankingCard"],
    description: "Ranked list / podium visualization for top items.",
    priority: 3,
    effort: "Small",
  },
  {
    type: "Feedback Form",
    components: ["FeedbackModal"],
    description: "Modal with type selector, text input, and submission handler.",
    priority: 3,
    effort: "Small",
  },
  {
    type: "Content Card",
    components: ["PromptCard"],
    description: "Card with metadata badges, hover actions, and selection state.",
    priority: 3,
    effort: "Small",
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

export function GapOverview() {
  const t2Count = auditComponents.filter((c) => c.tier === "T2").length

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">
          T2 Gap Analysis — {gapGroups.length} Component Types to Build
        </h3>
        <p className="text-sm text-muted-foreground">
          {t2Count} component instances across {gapGroups.length} reusable patterns.
          Building these in @repo/ui will cover all presentational gaps.
        </p>
      </div>

      {([1, 2, 3] as const).map((priority) => (
        <div key={priority} className="space-y-3">
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Priority {priority}: {priorityLabels[priority]}
          </h4>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {gapGroups
              .filter((g) => g.priority === priority)
              .map((group) => (
                <Card key={group.type}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm">{group.type}</CardTitle>
                      <div className="flex gap-1.5">
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${priorityColors[group.priority]}`}>
                          P{group.priority}
                        </span>
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${effortColors[group.effort]}`}>
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
                        <Badge key={name} variant="secondary" className="text-[10px]">
                          {name}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}
