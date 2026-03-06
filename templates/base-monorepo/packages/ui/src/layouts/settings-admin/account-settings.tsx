/**
 * AccountSettings Layout
 *
 * An account management layout with profile, password, and preferences sections.
 * Normalized: 2025-02 — relative imports, semantic tokens
 */

import { cn } from "../../lib/utils"
import { Separator } from "../../components/ui/separator"

interface AccountSettingsProps extends React.ComponentProps<"div"> {
  header?: React.ReactNode
  profileSection?: React.ReactNode
  passwordSection?: React.ReactNode
  preferencesSection?: React.ReactNode
}

export function AccountSettings({
  header,
  profileSection,
  passwordSection,
  preferencesSection,
  className,
  ...props
}: AccountSettingsProps) {
  return (
    <div className={cn("flex flex-1 flex-col gap-6 p-6", className)} {...props}>
      {header ?? (
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Account Settings</h1>
          <p className="text-muted-foreground">
            Manage your profile, security, and preferences.
          </p>
        </div>
      )}
      <Separator />
      <div className="space-y-8">
        {profileSection && (
          <section>{profileSection}</section>
        )}
        {passwordSection && (
          <section>{passwordSection}</section>
        )}
        {preferencesSection && (
          <section>{preferencesSection}</section>
        )}
      </div>
    </div>
  )
}
