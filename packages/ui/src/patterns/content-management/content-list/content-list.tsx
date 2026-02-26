/**
 * ContentList Pattern
 *
 * A stack of content items with title, meta, and actions.
 * Composed of: Card, Badge, Button from our component library
 * Normalized: 2025-02 — relative imports, semantic tokens
 */

import { cn } from "../../../lib/utils"
import { Badge } from "../../../components/ui/badge"
import { Button } from "../../../components/ui/button"

export interface ContentItem {
  id: string
  title: string
  description?: string
  status?: string
  statusVariant?: "default" | "secondary" | "outline" | "destructive"
  meta?: string
}

interface ContentListProps extends React.ComponentProps<"div"> {
  items: ContentItem[]
  onItemClick?: (item: ContentItem) => void
}

export function ContentList({
  items,
  onItemClick,
  className,
  ...props
}: ContentListProps) {
  return (
    <div className={cn("divide-y rounded-md border", className)} {...props}>
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between gap-4 p-4"
        >
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h4 className="truncate font-medium text-sm">{item.title}</h4>
              {item.status && (
                <Badge variant={item.statusVariant ?? "secondary"} className="shrink-0">
                  {item.status}
                </Badge>
              )}
            </div>
            {item.description && (
              <p className="mt-0.5 truncate text-sm text-muted-foreground">
                {item.description}
              </p>
            )}
            {item.meta && (
              <p className="mt-0.5 text-xs text-muted-foreground">{item.meta}</p>
            )}
          </div>
          {onItemClick && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onItemClick(item)}
            >
              View
            </Button>
          )}
        </div>
      ))}
    </div>
  )
}
