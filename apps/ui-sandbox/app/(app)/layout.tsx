"use client"

import { usePathname } from "next/navigation"
import { ReactNode } from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@repo/ui/components/ui/sidebar"
import { Separator } from "@repo/ui/components/ui/separator"
import {
  useActiveModule,
  NavDocuments,
  NavSecondary,
  NavUser,
  PageBreadcrumb,
  ThemeToggle,
} from "@repo/ui/layouts/app-shell"

import { AppSwitcher } from "../../components/app-switcher"
import { getModuleNav } from "../../lib/module-nav"

const user = {
  name: "mkujawa",
  email: "matt@glueiq.com",
  avatar: "/avatars/shadcn.jpg",
}

function getBreadcrumbs(pathname: string) {
  const segments = pathname.split("/").filter(Boolean)
  // PageBreadcrumb already renders the active module name as the first item,
  // so skip the first segment (the module root) and only return sub-pages.
  // For module root pages, show "Dashboard" as the sole breadcrumb.
  if (segments.length <= 1) {
    return [{ label: "Dashboard", href: pathname }]
  }
  return segments.slice(1).map((seg, i) => ({
    label: seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, " "),
    href: `/${segments.slice(0, i + 2).join("/")}`,
  }))
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
              <a
                href="/launchpad"
                className="flex items-center px-2 py-3 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
              >
                <svg className="hidden min-h-6 min-w-6 shrink-0 group-data-[collapsible=icon]:block" width="24" height="24" viewBox="0 0 32 32" fill="none">
                  <path d="M6 19.9093C6 25.4832 10.4762 30 16 30C21.5238 30 26 25.4832 26 19.9093C26 14.8228 21.4898 11.8985 18.898 7.17578C17.3401 4.34077 16.2857 2 16.2857 2C16.2857 2 15.1905 4.09365 13.5442 6.87374C10.7347 11.5965 6 14.8228 6 19.9093Z" fill="#BC0059" />
                </svg>
                <span className="font-bold text-sm group-data-[collapsible=icon]:hidden">
                  Glue<span style={{ color: "#BC0059" }}>OS</span>
                </span>
              </a>
            </SidebarMenuItem>
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
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex w-full items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <PageBreadcrumb breadcrumbs={breadcrumbs} />
            <div className="ml-auto flex items-center gap-1">
              <ThemeToggle />
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
