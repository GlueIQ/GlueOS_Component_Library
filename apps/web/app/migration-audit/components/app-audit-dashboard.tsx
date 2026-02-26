"use client"

import * as React from "react"
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/ui/tabs"
import { Heading } from "@repo/ui/components/ui/heading"
import { Text } from "@repo/ui/components/ui/text"
import {
  type AppSource,
  appLabels,
  getByApp,
  getAppTierCounts,
  auditComponents,
} from "../data"
import { CoverageStats } from "./coverage-stats"
import { ComponentTable } from "./component-table"
import { GapOverview } from "./gap-overview"

type AppFilter = AppSource | "all"

export function AppAuditDashboard() {
  const [selectedApp, setSelectedApp] = React.useState<AppFilter>("all")

  const components =
    selectedApp === "all" ? auditComponents : getByApp(selectedApp)
  const counts = selectedApp === "all" ? getAppTierCounts() : getAppTierCounts(selectedApp)

  return (
    <div className="space-y-8">
      {/* App Selector */}
      <Tabs
        value={selectedApp}
        onValueChange={(v) => setSelectedApp(v as AppFilter)}
      >
        <TabsList>
          <TabsTrigger value="all">
            All Apps ({auditComponents.length})
          </TabsTrigger>
          {(["immersion", "forge", "ledger"] as AppSource[]).map((app) => (
            <TabsTrigger key={app} value={app}>
              {appLabels[app]} ({getByApp(app).length})
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Stats Cards */}
      <CoverageStats counts={counts} />

      {/* Gap Overview */}
      <GapOverview components={components} selectedApp={selectedApp} />

      {/* Full Component Table */}
      <div className="space-y-3">
        <div>
          <Heading level={3}>Full Component Inventory</Heading>
          <Text variant="muted" className="text-sm">
            {components.length} components
            {selectedApp !== "all" ? ` from ${appLabels[selectedApp]}` : " across all apps"}
            . Filter by migration tier to focus on what matters.
          </Text>
        </div>
        <ComponentTable
          components={components}
          counts={counts}
          showApp={selectedApp === "all"}
        />
      </div>
    </div>
  )
}
