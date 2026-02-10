"use client"

import * as React from "react"
import {
  BarChart3,
  Camera,
  CircleHelp,
  Database,
  FileBarChart,
  FileText,
  Folder,
  LayoutDashboard,
  List,
  MessageCircle,
  Search,
  Settings,
  Sparkles,
  Users,
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
  navMain: [
    {
      title: "Dashboards",
      url: "#",
      icon: LayoutDashboard,
      items: [
        {
          title: "My Day",
          url: "#",
        },
        {
          title: "My Assignments",
          url: "#",
        },
        {
          title: "My Contributions",
          url: "#",
        },
        {
          title: "Leaderboards",
          url: "#",
        },
      ],
    },
    {
      title: "Clients",
      url: "#",
      icon: Users,
      items: [
        {
          title: "Client Goals",
          url: "#",
        },
        {
          title: "Performance",
          url: "#",
        },
      ],
    },
    {
      title: "Tools",
      url: "#",
      icon: Sparkles,
      items: [
        {
          title: "Claude Skills",
          url: "#",
        },
        {
          title: "Studio FX",
          url: "#",
        },
        {
          title: "Workflows",
          url: "#",
        },
        {
          title: "Maker Tools",
          url: "#",
        },
      ],
    },
    {
      title: "Analytics",
      url: "#",
      icon: BarChart3,
      items: [
        {
          title: "Individual",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Client",
          url: "#",
        },
      ],
    },
    {
      title: "Active Work",
      url: "#",
      icon: List,
      items: [
        {
          title: "All Work",
          url: "#",
        },
        {
          title: "Retainers",
          url: "#",
        },
        {
          title: "Projects",
          url: "#",
        },
      ],
    },
    {
      title: "Domain Hubs",
      url: "#",
      icon: Folder,
      items: [
        {
          title: "Client Delivery",
          url: "#",
        },
        {
          title: "Strategy",
          url: "#",
        },
        {
          title: "Creative",
          url: "#",
        },
        {
          title: "Media & Performance",
          url: "#",
        },
        {
          title: "Data & Analytics",
          url: "#",
        },
        {
          title: "Technology & AI",
          url: "#",
        },
        {
          title: "Operations",
          url: "#",
        },
      ],
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: Camera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: FileText,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: Sparkles,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
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
  documents: [
    {
      name: "Ask GlueIQ",
      url: "#",
      icon: MessageCircle,
    },
    {
      name: "Training Paths",
      url: "#",
      icon: List,
    },
    {
      name: "Knowledge Base",
      url: "#",
      icon: Database,
    },
    {
      name: "Industry Snapshots",
      url: "#",
      icon: FileBarChart,
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
              <a href="/dashboard" className="flex items-center gap-2">
                <Image
                  src="/logo.svg"
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
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
