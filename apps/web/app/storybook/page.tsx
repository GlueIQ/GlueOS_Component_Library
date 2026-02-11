'use client'

import { Button } from '@repo/ui/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/ui/components/ui/card'
import { ExternalLink, BookOpen, Rocket, Code2 } from 'lucide-react'

export default function StorybookPreview() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">GlueIQ Storybook</h1>
          </div>
          <p className="text-xl text-muted-foreground">Design System & Component Library</p>
        </div>

        {/* Main Options */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Option 1: Deploy to Chromatic */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start gap-3">
                <Rocket className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <CardTitle>Deploy to Chromatic</CardTitle>
                  <CardDescription>Production hosting for your Storybook</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Host your Storybook publicly on Chromatic, the official Storybook hosting platform.
              </p>
              <div className="bg-muted p-3 rounded text-xs space-y-2">
                <p className="font-mono">npx chromatic --project-token=YOUR_TOKEN</p>
              </div>
              <p className="text-xs text-muted-foreground">
                Get started at{' '}
                <a
                  href="https://chromatic.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline inline-flex items-center gap-1"
                >
                  chromatic.com <ExternalLink className="w-3 h-3" />
                </a>
              </p>
            </CardContent>
          </Card>

          {/* Option 2: Run Locally */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start gap-3">
                <Code2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <CardTitle>Run Locally</CardTitle>
                  <CardDescription>Development on your machine</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Run Storybook on your local machine for interactive development.
              </p>
              <div className="bg-muted p-3 rounded text-xs space-y-1">
                <p className="font-mono">npm run storybook</p>
                <p className="text-muted-foreground">→ Opens at http://localhost:6006</p>
              </div>
              <p className="text-xs text-muted-foreground">
                Perfect for developing and testing components locally.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Key Features */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg">Your Storybook Includes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="font-semibold text-sm text-foreground">Design System</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>Complete UI component library</li>
                  <li>Design tokens (colors, typography)</li>
                  <li>Layout & composition patterns</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-sm text-foreground">Documentation</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>Component guidelines & patterns</li>
                  <li>Accessibility best practices</li>
                  <li>Contributing guide</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Reference */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Commands</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="bg-muted text-foreground p-4 rounded-lg font-mono text-sm space-y-2">
                <div>
                  <span className="text-muted-foreground">#</span> Start Storybook locally
                </div>
                <div>
                  <span className="text-muted-foreground">$</span> npm run storybook
                </div>

                <div className="mt-4">
                  <span className="text-muted-foreground">#</span> Build static Storybook
                </div>
                <div>
                  <span className="text-muted-foreground">$</span> npm run build-storybook
                </div>

                <div className="mt-4">
                  <span className="text-muted-foreground">#</span> Deploy to Chromatic
                </div>
                <div>
                  <span className="text-muted-foreground">$</span> npx chromatic
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Storybook files are ready in your project
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <Button asChild variant="outline" size="sm">
              <a
                href="https://storybook.js.org/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                Storybook Docs <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
            <Button asChild variant="outline" size="sm">
              <a
                href="https://www.chromatic.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                Chromatic <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
