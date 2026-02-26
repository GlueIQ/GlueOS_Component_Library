/**
 * ContentFilters Pattern
 *
 * An inline filter bar with search, status select, and clear action.
 * Composed of: Input, Select, Button from our component library
 * Normalized: 2025-02 — relative imports, semantic tokens
 */

import { cn } from "../../../lib/utils"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select"

interface FilterOption {
  label: string
  value: string
}

interface ContentFiltersProps extends React.ComponentProps<"div"> {
  searchPlaceholder?: string
  statusOptions?: FilterOption[]
  onSearchChange?: (value: string) => void
  onStatusChange?: (value: string) => void
  onClear?: () => void
}

const defaultStatusOptions: FilterOption[] = [
  { label: "Published", value: "published" },
  { label: "Draft", value: "draft" },
  { label: "Archived", value: "archived" },
]

export function ContentFilters({
  searchPlaceholder = "Search...",
  statusOptions = defaultStatusOptions,
  onSearchChange,
  onStatusChange,
  onClear,
  className,
  ...props
}: ContentFiltersProps) {
  return (
    <div
      className={cn("flex flex-wrap items-center gap-2", className)}
      {...props}
    >
      <Input
        placeholder={searchPlaceholder}
        className="h-9 w-[200px] lg:w-[280px]"
        onChange={(e) => onSearchChange?.(e.target.value)}
      />
      <Select onValueChange={onStatusChange}>
        <SelectTrigger className="h-9 w-[140px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          {statusOptions.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {onClear && (
        <Button variant="ghost" size="sm" className="h-9" onClick={onClear}>
          Clear
        </Button>
      )}
    </div>
  )
}
