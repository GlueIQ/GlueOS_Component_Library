import { Heading } from "@repo/ui/components/ui/heading"
import { Text } from "@repo/ui/components/ui/text"
import { CoverageStats } from "./components/coverage-stats"
import { ComponentTable } from "./components/component-table"
import { GapOverview } from "./components/gap-overview"

export default function MigrationAuditPage() {
  return (
    <div className="w-full py-8 space-y-8">
      {/* Header */}
      <div>
        <Heading level={2}>Migration Audit: GlueIQ Immersion</Heading>
        <Text variant="muted">
          Component coverage analysis against @repo/ui — identifying what&apos;s
          covered, what needs to be built, and what stays app-specific.
        </Text>
      </div>

      {/* Stats Cards */}
      <CoverageStats />

      {/* Gap Overview */}
      <GapOverview />

      {/* Full Component Table */}
      <div className="space-y-3">
        <div>
          <Heading level={3}>Full Component Inventory</Heading>
          <Text variant="muted" className="text-sm">
            All 165 components from the Immersion app. Filter by migration tier
            to focus on what matters.
          </Text>
        </div>
        <ComponentTable />
      </div>
    </div>
  )
}
