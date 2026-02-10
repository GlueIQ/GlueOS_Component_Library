import Link from "next/link"
import { Wand2, BookOpen, BarChart3 } from "lucide-react"
import { Container } from "@repo/ui/components/ui/container"
import { Heading } from "@repo/ui/components/ui/heading"
import { Text } from "@repo/ui/components/ui/text"
import { Button } from "@repo/ui/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card"

export default function DashboardPage() {
  return (
    <Container className="py-8">
      <div className="mb-8">
        <Heading level={2}>GlueOS Design System</Heading>
        <Text variant="muted">Build branded client projects in minutes</Text>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <Wand2 className="size-8 text-primary mb-2" />
            <CardTitle>Generator</CardTitle>
          </CardHeader>
          <CardContent>
            <Text variant="small" className="text-muted-foreground">
              Configure brand colors, palette, and fonts to generate a
              ready-to-use client monorepo.
            </Text>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/generator">Open Generator</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <BookOpen className="size-8 text-primary mb-2" />
            <CardTitle>Storybook</CardTitle>
          </CardHeader>
          <CardContent>
            <Text variant="small" className="text-muted-foreground">
              Browse all UI components with interactive examples and
              documentation.
            </Text>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link href="/storybook">View Components</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <BarChart3 className="size-8 text-primary mb-2" />
            <CardTitle>Component Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <Text variant="small" className="text-muted-foreground">
              47+ components ready for production use across all client
              projects.
            </Text>
          </CardContent>
          <CardFooter>
            <Button variant="outline" disabled className="w-full">
              Coming Soon
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Container>
  )
}
