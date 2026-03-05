import type { Meta, StoryObj } from '@storybook/react'
import { ThemeProvider } from 'next-themes'
import {
  Bell,
  BookOpen,
  Bot,
  BrainCircuit,
  LayoutGrid,
  Link,
  Map,
  Settings2,
  Sparkles,
  SquareTerminal,
} from 'lucide-react'

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
} from '../../../components/ui/sidebar'
import { AppBranding } from '../../../components/ui/app-branding'
import {
  AppSwitcher,
  NavMain,
  NavSecondary,
  NavUser,
  ActiveModuleProvider,
} from '../../../layouts/app-shell'

// ── Shared data ───────────────────────────────────────────────────────────────

const navSections = [
  {
    items: [
      { title: 'Overview', url: '#', icon: LayoutGrid },
      { title: 'Instructions', url: '#', icon: BookOpen },
    ],
  },
  {
    label: 'Tools',
    items: [
      { title: 'Tool 1', url: '#', icon: SquareTerminal },
      {
        title: 'Tool Group 2',
        url: '#',
        icon: Bot,
        items: [
          { title: 'Hammer', url: '#' },
          { title: 'Screwdriver', url: '#' },
          { title: 'Saw', url: '#' },
          { title: 'Drill', url: '#' },
        ],
      },
      {
        title: 'Tool Group 3',
        url: '#',
        icon: Settings2,
        items: [
          { title: 'Anvil', url: '#' },
          { title: 'Press', url: '#' },
          { title: 'Plyers', url: '#' },
          { title: 'Wrench', url: '#' },
        ],
      },
      { title: 'Tool 4', url: '#', icon: BrainCircuit },
    ],
  },
  {
    label: 'Knowledge',
    items: [
      { title: 'Ask Glue', url: '#', icon: Sparkles },
      { title: 'Data Sources', url: '#', icon: Link },
      { title: 'Knowledge Graph', url: '#', icon: Map },
    ],
  },
]

const simpleNavSection = [
  {
    items: [
      { title: 'Overview', url: '#', icon: LayoutGrid },
      { title: 'Instructions', url: '#', icon: BookOpen },
      { title: 'Tools', url: '#', icon: SquareTerminal },
      { title: 'Ask Glue', url: '#', icon: Sparkles },
      { title: 'Data Sources', url: '#', icon: Link },
    ],
  },
]

const secondaryItems = [
  { title: 'Get Help', url: '#', icon: Bell },
  { title: 'Settings', url: '#', icon: Settings2 },
]

const user = {
  name: 'Kevin Flynn',
  email: 'kevin.flynn@glueiq.com',
  avatar: '',
}

const FlameIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 19.9093C6 25.4832 10.4762 30 16 30C21.5238 30 26 25.4832 26 19.9093C26 14.8228 21.4898 11.8985 18.898 7.17578C17.3401 4.34077 16.2857 2 16.2857 2C16.2857 2 15.1905 4.09365 13.5442 6.87374C10.7347 11.5965 6 14.8228 6 19.9093Z" fill="#BC0059" />
  </svg>
)

const GlueOSWordmark = () => (
  <span className="truncate text-2xl font-extrabold">
    Glue<span className="text-primary">OS</span>
  </span>
)

// ── Shared shell ──────────────────────────────────────────────────────────────

function SidebarShell({ children }: { children: React.ReactNode }) {
  return (
    <ActiveModuleProvider>
      <SidebarProvider style={{ height: '100vh' }}>
        {children}
        <SidebarInset>
          <header className="flex h-12 items-center gap-2 border-b px-4">
            <SidebarTrigger />
          </header>
        </SidebarInset>
      </SidebarProvider>
    </ActiveModuleProvider>
  )
}

// ── Meta ──────────────────────────────────────────────────────────────────────

const meta = {
  title: '2-Components/2.3-Navigation/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The GlueOS sidebar primitive. Collapsible to an icon rail via `collapsible="icon"`. Composed of header (AppBranding + optional AppSwitcher), grouped nav, secondary nav, and optional user footer.',
      },
    },
  },
  decorators: [
    (Story: any) => (
      <ThemeProvider attribute="class" defaultTheme="light">
        <Story />
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof meta>

// ── Stories ───────────────────────────────────────────────────────────────────

/**
 * The full sidebar as used in the App Shell: AppBranding header, module switcher,
 * multi-group nav with flat and collapsible items, bottom secondary nav, and user footer.
 */
export const Default: Story = {
  args: {},
  render: () => (
    <SidebarShell>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <AppBranding
                icon={<FlameIcon />}
                name={<GlueOSWordmark />}
                href="#"
              />
            </SidebarMenuItem>
          </SidebarMenu>
          <AppSwitcher />
        </SidebarHeader>
        <SidebarContent>
          {navSections.map((section, i) => (
            <NavMain key={section.label ?? i} items={section.items} {...(section.label ? { label: section.label } : {})} />
          ))}
          <NavSecondary items={secondaryItems} className="mt-auto" />
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={user} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </SidebarShell>
  ),
}

/**
 * Single-app variant: no AppSwitcher in the header. Use when the product
 * ships as a standalone app with no module switching needed.
 */
export const SingleApp: Story = {
  args: {},
  render: () => (
    <SidebarShell>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <AppBranding
                icon={<FlameIcon />}
                name={<GlueOSWordmark />}
                href="#"
              />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          {navSections.map((section, i) => (
            <NavMain key={section.label ?? i} items={section.items} {...(section.label ? { label: section.label } : {})} />
          ))}
          <NavSecondary items={secondaryItems} className="mt-auto" />
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={user} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </SidebarShell>
  ),
}

/**
 * Minimal sidebar: no AppSwitcher, no user footer, single flat nav group.
 * Use for lightweight tools or embedded contexts.
 */
export const SimpleSidebar: Story = {
  args: {},
  render: () => (
    <SidebarShell>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <AppBranding
                icon={<FlameIcon />}
                name={<GlueOSWordmark />}
                href="#"
              />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          {simpleNavSection.map((section, i) => (
            <NavMain key={i} items={section.items} />
          ))}
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
    </SidebarShell>
  ),
}
