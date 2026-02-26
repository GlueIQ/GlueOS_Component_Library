import type { Meta, StoryObj } from '@storybook/react'
import { PageHeader } from '../../../patterns/navigation/page-header'
import { Button } from '../../../components/ui/button'

const meta = {
  title: '3-Patterns/3.7-Navigation/PageHeader',
  component: PageHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A page header with breadcrumb navigation, title, description, and action buttons.',
      },
    },
  },
} satisfies Meta<typeof PageHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Dashboard',
    description: 'Overview of your account activity and metrics.',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Dashboard' },
    ],
    actions: (
      <>
        <Button variant="outline">Export</Button>
        <Button>Create New</Button>
      </>
    ),
  },
}

export const Simple: Story = {
  args: {
    title: 'Settings',
    description: 'Manage your account settings and preferences.',
  },
}
