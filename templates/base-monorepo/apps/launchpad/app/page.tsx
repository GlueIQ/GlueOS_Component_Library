import { Container } from "@__SCOPE__/ui/components/ui/container"
import { Heading } from "@__SCOPE__/ui/components/ui/heading"
import { Text } from "@__SCOPE__/ui/components/ui/text"
import { Button } from "@__SCOPE__/ui/components/ui/button"
import { Badge } from "@__SCOPE__/ui/components/ui/badge"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@__SCOPE__/ui/components/ui/card"
import { Input } from "@__SCOPE__/ui/components/ui/input"
import { Label } from "@__SCOPE__/ui/components/ui/label"
import { Separator } from "@__SCOPE__/ui/components/ui/separator"

export default function Home() {
  return (
    <Container className="py-16">
      <div className="max-w-3xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <Heading level={1}>__CLIENT_NAME__</Heading>
          <Text variant="lead" className="text-muted-foreground">
            Your branded UI kit is ready. Start building.
          </Text>
        </div>

        <Separator />

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Buttons</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Badges</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Form Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@example.com" />
              </div>
              <Button className="w-full">Submit</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Typography</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Heading level={3}>Heading 3</Heading>
              <Text>
                This is body text with your brand fonts applied. The design
                system handles typography, spacing, and colors automatically.
              </Text>
              <Text variant="muted">Muted secondary text</Text>
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  )
}
