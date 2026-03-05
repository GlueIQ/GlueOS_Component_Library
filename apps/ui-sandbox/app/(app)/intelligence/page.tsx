import { TrendingUp, BarChart3, PieChart, Layers, GitMerge } from "lucide-react"
import { Container } from "@repo/ui/components/ui/container"
import { PageHeader } from "@repo/ui/patterns/navigation/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/ui/card"

const capabilities = [
  { icon: BarChart3, title: "Campaign Analytics", description: "End-to-end performance tracking for every campaign across all channels." },
  { icon: PieChart, title: "Channel Performance", description: "Comparative analysis across paid, organic, social, and owned channels." },
  { icon: Layers, title: "Client Reporting", description: "Branded, automated reporting delivered directly to client stakeholders." },
  { icon: GitMerge, title: "Attribution Modeling", description: "Multi-touch attribution to understand what's actually driving results." },
]

export default function IntelligencePage() {
  return (
    <Container className="py-8 space-y-8">
      <PageHeader
        title="Intelligence"
        description="Performance analytics and reporting across campaigns, channels, and clients."
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
          <TrendingUp className="size-7 text-muted-foreground" />
        </div>
        <p className="text-lg font-semibold">Intelligence is coming soon</p>
        <p className="max-w-sm text-sm text-muted-foreground">
          Cross-channel performance analytics and automated client reporting will be available in a future release.
        </p>
      </div>
    </Container>
  )
}
