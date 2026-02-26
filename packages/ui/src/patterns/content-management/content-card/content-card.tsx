/**
 * ContentCard Pattern
 *
 * A single content preview card with title, excerpt, status badge, and actions.
 * Composed of: Card, Badge, Button, DropdownMenu from our component library
 * Normalized: 2025-02 — relative imports, semantic tokens
 */

import { cn } from "../../../lib/utils"
import { Badge } from "../../../components/ui/badge"
import { Button } from "../../../components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu"

interface ContentCardProps extends React.ComponentProps<"div"> {
  title: string
  excerpt?: string
  status?: string
  statusVariant?: "default" | "secondary" | "outline" | "destructive"
  meta?: string
  onEdit?: () => void
  onDelete?: () => void
  onView?: () => void
}

function MoreIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>
  )
}

export function ContentCard({
  title,
  excerpt,
  status,
  statusVariant = "secondary",
  meta,
  onEdit,
  onDelete,
  onView,
  className,
  ...props
}: ContentCardProps) {
  return (
    <Card className={cn(className)} {...props}>
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div className="space-y-1">
          <CardTitle className="text-base">{title}</CardTitle>
          {meta && (
            <p className="text-xs text-muted-foreground">{meta}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {status && <Badge variant={statusVariant}>{status}</Badge>}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="size-8 p-0">
                <MoreIcon className="size-4" />
                <span className="sr-only">Actions</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {onView && <DropdownMenuItem onClick={onView}>View</DropdownMenuItem>}
              {onEdit && <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>}
              {onDelete && (
                <DropdownMenuItem className="text-destructive" onClick={onDelete}>
                  Delete
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      {excerpt && (
        <CardContent>
          <p className="line-clamp-2 text-sm text-muted-foreground">{excerpt}</p>
        </CardContent>
      )}
      <CardFooter className="pt-0">
        <Button variant="link" size="sm" className="h-auto p-0 text-xs" onClick={onView}>
          Read more
        </Button>
      </CardFooter>
    </Card>
  )
}
