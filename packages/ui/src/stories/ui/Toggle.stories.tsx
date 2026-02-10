import type { Meta, StoryObj } from '@storybook/react'
import { Toggle } from '../../components/ui/toggle'
import { Bold, Italic, Underline } from 'lucide-react'

const meta = {
  title: 'UI/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A two-state toggle button that can be switched on or off. Supports default and outline variants with small, default, and large sizes.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline'],
      description: 'The visual style variant of the toggle',
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg'],
      description: 'The size of the toggle',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the toggle is disabled',
    },
  },
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Toggle',
  },
}

export const WithIcon: Story = {
  render: () => (
    <div className="flex gap-2">
      <Toggle aria-label="Toggle bold">
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle aria-label="Toggle italic">
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle aria-label="Toggle underline">
        <Underline className="h-4 w-4" />
      </Toggle>
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-4">
      <Toggle variant="default" aria-label="Default variant">
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle variant="outline" aria-label="Outline variant">
        <Bold className="h-4 w-4" />
      </Toggle>
    </div>
  ),
}

export const Pressed: Story = {
  render: () => (
    <div className="flex gap-2">
      <Toggle defaultPressed aria-label="Bold pressed">
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle defaultPressed variant="outline" aria-label="Italic pressed">
        <Italic className="h-4 w-4" />
      </Toggle>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="flex gap-2">
      <Toggle disabled aria-label="Disabled toggle">
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle disabled variant="outline" aria-label="Disabled outline toggle">
        <Italic className="h-4 w-4" />
      </Toggle>
    </div>
  ),
}
