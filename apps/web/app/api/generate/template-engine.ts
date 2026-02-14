import * as fs from "fs"
import * as path from "path"
import * as os from "os"
import archiver from "archiver"
import {
  generateThemeCSS,
  type ThemeConfig,
} from "../../../../../packages/ui/src/lib/colors/generate-theme"
import {
  generateFontImports,
  generateFontDeclarations,
  generateFontVariables,
  type FontConfig,
} from "./font-config"

export interface GenerateConfig {
  clientName: string
  projectSlug: string
  neutralPalette: "slate" | "gray" | "zinc" | "neutral" | "stone"
  chartPalette?: "red" | "orange" | "amber" | "yellow" | "lime" | "green" | "emerald" | "teal" | "cyan" | "sky" | "blue" | "indigo" | "violet" | "purple" | "fuchsia" | "pink" | "rose"
  brandColors: {
    primary?: string
    secondary?: string
    accent?: string
  }
  headingFont: string
  bodyFont: string
  radius: string
  logos?: {
    icon?: string
    light?: string
    dark?: string
    favicon?: string
  }
}

/**
 * Generate a complete project workspace as a zip buffer.
 *
 * 1. Copies the base-monorepo template to a temp directory
 * 2. Generates a themed globals.css via the color system
 * 3. Replaces all placeholder markers with project-specific values
 * 4. Injects font configuration into layout.tsx
 * 5. Packages everything into a zip archive
 */
export async function generateProject(
  config: GenerateConfig,
): Promise<Buffer> {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "glueos-"))
  const projectDir = path.join(tmpDir, `${config.projectSlug}-workspace`)

  try {
    // Locate the template directory
    const templatePath = findTemplatePath()

    // Copy the entire template tree into a temp working directory
    copyDirRecursive(templatePath, projectDir)

    // Generate themed globals.css and write it into the UI package
    const themeConfig: ThemeConfig = {
      neutralPalette: config.neutralPalette,
      chartPalette: config.chartPalette,
      brandColors: config.brandColors.primary
        ? config.brandColors
        : undefined,
      radius: config.radius ? `${config.radius}rem` : undefined,
    }
    const globalsCss = generateThemeCSS(themeConfig)
    fs.writeFileSync(
      path.join(projectDir, "packages/ui/src/globals.css"),
      globalsCss,
    )

    // Replace scope placeholder in all text files.
    // The @__SCOPE__ form appears in CSS imports and package references.
    // The bare __SCOPE__ form appears in package.json names and other identifiers.
    replaceInAllFiles(projectDir, "@__SCOPE__", `@${config.projectSlug}`)
    replaceInAllFiles(projectDir, "__SCOPE__", config.projectSlug)

    // Replace client name placeholder
    replaceInAllFiles(projectDir, "__CLIENT_NAME__", config.clientName)

    // Inject font configuration into the web app layout
    const fontConfig: FontConfig = {
      headingFont: config.headingFont,
      bodyFont: config.bodyFont,
    }
    const layoutPath = path.join(
      projectDir,
      "apps/web/app/layout.tsx",
    )
    if (fs.existsSync(layoutPath)) {
      let layout = fs.readFileSync(layoutPath, "utf-8")
      layout = layout.replace("__FONT_IMPORTS__", generateFontImports(fontConfig))
      layout = layout.replace(
        "__FONT_DECLARATIONS__",
        generateFontDeclarations(fontConfig),
      )
      layout = layout.replace(
        "__FONT_VARIABLES__",
        generateFontVariables(fontConfig),
      )
      fs.writeFileSync(layoutPath, layout)
    }

    // Write logo SVG files to the web app's public directory
    if (config.logos) {
      const publicDir = path.join(projectDir, "apps/web/public")
      fs.mkdirSync(publicDir, { recursive: true })

      const logoFiles: [string | undefined, string][] = [
        [config.logos.icon, "logo-icon.svg"],
        [config.logos.light, "logo-light.svg"],
        [config.logos.dark, "logo-dark.svg"],
        [config.logos.favicon, "favicon.svg"],
      ]

      for (const [content, filename] of logoFiles) {
        if (content) {
          fs.writeFileSync(path.join(publicDir, filename), content)
        }
      }

      // Update layout.tsx metadata to reference the favicon if provided
      if (config.logos.favicon && fs.existsSync(layoutPath)) {
        let layout = fs.readFileSync(layoutPath, "utf-8")
        layout = layout.replace(
          'description: "Powered by GlueOS Design System",',
          'description: "Powered by GlueOS Design System",\n  icons: { icon: "/favicon.svg" },',
        )
        fs.writeFileSync(layoutPath, layout)
      }
    }

    // Copy Docker configuration files from templates/docker
    copyDockerTemplates(projectDir, config.clientName, config.projectSlug)

    // Package the project directory into a zip archive
    const zipBuffer = await createZip(
      projectDir,
      `${config.projectSlug}-workspace`,
    )

    return zipBuffer
  } finally {
    // Always clean up the temp directory
    fs.rmSync(tmpDir, { recursive: true, force: true })
  }
}

/**
 * Walk up from process.cwd() to locate templates/base-monorepo/.
 *
 * When Next.js runs via Turbopack from the monorepo root, process.cwd()
 * is typically the monorepo root, so the template is found immediately.
 * The upward walk handles cases where cwd is a nested directory.
 */
function findTemplatePath(): string {
  let dir = process.cwd()
  for (let i = 0; i < 10; i++) {
    const candidate = path.join(dir, "templates", "base-monorepo")
    if (fs.existsSync(candidate)) return candidate
    const parent = path.dirname(dir)
    if (parent === dir) break
    dir = parent
  }
  throw new Error(
    "Template directory not found. Ensure templates/base-monorepo/ exists at the monorepo root.",
  )
}

/**
 * Recursively copy a directory tree from src to dest.
 */
function copyDirRecursive(src: string, dest: string): void {
  fs.mkdirSync(dest, { recursive: true })
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath)
    } else {
      fs.copyFileSync(srcPath, destPath)
    }
  }
}

/** File extensions that are safe to perform text replacement on */
const TEXT_EXTENSIONS = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".json",
  ".css",
  ".yaml",
  ".yml",
  ".md",
  ".mjs",
  ".cjs",
])

/**
 * Recursively walk a directory and replace all occurrences of `search`
 * with `replace` in every text file.
 */
function replaceInAllFiles(
  dir: string,
  search: string,
  replace: string,
): void {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      replaceInAllFiles(fullPath, search, replace)
    } else if (TEXT_EXTENSIONS.has(path.extname(entry.name))) {
      const content = fs.readFileSync(fullPath, "utf-8")
      if (content.includes(search)) {
        fs.writeFileSync(fullPath, content.replaceAll(search, replace))
      }
    }
  }
}

/**
 * Copy Docker configuration templates to the generated project.
 * Replaces {{CLIENT_NAME}} and {{CLIENT_SLUG}} placeholders.
 */
function copyDockerTemplates(
  projectDir: string,
  clientName: string,
  projectSlug: string,
): void {
  const dockerTemplatePath = findDockerTemplatePath()

  // List of Docker template files to copy
  const dockerFiles = [
    "Dockerfile.dev",
    "docker-compose.yml",
    "docker-compose.dev.yml",
    ".dockerignore",
    ".env.example",
    "Makefile",
    "DOCKER.md",
    ".devcontainer/devcontainer.json",
  ]

  for (const file of dockerFiles) {
    const srcPath = path.join(dockerTemplatePath, file)
    const destPath = path.join(projectDir, file)

    if (!fs.existsSync(srcPath)) {
      console.warn(`Docker template file not found: ${srcPath}`)
      continue
    }

    // Ensure destination directory exists
    const destDir = path.dirname(destPath)
    fs.mkdirSync(destDir, { recursive: true })

    // Read template content
    let content = fs.readFileSync(srcPath, "utf-8")

    // Replace placeholders
    content = content.replaceAll("{{CLIENT_NAME}}", clientName)
    content = content.replaceAll("{{CLIENT_SLUG}}", projectSlug)

    // Write to destination
    fs.writeFileSync(destPath, content)
  }
}

/**
 * Find the Docker templates directory.
 * Similar to findTemplatePath but looks for templates/docker/
 */
function findDockerTemplatePath(): string {
  let dir = process.cwd()
  for (let i = 0; i < 10; i++) {
    const candidate = path.join(dir, "templates", "docker")
    if (fs.existsSync(candidate)) return candidate
    const parent = path.dirname(dir)
    if (parent === dir) break
    dir = parent
  }
  throw new Error(
    "Docker template directory not found. Ensure templates/docker/ exists at the monorepo root.",
  )
}

/**
 * Create a zip archive from a source directory.
 * The contents are placed under a named root folder inside the zip.
 */
async function createZip(
  sourceDir: string,
  zipName: string,
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    const archive = archiver("zip", { zlib: { level: 9 } })

    archive.on("data", (chunk: Buffer) => chunks.push(chunk))
    archive.on("end", () => resolve(Buffer.concat(chunks)))
    archive.on("error", (err: Error) => reject(err))

    archive.directory(sourceDir, zipName)
    archive.finalize()
  })
}
