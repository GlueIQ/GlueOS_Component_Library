export type ProjectStatus = "active" | "completed" | "on-hold" | "cancelled"
export type ProjectPhase =
  | "discovery"
  | "design"
  | "development"
  | "testing"
  | "launched"

export interface Project {
  id: string
  name: string
  client: string
  status: ProjectStatus
  phase: ProjectPhase
  startDate: string
  dueDate: string
  budget: number
  spent: number
  team: string[]
}

const projects: Project[] = [
  {
    id: "proj-001",
    name: "Brand Refresh Campaign",
    client: "Acme Corp",
    status: "active",
    phase: "design",
    startDate: "2025-11-01",
    dueDate: "2026-03-15",
    budget: 45000,
    spent: 18500,
    team: ["Alice Chen", "Bob Martinez", "Carol Liu"],
  },
  {
    id: "proj-002",
    name: "Product Launch Site",
    client: "TechStart Inc",
    status: "active",
    phase: "development",
    startDate: "2025-12-10",
    dueDate: "2026-04-01",
    budget: 72000,
    spent: 34200,
    team: ["David Kim", "Eve Johnson", "Frank Torres", "Grace Patel"],
  },
  {
    id: "proj-003",
    name: "Holiday Campaign",
    client: "RetailMax",
    status: "completed",
    phase: "launched",
    startDate: "2025-09-01",
    dueDate: "2025-11-30",
    budget: 28000,
    spent: 26800,
    team: ["Alice Chen", "Hank Williams"],
  },
  {
    id: "proj-004",
    name: "Mobile App Landing",
    client: "FinFlow",
    status: "active",
    phase: "testing",
    startDate: "2025-10-15",
    dueDate: "2026-02-28",
    budget: 55000,
    spent: 48000,
    team: ["Bob Martinez", "Ivy Nakamura", "Jack Reed"],
  },
  {
    id: "proj-005",
    name: "Email Template System",
    client: "GlobalHealth",
    status: "on-hold",
    phase: "discovery",
    startDate: "2026-01-05",
    dueDate: "2026-05-15",
    budget: 35000,
    spent: 4200,
    team: ["Carol Liu", "David Kim"],
  },
  {
    id: "proj-006",
    name: "Analytics Dashboard",
    client: "DataViz Co",
    status: "active",
    phase: "development",
    startDate: "2025-11-20",
    dueDate: "2026-03-30",
    budget: 68000,
    spent: 29500,
    team: ["Eve Johnson", "Frank Torres", "Grace Patel", "Hank Williams"],
  },
  {
    id: "proj-007",
    name: "Rebranding Microsite",
    client: "Luxe Brands",
    status: "cancelled",
    phase: "design",
    startDate: "2025-10-01",
    dueDate: "2026-01-15",
    budget: 40000,
    spent: 8000,
    team: ["Ivy Nakamura", "Jack Reed"],
  },
  {
    id: "proj-008",
    name: "Partner Portal",
    client: "Acme Corp",
    status: "active",
    phase: "discovery",
    startDate: "2026-01-20",
    dueDate: "2026-06-30",
    budget: 95000,
    spent: 12000,
    team: ["Alice Chen", "Bob Martinez", "David Kim", "Eve Johnson"],
  },
]

export function getProjects(): Project[] {
  return projects
}

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id)
}

export function getProjectStats() {
  const total = projects.length
  const active = projects.filter((p) => p.status === "active").length
  const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0)
  const totalSpent = projects.reduce((sum, p) => sum + p.spent, 0)
  const completed = projects.filter((p) => p.status === "completed").length

  return {
    total,
    active,
    totalBudget,
    totalSpent,
    budgetUtilization: Math.round((totalSpent / totalBudget) * 100),
    completionRate: Math.round((completed / total) * 100),
  }
}

export const statusColors: Record<ProjectStatus, string> = {
  active: "default",
  completed: "secondary",
  "on-hold": "outline",
  cancelled: "destructive",
}

export const phaseLabels: Record<ProjectPhase, string> = {
  discovery: "Discovery",
  design: "Design",
  development: "Development",
  testing: "Testing",
  launched: "Launched",
}
