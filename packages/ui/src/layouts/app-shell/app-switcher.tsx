"use client"

import * as React from "react"
import type { LucideIcon } from "lucide-react"
import {
  Archive,
  BrainCircuit,
  ChevronsUpDown,
  Compass,
  Eye,
  Gem,
  Link,
  Megaphone,
  Palette,
  Plus,
  ShieldCheck,
  SlidersHorizontal,
  TrendingUp,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../../components/ui/sidebar"
import { useActiveModule } from "./active-module"

const modules: { name: string; description: string; icon: LucideIcon }[] = [
  { name: "Lumen", description: "Executive Intelligence", icon: Gem },
  { name: "Horizon", description: "Strategic Initiatives", icon: Compass },
  { name: "Immersion", description: "Competitive Intelligence", icon: Eye },
  { name: "Intelligence", description: "Performance Analytics", icon: TrendingUp },
  { name: "Zoltar", description: "Predictive Forecasting", icon: BrainCircuit },
  { name: "Studio", description: "Creative Operations", icon: Palette },
  { name: "Vault", description: "Asset Management", icon: Archive },
  { name: "Orchestrate", description: "Campaign Operations", icon: Megaphone },
  { name: "Optimize", description: "Performance Optimization", icon: SlidersHorizontal },
  { name: "Connect", description: "Data & Integration", icon: Link },
  { name: "Shield", description: "AI Governance", icon: ShieldCheck },
]

export function AppSwitcher() {
  const { isMobile } = useSidebar()
  const { activeModule, setActiveModule } = useActiveModule()
  const mod = modules.find((m) => m.name === activeModule.name) ?? modules[0]!
  const ActiveIcon = mod.icon

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:bg-transparent group-data-[collapsible=icon]:hover:bg-transparent"
            >
              <div className="flex aspect-square size-8 items-center justify-center">
                <div className="flex size-[22px] items-center justify-center rounded-sm bg-sidebar-primary text-sidebar-primary-foreground">
                  <ActiveIcon className="size-3.5" />
                </div>
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{activeModule.name}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">Modules</DropdownMenuLabel>
            {modules.map((mod, index) => (
              <DropdownMenuItem
                key={mod.name}
                onClick={() => setActiveModule(mod)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  <mod.icon className="size-4 shrink-0" />
                </div>
                {mod.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">Request Module Access</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
