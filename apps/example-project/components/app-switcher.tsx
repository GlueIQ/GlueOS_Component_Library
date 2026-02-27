"use client"

import NextLink from "next/link"
import type { LucideIcon } from "lucide-react"
import { useActiveModule } from "@repo/ui/layouts/app-shell"
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
} from "@repo/ui/components/ui/dropdown-menu"
import { Button } from "@repo/ui/components/ui/button"

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
  const mod = modules.find((m) => m.name === activeModule.name) ?? modules[0]!
  const ActiveIcon = mod.icon

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="w-44 justify-between gap-2 data-[state=open]:bg-accent"
        >
          <ActiveIcon className="size-4" />
          <span className="truncate font-medium">{activeModule.name}</span>
          <ChevronsUpDown className="size-3.5 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-64 rounded-lg">
        {modules.map((m) => (
          <DropdownMenuItem key={m.name} asChild className="gap-2 p-2">
            <NextLink
              href={m.href}
              onClick={() => setActiveModule(m)}
            >
              <m.icon className="size-4 shrink-0 text-muted-foreground" />
              <div className="flex flex-col flex-1">
                <span className="font-medium">{m.name}</span>
                <span className="text-xs text-muted-foreground">
                  {m.description}
                </span>
              </div>
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
