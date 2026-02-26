/**
 * SettingsPage Layout
 *
 * A settings page with vertical tab navigation and form sections.
 * Normalized: 2025-02 — relative imports, semantic tokens
 */

"use client"

import * as React from "react"
import { cn } from "../../lib/utils"
import { Button } from "../../components/ui/button"
import { Separator } from "../../components/ui/separator"

export interface SettingsSection {
  id: string
  label: string
  icon?: React.ReactNode
  content: React.ReactNode
}

interface SettingsPageProps extends React.ComponentProps<"div"> {
  title?: string
  description?: string
  sections: SettingsSection[]
}

export function SettingsPage({
  title = "Settings",
  description = "Manage your account settings and preferences.",
  sections,
  className,
  ...props
}: SettingsPageProps) {
  const [activeSection, setActiveSection] = React.useState(sections[0]?.id)

  const active = sections.find((s) => s.id === activeSection) ?? sections[0]

  return (
    <div className={cn("flex flex-1 flex-col gap-6 p-6", className)} {...props}>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="text-muted-foreground">{description}</p>
        )}
      </div>
      <Separator />
      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Sidebar nav */}
        <nav className="flex lg:w-[200px] lg:flex-col">
          {sections.map((section) => (
            <Button
              key={section.id}
              variant={activeSection === section.id ? "secondary" : "ghost"}
              className="justify-start"
              onClick={() => setActiveSection(section.id)}
            >
              {section.icon && <span className="mr-2">{section.icon}</span>}
              {section.label}
            </Button>
          ))}
        </nav>
        {/* Content */}
        <div className="flex-1">{active?.content}</div>
      </div>
    </div>
  )
}
