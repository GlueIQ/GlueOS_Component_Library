import { Gem, BarChart3, FileText, BrainCircuit, Bell } from "lucide-react"
import { Container } from "@repo/ui/components/ui/container"
import { PageHeader } from "@repo/ui/patterns/navigation/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/ui/card"

const capabilities = [
  { icon: BarChart3, title: "Executive Dashboards", description: "Real-time KPI visibility for leadership across all business units." },
  { icon: FileText, title: "Strategic Reports", description: "AI-generated briefings and narrative reports tailored for the C-suite." },
  { icon: BrainCircuit, title: "AI Insights", description: "Proactive intelligence surfaced from across the GlueOS platform." },
  { icon: Bell, title: "Alert & Signal Center", description: "Threshold alerts and anomaly detection for critical business metrics." },
]

export default function LumenPage() {
  return (
    <Container className="py-8 space-y-8">
      <PageHeader
        title="Lumen"
        description="Executive intelligence and strategic insights for leadership decision-making."
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
          <Gem className="size-7 text-muted-foreground" />
        </div>
        <p className="text-lg font-semibold">Lumen is coming soon</p>
        <p className="max-w-sm text-sm text-muted-foreground">
          Executive intelligence and AI-powered reporting will be available in a future release.
        </p>
      </div>
    </Container>
  )
}
