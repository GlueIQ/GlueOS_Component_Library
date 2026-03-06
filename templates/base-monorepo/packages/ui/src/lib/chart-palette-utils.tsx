"use client"

import * as React from "react"
import { getChartColors, type ChromaticPaletteName } from "./colors/chart-palettes"

/**
 * Injects scoped CSS variables (--chart-1 through --chart-5) for a given
 * Tailwind chromatic palette. Handles both light and dark mode via
 * [data-chart-palette] and .dark [data-chart-palette] selectors.
 *
 * CSS custom properties inherit, so setting them on an ancestor div
 * cascades down through ChartContainer and its ChartStyle component.
 */
export function ChartPaletteStyle({
  palette,
  scopeId,
}: {
  palette: ChromaticPaletteName
  scopeId: string
}) {
  const colors = getChartColors(palette)

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
[data-chart-palette="${scopeId}"] {
  --chart-1: ${colors.light[0]};
  --chart-2: ${colors.light[1]};
  --chart-3: ${colors.light[2]};
  --chart-4: ${colors.light[3]};
  --chart-5: ${colors.light[4]};
}
.dark [data-chart-palette="${scopeId}"] {
  --chart-1: ${colors.dark[0]};
  --chart-2: ${colors.dark[1]};
  --chart-3: ${colors.dark[2]};
  --chart-4: ${colors.dark[3]};
  --chart-5: ${colors.dark[4]};
}`,
      }}
    />
  )
}
