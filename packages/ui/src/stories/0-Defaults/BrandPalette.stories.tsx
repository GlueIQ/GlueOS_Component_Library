import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'

const BrandPaletteDemo = () => {
  return (
    <div className="p-8 space-y-8 max-w-5xl">
      <div>
        <h1 className="text-4xl font-bold mb-2">Brand Palette Preview</h1>
        <p className="text-muted-foreground text-lg">
          Use the <strong>Brand</strong> toolbar control above to preview different brand configurations.
          This matches the palette options available in the Client Software Generator.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Primary Brand Color</CardTitle>
          <CardDescription>
            The primary color drives buttons, links, and key brand moments throughout the UI.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="h-32 rounded-lg border" style={{ background: 'hsl(var(--primary))' }} />
              <div className="space-y-1">
                <p className="font-mono text-sm text-muted-foreground">--color-brand-primary</p>
                <p className="text-sm font-medium">Primary</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-32 rounded-lg border" style={{ background: 'hsl(var(--primary-foreground))' }} />
              <div className="space-y-1">
                <p className="font-mono text-sm text-muted-foreground">--color-brand-primary-foreground</p>
                <p className="text-sm font-medium">Text on Primary</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t space-y-4">
            <h4 className="font-semibold text-sm">Components Using Primary Color:</h4>
            <div className="flex flex-wrap gap-3">
              <Button>Primary Button</Button>
              <Button variant="outline">Outline Button</Button>
              <Badge>Badge</Badge>
              <a href="#" className="text-primary hover:underline">
                Link with Primary
              </a>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Brand in Context</CardTitle>
          <CardDescription>
            See how the selected brand palette affects real UI components.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-6 border rounded-lg space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Example Dashboard Card</h3>
                <p className="text-sm text-muted-foreground">With current brand applied</p>
              </div>
              <Button>Take Action</Button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Total Revenue</p>
                <p className="text-2xl font-bold">$142,580</p>
                <Badge variant="secondary" className="mt-2">
                  +12.5%
                </Badge>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Active Users</p>
                <p className="text-2xl font-bold">2,845</p>
                <Badge variant="outline" className="mt-2">
                  +8.2%
                </Badge>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Conversion Rate</p>
                <p className="text-2xl font-bold">3.24%</p>
                <Badge className="mt-2">+0.4%</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle>Generator Integration</CardTitle>
          <CardDescription>
            These color swatches represent what the Client Software Generator will inject when a user selects a brand palette.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p>
              <span className="font-mono bg-background px-2 py-0.5 rounded border">
                --color-brand-primary
              </span>{' '}
              → Used for buttons, links, and primary actions
            </p>
            <p>
              <span className="font-mono bg-background px-2 py-0.5 rounded border">
                --color-brand-primary-foreground
              </span>{' '}
              → Text color on primary backgrounds
            </p>
            <p className="pt-2 text-muted-foreground">
              The generator converts client brand hex colors to OKLch format and injects them into the CSS variable system.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

const meta = {
  title: '0-Defaults/Brand Palette',
  component: BrandPaletteDemo,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Preview brand palette configurations that match the Client Software Generator options. Use the Brand toolbar control to switch between presets, or use the Configurator for full customization.',
      },
    },
  },
} satisfies Meta<typeof BrandPaletteDemo>

export default meta
