"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Plus, MoreHorizontal, Eye, Pencil, Trash2 } from "lucide-react"
import { Button } from "@repo/ui/components/ui/button"
import { Input } from "@repo/ui/components/ui/input"
import { Badge } from "@repo/ui/components/ui/badge"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/components/ui/dropdown-menu"
import type { Project, ProjectStatus, ProjectPhase } from "../lib/data"
import { statusColors, phaseLabels } from "../lib/data"
import { AddProjectDialog } from "./add-project-dialog"

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export function ProjectsTable({ projects: initialProjects }: { projects: Project[] }) {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [phaseFilter, setPhaseFilter] = useState<string>("all")

  const filtered = initialProjects.filter((project) => {
    const matchesSearch =
      search === "" ||
      project.name.toLowerCase().includes(search.toLowerCase()) ||
      project.client.toLowerCase().includes(search.toLowerCase())

    const matchesStatus =
      statusFilter === "all" || project.status === statusFilter

    const matchesPhase =
      phaseFilter === "all" || project.phase === phaseFilter

    return matchesSearch && matchesStatus && matchesPhase
  })

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>All Projects</CardTitle>
          <AddProjectDialog />
        </div>
        <div className="flex flex-col gap-3 pt-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search projects or clients..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="on-hold">On Hold</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <Select value={phaseFilter} onValueChange={setPhaseFilter}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Phase" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Phases</SelectItem>
              <SelectItem value="discovery">Discovery</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="development">Development</SelectItem>
              <SelectItem value="testing">Testing</SelectItem>
              <SelectItem value="launched">Launched</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Phase</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead className="text-right">Budget</TableHead>
              <TableHead className="w-[50px]" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                  No projects found.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">
                    <Link
                      href={`/projects/${project.id}`}
                      className="hover:underline"
                    >
                      {project.name}
                    </Link>
                  </TableCell>
                  <TableCell>{project.client}</TableCell>
                  <TableCell>
                    <Badge variant={statusColors[project.status] as "default" | "secondary" | "outline" | "destructive"}>
                      {project.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {phaseLabels[project.phase]}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(project.dueDate)}</TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(project.budget)}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8">
                          <MoreHorizontal className="size-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/projects/${project.id}`}>
                            <Eye className="mr-2 size-4" />
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Pencil className="mr-2 size-4" />
                          Edit Project
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 size-4" />
                          Delete Project
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
