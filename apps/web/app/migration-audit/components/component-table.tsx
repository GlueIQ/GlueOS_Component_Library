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
  auditComponents,
  tierColors,
  tierLabels,
  tierCounts,
} from "../data"
import { UiKitPreview, hasPreview } from "./ui-kit-preview"

function TierBadge({ tier }: { tier: MigrationTier }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${tierColors[tier]}`}
    >
      {tier}
    </span>
  )
}

function ComponentRow({ component }: { component: AuditComponent }) {
  const showPreview = component.tier === "T1" && hasPreview(component.uiKitMapping ?? "")

  return (
    <TableRow>
      <TableCell className="font-medium text-sm">
        {component.name}
        <div className="text-xs text-muted-foreground mt-0.5 font-normal">
          {component.sourcePath}
        </div>
      </TableCell>
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

function FilteredTable({ components }: { components: AuditComponent[] }) {
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
              <ComponentRow key={c.id} component={c} />
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

export function ComponentTable() {
  return (
    <Tabs defaultValue="all">
      <TabsList>
        <TabsTrigger value="all">
          All ({tierCounts.total})
        </TabsTrigger>
        <TabsTrigger value="T1">
          T1 Covered ({tierCounts.T1})
        </TabsTrigger>
        <TabsTrigger value="T2">
          T2 Gaps ({tierCounts.T2})
        </TabsTrigger>
        <TabsTrigger value="T3">
          T3 App ({tierCounts.T3})
        </TabsTrigger>
      </TabsList>
      <TabsContent value="all" className="mt-4">
        <FilteredTable components={auditComponents} />
      </TabsContent>
      <TabsContent value="T1" className="mt-4">
        <FilteredTable
          components={auditComponents.filter((c) => c.tier === "T1")}
        />
      </TabsContent>
      <TabsContent value="T2" className="mt-4">
        <FilteredTable
          components={auditComponents.filter((c) => c.tier === "T2")}
        />
      </TabsContent>
      <TabsContent value="T3" className="mt-4">
        <FilteredTable
          components={auditComponents.filter((c) => c.tier === "T3")}
        />
      </TabsContent>
    </Tabs>
  )
}
