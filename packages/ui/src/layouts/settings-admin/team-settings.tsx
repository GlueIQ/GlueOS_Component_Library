/**
 * TeamSettings Layout
 *
 * A team management layout with members table and invite form.
 * Normalized: 2025-02 — relative imports, semantic tokens
 */

import { cn } from "../../lib/utils"
import { Separator } from "../../components/ui/separator"

interface TeamSettingsProps extends React.ComponentProps<"div"> {
  header?: React.ReactNode
  inviteSection?: React.ReactNode
  membersSection?: React.ReactNode
  rolesSection?: React.ReactNode
}

export function TeamSettings({
  header,
  inviteSection,
  membersSection,
  rolesSection,
  className,
  ...props
}: TeamSettingsProps) {
  return (
    <div className={cn("flex flex-1 flex-col gap-6 p-6", className)} {...props}>
      {header ?? (
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Team Settings</h1>
          <p className="text-muted-foreground">
            Manage team members, roles, and invitations.
          </p>
        </div>
      )}
      <Separator />
      <div className="space-y-8">
        {inviteSection && <section>{inviteSection}</section>}
        {membersSection && <section>{membersSection}</section>}
        {rolesSection && <section>{rolesSection}</section>}
      </div>
    </div>
  )
}
