"use client"

import { useState, useCallback } from "react"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import type { NeutralPaletteName } from "@repo/ui/lib/colors/palettes"
import { Button } from "@repo/ui/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@repo/ui/components/ui/card"
import { Input } from "@repo/ui/components/ui/input"
import { Label } from "@repo/ui/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select"
import { Slider } from "@repo/ui/components/ui/slider"
import { Separator } from "@repo/ui/components/ui/separator"
import type { ChromaticPaletteName } from "@repo/ui/lib/colors/chart-palettes"
import { ChartPalettePicker } from "./chart-palette-picker"
import { ColorInput } from "./color-input"
import { LogoUpload } from "./logo-upload"
import { PalettePicker } from "./palette-picker"
import { ThemePreview } from "./theme-preview"

const FONT_OPTIONS = [
  "Geist",
  "Inter",
  "Roboto",
  "Open Sans",
  "Lato",
  "Montserrat",
  "Poppins",
  "Raleway",
  "Nunito",
  "Playfair Display",
  "Merriweather",
  "DM Sans",
  "Space Grotesk",
  "Plus Jakarta Sans",
  "System Default",
]

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
}

export function GeneratorForm() {
  const [clientName, setClientName] = useState("")
  const [projectSlug, setProjectSlug] = useState("")
  const [palette, setPalette] = useState<NeutralPaletteName>("zinc")
  const [primaryColor, setPrimaryColor] = useState("#BC0059")
  const [secondaryColor, setSecondaryColor] = useState("")
  const [accentColor, setAccentColor] = useState("")
  const [chartPalette, setChartPalette] = useState<ChromaticPaletteName>("pink")
  const [headingFont, setHeadingFont] = useState("Geist")
  const [bodyFont, setBodyFont] = useState("Geist")
  const [radius, setRadius] = useState("0.625")
  const [logoIcon, setLogoIcon] = useState<string | null>(null)
  const [logoLight, setLogoLight] = useState<string | null>(null)
  const [logoDark, setLogoDark] = useState<string | null>(null)
  const [faviconSvg, setFaviconSvg] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleClientNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const name = e.target.value
      setClientName(name)
      setProjectSlug(toSlug(name))
    },
    []
  )

  const handleSlugChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setProjectSlug(e.target.value)
    },
    []
  )

  const handleGenerate = useCallback(async () => {
    if (!clientName.trim()) return

    setIsGenerating(true)
    try {
      const payload = {
        clientName,
        projectSlug: projectSlug || toSlug(clientName),
        palette,
        brandColors: {
          primary: primaryColor || undefined,
          secondary: secondaryColor || undefined,
          accent: accentColor || undefined,
        },
        chartPalette,
        headingFont,
        bodyFont,
        radius,
        logos: {
          icon: logoIcon || undefined,
          light: logoLight || undefined,
          dark: logoDark || undefined,
          favicon: faviconSvg || undefined,
        },
      }

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const error = await response.json()
        toast.error("Generation failed", { description: error.message })
        return
      }

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${projectSlug || toSlug(clientName)}-workspace.zip`
      a.click()
      URL.revokeObjectURL(url)
      toast.success("Project generated!", {
        description: `${projectSlug || toSlug(clientName)}-workspace.zip downloaded`,
      })
    } catch (err) {
      toast.error("Generation failed", {
        description: err instanceof Error ? err.message : "An unexpected error occurred",
      })
    } finally {
      setIsGenerating(false)
    }
  }, [
    clientName,
    projectSlug,
    palette,
    chartPalette,
    primaryColor,
    secondaryColor,
    accentColor,
    headingFont,
    bodyFont,
    radius,
    logoIcon,
    logoLight,
    logoDark,
    faviconSvg,
  ])

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
      {/* Left Column: Form */}
      <div className="space-y-6">
        {/* Section 1: Client Information */}
        <Card>
          <CardHeader>
            <CardTitle>Client Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="client-name">Client Name</Label>
              <Input
                id="client-name"
                value={clientName}
                onChange={handleClientNameChange}
                placeholder="e.g. Acme Corporation"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="project-slug">Project Slug</Label>
              <Input
                id="project-slug"
                value={projectSlug}
                onChange={handleSlugChange}
                placeholder="e.g. acme-corporation"
                className="font-mono"
              />
              <p className="text-xs text-muted-foreground">
                Used as the directory and package name
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Section 2: Neutral Palette */}
        <Card>
          <CardHeader>
            <CardTitle>Neutral Palette</CardTitle>
          </CardHeader>
          <CardContent>
            <PalettePicker value={palette} onChange={setPalette} />
          </CardContent>
        </Card>

        {/* Section 3: Brand Colors */}
        <Card>
          <CardHeader>
            <CardTitle>Brand Colors</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ColorInput
              label="Primary Color"
              value={primaryColor}
              onChange={setPrimaryColor}
              id="primary-color"
            />
            <ColorInput
              label="Secondary Color (optional)"
              value={secondaryColor}
              onChange={setSecondaryColor}
              id="secondary-color"
            />
            <ColorInput
              label="Accent Color (optional)"
              value={accentColor}
              onChange={setAccentColor}
              id="accent-color"
            />
          </CardContent>
        </Card>

        {/* Section 4: Chart Colors */}
        <Card>
          <CardHeader>
            <CardTitle>Chart Colors</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartPalettePicker value={chartPalette} onChange={setChartPalette} />
          </CardContent>
        </Card>

        {/* Section 5: Logos & Branding */}
        <Card>
          <CardHeader>
            <CardTitle>Logos & Branding</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 sm:grid-cols-2">
              <LogoUpload
                label="Logo Icon"
                description="A compact icon or symbol, ideally square. Used when the sidebar is collapsed."
                value={logoIcon}
                onChange={setLogoIcon}
                id="logo-icon"
              />
              <LogoUpload
                label="Logo (Light)"
                description="Your full logo in light/white color. Displayed on dark backgrounds and dark mode."
                value={logoLight}
                onChange={setLogoLight}
                id="logo-light"
              />
              <LogoUpload
                label="Logo (Dark)"
                description="Your full logo in dark color. Displayed on light backgrounds and light mode."
                value={logoDark}
                onChange={setLogoDark}
                id="logo-dark"
              />
              <LogoUpload
                label="Favicon"
                description="A small square icon for the browser tab. Works best at 32×32 or 16×16."
                value={faviconSvg}
                onChange={setFaviconSvg}
                id="favicon"
              />
            </div>
          </CardContent>
        </Card>

        {/* Section 5: Typography */}
        <Card>
          <CardHeader>
            <CardTitle>Typography</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Heading Font</Label>
                <Select value={headingFont} onValueChange={setHeadingFont}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select font" />
                  </SelectTrigger>
                  <SelectContent>
                    {FONT_OPTIONS.map((font) => (
                      <SelectItem key={font} value={font}>
                        {font}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Body Font</Label>
                <Select value={bodyFont} onValueChange={setBodyFont}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select font" />
                  </SelectTrigger>
                  <SelectContent>
                    {FONT_OPTIONS.map((font) => (
                      <SelectItem key={font} value={font}>
                        {font}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 5: Border Radius */}
        <Card>
          <CardHeader>
            <CardTitle>Border Radius</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Radius</Label>
              <span className="text-sm font-mono text-muted-foreground">
                {radius}rem
              </span>
            </div>
            <Slider
              min={0}
              max={1}
              step={0.125}
              value={[parseFloat(radius)]}
              onValueChange={(value) => setRadius((value[0] ?? 0.625).toString())}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Sharp (0rem)</span>
              <span>Round (1rem)</span>
            </div>
          </CardContent>
        </Card>

        <Separator />

        {/* Generate Button */}
        <Button
          className="w-full"
          size="lg"
          onClick={handleGenerate}
          disabled={!clientName.trim() || isGenerating}
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Generating...
            </>
          ) : (
            "Generate UI Kit"
          )}
        </Button>
      </div>

      {/* Right Column: Preview */}
      <div className="lg:sticky lg:top-8 lg:self-start">
        <ThemePreview
          palette={palette}
          brandColors={{
            primary: primaryColor || undefined,
            secondary: secondaryColor || undefined,
            accent: accentColor || undefined,
          }}
          radius={radius}
          logos={{
            icon: logoIcon,
            light: logoLight,
            dark: logoDark,
            favicon: faviconSvg,
          }}
        />
      </div>
    </div>
  )
}
