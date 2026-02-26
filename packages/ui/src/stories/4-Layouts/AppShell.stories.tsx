import type { Meta, StoryObj } from "@storybook/react"
import { ThemeProvider } from "next-themes"
import {
  Book,
  BookOpen,
  CircleHelp,
  ClipboardList,
  Component,
  FileCode2,
  FileText,
  Globe,
  LayoutGrid,
  Palette,
  Search,
  Settings,
  Settings2,
  ToggleLeft,
  Wand2,
} from "lucide-react"

import { AppShell } from "../../layouts/app-shell"
import { GlueIQLogo, GlueIQIcon } from "../../layouts/app-shell/glueiq-logo"

const sampleDocSections = [
  {
    label: "Getting Started",
    items: [
      { name: "Overview", url: "#", icon: BookOpen },
      { name: "Instructions", url: "#", icon: FileText },
      { name: "Configuration", url: "#", icon: Settings2 },
    ],
  },
  {
    label: "Tools",
    items: [
      { name: "Generator", url: "#", icon: Wand2 },
      { name: "Storybook", url: "#", icon: Book },
      { name: "Component States", url: "#", icon: ToggleLeft },
      { name: "Migration Audit", url: "#", icon: ClipboardList },
      { name: "Example Site", url: "#", icon: Globe },
    ],
  },
]

const sampleNavSections = [
  {
    label: "UI Kit",
    items: [
      {
        title: "Design Tokens",
        url: "#",
        icon: Palette,
        items: [
          { title: "Color", url: "#" },
          { title: "Typography", url: "#" },
          { title: "Spacing & Layout", url: "#" },
          { title: "Shadows & Effects", url: "#" },
        ],
      },
      {
        title: "Components",
        url: "#",
        icon: Component,
        isActive: true,
        items: [
          { title: "Form Controls", url: "#" },
          { title: "Buttons & Actions", url: "#" },
          { title: "Navigation", url: "#" },
          { title: "Feedback & Status", url: "#" },
          { title: "Data Display", url: "#" },
          { title: "Layout", url: "#" },
          { title: "Overlays & Modals", url: "#" },
        ],
      },
      {
        title: "Patterns (Blocks)",
        url: "#",
        icon: LayoutGrid,
        items: [
          { title: "Authentication", url: "#" },
          { title: "Data Visualization", url: "#" },
          { title: "Forms", url: "#" },
        ],
      },
      {
        title: "Layouts",
        url: "#",
        icon: FileCode2,
        items: [
          { title: "App Shell", url: "#" },
          { title: "Dashboard", url: "#" },
          { title: "Settings & Admin", url: "#" },
        ],
      },
    ],
  },
]

const sampleSecondaryItems = [
  { title: "Settings", url: "#", icon: Settings },
  { title: "Get Help", url: "#", icon: CircleHelp },
  { title: "Search", url: "#", icon: Search },
]

const sampleUser = {
  name: "Matt Kujawa",
  email: "matt@glueiq.com",
  avatar: "",
}

const meta: Meta<typeof AppShell> = {
  title: "4-Layouts/App Shell",
  component: AppShell,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
## App Shell Layout

The foundational layout for GlueOS applications. Provides a complete app shell with:

- **Collapsible sidebar** with logo, navigation sections, and user profile
- **Header bar** with sidebar trigger, breadcrumbs, theme toggle, and module switcher
- **Module switcher** dropdown for navigating between GlueOS modules (Horizon, Intelligence, Immersion, etc.)
- **Blank content area** for page-specific content

**Composed of:** Sidebar, SidebarTrigger, Breadcrumb, DropdownMenu, Button, Avatar, Separator

**Props-based API:** Logo, navigation items, user info, and breadcrumbs are all passed as props, making this layout reusable across different client configurations.
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="light">
        <Story />
      </ThemeProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof AppShell>

export const Default: Story = {
  args: {
    logo: <GlueIQLogo />,
    logoIcon: <GlueIQIcon />,
    logoHref: "#",
    docSections: sampleDocSections,
    navSections: sampleNavSections,
    secondaryItems: sampleSecondaryItems,
    user: sampleUser,
    breadcrumbs: [],
  },
}

export const WithBreadcrumbs: Story = {
  args: {
    ...Default.args,
    breadcrumbs: [
      { label: "Components", href: "#" },
      { label: "Button", href: "#" },
    ],
  },
}

export const MinimalNav: Story = {
  args: {
    logo: <GlueIQLogo />,
    logoIcon: <GlueIQIcon />,
    logoHref: "#",
    docSections: [sampleDocSections[0]!],
    navSections: [],
    secondaryItems: [],
    user: sampleUser,
  },
}
