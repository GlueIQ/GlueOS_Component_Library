import { Megaphone, Workflow, Users, Radio, CheckSquare } from "lucide-react"
import { Container } from "@repo/ui/components/ui/container"
import { PageHeader } from "@repo/ui/patterns/navigation/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/ui/card"

const capabilities = [
  { icon: Workflow, title: "Campaign Workflows", description: "Visual workflow builder for multi-step campaign execution." },
  { icon: Users, title: "Team Coordination", description: "Assign tasks, set deadlines, and track team progress in one place." },
  { icon: Radio, title: "Channel Management", description: "Coordinate activation across paid, owned, and earned channels." },
  { icon: CheckSquare, title: "Launch Checklists", description: "Standardized go-live checklists to ensure nothing gets missed." },
]

export default function OrchestratePage() {
  return (
    <Container className="py-8 space-y-8">
      <PageHeader
        title="Orchestrate"
        description="Campaign operations and workflow orchestration across teams and channels."
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
          <Megaphone className="size-7 text-muted-foreground" />
        </div>
        <p className="text-lg font-semibold">Orchestrate is coming soon</p>
        <p className="max-w-sm text-sm text-muted-foreground">
          Campaign workflow orchestration and multi-channel coordination will be available in a future release.
        </p>
      </div>
    </Container>
  )
}
