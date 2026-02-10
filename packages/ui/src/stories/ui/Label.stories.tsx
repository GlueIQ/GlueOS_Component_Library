import type { Meta, StoryObj } from '@storybook/react'
import { Label } from '../../components/ui/label'
import { Input } from '../../components/ui/input'

const meta = {
  title: 'UI/Label',
  component: Label,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A label component built on Radix UI Label primitive. Provides accessible text labels for form controls with automatic disabled state styling via peer and group modifiers.',
      },
    },
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'The text content of the label',
    },
    htmlFor: {
      control: 'text',
      description: 'The id of the form element the label is associated with',
    },
  },
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Email address',
  },
}

export const WithInput: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Enter your email" />
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="disabled-input">Disabled field</Label>
      <Input id="disabled-input" placeholder="Cannot edit this" disabled />
    </div>
  ),
}
