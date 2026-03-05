import { BrainCircuit, TrendingUp, Shuffle, Lightbulb, AlertCircle } from "lucide-react"
import { Container } from "@repo/ui/components/ui/container"
import { PageHeader } from "@repo/ui/patterns/navigation/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/ui/card"

const capabilities = [
  { icon: TrendingUp, title: "Revenue Forecasting", description: "ML-driven revenue and pipeline forecasts with confidence intervals." },
  { icon: Shuffle, title: "Scenario Modeling", description: "Run what-if scenarios across budget, headcount, and market conditions." },
  { icon: Lightbulb, title: "Trend Prediction", description: "Surface emerging trends before they impact your business." },
  { icon: AlertCircle, title: "Risk Signals", description: "Early-warning indicators for client churn, margin erosion, and capacity." },
]

export default function ZoltarPage() {
  return (
    <Container className="py-8 space-y-8">
      <PageHeader
        title="Zoltar"
        description="Predictive forecasting and scenario planning powered by machine learning."
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
          <BrainCircuit className="size-7 text-muted-foreground" />
        </div>
        <p className="text-lg font-semibold">Zoltar is coming soon</p>
        <p className="max-w-sm text-sm text-muted-foreground">
          Predictive forecasting and ML-powered scenario planning will be available in a future release.
        </p>
      </div>
    </Container>
  )
}
