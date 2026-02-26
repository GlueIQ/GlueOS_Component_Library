/**
 * ForgotPasswordForm Pattern
 *
 * Composed of: Card, Field, Input, Button from our component library
 * Normalized: 2025-02 — relative imports, semantic tokens, Field v4 components
 */

import { cn } from "../../../lib/utils"
import { Button } from "../../../components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "../../../components/ui/field"
import { Input } from "../../../components/ui/input"

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Reset your password</CardTitle>
          <CardDescription>
            Enter the email address associated with your account and we&apos;ll
            send you a link to reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <Button type="submit" className="w-full">
                  Send reset link
                </Button>
              </Field>
              <div className="text-center text-sm">
                Remember your password?{" "}
                <a href="#" className="underline underline-offset-4">
                  Back to login
                </a>
              </div>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
