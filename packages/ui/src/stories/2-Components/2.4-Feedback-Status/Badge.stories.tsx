import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from '../../../components/ui/badge'

const meta = {
  title: '2-Components/2.4-Feedback & Status/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A small label or tag component that displays metadata or status.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline'],
      description: 'The visual style of the badge',
    },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Badge',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
}

export const WithText: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge>Active</Badge>
      <Badge variant="secondary">Pending</Badge>
      <Badge variant="outline">New</Badge>
      <Badge variant="destructive">Critical</Badge>
    </div>
  ),
}

export const Status: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <div className="flex items-center gap-2">
        <Badge variant="default">Live</Badge>
        <span className="text-sm text-gray-600">Production</span>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant="secondary">Beta</Badge>
        <span className="text-sm text-gray-600">Testing</span>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant="outline">Draft</Badge>
        <span className="text-sm text-gray-600">In Progress</span>
      </div>
    </div>
  ),
}
