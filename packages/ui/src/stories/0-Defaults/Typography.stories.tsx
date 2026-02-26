import type { Meta, StoryObj } from '@storybook/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Heading } from '../../components/ui/heading'
import { Text } from '../../components/ui/text'

const TypographyDemo = () => {
  return (
    <div className="p-8 space-y-8 max-w-5xl">
      <div>
        <h1 className="text-4xl font-bold mb-2">Typography Preview</h1>
        <p className="text-muted-foreground text-lg">
          Use the <strong>Font</strong> toolbar control above to preview different font families.
          This matches the typography options available in the Client Software Generator.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Heading Hierarchy</CardTitle>
          <CardDescription>All heading levels using the selected font family</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-baseline gap-4 pb-2 border-b">
              <span className="text-xs font-mono text-muted-foreground w-16">H1</span>
              <Heading level={1}>The quick brown fox jumps over the lazy dog</Heading>
            </div>
            <div className="flex items-baseline gap-4 pb-2 border-b">
              <span className="text-xs font-mono text-muted-foreground w-16">H2</span>
              <Heading level={2}>The quick brown fox jumps over the lazy dog</Heading>
            </div>
            <div className="flex items-baseline gap-4 pb-2 border-b">
              <span className="text-xs font-mono text-muted-foreground w-16">H3</span>
              <Heading level={3}>The quick brown fox jumps over the lazy dog</Heading>
            </div>
            <div className="flex items-baseline gap-4 pb-2 border-b">
              <span className="text-xs font-mono text-muted-foreground w-16">H4</span>
              <Heading level={4}>The quick brown fox jumps over the lazy dog</Heading>
            </div>
            <div className="flex items-baseline gap-4 pb-2 border-b">
              <span className="text-xs font-mono text-muted-foreground w-16">H5</span>
              <Heading level={5}>The quick brown fox jumps over the lazy dog</Heading>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="text-xs font-mono text-muted-foreground w-16">H6</span>
              <Heading level={6}>The quick brown fox jumps over the lazy dog</Heading>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Body Text</CardTitle>
          <CardDescription>Body copy and paragraph styles with selected font</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <span className="text-xs font-mono text-muted-foreground">Base (16px)</span>
              <Text>
                The quick brown fox jumps over the lazy dog. This is the default body text size used throughout the application.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Text>
            </div>
            <div className="space-y-2">
              <span className="text-xs font-mono text-muted-foreground">Small (14px)</span>
              <Text variant="small" weight="medium">
                The quick brown fox jumps over the lazy dog. This smaller text is used for captions, help text, and secondary information.
              </Text>
            </div>
            <div className="space-y-2">
              <span className="text-xs font-mono text-muted-foreground">Large (18px)</span>
              <Text variant="large">
                The quick brown fox jumps over the lazy dog. Larger body text for emphasis or lead paragraphs.
              </Text>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Typography in Context</CardTitle>
          <CardDescription>Real-world usage example with current font</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-6 border rounded-lg space-y-4">
            <Heading level={3}>Marketing Dashboard Overview</Heading>
            <Text className="text-muted-foreground">
              Track your marketing performance across channels with real-time analytics and insights.
            </Text>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="space-y-2">
                <Text variant="small" weight="medium" className="text-muted-foreground font-medium">
                  Current Period
                </Text>
                <Heading level={4}>Jan 1 - Jan 31, 2026</Heading>
              </div>
              <div className="space-y-2">
                <Text variant="small" weight="medium" className="text-muted-foreground font-medium">
                  Total Impressions
                </Text>
                <Heading level={4}>1,284,592</Heading>
              </div>
            </div>
            <Text className="pt-4 border-t">
              Your marketing campaigns have reached{' '}
              <strong className="font-semibold">1.2 million impressions</strong> this month, representing a{' '}
              <strong className="font-semibold text-primary">12.5% increase</strong> over the previous period.
              Continue monitoring your top-performing channels for optimization opportunities.
            </Text>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle>Generator Integration</CardTitle>
          <CardDescription>How font families are applied by the Client Software Generator</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p>
              <span className="font-mono bg-background px-2 py-0.5 rounded border">--font-sans</span> → CSS variable
              controlling the base font family
            </p>
            <p className="text-muted-foreground">
              The generator allows clients to select from pre-vetted web-safe fonts or use Google Fonts. All typography throughout
              the UI automatically updates to match the selected font family.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

const meta = {
  title: '0-Defaults/Typography',
  component: TypographyDemo,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Preview typography configurations that match the Client Software Generator font options. Use the Font toolbar control to switch between font families, or use the Configurator for full customization with separate heading and body fonts.',
      },
    },
  },
} satisfies Meta<typeof TypographyDemo>

export default meta
