import { ShieldCheck, AlertTriangle, FileCheck, Eye, ScrollText } from "lucide-react"
import { Container } from "@repo/ui/components/ui/container"
import { PageHeader } from "@repo/ui/patterns/navigation/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/ui/card"

const capabilities = [
  { icon: AlertTriangle, title: "Content Guardrails", description: "Define and enforce AI output boundaries aligned with brand and policy." },
  { icon: FileCheck, title: "Compliance Monitoring", description: "Continuous monitoring for regulatory and legal compliance across outputs." },
  { icon: Eye, title: "Brand Safety", description: "Prevent off-brand, harmful, or sensitive content from reaching audiences." },
  { icon: ScrollText, title: "AI Audit Trail", description: "Full audit log of AI-generated content for accountability and review." },
]

export default function ShieldPage() {
  return (
    <Container className="py-8 space-y-8">
      <PageHeader
        title="Shield"
        description="AI governance, compliance monitoring, and brand safety guardrails."
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
          <ShieldCheck className="size-7 text-muted-foreground" />
        </div>
        <p className="text-lg font-semibold">Shield is coming soon</p>
        <p className="max-w-sm text-sm text-muted-foreground">
          AI governance, compliance monitoring, and brand safety controls will be available in a future release.
        </p>
      </div>
    </Container>
  )
}
