"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { z } from "zod"
import { toast } from "sonner"
import { Button } from "@repo/ui/components/ui/button"
import { Input } from "@repo/ui/components/ui/input"
import { Label } from "@repo/ui/components/ui/label"
import { Textarea } from "@repo/ui/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select"

const projectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  client: z.string().min(1, "Client name is required"),
  status: z.enum(["active", "completed", "on-hold", "cancelled"]),
  phase: z.enum(["discovery", "design", "development", "testing", "launched"]),
  startDate: z.string().min(1, "Start date is required"),
  dueDate: z.string().min(1, "Due date is required"),
  budget: z.number().min(0, "Budget must be positive"),
  team: z.string(),
})

type ProjectFormData = z.infer<typeof projectSchema>

export function AddProjectDialog() {
  const [open, setOpen] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof ProjectFormData, string>>>({})

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const raw = {
      name: formData.get("name") as string,
      client: formData.get("client") as string,
      status: formData.get("status") as string,
      phase: formData.get("phase") as string,
      startDate: formData.get("startDate") as string,
      dueDate: formData.get("dueDate") as string,
      budget: Number(formData.get("budget")),
      team: formData.get("team") as string,
    }

    const result = projectSchema.safeParse(raw)

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ProjectFormData, string>> = {}
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof ProjectFormData
        fieldErrors[field] = issue.message
      }
      setErrors(fieldErrors)
      return
    }

    setErrors({})
    setOpen(false)
    toast.success("Project created", {
      description: `"${result.data.name}" for ${result.data.client} has been added.`,
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 size-4" />
          Add Project
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New Project</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Project Name</Label>
              <Input id="name" name="name" placeholder="e.g. Brand Refresh" />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="client">Client</Label>
              <Input id="client" name="client" placeholder="e.g. Acme Corp" />
              {errors.client && (
                <p className="text-sm text-destructive">{errors.client}</p>
              )}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Status</Label>
              <SelectField name="status" defaultValue="active" options={[
                { value: "active", label: "Active" },
                { value: "completed", label: "Completed" },
                { value: "on-hold", label: "On Hold" },
                { value: "cancelled", label: "Cancelled" },
              ]} />
              {errors.status && (
                <p className="text-sm text-destructive">{errors.status}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Phase</Label>
              <SelectField name="phase" defaultValue="discovery" options={[
                { value: "discovery", label: "Discovery" },
                { value: "design", label: "Design" },
                { value: "development", label: "Development" },
                { value: "testing", label: "Testing" },
                { value: "launched", label: "Launched" },
              ]} />
              {errors.phase && (
                <p className="text-sm text-destructive">{errors.phase}</p>
              )}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input id="startDate" name="startDate" type="date" />
              {errors.startDate && (
                <p className="text-sm text-destructive">{errors.startDate}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input id="dueDate" name="dueDate" type="date" />
              {errors.dueDate && (
                <p className="text-sm text-destructive">{errors.dueDate}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget">Budget ($)</Label>
            <Input
              id="budget"
              name="budget"
              type="number"
              min="0"
              step="1000"
              placeholder="e.g. 50000"
            />
            {errors.budget && (
              <p className="text-sm text-destructive">{errors.budget}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="team">Team Members</Label>
            <Textarea
              id="team"
              name="team"
              placeholder="Enter team member names, one per line"
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Project</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function SelectField({
  name,
  defaultValue,
  options,
}: {
  name: string
  defaultValue: string
  options: { value: string; label: string }[]
}) {
  const [value, setValue] = useState(defaultValue)

  return (
    <>
      <input type="hidden" name={name} value={value} />
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  )
}
