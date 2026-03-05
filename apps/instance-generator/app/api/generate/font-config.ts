export interface FontConfig {
  headingFont: string
  bodyFont: string
}

/** Map of supported fonts to their next/font/google import names */
const GOOGLE_FONTS: Record<string, { importName: string }> = {
  "Geist": { importName: "Geist" },
  "Inter": { importName: "Inter" },
  "Roboto": { importName: "Roboto" },
  "Open Sans": { importName: "Open_Sans" },
  "Lato": { importName: "Lato" },
  "Montserrat": { importName: "Montserrat" },
  "Poppins": { importName: "Poppins" },
  "Raleway": { importName: "Raleway" },
  "Nunito": { importName: "Nunito" },
  "Playfair Display": { importName: "Playfair_Display" },
  "Merriweather": { importName: "Merriweather" },
  "DM Sans": { importName: "DM_Sans" },
  "Space Grotesk": { importName: "Space_Grotesk" },
  "Plus Jakarta Sans": { importName: "Plus_Jakarta_Sans" },
}

function lookupFont(name: string): { importName: string } | null {
  if (name === "System Default") return null
  return GOOGLE_FONTS[name] ?? null
}

/**
 * Generate import statements for next/font/google.
 *
 * Examples:
 *   import { Inter } from "next/font/google";
 *   import { Playfair_Display } from "next/font/google";
 *
 * If heading and body are the same font, only one import line is emitted.
 * If either font is "System Default", no import is generated for that slot.
 */
export function generateFontImports(config: FontConfig): string {
  const heading = lookupFont(config.headingFont)
  const body = lookupFont(config.bodyFont)

  // Collect unique imports
  const imports = new Map<string, string>()

  if (heading) {
    imports.set(heading.importName, `import { ${heading.importName} } from "next/font/google";`)
  }
  if (body && (!heading || body.importName !== heading.importName)) {
    imports.set(body.importName, `import { ${body.importName} } from "next/font/google";`)
  }

  return Array.from(imports.values()).join("\n")
}

/**
 * Generate const declarations for font instances.
 *
 * Examples:
 *   const headingFont = Inter({ variable: "--font-heading", subsets: ["latin"] });
 *   const bodyFont = Playfair_Display({ variable: "--font-body", subsets: ["latin"] });
 *
 * If heading and body use the same Google font, a single declaration is emitted
 * using the variable name "headingFont" with the "--font-heading" CSS variable.
 *
 * If a slot is "System Default", no declaration is emitted for it.
 */
export function generateFontDeclarations(config: FontConfig): string {
  const heading = lookupFont(config.headingFont)
  const body = lookupFont(config.bodyFont)
  const sameFonts = heading && body && heading.importName === body.importName

  const declarations: string[] = []

  if (heading) {
    declarations.push(
      `const headingFont = ${heading.importName}({ variable: "--font-heading", subsets: ["latin"] });`
    )
  }

  if (body && !sameFonts) {
    declarations.push(
      `const bodyFont = ${body.importName}({ variable: "--font-body", subsets: ["latin"] });`
    )
  }

  return declarations.join("\n")
}

/**
 * Generate the className interpolation for the <body> tag.
 *
 * Examples:
 *   ${headingFont.variable} ${bodyFont.variable}
 *   ${headingFont.variable}                        (when same font for both)
 *   (empty string)                                 (when both are System Default)
 */
export function generateFontVariables(config: FontConfig): string {
  const heading = lookupFont(config.headingFont)
  const body = lookupFont(config.bodyFont)
  const sameFonts = heading && body && heading.importName === body.importName

  const parts: string[] = []

  if (heading) {
    parts.push("${headingFont.variable}")
  }
  if (body && !sameFonts) {
    parts.push("${bodyFont.variable}")
  }

  return parts.join(" ")
}
