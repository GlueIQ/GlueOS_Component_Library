import type { StoryObj } from '@storybook/react'
import * as React from 'react'

export default {
  title: '1-Foundation/1.1-Color',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The GlueOS color system uses a 3-layer OKLch architecture. Layer 1 defines the neutral palette, Layer 2 injects brand colors, and Layer 3 maps semantic tokens that components consume. Components only reference Layer 3 variables.',
      },
    },
  },
}

function ColorSwatch({ variable, label }: { variable: string; label: string }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [computed, setComputed] = React.useState('')

  React.useEffect(() => {
    if (ref.current) {
      const val = getComputedStyle(ref.current).getPropertyValue(variable).trim()
      setComputed(val)
    }
  }, [variable])

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        ref={ref}
        className="w-16 h-16 rounded-lg border border-border shadow-sm"
        style={{ backgroundColor: `var(${variable})` }}
      />
      <div className="text-center max-w-20">
        <p className="text-xs font-semibold truncate">{label}</p>
        <p className="text-[10px] text-muted-foreground font-mono truncate" title={computed}>
          {variable}
        </p>
      </div>
    </div>
  )
}

function ColorSection({
  title,
  description,
  colors,
}: {
  title: string
  description?: string
  colors: { variable: string; label: string }[]
}) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="flex flex-wrap gap-4">
        {colors.map((c) => (
          <ColorSwatch key={c.variable} {...c} />
        ))}
      </div>
    </div>
  )
}

const neutralPalette = [
  { variable: '--color-neutral-50', label: '50' },
  { variable: '--color-neutral-100', label: '100' },
  { variable: '--color-neutral-200', label: '200' },
  { variable: '--color-neutral-300', label: '300' },
  { variable: '--color-neutral-400', label: '400' },
  { variable: '--color-neutral-500', label: '500' },
  { variable: '--color-neutral-600', label: '600' },
  { variable: '--color-neutral-700', label: '700' },
  { variable: '--color-neutral-800', label: '800' },
  { variable: '--color-neutral-900', label: '900' },
  { variable: '--color-neutral-950', label: '950' },
]

const brandColors = [
  { variable: '--color-brand-primary', label: 'Primary' },
  { variable: '--color-brand-primary-foreground', label: 'Primary FG' },
  { variable: '--color-brand-secondary', label: 'Secondary' },
  { variable: '--color-brand-secondary-foreground', label: 'Secondary FG' },
  { variable: '--color-brand-accent', label: 'Accent' },
  { variable: '--color-brand-accent-foreground', label: 'Accent FG' },
  { variable: '--color-brand-destructive', label: 'Destructive' },
  { variable: '--color-brand-destructive-foreground', label: 'Destructive FG' },
]

const semanticBase = [
  { variable: '--background', label: 'Background' },
  { variable: '--foreground', label: 'Foreground' },
  { variable: '--card', label: 'Card' },
  { variable: '--card-foreground', label: 'Card FG' },
  { variable: '--popover', label: 'Popover' },
  { variable: '--popover-foreground', label: 'Popover FG' },
]

const semanticBrand = [
  { variable: '--primary', label: 'Primary' },
  { variable: '--primary-foreground', label: 'Primary FG' },
  { variable: '--secondary', label: 'Secondary' },
  { variable: '--secondary-foreground', label: 'Secondary FG' },
  { variable: '--muted', label: 'Muted' },
  { variable: '--muted-foreground', label: 'Muted FG' },
  { variable: '--accent', label: 'Accent' },
  { variable: '--accent-foreground', label: 'Accent FG' },
  { variable: '--destructive', label: 'Destructive' },
  { variable: '--destructive-foreground', label: 'Destructive FG' },
]

const semanticUI = [
  { variable: '--border', label: 'Border' },
  { variable: '--input', label: 'Input' },
  { variable: '--ring', label: 'Ring' },
]

const chartColors = [
  { variable: '--chart-1', label: 'Chart 1' },
  { variable: '--chart-2', label: 'Chart 2' },
  { variable: '--chart-3', label: 'Chart 3' },
  { variable: '--chart-4', label: 'Chart 4' },
  { variable: '--chart-5', label: 'Chart 5' },
]

const sidebarColors = [
  { variable: '--sidebar', label: 'Sidebar' },
  { variable: '--sidebar-foreground', label: 'Sidebar FG' },
  { variable: '--sidebar-primary', label: 'Primary' },
  { variable: '--sidebar-primary-foreground', label: 'Primary FG' },
  { variable: '--sidebar-accent', label: 'Accent' },
  { variable: '--sidebar-accent-foreground', label: 'Accent FG' },
  { variable: '--sidebar-border', label: 'Border' },
  { variable: '--sidebar-ring', label: 'Ring' },
]

export const Layer1NeutralPalette: StoryObj = {
  name: 'Layer 1: Neutral Palette',
  render: () => (
    <div className="space-y-8 p-8">
      <ColorSection
        title="Neutral Palette"
        description="OKLch neutral scale (50-950). The generator swaps this layer to change the overall tone (slate, gray, zinc, neutral, stone)."
        colors={neutralPalette}
      />
    </div>
  ),
}

export const Layer2BrandColors: StoryObj = {
  name: 'Layer 2: Brand Colors',
  render: () => (
    <div className="space-y-8 p-8">
      <ColorSection
        title="Brand Colors"
        description="Injected by the generator from user brand settings (hex converted to OKLch). Defaults reference the neutral palette when no brand is set."
        colors={brandColors}
      />
    </div>
  ),
}

export const Layer3SemanticTokens: StoryObj = {
  name: 'Layer 3: Semantic Tokens',
  render: () => (
    <div className="space-y-10 p-8">
      <ColorSection
        title="Base"
        description="Core surface and text colors. Components reference these — never Layer 1/2 directly."
        colors={semanticBase}
      />
      <ColorSection
        title="Interactive"
        description="Primary, secondary, muted, accent, and destructive states."
        colors={semanticBrand}
      />
      <ColorSection
        title="UI Chrome"
        description="Border, input field, and focus ring colors."
        colors={semanticUI}
      />
      <ColorSection title="Chart" colors={chartColors} />
      <ColorSection title="Sidebar" colors={sidebarColors} />
    </div>
  ),
}

export const DarkMode: StoryObj = {
  render: () => (
    <div className="dark bg-background text-foreground rounded-lg">
      <div className="space-y-10 p-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">Dark Mode</h2>
          <p className="text-sm text-muted-foreground">
            Same semantic tokens, different resolved values. The .dark class
            switches Layer 2 and Layer 3 mappings.
          </p>
        </div>
        <ColorSection title="Neutral Palette" colors={neutralPalette} />
        <ColorSection title="Brand Colors" colors={brandColors} />
        <ColorSection title="Base" colors={semanticBase} />
        <ColorSection title="Interactive" colors={semanticBrand} />
        <ColorSection title="UI Chrome" colors={semanticUI} />
        <ColorSection title="Chart" colors={chartColors} />
        <ColorSection title="Sidebar" colors={sidebarColors} />
      </div>
    </div>
  ),
}
