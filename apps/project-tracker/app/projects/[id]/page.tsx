import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Users, Calendar, DollarSign } from "lucide-react"
import { Container } from "@repo/ui/components/ui/container"
import { Heading } from "@repo/ui/components/ui/heading"
import { Text } from "@repo/ui/components/ui/text"
import { Button } from "@repo/ui/components/ui/button"
import { Badge } from "@repo/ui/components/ui/badge"
import { Progress } from "@repo/ui/components/ui/progress"
import { Separator } from "@repo/ui/components/ui/separator"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card"
import {
  DataList,
  DataListItem,
  DataListTerm,
  DataListDetail,
} from "@repo/ui/components/ui/data-list"
import { getProjectById, statusColors, phaseLabels } from "../../lib/data"

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
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const project = getProjectById(id)

  if (!project) {
    notFound()
  }

  const budgetPercent = Math.round((project.spent / project.budget) * 100)
  const remaining = project.budget - project.spent

  return (
    <Container className="py-8">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/projects">
          <ArrowLeft className="mr-2 size-4" />
          Back to Projects
        </Link>
      </Button>

      <div className="flex flex-col gap-2 mb-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Heading level={2}>{project.name}</Heading>
          <Text variant="muted">{project.client}</Text>
        </div>
        <div className="flex gap-2">
          <Badge variant={statusColors[project.status] as "default" | "secondary" | "outline" | "destructive"}>
            {project.status}
          </Badge>
          <Badge variant="outline">{phaseLabels[project.phase]}</Badge>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="size-5" />
              Project Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DataList orientation="horizontal" size="default">
              <DataListItem>
                <DataListTerm>Client</DataListTerm>
                <DataListDetail>{project.client}</DataListDetail>
              </DataListItem>
              <DataListItem>
                <DataListTerm>Status</DataListTerm>
                <DataListDetail>
                  <Badge variant={statusColors[project.status] as "default" | "secondary" | "outline" | "destructive"}>
                    {project.status}
                  </Badge>
                </DataListDetail>
              </DataListItem>
              <DataListItem>
                <DataListTerm>Phase</DataListTerm>
                <DataListDetail>
                  <Badge variant="outline">{phaseLabels[project.phase]}</Badge>
                </DataListDetail>
              </DataListItem>
              <DataListItem>
                <DataListTerm>Start Date</DataListTerm>
                <DataListDetail>{formatDate(project.startDate)}</DataListDetail>
              </DataListItem>
              <DataListItem>
                <DataListTerm>Due Date</DataListTerm>
                <DataListDetail>{formatDate(project.dueDate)}</DataListDetail>
              </DataListItem>
            </DataList>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="size-5" />
              Budget
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Text variant="small" className="text-muted-foreground">
                {formatCurrency(project.spent)} spent
              </Text>
              <Text variant="small" className="text-muted-foreground">
                {formatCurrency(project.budget)} total
              </Text>
            </div>
            <Progress value={budgetPercent} />
            <div className="flex items-center justify-between">
              <Text variant="small" className="font-medium">
                {budgetPercent}% utilized
              </Text>
              <Text variant="small" className="text-muted-foreground">
                {formatCurrency(remaining)} remaining
              </Text>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="size-5" />
              Team Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {project.team.map((member) => (
                <Badge key={member} variant="secondary">
                  {member}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Container>
  )
}
