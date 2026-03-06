/**
 * ProfileCard Pattern
 *
 * Display user info with avatar, name, role, and edit action.
 * Composed of: Card, Avatar, Badge, Button from our component library
 * Normalized: 2025-02 — relative imports, semantic tokens
 */

import { cn } from "../../../lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar"
import { Badge } from "../../../components/ui/badge"
import { Button } from "../../../components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
} from "../../../components/ui/card"

interface ProfileCardProps extends React.ComponentProps<"div"> {
  name: string
  email?: string
  role?: string
  avatarUrl?: string
  initials?: string
  onEdit?: () => void
}

export function ProfileCard({
  name,
  email,
  role,
  avatarUrl,
  initials,
  onEdit,
  className,
  ...props
}: ProfileCardProps) {
  const fallback =
    initials ??
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)

  return (
    <Card className={cn(className)} {...props}>
      <CardHeader className="flex flex-row items-center gap-4 space-y-0">
        <Avatar className="size-16">
          <AvatarImage src={avatarUrl} alt={name} />
          <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold leading-none">{name}</h3>
            {role && <Badge variant="secondary">{role}</Badge>}
          </div>
          {email && (
            <p className="text-sm text-muted-foreground">{email}</p>
          )}
        </div>
        {onEdit && (
          <Button variant="outline" size="sm" onClick={onEdit}>
            Edit
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <div>
            <span className="font-medium text-foreground">12</span> projects
          </div>
          <div>
            <span className="font-medium text-foreground">36</span> tasks
          </div>
          <div>
            <span className="font-medium text-foreground">4</span> teams
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
