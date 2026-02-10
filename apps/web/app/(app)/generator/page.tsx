import { Container } from "@repo/ui/components/ui/container"
import { Heading } from "@repo/ui/components/ui/heading"
import { Text } from "@repo/ui/components/ui/text"
import { GeneratorForm } from "./generator-form"

export default function GeneratorPage() {
  return (
    <Container className="py-8">
      <div className="mb-8">
        <Heading level={2}>UI Kit Generator</Heading>
        <Text variant="muted">
          Configure your brand and generate a ready-to-use monorepo
        </Text>
      </div>
      <GeneratorForm />
    </Container>
  )
}
