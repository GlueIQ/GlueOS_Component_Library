"use client"

import { TrendingUp, BarChart3, Zap, BrainCircuit } from "lucide-react"

import { Container } from "@__SCOPE__/ui/components/ui/container"
import { Button } from "@__SCOPE__/ui/components/ui/button"
import { Badge } from "@__SCOPE__/ui/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@__SCOPE__/ui/components/ui/card"
import { Separator } from "@__SCOPE__/ui/components/ui/separator"
import { PageHeader } from "@__SCOPE__/ui/patterns/navigation/page-header"
import { StatsGrid } from "@__SCOPE__/ui/patterns/data-visualization/stats-grid"
import { ChartAreaInteractive } from "@__SCOPE__/ui/patterns/data-visualization/chart-area-interactive"

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

const stats = [
  {
    label: "Q1 Pipeline Forecast",
    value: "$8.1M",
    icon: <TrendingUp className="size-4" />,
    trend: { value: 12, label: "vs last quarter" },
  },
  {
    label: "Forecast Accuracy",
    value: "91%",
    icon: <BarChart3 className="size-4" />,
    trend: { value: 3, label: "vs model v2" },
  },
  {
    label: "Demand Signal",
    value: "↑ Strong",
    icon: <Zap className="size-4" />,
    description: "7 active signals detected",
  },
  {
    label: "Model Confidence",
    value: "High",
    icon: <BrainCircuit className="size-4" />,
    description: "P90 range: $7.4M–$8.8M",
  },
]

const forecastData = [
  { month: "Jul", actuals: 5200, forecast: 5150 },
  { month: "Aug", actuals: 5800, forecast: 5600 },
  { month: "Sep", actuals: 6100, forecast: 5900 },
  { month: "Oct", actuals: 6800, forecast: 6500 },
  { month: "Nov", actuals: 7200, forecast: 7000 },
  { month: "Dec", actuals: 7600, forecast: 7400 },
  { month: "Jan", actuals: 7900, forecast: 7800 },
  { month: "Feb", actuals: 8050, forecast: 8100 },
  { month: "Mar", actuals: 8350, forecast: 8400 },
]

const forecastSeries = [
  { dataKey: "actuals", label: "Actuals", color: "var(--chart-1)" },
  { dataKey: "forecast", label: "Forecast", color: "var(--chart-2)" },
]

interface DemandSignal {
  id: string
  signal: string
  source: string
  direction: "up" | "down" | "neutral"
  detected: string
  impact: "High" | "Medium" | "Low"
}

const demandSignals: DemandSignal[] = [
  { id: "1", signal: "Paid Search intent volume up 28%", source: "Google Trends", direction: "up", detected: "Jan 14", impact: "High" },
  { id: "2", signal: "Competitor CPM rising — auction pressure increasing", source: "Platform Data", direction: "down", detected: "Jan 13", impact: "High" },
  { id: "3", signal: "Industry event driving 40% spike in category searches", source: "SEMrush", direction: "up", detected: "Jan 12", impact: "Medium" },
  { id: "4", signal: "Email engagement plateauing across nurture cohort", source: "Marketo", direction: "down", detected: "Jan 11", impact: "Medium" },
  { id: "5", signal: "LinkedIn audience size expanded 15% in ICP segment", source: "LinkedIn API", direction: "up", detected: "Jan 10", impact: "Low" },
]

const impactStyles: Record<string, string> = {
  High: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800",
  Medium: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800",
  Low: "bg-zinc-100 text-zinc-600 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700",
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function ZoltarPage() {
  return (
    <Container className="py-8 space-y-8">
      <PageHeader
        title="Pipeline Forecast"
        description="AI-driven pipeline forecasts with confidence intervals and demand signals."
        actions={<Button>Run Scenario</Button>}
      />

      {/* Forecast Signal */}
      <div className="rounded-lg border border-violet-200 bg-violet-50 px-4 py-3 dark:border-violet-800 dark:bg-violet-950/40">
        <div className="flex items-start gap-3">
          <BrainCircuit className="mt-0.5 size-4 shrink-0 text-violet-600 dark:text-violet-400" />
          <div>
            <span className="text-xs font-semibold uppercase tracking-wide text-violet-600 dark:text-violet-400">
              Forecast Signal
            </span>
            <p className="mt-0.5 text-sm leading-relaxed text-violet-900 dark:text-violet-200">
              Zoltar is detecting 7 active demand signals with high model confidence — Q1 pipeline is forecast at $8.1M, trending 12% above last quarter. Paid Search intent volume spiked 28% this week, while rising competitor CPM is compressing auction efficiency. Consider running a scenario to model the impact of reallocating 15% of Paid Social budget to Paid Search.
            </p>
          </div>
        </div>
      </div>

      <StatsGrid stats={stats} columns={4} />

      <ChartAreaInteractive
        title="Forecast vs. Actuals"
        description="Cumulative pipeline — actuals to date vs. Zoltar model forecast ($K)"
        data={forecastData}
        series={forecastSeries}
        xAxisKey="month"
      />

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <div>
              <CardTitle>Top Demand Signals</CardTitle>
              <CardDescription>
                Market and platform signals influencing the pipeline forecast
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="shrink-0">Build Response Playbook</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            {demandSignals.map((s, i) => (
              <div key={s.id}>
                <div className="flex items-center justify-between gap-4 py-3 px-2 -mx-2 rounded-md hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-base shrink-0">
                      {s.direction === "up" ? "↑" : s.direction === "down" ? "↓" : "→"}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{s.signal}</p>
                      <p className="text-xs text-muted-foreground">{s.source} · {s.detected}</p>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={`shrink-0 ${impactStyles[s.impact]}`}
                  >
                    {s.impact}
                  </Badge>
                </div>
                {i < demandSignals.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </Container>
  )
}
