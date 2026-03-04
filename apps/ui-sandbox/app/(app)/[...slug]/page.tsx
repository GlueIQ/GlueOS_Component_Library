"use client"

import { useActiveModule } from "@repo/ui/layouts/app-shell"
import { Container } from "@repo/ui/components/ui/container"
import { EmptyState } from "@repo/ui/patterns/empty-error-states/empty-state"
import { Construction } from "lucide-react"

export default function PlaceholderPage() {
  const { activeModule } = useActiveModule()

  return (
    <Container className="py-16">
      <EmptyState
        icon={<Construction className="size-12" />}
        title="Coming Soon"
        description={`The ${activeModule.name} module is under development. This page will be available in a future release.`}
      />
    </Container>
  )
}
