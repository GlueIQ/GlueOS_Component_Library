/**
 * FilterForm Pattern
 *
 * An advanced filter form with multiple controls and apply/clear actions.
 * Composed of: Card, Button, Field, Input, Select from our component library
 * Normalized: 2025-02 — relative imports, semantic tokens
 */

import { cn } from "../../../lib/utils"
import { Button } from "../../../components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card"
import {
  Field,
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

interface FilterFormProps extends React.ComponentProps<"div"> {
  onApply?: () => void
  onClear?: () => void
}

export function FilterForm({
  onApply,
  onClear,
  className,
  ...props
}: FilterFormProps) {
  return (
    <div className={cn(className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Field>
                <FieldLabel htmlFor="filterSearch">Search</FieldLabel>
                <Input id="filterSearch" placeholder="Search..." />
              </Field>
              <Field>
                <FieldLabel>Status</FieldLabel>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel>Category</FieldLabel>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel>Sort by</FieldLabel>
                <Select defaultValue="newest">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest first</SelectItem>
                    <SelectItem value="oldest">Oldest first</SelectItem>
                    <SelectItem value="name">Name A-Z</SelectItem>
                    <SelectItem value="name-desc">Name Z-A</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </div>
          </FieldGroup>
        </CardContent>
        <CardFooter className="flex justify-end gap-2 border-t px-6 py-3">
          <Button variant="ghost" size="sm" onClick={onClear}>
            Clear filters
          </Button>
          <Button size="sm" onClick={onApply}>
            Apply filters
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
