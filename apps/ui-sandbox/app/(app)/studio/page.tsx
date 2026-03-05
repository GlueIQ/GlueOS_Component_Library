import { Palette, Image, CheckSquare, GitBranch, Clock } from "lucide-react"
import { Container } from "@repo/ui/components/ui/container"
import { PageHeader } from "@repo/ui/patterns/navigation/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/ui/card"

const capabilities = [
  { icon: Image, title: "Asset Library", description: "Centralized hub for all creative assets with tagging and search." },
  { icon: CheckSquare, title: "Creative Reviews", description: "Structured review and approval workflows with stakeholder feedback." },
  { icon: GitBranch, title: "Version Control", description: "Track revisions and maintain a complete history of creative work." },
  { icon: Clock, title: "Production Tracking", description: "Monitor creative production timelines and delivery milestones." },
]

export default function StudioPage() {
  return (
    <Container className="py-8 space-y-8">
      <PageHeader
        title="Studio"
        description="Creative operations hub for managing assets, reviews, and production workflows."
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
          <Palette className="size-7 text-muted-foreground" />
        </div>
        <p className="text-lg font-semibold">Studio is coming soon</p>
        <p className="max-w-sm text-sm text-muted-foreground">
          Creative operations and production workflow management will be available in a future release.
        </p>
      </div>
    </Container>
  )
}
