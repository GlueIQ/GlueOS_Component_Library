/**
 * Tailwind CSS v3 chromatic palettes for chart color schemes.
 *
 * All 17 chromatic palettes with 11 shades each in OKLch format.
 * Used to generate --chart-1 through --chart-5 CSS variables.
 *
 * Shade selection strategy:
 *   Light mode: 500, 400, 600, 300, 700 (darker values for white backgrounds)
 *   Dark mode:  400, 300, 500, 200, 600 (lighter values for dark backgrounds)
 */

import type { PaletteScale, PaletteShade } from "./palettes"

export type ChromaticPaletteName =
  | "red"
  | "orange"
  | "amber"
  | "yellow"
  | "lime"
  | "green"
  | "emerald"
  | "teal"
  | "cyan"
  | "sky"
  | "blue"
  | "indigo"
  | "violet"
  | "purple"
  | "fuchsia"
  | "pink"
  | "rose"

/** Bold red — alerts, errors, passion */
const red: PaletteScale = {
  "50": "oklch(0.971 0.013 17.380)",
  "100": "oklch(0.936 0.031 17.717)",
  "200": "oklch(0.885 0.059 18.334)",
  "300": "oklch(0.808 0.103 19.571)",
  "400": "oklch(0.711 0.166 22.216)",
  "500": "oklch(0.637 0.208 25.331)",
  "600": "oklch(0.577 0.215 27.325)",
  "700": "oklch(0.505 0.190 27.518)",
  "800": "oklch(0.444 0.161 26.899)",
  "900": "oklch(0.396 0.133 25.723)",
  "950": "oklch(0.258 0.089 26.042)",
}

/** Warm orange — energy, enthusiasm */
const orange: PaletteScale = {
  "50": "oklch(0.980 0.016 73.684)",
  "100": "oklch(0.954 0.037 75.164)",
  "200": "oklch(0.901 0.073 70.697)",
  "300": "oklch(0.837 0.117 66.290)",
  "400": "oklch(0.758 0.159 55.934)",
  "500": "oklch(0.705 0.187 47.604)",
  "600": "oklch(0.646 0.194 41.116)",
  "700": "oklch(0.553 0.174 38.402)",
  "800": "oklch(0.470 0.143 37.304)",
  "900": "oklch(0.408 0.116 38.172)",
  "950": "oklch(0.266 0.076 36.259)",
}

/** Rich amber — warmth, caution */
const amber: PaletteScale = {
  "50": "oklch(0.987 0.021 95.277)",
  "100": "oklch(0.962 0.058 95.617)",
  "200": "oklch(0.924 0.115 95.746)",
  "300": "oklch(0.879 0.153 91.605)",
  "400": "oklch(0.837 0.164 84.429)",
  "500": "oklch(0.769 0.165 70.080)",
  "600": "oklch(0.666 0.157 58.318)",
  "700": "oklch(0.555 0.146 48.998)",
  "800": "oklch(0.473 0.125 46.201)",
  "900": "oklch(0.414 0.105 45.904)",
  "950": "oklch(0.279 0.074 45.635)",
}

/** Bright yellow — optimism, attention */
const yellow: PaletteScale = {
  "50": "oklch(0.987 0.026 102.212)",
  "100": "oklch(0.973 0.069 103.193)",
  "200": "oklch(0.945 0.124 101.540)",
  "300": "oklch(0.905 0.166 98.111)",
  "400": "oklch(0.861 0.173 91.936)",
  "500": "oklch(0.795 0.162 86.047)",
  "600": "oklch(0.681 0.142 75.834)",
  "700": "oklch(0.554 0.121 66.442)",
  "800": "oklch(0.476 0.103 61.907)",
  "900": "oklch(0.421 0.090 57.708)",
  "950": "oklch(0.286 0.064 53.813)",
}

/** Fresh lime — growth, vitality */
const lime: PaletteScale = {
  "50": "oklch(0.986 0.031 120.757)",
  "100": "oklch(0.967 0.066 122.328)",
  "200": "oklch(0.938 0.122 124.321)",
  "300": "oklch(0.897 0.179 126.665)",
  "400": "oklch(0.849 0.207 128.850)",
  "500": "oklch(0.768 0.204 130.850)",
  "600": "oklch(0.648 0.175 131.684)",
  "700": "oklch(0.532 0.141 131.589)",
  "800": "oklch(0.453 0.113 130.933)",
  "900": "oklch(0.405 0.096 131.063)",
  "950": "oklch(0.274 0.069 132.109)",
}

/** Natural green — success, health */
const green: PaletteScale = {
  "50": "oklch(0.982 0.018 155.826)",
  "100": "oklch(0.962 0.043 156.743)",
  "200": "oklch(0.925 0.081 155.995)",
  "300": "oklch(0.871 0.136 154.449)",
  "400": "oklch(0.800 0.182 151.711)",
  "500": "oklch(0.723 0.192 149.579)",
  "600": "oklch(0.627 0.170 149.214)",
  "700": "oklch(0.527 0.137 150.069)",
  "800": "oklch(0.448 0.108 151.328)",
  "900": "oklch(0.393 0.090 152.535)",
  "950": "oklch(0.266 0.063 152.934)",
}

/** Deep emerald — prosperity, elegance */
const emerald: PaletteScale = {
  "50": "oklch(0.979 0.021 166.113)",
  "100": "oklch(0.950 0.051 163.051)",
  "200": "oklch(0.905 0.089 164.150)",
  "300": "oklch(0.845 0.130 164.978)",
  "400": "oklch(0.773 0.153 163.223)",
  "500": "oklch(0.696 0.149 162.480)",
  "600": "oklch(0.596 0.127 163.225)",
  "700": "oklch(0.508 0.105 165.612)",
  "800": "oklch(0.432 0.086 166.913)",
  "900": "oklch(0.378 0.073 168.940)",
  "950": "oklch(0.262 0.049 172.552)",
}

/** Cool teal — clarity, sophistication */
const teal: PaletteScale = {
  "50": "oklch(0.984 0.014 180.720)",
  "100": "oklch(0.953 0.050 180.801)",
  "200": "oklch(0.910 0.093 180.426)",
  "300": "oklch(0.855 0.125 181.071)",
  "400": "oklch(0.785 0.133 181.912)",
  "500": "oklch(0.704 0.123 182.503)",
  "600": "oklch(0.600 0.104 184.704)",
  "700": "oklch(0.511 0.086 186.391)",
  "800": "oklch(0.437 0.071 188.216)",
  "900": "oklch(0.386 0.059 188.416)",
  "950": "oklch(0.277 0.045 192.524)",
}

/** Vibrant cyan — freshness, innovation */
const cyan: PaletteScale = {
  "50": "oklch(0.984 0.019 200.873)",
  "100": "oklch(0.956 0.044 203.388)",
  "200": "oklch(0.917 0.077 205.041)",
  "300": "oklch(0.865 0.115 207.078)",
  "400": "oklch(0.797 0.134 211.530)",
  "500": "oklch(0.715 0.126 215.221)",
  "600": "oklch(0.609 0.111 221.723)",
  "700": "oklch(0.520 0.094 223.128)",
  "800": "oklch(0.450 0.077 224.283)",
  "900": "oklch(0.398 0.066 227.392)",
  "950": "oklch(0.302 0.054 229.695)",
}

/** Open sky — trust, tranquility */
const sky: PaletteScale = {
  "50": "oklch(0.977 0.012 236.620)",
  "100": "oklch(0.951 0.025 236.824)",
  "200": "oklch(0.901 0.055 230.902)",
  "300": "oklch(0.828 0.101 230.318)",
  "400": "oklch(0.754 0.139 232.661)",
  "500": "oklch(0.685 0.148 237.323)",
  "600": "oklch(0.588 0.139 241.966)",
  "700": "oklch(0.500 0.119 242.749)",
  "800": "oklch(0.443 0.100 240.790)",
  "900": "oklch(0.391 0.085 240.876)",
  "950": "oklch(0.293 0.063 243.157)",
}

/** Classic blue — reliability, depth */
const blue: PaletteScale = {
  "50": "oklch(0.970 0.014 254.604)",
  "100": "oklch(0.932 0.032 255.585)",
  "200": "oklch(0.882 0.057 254.128)",
  "300": "oklch(0.809 0.096 251.813)",
  "400": "oklch(0.714 0.143 254.624)",
  "500": "oklch(0.623 0.188 259.815)",
  "600": "oklch(0.546 0.215 262.881)",
  "700": "oklch(0.488 0.217 264.376)",
  "800": "oklch(0.424 0.181 265.638)",
  "900": "oklch(0.379 0.138 265.522)",
  "950": "oklch(0.282 0.087 267.935)",
}

/** Rich indigo — intuition, focus */
const indigo: PaletteScale = {
  "50": "oklch(0.962 0.018 272.314)",
  "100": "oklch(0.930 0.033 272.788)",
  "200": "oklch(0.870 0.062 274.039)",
  "300": "oklch(0.785 0.104 274.713)",
  "400": "oklch(0.680 0.158 276.935)",
  "500": "oklch(0.585 0.204 277.117)",
  "600": "oklch(0.511 0.230 276.966)",
  "700": "oklch(0.457 0.215 277.023)",
  "800": "oklch(0.398 0.177 277.366)",
  "900": "oklch(0.359 0.135 278.697)",
  "950": "oklch(0.257 0.086 281.288)",
}

/** Vivid violet — creativity, luxury */
const violet: PaletteScale = {
  "50": "oklch(0.969 0.016 293.756)",
  "100": "oklch(0.943 0.028 294.588)",
  "200": "oklch(0.894 0.055 293.283)",
  "300": "oklch(0.811 0.101 293.571)",
  "400": "oklch(0.709 0.159 293.541)",
  "500": "oklch(0.606 0.219 292.717)",
  "600": "oklch(0.541 0.247 293.009)",
  "700": "oklch(0.491 0.241 292.581)",
  "800": "oklch(0.432 0.211 292.759)",
  "900": "oklch(0.380 0.178 293.745)",
  "950": "oklch(0.283 0.135 291.089)",
}

/** Royal purple — imagination, wisdom */
const purple: PaletteScale = {
  "50": "oklch(0.977 0.014 308.299)",
  "100": "oklch(0.946 0.033 307.174)",
  "200": "oklch(0.902 0.060 306.703)",
  "300": "oklch(0.827 0.108 306.383)",
  "400": "oklch(0.722 0.177 305.504)",
  "500": "oklch(0.627 0.233 303.900)",
  "600": "oklch(0.558 0.252 302.321)",
  "700": "oklch(0.496 0.237 301.924)",
  "800": "oklch(0.438 0.198 303.724)",
  "900": "oklch(0.381 0.166 304.987)",
  "950": "oklch(0.291 0.143 302.717)",
}

/** Electric fuchsia — bold, playful */
const fuchsia: PaletteScale = {
  "50": "oklch(0.977 0.017 320.058)",
  "100": "oklch(0.952 0.036 318.852)",
  "200": "oklch(0.903 0.073 319.620)",
  "300": "oklch(0.833 0.132 321.434)",
  "400": "oklch(0.748 0.207 322.160)",
  "500": "oklch(0.667 0.259 322.150)",
  "600": "oklch(0.591 0.257 322.896)",
  "700": "oklch(0.518 0.226 323.949)",
  "800": "oklch(0.452 0.192 324.591)",
  "900": "oklch(0.401 0.160 325.612)",
  "950": "oklch(0.293 0.131 325.661)",
}

/** Soft pink — warmth, approachability */
const pink: PaletteScale = {
  "50": "oklch(0.971 0.014 343.198)",
  "100": "oklch(0.948 0.028 342.258)",
  "200": "oklch(0.899 0.059 343.231)",
  "300": "oklch(0.823 0.110 346.018)",
  "400": "oklch(0.725 0.175 349.761)",
  "500": "oklch(0.656 0.212 354.308)",
  "600": "oklch(0.592 0.218 0.584)",
  "700": "oklch(0.525 0.199 3.958)",
  "800": "oklch(0.459 0.170 3.815)",
  "900": "oklch(0.408 0.144 2.432)",
  "950": "oklch(0.284 0.105 3.907)",
}

/** Elegant rose — romance, refinement */
const rose: PaletteScale = {
  "50": "oklch(0.969 0.015 12.422)",
  "100": "oklch(0.941 0.030 12.580)",
  "200": "oklch(0.892 0.056 10.001)",
  "300": "oklch(0.810 0.106 11.638)",
  "400": "oklch(0.719 0.169 13.428)",
  "500": "oklch(0.645 0.215 16.439)",
  "600": "oklch(0.586 0.222 17.585)",
  "700": "oklch(0.514 0.198 16.935)",
  "800": "oklch(0.455 0.171 13.697)",
  "900": "oklch(0.410 0.150 10.272)",
  "950": "oklch(0.271 0.101 12.094)",
}

export const chromaticPalettes: Record<ChromaticPaletteName, PaletteScale> = {
  red,
  orange,
  amber,
  yellow,
  lime,
  green,
  emerald,
  teal,
  cyan,
  sky,
  blue,
  indigo,
  violet,
  purple,
  fuchsia,
  pink,
  rose,
}

export const chartPaletteDescriptions: Record<ChromaticPaletteName, string> = {
  red: "Bold red — alerts, errors, passion",
  orange: "Warm orange — energy, enthusiasm",
  amber: "Rich amber — warmth, caution",
  yellow: "Bright yellow — optimism, attention",
  lime: "Fresh lime — growth, vitality",
  green: "Natural green — success, health",
  emerald: "Deep emerald — prosperity, elegance",
  teal: "Cool teal — clarity, sophistication",
  cyan: "Vibrant cyan — freshness, innovation",
  sky: "Open sky — trust, tranquility",
  blue: "Classic blue — reliability, depth",
  indigo: "Rich indigo — intuition, focus",
  violet: "Vivid violet — creativity, luxury",
  purple: "Royal purple — imagination, wisdom",
  fuchsia: "Electric fuchsia — bold, playful",
  pink: "Soft pink — warmth, approachability",
  rose: "Elegant rose — romance, refinement",
}

export const CHART_PALETTE_NAMES: ChromaticPaletteName[] = [
  "red", "orange", "amber", "yellow", "lime",
  "green", "emerald", "teal", "cyan", "sky",
  "blue", "indigo", "violet", "purple", "fuchsia",
  "pink", "rose",
]

const LIGHT_SHADES: PaletteShade[] = ["500", "400", "600", "300", "700"]
const DARK_SHADES: PaletteShade[] = ["400", "300", "500", "200", "600"]

export function getChartColors(palette: ChromaticPaletteName): {
  light: [string, string, string, string, string]
  dark: [string, string, string, string, string]
} {
  const pal = chromaticPalettes[palette]
  return {
    light: LIGHT_SHADES.map((s) => pal[s]) as [string, string, string, string, string],
    dark: DARK_SHADES.map((s) => pal[s]) as [string, string, string, string, string],
  }
}
