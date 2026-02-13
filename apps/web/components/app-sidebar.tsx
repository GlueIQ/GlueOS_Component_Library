"use client"

import * as React from "react"
import {
  Book,
  BookOpen,
  CircleHelp,
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
import Image from "next/image"

import { GlueIQLogo } from "@/components/glueiq-logo"
import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@repo/ui/components/ui/sidebar"

const data = {
  user: {
    name: "mkujawa",
    email: "matt@glueiq.com",
    avatar: "/avatars/shadcn.jpg",
  },
  gettingStarted: [
    {
      name: "Overview",
      url: "/overview",
      icon: BookOpen,
    },
    {
      name: "Instructions",
      url: "#",
      icon: FileText,
    },
    {
      name: "Configuration",
      url: "#",
      icon: Settings2,
    },
  ],
  tools: [
    {
      name: "Generator",
      url: "/generator",
      icon: Wand2,
    },
    {
      name: "Storybook",
      url: "http://localhost:6006",
      icon: Book,
    },
    {
      name: "Component States",
      url: "#",
      icon: ToggleLeft,
    },
    {
      name: "Example Site",
      url: "#",
      icon: Globe,
    },
  ],
  uiKit: [
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
      title: "Templates",
      url: "#",
      icon: FileCode2,
      items: [
        { title: "Landing", url: "#" },
        { title: "Dashboard", url: "#" },
        { title: "Settings & Admin", url: "#" },
        { title: "Data & Lists", url: "#" },
        { title: "Content Detail", url: "#" },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: CircleHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: Search,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[state=collapsed]:p-0"
            >
              <a href="/overview" className="flex items-center gap-2">
                <Image
                  src="/glueiq-favicon.svg"
                  alt="Glue Logo"
                  width={24}
                  height={24}
                  className="size-6 shrink-0"
                />
                <div className="truncate group-data-[collapsible=icon]:hidden">
                  <GlueIQLogo />
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavDocuments items={data.gettingStarted} label="Getting Started" />
        <NavDocuments items={data.tools} label="Tools" />
        <NavMain items={data.uiKit} label="UI Kit" />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
