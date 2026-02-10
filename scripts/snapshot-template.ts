/**
 * Snapshot the current monorepo into templates/base-monorepo/.
 *
 * Copies essential files, replaces @repo with __SCOPE__ placeholders,
 * and writes a placeholder globals.css. The generator API will then
 * copy this template, inject brand config, and package as .zip.
 *
 * Run: npx tsx scripts/snapshot-template.ts
 */

import * as fs from "fs"
import * as path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, "..")
const TEMPLATE_DIR = path.join(ROOT, "templates", "base-monorepo")

/** Directories/files to exclude when copying recursively */
const EXCLUDE = new Set([
  "node_modules",
  ".next",
  ".git",
  ".storybook",
  ".turbo",
  "stories",
  "vitest.config.ts",
  "vitest.workspace.ts",
])

/** File extensions to include from component/lib dirs */
const CODE_EXTENSIONS = new Set([".ts", ".tsx", ".js", ".json", ".css"])

function ensureDir(dir: string) {
  fs.mkdirSync(dir, { recursive: true })
}

function copyFile(src: string, dest: string, transform?: (content: string) => string) {
  ensureDir(path.dirname(dest))
  if (transform) {
    const content = fs.readFileSync(src, "utf-8")
    fs.writeFileSync(dest, transform(content))
  } else {
    fs.copyFileSync(src, dest)
  }
}

function copyDir(src: string, dest: string, opts?: { transform?: (content: string) => string; extensions?: Set<string> }) {
  if (!fs.existsSync(src)) return
  ensureDir(dest)

  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    if (EXCLUDE.has(entry.name)) continue

    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath, opts)
    } else {
      const ext = path.extname(entry.name)
      if (opts?.extensions && !opts.extensions.has(ext)) continue
      copyFile(srcPath, destPath, opts?.transform)
    }
  }
}

/** Replace @repo scope with __SCOPE__ placeholder */
function replaceScope(content: string): string {
  return content.replace(/@repo\//g, "@__SCOPE__/").replace(/"@repo"/g, '"@__SCOPE__"')
}

function main() {
  console.log("Snapshotting monorepo to template...")

  // Clean existing template
  if (fs.existsSync(TEMPLATE_DIR)) {
    fs.rmSync(TEMPLATE_DIR, { recursive: true })
  }
  ensureDir(TEMPLATE_DIR)

  // ── Root config files ──
  copyFile(
    path.join(ROOT, "pnpm-workspace.yaml"),
    path.join(TEMPLATE_DIR, "pnpm-workspace.yaml")
  )
  copyFile(
    path.join(ROOT, "turbo.json"),
    path.join(TEMPLATE_DIR, "turbo.json")
  )
  // Root package.json — replace name, keep scripts
  copyFile(
    path.join(ROOT, "package.json"),
    path.join(TEMPLATE_DIR, "package.json"),
    (content) => {
      const pkg = JSON.parse(content)
      pkg.name = "__SCOPE__-workspace"
      return JSON.stringify(pkg, null, 2) + "\n"
    }
  )

  // ── packages/typescript-config ──
  const tsConfigSrc = path.join(ROOT, "packages", "typescript-config")
  const tsConfigDest = path.join(TEMPLATE_DIR, "packages", "typescript-config")
  copyFile(
    path.join(tsConfigSrc, "package.json"),
    path.join(tsConfigDest, "package.json"),
    (content) => replaceScope(content)
  )
  for (const f of ["base.json", "nextjs.json", "react-library.json"]) {
    copyFile(path.join(tsConfigSrc, f), path.join(tsConfigDest, f))
  }

  // ── packages/eslint-config ──
  const eslintSrc = path.join(ROOT, "packages", "eslint-config")
  const eslintDest = path.join(TEMPLATE_DIR, "packages", "eslint-config")
  copyFile(
    path.join(eslintSrc, "package.json"),
    path.join(eslintDest, "package.json"),
    (content) => replaceScope(content)
  )
  for (const f of ["base.js", "next.js", "react-internal.js"]) {
    copyFile(path.join(eslintSrc, f), path.join(eslintDest, f))
  }

  // ── packages/ui ──
  const uiSrc = path.join(ROOT, "packages", "ui")
  const uiDest = path.join(TEMPLATE_DIR, "packages", "ui")

  // package.json — replace scope, strip storybook/vitest devDeps
  copyFile(
    path.join(uiSrc, "package.json"),
    path.join(uiDest, "package.json"),
    (content) => {
      const pkg = JSON.parse(replaceScope(content))
      // Remove storybook/vitest devDependencies for generated projects
      const devDeps = pkg.devDependencies ?? {}
      for (const key of Object.keys(devDeps)) {
        if (
          key.includes("storybook") ||
          key.includes("vitest") ||
          key.includes("chromatic") ||
          key.includes("playwright") ||
          key.includes("vite") ||
          key === "@vitejs/plugin-react"
        ) {
          delete devDeps[key]
        }
      }
      // Remove storybook scripts
      if (pkg.scripts) {
        delete pkg.scripts.storybook
        delete pkg.scripts["build-storybook"]
        if (pkg.scripts.dev === "storybook dev -p 6006") {
          pkg.scripts.dev = "tsc --noEmit --watch"
        }
      }
      return JSON.stringify(pkg, null, 2) + "\n"
    }
  )
  copyFile(path.join(uiSrc, "tsconfig.json"), path.join(uiDest, "tsconfig.json"))
  copyFile(
    path.join(uiSrc, "tailwind.config.base.ts"),
    path.join(uiDest, "tailwind.config.base.ts")
  )

  // src/ — components, lib, hooks (skip stories)
  copyDir(path.join(uiSrc, "src", "components"), path.join(uiDest, "src", "components"), {
    extensions: CODE_EXTENSIONS,
  })
  copyDir(path.join(uiSrc, "src", "lib"), path.join(uiDest, "src", "lib"), {
    extensions: CODE_EXTENSIONS,
  })
  copyDir(path.join(uiSrc, "src", "hooks"), path.join(uiDest, "src", "hooks"), {
    extensions: CODE_EXTENSIONS,
  })

  // index.ts
  copyFile(
    path.join(uiSrc, "src", "index.ts"),
    path.join(uiDest, "src", "index.ts")
  )

  // Placeholder globals.css (will be overwritten by generator)
  fs.writeFileSync(
    path.join(uiDest, "src", "globals.css"),
    "/* This file is generated by the GlueOS generator. */\n"
  )

  // ── apps/web (becomes the example app) ──
  const webSrc = path.join(ROOT, "apps", "web")
  const webDest = path.join(TEMPLATE_DIR, "apps", "web")

  // Config files
  copyFile(
    path.join(webSrc, "package.json"),
    path.join(webDest, "package.json"),
    (content) => {
      const pkg = JSON.parse(replaceScope(content))
      pkg.name = "__SCOPE__-web"
      // Remove heavy deps not needed for base template
      const deps = pkg.dependencies ?? {}
      delete deps["@dnd-kit/core"]
      delete deps["@dnd-kit/modifiers"]
      delete deps["@dnd-kit/sortable"]
      delete deps["@dnd-kit/utilities"]
      delete deps["@tanstack/react-table"]
      delete deps["recharts"]
      delete deps["vaul"]
      pkg.description = "__CLIENT_NAME__"
      return JSON.stringify(pkg, null, 2) + "\n"
    }
  )
  copyFile(
    path.join(webSrc, "tsconfig.json"),
    path.join(webDest, "tsconfig.json")
  )
  copyFile(
    path.join(webSrc, "tailwind.config.ts"),
    path.join(webDest, "tailwind.config.ts")
  )
  copyFile(
    path.join(webSrc, "next.config.js"),
    path.join(webDest, "next.config.js")
  )
  copyFile(
    path.join(webSrc, "postcss.config.js"),
    path.join(webDest, "postcss.config.js")
  )
  copyFile(
    path.join(webSrc, "eslint.config.js"),
    path.join(webDest, "eslint.config.js"),
    (content) => replaceScope(content)
  )

  // App files
  ensureDir(path.join(webDest, "app"))
  fs.writeFileSync(
    path.join(webDest, "app", "globals.css"),
    '@import "@__SCOPE__/ui/globals.css";\n'
  )

  // layout.tsx with font placeholders
  fs.writeFileSync(
    path.join(webDest, "app", "layout.tsx"),
    `import type { Metadata } from "next";
__FONT_IMPORTS__
import "./globals.css";
import { Providers } from "./providers";

__FONT_DECLARATIONS__

export const metadata: Metadata = {
  title: "__CLIENT_NAME__",
  description: "Powered by GlueOS Design System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={\`__FONT_VARIABLES__ antialiased\`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
`
  )

  copyFile(
    path.join(webSrc, "app", "providers.tsx"),
    path.join(webDest, "app", "providers.tsx")
  )
  copyFile(
    path.join(webSrc, "app", "error.tsx"),
    path.join(webDest, "app", "error.tsx"),
    (content) => replaceScope(content)
  )
  copyFile(
    path.join(webSrc, "app", "loading.tsx"),
    path.join(webDest, "app", "loading.tsx"),
    (content) => replaceScope(content)
  )
  copyFile(
    path.join(webSrc, "app", "not-found.tsx"),
    path.join(webDest, "app", "not-found.tsx"),
    (content) => replaceScope(content)
  )

  // Landing page — shows branded components
  fs.writeFileSync(
    path.join(webDest, "app", "page.tsx"),
    `import { Container } from "@__SCOPE__/ui/components/ui/container"
import { Heading } from "@__SCOPE__/ui/components/ui/heading"
import { Text } from "@__SCOPE__/ui/components/ui/text"
import { Button } from "@__SCOPE__/ui/components/ui/button"
import { Badge } from "@__SCOPE__/ui/components/ui/badge"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@__SCOPE__/ui/components/ui/card"
import { Input } from "@__SCOPE__/ui/components/ui/input"
import { Label } from "@__SCOPE__/ui/components/ui/label"
import { Separator } from "@__SCOPE__/ui/components/ui/separator"

export default function Home() {
  return (
    <Container className="py-16">
      <div className="max-w-3xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <Heading level={1}>__CLIENT_NAME__</Heading>
          <Text variant="lead" className="text-muted-foreground">
            Your branded UI kit is ready. Start building.
          </Text>
        </div>

        <Separator />

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Buttons</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Badges</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Form Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@example.com" />
              </div>
              <Button className="w-full">Submit</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Typography</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Heading level={3}>Heading 3</Heading>
              <Text>
                This is body text with your brand fonts applied. The design
                system handles typography, spacing, and colors automatically.
              </Text>
              <Text variant="muted">Muted secondary text</Text>
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  )
}
`
  )

  // Count files
  let fileCount = 0
  function countFiles(dir: string) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        countFiles(path.join(dir, entry.name))
      } else {
        fileCount++
      }
    }
  }
  countFiles(TEMPLATE_DIR)

  console.log(`Template created at: ${TEMPLATE_DIR}`)
  console.log(`Total files: ${fileCount}`)
}

main()
