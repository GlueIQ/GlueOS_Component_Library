import type { Meta, StoryObj } from "@storybook/react"
import { ThemeProvider } from "next-themes"
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
} from "lucide-react"

import { AppShell } from "../../layouts/app-shell"

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

const navSections = [
  {
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
]

const secondaryItems = [
  { title: "Get Help", url: "#", icon: Bell },
  { title: "Settings", url: "#", icon: Settings2 },
]

const user = {
  name: "Kevin Flynn",
  email: "kevin.flynn@glueiq.com",
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

- **Collapsible sidebar** with logo, navigation groups, and user profile
- **Module switcher** for navigating between GlueOS modules
- **Secondary nav** pinned to the bottom of the sidebar
- **Header bar** with sidebar trigger, breadcrumbs, and theme toggle

**Props-based API:** Logo, navigation groups, secondary items, user info, and breadcrumbs are all passed as props.
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
  args: {},
  render: () => (
    <AppShell
      logoIcon={<FlameIcon />}
      logo={<GlueOSWordmark />}
      logoHref="#"
      navSections={navSections}
      secondaryItems={secondaryItems}
      user={user}
      breadcrumbs={[{ label: "Overview", href: "#" }]}
    />
  ),
}
