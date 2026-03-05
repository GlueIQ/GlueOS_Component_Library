import { Container } from '@repo/ui/components/ui/container'
import { Button } from '@repo/ui/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/ui/card'
import { PageHeader } from '@repo/ui/patterns/navigation/page-header'
import { SettingsForm } from '@repo/ui/patterns/forms/settings-form'

export default function SettingsPage() {
  return (
    <Container className="py-8 space-y-8">
      <PageHeader
        title="Settings"
        description="Manage your __APP_NAME__ preferences and configuration."
      />

      <Card>
        <CardHeader>
          <CardTitle>General</CardTitle>
          <CardDescription>Basic app preferences</CardDescription>
        </CardHeader>
        <CardContent>
          {/*
           * Use SettingsForm from @repo/ui or build a custom form with react-hook-form + zod.
           * See packages/ui/src/patterns/forms/settings-form/ for the full pattern.
           */}
          <SettingsForm />
        </CardContent>
      </Card>
    </Container>
  )
}
