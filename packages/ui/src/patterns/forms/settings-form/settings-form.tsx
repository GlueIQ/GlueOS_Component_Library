/**
 * SettingsForm Pattern
 *
 * A sectioned settings form with save/cancel buttons.
 * Composed of: Card, Field, Input, Button, Separator, Switch from our component library
 * Normalized: 2025-02 — relative imports, semantic tokens
 */

import { cn } from "../../../lib/utils"
import { Button } from "../../../components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "../../../components/ui/field"
import { Input } from "../../../components/ui/input"
import { Separator } from "../../../components/ui/separator"
import { Switch } from "../../../components/ui/switch"

export function SettingsForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {/* Profile section */}
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>
            Manage your public profile information.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="displayName">Display name</FieldLabel>
              <Input id="displayName" defaultValue="John Doe" />
            </Field>
            <Field>
              <FieldLabel htmlFor="settingsEmail">Email</FieldLabel>
              <Input
                id="settingsEmail"
                type="email"
                defaultValue="john@example.com"
              />
              <FieldDescription>
                This is the email associated with your account.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="bio">Bio</FieldLabel>
              <Input id="bio" placeholder="Tell us about yourself" />
            </Field>
          </FieldGroup>
        </CardContent>
        <CardFooter className="flex justify-end gap-2 border-t px-6 py-4">
          <Button variant="outline">Cancel</Button>
          <Button>Save changes</Button>
        </CardFooter>
      </Card>

      {/* Notifications section */}
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>
            Choose what notifications you want to receive.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-sm font-medium">Email notifications</div>
              <div className="text-sm text-muted-foreground">
                Receive email about activity in your account.
              </div>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-sm font-medium">Marketing emails</div>
              <div className="text-sm text-muted-foreground">
                Receive emails about new features and updates.
              </div>
            </div>
            <Switch />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-sm font-medium">Security alerts</div>
              <div className="text-sm text-muted-foreground">
                Get notified about security events on your account.
              </div>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
