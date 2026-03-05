"use client"

import { usePathname } from "next/navigation"
import { ReactNode } from "react"
import { MessageSquare } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@__SCOPE__/ui/components/ui/sidebar"
import { AppBranding } from "@__SCOPE__/ui/components/ui/app-branding"
import { Separator } from "@__SCOPE__/ui/components/ui/separator"
import { Button } from "@__SCOPE__/ui/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@__SCOPE__/ui/components/ui/tooltip"
import {
  useActiveModule,
  NavDocuments,
  NavSecondary,
  NavUser,
  PageBreadcrumb,
  ThemeToggle,
} from "@__SCOPE__/ui/layouts/app-shell"

import { AppSwitcher } from "../../components/app-switcher"
import { getModuleNav } from "../../lib/module-nav"

const FlameIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 19.9093C6 25.4832 10.4762 30 16 30C21.5238 30 26 25.4832 26 19.9093C26 14.8228 21.4898 11.8985 18.898 7.17578C17.3401 4.34077 16.2857 2 16.2857 2C16.2857 2 15.1905 4.09365 13.5442 6.87374C10.7347 11.5965 6 14.8228 6 19.9093Z" fill="#BC0059" />
  </svg>
)

const GlueOSWordmark = () => (
  <span className="truncate text-2xl font-extrabold">
    __CLIENT_NAME__
  </span>
)

const user = {
  name: "mkujawa",
  email: "matt@glueiq.com",
  avatar: "/avatars/shadcn.jpg",
}

function getBreadcrumbs(pathname: string) {
  const segments = pathname.split("/").filter(Boolean)
  const crumbs: { label: string; href: string }[] = [
    { label: "Launchpad", href: "/launchpad" },
  ]

  if (segments[0] === "launchpad") {
    // Launchpad sub-pages: Launchpad > Settings
    segments.slice(1).forEach((seg, i) => {
      crumbs.push({
        label: seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, " "),
        href: `/launchpad/${segments.slice(1, i + 2).join("/")}`,
      })
    })
  } else {
    // Other modules: Launchpad > Lumen > Sub-page
    segments.forEach((seg, i) => {
      crumbs.push({
        label: seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, " "),
        href: `/${segments.slice(0, i + 1).join("/")}`,
      })
    })
  }

  return crumbs
}

export default function AppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const { activeModule } = useActiveModule()
  const { docSections, secondaryItems } = getModuleNav(activeModule.name)
  const breadcrumbs = getBreadcrumbs(pathname)

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" data-slot="app-sidebar">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <AppBranding
                icon={<FlameIcon />}
                name={<GlueOSWordmark />}
                href="/launchpad"
              />
            </SidebarMenuItem>
          </SidebarMenu>
          <SidebarMenu>
            <SidebarMenuItem>
              <AppSwitcher />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          {docSections.map((section) => (
            <NavDocuments
              key={section.label}
              items={section.items}
              label={section.label}
            />
          ))}
          {secondaryItems.length > 0 && (
            <NavSecondary items={secondaryItems} className="mt-auto" />
          )}
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={user} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex w-full items-center gap-2 px-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <SidebarTrigger className="-ml-1" />
                </TooltipTrigger>
                <TooltipContent side="bottom">Toggle sidebar</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <PageBreadcrumb breadcrumbs={breadcrumbs} />
            <div className="ml-auto flex items-center gap-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MessageSquare className="h-4 w-4" />
                      <span className="sr-only">Send feedback</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">Send feedback</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <ThemeToggle />
              </TooltipProvider>
            </div>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
