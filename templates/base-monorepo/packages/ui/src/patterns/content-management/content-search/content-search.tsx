/**
 * ContentSearch Pattern
 *
 * A search input with suggestions popover.
 * Composed of: Input, Popover from our component library
 * Normalized: 2025-02 — relative imports, semantic tokens
 */

"use client"

import * as React from "react"
import { cn } from "../../../lib/utils"
import { Input } from "../../../components/ui/input"

export interface SearchSuggestion {
  id: string
  label: string
  description?: string
}

interface ContentSearchProps extends React.ComponentProps<"div"> {
  placeholder?: string
  suggestions?: SearchSuggestion[]
  onSearch?: (query: string) => void
  onSuggestionSelect?: (suggestion: SearchSuggestion) => void
}

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

export function ContentSearch({
  placeholder = "Search...",
  suggestions = [],
  onSearch,
  onSuggestionSelect,
  className,
  ...props
}: ContentSearchProps) {
  const [query, setQuery] = React.useState("")
  const [open, setOpen] = React.useState(false)

  const filtered = suggestions.filter((s) =>
    s.label.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className={cn("relative", className)} {...props}>
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder={placeholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(e.target.value.length > 0)
            onSearch?.(e.target.value)
          }}
          onFocus={() => query.length > 0 && setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 200)}
          className="pl-9"
        />
      </div>
      {open && filtered.length > 0 && (
        <div className="absolute top-full z-10 mt-1 w-full rounded-md border bg-popover p-1 shadow-md">
          {filtered.map((suggestion) => (
            <button
              key={suggestion.id}
              type="button"
              className="flex w-full flex-col items-start rounded-sm px-3 py-2 text-left text-sm hover:bg-accent"
              onMouseDown={() => {
                setQuery(suggestion.label)
                setOpen(false)
                onSuggestionSelect?.(suggestion)
              }}
            >
              <span className="font-medium">{suggestion.label}</span>
              {suggestion.description && (
                <span className="text-xs text-muted-foreground">
                  {suggestion.description}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
