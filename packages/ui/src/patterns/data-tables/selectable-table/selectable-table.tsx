/**
 * SelectableTable Pattern
 *
 * A table with checkbox row selection and bulk actions.
 * Composed of: Table, Checkbox, Button from our component library
 * Normalized: 2025-02 — relative imports, semantic tokens
 */

"use client"

import * as React from "react"
import { cn } from "../../../lib/utils"
import { Button } from "../../../components/ui/button"
import { Checkbox } from "../../../components/ui/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table"

export interface SelectableColumn<T> {
  key: string
  header: string
  render?: (row: T) => React.ReactNode
}

interface SelectableTableProps<T> extends React.ComponentProps<"div"> {
  columns: SelectableColumn<T>[]
  data: T[]
  getRowId: (row: T) => string
  bulkActions?: { label: string; onClick: (selectedIds: string[]) => void; variant?: "default" | "destructive" }[]
}

export function SelectableTable<T extends Record<string, unknown>>({
  columns,
  data,
  getRowId,
  bulkActions = [],
  className,
  ...props
}: SelectableTableProps<T>) {
  const [selected, setSelected] = React.useState<Set<string>>(new Set())

  const allIds = data.map(getRowId)
  const allSelected = allIds.length > 0 && allIds.every((id) => selected.has(id))
  const someSelected = allIds.some((id) => selected.has(id))

  const toggleAll = () => {
    if (allSelected) {
      setSelected(new Set())
    } else {
      setSelected(new Set(allIds))
    }
  }

  const toggleRow = (id: string) => {
    const next = new Set(selected)
    if (next.has(id)) {
      next.delete(id)
    } else {
      next.add(id)
    }
    setSelected(next)
  }

  return (
    <div className={cn("space-y-4", className)} {...props}>
      {/* Bulk actions bar */}
      {someSelected && bulkActions.length > 0 && (
        <div className="flex items-center gap-2 rounded-md border bg-muted/50 px-4 py-2">
          <span className="text-sm font-medium">
            {selected.size} selected
          </span>
          <div className="ml-auto flex gap-2">
            {bulkActions.map((action) => (
              <Button
                key={action.label}
                variant={action.variant === "destructive" ? "destructive" : "outline"}
                size="sm"
                onClick={() => action.onClick(Array.from(selected))}
              >
                {action.label}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={allSelected ? true : someSelected ? "indeterminate" : false}
                  onCheckedChange={toggleAll}
                  aria-label="Select all"
                />
              </TableHead>
              {columns.map((col) => (
                <TableHead key={col.key}>{col.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => {
              const id = getRowId(row)
              return (
                <TableRow key={id} data-state={selected.has(id) ? "selected" : undefined}>
                  <TableCell>
                    <Checkbox
                      checked={selected.has(id)}
                      onCheckedChange={() => toggleRow(id)}
                      aria-label={`Select row ${id}`}
                    />
                  </TableCell>
                  {columns.map((col) => (
                    <TableCell key={col.key}>
                      {col.render ? col.render(row) : String(row[col.key] ?? "")}
                    </TableCell>
                  ))}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
