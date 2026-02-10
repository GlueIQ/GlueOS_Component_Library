"use client"

import * as React from "react"
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconListDetails,
  IconMessage,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react"
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
      icon: IconDashboard,
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
      icon: IconUsers,
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
      icon: IconFileAi,
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
      icon: IconChartBar,
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
      icon: IconListDetails,
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
      icon: IconFolder,
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
      icon: IconCamera,
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
      icon: IconFileDescription,
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
      icon: IconFileAi,
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
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "Ask GlueIQ",
      url: "#",
      icon: IconMessage,
    },
    {
      name: "Training Paths",
      url: "#",
      icon: IconListDetails,
    },
    {
      name: "Knowledge Base",
      url: "#",
      icon: IconDatabase,
    },
    {
      name: "Industry Snapshots",
      url: "#",
      icon: IconReport,
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
                <div className="truncate">
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
