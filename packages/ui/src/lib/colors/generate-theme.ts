/**
 * Theme CSS generator for the GlueOS color system.
 *
 * Takes a neutral palette name and optional brand colors,
 * then generates the full CSS variable block for globals.css.
 *
 * Usage:
 *   const css = generateThemeCSS({
 *     neutralPalette: "zinc",
 *     brandColors: {
 *       primary: "#FF6B35",
 *       secondary: "#004E89",
 *       accent: "#F7C935",
 *     },
 *   })
 */

import {
  neutralPalettes,
  type NeutralPaletteName,
  type PaletteScale,
} from "./palettes"
import { getChartColors, type ChromaticPaletteName } from "./chart-palettes"

export interface BrandColors {
  primary?: string
  secondary?: string
  accent?: string
}

export interface ThemeConfig {
  neutralPalette: NeutralPaletteName
  brandColors?: BrandColors
  radius?: string
  chartPalette?: ChromaticPaletteName
}

/**
 * Convert a hex color to OKLch CSS string.
 * Uses the sRGB → linear RGB → OKLab → OKLch conversion pipeline.
 */
export function hexToOklch(hex: string): string {
  const rgb = hexToRgb(hex)
  if (!rgb) return "oklch(0.5 0 0)"

  const r = srgbToLinear(rgb[0])
  const g = srgbToLinear(rgb[1])
  const b = srgbToLinear(rgb[2])
  const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b
  const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b
  const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b

  const l_ = Math.cbrt(l)
  const m_ = Math.cbrt(m)
  const s_ = Math.cbrt(s)

  const labL = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_
  const labA = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_
  const labB = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_

  const C = Math.sqrt(labA * labA + labB * labB)
  let H = (Math.atan2(labB, labA) * 180) / Math.PI
  if (H < 0) H += 360

  if (C < 0.001) {
    return `oklch(${labL.toFixed(3)} 0 0)`
  }

  return `oklch(${labL.toFixed(3)} ${C.toFixed(3)} ${H.toFixed(2)})`
}

function hexToRgb(hex: string): [number, number, number] | null {
  const cleaned = hex.replace(/^#/, "")
  if (cleaned.length !== 6 && cleaned.length !== 3) return null

  const full =
    cleaned.length === 3
      ? cleaned
          .split("")
          .map((c) => c + c)
          .join("")
      : cleaned

  const r = parseInt(full.slice(0, 2), 16) / 255
  const g = parseInt(full.slice(2, 4), 16) / 255
  const b = parseInt(full.slice(4, 6), 16) / 255

  return [r, g, b]
}

function srgbToLinear(c: number): number {
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
}

/**
 * Generate Layer 1 (neutral palette) CSS variables.
 */
function generateLayer1(palette: PaletteScale): string {
  const lines = Object.entries(palette).map(
    ([shade, value]) => `  --color-neutral-${shade}: ${value};`
  )
  return lines.join("\n")
}

/**
 * Generate Layer 2 (brand colors) CSS variables.
 * If no brand colors are provided, defaults reference the neutral palette.
 */
function generateLayer2Light(brand?: BrandColors): string {
  const primary = brand?.primary
    ? hexToOklch(brand.primary)
    : "var(--color-neutral-900)"
  const primaryFg = brand?.primary
    ? "oklch(1 0 0)"
    : "var(--color-neutral-50)"
  const secondary = brand?.secondary
    ? hexToOklch(brand.secondary)
    : "var(--color-neutral-100)"
  const secondaryFg = brand?.secondary
    ? "oklch(1 0 0)"
    : "var(--color-neutral-900)"
  const accent = brand?.accent
    ? hexToOklch(brand.accent)
    : "var(--color-neutral-100)"
  const accentFg = brand?.accent
    ? "var(--color-neutral-950)"
    : "var(--color-neutral-900)"

  return `  --color-brand-primary: ${primary};
  --color-brand-primary-foreground: ${primaryFg};
  --color-brand-secondary: ${secondary};
  --color-brand-secondary-foreground: ${secondaryFg};
  --color-brand-accent: ${accent};
  --color-brand-accent-foreground: ${accentFg};
  --color-brand-destructive: oklch(0.577 0.245 27.325);
  --color-brand-destructive-foreground: oklch(1 0 0);`
}

function generateLayer2Dark(brand?: BrandColors): string {
  const primary = brand?.primary
    ? hexToOklch(brand.primary)
    : "var(--color-neutral-200)"
  const primaryFg = brand?.primary
    ? "oklch(0.15 0 0)"
    : "var(--color-neutral-900)"
  const secondary = brand?.secondary
    ? hexToOklch(brand.secondary)
    : "var(--color-neutral-800)"
  const secondaryFg = brand?.secondary
    ? "oklch(1 0 0)"
    : "var(--color-neutral-50)"
  const accent = brand?.accent
    ? hexToOklch(brand.accent)
    : "var(--color-neutral-800)"
  const accentFg = brand?.accent
    ? "var(--color-neutral-950)"
    : "var(--color-neutral-50)"

  return `  --color-brand-primary: ${primary};
  --color-brand-primary-foreground: ${primaryFg};
  --color-brand-secondary: ${secondary};
  --color-brand-secondary-foreground: ${secondaryFg};
  --color-brand-accent: ${accent};
  --color-brand-accent-foreground: ${accentFg};
  --color-brand-destructive: oklch(0.704 0.191 22.216);
  --color-brand-destructive-foreground: var(--color-neutral-900);`
}

/**
 * Generate the complete theme CSS with all 3 layers.
 */
export function generateThemeCSS(config: ThemeConfig): string {
  const palette = neutralPalettes[config.neutralPalette]
  const radius = config.radius ?? "0.625rem"
  const chartColors = getChartColors(config.chartPalette ?? "pink")

  return `@tailwind base;
@tailwind components;
@tailwind utilities;

/* ==========================================================================
   LAYER 1: NEUTRAL PALETTE — "${config.neutralPalette}"
   Generator swaps this section to change the neutral tone of the UI.
   Options: slate | gray | zinc | neutral | stone
   ========================================================================== */

:root {
${generateLayer1(palette)}
}

/* ==========================================================================
   LAYER 2: BRAND COLORS
   Generator injects user brand colors here (hex → OKLch).
   When no brand colors are set, defaults reference the neutral palette.
   ========================================================================== */

:root {
${generateLayer2Light(config.brandColors)}
}

.dark {
${generateLayer2Dark(config.brandColors)}
}

/* ==========================================================================
   LAYER 3: SEMANTIC MAPPINGS
   Maps component tokens to Layer 1 (neutrals) and Layer 2 (brand).
   Components use ONLY these variables — never reference Layer 1/2 directly.
   ========================================================================== */

:root {
  --radius: ${radius};

  --background: oklch(1 0 0);
  --foreground: var(--color-neutral-950);
  --card: oklch(1 0 0);
  --card-foreground: var(--color-neutral-950);
  --popover: oklch(1 0 0);
  --popover-foreground: var(--color-neutral-950);

  --primary: var(--color-brand-primary);
  --primary-foreground: var(--color-brand-primary-foreground);
  --secondary: var(--color-brand-secondary);
  --secondary-foreground: var(--color-brand-secondary-foreground);
  --muted: var(--color-neutral-100);
  --muted-foreground: var(--color-neutral-500);
  --accent: var(--color-brand-accent);
  --accent-foreground: var(--color-brand-accent-foreground);
  --destructive: var(--color-brand-destructive);
  --destructive-foreground: var(--color-brand-destructive-foreground);

  --border: var(--color-neutral-200);
  --input: var(--color-neutral-200);
  --ring: var(--color-neutral-400);

  --chart-1: ${chartColors.light[0]};
  --chart-2: ${chartColors.light[1]};
  --chart-3: ${chartColors.light[2]};
  --chart-4: ${chartColors.light[3]};
  --chart-5: ${chartColors.light[4]};

  --sidebar: var(--color-neutral-50);
  --sidebar-foreground: var(--color-neutral-950);
  --sidebar-primary: var(--color-brand-primary);
  --sidebar-primary-foreground: var(--color-brand-primary-foreground);
  --sidebar-accent: var(--color-neutral-100);
  --sidebar-accent-foreground: var(--color-neutral-900);
  --sidebar-border: var(--color-neutral-200);
  --sidebar-ring: var(--color-neutral-400);
}

.dark {
  --background: var(--color-neutral-950);
  --foreground: var(--color-neutral-50);
  --card: var(--color-neutral-900);
  --card-foreground: var(--color-neutral-50);
  --popover: var(--color-neutral-900);
  --popover-foreground: var(--color-neutral-50);

  --primary: var(--color-brand-primary);
  --primary-foreground: var(--color-brand-primary-foreground);
  --secondary: var(--color-brand-secondary);
  --secondary-foreground: var(--color-brand-secondary-foreground);
  --muted: var(--color-neutral-800);
  --muted-foreground: var(--color-neutral-400);
  --accent: var(--color-brand-accent);
  --accent-foreground: var(--color-brand-accent-foreground);
  --destructive: var(--color-brand-destructive);
  --destructive-foreground: var(--color-brand-destructive-foreground);

  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: var(--color-neutral-500);

  --chart-1: ${chartColors.dark[0]};
  --chart-2: ${chartColors.dark[1]};
  --chart-3: ${chartColors.dark[2]};
  --chart-4: ${chartColors.dark[3]};
  --chart-5: ${chartColors.dark[4]};

  --sidebar: var(--color-neutral-900);
  --sidebar-foreground: var(--color-neutral-50);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: var(--color-neutral-50);
  --sidebar-accent: var(--color-neutral-800);
  --sidebar-accent-foreground: var(--color-neutral-50);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: var(--color-neutral-500);
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground;
  }
}
`
}
