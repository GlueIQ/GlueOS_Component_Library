/**
 * SortableTable Pattern
 *
 * A table with clickable column headers for sorting.
 * Composed of: Table, Button from our component library
 * Normalized: 2025-02 — relative imports, semantic tokens
 */

"use client"

import * as React from "react"
import { cn } from "../../../lib/utils"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table"

export interface SortableColumn<T> {
  key: string
  header: string
  sortable?: boolean
  render?: (row: T) => React.ReactNode
}

type SortDirection = "asc" | "desc" | null

interface SortableTableProps<T> extends React.ComponentProps<"div"> {
  columns: SortableColumn<T>[]
  data: T[]
}

function SortIcon({ direction }: { direction: SortDirection }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      className={cn("ml-1 inline-block size-3.5", !direction && "opacity-30")}
    >
      {direction === "asc" ? (
        <path fillRule="evenodd" d="M8 14a.75.75 0 0 1-.75-.75V4.56L4.03 7.78a.75.75 0 0 1-1.06-1.06l4.5-4.5a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06L8.75 4.56v8.69A.75.75 0 0 1 8 14Z" clipRule="evenodd" />
      ) : direction === "desc" ? (
        <path fillRule="evenodd" d="M8 2a.75.75 0 0 1 .75.75v8.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.22 3.22V2.75A.75.75 0 0 1 8 2Z" clipRule="evenodd" />
      ) : (
        <path d="M8 3.5a.75.75 0 0 1 .55.24l2.5 2.75a.75.75 0 0 1-1.1 1.02L8 5.32 6.05 7.51a.75.75 0 0 1-1.1-1.02l2.5-2.75A.75.75 0 0 1 8 3.5ZM5.05 9.49a.75.75 0 0 1 1-.1L8 11.68l1.95-2.19a.75.75 0 1 1 1.1 1.02l-2.5 2.75a.75.75 0 0 1-1.1 0l-2.5-2.75a.75.75 0 0 1 .1-1.02Z" />
      )}
    </svg>
  )
}

export function SortableTable<T extends Record<string, unknown>>({
  columns,
  data,
  className,
  ...props
}: SortableTableProps<T>) {
  const [sortKey, setSortKey] = React.useState<string | null>(null)
  const [sortDir, setSortDir] = React.useState<SortDirection>(null)

  const sorted = React.useMemo(() => {
    if (!sortKey || !sortDir) return data
    return [...data].sort((a, b) => {
      const aVal = String(a[sortKey] ?? "")
      const bVal = String(b[sortKey] ?? "")
      const cmp = aVal.localeCompare(bVal, undefined, { numeric: true })
      return sortDir === "asc" ? cmp : -cmp
    })
  }, [data, sortKey, sortDir])

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : d === "desc" ? null : "asc"))
      if (sortDir === "desc") setSortKey(null)
    } else {
      setSortKey(key)
      setSortDir("asc")
    }
  }

  return (
    <div className={cn("rounded-md border", className)} {...props}>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead
                key={col.key}
                className={col.sortable !== false ? "cursor-pointer select-none" : ""}
                onClick={() => col.sortable !== false && handleSort(col.key)}
              >
                {col.header}
                {col.sortable !== false && (
                  <SortIcon direction={sortKey === col.key ? sortDir : null} />
                )}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sorted.map((row, i) => (
            <TableRow key={i}>
              {columns.map((col) => (
                <TableCell key={col.key}>
                  {col.render ? col.render(row) : String(row[col.key] ?? "")}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
