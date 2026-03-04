import type { LucideIcon } from "lucide-react"
import {
  BarChart3,
  BookOpen,
  BrainCircuit,
  CircleHelp,
  Compass,
  CreditCard,
  Database,
  DollarSign,
  FileText,
  FolderKanban,
  Globe,
  Heart,
  Home,
  Image,
  LineChart,
  Link,
  MapPin,
  Megaphone,
  MessageCircle,
  Newspaper,
  Palette,
  Percent,
  Radio,
  Search,
  Settings,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react"

// ---------------------------------------------------------------------------
// Types matching AppShell props
// ---------------------------------------------------------------------------

export interface DocSection {
  label: string
  items: { name: string; url: string; icon: LucideIcon }[]
}

export interface SecondaryItem {
  title: string
  url: string
  icon: LucideIcon
}

export interface ModuleNav {
  docSections: DocSection[]
  secondaryItems: SecondaryItem[]
}

// ---------------------------------------------------------------------------
// Immersion sidebar (mirrors GlueOS_Immersion Shell.tsx)
// ---------------------------------------------------------------------------

const immersionNav: ModuleNav = {
  docSections: [
    {
      label: "Core",
      items: [
        { name: "Immersions", url: "/immersion", icon: Search },
        { name: "Coaching", url: "#", icon: BookOpen },
      ],
    },
    {
      label: "Tools",
      items: [
        { name: "Tools Hub", url: "#", icon: Home },
        { name: "AI Discovery", url: "#", icon: Sparkles },
        { name: "SEO Performance", url: "#", icon: BarChart3 },
        { name: "Market Intelligence", url: "#", icon: Globe },
        { name: "Link Authority", url: "#", icon: Link },
        { name: "Global Reach", url: "#", icon: Globe },
        { name: "Local Reach", url: "#", icon: MapPin },
        { name: "Brand Perception", url: "#", icon: Heart },
        { name: "Share of Voice", url: "#", icon: Megaphone },
        { name: "Paid Media", url: "#", icon: CreditCard },
        { name: "Keyword Opportunities", url: "#", icon: Search },
        { name: "Creative Library", url: "#", icon: Image },
        { name: "News Intelligence", url: "#", icon: Newspaper },
        { name: "Financial Picture", url: "#", icon: DollarSign },
      ],
    },
    {
      label: "Knowledge",
      items: [
        { name: "Ask GlueIQ", url: "#", icon: MessageCircle },
        { name: "Data Sources", url: "#", icon: Database },
        { name: "Knowledge Base", url: "#", icon: BookOpen },
      ],
    },
  ],
  secondaryItems: [{ title: "Settings", url: "#", icon: Settings }],
}

// ---------------------------------------------------------------------------
// Forge sidebar (mirrors GlueOS_Forge Shell.tsx)
// ---------------------------------------------------------------------------

const forgeNav: ModuleNav = {
  docSections: [
    {
      label: "Core",
      items: [
        { name: "Dashboard", url: "/forge", icon: Home },
        { name: "All Briefs", url: "#", icon: FileText },
      ],
    },
    {
      label: "Brief Types",
      items: [
        { name: "Strategy", url: "#", icon: Compass },
        { name: "Campaigns", url: "#", icon: Megaphone },
        { name: "Creative", url: "#", icon: Palette },
        { name: "Media", url: "#", icon: Radio },
        { name: "Projects", url: "#", icon: FolderKanban },
      ],
    },
    {
      label: "Library",
      items: [{ name: "Brief Library", url: "#", icon: BookOpen }],
    },
  ],
  secondaryItems: [{ title: "Settings", url: "#", icon: Settings }],
}

// ---------------------------------------------------------------------------
// Ledger sidebar (mirrors GlueOS_Ledger Shell.tsx)
// ---------------------------------------------------------------------------

const ledgerNav: ModuleNav = {
  docSections: [
    {
      label: "Core",
      items: [
        { name: "Dashboard", url: "/ledger", icon: Home },
        { name: "Revenue", url: "#", icon: DollarSign },
        { name: "Service Lines", url: "#", icon: LineChart },
        { name: "Profitability", url: "#", icon: Percent },
        { name: "Forecast", url: "#", icon: TrendingUp },
        { name: "Workload", url: "#", icon: Users },
        { name: "People Costs", url: "#", icon: CreditCard },
      ],
    },
    {
      label: "Knowledge",
      items: [
        { name: "Ask GlueIQ", url: "#", icon: MessageCircle },
        { name: "Data Dictionary", url: "#", icon: Database },
        { name: "Knowledge Base", url: "#", icon: BookOpen },
      ],
    },
  ],
  secondaryItems: [{ title: "Settings", url: "#", icon: Settings }],
}

// ---------------------------------------------------------------------------
// Default sidebar (for all other modules)
// ---------------------------------------------------------------------------

const launchpadNav: ModuleNav = {
  docSections: [
    {
      label: "Navigation",
      items: [
        { name: "Home", url: "/launchpad", icon: Home },
        { name: "Getting Started", url: "#", icon: BookOpen },
      ],
    },
  ],
  secondaryItems: [
    { title: "Settings", url: "#", icon: Settings },
    { title: "Get Help", url: "#", icon: CircleHelp },
  ],
}

function defaultNav(moduleName: string): ModuleNav {
  return {
    docSections: [
      {
        label: "Navigation",
        items: [
          { name: "Dashboard", url: `/${moduleName.toLowerCase()}`, icon: Home },
          { name: "Getting Started", url: "#", icon: BookOpen },
        ],
      },
    ],
    secondaryItems: [
      { title: "Settings", url: "#", icon: Settings },
      { title: "Get Help", url: "#", icon: CircleHelp },
    ],
  }
}

// ---------------------------------------------------------------------------
// Lookup
// ---------------------------------------------------------------------------

const moduleNavMap: Record<string, ModuleNav> = {
  Launchpad: launchpadNav,
  Immersion: immersionNav,
  Forge: forgeNav,
  Ledger: ledgerNav,
}

export function getModuleNav(moduleName: string): ModuleNav {
  return moduleNavMap[moduleName] ?? defaultNav(moduleName)
}
