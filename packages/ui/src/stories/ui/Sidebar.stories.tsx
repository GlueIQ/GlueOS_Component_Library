import type { Meta, StoryObj } from '@storybook/react'
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarHeader,
  SidebarFooter,
} from '../../components/ui/sidebar'
import { Home, Settings, Users, FileText, BarChart3 } from 'lucide-react'
import { Button } from '../../components/ui/button'

const meta = {
  title: 'UI/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A composable sidebar component with support for collapsible navigation, grouped menu items, headers, footers, and mobile responsiveness. Built with Radix UI primitives.',
      },
    },
  },
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof meta>

const navItems = [
  { title: 'Home', icon: Home },
  { title: 'Users', icon: Users },
  { title: 'Documents', icon: FileText },
  { title: 'Analytics', icon: BarChart3 },
  { title: 'Settings', icon: Settings },
]

export const Default: Story = {
  render: () => (
    <SidebarProvider style={{ height: '100vh' }}>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="#" className="flex items-center gap-2">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground text-xs font-bold">
                    G
                  </div>
                  <span className="text-sm font-semibold group-data-[collapsible=icon]:hidden">
                    GlueOS
                  </span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton isActive={item.title === 'Home'}>
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <div className="px-2 py-1 text-xs text-muted-foreground">
            v1.0.0
          </div>
        </SidebarFooter>
      </Sidebar>
      <main className="flex flex-1 flex-col">
        <header className="flex h-12 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <span className="text-sm font-medium">Dashboard</span>
        </header>
        <div className="flex-1 p-6">
          <h1 className="text-2xl font-bold">Welcome to GlueOS</h1>
          <p className="mt-2 text-muted-foreground">
            This is the main content area. Use the sidebar to navigate between
            sections. Click the trigger button to collapse or expand the
            sidebar.
          </p>
        </div>
      </main>
    </SidebarProvider>
  ),
}

export const Collapsed: Story = {
  render: () => (
    <SidebarProvider defaultOpen={false} style={{ height: '100vh' }}>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="#" className="flex items-center gap-2">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground text-xs font-bold">
                    G
                  </div>
                  <span className="text-sm font-semibold group-data-[collapsible=icon]:hidden">
                    GlueOS
                  </span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      isActive={item.title === 'Home'}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <div className="px-2 py-1 text-xs text-muted-foreground">
            v1.0.0
          </div>
        </SidebarFooter>
      </Sidebar>
      <main className="flex flex-1 flex-col">
        <header className="flex h-12 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <span className="text-sm font-medium">Dashboard</span>
        </header>
        <div className="flex-1 p-6">
          <h1 className="text-2xl font-bold">Welcome to GlueOS</h1>
          <p className="mt-2 text-muted-foreground">
            The sidebar starts in collapsed state. Click the trigger button or
            use the keyboard shortcut (Cmd+B / Ctrl+B) to expand it. Hover
            over icons to see tooltips.
          </p>
        </div>
      </main>
    </SidebarProvider>
  ),
}
