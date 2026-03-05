import { SlidersHorizontal, FlaskConical, DollarSign, Lightbulb, Bell } from "lucide-react"
import { Container } from "@repo/ui/components/ui/container"
import { PageHeader } from "@repo/ui/patterns/navigation/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/ui/card"

const capabilities = [
  { icon: FlaskConical, title: "A/B Testing", description: "Design, run, and analyze experiments across campaigns and channels." },
  { icon: DollarSign, title: "Budget Optimizer", description: "AI-driven budget allocation recommendations to maximize ROI." },
  { icon: Lightbulb, title: "AI Recommendations", description: "Actionable optimization suggestions surfaced from performance data." },
  { icon: Bell, title: "Performance Alerts", description: "Real-time notifications when metrics drift outside target thresholds." },
]

export default function OptimizePage() {
  return (
    <Container className="py-8 space-y-8">
      <PageHeader
        title="Optimize"
        description="Performance optimization with A/B testing, budget allocation, and AI recommendations."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {capabilities.map((c) => (
          <Card key={c.title} className="border-dashed opacity-60">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                  <c.icon className="size-4 text-muted-foreground" />
                </div>
                <CardTitle className="text-sm">{c.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground leading-relaxed">{c.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed py-20 text-center">
        <div className="flex size-14 items-center justify-center rounded-full bg-muted">
          <SlidersHorizontal className="size-7 text-muted-foreground" />
        </div>
        <p className="text-lg font-semibold">Optimize is coming soon</p>
        <p className="max-w-sm text-sm text-muted-foreground">
          AI-powered performance optimization and budget management will be available in a future release.
        </p>
      </div>
    </Container>
  )
}
