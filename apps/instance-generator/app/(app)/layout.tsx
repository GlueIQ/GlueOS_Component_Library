"use client"

import { usePathname } from "next/navigation"
import { ReactNode } from "react"
import {
  Book,
  BookOpen,
  CircleHelp,
  ClipboardList,
  Component,
  FileCode2,
  FileText,
  LayoutGrid,
  Palette,
  Search,
  Settings,
  ToggleLeft,
  Wand2,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@repo/ui/components/ui/sidebar"
import { AppBranding } from "@repo/ui/components/ui/app-branding"
import { Separator } from "@repo/ui/components/ui/separator"
import {
  NavMain,
  NavSecondary,
  NavUser,
  PageBreadcrumb,
  ThemeToggle,
} from "@repo/ui/layouts/app-shell"
import { getBreadcrumbs } from "@/lib/breadcrumbs"

const GlueIQIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 19.9093C6 25.4832 10.4762 30 16 30C21.5238 30 26 25.4832 26 19.9093C26 14.8228 21.4898 11.8985 18.898 7.17578C17.3401 4.34077 16.2857 2 16.2857 2C16.2857 2 15.1905 4.09365 13.5442 6.87374C10.7347 11.5965 6 14.8228 6 19.9093Z" fill="#BC0059" />
  </svg>
)

const GlueIQWordmark = () => (
  <span className="truncate text-2xl font-extrabold">
    Glue<span className="text-primary">IQ</span>
  </span>
)

const docSections = [
  {
    label: "Getting Started",
    items: [
      { title: "Overview", url: "/overview", icon: BookOpen },
      { title: "Instructions", url: "#", icon: FileText },
    ],
  },
  {
    label: "Tools",
    items: [
      { title: "Generator", url: "/generator", icon: Wand2 },
      { title: "Storybook", url: "http://localhost:6006", icon: Book },
      { title: "Component States", url: "#", icon: ToggleLeft },
      { title: "Migration Audit", url: "/migration-audit", icon: ClipboardList },
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
    <SidebarProvider>
      <Sidebar collapsible="icon" data-slot="app-sidebar">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <AppBranding
                icon={<GlueIQIcon />}
                name={<GlueIQWordmark />}
                href="/overview"
              />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          {docSections.map((section) => (
            <NavMain key={section.label} items={section.items} label={section.label} />
          ))}
          {navSections.map((section, i) => (
            <NavMain key={section.label ?? i} items={section.items} label={section.label} />
          ))}
          {secondaryItems.length > 0 && (
            <NavSecondary items={secondaryItems} className="mt-auto" />
          )}
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={user} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex w-full items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
            <PageBreadcrumb breadcrumbs={breadcrumbs} />
            <div className="ml-auto flex items-center gap-1">
              <ThemeToggle />
            </div>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
