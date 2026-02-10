/**
 * Pre-calculated OKLch neutral palettes for the GlueOS color system.
 *
 * Layer 1 of the 3-layer color architecture:
 *   Layer 1: Neutral palette (user picks slate/gray/zinc/neutral/stone)
 *   Layer 2: Brand colors (user provides hex → converted to OKLch)
 *   Layer 3: Semantic mappings (auto-generated from Layers 1 & 2)
 *
 * All values derived from Tailwind CSS v3 color palette, converted to OKLch.
 */

export type NeutralPaletteName = "slate" | "gray" | "zinc" | "neutral" | "stone"

export type PaletteShade =
  | "50"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900"
  | "950"

export type PaletteScale = Record<PaletteShade, string>

/** Slate — cool blue-gray undertones */
const slate: PaletteScale = {
  "50": "oklch(0.984 0.003 247.858)",
  "100": "oklch(0.968 0.007 247.896)",
  "200": "oklch(0.929 0.013 255.508)",
  "300": "oklch(0.869 0.022 252.894)",
  "400": "oklch(0.704 0.04 256.788)",
  "500": "oklch(0.554 0.046 257.417)",
  "600": "oklch(0.446 0.043 257.281)",
  "700": "oklch(0.372 0.044 257.287)",
  "800": "oklch(0.279 0.041 260.031)",
  "900": "oklch(0.208 0.042 265.755)",
  "950": "oklch(0.129 0.042 264.695)",
}

/** Gray — true neutral with minimal hue */
const gray: PaletteScale = {
  "50": "oklch(0.985 0.002 247.839)",
  "100": "oklch(0.967 0.003 264.542)",
  "200": "oklch(0.928 0.006 264.531)",
  "300": "oklch(0.872 0.01 258.338)",
  "400": "oklch(0.707 0.022 261.325)",
  "500": "oklch(0.551 0.027 264.364)",
  "600": "oklch(0.446 0.03 256.802)",
  "700": "oklch(0.373 0.034 259.733)",
  "800": "oklch(0.278 0.033 256.848)",
  "900": "oklch(0.21 0.034 264.665)",
  "950": "oklch(0.13 0.028 261.692)",
}

/** Zinc — warm gray with slight blue */
const zinc: PaletteScale = {
  "50": "oklch(0.985 0 0)",
  "100": "oklch(0.967 0.001 286.375)",
  "200": "oklch(0.92 0.004 286.32)",
  "300": "oklch(0.871 0.006 286.286)",
  "400": "oklch(0.705 0.015 286.067)",
  "500": "oklch(0.552 0.016 285.938)",
  "600": "oklch(0.442 0.017 285.786)",
  "700": "oklch(0.37 0.013 285.805)",
  "800": "oklch(0.274 0.006 286.033)",
  "900": "oklch(0.21 0.006 285.885)",
  "950": "oklch(0.141 0.005 285.823)",
}

/** Neutral — pure gray, no hue (default) */
const neutral: PaletteScale = {
  "50": "oklch(0.985 0 0)",
  "100": "oklch(0.97 0 0)",
  "200": "oklch(0.922 0 0)",
  "300": "oklch(0.87 0 0)",
  "400": "oklch(0.708 0 0)",
  "500": "oklch(0.556 0 0)",
  "600": "oklch(0.439 0 0)",
  "700": "oklch(0.371 0 0)",
  "800": "oklch(0.269 0 0)",
  "900": "oklch(0.205 0 0)",
  "950": "oklch(0.145 0 0)",
}

/** Stone — warm undertones */
const stone: PaletteScale = {
  "50": "oklch(0.985 0.001 106.424)",
  "100": "oklch(0.97 0.001 106.424)",
  "200": "oklch(0.923 0.003 48.717)",
  "300": "oklch(0.869 0.005 56.366)",
  "400": "oklch(0.706 0.015 56.259)",
  "500": "oklch(0.553 0.013 58.071)",
  "600": "oklch(0.444 0.011 73.639)",
  "700": "oklch(0.374 0.01 67.558)",
  "800": "oklch(0.268 0.007 34.298)",
  "900": "oklch(0.216 0.006 56.043)",
  "950": "oklch(0.147 0.004 49.25)",
}

export const neutralPalettes: Record<NeutralPaletteName, PaletteScale> = {
  slate,
  gray,
  zinc,
  neutral,
  stone,
}

export const paletteDescriptions: Record<NeutralPaletteName, string> = {
  slate: "Cool blue-gray undertones — modern, professional",
  gray: "True neutral with minimal hue — clean, versatile",
  zinc: "Warm gray with slight blue — balanced, refined",
  neutral: "Pure gray, no hue — maximally neutral",
  stone: "Warm undertones — approachable, organic",
}
