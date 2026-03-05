"use client"

import * as React from "react"
import type { LucideIcon } from "lucide-react"

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
} from "../../components/ui/sidebar"
import { AppBranding } from "../../components/ui/app-branding"
import { Separator } from "../../components/ui/separator"
import { ActiveModuleProvider } from "./active-module"
import { AppSwitcher } from "./app-switcher"
import { NavDocuments } from "./nav-documents"
import { NavMain } from "./nav-main"
import { NavSecondary } from "./nav-secondary"
import { NavUser } from "./nav-user"
import { PageBreadcrumb, type BreadcrumbEntry } from "./page-breadcrumb"
import { ThemeToggle } from "./theme-toggle"

export interface AppShellNavItem {
  title: string
  url: string
  icon?: LucideIcon
  isActive?: boolean
  items?: { title: string; url: string }[]
}

export interface AppShellDocItem {
  name: string
  url: string
  icon: LucideIcon
}

export interface AppShellSecondaryItem {
  title: string
  url: string
  icon: LucideIcon
}

export interface AppShellUser {
  name: string
  email: string
  avatar: string
}

export interface AppShellProps {
  /** Logo element rendered in the sidebar header (expanded state) */
  logo?: React.ReactNode
  /** Icon element rendered in the sidebar header (collapsed state) */
  logoIcon?: React.ReactNode
  /** Link target for the logo */
  logoHref?: string
  /** Show the module switcher in the sidebar header (default: true) */
  showModuleSwitcher?: boolean
  /** Document-style flat navigation sections */
  docSections?: { label: string; items: AppShellDocItem[] }[]
  /** Collapsible main navigation sections */
  navSections?: { label?: string; items: AppShellNavItem[] }[]
  /** Secondary navigation items (pinned to bottom of sidebar content) */
  secondaryItems?: AppShellSecondaryItem[]
  /** User info for the sidebar footer */
  user?: AppShellUser
  /** Breadcrumb entries for the header */
  breadcrumbs?: BreadcrumbEntry[]
  /** Content to render in the main area */
  children?: React.ReactNode
}

export function AppShell({
  logo,
  logoIcon,
  logoHref = "/",
  showModuleSwitcher = true,
  docSections = [],
  navSections = [],
  secondaryItems = [],
  user,
  breadcrumbs = [],
  children,
}: AppShellProps) {
  return (
    <ActiveModuleProvider>
      <SidebarProvider>
        <Sidebar collapsible="icon" data-slot="app-sidebar">
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <AppBranding icon={logoIcon} name={logo} href={logoHref} />
              </SidebarMenuItem>
            </SidebarMenu>
            {showModuleSwitcher && <AppSwitcher />}
          </SidebarHeader>
          <SidebarContent>
            {docSections.map((section) => (
              <NavDocuments
                key={section.label}
                items={section.items}
                label={section.label}
              />
            ))}
            {navSections.map((section, i) => (
              <NavMain
                key={section.label ?? i}
                items={section.items}
                {...(section.label ? { label: section.label } : {})}
              />
            ))}
            {secondaryItems.length > 0 && (
              <NavSecondary items={secondaryItems} className="mt-auto" />
            )}
          </SidebarContent>
          {user && (
            <SidebarFooter>
              <NavUser user={user} />
            </SidebarFooter>
          )}
          <SidebarRail />
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
    </ActiveModuleProvider>
  )
}
