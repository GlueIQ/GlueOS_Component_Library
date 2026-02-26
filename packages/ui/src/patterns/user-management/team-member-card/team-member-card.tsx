/**
 * TeamMemberCard Pattern
 *
 * A compact card showing team member info with role and actions.
 * Composed of: Card, Avatar, Badge, Button from our component library
 * Normalized: 2025-02 — relative imports, semantic tokens
 */

import { cn } from "../../../lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar"
import { Badge } from "../../../components/ui/badge"
import { Button } from "../../../components/ui/button"
import { Card, CardContent } from "../../../components/ui/card"

interface TeamMemberCardProps extends React.ComponentProps<"div"> {
  name: string
  email?: string
  role: string
  avatarUrl?: string
  onEdit?: () => void
  onRemove?: () => void
}

export function TeamMemberCard({
  name,
  email,
  role,
  avatarUrl,
  onEdit,
  onRemove,
  className,
  ...props
}: TeamMemberCardProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <Card className={cn(className)} {...props}>
      <CardContent className="flex items-center gap-4 p-4">
        <Avatar className="size-10">
          <AvatarImage src={avatarUrl} alt={name} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="truncate font-medium text-sm">{name}</span>
            <Badge variant="outline" className="shrink-0 text-xs">
              {role}
            </Badge>
          </div>
          {email && (
            <p className="truncate text-xs text-muted-foreground">{email}</p>
          )}
        </div>
        <div className="flex shrink-0 gap-1">
          {onEdit && (
            <Button variant="ghost" size="sm" onClick={onEdit}>
              Edit
            </Button>
          )}
          {onRemove && (
            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={onRemove}>
              Remove
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
