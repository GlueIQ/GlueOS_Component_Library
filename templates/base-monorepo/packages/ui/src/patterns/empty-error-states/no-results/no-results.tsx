/**
 * NoResults Pattern
 *
 * A display for empty search results with suggestions.
 * Composed of: Button from our component library
 * Normalized: 2025-02 — relative imports, semantic tokens
 */

import { cn } from "../../../lib/utils"
import { Button } from "../../../components/ui/button"

interface NoResultsProps extends React.ComponentProps<"div"> {
  icon?: React.ReactNode
  title?: string
  description?: string
  query?: string
  onClear?: () => void
}

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

export function NoResults({
  icon,
  title = "No results found",
  description,
  query,
  onClear,
  className,
  ...props
}: NoResultsProps) {
  const defaultDescription = query
    ? `No results match "${query}". Try adjusting your search or filters.`
    : "Try adjusting your search or filters to find what you're looking for."

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center",
        className
      )}
      {...props}
    >
      <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
        {icon ?? <SearchIcon className="size-6" />}
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">
        {description ?? defaultDescription}
      </p>
      {onClear && (
        <Button variant="outline" className="mt-4" onClick={onClear}>
          Clear search
        </Button>
      )}
    </div>
  )
}
