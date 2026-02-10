"use client"

import { useMemo } from "react"
import {
  neutralPalettes,
  type NeutralPaletteName,
} from "@repo/ui/lib/colors/palettes"
import { hexToOklch } from "@repo/ui/lib/colors/generate-theme"
import { Button } from "@repo/ui/components/ui/button"
import { Badge } from "@repo/ui/components/ui/badge"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@repo/ui/components/ui/card"
import { Input } from "@repo/ui/components/ui/input"
import { Label } from "@repo/ui/components/ui/label"
import { Separator } from "@repo/ui/components/ui/separator"

interface ThemePreviewProps {
  palette: NeutralPaletteName
  brandColors: {
    primary?: string
    secondary?: string
    accent?: string
  }
  radius: string
}

export function ThemePreview({
  palette,
  brandColors,
  radius,
}: ThemePreviewProps) {
  const cssVars = useMemo(() => {
    const pal = neutralPalettes[palette]
    const vars: Record<string, string> = {}

    // Layer 1: Neutral palette
    for (const [shade, value] of Object.entries(pal)) {
      vars[`--color-neutral-${shade}`] = value
    }

    // Layer 2: Brand colors
    if (brandColors.primary) {
      vars["--color-brand-primary"] = hexToOklch(brandColors.primary)
      vars["--color-brand-primary-foreground"] = "oklch(1 0 0)"
    } else {
      vars["--color-brand-primary"] = "var(--color-neutral-900)"
      vars["--color-brand-primary-foreground"] = "var(--color-neutral-50)"
    }

    if (brandColors.secondary) {
      vars["--color-brand-secondary"] = hexToOklch(brandColors.secondary)
      vars["--color-brand-secondary-foreground"] = "oklch(1 0 0)"
    } else {
      vars["--color-brand-secondary"] = "var(--color-neutral-100)"
      vars["--color-brand-secondary-foreground"] = "var(--color-neutral-900)"
    }

    if (brandColors.accent) {
      vars["--color-brand-accent"] = hexToOklch(brandColors.accent)
      vars["--color-brand-accent-foreground"] = "var(--color-neutral-950)"
    } else {
      vars["--color-brand-accent"] = "var(--color-neutral-100)"
      vars["--color-brand-accent-foreground"] = "var(--color-neutral-900)"
    }

    vars["--color-brand-destructive"] = "oklch(0.577 0.245 27.325)"
    vars["--color-brand-destructive-foreground"] = "oklch(1 0 0)"

    // Layer 3: Semantic mappings
    vars["--radius"] = `${radius}rem`
    vars["--background"] = "oklch(1 0 0)"
    vars["--foreground"] = "var(--color-neutral-950)"
    vars["--card"] = "oklch(1 0 0)"
    vars["--card-foreground"] = "var(--color-neutral-950)"
    vars["--popover"] = "oklch(1 0 0)"
    vars["--popover-foreground"] = "var(--color-neutral-950)"
    vars["--primary"] = "var(--color-brand-primary)"
    vars["--primary-foreground"] = "var(--color-brand-primary-foreground)"
    vars["--secondary"] = "var(--color-brand-secondary)"
    vars["--secondary-foreground"] = "var(--color-brand-secondary-foreground)"
    vars["--muted"] = "var(--color-neutral-100)"
    vars["--muted-foreground"] = "var(--color-neutral-500)"
    vars["--accent"] = "var(--color-brand-accent)"
    vars["--accent-foreground"] = "var(--color-brand-accent-foreground)"
    vars["--destructive"] = "var(--color-brand-destructive)"
    vars["--destructive-foreground"] = "var(--color-brand-destructive-foreground)"
    vars["--border"] = "var(--color-neutral-200)"
    vars["--input"] = "var(--color-neutral-200)"
    vars["--ring"] = "var(--color-neutral-400)"

    vars["--sidebar"] = "var(--color-neutral-50)"
    vars["--sidebar-foreground"] = "var(--color-neutral-950)"
    vars["--sidebar-primary"] = "var(--color-brand-primary)"
    vars["--sidebar-primary-foreground"] = "var(--color-brand-primary-foreground)"
    vars["--sidebar-accent"] = "var(--color-neutral-100)"
    vars["--sidebar-accent-foreground"] = "var(--color-neutral-900)"
    vars["--sidebar-border"] = "var(--color-neutral-200)"
    vars["--sidebar-ring"] = "var(--color-neutral-400)"

    return vars
  }, [palette, brandColors, radius])

  return (
    <div style={cssVars as React.CSSProperties}>
      <Card>
        <CardHeader>
          <CardTitle>Live Preview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Buttons */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Buttons</p>
            <div className="flex flex-wrap gap-2">
              <Button variant="default" size="sm">Primary</Button>
              <Button variant="secondary" size="sm">Secondary</Button>
              <Button variant="outline" size="sm">Outline</Button>
              <Button variant="ghost" size="sm">Ghost</Button>
              <Button variant="destructive" size="sm">Destructive</Button>
            </div>
          </div>

          <Separator />

          {/* Badges */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Badges</p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </div>
          </div>

          <Separator />

          {/* Form Sample */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Form</p>
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="preview-email">Email</Label>
                <Input
                  id="preview-email"
                  type="email"
                  placeholder="you@example.com"
                  readOnly
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="preview-name">Name</Label>
                <Input
                  id="preview-name"
                  placeholder="John Doe"
                  readOnly
                />
              </div>
              <Button className="w-full" size="sm">
                Submit
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
