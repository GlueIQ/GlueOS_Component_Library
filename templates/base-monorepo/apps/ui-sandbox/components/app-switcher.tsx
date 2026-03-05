"use client"

import NextLink from "next/link"
import type { LucideIcon } from "lucide-react"
import { useActiveModule } from "@__SCOPE__/ui/layouts/app-shell"
import {
  Archive,
  BookOpen,
  BrainCircuit,
  ChevronsUpDown,
  Compass,
  Eye,
  Gem,
  LayoutGrid,
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@__SCOPE__/ui/components/ui/dropdown-menu"
import {
  SidebarMenuButton,
  useSidebar,
} from "@__SCOPE__/ui/components/ui/sidebar"

interface ModuleDef {
  name: string
  description: string
  icon: LucideIcon
  href: string
}

const modules: ModuleDef[] = [
  { name: "Launchpad", description: "Platform Home", icon: LayoutGrid, href: "/launchpad" },
  { name: "Lumen", description: "Executive Intelligence", icon: Gem, href: "/lumen" },
  { name: "Horizon", description: "Strategic Initiatives", icon: Compass, href: "/horizon" },
  { name: "Immersion", description: "Competitive Intelligence", icon: Eye, href: "/immersion" },
  { name: "Intelligence", description: "Performance Analytics", icon: TrendingUp, href: "/intelligence" },
  { name: "Zoltar", description: "Predictive Forecasting", icon: BrainCircuit, href: "/zoltar" },
  { name: "Forge", description: "Brief Creation & Mgmt", icon: BookOpen, href: "/forge" },
  { name: "Ledger", description: "Executive Dashboard", icon: TrendingUp, href: "/ledger" },
  { name: "Studio", description: "Creative Operations", icon: Palette, href: "/studio" },
  { name: "Vault", description: "Asset Management", icon: Archive, href: "/vault" },
  { name: "Orchestrate", description: "Campaign Operations", icon: Megaphone, href: "/orchestrate" },
  { name: "Optimize", description: "Performance Optimization", icon: SlidersHorizontal, href: "/optimize" },
  { name: "Connect", description: "Data & Integration", icon: Link, href: "/connect" },
  { name: "Shield", description: "AI Governance", icon: ShieldCheck, href: "/shield" },
]

export function AppSwitcher() {
  const { activeModule, setActiveModule } = useActiveModule()
  const { isMobile } = useSidebar()
  const mod = modules.find((m) => m.name === activeModule.name) ?? modules[0]!
  const ActiveIcon = mod.icon

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground group-data-[collapsible=icon]:!gap-0 group-data-[collapsible=icon]:!p-0.5"
        >
          <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <ActiveIcon className="size-5" />
          </div>
          <span className="truncate font-medium">{activeModule.name}</span>
          <ChevronsUpDown className="ml-auto size-4 group-data-[collapsible=icon]:hidden" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        side={isMobile ? "bottom" : "right"}
        align="start"
        sideOffset={4}
      >
        {modules.map((m) => (
          <DropdownMenuItem key={m.name} asChild className="group/item gap-2 p-2">
            <NextLink
              href={m.href}
              onClick={() => setActiveModule(m)}
            >
              <div className="flex size-5 items-center justify-center rounded bg-muted-foreground shrink-0 transition-colors group-hover/item:bg-primary">
                <m.icon className="size-3.5 text-white dark:text-neutral-950 group-hover/item:text-white" />
              </div>
              <span className="font-medium">{m.name}</span>
            </NextLink>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2 p-2">
          <Plus className="size-4 text-muted-foreground" />
          <span className="text-muted-foreground">Request Module Access</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
