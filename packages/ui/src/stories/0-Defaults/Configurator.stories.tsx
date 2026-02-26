import type { Meta, StoryObj } from '@storybook/react'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '../../components/ui/card'
import { Label } from '../../components/ui/label'
import { Input } from '../../components/ui/input'
import { Select } from '../../components/ui/select'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { Separator } from '../../components/ui/separator'
import { Heading } from '../../components/ui/heading'
import { Text } from '../../components/ui/text'
import { Slider } from '../../components/ui/slider'
import { ChartAreaInteractive } from '../../patterns/data-visualization/chart-area-interactive'
import { ChartPalettePicker } from '../../components/ui/chart-palette-picker'
import { NeutralPalettePicker } from '../../components/ui/neutral-palette-picker'
import { type ChromaticPaletteName } from '../../lib/colors/chart-palettes'
import { type NeutralPaletteName } from '../../lib/colors/palettes'

// Neutral palette options
const NEUTRAL_PALETTES = ['slate', 'gray', 'zinc', 'neutral', 'stone'] as const
type NeutralPalette = (typeof NEUTRAL_PALETTES)[number]

// Font family options
const FONT_FAMILIES = [
  { value: 'Inter', label: 'Inter (Default)' },
  { value: 'system-ui', label: 'System UI' },
  { value: 'Roboto', label: 'Roboto' },
  { value: 'Open Sans', label: 'Open Sans' },
  { value: 'Montserrat', label: 'Montserrat' },
  { value: 'Poppins', label: 'Poppins' },
  { value: 'Lato', label: 'Lato' },
  { value: 'Raleway', label: 'Raleway' },
]

// Configuration type
type GeneratorConfig = {
  name: string
  neutralPalette: NeutralPalette
  brandPrimary: string
  brandSecondary: string
  brandAccent: string
  chartPalette: string
  headingFont: string
  bodyFont: string
  radius: number
}

// Preset configurations
const PRESETS: Record<string, GeneratorConfig> = {
  glueiq: {
    name: 'GlueIQ Default',
    neutralPalette: 'neutral',
    brandPrimary: '#BC0059',
    brandSecondary: '#3A3A40',
    brandAccent: '#89898C',
    chartPalette: 'pink',
    headingFont: 'Inter',
    bodyFont: 'Inter',
    radius: 0.5,
  },
  corporate: {
    name: 'Corporate Blue',
    neutralPalette: 'slate',
    brandPrimary: '#1e40af',
    brandSecondary: '#e0e7ff',
    brandAccent: '#dbeafe',
    chartPalette: 'indigo',
    headingFont: 'Roboto',
    bodyFont: 'Roboto',
    radius: 0.375,
  },
  tech: {
    name: 'Tech Purple',
    neutralPalette: 'zinc',
    brandPrimary: '#9333ea',
    brandSecondary: '#f3e8ff',
    brandAccent: '#fae8ff',
    chartPalette: 'purple',
    headingFont: 'Montserrat',
    bodyFont: 'Open Sans',
    radius: 0.75,
  },
  finance: {
    name: 'Finance Green',
    neutralPalette: 'stone',
    brandPrimary: '#059669',
    brandSecondary: '#d1fae5',
    brandAccent: '#d1fae5',
    chartPalette: 'emerald',
    headingFont: 'Lato',
    bodyFont: 'Lato',
    radius: 0.25,
  },
  healthcare: {
    name: 'Healthcare Teal',
    neutralPalette: 'gray',
    brandPrimary: '#0891b2',
    brandSecondary: '#cffafe',
    brandAccent: '#e0f2fe',
    chartPalette: 'cyan',
    headingFont: 'Poppins',
    bodyFont: 'Poppins',
    radius: 0.625,
  },
}

const GeneratorConfigurator = () => {
  const [config, setConfig] = useState<GeneratorConfig>(PRESETS.glueiq!)
  const [logos, setLogos] = useState({
    light: null as string | null,
    dark: null as string | null,
    icon: null as string | null,
    favicon: null as string | null,
  })
  const [savedThemes, setSavedThemes] = useState<Record<string, GeneratorConfig>>({})
  const [newThemeName, setNewThemeName] = useState('')
  const [saveMessage, setSaveMessage] = useState('')

  // Load saved themes from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('glueiq-saved-themes')
    if (saved) {
      try {
        setSavedThemes(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to load saved themes:', e)
      }
    }
  }, [])

  // Apply theme in real-time
  useEffect(() => {
    const root = document.documentElement

    // Convert hex to oklch (simplified - just update primary for now)
    root.style.setProperty('--color-brand-primary', hexToHSL(config.brandPrimary))
    root.style.setProperty('--font-sans', config.headingFont)
    root.style.setProperty('--radius', `${config.radius}rem`)
    root.style.fontFamily = config.bodyFont
  }, [config])

  const updateConfig = (key: string, value: string | number) => {
    setConfig((prev) => ({ ...prev, [key]: value }))
  }

  const loadPreset = (presetKey: keyof typeof PRESETS) => {
    const preset = PRESETS[presetKey]
    if (preset) {
      setConfig(preset)
    }
  }

  const handleLogoUpload = (type: keyof typeof logos, file: File | null) => {
    if (!file) {
      setLogos((prev) => ({ ...prev, [type]: null }))
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      setLogos((prev) => ({ ...prev, [type]: reader.result as string }))
    }
    reader.readAsDataURL(file)
  }

  const saveCurrentTheme = () => {
    if (!newThemeName.trim()) return

    const themeKey = newThemeName.toLowerCase().replace(/\s+/g, '-')
    const newThemes = {
      ...savedThemes,
      [themeKey]: { ...config, name: newThemeName },
    }

    setSavedThemes(newThemes)
    localStorage.setItem('glueiq-saved-themes', JSON.stringify(newThemes))

    // Show success message
    setSaveMessage(`✓ Saved "${newThemeName}" — Refresh page to see it in toolbar`)
    setTimeout(() => setSaveMessage(''), 5000)

    setNewThemeName('')

    // Dispatch event so toolbar can update
    window.dispatchEvent(new Event('glueiq-themes-updated'))
  }

  const deleteSavedTheme = (themeKey: string) => {
    const newThemes = { ...savedThemes }
    delete newThemes[themeKey]
    setSavedThemes(newThemes)
    localStorage.setItem('glueiq-saved-themes', JSON.stringify(newThemes))
    window.dispatchEvent(new Event('glueiq-themes-updated'))
  }

  const loadSavedTheme = (themeKey: string) => {
    const theme = savedThemes[themeKey]
    if (theme) {
      setConfig(theme)
    }
  }

  return (
    <div className="grid grid-cols-[420px_1fr] h-screen">
      {/* LEFT PANEL: Generator Form */}
      <div className="border-r bg-muted/30 overflow-y-auto">
        <div className="p-6 space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Generator Configuration</h2>
            <p className="text-sm text-muted-foreground">
              Configure your client's brand settings. Changes apply in real-time to the preview panel.
            </p>
          </div>

          <Separator />

          {/* Layer 1: Neutral Palette */}
          <div className="space-y-3">
            <div>
              <Label className="text-sm font-semibold">Base Neutral Palette</Label>
              <p className="text-xs text-muted-foreground mt-1">
                Sets the gray scale for backgrounds, borders, and muted text
              </p>
            </div>
            <NeutralPalettePicker
              value={config.neutralPalette as NeutralPaletteName}
              onChange={(value) => updateConfig('neutralPalette', value)}
            />
          </div>

          <Separator />

          {/* Corner Radius */}
          <div className="space-y-3">
            <div>
              <Label className="text-sm font-semibold">Corner Radius</Label>
              <p className="text-xs text-muted-foreground mt-1">
                Border radius for buttons, cards, and other UI elements
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {config.radius}rem ({(config.radius * 16).toFixed(0)}px)
                </span>
              </div>
              <Slider
                value={[config.radius]}
                onValueChange={([value]) => updateConfig('radius', value ?? 0)}
                min={0}
                max={1}
                step={0.125}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Sharp (0)</span>
                <span>Rounded (1)</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Layer 2: Brand Colors */}
          <div className="space-y-4">
            <Label className="text-sm font-semibold">Brand Colors</Label>

            <div className="space-y-2">
              <Label htmlFor="primary">Primary Color</Label>
              <div className="flex gap-2">
                <input
                  type="color"
                  id="primary"
                  value={config.brandPrimary}
                  onChange={(e) => updateConfig('brandPrimary', e.target.value)}
                  className="w-12 h-10 rounded border cursor-pointer"
                />
                <Input
                  type="text"
                  value={config.brandPrimary}
                  onChange={(e) => updateConfig('brandPrimary', e.target.value)}
                  className="flex-1 font-mono text-sm"
                  placeholder="#3b82f6"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="secondary">Secondary Color</Label>
              <div className="flex gap-2">
                <input
                  type="color"
                  id="secondary"
                  value={config.brandSecondary}
                  onChange={(e) => updateConfig('brandSecondary', e.target.value)}
                  className="w-12 h-10 rounded border cursor-pointer"
                />
                <Input
                  type="text"
                  value={config.brandSecondary}
                  onChange={(e) => updateConfig('brandSecondary', e.target.value)}
                  className="flex-1 font-mono text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="accent">Accent Color</Label>
              <div className="flex gap-2">
                <input
                  type="color"
                  id="accent"
                  value={config.brandAccent}
                  onChange={(e) => updateConfig('brandAccent', e.target.value)}
                  className="w-12 h-10 rounded border cursor-pointer"
                />
                <Input
                  type="text"
                  value={config.brandAccent}
                  onChange={(e) => updateConfig('brandAccent', e.target.value)}
                  className="flex-1 font-mono text-sm"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Chart Palette */}
          <div className="space-y-3">
            <div>
              <Label className="text-sm font-semibold">Chart Color Palette</Label>
              <p className="text-xs text-muted-foreground mt-1">
                Color scheme for data visualizations (17 options)
              </p>
            </div>
            <ChartPalettePicker
              value={config.chartPalette as ChromaticPaletteName}
              onChange={(value) => updateConfig('chartPalette', value)}
            />
          </div>

          <Separator />

          {/* Typography */}
          <div className="space-y-4">
            <Label className="text-sm font-semibold">Typography</Label>

            <div className="space-y-2">
              <Label htmlFor="headingFont">Heading Font</Label>
              <select
                id="headingFont"
                value={config.headingFont}
                onChange={(e) => updateConfig('headingFont', e.target.value)}
                className="w-full h-10 px-3 rounded-md border bg-background text-sm"
              >
                {FONT_FAMILIES.map((font) => (
                  <option key={font.value} value={font.value}>
                    {font.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bodyFont">Body Font</Label>
              <select
                id="bodyFont"
                value={config.bodyFont}
                onChange={(e) => updateConfig('bodyFont', e.target.value)}
                className="w-full h-10 px-3 rounded-md border bg-background text-sm"
              >
                {FONT_FAMILIES.map((font) => (
                  <option key={font.value} value={font.value}>
                    {font.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Separator />

          {/* Logo Upload */}
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-semibold">Logo Assets</Label>
              <p className="text-xs text-muted-foreground mt-1">
                Upload all 4 logo variants for optimal display across contexts
              </p>
            </div>

            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="logo-light" className="text-xs font-medium">
                  Logo (Light Mode) <Badge variant="secondary" className="ml-1 text-xs">Required</Badge>
                </Label>
                <input
                  id="logo-light"
                  type="file"
                  accept=".svg,.png"
                  onChange={(e) => handleLogoUpload('light', e.target.files?.[0] || null)}
                  className="w-full text-xs file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                />
                {logos.light && (
                  <div className="border rounded p-2 bg-white flex items-center justify-center h-16">
                    <img src={logos.light} alt="Light logo preview" className="max-h-full max-w-full object-contain" />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="logo-dark" className="text-xs font-medium">
                  Logo (Dark Mode) <Badge variant="secondary" className="ml-1 text-xs">Required</Badge>
                </Label>
                <input
                  id="logo-dark"
                  type="file"
                  accept=".svg,.png"
                  onChange={(e) => handleLogoUpload('dark', e.target.files?.[0] || null)}
                  className="w-full text-xs file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                />
                {logos.dark && (
                  <div className="border rounded p-2 bg-neutral-950 flex items-center justify-center h-16">
                    <img src={logos.dark} alt="Dark logo preview" className="max-h-full max-w-full object-contain" />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="logo-icon" className="text-xs font-medium">
                  Icon / Logo Mark <Badge variant="outline" className="ml-1 text-xs">Optional</Badge>
                </Label>
                <input
                  id="logo-icon"
                  type="file"
                  accept=".svg,.png"
                  onChange={(e) => handleLogoUpload('icon', e.target.files?.[0] || null)}
                  className="w-full text-xs file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                />
                {logos.icon && (
                  <div className="border rounded p-2 bg-muted/30 flex items-center justify-center h-12">
                    <img src={logos.icon} alt="Icon preview" className="max-h-full max-w-full object-contain" />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="logo-favicon" className="text-xs font-medium">
                  Favicon <Badge variant="outline" className="ml-1 text-xs">Optional</Badge>
                </Label>
                <input
                  id="logo-favicon"
                  type="file"
                  accept=".ico,.png,.svg"
                  onChange={(e) => handleLogoUpload('favicon', e.target.files?.[0] || null)}
                  className="w-full text-xs file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                />
                {logos.favicon && (
                  <div className="border rounded p-2 bg-muted/30 flex items-center justify-center h-10">
                    <img src={logos.favicon} alt="Favicon preview" className="max-h-full max-w-full object-contain" />
                  </div>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Saved Themes */}
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-semibold">Save Current Theme</Label>
              <p className="text-xs text-muted-foreground mt-1">
                Save your current configuration to quickly switch between themes
              </p>
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="Theme name..."
                value={newThemeName}
                onChange={(e) => setNewThemeName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && saveCurrentTheme()}
                className="flex-1"
              />
              <Button onClick={saveCurrentTheme} disabled={!newThemeName.trim()}>
                Save
              </Button>
            </div>

            {saveMessage && (
              <p className="text-xs text-green-600 dark:text-green-400 font-medium">
                {saveMessage}
              </p>
            )}

            {Object.keys(savedThemes).length > 0 && (
              <div className="space-y-2">
                <Label className="text-xs font-medium text-muted-foreground">Saved Themes</Label>
                <div className="space-y-1">
                  {Object.entries(savedThemes).map(([key, theme]) => (
                    <div key={key} className="flex items-center gap-2 p-2 rounded-lg border bg-muted/30">
                      <button
                        onClick={() => loadSavedTheme(key)}
                        className="flex-1 text-left text-sm hover:text-primary transition-colors"
                      >
                        {theme.name}
                      </button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteSavedTheme(key)}
                        className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Reset Button */}
          <Button variant="outline" onClick={() => loadPreset('glueiq')} className="w-full">
            Reset to GlueIQ Defaults
          </Button>
        </div>
      </div>

      {/* RIGHT PANEL: Live Preview */}
      <div className="overflow-y-auto bg-background">
        <div className="p-8 space-y-8 max-w-5xl mx-auto">
          <div>
            <Heading level={1}>Live Preview</Heading>
            <Text className="text-muted-foreground mt-2">
              See how your configuration affects real UI components. This is exactly what the generated project will
              look like.
            </Text>
          </div>

          {/* Brand Color Swatches */}
          <Card>
            <CardHeader>
              <CardTitle>Brand Colors</CardTitle>
              <CardDescription>Current color configuration</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="h-24 rounded-lg border" style={{ backgroundColor: config.brandPrimary }} />
                  <p className="text-sm font-medium">Primary</p>
                  <code className="text-xs text-muted-foreground">{config.brandPrimary}</code>
                </div>
                <div className="space-y-2">
                  <div className="h-24 rounded-lg border" style={{ backgroundColor: config.brandSecondary }} />
                  <p className="text-sm font-medium">Secondary</p>
                  <code className="text-xs text-muted-foreground">{config.brandSecondary}</code>
                </div>
                <div className="space-y-2">
                  <div className="h-24 rounded-lg border" style={{ backgroundColor: config.brandAccent }} />
                  <p className="text-sm font-medium">Accent</p>
                  <code className="text-xs text-muted-foreground">{config.brandAccent}</code>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Logo Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Logo Assets</CardTitle>
              <CardDescription>
                {logos.light || logos.dark ? 'Custom logos uploaded' : 'Default GlueIQ logos'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="border rounded-lg p-6 bg-white min-h-[120px] flex items-center justify-center">
                    <img
                      src={logos.light || '/glueiq-light.svg'}
                      alt="Light mode logo"
                      className="max-h-[80px] max-w-full object-contain"
                    />
                  </div>
                  <p className="text-sm font-medium">Light Mode Logo</p>
                </div>
                <div className="space-y-2">
                  <div className="border rounded-lg p-6 bg-neutral-950 min-h-[120px] flex items-center justify-center">
                    <img
                      src={logos.dark || '/glueiq-dark.svg'}
                      alt="Dark mode logo"
                      className="max-h-[80px] max-w-full object-contain"
                    />
                  </div>
                  <p className="text-sm font-medium">Dark Mode Logo</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Component Showcase */}
          <Card>
            <CardHeader>
              <CardTitle>UI Components</CardTitle>
              <CardDescription>Interactive elements with current brand applied</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-wrap gap-3">
                <Button>Primary Button</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
              </div>

              <div className="flex flex-wrap gap-3">
                <Badge>Default Badge</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Alert</Badge>
              </div>

              <div className="space-y-2">
                <Label>Form Input Example</Label>
                <Input placeholder="Enter text here..." />
              </div>
            </CardContent>
          </Card>

          {/* Typography Showcase */}
          <Card>
            <CardHeader>
              <CardTitle>Typography Scale</CardTitle>
              <CardDescription>
                Heading: {config.headingFont} • Body: {config.bodyFont}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Heading level={1}>Heading Level 1</Heading>
              <Heading level={2}>Heading Level 2</Heading>
              <Heading level={3}>Heading Level 3</Heading>
              <Text>
                Body text uses the selected font family. Lorem ipsum dolor sit amet, consectetur adipiscing elit. This
                paragraph demonstrates how body copy will appear throughout the application.
              </Text>
            </CardContent>
          </Card>

          {/* Chart Example */}
          <div>
            <ChartAreaInteractive palette={config.chartPalette as any} />
          </div>

          {/* Dashboard Example */}
          <Card>
            <CardHeader>
              <CardTitle>Example Dashboard Card</CardTitle>
              <CardDescription>Full brand integration in context</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg space-y-2">
                  <Text variant="small" className="text-muted-foreground">
                    Total Revenue
                  </Text>
                  <Heading level={3}>$142,580</Heading>
                  <Badge variant="secondary">+12.5%</Badge>
                </div>
                <div className="p-4 border rounded-lg space-y-2">
                  <Text variant="small" className="text-muted-foreground">
                    Active Users
                  </Text>
                  <Heading level={3}>2,845</Heading>
                  <Badge>+8.2%</Badge>
                </div>
                <div className="p-4 border rounded-lg space-y-2">
                  <Text variant="small" className="text-muted-foreground">
                    Conversion
                  </Text>
                  <Heading level={3}>3.24%</Heading>
                  <Badge variant="outline">+0.4%</Badge>
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-end gap-2">
              <Button variant="outline">View Details</Button>
              <Button>Export Report</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Utility: Convert hex to HSL (simplified)
function hexToHSL(hex: string): string {
  // Remove # if present
  hex = hex.replace('#', '')

  // Convert to RGB
  const r = parseInt(hex.substring(0, 2), 16) / 255
  const g = parseInt(hex.substring(2, 4), 16) / 255
  const b = parseInt(hex.substring(4, 6), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / d + 2) / 6
        break
      case b:
        h = ((r - g) / d + 4) / 6
        break
    }
  }

  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`
}

const meta = {
  title: '0-Defaults/Configurator',
  component: GeneratorConfigurator,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Full generator configuration interface. This mirrors the exact form that will be used in the Client Software Generator, with live preview of all brand settings.',
      },
    },
  },
} satisfies Meta<typeof GeneratorConfigurator>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
