/**
 * UserSettingsForm Pattern
 *
 * Edit profile information form with avatar upload area.
 * Composed of: Card, Field, Input, Button, Select, Avatar from our component library
 * Normalized: 2025-02 — relative imports, semantic tokens
 */

import { cn } from "../../../lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select"

export function UserSettingsForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
          <CardDescription>
            Update your personal information and preferences.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            {/* Avatar section */}
            <div className="flex items-center gap-4">
              <Avatar className="size-20">
                <AvatarImage src="/avatars/default.jpg" alt="User avatar" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <Button variant="outline" size="sm">
                  Change photo
                </Button>
                <p className="text-xs text-muted-foreground">
                  JPG, PNG or GIF. Max 2MB.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="userFirstName">First name</FieldLabel>
                <Input id="userFirstName" defaultValue="John" />
              </Field>
              <Field>
                <FieldLabel htmlFor="userLastName">Last name</FieldLabel>
                <Input id="userLastName" defaultValue="Doe" />
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="userEmail">Email</FieldLabel>
              <Input
                id="userEmail"
                type="email"
                defaultValue="john@example.com"
              />
            </Field>

            <Field>
              <FieldLabel>Timezone</FieldLabel>
              <Select defaultValue="utc-5">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="utc-8">Pacific Time (UTC-8)</SelectItem>
                  <SelectItem value="utc-7">Mountain Time (UTC-7)</SelectItem>
                  <SelectItem value="utc-6">Central Time (UTC-6)</SelectItem>
                  <SelectItem value="utc-5">Eastern Time (UTC-5)</SelectItem>
                  <SelectItem value="utc+0">UTC</SelectItem>
                  <SelectItem value="utc+1">Central European (UTC+1)</SelectItem>
                </SelectContent>
              </Select>
              <FieldDescription>
                Used for scheduling and date display.
              </FieldDescription>
            </Field>
          </FieldGroup>
        </CardContent>
        <CardFooter className="flex justify-end gap-2 border-t px-6 py-4">
          <Button variant="outline">Cancel</Button>
          <Button>Save changes</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
