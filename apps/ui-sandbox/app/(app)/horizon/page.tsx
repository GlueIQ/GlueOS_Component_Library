import { Compass, Target, GitBranch, Users, TrendingUp } from "lucide-react"
import { Container } from "@repo/ui/components/ui/container"
import { PageHeader } from "@repo/ui/patterns/navigation/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/ui/card"

const capabilities = [
  { icon: Target, title: "Initiative Tracker", description: "Plan and track strategic initiatives with milestones and owners." },
  { icon: GitBranch, title: "Scenario Planning", description: "Model strategic scenarios and evaluate trade-offs across initiatives." },
  { icon: Users, title: "Team Alignment", description: "Surface cross-functional dependencies and alignment gaps." },
  { icon: TrendingUp, title: "Progress Reporting", description: "Automated progress reports delivered to stakeholders on schedule." },
]

export default function HorizonPage() {
  return (
    <Container className="py-8 space-y-8">
      <PageHeader
        title="Horizon"
        description="Strategic initiative planning, tracking, and alignment across the organization."
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
          <Compass className="size-7 text-muted-foreground" />
        </div>
        <p className="text-lg font-semibold">Horizon is coming soon</p>
        <p className="max-w-sm text-sm text-muted-foreground">
          Strategic initiative planning and organizational alignment will be available in a future release.
        </p>
      </div>
    </Container>
  )
}
