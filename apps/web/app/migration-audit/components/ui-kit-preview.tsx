"use client"

import { Button } from "@repo/ui/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card"
import { Input } from "@repo/ui/components/ui/input"
import { Label } from "@repo/ui/components/ui/label"
import { Badge } from "@repo/ui/components/ui/badge"
import { Checkbox } from "@repo/ui/components/ui/checkbox"
import { Switch } from "@repo/ui/components/ui/switch"
import { Progress } from "@repo/ui/components/ui/progress"
import { Skeleton } from "@repo/ui/components/ui/skeleton"
import { Avatar, AvatarFallback } from "@repo/ui/components/ui/avatar"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/ui/tabs"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/ui/components/ui/accordion"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@repo/ui/components/ui/tooltip"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/ui/table"
import { Textarea } from "@repo/ui/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select"
import {
  RadioGroup,
  RadioGroupItem,
} from "@repo/ui/components/ui/radio-group"

/**
 * Dumb rendered previews of @repo/ui components.
 * Each preview is self-contained with mock/static props.
 */

const previewMap: Record<string, () => React.ReactNode> = {
  Button: () => (
    <div className="flex flex-wrap gap-2">
      <Button size="sm">Primary</Button>
      <Button size="sm" variant="secondary">Secondary</Button>
      <Button size="sm" variant="outline">Outline</Button>
      <Button size="sm" variant="ghost">Ghost</Button>
      <Button size="sm" variant="destructive">Delete</Button>
    </div>
  ),
  Card: () => (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Sample Card</CardTitle>
        <CardDescription className="text-xs">Card description</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground">Card content goes here.</p>
      </CardContent>
    </Card>
  ),
  Input: () => <Input placeholder="Type something..." className="max-w-48" />,
  Select: () => (
    <Select>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Pick an option" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="a">Option A</SelectItem>
        <SelectItem value="b">Option B</SelectItem>
        <SelectItem value="c">Option C</SelectItem>
      </SelectContent>
    </Select>
  ),
  Checkbox: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="preview-check" defaultChecked />
      <Label htmlFor="preview-check" className="text-xs">Checked item</Label>
    </div>
  ),
  Label: () => <Label className="text-sm">Form Label</Label>,
  Badge: () => (
    <div className="flex gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Error</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
  Dialog: () => (
    <div className="rounded-md border p-3 text-xs text-muted-foreground">
      Dialog (renders as modal overlay — click trigger to open)
    </div>
  ),
  Tabs: () => (
    <Tabs defaultValue="tab1" className="w-full">
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" className="text-xs p-2">First tab content</TabsContent>
      <TabsContent value="tab2" className="text-xs p-2">Second tab content</TabsContent>
    </Tabs>
  ),
  Textarea: () => <Textarea placeholder="Enter description..." className="max-w-60 h-16" />,
  Avatar: () => (
    <div className="flex gap-2">
      <Avatar><AvatarFallback>MK</AvatarFallback></Avatar>
      <Avatar><AvatarFallback>AB</AvatarFallback></Avatar>
    </div>
  ),
  Tooltip: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="sm">Hover me</Button>
        </TooltipTrigger>
        <TooltipContent>Tooltip text</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
  Switch: () => (
    <div className="flex items-center gap-2">
      <Switch defaultChecked id="preview-switch" />
      <Label htmlFor="preview-switch" className="text-xs">Enabled</Label>
    </div>
  ),
  RadioGroup: () => (
    <RadioGroup defaultValue="opt1" className="flex gap-3">
      <div className="flex items-center gap-1">
        <RadioGroupItem value="opt1" id="r1" />
        <Label htmlFor="r1" className="text-xs">Option 1</Label>
      </div>
      <div className="flex items-center gap-1">
        <RadioGroupItem value="opt2" id="r2" />
        <Label htmlFor="r2" className="text-xs">Option 2</Label>
      </div>
    </RadioGroup>
  ),
  Accordion: () => (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-xs">Section 1</AccordionTrigger>
        <AccordionContent className="text-xs">Content for section 1</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
  Popover: () => (
    <div className="rounded-md border p-3 text-xs text-muted-foreground">
      Popover (renders as floating panel — click trigger to open)
    </div>
  ),
  DropdownMenu: () => (
    <div className="rounded-md border p-3 text-xs text-muted-foreground">
      DropdownMenu (renders as floating menu — click trigger to open)
    </div>
  ),
  Table: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-xs">Name</TableHead>
          <TableHead className="text-xs">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="text-xs">Item 1</TableCell>
          <TableCell className="text-xs">Active</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="text-xs">Item 2</TableCell>
          <TableCell className="text-xs">Inactive</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
  Progress: () => <Progress value={67} className="max-w-48" />,
  Sheet: () => (
    <div className="rounded-md border p-3 text-xs text-muted-foreground">
      Sheet (renders as side drawer — click trigger to open)
    </div>
  ),
  AlertDialog: () => (
    <div className="rounded-md border p-3 text-xs text-muted-foreground">
      AlertDialog (renders as confirmation modal — click trigger to open)
    </div>
  ),
  Skeleton: () => (
    <div className="flex gap-3">
      <Skeleton className="h-8 w-8 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-3 w-32" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
  ),
}

export function UiKitPreview({ componentName }: { componentName: string }) {
  const render = previewMap[componentName]
  if (!render) return null
  return <div className="py-1">{render()}</div>
}

export function hasPreview(componentName: string): boolean {
  return componentName in previewMap
}
