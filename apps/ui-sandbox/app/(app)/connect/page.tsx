import { Link, Plug, ArrowLeftRight, Database, ShieldCheck } from "lucide-react"
import { Container } from "@repo/ui/components/ui/container"
import { PageHeader } from "@repo/ui/patterns/navigation/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/ui/card"

const capabilities = [
  { icon: Plug, title: "API Integrations", description: "Connect to 100+ platforms including Google, Meta, Salesforce, and HubSpot." },
  { icon: ArrowLeftRight, title: "Data Pipelines", description: "Automated data flows to keep your platform sources in sync." },
  { icon: Database, title: "Data Warehouse", description: "Unified data layer powering analytics across the GlueOS platform." },
  { icon: ShieldCheck, title: "Data Quality", description: "Monitoring and validation to ensure data accuracy and completeness." },
]

export default function ConnectPage() {
  return (
    <Container className="py-8 space-y-8">
      <PageHeader
        title="Connect"
        description="Data integration hub connecting third-party platforms, APIs, and data sources."
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
          <Link className="size-7 text-muted-foreground" />
        </div>
        <p className="text-lg font-semibold">Connect is coming soon</p>
        <p className="max-w-sm text-sm text-muted-foreground">
          Data integration pipelines and third-party platform connections will be available in a future release.
        </p>
      </div>
    </Container>
  )
}
