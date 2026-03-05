import { Archive, Folder, FileText, Share2, Search } from "lucide-react"
import { Container } from "@repo/ui/components/ui/container"
import { PageHeader } from "@repo/ui/patterns/navigation/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/ui/card"

const capabilities = [
  { icon: Folder, title: "Brand Library", description: "Organized storage for logos, brand guidelines, and identity assets." },
  { icon: FileText, title: "Template Management", description: "Maintain and distribute approved templates across the organization." },
  { icon: Search, title: "Smart Search", description: "Find any asset instantly with AI-powered tagging and metadata search." },
  { icon: Share2, title: "Asset Distribution", description: "Securely share assets with clients, partners, and internal teams." },
]

export default function VaultPage() {
  return (
    <Container className="py-8 space-y-8">
      <PageHeader
        title="Vault"
        description="Centralized asset management for brand materials, templates, and media files."
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
          <Archive className="size-7 text-muted-foreground" />
        </div>
        <p className="text-lg font-semibold">Vault is coming soon</p>
        <p className="max-w-sm text-sm text-muted-foreground">
          Centralized brand asset management and distribution will be available in a future release.
        </p>
      </div>
    </Container>
  )
}
