import type { Meta, StoryObj } from '@storybook/react'
import { CommandBar } from '../../../patterns/navigation/command-bar'

const meta = {
  title: '3-Patterns/3.7-Navigation/CommandBar',
  component: CommandBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A command palette (Cmd+K) for quick actions, navigation, and search. Built on the Command component with Dialog overlay.',
      },
    },
  },
} satisfies Meta<typeof CommandBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    open: true,
    groups: [
      {
        heading: 'Navigation',
        items: [
          { label: 'Dashboard', shortcut: '⌘D' },
          { label: 'Settings', shortcut: '⌘S' },
          { label: 'Team Members' },
        ],
      },
      {
        heading: 'Actions',
        items: [
          { label: 'Create Project', shortcut: '⌘N' },
          { label: 'Upload File' },
          { label: 'Invite Member' },
        ],
      },
    ],
  },
}
