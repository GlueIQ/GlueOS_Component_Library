/**
 * FormWithValidation Pattern
 *
 * A form demonstrating inline validation and error states.
 * Composed of: Card, Field, Input, Button, Alert from our component library
 * Normalized: 2025-02 — relative imports, semantic tokens
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
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "../../../components/ui/field"
import { Input } from "../../../components/ui/input"
import { Alert, AlertDescription } from "../../../components/ui/alert"

interface FormWithValidationProps extends React.ComponentProps<"div"> {
  error?: string | null
}

export function FormWithValidation({
  error,
  className,
  ...props
}: FormWithValidationProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Create account</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form>
            <FieldGroup>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="firstName">First name</FieldLabel>
                  <Input id="firstName" placeholder="John" required />
                </Field>
                <Field>
                  <FieldLabel htmlFor="lastName">Last name</FieldLabel>
                  <Input id="lastName" placeholder="Doe" required />
                </Field>
              </div>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  required
                />
                <FieldDescription>
                  We&apos;ll never share your email with anyone else.
                </FieldDescription>
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input id="password" type="password" required />
                <FieldDescription>
                  Must be at least 8 characters with one uppercase letter and one number.
                </FieldDescription>
              </Field>
              <Field>
                <FieldLabel htmlFor="confirmPassword">
                  Confirm password
                </FieldLabel>
                <Input id="confirmPassword" type="password" required />
              </Field>
              <Button type="submit" className="w-full">
                Create account
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
