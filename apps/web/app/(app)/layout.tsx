"use client"

import { usePathname } from "next/navigation"
import {
  Book,
  BookOpen,
  CircleHelp,
  ClipboardList,
  Component,
  FileCode2,
  FileText,
  Globe,
  LayoutGrid,
  Palette,
  Search,
  Settings,
  Settings2,
  ToggleLeft,
  Wand2,
} from "lucide-react"

import { AppShell, GlueIQLogo, GlueIQIcon } from "@repo/ui/layouts/app-shell"
import { getBreadcrumbs } from "@/lib/breadcrumbs"
import { ReactNode } from "react"

const docSections = [
  {
    label: "Getting Started",
    items: [
      { name: "Overview", url: "/overview", icon: BookOpen },
      { name: "Instructions", url: "#", icon: FileText },
      { name: "Configuration", url: "#", icon: Settings2 },
    ],
  },
  {
    label: "Tools",
    items: [
      { name: "Generator", url: "/generator", icon: Wand2 },
      { name: "Storybook", url: "http://localhost:6006", icon: Book },
      { name: "Component States", url: "#", icon: ToggleLeft },
      { name: "Migration Audit", url: "/migration-audit", icon: ClipboardList },
      { name: "Example Site", url: "#", icon: Globe },
    ],
  },
]

const navSections = [
  {
    label: "UI Kit",
    items: [
      {
        title: "Design Tokens",
        url: "#",
        icon: Palette,
        items: [
          { title: "Color", url: "#" },
          { title: "Typography", url: "#" },
          { title: "Spacing & Layout", url: "#" },
          { title: "Shadows & Effects", url: "#" },
          { title: "Motion", url: "#" },
        ],
      },
      {
        title: "Components",
        url: "#",
        icon: Component,
        items: [
          { title: "Form Controls", url: "#" },
          { title: "Buttons & Actions", url: "#" },
          { title: "Navigation", url: "#" },
          { title: "Feedback & Status", url: "#" },
          { title: "Data Display", url: "#" },
          { title: "Layout", url: "#" },
          { title: "Typography", url: "#" },
          { title: "Overlays & Modals", url: "#" },
        ],
      },
      {
        title: "Patterns (Blocks)",
        url: "#",
        icon: LayoutGrid,
        items: [
          { title: "Authentication", url: "#" },
          { title: "User Management", url: "#" },
          { title: "Data Visualization", url: "#" },
          { title: "Content Management", url: "#" },
          { title: "Forms", url: "#" },
          { title: "Empty & Error States", url: "#" },
        ],
      },
      {
        title: "Layouts",
        url: "#",
        icon: FileCode2,
        items: [
          { title: "App Shell", url: "#" },
          { title: "Dashboard", url: "#" },
          { title: "Settings & Admin", url: "#" },
          { title: "Data & Lists", url: "#" },
          { title: "Content Detail", url: "#" },
        ],
      },
    ],
  },
]

const secondaryItems = [
  { title: "Settings", url: "#", icon: Settings },
  { title: "Get Help", url: "#", icon: CircleHelp },
  { title: "Search", url: "#", icon: Search },
]

const user = {
  name: "mkujawa",
  email: "matt@glueiq.com",
  avatar: "/avatars/shadcn.jpg",
}

export default function AppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const breadcrumbs = getBreadcrumbs(pathname)

  return (
    <AppShell
      logo={<GlueIQLogo />}
      logoIcon={<GlueIQIcon />}
      logoHref="/overview"
      docSections={docSections}
      navSections={navSections}
      secondaryItems={secondaryItems}
      user={user}
      breadcrumbs={breadcrumbs}
    >
      {children}
    </AppShell>
  )
}
