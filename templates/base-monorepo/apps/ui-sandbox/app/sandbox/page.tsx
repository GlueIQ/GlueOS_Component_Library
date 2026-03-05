"use client"

import * as React from "react"
import {
  Archive,
  BadgeCheck,
  Bell,
  BookOpen,
  Bot,
  BrainCircuit,
  ChevronRight,
  ChevronsUpDown,
  Compass,
  Eye,
  Gem,
  LayoutGrid,
  Link,
  LogOut,
  Map,
  Megaphone,
  Palette,
  Plus,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  SquareTerminal,
  TrendingUp,
  type LucideIcon,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@__SCOPE__/ui/components/ui/avatar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@__SCOPE__/ui/components/ui/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@__SCOPE__/ui/components/ui/dropdown-menu"
import { Separator } from "@__SCOPE__/ui/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@__SCOPE__/ui/components/ui/breadcrumb"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@__SCOPE__/ui/components/ui/sidebar"

// ── Data ──────────────────────────────────────────────────────────────────────

const data = {
  user: {
    name: "Kevin Flynn",
    email: "kevin.flynn@glueiq.com",
    avatar: "/avatars/shadcn.jpg",
  },
  modules: [
    { name: "Launchpad", description: "Platform Home", icon: LayoutGrid },
    { name: "Lumen", description: "Executive Intelligence", icon: Gem },
    { name: "Horizon", description: "Strategic Initiatives", icon: Compass },
    { name: "Immersion", description: "Competitive Intelligence", icon: Eye },
    { name: "Intelligence", description: "Performance Analytics", icon: TrendingUp },
    { name: "Zoltar", description: "Predictive Forecasting", icon: BrainCircuit },
    { name: "Forge", description: "Brief Creation & Mgmt", icon: BookOpen },
    { name: "Ledger", description: "Executive Dashboard", icon: TrendingUp },
    { name: "Studio", description: "Creative Operations", icon: Palette },
    { name: "Vault", description: "Asset Management", icon: Archive },
    { name: "Orchestrate", description: "Campaign Operations", icon: Megaphone },
    { name: "Optimize", description: "Performance Optimization", icon: SlidersHorizontal },
    { name: "Connect", description: "Data & Integration", icon: Link },
    { name: "Shield", description: "AI Governance", icon: ShieldCheck },
  ],
  navGroups: [
    {
      label: undefined,
      items: [
        { title: "Overview", url: "#", icon: LayoutGrid },
        { title: "Instructions", url: "#", icon: BookOpen },
      ],
    },
    {
      label: "Tools",
      items: [
        { title: "Tool 1", url: "#", icon: SquareTerminal },
        {
          title: "Tool Group 2",
          url: "#",
          icon: Bot,
          items: [
            { title: "Hammer", url: "#" },
            { title: "Screwdriver", url: "#" },
            { title: "Saw", url: "#" },
            { title: "Drill", url: "#" },
          ],
        },
        {
          title: "Tool Group 3",
          url: "#",
          icon: Settings2,
          items: [
            { title: "Anvil", url: "#" },
            { title: "Press", url: "#" },
            { title: "Plyers", url: "#" },
            { title: "Wrench", url: "#" },
          ],
        },
        { title: "Tool 4", url: "#", icon: BrainCircuit },
      ],
    },
    {
      label: "Knowledge",
      items: [
        { title: "Ask Glue", url: "#", icon: Sparkles },
        { title: "Data Sources", url: "#", icon: Link },
        { title: "Knowledge Graph", url: "#", icon: Map },
      ],
    },
  ],
  navSecondary: [
    { title: "Get Help", url: "#", icon: Bell },
    { title: "Settings", url: "#", icon: Settings2 },
  ],
}

// ── AppSwitcher ───────────────────────────────────────────────────────────────

function AppSwitcher({ modules }: { modules: { name: string; description: string; icon: LucideIcon }[] }) {
  const { isMobile } = useSidebar()
  const [activeModule, setActiveModule] = React.useState(modules[0])
  if (!activeModule) return null
  const ActiveIcon = activeModule.icon
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg" className="bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:bg-transparent group-data-[collapsible=icon]:hover:bg-transparent">
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
          <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg" align="start" side={isMobile ? "bottom" : "right"} sideOffset={4}>
            <DropdownMenuLabel className="text-xs text-muted-foreground">Modules</DropdownMenuLabel>
            {modules.map((mod, index) => (
              <DropdownMenuItem key={mod.name} onClick={() => setActiveModule(mod)} className="gap-2 p-2">
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

// ── NavMain ───────────────────────────────────────────────────────────────────

type NavItem = { title: string; url: string; icon?: LucideIcon; isActive?: boolean; items?: { title: string; url: string }[] }
type NavGroup = { label?: string; items: NavItem[] }

function NavMain({ groups }: { groups: NavGroup[] }) {
  return (
    <>
      {groups.map((group, i) => (
        <SidebarGroup key={i}>
          {group.label && <SidebarGroupLabel>{group.label}</SidebarGroupLabel>}
          <SidebarMenu>
            {group.items.map((item) =>
              item.items ? (
                <Collapsible key={item.title} asChild defaultOpen={item.isActive} className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip={item.title}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild>
                              <a href={subItem.url}><span>{subItem.title}</span></a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ) : (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton tooltip={item.title} asChild>
                    <a href={item.url}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            )}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  )
}

// ── NavSecondary ──────────────────────────────────────────────────────────────

function NavSecondary({ items }: { items: { title: string; url: string; icon: LucideIcon }[] }) {
  return (
    <SidebarGroup className="mt-auto">
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton tooltip={item.title} asChild>
              <a href={item.url}>
                <item.icon />
                <span>{item.title}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}


// ── NavUser ───────────────────────────────────────────────────────────────────

function NavUser({ user }: { user: { name: string; email: string; avatar: string } }) {
  const { isMobile } = useSidebar()
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg" side={isMobile ? "bottom" : "right"} align="end" sideOffset={4}>
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">KF</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem><Sparkles />Admin Settings</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem><BadgeCheck />Account</DropdownMenuItem>
              <DropdownMenuItem><Bell />Notifications</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem><LogOut />Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

// ── AppSidebar ────────────────────────────────────────────────────────────────

function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <img src="/logo.svg" width={32} height={32} alt="GlueOS" className="shrink-0" />
              <div className="grid flex-1 text-left leading-tight">
                <span className="truncate text-2xl font-extrabold">Glue<span className="text-primary">OS</span></span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <AppSwitcher modules={data.modules} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain groups={data.navGroups} />
        <NavSecondary items={data.navSecondary} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function SandboxPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Building Your Application</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
