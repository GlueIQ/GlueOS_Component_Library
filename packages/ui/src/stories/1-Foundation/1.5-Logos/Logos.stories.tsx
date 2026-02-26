import type { Meta, StoryObj } from '@storybook/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card'
import { Badge } from '../../../components/ui/badge'

const LogoShowcase = () => {
  const logos = {
    light: '/glueiq-light.svg',
    dark: '/glueiq-dark.svg',
    icon: '/glueiq-icon.svg',
    favicon: '/glueiq-favicon.svg',
  }

  return (
    <div className="p-8 space-y-8 max-w-6xl">
      <div>
        <h1 className="text-4xl font-bold mb-2">Default Logo Assets</h1>
        <p className="text-muted-foreground text-lg">
          Current default logos used in the component library. These are replaced when you upload custom logos in the{' '}
          <a href="?path=/docs/0-defaults-configurator--docs" className="text-primary hover:underline">
            Configurator
          </a>
          .
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Light Mode Logo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Logo (Light Mode)
              <Badge variant="secondary">Required</Badge>
            </CardTitle>
            <CardDescription>Full logo for light backgrounds (header, footer, etc.)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border rounded-lg p-8 bg-white min-h-[200px] flex items-center justify-center">
              <img src={logos.light} alt="Light mode logo" className="max-h-[150px] max-w-full object-contain" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">glueiq-light.svg</p>
              <p className="text-xs text-muted-foreground">Used on light backgrounds in headers, footers, and navigation</p>
            </div>
          </CardContent>
        </Card>

        {/* Dark Mode Logo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Logo (Dark Mode)
              <Badge variant="secondary">Required</Badge>
            </CardTitle>
            <CardDescription>Full logo for dark backgrounds (optimized for dark theme)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border rounded-lg p-8 bg-neutral-950 min-h-[200px] flex items-center justify-center">
              <img src={logos.dark} alt="Dark mode logo" className="max-h-[150px] max-w-full object-contain" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">glueiq-dark.svg</p>
              <p className="text-xs text-muted-foreground">Used on dark backgrounds when dark mode is enabled</p>
            </div>
          </CardContent>
        </Card>

        {/* Icon/Mark */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Icon / Logo Mark
              <Badge variant="outline">Optional</Badge>
            </CardTitle>
            <CardDescription>Compact logo for tight spaces (mobile nav, app icon, etc.)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border rounded-lg p-8 bg-muted/30 min-h-[200px] flex items-center justify-center">
              <img src={logos.icon} alt="Logo icon" className="max-h-[100px] max-w-full object-contain" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">glueiq-icon.svg</p>
              <p className="text-xs text-muted-foreground">Compact logo mark for mobile nav and app icons</p>
            </div>
          </CardContent>
        </Card>

        {/* Favicon */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Favicon
              <Badge variant="outline">Optional</Badge>
            </CardTitle>
            <CardDescription>Browser tab icon (auto-generated from icon if not provided)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border rounded-lg p-8 bg-muted/30 min-h-[200px] flex items-center justify-center">
              <img src={logos.favicon} alt="Favicon" className="max-h-[64px] max-w-full object-contain" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">glueiq-favicon.svg</p>
              <p className="text-xs text-muted-foreground">Browser tab icon (32x32 or 64x64 pixels)</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Guidelines */}
      <Card className="bg-muted/30">
        <CardHeader>
          <CardTitle>Logo Requirements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-semibold mb-2">File Format Recommendations</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• <strong>SVG preferred</strong> for full logos (scalable, small file size)</li>
                <li>• PNG acceptable with transparent background</li>
                <li>• Avoid JPG (no transparency support)</li>
                <li>• ICO format specifically for favicon only</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Size Guidelines</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Full Logo: Max width 300px, height 80px</li>
                <li>• Icon/Mark: Square format, 128x128px ideal</li>
                <li>• Favicon: 32x32px or 64x64px</li>
                <li>• All files under 200KB preferred</li>
              </ul>
            </div>
          </div>

          <div className="pt-4 border-t">
            <h4 className="font-semibold mb-2 text-sm">How to Upload Custom Logos</h4>
            <p className="text-sm text-muted-foreground">
              To replace these default logos with your client's branding, use the{' '}
              <a href="?path=/docs/0-defaults-configurator--docs" className="text-primary hover:underline">
                Configurator
              </a>
              . Custom logos will be placed in the <code className="font-mono text-xs bg-background px-1 py-0.5 rounded">public/logos/</code> directory
              of the generated project, and dark mode will automatically swap between light and dark variants.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

const meta = {
  title: '1-Foundation/1.5-Logos',
  component: LogoShowcase,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Default logo assets used in the component library. These are the GlueIQ branding files that serve as placeholders until custom logos are uploaded via the Configurator.',
      },
    },
  },
} satisfies Meta<typeof LogoShowcase>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
