import type { Meta, StoryObj } from '@storybook/react'
import { ThemeProvider } from 'next-themes'

import { AppBranding } from '../../../components/ui/app-branding'

// ── Shared icons / wordmarks ───────────────────────────────────────────────────

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

// ── Meta ──────────────────────────────────────────────────────────────────────

const meta = {
  title: '2-Components/AppBranding',
  component: AppBranding,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A purpose-built branding container for the sidebar header. Accepts an icon (always visible) and a name/wordmark (hidden when the sidebar collapses to icon rail). Unlike `SidebarMenuButton`, this component carries no hover, active, or focus-ring styles — it is a display element, not a nav item.',
      },
    },
  },
  decorators: [
    (Story: any) => (
      <ThemeProvider attribute="class" defaultTheme="light">
        <div className="w-64 rounded-lg border bg-sidebar p-2">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof AppBranding>

export default meta
type Story = StoryObj<typeof meta>

// ── Stories ───────────────────────────────────────────────────────────────────

/**
 * Icon + wordmark — the standard GlueOS branding in the sidebar header.
 */
export const Default: Story = {
  args: {
    icon: <FlameIcon />,
    name: <GlueOSWordmark />,
    href: '#',
  },
}

/**
 * Icon only — no wordmark. Useful when the app name is implied by context
 * or when vertical space is at a premium.
 */
export const IconOnly: Story = {
  args: {
    icon: <FlameIcon />,
    href: '#',
  },
}

/**
 * Wordmark only — no icon. Use when the logo is text-based and the icon
 * mark isn't needed separately.
 */
export const TextOnly: Story = {
  args: {
    name: <GlueOSWordmark />,
    href: '#',
  },
}

/**
 * No `href` — renders as a static `div` with no link or cursor change.
 * Use when branding should not be a navigational element.
 */
export const NotLinked: Story = {
  args: {
    icon: <FlameIcon />,
    name: <GlueOSWordmark />,
  },
}
