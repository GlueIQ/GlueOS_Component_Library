/**
 * ExpandableTable Pattern
 *
 * A table with expandable detail rows.
 * Composed of: Table, Button from our component library
 * Normalized: 2025-02 — relative imports, semantic tokens
 */

"use client"

import * as React from "react"
import { cn } from "../../../lib/utils"
import { Button } from "../../../components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table"

export interface ExpandableColumn<T> {
  key: string
  header: string
  render?: (row: T) => React.ReactNode
}

interface ExpandableTableProps<T> extends React.ComponentProps<"div"> {
  columns: ExpandableColumn<T>[]
  data: T[]
  getRowId: (row: T) => string
  renderExpanded: (row: T) => React.ReactNode
}

function ChevronIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      className={cn(
        "size-4 transition-transform",
        expanded && "rotate-90"
      )}
    >
      <path fillRule="evenodd" d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
    </svg>
  )
}

export function ExpandableTable<T extends Record<string, unknown>>({
  columns,
  data,
  getRowId,
  renderExpanded,
  className,
  ...props
}: ExpandableTableProps<T>) {
  const [expanded, setExpanded] = React.useState<Set<string>>(new Set())

  const toggle = (id: string) => {
    const next = new Set(expanded)
    if (next.has(id)) {
      next.delete(id)
    } else {
      next.add(id)
    }
    setExpanded(next)
  }

  return (
    <div className={cn("rounded-md border", className)} {...props}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12" />
            {columns.map((col) => (
              <TableHead key={col.key}>{col.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => {
            const id = getRowId(row)
            const isExpanded = expanded.has(id)
            return (
              <React.Fragment key={id}>
                <TableRow>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="size-8 p-0"
                      onClick={() => toggle(id)}
                      aria-label={isExpanded ? "Collapse row" : "Expand row"}
                    >
                      <ChevronIcon expanded={isExpanded} />
                    </Button>
                  </TableCell>
                  {columns.map((col) => (
                    <TableCell key={col.key}>
                      {col.render ? col.render(row) : String(row[col.key] ?? "")}
                    </TableCell>
                  ))}
                </TableRow>
                {isExpanded && (
                  <TableRow>
                    <TableCell colSpan={columns.length + 1} className="bg-muted/50 p-4">
                      {renderExpanded(row)}
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
