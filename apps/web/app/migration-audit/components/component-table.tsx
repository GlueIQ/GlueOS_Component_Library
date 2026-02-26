"use client"

import * as React from "react"
import { Badge } from "@repo/ui/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/ui/tabs"
import { Input } from "@repo/ui/components/ui/input"
import {
  type AuditComponent,
  type MigrationTier,
  tierColors,
  appLabels,
  appColors,
} from "../data"
import { UiKitPreview, hasPreview } from "./ui-kit-preview"

interface TierCounts {
  T1: number
  T2: number
  T3: number
  total: number
}

function TierBadge({ tier }: { tier: MigrationTier }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${tierColors[tier]}`}
    >
      {tier}
    </span>
  )
}

function AppBadge({ app }: { app: AuditComponent["app"] }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${appColors[app]}`}
    >
      {appLabels[app].replace("GlueIQ ", "")}
    </span>
  )
}

function ComponentRow({
  component,
  showApp,
}: {
  component: AuditComponent
  showApp: boolean
}) {
  const showPreview =
    component.tier === "T1" && hasPreview(component.uiKitMapping ?? "")

  return (
    <TableRow>
      <TableCell className="font-medium text-sm">
        {component.name}
        <div className="text-xs text-muted-foreground mt-0.5 font-normal">
          {component.sourcePath}
        </div>
      </TableCell>
      {showApp && (
        <TableCell>
          <AppBadge app={component.app} />
        </TableCell>
      )}
      <TableCell>
        <Badge variant="outline" className="text-xs font-normal">
          {component.category}
        </Badge>
      </TableCell>
      <TableCell className="text-sm">{component.uiSystemType}</TableCell>
      <TableCell>
        <TierBadge tier={component.tier} />
      </TableCell>
      <TableCell className="text-sm">
        {component.uiKitMapping ?? (
          <span className="text-muted-foreground">—</span>
        )}
      </TableCell>
      <TableCell className="text-xs text-muted-foreground">
        {component.usage}
      </TableCell>
      <TableCell className="min-w-48">
        {showPreview ? (
          <UiKitPreview componentName={component.uiKitMapping!} />
        ) : component.tier === "T2" ? (
          <span className="inline-flex items-center rounded border border-amber-200 bg-amber-50 px-2 py-1 text-xs text-amber-700 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-400">
            Gap — needs UI Kit component
          </span>
        ) : null}
      </TableCell>
    </TableRow>
  )
}

function FilteredTable({
  components,
  showApp,
}: {
  components: AuditComponent[]
  showApp: boolean
}) {
  const [search, setSearch] = React.useState("")

  const filtered = React.useMemo(() => {
    if (!search) return components
    const q = search.toLowerCase()
    return components.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.uiSystemType.toLowerCase().includes(q) ||
        (c.uiKitMapping?.toLowerCase().includes(q) ?? false),
    )
  }, [components, search])

  return (
    <div className="space-y-3">
      <Input
        placeholder="Search components..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      />
      <div className="rounded-md border overflow-x-auto">
        <Table className="w-full table-auto">
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-52">Component</TableHead>
              {showApp && <TableHead className="min-w-24">App</TableHead>}
              <TableHead className="min-w-28">Category</TableHead>
              <TableHead className="min-w-36">UI System Type</TableHead>
              <TableHead className="min-w-16">Tier</TableHead>
              <TableHead className="min-w-40">@repo/ui Mapping</TableHead>
              <TableHead>Usage</TableHead>
              <TableHead className="min-w-48">Preview</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((c) => (
              <ComponentRow key={`${c.app}-${c.id}`} component={c} showApp={showApp} />
            ))}
          </TableBody>
        </Table>
      </div>
      <p className="text-xs text-muted-foreground">
        Showing {filtered.length} of {components.length} components
      </p>
    </div>
  )
}

export function ComponentTable({
  components,
  counts,
  showApp = false,
}: {
  components: AuditComponent[]
  counts: TierCounts
  showApp?: boolean
}) {
  return (
    <Tabs defaultValue="all">
      <TabsList>
        <TabsTrigger value="all">
          All ({counts.total})
        </TabsTrigger>
        <TabsTrigger value="T1">
          T1 Covered ({counts.T1})
        </TabsTrigger>
        <TabsTrigger value="T2">
          T2 Gaps ({counts.T2})
        </TabsTrigger>
        <TabsTrigger value="T3">
          T3 App ({counts.T3})
        </TabsTrigger>
      </TabsList>
      <TabsContent value="all" className="mt-4">
        <FilteredTable components={components} showApp={showApp} />
      </TabsContent>
      <TabsContent value="T1" className="mt-4">
        <FilteredTable
          components={components.filter((c) => c.tier === "T1")}
          showApp={showApp}
        />
      </TabsContent>
      <TabsContent value="T2" className="mt-4">
        <FilteredTable
          components={components.filter((c) => c.tier === "T2")}
          showApp={showApp}
        />
      </TabsContent>
      <TabsContent value="T3" className="mt-4">
        <FilteredTable
          components={components.filter((c) => c.tier === "T3")}
          showApp={showApp}
        />
      </TabsContent>
    </Tabs>
  )
}
