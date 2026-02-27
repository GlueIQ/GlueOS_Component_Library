"use client"

import {
  Eye,
  Globe,
  Building2,
  Users,
  CheckCircle,
  Clock,
  Share2,
  Plus,
  Search,
} from "lucide-react"

import { Container } from "@repo/ui/components/ui/container"
import { Button } from "@repo/ui/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card"
import { Badge } from "@repo/ui/components/ui/badge"
import { StatusBadge } from "@repo/ui/components/ui/status-badge"
import { PageHeader } from "@repo/ui/patterns/navigation/page-header"
import { StatsGrid } from "@repo/ui/patterns/data-visualization/stats-grid"
import { Input } from "@repo/ui/components/ui/input"

// ---------------------------------------------------------------------------
// Static mock data — mirrors GlueIQ Immersion's immersion card structure
// ---------------------------------------------------------------------------

const stats = [
  {
    label: "Total Immersions",
    value: 12,
    icon: <Eye className="size-4" />,
    trend: { value: 20, label: "vs last quarter" },
  },
  {
    label: "In Progress",
    value: 4,
    icon: <Clock className="size-4" />,
    description: "Collecting & analyzing",
  },
  {
    label: "Complete",
    value: 6,
    icon: <CheckCircle className="size-4" />,
    trend: { value: 50, label: "vs last quarter" },
  },
  {
    label: "Shared",
    value: 3,
    icon: <Share2 className="size-4" />,
    description: "Visible to all team members",
  },
]

interface Immersion {
  id: string
  clientName: string
  industry: string
  subIndustry: string
  website: string
  businessModel: string
  companySize: string
  status: string
  shared: boolean
  updatedAt: string
  contactName?: string
}

const immersions: Immersion[] = [
  {
    id: "imm-001",
    clientName: "Meridian Health Systems",
    industry: "Healthcare",
    subIndustry: "Digital Health",
    website: "meridianhealth.com",
    businessModel: "B2B",
    companySize: "Enterprise",
    status: "complete",
    shared: true,
    updatedAt: "2 hours ago",
    contactName: "Sarah Chen",
  },
  {
    id: "imm-002",
    clientName: "TerraVerde Sustainability",
    industry: "CleanTech",
    subIndustry: "Carbon Markets",
    website: "terraverde.io",
    businessModel: "B2B2C",
    companySize: "Mid-Market",
    status: "in_progress",
    shared: false,
    updatedAt: "5 hours ago",
    contactName: "James Whitfield",
  },
  {
    id: "imm-003",
    clientName: "Apex Financial Group",
    industry: "Financial Services",
    subIndustry: "Wealth Management",
    website: "apexfinancial.com",
    businessModel: "B2C",
    companySize: "Enterprise",
    status: "in_progress",
    shared: true,
    updatedAt: "1 day ago",
  },
  {
    id: "imm-004",
    clientName: "NovaCraft Beverages",
    industry: "Consumer Goods",
    subIndustry: "Premium Beverages",
    website: "novacraftbev.com",
    businessModel: "B2C",
    companySize: "Mid-Market",
    status: "complete",
    shared: false,
    updatedAt: "2 days ago",
    contactName: "Mia Torres",
  },
  {
    id: "imm-005",
    clientName: "Stratos Aerospace",
    industry: "Aerospace & Defense",
    subIndustry: "Commercial Aviation",
    website: "stratosaero.com",
    businessModel: "B2B",
    companySize: "Enterprise",
    status: "in_review",
    shared: false,
    updatedAt: "3 days ago",
    contactName: "David Park",
  },
  {
    id: "imm-006",
    clientName: "Luminos Education",
    industry: "Education",
    subIndustry: "EdTech",
    website: "luminosedu.com",
    businessModel: "B2B2C",
    companySize: "SMB",
    status: "draft",
    shared: false,
    updatedAt: "5 days ago",
  },
]

const statusMap: Record<string, string> = {
  draft: "draft",
  in_progress: "in_progress",
  in_review: "in_review",
  complete: "complete",
  collecting: "in_progress",
  analyzing: "in_progress",
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function ImmersionPage() {
  return (
    <Container className="py-8 space-y-8">
      <PageHeader
        title="Immersions"
        description="AI-powered client research and opportunity mapping"
        actions={
          <Button>
            <Plus className="size-4 mr-2" />
            New Immersion
          </Button>
        }
      />

      <StatsGrid stats={stats} columns={4} />

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search immersions..." className="pl-9" />
      </div>

      {/* Immersion Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {immersions.map((imm) => (
          <Card key={imm.id} className="group hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
              <div className="space-y-1">
                <CardTitle className="text-lg">{imm.clientName}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {imm.industry} &middot; {imm.subIndustry}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {imm.shared && (
                  <Badge variant="outline" className="text-xs">
                    <Users className="size-3 mr-1" />
                    Shared
                  </Badge>
                )}
                <StatusBadge
                  status={statusMap[imm.status] ?? imm.status}
                  showDot
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Globe className="size-3.5 shrink-0" />
                <span className="truncate">{imm.website}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Building2 className="size-3.5 shrink-0" />
                <span>
                  {imm.businessModel} &middot; {imm.companySize}
                </span>
              </div>
              {imm.contactName && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="size-3.5 shrink-0" />
                  <span>{imm.contactName}</span>
                </div>
              )}
            </CardContent>
            <CardFooter className="text-xs text-muted-foreground">
              Updated {imm.updatedAt}
            </CardFooter>
          </Card>
        ))}
      </div>
    </Container>
  )
}
