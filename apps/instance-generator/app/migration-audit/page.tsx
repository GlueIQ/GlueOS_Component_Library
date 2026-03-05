import { Heading } from "@repo/ui/components/ui/heading"
import { Text } from "@repo/ui/components/ui/text"
import { AppAuditDashboard } from "./components/app-audit-dashboard"

export default function MigrationAuditPage() {
  return (
    <div className="w-full py-8 space-y-8">
      {/* Header */}
      <div>
        <Heading level={2}>Migration Audit</Heading>
        <Text variant="muted">
          Component coverage analysis against @repo/ui across all GlueIQ apps
          &mdash; identifying what&apos;s covered, what needs to be built, and
          what stays app-specific.
        </Text>
      </div>

      {/* Dashboard with app selector */}
      <AppAuditDashboard />
    </div>
  )
}
