import { Container } from "@repo/ui/components/ui/container"
import { Heading } from "@repo/ui/components/ui/heading"
import { Text } from "@repo/ui/components/ui/text"
import { getProjects } from "../lib/data"
import { ProjectsTable } from "./projects-table"

export default function ProjectsPage() {
  const projects = getProjects()

  return (
    <Container className="py-8">
      <div className="mb-8">
        <Heading level={2}>Projects</Heading>
        <Text variant="muted">Manage and track all client projects</Text>
      </div>

      <ProjectsTable projects={projects} />
    </Container>
  )
}
