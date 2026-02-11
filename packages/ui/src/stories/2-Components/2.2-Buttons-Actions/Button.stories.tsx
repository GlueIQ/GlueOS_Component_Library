import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../../../components/ui/button'
import { ChevronRight, Plus, Trash2 } from 'lucide-react'

const meta = {
  title: '2-Components/2.2-Buttons & Actions/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible button component with support for multiple variants, sizes, and states.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      description: 'The visual style of the button',
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon', 'icon-sm', 'icon-lg'],
      description: 'The size of the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Button',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button>
        <Plus className="w-4 h-4" />
        Add
      </Button>
      <Button variant="outline">
        Edit
        <ChevronRight className="w-4 h-4" />
      </Button>
      <Button variant="destructive">
        <Trash2 className="w-4 h-4" />
        Delete
      </Button>
    </div>
  ),
}

export const IconButtons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button size="icon">
        <Plus className="w-4 h-4" />
      </Button>
      <Button size="icon-sm">
        <Plus className="w-3 h-3" />
      </Button>
      <Button size="icon-lg">
        <Plus className="w-5 h-5" />
      </Button>
    </div>
  ),
}

export const States: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button>Normal</Button>
      <Button disabled>Disabled</Button>
      <Button variant="outline">Outline Normal</Button>
      <Button variant="outline" disabled>
        Outline Disabled
      </Button>
    </div>
  ),
}

export const Playground: Story = {
  args: {
    children: 'Click me',
    variant: 'default',
    size: 'default',
    disabled: false,
  },
}
