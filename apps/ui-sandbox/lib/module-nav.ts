import type { LucideIcon } from "lucide-react"
import {
  AlertTriangle,
  Archive,
  BarChart3,
  BookOpen,
  BrainCircuit,
  Calendar,
  CircleHelp,
  Clock,
  Compass,
  Copy,
  CreditCard,
  GitBranch,
  Layers,
  Database,
  DollarSign,
  Eye,
  FileText,
  FlaskConical,
  FolderKanban,
  Globe,
  Heart,
  Home,
  Image,
  Lightbulb,
  LineChart,
  Link,
  MapPin,
  Megaphone,
  MessageCircle,
  Newspaper,
  Palette,
  Percent,
  Radio,
  ScrollText,
  Search,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Tag,
  Target,
  TrendingUp,
  Users,
  Zap,
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

// ---------------------------------------------------------------------------
// Lumen sidebar (CMO only — executive command center)
// ---------------------------------------------------------------------------

const lumenNav: ModuleNav = {
  docSections: [
    {
      label: "Briefs",
      items: [
        { name: "Daily Brief", url: "/lumen", icon: Home },
        { name: "Board Pack", url: "#", icon: FileText },
        { name: "C-Suite Brief", url: "#", icon: MessageCircle },
      ],
    },
    {
      label: "Intelligence",
      items: [
        { name: "Business Health", url: "#", icon: BarChart3 },
        { name: "Brand & Market", url: "#", icon: Heart },
        { name: "Team Insights", url: "#", icon: Users },
        { name: "Market Signals", url: "#", icon: Globe },
      ],
    },
  ],
  secondaryItems: [
    { title: "Settings", url: "#", icon: Settings },
    { title: "Get Help", url: "#", icon: CircleHelp },
  ],
}

// ---------------------------------------------------------------------------
// Horizon sidebar
// ---------------------------------------------------------------------------

const horizonNav: ModuleNav = {
  docSections: [
    {
      label: "Planning",
      items: [
        { name: "Initiatives", url: "/horizon", icon: Home },
        { name: "OKRs", url: "#", icon: Target },
        { name: "Scenario Planner", url: "#", icon: Eye },
        { name: "GTM Planner", url: "#", icon: Megaphone },
      ],
    },
  ],
  secondaryItems: [
    { title: "Settings", url: "#", icon: Settings },
    { title: "Get Help", url: "#", icon: CircleHelp },
  ],
}

// ---------------------------------------------------------------------------
// Intelligence sidebar
// ---------------------------------------------------------------------------

const intelligenceNav: ModuleNav = {
  docSections: [
    {
      label: "Analytics",
      items: [
        { name: "Overview", url: "/intelligence", icon: Home },
        { name: "Campaign Analytics", url: "#", icon: BarChart3 },
        { name: "Channel Performance", url: "#", icon: LineChart },
        { name: "Attribution", url: "#", icon: Target },
      ],
    },
  ],
  secondaryItems: [
    { title: "Settings", url: "#", icon: Settings },
    { title: "Get Help", url: "#", icon: CircleHelp },
  ],
}

// ---------------------------------------------------------------------------
// Zoltar sidebar
// ---------------------------------------------------------------------------

const zoltarNav: ModuleNav = {
  docSections: [
    {
      label: "Forecasting",
      items: [
        { name: "Pipeline Forecast", url: "/zoltar", icon: TrendingUp },
        { name: "Demand Signals", url: "#", icon: Zap },
        { name: "Scenario Planner", url: "#", icon: BrainCircuit },
        { name: "Model Health", url: "#", icon: BarChart3 },
      ],
    },
  ],
  secondaryItems: [
    { title: "Settings", url: "#", icon: Settings },
    { title: "Get Help", url: "#", icon: CircleHelp },
  ],
}

// ---------------------------------------------------------------------------
// Studio sidebar
// ---------------------------------------------------------------------------

const studioNav: ModuleNav = {
  docSections: [
    {
      label: "Creative",
      items: [
        { name: "Production Board", url: "/studio", icon: FolderKanban },
        { name: "Assets", url: "#", icon: Image },
        { name: "Briefs", url: "#", icon: FileText },
        { name: "Brand Guidelines", url: "#", icon: Palette },
      ],
    },
  ],
  secondaryItems: [
    { title: "Settings", url: "#", icon: Settings },
    { title: "Get Help", url: "#", icon: CircleHelp },
  ],
}

// ---------------------------------------------------------------------------
// Vault sidebar
// ---------------------------------------------------------------------------

const vaultNav: ModuleNav = {
  docSections: [
    {
      label: "Library",
      items: [
        { name: "Overview", url: "/vault", icon: Archive },
        { name: "Browse Assets", url: "#", icon: Image },
        { name: "By Campaign", url: "#", icon: Megaphone },
      ],
    },
    {
      label: "Smart Tasks",
      items: [
        { name: "Auto-Tagging", url: "#", icon: Tag },
        { name: "Duplicate Finder", url: "#", icon: Copy },
        { name: "Rights Monitor", url: "#", icon: Clock },
        { name: "Performance Matches", url: "#", icon: TrendingUp },
        { name: "Brand Compliance", url: "#", icon: ShieldCheck },
      ],
    },
    {
      label: "Governance",
      items: [
        { name: "Rights Management", url: "#", icon: ScrollText },
        { name: "Audit Trail", url: "#", icon: Eye },
      ],
    },
  ],
  secondaryItems: [
    { title: "Settings", url: "#", icon: Settings },
    { title: "Get Help", url: "#", icon: CircleHelp },
  ],
}

// ---------------------------------------------------------------------------
// Orchestrate sidebar
// ---------------------------------------------------------------------------

const orchestrateNav: ModuleNav = {
  docSections: [
    {
      label: "Campaigns",
      items: [
        { name: "Dashboard", url: "/orchestrate", icon: Megaphone },
        { name: "Launch Tracker", url: "#", icon: TrendingUp },
        { name: "Campaign Calendar", url: "#", icon: Calendar },
      ],
    },
    {
      label: "Journey Builder",
      items: [
        { name: "Journey Canvas", url: "#", icon: GitBranch },
        { name: "Cross-Channel Flows", url: "#", icon: Layers },
        { name: "Personalization Rules", url: "#", icon: SlidersHorizontal },
        { name: "Audience Segments", url: "#", icon: Users },
      ],
    },
    {
      label: "Operations",
      items: [
        { name: "Audience Manager", url: "#", icon: Target },
        { name: "Tags & Taxonomy", url: "#", icon: FileText },
      ],
    },
  ],
  secondaryItems: [
    { title: "Settings", url: "#", icon: Settings },
    { title: "Get Help", url: "#", icon: CircleHelp },
  ],
}

// ---------------------------------------------------------------------------
// Optimize sidebar
// ---------------------------------------------------------------------------

const optimizeNav: ModuleNav = {
  docSections: [
    {
      label: "Experimentation",
      items: [
        { name: "Dashboard", url: "/optimize", icon: FlaskConical },
        { name: "Active Tests", url: "#", icon: Target },
        { name: "Winning Variants", url: "#", icon: LineChart },
        { name: "Test History", url: "#", icon: ScrollText },
      ],
    },
    {
      label: "Campaign Optimization",
      items: [
        { name: "Campaign Optimizer", url: "#", icon: SlidersHorizontal },
        { name: "Budget Optimizer", url: "#", icon: BarChart3 },
        { name: "Performance Alerts", url: "#", icon: AlertTriangle },
        { name: "Bid Management", url: "#", icon: TrendingUp },
      ],
    },
  ],
  secondaryItems: [
    { title: "Settings", url: "#", icon: Settings },
    { title: "Get Help", url: "#", icon: CircleHelp },
  ],
}

// ---------------------------------------------------------------------------
// Connect sidebar
// ---------------------------------------------------------------------------

const connectNav: ModuleNav = {
  docSections: [
    {
      label: "Data Pipelines",
      items: [
        { name: "Connected Sources", url: "/connect", icon: Database },
        { name: "Data Health", url: "#", icon: BarChart3 },
        { name: "Sync Viewer", url: "#", icon: LineChart },
        { name: "Schema Mapper", url: "#", icon: FileText },
      ],
    },
    {
      label: "Action Pipelines",
      items: [
        { name: "Action Registry", url: "#", icon: Zap },
        { name: "Execution Log", url: "#", icon: ScrollText },
        { name: "Guardrails", url: "#", icon: ShieldCheck },
        { name: "Execution Health", url: "#", icon: AlertTriangle },
      ],
    },
  ],
  secondaryItems: [
    { title: "Settings", url: "#", icon: Settings },
    { title: "Get Help", url: "#", icon: CircleHelp },
  ],
}

// ---------------------------------------------------------------------------
// Shield sidebar
// ---------------------------------------------------------------------------

const shieldNav: ModuleNav = {
  docSections: [
    {
      label: "Governance",
      items: [
        { name: "Audit Log", url: "/shield", icon: ScrollText },
        { name: "Guardrails", url: "#", icon: AlertTriangle },
        { name: "Model Performance", url: "#", icon: BarChart3 },
        { name: "Compliance", url: "#", icon: FileText },
      ],
    },
  ],
  secondaryItems: [
    { title: "Settings", url: "#", icon: Settings },
    { title: "Get Help", url: "#", icon: CircleHelp },
  ],
}

// ---------------------------------------------------------------------------
// Default sidebar (for all other modules)
// ---------------------------------------------------------------------------

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
  Lumen: lumenNav,
  Horizon: horizonNav,
  Intelligence: intelligenceNav,
  Zoltar: zoltarNav,
  Studio: studioNav,
  Vault: vaultNav,
  Orchestrate: orchestrateNav,
  Optimize: optimizeNav,
  Connect: connectNav,
  Shield: shieldNav,
}

export function getModuleNav(moduleName: string): ModuleNav {
  return moduleNavMap[moduleName] ?? defaultNav(moduleName)
}
