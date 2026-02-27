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
  GlueIQLogo,
  GlueIQIcon,
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
                <div className="hidden min-h-6 min-w-6 shrink-0 group-data-[collapsible=icon]:block">
                  <GlueIQIcon />
                </div>
                <div className="group-data-[collapsible=icon]:hidden">
                  <GlueIQLogo />
                </div>
              </a>
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
              <AppSwitcher />
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
