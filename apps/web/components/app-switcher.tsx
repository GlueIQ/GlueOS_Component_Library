"use client"

import type { LucideIcon } from "lucide-react"
import { useActiveModule } from "@/lib/active-module"
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/components/ui/dropdown-menu"
import { Button } from "@repo/ui/components/ui/button"

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
  const { activeModule, setActiveModule } = useActiveModule()
  const mod = modules.find((m) => m.name === activeModule.name) ?? modules[1]!
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
        {modules.map((mod) => (
          <DropdownMenuItem
            key={mod.name}
            onClick={() => setActiveModule(mod)}
            className="gap-2 p-2"
          >
            <mod.icon className="size-4 shrink-0 text-muted-foreground" />
            <div className="flex flex-col">
              <span className="font-medium">{mod.name}</span>
              <span className="text-xs text-muted-foreground">
                {mod.description}
              </span>
            </div>
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
